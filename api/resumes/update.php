<?php
/**
 * Özgeçmiş Güncelle Endpoint
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, x-auth-token");

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

$resume->id = $data->id;
$resume->kullanici_id = $user_data->id;
$resume->baslik = $data->baslik;
$resume->ozet = isset($data->ozet) ? $data->ozet : null;
$resume->deneyimler = isset($data->deneyimler) ? json_encode($data->deneyimler) : null;
$resume->egitimler = isset($data->egitimler) ? json_encode($data->egitimler) : null;
$resume->beceriler = isset($data->beceriler) ? json_encode($data->beceriler) : null;
$resume->diller = isset($data->diller) ? json_encode($data->diller) : null;
$resume->sertifikalar = isset($data->sertifikalar) ? json_encode($data->sertifikalar) : null;

if ($resume->update()) {
    http_response_code(200);
    echo json_encode(array("mesaj" => "Özgeçmiş güncellendi."), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode(array("mesaj" => "Özgeçmiş güncellenemedi."), JSON_UNESCAPED_UNICODE);
}
