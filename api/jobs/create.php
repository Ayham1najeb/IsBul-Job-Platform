<?php
/**
 * İş İlanı Oluşturma Endpoint
 * Yeni iş ilanı oluşturur (Sadece şirketler)
 */

require_once '../config/cors_headers.php';
include_once '../config/database.php';
include_once '../models/Job.php';
include_once '../middleware/auth.php';

// Kimlik doğrulama kontrolü
$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(array("mesaj" => $auth['message']), JSON_UNESCAPED_UNICODE);
    exit();
}

$user_data = $auth['data'];

// Sadece şirketler ilan oluşturabilir
if ($user_data->rol !== 'firma') {
    http_response_code(403);
    echo json_encode(array("mesaj" => "Sadece şirketler ilan oluşturabilir."), JSON_UNESCAPED_UNICODE);
    exit();
}

$database = new Database();
$db = $database->getConnection();

// Kullanıcının firma kaydını kontrol et
$firma_query = "SELECT * FROM firmalar WHERE kullanici_id = :kullanici_id LIMIT 1";
$firma_stmt = $db->prepare($firma_query);
$firma_stmt->bindParam(':kullanici_id', $user_data->id);
$firma_stmt->execute();
$firma = $firma_stmt->fetch(PDO::FETCH_ASSOC);

if (!$firma) {
    http_response_code(400);
    echo json_encode(array("mesaj" => "Önce firma profilinizi oluşturmalısınız."), JSON_UNESCAPED_UNICODE);
    exit();
}

// Profil tamamlanma yüzdesini hesapla
$completion = 0;
$total_fields = 10;
$filled_fields = 0;

if (!empty($firma['isim'])) $filled_fields++;
if (!empty($firma['kategori_id'])) $filled_fields++;
if (!empty($firma['sehir_id'])) $filled_fields++;
if (!empty($firma['telefon'])) $filled_fields++;
if (!empty($firma['email'])) $filled_fields++;
if (!empty($firma['website'])) $filled_fields++;
if (!empty($firma['adres'])) $filled_fields++;
if (!empty($firma['aciklama'])) $filled_fields++;
if (!empty($firma['kurulus_tarihi'])) $filled_fields++;
if (!empty($firma['calisan_sayisi'])) $filled_fields++;

$completion = round(($filled_fields / $total_fields) * 100);

// %50'den az ise ilan oluşturamaz
if ($completion < 50) {
    http_response_code(403);
    echo json_encode(
        array(
            "mesaj" => "İlan yayınlayabilmek için profilinizi en az %50 tamamlamalısınız. Şu an: %" . $completion,
            "profil_tamamlanma" => $completion,
            "minimum_gerekli" => 50
        ),
        JSON_UNESCAPED_UNICODE
    );
    exit();
}

$job = new Job($db);

// POST verilerini al
$data = json_decode(file_get_contents("php://input"));

// Zorunlu alanları kontrol et
if (
    empty($data->baslik) ||
    empty($data->kategori_id) ||
    empty($data->sehir_id) ||
    empty($data->aciklama)
) {
    http_response_code(400);
    echo json_encode(array("mesaj" => "Zorunlu alanlar eksik."), JSON_UNESCAPED_UNICODE);
    exit();
}

// İlan verilerini ayarla
$job->baslik = $data->baslik;
$job->firma_id = $firma['id']; // Şirketin ID'si (firmalar tablosundan)
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

// İlanı oluştur
if ($job->create()) {
    http_response_code(201);
    echo json_encode(
        array(
            "mesaj" => "İlan başarıyla oluşturuldu.",
            "ilan_id" => $job->id
        ),
        JSON_UNESCAPED_UNICODE
    );
} else {
    http_response_code(500);
    echo json_encode(array("mesaj" => "İlan oluşturulamadı."), JSON_UNESCAPED_UNICODE);
}
