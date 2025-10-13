<?php
/**
 * Konuşma Endpoint
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

$other_user_id = isset($_GET['user_id']) ? $_GET['user_id'] : die(json_encode(array("mesaj" => "Kullanıcı ID gerekli."), JSON_UNESCAPED_UNICODE));

$database = new Database();
$db = $database->getConnection();

$message = new Message($db);

$stmt = $message->getConversation($user_data->id, $other_user_id);
$mesajlar = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    array_push($mesajlar, $row);
}

http_response_code(200);
echo json_encode(array("kayitlar" => $mesajlar), JSON_UNESCAPED_UNICODE);
