<?php
/**
 * Şirketin Tüm Başvurularını Getir
 * Şirketin tüm ilanlarına yapılan başvuruları listele
 */

require_once '../config/cors_headers.php';
include_once '../config/database.php';
include_once '../middleware/auth.php';

$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(array("mesaj" => $auth['message']), JSON_UNESCAPED_UNICODE);
    exit();
}

// Sadece şirketler erişebilir
if ($auth['data']->rol !== 'firma') {
    http_response_code(403);
    echo json_encode(array("mesaj" => "Bu işlem için yetkiniz yok"), JSON_UNESCAPED_UNICODE);
    exit();
}

$database = new Database();
$db = $database->getConnection();

try {
    // Şirketin ID'sini bul
    $firma_query = "SELECT id FROM firmalar WHERE kullanici_id = :kullanici_id";
    $firma_stmt = $db->prepare($firma_query);
    $firma_stmt->bindParam(':kullanici_id', $auth['data']->id);
    $firma_stmt->execute();
    $firma = $firma_stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$firma) {
        http_response_code(404);
        echo json_encode(array("mesaj" => "Şirket profili bulunamadı"), JSON_UNESCAPED_UNICODE);
        exit();
    }
    
    // Şirketin tüm ilanlarına yapılan başvuruları getir
    $query = "SELECT 
                b.*,
                k.isim,
                k.soyisim,
                k.email,
                k.telefon,
                i.baslik as ilan_baslik,
                (SELECT COUNT(*) FROM is_deneyimleri WHERE kullanici_id = b.kullanici_id) as deneyim_sayisi,
                (SELECT COUNT(*) FROM egitim_bilgileri WHERE kullanici_id = b.kullanici_id) as egitim_sayisi,
                (SELECT COUNT(*) FROM kullanici_becerileri_detay WHERE kullanici_id = b.kullanici_id) as beceri_sayisi
              FROM basvurular b
              LEFT JOIN kullanicilar k ON b.kullanici_id = k.id
              LEFT JOIN ilanlar i ON b.ilan_id = i.id
              WHERE i.firma_id = :firma_id
              ORDER BY b.basvuru_tarihi DESC";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':firma_id', $firma['id']);
    $stmt->execute();
    
    $basvurular = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    http_response_code(200);
    echo json_encode(
        array(
            "success" => true,
            "kayitlar" => $basvurular
        ),
        JSON_UNESCAPED_UNICODE
    );
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(
        array("mesaj" => "Başvurular yüklenemedi: " . $e->getMessage()),
        JSON_UNESCAPED_UNICODE
    );
}
