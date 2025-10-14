<?php
/**
 * إعادة تعيين كلمة المرور
 */

require_once '../config/cors_headers.php';
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (empty($data->email) || empty($data->code) || empty($data->new_password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'mesaj' => 'Tüm alanlar gerekli'], JSON_UNESCAPED_UNICODE);
    exit();
}

try {
    // Kodu doğrula
    $query = "SELECT * FROM verification_codes 
              WHERE email = :email 
              AND code = :code 
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
    
    // Şifre güncelle
    $hashed_password = password_hash($data->new_password, PASSWORD_BCRYPT);
    
    $query = "UPDATE kullanicilar SET sifre = :sifre WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':sifre', $hashed_password);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();
    
    // Kod durumunu güncelle
    $query = "UPDATE verification_codes SET verified = TRUE WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $verification['id']);
    $stmt->execute();
    
    // Bu e-posta için tüm eski kodları sil
    $query = "DELETE FROM verification_codes WHERE email = :email AND id != :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':id', $verification['id']);
    $stmt->execute();
    
    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'mesaj' => 'Şifreniz başarıyla değiştirildi'
    ], JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'mesaj' => 'Bir hata oluştu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
