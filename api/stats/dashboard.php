<?php
/**
 * Dashboard İstatistikleri API
 * Ana sayfa için istatistik verileri
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

    // Aktif iş ilanları sayısı
    $query = "SELECT COUNT(*) as total FROM ilanlar WHERE aktif = 1";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $jobs = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;

    // Şirket sayısı
    $query = "SELECT COUNT(*) as total FROM kullanicilar WHERE rol = 'firma' AND aktif = 1";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $companies = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;

    // Kullanıcı sayısı (toplam aktif kullanıcılar)
    $query = "SELECT COUNT(*) as total FROM kullanicilar WHERE aktif = 1";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $users = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;

    // Başvuru sayısı
    $query = "SELECT COUNT(*) as total FROM basvurular";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $applications = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;

    // Başarılı yanıt
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => [
            'jobs' => (int)$jobs,
            'companies' => (int)$companies,
            'users' => (int)$users,
            'applications' => (int)$applications
        ]
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'mesaj' => 'İstatistikler yüklenirken bir hata oluştu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
