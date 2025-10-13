<?php
/**
 * Kullanıcının Mesajları Endpoint
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

$stmt = $message->getUserMessages($user_data->id);
$num = $stmt->rowCount();

if ($num > 0) {
    $mesajlar = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        array_push($mesajlar, $row);
    }
    
    http_response_code(200);
    echo json_encode(array("kayitlar" => $mesajlar), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(200);
    echo json_encode(array("mesaj" => "Mesaj bulunamadı.", "kayitlar" => array()), JSON_UNESCAPED_UNICODE);
}
