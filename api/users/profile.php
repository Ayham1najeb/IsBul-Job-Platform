<?php
/**
 * Kullanıcı Profil Endpoint
 * Profil bilgilerini görüntüleme ve güncelleme
 */

require_once '../config/cors_headers.php';
require_once '../config/database.php';
require_once '../middleware/auth.php';

$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(['success' => false, 'mesaj' => $auth['message']], JSON_UNESCAPED_UNICODE);
    exit();
}

$user_id = $auth['data']->id;
$method = $_SERVER['REQUEST_METHOD'];
$database = new Database();
$db = $database->getConnection();

try {
    if ($method === 'GET') {
        // Profil bilgilerini getir (şehir ve ilçe isimleriyle birlikte)
        $query = "SELECT k.id, k.isim, k.soyisim, k.email, k.telefon, k.dogum_tarihi, k.cinsiyet, 
                  k.sehir_id, k.ilce_id, k.adres, k.profil_foto, k.profil_resmi, k.website, k.rol, k.kayit_tarihi,
                  s.isim as sehir,
                  i.isim as ilce
                  FROM kullanicilar k
                  LEFT JOIN sehirler s ON k.sehir_id = s.id
                  LEFT JOIN ilceler i ON k.ilce_id = i.id
                  WHERE k.id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            http_response_code(404);
            echo json_encode(['success' => false, 'mesaj' => 'Kullanıcı bulunamadı'], JSON_UNESCAPED_UNICODE);
            exit();
        }
        
        echo json_encode(['success' => true, 'data' => $user], JSON_UNESCAPED_UNICODE);
        
    } elseif ($method === 'PUT' || $method === 'POST') {
        // Profil bilgilerini güncelle
        $data = json_decode(file_get_contents("php://input"));
        
        $query = "UPDATE kullanicilar SET 
                  isim = :isim,
                  soyisim = :soyisim,
                  telefon = :telefon,
                  dogum_tarihi = :dogum_tarihi,
                  cinsiyet = :cinsiyet,
                  sehir_id = :sehir_id,
                  ilce_id = :ilce_id,
                  adres = :adres,
                  website = :website
                  WHERE id = :user_id";
        
        $stmt = $db->prepare($query);
        
        $isim = isset($data->isim) ? $data->isim : '';
        $soyisim = isset($data->soyisim) ? $data->soyisim : '';
        $telefon = isset($data->telefon) ? $data->telefon : '';
        $dogum_tarihi = (isset($data->dogum_tarihi) && $data->dogum_tarihi !== '') ? $data->dogum_tarihi : null;
        $cinsiyet = (isset($data->cinsiyet) && $data->cinsiyet !== '') ? $data->cinsiyet : null;
        $sehir_id = (isset($data->sehir_id) && $data->sehir_id !== '') ? $data->sehir_id : null;
        $ilce_id = (isset($data->ilce_id) && $data->ilce_id !== '') ? $data->ilce_id : null;
        $adres = isset($data->adres) ? $data->adres : '';
        $website = isset($data->website) ? $data->website : '';
        
        $stmt->bindValue(':isim', $isim);
        $stmt->bindValue(':soyisim', $soyisim);
        $stmt->bindValue(':telefon', $telefon);
        $stmt->bindValue(':dogum_tarihi', $dogum_tarihi);
        $stmt->bindValue(':cinsiyet', $cinsiyet);
        $stmt->bindValue(':sehir_id', $sehir_id);
        $stmt->bindValue(':ilce_id', $ilce_id);
        $stmt->bindValue(':adres', $adres);
        $stmt->bindValue(':website', $website);
        $stmt->bindValue(':user_id', $user_id);
        
        $stmt->execute();
        
        echo json_encode(['success' => true, 'mesaj' => 'Profil güncellendi'], JSON_UNESCAPED_UNICODE);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'mesaj' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
?>
