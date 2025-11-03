<?php
/**
 * Bildirimi Okundu Olarak İşaretle Endpoint
 */

require_once '../config/cors_headers.php';
include_once '../config/database.php';
include_once '../models/Notification.php';
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

$data = json_decode(file_get_contents("php://input"));

if (empty($data->id)) {
    http_response_code(400);
    echo json_encode(array("mesaj" => "Bildirim ID gerekli."), JSON_UNESCAPED_UNICODE);
    exit();
}

$notification = new Notification($db);

if ($notification->markAsRead($data->id, $user_data->id)) {
    http_response_code(200);
    echo json_encode(array("mesaj" => "Bildirim okundu olarak işaretlendi."), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode(array("mesaj" => "Bildirim güncellenemedi."), JSON_UNESCAPED_UNICODE);
}

