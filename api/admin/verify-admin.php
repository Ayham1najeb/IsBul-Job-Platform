<?php
/**
 * Admin Doğrulama Endpoint
 * Admin kodunu doğrular ve hesabı aktifleştirir
 */

require_once '../config/cors_headers.php';
require_once '../config/database.php';
require_once '../utils/jwt.php';

$database = new Database();
$db = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

if (empty($data->email) || empty($data->code)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'mesaj' => 'E-posta ve kod gerekli']);
    exit();
}

try {
    // Kodu doğrula
    $query = "SELECT * FROM verification_codes 
              WHERE email = :email 
              AND code = :code 
              AND type = 'admin_verification'
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
    
    // Kullanıcı verilerini al
    $userData = json_decode($verification['user_data'], true);
    
    // Admin kullanıcısını oluştur
    $query = "INSERT INTO kullanicilar (
                isim, soyisim, email, sifre, rol, email_verified, is_super_admin
              ) VALUES (
                'Admin', 'User', :email, :sifre, 'admin', TRUE, FALSE
              )";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $userData['email']);
    $stmt->bindParam(':sifre', $userData['sifre']);
    $stmt->execute();
    
    $user_id = $db->lastInsertId();
    
    // Doğrulama durumunu güncelle
    $query = "UPDATE verification_codes SET verified = TRUE WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $verification['id']);
    $stmt->execute();
    
    // Kullanıcı bilgilerini getir
    $query = "SELECT id, isim, soyisim, email, rol, is_super_admin FROM kullanicilar WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $user_id);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // JWT token oluştur
    $token = generateToken($user);
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'mesaj' => 'Admin hesabı başarıyla oluşturuldu',
        'token' => $token,
        'user' => $user,
        'temp_password' => $userData['temp_password']
    ], JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'mesaj' => 'Bir hata oluştu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
