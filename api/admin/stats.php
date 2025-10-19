<?php
/**
 * Admin İstatistikler Endpoint
 * Platform genelindeki istatistikleri getirir
 */

require_once '../config/cors_headers.php';
require_once '../config/database.php';
require_once '../middleware/auth.php';

// Kimlik doğrulama ve admin kontrolü
$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(['success' => false, 'mesaj' => $auth['message']]);
    exit();
}

// Admin kontrolü
if ($auth['data']->rol !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'mesaj' => 'Bu işlem için yetkiniz yok']);
    exit();
}

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Toplam kullanıcı sayısı (Admin hariç)
    $query = "SELECT COUNT(*) as total FROM kullanicilar WHERE rol != 'admin'";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $totalUsers = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    // Rol bazında kullanıcı sayıları (Admin hariç)
    $query = "SELECT rol, COUNT(*) as count FROM kullanicilar WHERE rol != 'admin' GROUP BY rol";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $usersByRole = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Toplam iş ilanı sayısı (tablo yoksa 0 döndür)
    $totalJobs = 0;
    try {
        $query = "SELECT COUNT(*) as total FROM is_ilanlari";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $totalJobs = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    } catch (Exception $e) {
        // Tablo yoksa 0 olarak devam et
    }
    
    // Aktif iş ilanı sayısı
    $activeJobs = 0;
    try {
        $query = "SELECT COUNT(*) as total FROM is_ilanlari WHERE durum = 'aktif'";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $activeJobs = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    } catch (Exception $e) {}
    
    // Toplam başvuru sayısı
    $totalApplications = 0;
    try {
        $query = "SELECT COUNT(*) as total FROM basvurular";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $totalApplications = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    } catch (Exception $e) {}
    
    // Bu ayki başvuru sayısı
    $monthlyApplications = 0;
    try {
        $query = "SELECT COUNT(*) as total FROM basvurular 
                  WHERE MONTH(basvuru_tarihi) = MONTH(CURRENT_DATE()) 
                  AND YEAR(basvuru_tarihi) = YEAR(CURRENT_DATE())";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $monthlyApplications = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    } catch (Exception $e) {}
    
    // Toplam şirket sayısı
    $totalCompanies = 0;
    try {
        $query = "SELECT COUNT(DISTINCT firma_id) as total FROM is_ilanlari";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $totalCompanies = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    } catch (Exception $e) {}
    
    // Son 7 günün istatistikleri (Admin hariç)
    $weeklyUsers = [];
    try {
        $query = "SELECT DATE(olusturulma_tarihi) as tarih, COUNT(*) as sayi 
                  FROM kullanicilar 
                  WHERE olusturulma_tarihi >= DATE_SUB(NOW(), INTERVAL 7 DAY)
                  AND rol != 'admin'
                  GROUP BY DATE(olusturulma_tarihi)
                  ORDER BY tarih DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $weeklyUsers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {}
    
    // Son 7 günün iş ilanları
    $weeklyJobs = [];
    try {
        $query = "SELECT DATE(olusturulma_tarihi) as tarih, COUNT(*) as sayi 
                  FROM is_ilanlari 
                  WHERE olusturulma_tarihi >= DATE_SUB(NOW(), INTERVAL 7 DAY)
                  GROUP BY DATE(olusturulma_tarihi)
                  ORDER BY tarih DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $weeklyJobs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {}
    
    // Popüler kategoriler
    $popularCategories = [];
    try {
        $query = "SELECT k.isim, COUNT(i.id) as ilan_sayisi 
                  FROM kategoriler k
                  LEFT JOIN is_ilanlari i ON k.id = i.kategori_id
                  GROUP BY k.id, k.isim
                  ORDER BY ilan_sayisi DESC
                  LIMIT 10";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $popularCategories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {}
    
    // Popüler şehirler
    $popularCities = [];
    try {
        $query = "SELECT sehir, COUNT(*) as ilan_sayisi 
                  FROM is_ilanlari 
                  WHERE sehir IS NOT NULL
                  GROUP BY sehir
                  ORDER BY ilan_sayisi DESC
                  LIMIT 10";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $popularCities = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {}

    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => [
            'genel' => [
                'toplam_kullanici' => (int)$totalUsers,
                'toplam_ilan' => (int)$totalJobs,
                'aktif_ilan' => (int)$activeJobs,
                'toplam_basvuru' => (int)$totalApplications,
                'aylik_basvuru' => (int)$monthlyApplications,
                'toplam_sirket' => (int)$totalCompanies
            ],
            'kullanici_rolleri' => $usersByRole,
            'haftalik_kullanicilar' => $weeklyUsers,
            'haftalik_ilanlar' => $weeklyJobs,
            'populer_kategoriler' => $popularCategories,
            'populer_sehirler' => $popularCities
        ]
    ], JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'mesaj' => 'İstatistikler alınırken bir hata oluştu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
