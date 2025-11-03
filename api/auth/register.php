<?php
/**
 * Kullanıcı Kayıt Endpoint
 * Yeni kullanıcı kaydı için API endpoint
 */

// CORS Headers
require_once '../config/cors_headers.php';

// Rate Limiting - Kayıt saldırılarına karşı koruma
require_once '../middleware/rate_limiter.php';
require_once '../utils/input_sanitizer.php';

// Rate limit kontrolü - IP bazlı
$clientIP = RateLimiter::getClientIP();
RateLimiter::check($clientIP);

include_once '../config/database.php';
include_once '../models/User.php';
include_once '../utils/jwt.php';
require_once '../utils/EmailService.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->isim) &&
    !empty($data->soyisim) &&
    !empty($data->email) &&
    !empty($data->sifre)
) {
    try {
        // Input sanitization - Tüm girdileri temizle
        $isim = InputSanitizer::sanitizeString($data->isim);
        $soyisim = InputSanitizer::sanitizeString($data->soyisim);
        $email = InputSanitizer::sanitizeEmail($data->email);
        
        if (!$email) {
            http_response_code(400);
            echo json_encode(array("message" => "Geçersiz e-posta formatı"));
            exit();
        }
        
        // E-postanın kullanılmadığını kontrol et
        $user->email = $email;
        if($user->emailExists()) {
            http_response_code(400);
            echo json_encode(array("message" => "Bu e-posta adresi zaten kullanılıyor"));
            exit();
        }
        
        // Daha önce gönderilmiş kullanılmamış doğrulama kodu var mı kontrol et
        $query = "SELECT id FROM verification_codes 
                  WHERE email = :email 
                  AND type = 'email_verification' 
                  AND verified = FALSE 
                  AND expires_at > NOW()";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $existingCode = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($existingCode) {
            http_response_code(400);
            echo json_encode(array("message" => "Bu e-posta için zaten bir doğrulama kodu gönderildi. Lütfen e-postanızı kontrol edin."));
            exit();
        }
        
        // Bu e-posta için eski süresi dolmuş kodları sil
        $query = "DELETE FROM verification_codes WHERE email = :email";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        
        // Doğrulama kodu oluştur
        $code = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
        
        // Kullanıcı verilerini kod ile geçici olarak kaydet
        // Telefon sanitization (eğer varsa)
        $telefon = isset($data->telefon) ? InputSanitizer::sanitizeString($data->telefon) : '';
        $rol = isset($data->rol) ? InputSanitizer::sanitizeString($data->rol) : 'is_arayan';
        
        $userData = json_encode(array(
            'isim' => $isim,
            'soyisim' => $soyisim,
            'email' => $email,
            'sifre' => password_hash($data->sifre, PASSWORD_BCRYPT),
            'telefon' => $telefon,
            'rol' => $rol
        ));
        
        // MySQL'in zaman dilimi ile uyumluluğu sağlamak için DATE_ADD ve NOW() kullan
        $query = "INSERT INTO verification_codes (email, code, user_data, type, expires_at) 
                  VALUES (:email, :code, :user_data, 'email_verification', DATE_ADD(NOW(), INTERVAL 15 MINUTE))";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':code', $code);
        $stmt->bindParam(':user_data', $userData);
        $stmt->execute();
        
        // Doğrulama kodunu e-posta ile gönder
        try {
            $emailService = new EmailService();
            $name = $data->isim . ' ' . $data->soyisim;
            $emailService->sendVerificationCode($data->email, $name, $code);
        } catch (Exception $e) {
            error_log("Email send error: " . $e->getMessage());
            // E-posta gönderimi başarısız olursa işlemi durdurma
        }
        
        http_response_code(201);
        echo json_encode(array(
            "message" => "Doğrulama kodu e-postanıza gönderildi. Lütfen e-postanızı kontrol edin.",
            "email" => $data->email,
            "requiresVerification" => true
        ));
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(array("message" => "Hata: " . $e->getMessage()));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Eksik bilgi"));
}
?>
