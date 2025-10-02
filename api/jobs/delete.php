<?php
/**
 * İş İlanı Silme Endpoint
 * İlanı siler (soft delete)
 */

include_once '../config/database.php';
include_once '../models/Job.php';
include_once '../middleware/auth.php';

// Kimlik doğrulama
$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(array("mesaj" => $auth['message']), JSON_UNESCAPED_UNICODE);
    exit();
}

$user_data = $auth['data'];

$database = new Database();
$db = $database->getConnection();

$job = new Job($db);

// ID parametresini al
$job->id = isset($_GET['id']) ? $_GET['id'] : die(json_encode(array("mesaj" => "İlan ID gerekli."), JSON_UNESCAPED_UNICODE));
$job->firma_id = $user_data->id;

if ($job->delete()) {
    http_response_code(200);
    echo json_encode(array("mesaj" => "İlan silindi."), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode(array("mesaj" => "İlan silinemedi."), JSON_UNESCAPED_UNICODE);
}
