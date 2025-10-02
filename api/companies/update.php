<?php
/**
 * Şirket Güncelleme Endpoint
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, x-auth-token");

include_once '../config/database.php';
include_once '../models/Company.php';
include_once '../middleware/auth.php';

$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(array("mesaj" => $auth['message']), JSON_UNESCAPED_UNICODE);
    exit();
}

$user_data = $auth['data'];

if ($user_data->rol !== 'firma') {
    http_response_code(403);
    echo json_encode(array("mesaj" => "Yetkiniz yok."), JSON_UNESCAPED_UNICODE);
    exit();
}

$database = new Database();
$db = $database->getConnection();

$company = new Company($db);
$data = json_decode(file_get_contents("php://input"));

$company->id = $data->id;
$company->kullanici_id = $user_data->id;
$company->isim = $data->isim;
$company->sehir_id = $data->sehir_id;
$company->ilce_id = isset($data->ilce_id) ? $data->ilce_id : null;
$company->kategori_id = $data->kategori_id;
$company->adres = isset($data->adres) ? $data->adres : null;
$company->telefon = isset($data->telefon) ? $data->telefon : null;
$company->email = isset($data->email) ? $data->email : null;
$company->website = isset($data->website) ? $data->website : null;
$company->aciklama = isset($data->aciklama) ? $data->aciklama : null;
$company->kurulis_yili = isset($data->kurulis_yili) ? $data->kurulis_yili : null;
$company->calisan_sayisi = isset($data->calisan_sayisi) ? $data->calisan_sayisi : null;

if ($company->update()) {
    http_response_code(200);
    echo json_encode(array("mesaj" => "Şirket güncellendi."), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode(array("mesaj" => "Şirket güncellenemedi."), JSON_UNESCAPED_UNICODE);
}
