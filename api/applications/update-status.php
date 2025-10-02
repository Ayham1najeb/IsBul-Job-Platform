<?php
/**
 * Başvuru Durumu Güncelleme Endpoint
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, x-auth-token");

include_once '../config/database.php';
include_once '../models/Application.php';
include_once '../middleware/auth.php';

$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(array("mesaj" => $auth['message']), JSON_UNESCAPED_UNICODE);
    exit();
}

$user_data = $auth['data'];

if ($user_data->rol !== 'firma') {
    http_response_code(403);
    echo json_encode(array("mesaj" => "Yetkiniz yok."), JSON_UNESCAPED_UNICODE);
    exit();
}

$database = new Database();
$db = $database->getConnection();

$application = new Application($db);
$data = json_decode(file_get_contents("php://input"));

if (empty($data->id) || empty($data->durum)) {
    http_response_code(400);
    echo json_encode(array("mesaj" => "Başvuru ID ve durum gerekli."), JSON_UNESCAPED_UNICODE);
    exit();
}

$application->id = $data->id;
$application->durum = $data->durum;

if ($application->updateStatus()) {
    http_response_code(200);
    echo json_encode(array("mesaj" => "Başvuru durumu güncellendi."), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode(array("mesaj" => "Durum güncellenemedi."), JSON_UNESCAPED_UNICODE);
}
