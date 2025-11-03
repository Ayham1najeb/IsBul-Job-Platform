<?php
/**
 * Mesaj Gönder Endpoint
 */

// CORS Headers
require_once '../config/cors_headers.php';

include_once '../config/database.php';
include_once '../models/Message.php';
include_once '../models/Notification.php';
include_once '../middleware/auth.php';

$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(array("mesaj" => $auth['message']), JSON_UNESCAPED_UNICODE);
    exit();
}

$user_data = $auth['data'];

$database = new Database();
$db = $database->getConnection();

$message = new Message($db);
$data = json_decode(file_get_contents("php://input"));

// Input sanitization için
require_once '../utils/input_sanitizer.php';

if (empty($data->alici_id) || empty($data->mesaj)) {
    http_response_code(400);
    echo json_encode(array("mesaj" => "Alıcı ve mesaj gerekli."), JSON_UNESCAPED_UNICODE);
    exit();
}

// Input sanitization - XSS ve SQL injection koruması
$message->gonderen_id = $user_data->id;
$message->alici_id = InputSanitizer::sanitizeInt($data->alici_id);
$message->ilan_id = isset($data->ilan_id) ? InputSanitizer::sanitizeInt($data->ilan_id) : null;
$message->konu = isset($data->konu) ? InputSanitizer::preventXSS($data->konu) : 'Mesaj';
$message->mesaj = InputSanitizer::preventXSS($data->mesaj);

if ($message->send()) {
    // Bu ilan için daha önce mesaj var mı kontrol et (ilk mesaj mı?)
    $is_first_message = false;
    if ($message->ilan_id) {
        $check_query = "SELECT COUNT(*) as count FROM Mesajlar 
                       WHERE ilan_id = :ilan_id 
                       AND ((gonderen_id = :user1 AND alici_id = :user2) OR (gonderen_id = :user2 AND alici_id = :user1))
                       AND id != :mesaj_id";
        $check_stmt = $db->prepare($check_query);
        $check_stmt->bindParam(':ilan_id', $message->ilan_id);
        $check_stmt->bindParam(':user1', $user_data->id);
        $check_stmt->bindParam(':user2', $data->alici_id);
        $check_stmt->bindParam(':mesaj_id', $message->id);
        $check_stmt->execute();
        $check_result = $check_stmt->fetch(PDO::FETCH_ASSOC);
        $is_first_message = ($check_result['count'] == 0);
    }
    
    // İlan bilgilerini al
    $ilan_baslik = '';
    if ($message->ilan_id) {
        $ilan_query = "SELECT baslik FROM ilanlar WHERE id = :ilan_id";
        $ilan_stmt = $db->prepare($ilan_query);
        $ilan_stmt->bindParam(':ilan_id', $message->ilan_id);
        $ilan_stmt->execute();
        $ilan_data = $ilan_stmt->fetch(PDO::FETCH_ASSOC);
        if ($ilan_data) {
            $ilan_baslik = $ilan_data['baslik'];
        }
    }
    
    // Gönderen bilgilerini al
    $gonderen_query = "SELECT isim, soyisim, rol FROM kullanicilar WHERE id = :gonderen_id";
    $gonderen_stmt = $db->prepare($gonderen_query);
    $gonderen_stmt->bindParam(':gonderen_id', $user_data->id);
    $gonderen_stmt->execute();
    $gonderen_data = $gonderen_stmt->fetch(PDO::FETCH_ASSOC);
    
    // Sadece ilk mesaj ise bildirim gönder
    if ($is_first_message && $gonderen_data && $message->ilan_id) {
        $notification = new Notification($db);
        $notification->kullanici_id = $data->alici_id;
        $notification->tip = 'message_sent';
        $notification->mesaj_id = $message->id;
        $notification->ilan_id = $message->ilan_id;
        $notification->basvuru_id = null;
        
        if ($user_data->rol === 'firma') {
            // Şirket mesaj gönderiyor - iş arayana bildirim
            $notification->baslik = 'Yeni Mesaj';
            $notification->mesaj = $gonderen_data['isim'] . ' ' . $gonderen_data['soyisim'] . 
                                  ' şirketi "' . $ilan_baslik . '" ilanına başvurduğunuz pozisyon hakkında size mesaj gönderdi.';
        } else {
            // İş arayan mesaj gönderiyor - şirkete bildirim
            $notification->baslik = 'Yeni Mesaj';
            $notification->mesaj = $gonderen_data['isim'] . ' ' . $gonderen_data['soyisim'] . 
                                  ' adlı kişi "' . $ilan_baslik . '" ilanınız hakkında size mesaj gönderdi.';
        }
        
        $notification->create();
    }
    
    http_response_code(201);
    echo json_encode(
        array(
            "mesaj" => "Mesaj gönderildi.",
            "mesaj_id" => $message->id
        ),
        JSON_UNESCAPED_UNICODE
    );
} else {
    http_response_code(500);
    echo json_encode(array("mesaj" => "Mesaj gönderilemedi."), JSON_UNESCAPED_UNICODE);
}
