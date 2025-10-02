<?php
/**
 * İş İlanı Detay Endpoint
 * Tek bir ilanın detaylarını getirir
 */

include_once '../config/database.php';
include_once '../models/Job.php';

$database = new Database();
$db = $database->getConnection();

$job = new Job($db);

// ID parametresini al
$job->id = isset($_GET['id']) ? $_GET['id'] : die(json_encode(array("mesaj" => "İlan ID gerekli."), JSON_UNESCAPED_UNICODE));

// İlanı getir
$ilan = $job->getById();

if ($ilan) {
    http_response_code(200);
    echo json_encode($ilan, JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(404);
    echo json_encode(array("mesaj" => "İlan bulunamadı."), JSON_UNESCAPED_UNICODE);
}
