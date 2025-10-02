<?php
/**
 * Şirket Detay Endpoint
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Company.php';
include_once '../models/Job.php';

$database = new Database();
$db = $database->getConnection();

$company = new Company($db);
$job = new Job($db);

$company->id = isset($_GET['id']) ? $_GET['id'] : die(json_encode(array("mesaj" => "Şirket ID gerekli."), JSON_UNESCAPED_UNICODE));

$sirket = $company->getById();

if ($sirket) {
    // Şirketin ilanlarını getir
    $ilanlar_stmt = $job->getByCompany($company->id);
    $ilanlar = array();
    
    while ($ilan = $ilanlar_stmt->fetch(PDO::FETCH_ASSOC)) {
        array_push($ilanlar, $ilan);
    }
    
    $sirket['ilanlar'] = $ilanlar;
    
    http_response_code(200);
    echo json_encode($sirket, JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(404);
    echo json_encode(array("mesaj" => "Şirket bulunamadı."), JSON_UNESCAPED_UNICODE);
}
