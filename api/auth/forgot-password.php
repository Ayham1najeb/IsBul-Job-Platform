<?php
/**
 * نسيت كلمة المرور - إرسال رمز التحقق
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
    // Kullanıcının varlığını kontrol et
    $query = "SELECT id, isim, soyisim, email FROM kullanicilar WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        http_response_code(404);
        echo json_encode(['success' => false, 'mesaj' => 'Bu e-posta adresi kayıtlı değil'], JSON_UNESCAPED_UNICODE);
        exit();
    }
    
    // Bu e-posta için eski kodları sil
    $query = "DELETE FROM verification_codes WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();
    
    // Yeni kod oluştur
    $code = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
    $expires_at = date('Y-m-d H:i:s', strtotime('+15 minutes'));
    
    // Kodu kaydet
    $query = "INSERT INTO verification_codes (email, code, expires_at) VALUES (:email, :code, :expires_at)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':code', $code);
    $stmt->bindParam(':expires_at', $expires_at);
    $stmt->execute();
    
    // E-posta gönder
    $emailService = new EmailService();
    $name = $user['isim'] . ' ' . $user['soyisim'];
    $result = $emailService->sendPasswordResetCode($data->email, $name, $code);
    
    if ($result['success']) {
        http_response_code(200);
        echo json_encode([
            'success' => true, 
            'mesaj' => 'Şifre sıfırlama kodu e-postanıza gönderildi',
            'email' => $data->email
        ], JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false, 
            'mesaj' => 'E-posta gönderilemedi'
        ], JSON_UNESCAPED_UNICODE);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'mesaj' => 'Bir hata oluştu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
