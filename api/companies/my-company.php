<?php
/**
 * Şirketin Kendi Bilgilerini Getir
 * Giriş yapmış şirketin bilgilerini döndürür
 */

require_once '../config/cors_headers.php';
include_once '../config/database.php';
include_once '../models/Company.php';
include_once '../middleware/auth.php';

// Kimlik doğrulama kontrolü
$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(array("mesaj" => $auth['message']), JSON_UNESCAPED_UNICODE);
    exit();
}

$user_data = $auth['data'];

// Sadece şirketler erişebilir
if ($user_data->rol !== 'firma') {
    http_response_code(403);
    echo json_encode(array("mesaj" => "Bu işlem sadece şirketler için geçerlidir."), JSON_UNESCAPED_UNICODE);
    exit();
}

$database = new Database();
$db = $database->getConnection();

// Şirket bilgilerini getir
$query = "SELECT 
            f.*,
            s.isim as sehir_isim,
            il.isim as ilce_isim,
            k.isim as kategori_isim,
            COUNT(DISTINCT i.id) as ilan_sayisi,
            COUNT(DISTINCT b.id) as basvuru_sayisi
          FROM firmalar f
          LEFT JOIN sehirler s ON f.sehir_id = s.id
          LEFT JOIN ilceler il ON f.ilce_id = il.id
          LEFT JOIN kategoriler k ON f.kategori_id = k.id
          LEFT JOIN ilanlar i ON f.id = i.firma_id
          LEFT JOIN basvurular b ON i.id = b.ilan_id
          WHERE f.kullanici_id = :kullanici_id
          GROUP BY f.id
          LIMIT 1";

$stmt = $db->prepare($query);
$stmt->bindParam(':kullanici_id', $user_data->id);
$stmt->execute();

$firma = $stmt->fetch(PDO::FETCH_ASSOC);

if ($firma) {
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
    
    $firma['profil_tamamlanma'] = $completion;
    $firma['ilan_olusturabilir'] = $completion >= 50;
    
    http_response_code(200);
    echo json_encode($firma, JSON_UNESCAPED_UNICODE);
} else {
    // Şirket kaydı yok
    http_response_code(404);
    echo json_encode(
        array(
            "mesaj" => "Şirket profili bulunamadı. Lütfen önce şirket profilinizi oluşturun.",
            "firma_var" => false
        ),
        JSON_UNESCAPED_UNICODE
    );
}
