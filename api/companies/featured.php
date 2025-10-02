<?php
/**
 * Öne Çıkan Şirketler API
 * Ana sayfada gösterilecek öne çıkan şirketler
 */

// OPTIONS request için (preflight) - CORS .htaccess'te
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    // Öne çıkan şirketleri getir (en çok ilanı olan ilk 6 şirket)
    $query = "SELECT 
                k.id,
                k.isim,
                k.logo,
                k.website,
                s.isim as sektor,
                seh.isim as sehir,
                COUNT(i.id) as acik_pozisyon
              FROM kullanicilar k
              LEFT JOIN sektorler s ON k.sektor_id = s.id
              LEFT JOIN sehirler seh ON k.sehir_id = seh.id
              LEFT JOIN ilanlar i ON k.id = i.firma_id AND i.aktif = 1
              WHERE k.rol = 'firma' AND k.aktif = 1
              GROUP BY k.id, k.isim, k.logo, k.website, s.isim, seh.isim
              ORDER BY acik_pozisyon DESC, k.olusturulma_tarihi DESC
              LIMIT 6";

    $stmt = $db->prepare($query);
    $stmt->execute();
    $companies = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Logo URL'lerini düzenle
    foreach ($companies as &$company) {
        if ($company['logo']) {
            $company['logo'] = 'http://localhost/IsBul/api/' . $company['logo'];
        }
        $company['acik_pozisyon'] = (int)$company['acik_pozisyon'];
    }

    // Başarılı yanıt
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => $companies
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'mesaj' => 'Şirketler yüklenirken bir hata oluştu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
