<?php
/**
 * التحقق من رمز البريد الإلكتروني
 */

require_once '../config/cors_headers.php';
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (empty($data->email) || empty($data->code)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'mesaj' => 'E-posta ve kod gerekli'], JSON_UNESCAPED_UNICODE);
    exit();
}

try {
    // Kodu doğrula
    $query = "SELECT * FROM verification_codes 
              WHERE email = :email 
              AND code = :code 
              AND type = 'email_verification'
              AND verified = FALSE 
              AND expires_at > NOW() 
              ORDER BY created_at DESC 
              LIMIT 1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':code', $data->code);
    $stmt->execute();
    
    $verification = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$verification) {
        http_response_code(400);
        echo json_encode([
            'success' => false, 
            'mesaj' => 'Geçersiz veya süresi dolmuş kod'
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }
    
    // Geçici kullanıcı verilerini al
    $userData = json_decode($verification['user_data'], true);
    
    if (!$userData) {
        http_response_code(500);
        echo json_encode([
            'success' => false, 
            'mesaj' => 'Kullanıcı verileri bulunamadı'
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }
    
    // Kullanıcıyı veritabanında oluştur
    $query = "INSERT INTO kullanicilar (isim, soyisim, email, sifre, telefon, rol, email_verified) 
              VALUES (:isim, :soyisim, :email, :sifre, :telefon, :rol, TRUE)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':isim', $userData['isim']);
    $stmt->bindParam(':soyisim', $userData['soyisim']);
    $stmt->bindParam(':email', $userData['email']);
    $stmt->bindParam(':sifre', $userData['sifre']);
    $stmt->bindParam(':telefon', $userData['telefon']);
    $stmt->bindParam(':rol', $userData['rol']);
    $stmt->execute();
    
    // Doğrulama durumunu güncelle
    $query = "UPDATE verification_codes SET verified = TRUE WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $verification['id']);
    $stmt->execute();
    
    // Hoş geldin e-postası gönder (opsiyonel)
    try {
        require_once '../utils/EmailService.php';
        $emailService = new EmailService();
        $name = $userData['isim'] . ' ' . $userData['soyisim'];
        $emailService->sendWelcomeEmail($userData['email'], $name);
    } catch (Exception $e) {
        error_log("Welcome email error: " . $e->getMessage());
    }
    
    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'mesaj' => 'Hesabınız başarıyla oluşturuldu'
    ], JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'mesaj' => 'Bir hata oluştu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
