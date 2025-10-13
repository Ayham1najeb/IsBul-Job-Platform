<?php
/**
 * Mesaj Gönder Endpoint
 */

// CORS Headers
require_once '../config/cors_headers.php';

include_once '../config/database.php';
include_once '../models/Message.php';
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

$message = new Message($db);
$data = json_decode(file_get_contents("php://input"));

if (empty($data->alici_id) || empty($data->mesaj)) {
    http_response_code(400);
    echo json_encode(array("mesaj" => "Alıcı ve mesaj gerekli."), JSON_UNESCAPED_UNICODE);
    exit();
}

$message->gonderen_id = $user_data->id;
$message->alici_id = $data->alici_id;
$message->konu = isset($data->konu) ? $data->konu : 'Mesaj';
$message->mesaj = $data->mesaj;

if ($message->send()) {
    http_response_code(201);
    echo json_encode(
        array(
            "mesaj" => "Mesaj gönderildi.",
            "mesaj_id" => $message->id
        ),
        JSON_UNESCAPED_UNICODE
    );
} else {
    http_response_code(500);
    echo json_encode(array("mesaj" => "Mesaj gönderilemedi."), JSON_UNESCAPED_UNICODE);
}
