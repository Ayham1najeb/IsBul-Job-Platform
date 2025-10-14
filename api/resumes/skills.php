<?php
/**
 * Beceriler CRUD Endpoint
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
            $query = "SELECT * FROM kullanici_becerileri_detay WHERE kullanici_id = :kullanici_id ORDER BY kategori, seviye DESC";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->execute();
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents("php://input"));
            $query = "INSERT INTO kullanici_becerileri_detay 
                      (kullanici_id, beceri_adi, kategori, seviye, yil_deneyim) 
                      VALUES (:kullanici_id, :beceri_adi, :kategori, :seviye, :yil_deneyim)";
            $stmt = $db->prepare($query);
            
            // Değişkenlere ata
            $kategori = $data->kategori ?? null;
            $seviye = $data->seviye ?? 'orta';
            $yil_deneyim = $data->yil_deneyim ?? 0;
            
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->bindParam(':beceri_adi', $data->beceri_adi);
            $stmt->bindParam(':kategori', $kategori);
            $stmt->bindParam(':seviye', $seviye);
            $stmt->bindParam(':yil_deneyim', $yil_deneyim);
            $stmt->execute();
            echo json_encode(['success' => true, 'mesaj' => 'Beceri eklendi', 'id' => $db->lastInsertId()], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));
            $query = "UPDATE kullanici_becerileri_detay SET beceri_adi=:beceri_adi, kategori=:kategori, 
                      seviye=:seviye, yil_deneyim=:yil_deneyim
                      WHERE id=:id AND kullanici_id=:kullanici_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $data->id);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->bindParam(':beceri_adi', $data->beceri_adi);
            $stmt->bindParam(':kategori', $data->kategori);
            $stmt->bindParam(':seviye', $data->seviye);
            $stmt->bindParam(':yil_deneyim', $data->yil_deneyim);
            $stmt->execute();
            echo json_encode(['success' => true, 'mesaj' => 'Beceri güncellendi'], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'DELETE':
            $id = $_GET['id'] ?? null;
            $query = "DELETE FROM kullanici_becerileri_detay WHERE id=:id AND kullanici_id=:kullanici_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->execute();
            echo json_encode(['success' => true, 'mesaj' => 'Beceri silindi'], JSON_UNESCAPED_UNICODE);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'mesaj' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
?>
