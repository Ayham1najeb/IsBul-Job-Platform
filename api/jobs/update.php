<?php
/**
 * İş İlanı Güncelleme Endpoint
 * Mevcut ilanı günceller (Sadece ilan sahibi şirket)
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-auth-token");

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

$job->id = $data->id;
$job->firma_id = $user_data->id;
$job->baslik = $data->baslik;
$job->kategori_id = $data->kategori_id;
$job->sehir_id = $data->sehir_id;
$job->ilce_id = isset($data->ilce_id) ? $data->ilce_id : null;
$job->aciklama = $data->aciklama;
$job->gereksinimler = isset($data->gereksinimler) ? $data->gereksinimler : null;
$job->sorumluluklar = isset($data->sorumluluklar) ? $data->sorumluluklar : null;
$job->maas_aralik = isset($data->maas_aralik) ? $data->maas_aralik : null;
$job->calisma_sekli = isset($data->calisma_sekli) ? $data->calisma_sekli : 'full-time';
$job->pozisyon_seviyesi = isset($data->pozisyon_seviyesi) ? $data->pozisyon_seviyesi : 'mid';
$job->deneyim_yili = isset($data->deneyim_yili) ? $data->deneyim_yili : 0;
$job->egitim_seviyesi = isset($data->egitim_seviyesi) ? $data->egitim_seviyesi : null;
$job->son_basvuru_tarihi = isset($data->son_basvuru_tarihi) ? $data->son_basvuru_tarihi : null;

if ($job->update()) {
    http_response_code(200);
    echo json_encode(array("mesaj" => "İlan güncellendi."), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode(array("mesaj" => "İlan güncellenemedi."), JSON_UNESCAPED_UNICODE);
}
