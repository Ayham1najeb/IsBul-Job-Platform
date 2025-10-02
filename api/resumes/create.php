<?php
/**
 * Özgeçmiş Oluştur Endpoint
 */

include_once '../config/database.php';
include_once '../models/Resume.php';
include_once '../middleware/auth.php';

$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(array("mesaj" => $auth['message']), JSON_UNESCAPED_UNICODE);
    exit();
}

$user_data = $auth['data'];

$database = new Database();
$db = $database->getConnection();

$resume = new Resume($db);
$data = json_decode(file_get_contents("php://input"));

$resume->kullanici_id = $user_data->id;
$resume->baslik = $data->baslik;
$resume->ozet = isset($data->ozet) ? $data->ozet : null;
$resume->deneyimler = isset($data->deneyimler) ? json_encode($data->deneyimler) : null;
$resume->egitimler = isset($data->egitimler) ? json_encode($data->egitimler) : null;
$resume->beceriler = isset($data->beceriler) ? json_encode($data->beceriler) : null;
$resume->diller = isset($data->diller) ? json_encode($data->diller) : null;
$resume->sertifikalar = isset($data->sertifikalar) ? json_encode($data->sertifikalar) : null;

if ($resume->create()) {
    http_response_code(201);
    echo json_encode(
        array(
            "mesaj" => "Özgeçmiş oluşturuldu.",
            "ozgecmis_id" => $resume->id
        ),
        JSON_UNESCAPED_UNICODE
    );
} else {
    http_response_code(500);
    echo json_encode(array("mesaj" => "Özgeçmiş oluşturulamadı."), JSON_UNESCAPED_UNICODE);
}
