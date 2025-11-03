<?php
/**
 * Tüm Bildirimleri Okundu Olarak İşaretle Endpoint
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

$notification = new Notification($db);

if ($notification->markAllAsRead($user_data->id)) {
    http_response_code(200);
    echo json_encode(array("mesaj" => "Tüm bildirimler okundu olarak işaretlendi."), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode(array("mesaj" => "Bildirimler güncellenemedi."), JSON_UNESCAPED_UNICODE);
}

