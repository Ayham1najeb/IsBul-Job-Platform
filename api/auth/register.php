<?php
/**
 * Kullanıcı Kayıt Endpoint
 * Yeni kullanıcı kaydı için API endpoint
 */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-auth-token");

include_once '../config/database.php';
include_once '../models/User.php';
include_once '../utils/jwt.php';

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
    $user->isim = $data->isim;
    $user->soyisim = $data->soyisim;
    $user->email = $data->email;
    $user->sifre = $data->sifre;
    $user->telefon = isset($data->telefon) ? $data->telefon : '';
    $user->rol = isset($data->rol) ? $data->rol : 'is_arayan';

    // E-posta adresi zaten kullanılıyor mu kontrol et
    if($user->emailExists()) {
        http_response_code(400);
        echo json_encode(array("message" => "Bu e-posta adresi zaten kullanılıyor"));
        exit();
    }

    if($user->create()) {
        http_response_code(201);

        $token_payload = array(
            "id" => $user->id,
            "isim" => $user->isim,
            "soyisim" => $user->soyisim,
            "email" => $user->email,
            "rol" => $user->rol,
            "exp" => time() + (86400 * 30) // 30 gün
        );

        $jwt = JWT::encode($token_payload);

        echo json_encode(array(
            "message" => "Kullanıcı başarıyla kaydedildi",
            "token" => $jwt,
            "user" => array(
                "id" => $user->id,
                "isim" => $user->isim,
                "soyisim" => $user->soyisim,
                "email" => $user->email,
                "rol" => $user->rol
            )
        ));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Kullanıcı kaydedilemedi"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Eksik bilgi"));
}
?>
