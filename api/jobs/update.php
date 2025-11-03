<?php
/**
 * İş İlanı Güncelleme Endpoint
 * Mevcut ilanı günceller (Sadece ilan sahibi şirket)
 */

include_once '../config/database.php';
include_once '../models/Job.php';
include_once '../middleware/auth.php';
require_once '../utils/input_sanitizer.php';

// Kimlik doğrulama
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

$job = new Job($db);

// POST verilerini al
$data = json_decode(file_get_contents("php://input"));

if (empty($data->id)) {
    http_response_code(400);
    echo json_encode(array("mesaj" => "İlan ID gerekli."), JSON_UNESCAPED_UNICODE);
    exit();
}

// Input sanitization
$job->id = InputSanitizer::sanitizeInt($data->id);
$job->firma_id = $user_data->id;
$job->baslik = InputSanitizer::preventXSS($data->baslik);
$job->kategori_id = InputSanitizer::sanitizeInt($data->kategori_id);
$job->sehir_id = InputSanitizer::sanitizeInt($data->sehir_id);
$job->ilce_id = isset($data->ilce_id) ? InputSanitizer::sanitizeInt($data->ilce_id) : null;
$job->aciklama = InputSanitizer::preventXSS($data->aciklama);
$job->gereksinimler = isset($data->gereksinimler) ? InputSanitizer::preventXSS($data->gereksinimler) : null;
$job->sorumluluklar = isset($data->sorumluluklar) ? InputSanitizer::preventXSS($data->sorumluluklar) : null;
$job->maas_aralik = isset($data->maas_aralik) ? InputSanitizer::sanitizeString($data->maas_aralik) : null;
$job->calisma_sekli = isset($data->calisma_sekli) ? InputSanitizer::sanitizeString($data->calisma_sekli) : 'full-time';
$job->pozisyon_seviyesi = isset($data->pozisyon_seviyesi) ? InputSanitizer::sanitizeString($data->pozisyon_seviyesi) : 'mid';
$job->deneyim_yili = isset($data->deneyim_yili) ? InputSanitizer::sanitizeInt($data->deneyim_yili) : 0;
$job->egitim_seviyesi = isset($data->egitim_seviyesi) ? InputSanitizer::sanitizeString($data->egitim_seviyesi) : null;
$job->son_basvuru_tarihi = isset($data->son_basvuru_tarihi) ? InputSanitizer::sanitizeString($data->son_basvuru_tarihi) : null;

if ($job->update()) {
    http_response_code(200);
    echo json_encode(array("mesaj" => "İlan güncellendi."), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode(array("mesaj" => "İlan güncellenemedi."), JSON_UNESCAPED_UNICODE);
}
