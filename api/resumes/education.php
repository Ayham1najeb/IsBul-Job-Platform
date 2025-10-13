<?php
/**
 * Eğitim CRUD Endpoint
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
    switch ($method) {
        case 'GET':
            $query = "SELECT * FROM egitim_bilgileri WHERE kullanici_id = :kullanici_id ORDER BY sira ASC, baslangic_tarihi DESC";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->execute();
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents("php://input"));
            $query = "INSERT INTO egitim_bilgileri 
                      (kullanici_id, okul_adi, bolum, derece, baslangic_tarihi, bitis_tarihi, 
                       devam_ediyor, not_ortalamasi, aciklama, sehir, sira) 
                      VALUES (:kullanici_id, :okul_adi, :bolum, :derece, :baslangic_tarihi, :bitis_tarihi, 
                       :devam_ediyor, :not_ortalamasi, :aciklama, :sehir, :sira)";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->bindParam(':okul_adi', $data->okul_adi);
            $stmt->bindParam(':bolum', $data->bolum);
            $stmt->bindParam(':derece', $data->derece ?? 'lisans');
            $stmt->bindParam(':baslangic_tarihi', $data->baslangic_tarihi);
            $stmt->bindParam(':bitis_tarihi', $data->bitis_tarihi ?? null);
            $devam = isset($data->devam_ediyor) ? $data->devam_ediyor : false;
            $stmt->bindParam(':devam_ediyor', $devam);
            $stmt->bindParam(':not_ortalamasi', $data->not_ortalamasi ?? null);
            $stmt->bindParam(':aciklama', $data->aciklama ?? null);
            $stmt->bindParam(':sehir', $data->sehir ?? null);
            $sira = isset($data->sira) ? $data->sira : 0;
            $stmt->bindParam(':sira', $sira);
            $stmt->execute();
            echo json_encode(['success' => true, 'mesaj' => 'Eğitim eklendi', 'id' => $db->lastInsertId()], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));
            $query = "UPDATE egitim_bilgileri SET okul_adi=:okul_adi, bolum=:bolum, derece=:derece, 
                      baslangic_tarihi=:baslangic_tarihi, bitis_tarihi=:bitis_tarihi, devam_ediyor=:devam_ediyor,
                      not_ortalamasi=:not_ortalamasi, aciklama=:aciklama, sehir=:sehir, sira=:sira
                      WHERE id=:id AND kullanici_id=:kullanici_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $data->id);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->bindParam(':okul_adi', $data->okul_adi);
            $stmt->bindParam(':bolum', $data->bolum);
            $stmt->bindParam(':derece', $data->derece);
            $stmt->bindParam(':baslangic_tarihi', $data->baslangic_tarihi);
            $stmt->bindParam(':bitis_tarihi', $data->bitis_tarihi ?? null);
            $devam = isset($data->devam_ediyor) ? $data->devam_ediyor : false;
            $stmt->bindParam(':devam_ediyor', $devam);
            $stmt->bindParam(':not_ortalamasi', $data->not_ortalamasi ?? null);
            $stmt->bindParam(':aciklama', $data->aciklama ?? null);
            $stmt->bindParam(':sehir', $data->sehir ?? null);
            $sira = isset($data->sira) ? $data->sira : 0;
            $stmt->bindParam(':sira', $sira);
            $stmt->execute();
            echo json_encode(['success' => true, 'mesaj' => 'Eğitim güncellendi'], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'DELETE':
            $id = $_GET['id'] ?? null;
            $query = "DELETE FROM egitim_bilgileri WHERE id=:id AND kullanici_id=:kullanici_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->execute();
            echo json_encode(['success' => true, 'mesaj' => 'Eğitim silindi'], JSON_UNESCAPED_UNICODE);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'mesaj' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
?>
