<?php
/**
 * Heartbeat Endpoint
 * Kullanıcının sohbeti açık tuttuğunu bildirir
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

// Aktif sohbeti kaydet veya güncelle
$query = "INSERT INTO aktif_sohbetler (kullanici_id, diger_kullanici_id, son_aktivite)
          VALUES (:kullanici_id, :diger_kullanici_id, NOW())
          ON DUPLICATE KEY UPDATE son_aktivite = NOW()";

$stmt = $db->prepare($query);
$stmt->bindParam(':kullanici_id', $user_data->id);
$stmt->bindParam(':diger_kullanici_id', $diger_kullanici_id);

if ($stmt->execute()) {
    // Eski kayıtları temizle (30 saniyeden eski)
    $cleanup_query = "DELETE FROM aktif_sohbetler WHERE TIMESTAMPDIFF(SECOND, son_aktivite, NOW()) > 30";
    $db->exec($cleanup_query);
    
    http_response_code(200);
    echo json_encode(array("mesaj" => "Heartbeat güncellendi."), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode(array("mesaj" => "Heartbeat güncellenemedi."), JSON_UNESCAPED_UNICODE);
}

