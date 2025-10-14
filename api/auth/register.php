<?php
/**
 * Kullanıcı Kayıt Endpoint
 * Yeni kullanıcı kaydı için API endpoint
 */

// CORS Headers
require_once '../config/cors_headers.php';

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
        // E-postanın kullanılmadığını kontrol et
        $user->email = $data->email;
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
        $stmt->bindParam(':email', $data->email);
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
        $stmt->bindParam(':email', $data->email);
        $stmt->execute();
        
        // Doğrulama kodu oluştur
        $code = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
        $expires_at = date('Y-m-d H:i:s', strtotime('+15 minutes'));
        
        // Kullanıcı verilerini kod ile geçici olarak kaydet
        $userData = json_encode(array(
            'isim' => $data->isim,
            'soyisim' => $data->soyisim,
            'email' => $data->email,
            'sifre' => password_hash($data->sifre, PASSWORD_BCRYPT),
            'telefon' => isset($data->telefon) ? $data->telefon : '',
            'rol' => isset($data->rol) ? $data->rol : 'is_arayan'
        ));
        
        $query = "INSERT INTO verification_codes (email, code, user_data, type, expires_at) 
                  VALUES (:email, :code, :user_data, 'email_verification', :expires_at)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $data->email);
        $stmt->bindParam(':code', $code);
        $stmt->bindParam(':user_data', $userData);
        $stmt->bindParam(':expires_at', $expires_at);
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
