<?php
/**
 * Kullanıcı Giriş Endpoint
 * Kullanıcı girişi için API endpoint
 */

// CORS Headers
require_once '../config/cors_headers.php';

include_once '../config/database.php';
include_once '../models/User.php';
include_once '../utils/jwt.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->email) && !empty($data->sifre)) {
    $user->email = $data->email;
    
    $userData = $user->getUserByEmail();

    if($userData && password_verify($data->sifre, $userData['sifre'])) {
        // Son giriş zamanını güncelle
        $user->id = $userData['id'];
        $user->updateLastLogin();

        $token_payload = array(
            "id" => $userData['id'],
            "isim" => $userData['isim'],
            "soyisim" => $userData['soyisim'],
            "email" => $userData['email'],
            "rol" => $userData['rol'],
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
                "sehir" => $userData['sehir_id'],
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
