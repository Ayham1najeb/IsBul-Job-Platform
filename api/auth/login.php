<?php
/**
 * Kullanıcı Giriş Endpoint
 * Kullanıcı girişi için API endpoint
 */

// CORS Headers
require_once '../config/cors_headers.php';

// Rate Limiting - Brute force saldırılarına karşı koruma
require_once '../middleware/rate_limiter.php';
require_once '../utils/input_sanitizer.php';

// Rate limit kontrolü - IP bazlı
$clientIP = RateLimiter::getClientIP();
RateLimiter::check($clientIP);

include_once '../config/database.php';
include_once '../models/User.php';
include_once '../utils/jwt.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->email) && !empty($data->sifre)) {
    // Input sanitization - Email ve şifre temizleme
    $email = InputSanitizer::sanitizeEmail($data->email);
    if (!$email) {
        http_response_code(400);
        echo json_encode(array("message" => "Geçersiz e-posta formatı"));
        exit();
    }
    
    $user->email = $email;
    
    $userData = $user->getUserByEmail();

    if($userData && password_verify($data->sifre, $userData['sifre'])) {
        // Admin ama onaylanmamışsa giriş yapamaz
        if ($userData['rol'] === 'admin' && 
            !$userData['is_super_admin'] && 
            isset($userData['admin_approved']) && 
            !$userData['admin_approved']) {
            http_response_code(403);
            echo json_encode(array(
                "message" => "Admin hesabınız henüz onaylanmadı. Lütfen Super Admin ile iletişime geçin."
            ));
            exit();
        }
        
        // Son giriş zamanını güncelle
        $user->id = $userData['id'];
        $user->updateLastLogin();

        $token_payload = array(
            "id" => $userData['id'],
            "isim" => $userData['isim'],
            "soyisim" => $userData['soyisim'],
            "email" => $userData['email'],
            "rol" => $userData['rol'],
            "is_super_admin" => isset($userData['is_super_admin']) ? (bool)$userData['is_super_admin'] : false,
            "rol_confirmed" => isset($userData['rol_confirmed']) ? (bool)$userData['rol_confirmed'] : true,
            "exp" => time() + (86400 * 30) // 30 gün
        );

        $jwt = JWT::encode($token_payload);

        http_response_code(200);
        echo json_encode(array(
            "message" => "Giriş başarılı",
            "token" => $jwt,
            "user" => array(
                "id" => $userData['id'],
                "isim" => $userData['isim'],
                "soyisim" => $userData['soyisim'],
                "email" => $userData['email'],
                "telefon" => $userData['telefon'],
                "sehir_id" => $userData['sehir_id'],
                "sehir" => $userData['sehir'],
                "ilce_id" => $userData['ilce_id'],
                "ilce" => $userData['ilce'],
                "rol" => $userData['rol'],
                "profil_foto" => $userData['profil_foto'],
                "profil_resmi" => $userData['profil_resmi']
            )
        ));
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Geçersiz e-posta veya şifre"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Eksik bilgi"));
}
?>
