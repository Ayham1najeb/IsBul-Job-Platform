<?php
/**
 * Özgeçmiş Getir Endpoint
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Resume.php';
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

$resume = new Resume($db);

$ozgecmis = $resume->getByUserId($user_data->id);

if ($ozgecmis) {
    http_response_code(200);
    echo json_encode($ozgecmis, JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(404);
    echo json_encode(array("mesaj" => "Özgeçmiş bulunamadı."), JSON_UNESCAPED_UNICODE);
}
