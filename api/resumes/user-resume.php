<?php
/**
 * Kullanıcı Özgeçmişi Endpoint
 * Belirli bir kullanıcının CV'sini getir (Şirket için)
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

$kullanici_id = isset($_GET['kullanici_id']) ? $_GET['kullanici_id'] : null;

if (!$kullanici_id) {
    http_response_code(400);
    echo json_encode(array("mesaj" => "Kullanıcı ID gerekli"), JSON_UNESCAPED_UNICODE);
    exit();
}

try {
    // Kullanıcı bilgileri
    $user_query = "SELECT isim, soyisim, email, telefon FROM kullanicilar WHERE id = :kullanici_id";
    $user_stmt = $db->prepare($user_query);
    $user_stmt->bindParam(':kullanici_id', $kullanici_id);
    $user_stmt->execute();
    $user = $user_stmt->fetch(PDO::FETCH_ASSOC);
    
    // Deneyimler
    $exp_query = "SELECT * FROM is_deneyimleri WHERE kullanici_id = :kullanici_id ORDER BY sira ASC, baslangic_tarihi DESC";
    $exp_stmt = $db->prepare($exp_query);
    $exp_stmt->bindParam(':kullanici_id', $kullanici_id);
    $exp_stmt->execute();
    $deneyimler = $exp_stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Eğitimler
    $edu_query = "SELECT * FROM egitim_bilgileri WHERE kullanici_id = :kullanici_id ORDER BY sira ASC, baslangic_tarihi DESC";
    $edu_stmt = $db->prepare($edu_query);
    $edu_stmt->bindParam(':kullanici_id', $kullanici_id);
    $edu_stmt->execute();
    $egitimler = $edu_stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Beceriler
    $skill_query = "SELECT * FROM kullanici_becerileri_detay WHERE kullanici_id = :kullanici_id";
    $skill_stmt = $db->prepare($skill_query);
    $skill_stmt->bindParam(':kullanici_id', $kullanici_id);
    $skill_stmt->execute();
    $beceriler = $skill_stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Diller
    $lang_query = "SELECT * FROM diller WHERE kullanici_id = :kullanici_id";
    $lang_stmt = $db->prepare($lang_query);
    $lang_stmt->bindParam(':kullanici_id', $kullanici_id);
    $lang_stmt->execute();
    $diller = $lang_stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Sertifikalar
    $cert_query = "SELECT * FROM sertifikalar WHERE kullanici_id = :kullanici_id";
    $cert_stmt = $db->prepare($cert_query);
    $cert_stmt->bindParam(':kullanici_id', $kullanici_id);
    $cert_stmt->execute();
    $sertifikalar = $cert_stmt->fetchAll(PDO::FETCH_ASSOC);
    
    http_response_code(200);
    echo json_encode(
        array(
            "success" => true,
            "data" => array(
                "kullanici" => $user,
                "deneyimler" => $deneyimler,
                "egitimler" => $egitimler,
                "beceriler" => $beceriler,
                "diller" => $diller,
                "sertifikalar" => $sertifikalar
            )
        ),
        JSON_UNESCAPED_UNICODE
    );
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(
        array("mesaj" => "CV yüklenemedi: " . $e->getMessage()),
        JSON_UNESCAPED_UNICODE
    );
}
