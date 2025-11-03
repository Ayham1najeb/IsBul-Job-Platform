<?php
/**
 * Heartbeat Kaldırma Endpoint
 * Kullanıcının sohbeti kapattığını bildirir
 */

require_once '../config/cors_headers.php';
include_once '../config/database.php';
include_once '../middleware/auth.php';

$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(array("mesaj" => $auth['message']), JSON_UNESCAPED_UNICODE);
    exit();
}

$user_data = $auth['data'];
$data = json_decode(file_get_contents("php://input"));

if (empty($data->diger_kullanici_id)) {
    http_response_code(400);
    echo json_encode(array("mesaj" => "Diğer kullanıcı ID gerekli."), JSON_UNESCAPED_UNICODE);
    exit();
}

$database = new Database();
$db = $database->getConnection();

$diger_kullanici_id = (int)$data->diger_kullanici_id;

// Aktif sohbeti kaldır
$query = "DELETE FROM aktif_sohbetler 
          WHERE kullanici_id = :kullanici_id 
            AND diger_kullanici_id = :diger_kullanici_id";

$stmt = $db->prepare($query);
$stmt->bindParam(':kullanici_id', $user_data->id);
$stmt->bindParam(':diger_kullanici_id', $diger_kullanici_id);

if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode(array("mesaj" => "Heartbeat kaldırıldı."), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode(array("mesaj" => "Heartbeat kaldırılamadı."), JSON_UNESCAPED_UNICODE);
}

