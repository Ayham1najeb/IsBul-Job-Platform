<?php
/**
 * Profil Fotoğrafı Yükleme Endpoint
 * Kullanıcı profil fotoğrafı yükleme
 */

// CORS Headers
require_once '../config/cors_headers.php';

require_once '../config/database.php';
require_once '../middleware/auth.php';

// Kimlik doğrulama
$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(['success' => false, 'mesaj' => $auth['message']]);
    exit();
}

$user_id = $auth['data']->id;

try {
    // Dosya yüklendi mi kontrol et
    if (!isset($_FILES['photo']) || $_FILES['photo']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('Dosya yüklenemedi');
    }

    $file = $_FILES['photo'];
    
    // Dosya türü kontrolü
    $allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    $file_type = mime_content_type($file['tmp_name']);
    
    if (!in_array($file_type, $allowed_types)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'mesaj' => 'Sadece resim dosyaları yüklenebilir (JPG, PNG, GIF, WEBP)'
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }
    
    // Dosya boyutu sınırı kaldırıldı çünkü sıkıştırma ön yüzde yapılıyor
    // Resim zaten sıkıştırılmış olarak geliyor
    
    // Upload klasörünü oluştur
    $upload_dir = '../../uploads/profiles/';
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }
    
    // Benzersiz dosya adı oluştur
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = 'user_' . $user_id . '_' . time() . '.' . $extension;
    $filepath = $upload_dir . $filename;
    
    // Dosyayı taşı
    if (!move_uploaded_file($file['tmp_name'], $filepath)) {
        throw new Exception('Dosya kaydedilemedi');
    }
    
    // Veritabanını güncelle
    $database = new Database();
    $db = $database->getConnection();
    
    // Eski fotoğrafı sil
    $query = "SELECT profil_foto FROM kullanicilar WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $user_id);
    $stmt->execute();
    $old_photo = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($old_photo && $old_photo['profil_foto'] && file_exists('../../' . $old_photo['profil_foto'])) {
        unlink('../../' . $old_photo['profil_foto']);
    }
    
    // Yeni fotoğraf yolunu kaydet
    $photo_path = 'uploads/profiles/' . $filename;
    $full_url = 'http://localhost/IsBul-Job-Platform/' . $photo_path;
    
    $query = "UPDATE kullanicilar SET profil_foto = :profil_foto WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':profil_foto', $full_url);
    $stmt->bindParam(':id', $user_id);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'mesaj' => 'Profil fotoğrafı başarıyla güncellendi',
            'profil_foto' => $full_url
        ], JSON_UNESCAPED_UNICODE);
    } else {
        throw new Exception('Veritabanı güncellenemedi');
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'mesaj' => 'Fotoğraf yüklenirken bir hata oluştu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
