<?php
/**
 * Şirketler Listesi Endpoint
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Company.php';

$database = new Database();
$db = $database->getConnection();

$company = new Company($db);

$filters = [
    'sehir_id' => isset($_GET['sehir_id']) ? $_GET['sehir_id'] : null,
    'kategori_id' => isset($_GET['kategori_id']) ? $_GET['kategori_id'] : null,
    'limit' => isset($_GET['limit']) ? (int)$_GET['limit'] : 20,
    'offset' => isset($_GET['offset']) ? (int)$_GET['offset'] : 0
];

$stmt = $company->getAll($filters);
$num = $stmt->rowCount();

if ($num > 0) {
    $sirketler_arr = array();
    $sirketler_arr["kayitlar"] = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $sirket_item = array(
            "id" => $row['id'],
            "isim" => $row['isim'],
            "logo_url" => $row['logo_url'],
            "sehir" => $row['sehir_isim'],
            "kategori" => $row['kategori_isim'],
            "aciklama" => substr($row['aciklama'], 0, 150) . "...",
            "ilan_sayisi" => $row['ilan_sayisi'],
            "website" => $row['website']
        );
        
        array_push($sirketler_arr["kayitlar"], $sirket_item);
    }
    
    http_response_code(200);
    echo json_encode($sirketler_arr, JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(200);
    echo json_encode(array("mesaj" => "Şirket bulunamadı.", "kayitlar" => array()), JSON_UNESCAPED_UNICODE);
}
