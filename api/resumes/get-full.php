<?php
/**
 * Özgeçmiş Tam Detay Endpoint
 * Kullanıcının tüm özgeçmiş bilgilerini getirir
 */

// CORS Headers
require_once '../config/cors_headers.php';

require_once '../config/database.php';
require_once '../middleware/auth.php';

// Kimlik doğrulama
$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(['success' => false, 'mesaj' => $auth['message']], JSON_UNESCAPED_UNICODE);
    exit();
}

$user_id = $auth['data']->id;

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Özgeçmiş ayarları
    $query = "SELECT * FROM ozgecmis_ayarlari WHERE kullanici_id = :kullanici_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':kullanici_id', $user_id);
    $stmt->execute();
    $ayarlar = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // İş deneyimleri
    $query = "SELECT * FROM is_deneyimleri WHERE kullanici_id = :kullanici_id ORDER BY sira ASC, baslangic_tarihi DESC";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':kullanici_id', $user_id);
    $stmt->execute();
    $deneyimler = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Eğitim bilgileri
    $query = "SELECT * FROM egitim_bilgileri WHERE kullanici_id = :kullanici_id ORDER BY sira ASC, baslangic_tarihi DESC";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':kullanici_id', $user_id);
    $stmt->execute();
    $egitimler = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Beceriler
    $query = "SELECT * FROM kullanici_becerileri_detay WHERE kullanici_id = :kullanici_id ORDER BY kategori, seviye DESC";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':kullanici_id', $user_id);
    $stmt->execute();
    $beceriler = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Diller
    $query = "SELECT * FROM diller WHERE kullanici_id = :kullanici_id ORDER BY seviye DESC";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':kullanici_id', $user_id);
    $stmt->execute();
    $diller = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Sertifikalar
    $query = "SELECT * FROM sertifikalar WHERE kullanici_id = :kullanici_id ORDER BY tarih DESC";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':kullanici_id', $user_id);
    $stmt->execute();
    $sertifikalar = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Projeler
    $query = "SELECT * FROM projeler WHERE kullanici_id = :kullanici_id ORDER BY sira ASC, baslangic_tarihi DESC";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':kullanici_id', $user_id);
    $stmt->execute();
    $projeler = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Referanslar
    $query = "SELECT * FROM referanslar WHERE kullanici_id = :kullanici_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':kullanici_id', $user_id);
    $stmt->execute();
    $referanslar = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => [
            'ayarlar' => $ayarlar,
            'deneyimler' => $deneyimler,
            'egitimler' => $egitimler,
            'beceriler' => $beceriler,
            'diller' => $diller,
            'sertifikalar' => $sertifikalar,
            'projeler' => $projeler,
            'referanslar' => $referanslar
        ]
    ], JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'mesaj' => 'Özgeçmiş yüklenirken bir hata oluştu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
