<?php
/**
 * İş İlanları Listesi Endpoint
 * Tüm iş ilanlarını getirir (filtreleme ile)
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

include_once '../config/database.php';
include_once '../models/Job.php';

$database = new Database();
$db = $database->getConnection();

$job = new Job($db);

// GET parametrelerini al
$filters = [
    'kategori_id' => isset($_GET['kategori_id']) ? $_GET['kategori_id'] : null,
    'sehir_id' => isset($_GET['sehir_id']) ? $_GET['sehir_id'] : null,
    'calisma_sekli' => isset($_GET['calisma_sekli']) ? $_GET['calisma_sekli'] : null,
    'arama' => isset($_GET['arama']) ? $_GET['arama'] : null,
    'limit' => isset($_GET['limit']) ? (int)$_GET['limit'] : 20,
    'offset' => isset($_GET['offset']) ? (int)$_GET['offset'] : 0
];

// İlanları getir
$stmt = $job->getAll($filters);
$num = $stmt->rowCount();

if ($num > 0) {
    $ilanlar_arr = array();
    $ilanlar_arr["kayitlar"] = array();
    $ilanlar_arr["toplam"] = $job->getCount($filters);
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        
        $ilan_item = array(
            "id" => $id,
            "baslik" => $baslik,
            "firma" => array(
                "id" => $firma_id,
                "isim" => $firma_isim,
                "logo_url" => $firma_logo
            ),
            "kategori" => array(
                "id" => $kategori_id,
                "isim" => $kategori_isim
            ),
            "lokasyon" => array(
                "sehir_id" => $sehir_id,
                "sehir" => $sehir_isim,
                "ilce_id" => $ilce_id,
                "ilce" => $ilce_isim
            ),
            "aciklama" => substr($aciklama, 0, 200) . "...",
            "maas_aralik" => $maas_aralik,
            "calisma_sekli" => $calisma_sekli,
            "pozisyon_seviyesi" => $pozisyon_seviyesi,
            "deneyim_yili" => $deneyim_yili,
            "son_basvuru_tarihi" => $son_basvuru_tarihi,
            "yayinlanma_tarihi" => $yayinlanma_tarihi
        );
        
        array_push($ilanlar_arr["kayitlar"], $ilan_item);
    }
    
    http_response_code(200);
    echo json_encode($ilanlar_arr, JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(200);
    echo json_encode(
        array(
            "mesaj" => "İlan bulunamadı.",
            "kayitlar" => array(),
            "toplam" => 0
        ),
        JSON_UNESCAPED_UNICODE
    );
}
