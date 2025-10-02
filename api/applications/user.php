<?php
/**
 * Kullanıcının Başvuruları Endpoint
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Application.php';
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

$application = new Application($db);

$stmt = $application->getUserApplications($user_data->id);
$num = $stmt->rowCount();

if ($num > 0) {
    $basvurular = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        array_push($basvurular, $row);
    }
    
    http_response_code(200);
    echo json_encode(array("kayitlar" => $basvurular), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(200);
    echo json_encode(array("mesaj" => "Başvuru bulunamadı.", "kayitlar" => array()), JSON_UNESCAPED_UNICODE);
}
