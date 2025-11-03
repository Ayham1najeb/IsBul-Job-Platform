<?php
/**
 * Başvuru Oluşturma Endpoint
 * İş ilanına başvuru yapma - CV ile birlikte
 */

require_once '../config/cors_headers.php';
include_once '../config/database.php';
include_once '../models/Application.php';
include_once '../models/Notification.php';
include_once '../middleware/auth.php';
require_once '../utils/input_sanitizer.php';

// Kimlik doğrulama kontrolü
$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(array("mesaj" => $auth['message']), JSON_UNESCAPED_UNICODE);
    exit();
}

$user_data = $auth['data'];

// Sadece iş arayanlar başvurabilir
if ($user_data->rol !== 'is_arayan') {
    http_response_code(403);
    echo json_encode(array("mesaj" => "Sadece iş arayanlar başvuru yapabilir."), JSON_UNESCAPED_UNICODE);
    exit();
}

$database = new Database();
$db = $database->getConnection();

// POST verilerini al
$data = json_decode(file_get_contents("php://input"));

// Zorunlu alanları kontrol et
if (empty($data->ilan_id)) {
    http_response_code(400);
    echo json_encode(array("mesaj" => "İlan ID gerekli."), JSON_UNESCAPED_UNICODE);
    exit();
}

// Input sanitization
$ilan_id = InputSanitizer::sanitizeInt($data->ilan_id);
$mesaj = isset($data->mesaj) ? InputSanitizer::preventXSS($data->mesaj) : null;

// CV kontrolü - Kullanıcının CV'si var mı?
$has_cv = false;

// Deneyim kontrolü
$exp_query = "SELECT COUNT(*) as total FROM is_deneyimleri WHERE kullanici_id = :kullanici_id";
$exp_stmt = $db->prepare($exp_query);
$exp_stmt->bindParam(':kullanici_id', $user_data->id);
$exp_stmt->execute();
$exp_count = $exp_stmt->fetch(PDO::FETCH_ASSOC);

// Eğitim kontrolü
$edu_query = "SELECT COUNT(*) as total FROM egitim_bilgileri WHERE kullanici_id = :kullanici_id";
$edu_stmt = $db->prepare($edu_query);
$edu_stmt->bindParam(':kullanici_id', $user_data->id);
$edu_stmt->execute();
$edu_count = $edu_stmt->fetch(PDO::FETCH_ASSOC);

// Beceri kontrolü
$skill_query = "SELECT COUNT(*) as total FROM kullanici_becerileri_detay WHERE kullanici_id = :kullanici_id";
$skill_stmt = $db->prepare($skill_query);
$skill_stmt->bindParam(':kullanici_id', $user_data->id);
$skill_stmt->execute();
$skill_count = $skill_stmt->fetch(PDO::FETCH_ASSOC);

// En az birinde veri varsa CV var demektir
if ($exp_count['total'] > 0 || $edu_count['total'] > 0 || $skill_count['total'] > 0) {
    $has_cv = true;
}

if (!$has_cv) {
    http_response_code(400);
    echo json_encode(
        array(
            "mesaj" => "Başvuru yapabilmek için önce özgeçmişinizi oluşturmalısınız.",
            "cv_gerekli" => true
        ),
        JSON_UNESCAPED_UNICODE
    );
    exit();
}

$application = new Application($db);

$application->kullanici_id = $user_data->id;
$application->ilan_id = $ilan_id;
$application->notlar = !empty($data->notlar) ? InputSanitizer::preventXSS($data->notlar) : null;

try {
    if ($application->create()) {
        // İlan bilgilerini ve firma kullanıcı ID'sini al
        $ilan_query = "SELECT i.baslik, i.firma_id, f.kullanici_id as firma_kullanici_id
                       FROM ilanlar i
                       LEFT JOIN firmalar f ON i.firma_id = f.id
                       WHERE i.id = :ilan_id";
        $ilan_stmt = $db->prepare($ilan_query);
        $ilan_stmt->bindParam(':ilan_id', $ilan_id);
        $ilan_stmt->execute();
        $ilan_data = $ilan_stmt->fetch(PDO::FETCH_ASSOC);
        
        // Kullanıcı bilgilerini al
        $kullanici_query = "SELECT isim, soyisim FROM kullanicilar WHERE id = :kullanici_id";
        $kullanici_stmt = $db->prepare($kullanici_query);
        $kullanici_stmt->bindParam(':kullanici_id', $user_data->id);
        $kullanici_stmt->execute();
        $kullanici_data = $kullanici_stmt->fetch(PDO::FETCH_ASSOC);
        
        // Şirkete bildirim gönder
        if ($ilan_data && $ilan_data['firma_kullanici_id'] && $kullanici_data) {
            $notification = new Notification($db);
            $notification->kullanici_id = $ilan_data['firma_kullanici_id'];
            $notification->tip = 'application_created';
            $notification->baslik = 'Yeni Başvuru';
            $notification->mesaj = $kullanici_data['isim'] . ' ' . $kullanici_data['soyisim'] . 
                                  ' adlı kişi "' . $ilan_data['baslik'] . '" ilanına başvuru yaptı.';
            $notification->ilan_id = $ilan_id;
            $notification->basvuru_id = $application->id;
            $notification->mesaj_id = null;
            $notification->create();
        }
        
        http_response_code(201);
        echo json_encode(
            array(
                "mesaj" => "Başvurunuz başarıyla gönderildi.",
                "basvuru_id" => $application->id
            ),
            JSON_UNESCAPED_UNICODE
        );
    } else {
        http_response_code(400);
        echo json_encode(
            array("mesaj" => "Bu ilana zaten başvuru yaptınız."),
            JSON_UNESCAPED_UNICODE
        );
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(
        array(
            "mesaj" => "Başvuru kaydedilemedi: " . $e->getMessage(),
            "hata" => $e->getMessage()
        ),
        JSON_UNESCAPED_UNICODE
    );
}
