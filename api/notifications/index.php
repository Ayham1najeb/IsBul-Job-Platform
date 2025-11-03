<?php
/**
 * Bildirimler Endpoint
 * Kullanıcının bildirimlerini getirir
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
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;

try {
    $stmt = $notification->getUserNotifications($user_data->id, $limit);
    $num = $stmt->rowCount();
    
    $bildirimler = array();
    
    if ($num > 0) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($bildirimler, $row);
        }
    }
    
    $unread_count = $notification->getUnreadCount($user_data->id);
    
    http_response_code(200);
    echo json_encode(array(
        "kayitlar" => $bildirimler,
        "okunmamis_sayisi" => $unread_count,
        "toplam" => $num
    ), JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        "mesaj" => "Bildirimler yüklenirken bir hata oluştu: " . $e->getMessage()
    ), JSON_UNESCAPED_UNICODE);
}

