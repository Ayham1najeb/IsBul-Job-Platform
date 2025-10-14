<?php
/**
 * İş Deneyimi CRUD Endpoint
 * GET: Deneyimleri listele
 * POST: Yeni deneyim ekle
 * PUT: Deneyim güncelle
 * DELETE: Deneyim sil
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
$method = $_SERVER['REQUEST_METHOD'];

$database = new Database();
$db = $database->getConnection();

try {
    switch ($method) {
        case 'GET':
            // Deneyimleri listele
            $query = "SELECT * FROM is_deneyimleri WHERE kullanici_id = :kullanici_id ORDER BY sira ASC, baslangic_tarihi DESC";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->execute();
            $deneyimler = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            http_response_code(200);
            echo json_encode(['success' => true, 'data' => $deneyimler], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'POST':
            // Yeni deneyim ekle
            $data = json_decode(file_get_contents("php://input"));
            
            if (empty($data->sirket_adi) || empty($data->pozisyon) || empty($data->baslangic_tarihi)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'mesaj' => 'Şirket adı, pozisyon ve başlangıç tarihi gerekli'], JSON_UNESCAPED_UNICODE);
                exit();
            }
            
            $query = "INSERT INTO is_deneyimleri 
                      (kullanici_id, sirket_adi, pozisyon, baslangic_tarihi, bitis_tarihi, 
                       halen_calisiyor, aciklama, sehir, sektor, sira) 
                      VALUES 
                      (:kullanici_id, :sirket_adi, :pozisyon, :baslangic_tarihi, :bitis_tarihi, 
                       :halen_calisiyor, :aciklama, :sehir, :sektor, :sira)";
            
            $stmt = $db->prepare($query);
            
            // Değişkenlere ata
            $bitis_tarihi = $data->bitis_tarihi ?? null;
            $halen_calisiyor = isset($data->halen_calisiyor) ? $data->halen_calisiyor : false;
            $aciklama = $data->aciklama ?? null;
            $sehir = $data->sehir ?? null;
            $sektor = $data->sektor ?? null;
            $sira = isset($data->sira) ? $data->sira : 0;
            
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->bindParam(':sirket_adi', $data->sirket_adi);
            $stmt->bindParam(':pozisyon', $data->pozisyon);
            $stmt->bindParam(':baslangic_tarihi', $data->baslangic_tarihi);
            $stmt->bindParam(':bitis_tarihi', $bitis_tarihi);
            $stmt->bindParam(':halen_calisiyor', $halen_calisiyor);
            $stmt->bindParam(':aciklama', $aciklama);
            $stmt->bindParam(':sehir', $sehir);
            $stmt->bindParam(':sektor', $sektor);
            $stmt->bindParam(':sira', $sira);
            
            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(['success' => true, 'mesaj' => 'Deneyim eklendi', 'id' => $db->lastInsertId()], JSON_UNESCAPED_UNICODE);
            } else {
                throw new Exception('Deneyim eklenemedi');
            }
            break;
            
        case 'PUT':
            // Deneyim güncelle
            $data = json_decode(file_get_contents("php://input"));
            
            if (empty($data->id)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'mesaj' => 'Deneyim ID gerekli'], JSON_UNESCAPED_UNICODE);
                exit();
            }
            
            $query = "UPDATE is_deneyimleri SET 
                      sirket_adi = :sirket_adi,
                      pozisyon = :pozisyon,
                      baslangic_tarihi = :baslangic_tarihi,
                      bitis_tarihi = :bitis_tarihi,
                      halen_calisiyor = :halen_calisiyor,
                      aciklama = :aciklama,
                      sehir = :sehir,
                      sektor = :sektor,
                      sira = :sira
                      WHERE id = :id AND kullanici_id = :kullanici_id";
            
            $stmt = $db->prepare($query);
            
            // Değişkenlere ata
            $bitis_tarihi = $data->bitis_tarihi ?? null;
            $halen_calisiyor = isset($data->halen_calisiyor) ? $data->halen_calisiyor : false;
            $aciklama = $data->aciklama ?? null;
            $sehir = $data->sehir ?? null;
            $sektor = $data->sektor ?? null;
            $sira = isset($data->sira) ? $data->sira : 0;
            
            $stmt->bindParam(':id', $data->id);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->bindParam(':sirket_adi', $data->sirket_adi);
            $stmt->bindParam(':pozisyon', $data->pozisyon);
            $stmt->bindParam(':baslangic_tarihi', $data->baslangic_tarihi);
            $stmt->bindParam(':bitis_tarihi', $bitis_tarihi);
            $stmt->bindParam(':halen_calisiyor', $halen_calisiyor);
            $stmt->bindParam(':aciklama', $aciklama);
            $stmt->bindParam(':sehir', $sehir);
            $stmt->bindParam(':sektor', $sektor);
            $stmt->bindParam(':sira', $sira);
            
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(['success' => true, 'mesaj' => 'Deneyim güncellendi'], JSON_UNESCAPED_UNICODE);
            } else {
                throw new Exception('Deneyim güncellenemedi');
            }
            break;
            
        case 'DELETE':
            // Deneyim sil
            $id = isset($_GET['id']) ? $_GET['id'] : null;
            
            if (empty($id)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'mesaj' => 'Deneyim ID gerekli'], JSON_UNESCAPED_UNICODE);
                exit();
            }
            
            $query = "DELETE FROM is_deneyimleri WHERE id = :id AND kullanici_id = :kullanici_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':kullanici_id', $user_id);
            
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(['success' => true, 'mesaj' => 'Deneyim silindi'], JSON_UNESCAPED_UNICODE);
            } else {
                throw new Exception('Deneyim silinemedi');
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'mesaj' => 'Method not allowed'], JSON_UNESCAPED_UNICODE);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'mesaj' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
?>
