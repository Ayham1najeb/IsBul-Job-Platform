<?php
/**
 * Başvuru Oluşturma Endpoint
 */

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

if ($user_data->rol !== 'is_arayan') {
    http_response_code(403);
    echo json_encode(array("mesaj" => "Sadece iş arayanlar başvuru yapabilir."), JSON_UNESCAPED_UNICODE);
    exit();
}

$database = new Database();
$db = $database->getConnection();

$application = new Application($db);
$data = json_decode(file_get_contents("php://input"));

if (empty($data->ilan_id)) {
    http_response_code(400);
    echo json_encode(array("mesaj" => "İlan ID gerekli."), JSON_UNESCAPED_UNICODE);
    exit();
}

$application->kullanici_id = $user_data->id;
$application->ilan_id = $data->ilan_id;
$application->ozgecmis_id = isset($data->ozgecmis_id) ? $data->ozgecmis_id : null;
$application->notlar = isset($data->notlar) ? $data->notlar : null;

if ($application->create()) {
    http_response_code(201);
    echo json_encode(
        array(
            "mesaj" => "Başvurunuz alındı.",
            "basvuru_id" => $application->id
        ),
        JSON_UNESCAPED_UNICODE
    );
} else {
    http_response_code(400);
    echo json_encode(array("mesaj" => "Bu ilana zaten başvurdunuz."), JSON_UNESCAPED_UNICODE);
}
