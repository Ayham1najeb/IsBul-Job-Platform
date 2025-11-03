<?php
/**
 * Online Status Endpoint
 * Kullanıcının belirli bir sohbeti açık tutup tutmadığını kontrol eder
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
$other_user_id = isset($_GET['user_id']) ? (int)$_GET['user_id'] : null;

if (!$other_user_id) {
    http_response_code(400);
    echo json_encode(array("mesaj" => "Kullanıcı ID gerekli."), JSON_UNESCAPED_UNICODE);
    exit();
}

$database = new Database();
$db = $database->getConnection();

// Aktif sohbetler tablosundan kontrol et
// Eğer karşı taraf bu sohbeti açık tutuyorsa, aktif_sohbetler tablosunda kayıt olacak
$query = "SELECT 
            son_aktivite,
            TIMESTAMPDIFF(SECOND, son_aktivite, NOW()) as fark_saniye
          FROM aktif_sohbetler
          WHERE kullanici_id = :other_user_id 
            AND diger_kullanici_id = :user_id
            AND TIMESTAMPDIFF(SECOND, son_aktivite, NOW()) <= 30";

$stmt = $db->prepare($query);
$stmt->bindParam(':user_id', $user_data->id);
$stmt->bindParam(':other_user_id', $other_user_id);
$stmt->execute();

$result = $stmt->fetch(PDO::FETCH_ASSOC);

// Eğer kayıt varsa ve 30 saniye içindeyse, online kabul et
$is_online = ($result !== false && $result['fark_saniye'] <= 30);

http_response_code(200);
echo json_encode(array(
    "online" => $is_online,
    "son_aktivite" => $result['son_aktivite'] ?? null,
    "fark_saniye" => $result['fark_saniye'] ?? null
), JSON_UNESCAPED_UNICODE);

