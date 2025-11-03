<?php
/**
 * Yeni Mesajlar Endpoint
 * Belirli bir mesaj ID'sinden sonraki yeni mesajları getirir
 */

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
$other_user_id = isset($_GET['user_id']) ? (int)$_GET['user_id'] : null;
$last_message_id = isset($_GET['last_message_id']) ? (int)$_GET['last_message_id'] : 0;

if (!$other_user_id) {
    http_response_code(400);
    echo json_encode(array("mesaj" => "Kullanıcı ID gerekli."), JSON_UNESCAPED_UNICODE);
    exit();
}

$database = new Database();
$db = $database->getConnection();

$message = new Message($db);

$stmt = $message->getNewMessages($user_data->id, $other_user_id, $last_message_id);
$yeni_mesajlar = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    array_push($yeni_mesajlar, $row);
}

http_response_code(200);
echo json_encode(array(
    "kayitlar" => $yeni_mesajlar,
    "mesajlar" => $yeni_mesajlar,
    "toplam" => count($yeni_mesajlar)
), JSON_UNESCAPED_UNICODE);

