<?php
/**
 * إعادة إرسال رمز التحقق
 */

require_once '../config/cors_headers.php';
require_once '../config/database.php';
require_once '../utils/EmailService.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (empty($data->email)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'mesaj' => 'E-posta gerekli'], JSON_UNESCAPED_UNICODE);
    exit();
}

try {
    // Mevcut doğrulama kodunu ara (yeni kayıt için)
    $query = "SELECT * FROM verification_codes 
              WHERE email = :email 
              AND type = 'email_verification'
              AND verified = FALSE 
              ORDER BY created_at DESC 
              LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();
    $existingVerification = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($existingVerification) {
        // Yeni kayıt için yeniden gönder
        $userData = json_decode($existingVerification['user_data'], true);
        
        // Eski kodu sil
        $query = "DELETE FROM verification_codes WHERE email = :email AND type = 'email_verification'";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $data->email);
        $stmt->execute();
        
        // Yeni kod oluştur
        $code = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
        $expires_at = date('Y-m-d H:i:s', strtotime('+15 minutes'));
        
        $query = "INSERT INTO verification_codes (email, code, user_data, type, expires_at) 
                  VALUES (:email, :code, :user_data, 'email_verification', :expires_at)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $data->email);
        $stmt->bindParam(':code', $code);
        $userDataJson = json_encode($userData);
        $stmt->bindParam(':user_data', $userDataJson);
        $stmt->bindParam(':expires_at', $expires_at);
        $stmt->execute();
        
        // E-posta gönder
        $emailService = new EmailService();
        $name = $userData['isim'] . ' ' . $userData['soyisim'];
        $result = $emailService->sendVerificationCode($data->email, $name, $code);
        
        if ($result['success']) {
            http_response_code(200);
            echo json_encode([
                'success' => true, 
                'mesaj' => 'Doğrulama kodu yeniden gönderildi'
            ], JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false, 
                'mesaj' => 'E-posta gönderilemedi'
            ], JSON_UNESCAPED_UNICODE);
        }
    } else {
        // Kayıtlı kullanıcı var mı kontrol et (mevcut kullanıcı için kod yeniden gönderme)
        $query = "SELECT isim, soyisim FROM kullanicilar WHERE email = :email";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $data->email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            http_response_code(404);
            echo json_encode(['success' => false, 'mesaj' => 'Kullanıcı bulunamadı'], JSON_UNESCAPED_UNICODE);
            exit();
        }
        
        // Eski kodları sil
        $query = "DELETE FROM verification_codes WHERE email = :email";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $data->email);
        $stmt->execute();
        
        // Yeni kod oluştur
        $code = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
        $expires_at = date('Y-m-d H:i:s', strtotime('+15 minutes'));
        
        $query = "INSERT INTO verification_codes (email, code, type, expires_at) VALUES (:email, :code, 'email_verification', :expires_at)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $data->email);
        $stmt->bindParam(':code', $code);
        $stmt->bindParam(':expires_at', $expires_at);
        $stmt->execute();
        
        // E-posta gönder
        $emailService = new EmailService();
        $name = $user['isim'] . ' ' . $user['soyisim'];
        $result = $emailService->sendVerificationCode($data->email, $name, $code);
        
        if ($result['success']) {
            http_response_code(200);
            echo json_encode([
                'success' => true, 
                'mesaj' => 'Doğrulama kodu yeniden gönderildi'
            ], JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false, 
                'mesaj' => 'E-posta gönderilemedi'
            ], JSON_UNESCAPED_UNICODE);
        }
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'mesaj' => 'Bir hata oluştu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
