<?php
/**
 * Kullanıcı Dashboard İstatistikleri
 * Kullanıcıya özel istatistikleri getirir
 */

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
$user_rol = $auth['data']->rol;

try {
    $database = new Database();
    $db = $database->getConnection();
    
    $stats = [];
    
    if ($user_rol === 'is_arayan') {
        // İş arayan istatistikleri
        
        // Toplam başvuru sayısı
        $query = "SELECT COUNT(*) as total FROM basvurular WHERE kullanici_id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $stats['toplam_basvuru'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Kayıtlı iş sayısı
        $query = "SELECT COUNT(*) as total FROM kaydedilen_isler WHERE kullanici_id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $stats['kayitli_isler'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Mesaj sayısı (gönderilen + alınan)
        $query = "SELECT COUNT(*) as total FROM mesajlar 
                  WHERE gonderen_id = :user_id OR alici_id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $stats['mesaj_sayisi'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Profil tamamlama yüzdesi
        $query = "SELECT isim, soyisim, email, telefon, sehir, profil_foto FROM kullanicilar WHERE id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $user_data = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $completed_fields = 0;
        $total_fields = 6;
        if (!empty($user_data['isim'])) $completed_fields++;
        if (!empty($user_data['soyisim'])) $completed_fields++;
        if (!empty($user_data['email'])) $completed_fields++;
        if (!empty($user_data['telefon'])) $completed_fields++;
        if (!empty($user_data['sehir'])) $completed_fields++;
        if (!empty($user_data['profil_foto'])) $completed_fields++;
        
        $stats['profil_tamamlama'] = round(($completed_fields / $total_fields) * 100);
        
        // Son başvurular
        $query = "SELECT b.*, i.baslik, i.firma_adi, i.sehir 
                  FROM basvurular b
                  JOIN is_ilanlari i ON b.ilan_id = i.id
                  WHERE b.kullanici_id = :user_id
                  ORDER BY b.basvuru_tarihi DESC
                  LIMIT 5";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $stats['son_basvurular'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Önerilen işler (kullanıcının şehrine göre)
        $query = "SELECT i.* FROM is_ilanlari i
                  WHERE i.durum = 'aktif' 
                  AND i.sehir = :sehir
                  ORDER BY i.olusturulma_tarihi DESC
                  LIMIT 5";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':sehir', $user_data['sehir']);
        $stmt->execute();
        $stats['onerilen_isler'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
    } else if ($user_rol === 'firma') {
        // Şirket istatistikleri
        
        // Toplam ilan sayısı
        $query = "SELECT COUNT(*) as total FROM is_ilanlari WHERE firma_id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $stats['toplam_ilan'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Aktif ilan sayısı
        $query = "SELECT COUNT(*) as total FROM is_ilanlari 
                  WHERE firma_id = :user_id AND durum = 'aktif'";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $stats['aktif_ilan'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Toplam başvuru sayısı
        $query = "SELECT COUNT(*) as total FROM basvurular b
                  JOIN is_ilanlari i ON b.ilan_id = i.id
                  WHERE i.firma_id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $stats['toplam_basvuru'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Bu ayki başvuru sayısı
        $query = "SELECT COUNT(*) as total FROM basvurular b
                  JOIN is_ilanlari i ON b.ilan_id = i.id
                  WHERE i.firma_id = :user_id
                  AND MONTH(b.basvuru_tarihi) = MONTH(CURRENT_DATE())
                  AND YEAR(b.basvuru_tarihi) = YEAR(CURRENT_DATE())";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $stats['aylik_basvuru'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Son başvurular
        $query = "SELECT b.*, i.baslik, k.isim, k.soyisim, k.email, k.profil_foto
                  FROM basvurular b
                  JOIN is_ilanlari i ON b.ilan_id = i.id
                  JOIN kullanicilar k ON b.kullanici_id = k.id
                  WHERE i.firma_id = :user_id
                  ORDER BY b.basvuru_tarihi DESC
                  LIMIT 5";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $stats['son_basvurular'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Aktif ilanlar
        $query = "SELECT * FROM is_ilanlari 
                  WHERE firma_id = :user_id AND durum = 'aktif'
                  ORDER BY olusturulma_tarihi DESC
                  LIMIT 5";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $stats['aktif_ilanlar'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => $stats
    ], JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'mesaj' => 'İstatistikler alınırken bir hata oluştu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
