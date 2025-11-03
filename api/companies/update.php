<?php
/**
 * Şirket Güncelleme Endpoint
 */

include_once '../config/database.php';
include_once '../models/Company.php';
include_once '../middleware/auth.php';
require_once '../utils/input_sanitizer.php';

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

// Input sanitization
$company->id = InputSanitizer::sanitizeInt($data->id);
$company->kullanici_id = $user_data->id;
$company->isim = InputSanitizer::preventXSS($data->isim);
$company->sehir_id = InputSanitizer::sanitizeInt($data->sehir_id);
$company->ilce_id = isset($data->ilce_id) ? InputSanitizer::sanitizeInt($data->ilce_id) : null;
$company->kategori_id = InputSanitizer::sanitizeInt($data->kategori_id);
$company->adres = isset($data->adres) ? InputSanitizer::preventXSS($data->adres) : null;
$company->telefon = isset($data->telefon) ? InputSanitizer::sanitizeString($data->telefon) : null;
$company->email = isset($data->email) ? InputSanitizer::sanitizeEmail($data->email) : null;
$company->website = isset($data->website) ? InputSanitizer::sanitizeURL($data->website) : null;
$company->aciklama = isset($data->aciklama) ? InputSanitizer::preventXSS($data->aciklama) : null;
$company->kurulis_yili = isset($data->kurulis_yili) ? InputSanitizer::sanitizeInt($data->kurulis_yili) : null;
$company->calisan_sayisi = isset($data->calisan_sayisi) ? InputSanitizer::sanitizeInt($data->calisan_sayisi) : null;

if ($company->update()) {
    http_response_code(200);
    echo json_encode(array("mesaj" => "Şirket güncellendi."), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode(array("mesaj" => "Şirket güncellenemedi."), JSON_UNESCAPED_UNICODE);
}
