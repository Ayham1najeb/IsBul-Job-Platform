<?php
/**
 * Şirket Profili Oluştur veya Güncelle
 * Şirket bilgilerini kaydeder
 */

require_once '../config/cors_headers.php';
include_once '../config/database.php';
include_once '../middleware/auth.php';

// Kimlik doğrulama kontrolü
$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(array("mesaj" => $auth['message']), JSON_UNESCAPED_UNICODE);
    exit();
}

$user_data = $auth['data'];

// Sadece şirketler erişebilir
if ($user_data->rol !== 'firma') {
    http_response_code(403);
    echo json_encode(array("mesaj" => "Bu işlem sadece şirketler için geçerlidir."), JSON_UNESCAPED_UNICODE);
    exit();
}

$database = new Database();
$db = $database->getConnection();

// POST verilerini al
$data = json_decode(file_get_contents("php://input"));

// Zorunlu alanları kontrol et
if (
    empty($data->isim) ||
    empty($data->kategori_id) ||
    empty($data->sehir_id)
) {
    http_response_code(400);
    echo json_encode(array("mesaj" => "Zorunlu alanlar eksik (Şirket adı, kategori, şehir)."), JSON_UNESCAPED_UNICODE);
    exit();
}

// Mevcut şirket kaydını kontrol et
$check_query = "SELECT id FROM firmalar WHERE kullanici_id = :kullanici_id LIMIT 1";
$check_stmt = $db->prepare($check_query);
$check_stmt->bindParam(':kullanici_id', $user_data->id);
$check_stmt->execute();
$existing = $check_stmt->fetch(PDO::FETCH_ASSOC);

if ($existing) {
    // Güncelleme
    $query = "UPDATE firmalar SET
                isim = :isim,
                kategori_id = :kategori_id,
                sehir_id = :sehir_id,
                ilce_id = :ilce_id,
                telefon = :telefon,
                email = :email,
                website = :website,
                adres = :adres,
                aciklama = :aciklama,
                kurulus_tarihi = :kurulus_tarihi,
                calisan_sayisi = :calisan_sayisi
              WHERE kullanici_id = :kullanici_id";
    
    $stmt = $db->prepare($query);
    
    // Boş değerleri NULL'a çevir
    $ilce_id = !empty($data->ilce_id) ? $data->ilce_id : null;
    $telefon = !empty($data->telefon) ? $data->telefon : null;
    $email = !empty($data->email) ? $data->email : null;
    $website = !empty($data->website) ? $data->website : null;
    $adres = !empty($data->adres) ? $data->adres : null;
    $aciklama = !empty($data->aciklama) ? $data->aciklama : null;
    $kurulus_tarihi = !empty($data->kurulus_tarihi) ? $data->kurulus_tarihi : null;
    $calisan_sayisi = !empty($data->calisan_sayisi) ? $data->calisan_sayisi : null;
    
    // Parametreleri bağla
    $stmt->bindParam(':isim', $data->isim);
    $stmt->bindParam(':kategori_id', $data->kategori_id);
    $stmt->bindParam(':sehir_id', $data->sehir_id);
    $stmt->bindParam(':ilce_id', $ilce_id);
    $stmt->bindParam(':telefon', $telefon);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':website', $website);
    $stmt->bindParam(':adres', $adres);
    $stmt->bindParam(':aciklama', $aciklama);
    $stmt->bindParam(':kurulus_tarihi', $kurulus_tarihi);
    $stmt->bindParam(':calisan_sayisi', $calisan_sayisi);
    $stmt->bindParam(':kullanici_id', $user_data->id);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(
            array(
                "mesaj" => "Şirket bilgileri başarıyla güncellendi.",
                "firma_id" => $existing['id']
            ),
            JSON_UNESCAPED_UNICODE
        );
    } else {
        http_response_code(500);
        echo json_encode(array("mesaj" => "Şirket bilgileri güncellenemedi."), JSON_UNESCAPED_UNICODE);
    }
} else {
    // Yeni kayıt
    $query = "INSERT INTO firmalar SET
                kullanici_id = :kullanici_id,
                isim = :isim,
                kategori_id = :kategori_id,
                sehir_id = :sehir_id,
                ilce_id = :ilce_id,
                telefon = :telefon,
                email = :email,
                website = :website,
                adres = :adres,
                aciklama = :aciklama,
                kurulus_tarihi = :kurulus_tarihi,
                calisan_sayisi = :calisan_sayisi";
    
    $stmt = $db->prepare($query);
    
    // Boş değerleri NULL'a çevir
    $ilce_id = !empty($data->ilce_id) ? $data->ilce_id : null;
    $telefon = !empty($data->telefon) ? $data->telefon : null;
    $email = !empty($data->email) ? $data->email : null;
    $website = !empty($data->website) ? $data->website : null;
    $adres = !empty($data->adres) ? $data->adres : null;
    $aciklama = !empty($data->aciklama) ? $data->aciklama : null;
    $kurulus_tarihi = !empty($data->kurulus_tarihi) ? $data->kurulus_tarihi : null;
    $calisan_sayisi = !empty($data->calisan_sayisi) ? $data->calisan_sayisi : null;
    
    // Parametreleri bağla
    $stmt->bindParam(':kullanici_id', $user_data->id);
    $stmt->bindParam(':isim', $data->isim);
    $stmt->bindParam(':kategori_id', $data->kategori_id);
    $stmt->bindParam(':sehir_id', $data->sehir_id);
    $stmt->bindParam(':ilce_id', $ilce_id);
    $stmt->bindParam(':telefon', $telefon);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':website', $website);
    $stmt->bindParam(':adres', $adres);
    $stmt->bindParam(':aciklama', $aciklama);
    $stmt->bindParam(':kurulus_tarihi', $kurulus_tarihi);
    $stmt->bindParam(':calisan_sayisi', $calisan_sayisi);
    
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(
            array(
                "mesaj" => "Şirket profili başarıyla oluşturuldu.",
                "firma_id" => $db->lastInsertId()
            ),
            JSON_UNESCAPED_UNICODE
        );
    } else {
        http_response_code(500);
        echo json_encode(array("mesaj" => "Şirket profili oluşturulamadı."), JSON_UNESCAPED_UNICODE);
    }
}
