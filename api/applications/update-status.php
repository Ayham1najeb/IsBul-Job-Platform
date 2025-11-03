<?php
/**
 * Başvuru Durumu Güncelleme Endpoint
 */

require_once '../config/cors_headers.php';
include_once '../config/database.php';
include_once '../models/Application.php';
include_once '../models/Notification.php';
include_once '../middleware/auth.php';

$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(array("mesaj" => $auth['message']), JSON_UNESCAPED_UNICODE);
    exit();
}

$user_data = $auth['data'];

if ($user_data->rol !== 'firma') {
    http_response_code(403);
    echo json_encode(array("mesaj" => "Yetkiniz yok."), JSON_UNESCAPED_UNICODE);
    exit();
}

$database = new Database();
$db = $database->getConnection();

$application = new Application($db);
$data = json_decode(file_get_contents("php://input"));

if (empty($data->id) || empty($data->durum)) {
    http_response_code(400);
    echo json_encode(array("mesaj" => "Başvuru ID ve durum gerekli."), JSON_UNESCAPED_UNICODE);
    exit();
}

$application->id = $data->id;
$application->durum = $data->durum;

// Başvuru bilgilerini al (kullanıcı ve ilan bilgileri için)
$basvuru_query = "SELECT b.kullanici_id, b.ilan_id, i.baslik as ilan_baslik,
                         k.isim, k.soyisim
                  FROM basvurular b
                  LEFT JOIN ilanlar i ON b.ilan_id = i.id
                  LEFT JOIN kullanicilar k ON b.kullanici_id = k.id
                  WHERE b.id = :basvuru_id";
$basvuru_stmt = $db->prepare($basvuru_query);
$basvuru_stmt->bindParam(':basvuru_id', $data->id);
$basvuru_stmt->execute();
$basvuru_data = $basvuru_stmt->fetch(PDO::FETCH_ASSOC);

if ($application->updateStatus()) {
    // Eğer durum 'kabul' ise, başvuru sahibine bildirim gönder
    if ($data->durum === 'kabul' && $basvuru_data) {
        $notification = new Notification($db);
        $notification->kullanici_id = $basvuru_data['kullanici_id'];
        $notification->tip = 'application_accepted';
        $notification->baslik = 'Başvurunuz Kabul Edildi';
        $notification->mesaj = '"' . $basvuru_data['ilan_baslik'] . '" ilanına yaptığınız başvuru kabul edildi!';
        $notification->ilan_id = $basvuru_data['ilan_id'];
        $notification->basvuru_id = $data->id;
        $notification->mesaj_id = null;
        $notification->create();
    }
    
    http_response_code(200);
    echo json_encode(array("mesaj" => "Başvuru durumu güncellendi."), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode(array("mesaj" => "Durum güncellenemedi."), JSON_UNESCAPED_UNICODE);
}
