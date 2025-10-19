<?php
/**
 * Yeni Admin Ekleme Endpoint
 * Sadece Super Admin kullanabilir
 */

require_once '../config/cors_headers.php';
require_once '../config/database.php';
require_once '../middleware/auth.php';
require_once '../utils/EmailService.php';

// Kimlik doğrulama ve Super Admin kontrolü
$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(['success' => false, 'mesaj' => $auth['message']]);
    exit();
}

// Super Admin kontrolü
if ($auth['data']->rol !== 'admin' || !$auth['data']->is_super_admin) {
    http_response_code(403);
    echo json_encode(['success' => false, 'mesaj' => 'Bu işlem için Super Admin yetkisi gerekli']);
    exit();
}

$database = new Database();
$db = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

if (empty($data->email)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'mesaj' => 'E-posta adresi gerekli']);
    exit();
}

try {
    // E-postanın kullanılmadığını kontrol et
    $query = "SELECT id FROM kullanicilar WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();
    
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(['success' => false, 'mesaj' => 'Bu e-posta adresi zaten kullanılıyor']);
        exit();
    }
    
    // Geçici şifre oluştur
    $tempPassword = bin2hex(random_bytes(8)); // 16 karakter
    $hashedPassword = password_hash($tempPassword, PASSWORD_BCRYPT);
    
    // Doğrulama kodu oluştur
    $code = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
    $expires_at = date('Y-m-d H:i:s', time() + (30 * 60)); // 30 dakika
    
    // Kullanıcı verilerini geçici olarak kaydet
    $userData = json_encode([
        'email' => $data->email,
        'sifre' => $hashedPassword,
        'temp_password' => $tempPassword
    ]);
    
    // Eski kodları sil
    $query = "DELETE FROM verification_codes WHERE email = :email AND type = 'admin_verification'";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();
    
    // Yeni kod kaydet
    $query = "INSERT INTO verification_codes (email, code, user_data, type, expires_at) 
              VALUES (:email, :code, :user_data, 'admin_verification', :expires_at)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':code', $code);
    $stmt->bindParam(':user_data', $userData);
    $stmt->bindParam(':expires_at', $expires_at);
    $stmt->execute();
    
    // E-posta gönder
    try {
        $emailService = new EmailService();
        $result = $emailService->sendAdminVerificationCode($data->email, $code, $tempPassword);
    } catch (Exception $e) {
        error_log("Email send error: " . $e->getMessage());
    }
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'mesaj' => 'Doğrulama kodu e-posta adresine gönderildi',
        'email' => $data->email
    ], JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'mesaj' => 'Bir hata oluştu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
