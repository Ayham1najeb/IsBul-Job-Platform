<?php
/**
 * Diller CRUD Endpoint
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
            $query = "SELECT * FROM diller WHERE kullanici_id = :kullanici_id ORDER BY seviye DESC";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->execute();
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents("php://input"));
            $query = "INSERT INTO diller 
                      (kullanici_id, dil_adi, seviye, okuma_seviyesi, yazma_seviyesi, konusma_seviyesi, sertifika) 
                      VALUES (:kullanici_id, :dil_adi, :seviye, :okuma_seviyesi, :yazma_seviyesi, :konusma_seviyesi, :sertifika)";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->bindParam(':dil_adi', $data->dil_adi);
            $stmt->bindParam(':seviye', $data->seviye ?? 'orta');
            $stmt->bindParam(':okuma_seviyesi', $data->okuma_seviyesi ?? 'orta');
            $stmt->bindParam(':yazma_seviyesi', $data->yazma_seviyesi ?? 'orta');
            $stmt->bindParam(':konusma_seviyesi', $data->konusma_seviyesi ?? 'orta');
            $stmt->bindParam(':sertifika', $data->sertifika ?? null);
            $stmt->execute();
            echo json_encode(['success' => true, 'mesaj' => 'Dil eklendi', 'id' => $db->lastInsertId()], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));
            $query = "UPDATE diller SET dil_adi=:dil_adi, seviye=:seviye, 
                      okuma_seviyesi=:okuma_seviyesi, yazma_seviyesi=:yazma_seviyesi, 
                      konusma_seviyesi=:konusma_seviyesi, sertifika=:sertifika
                      WHERE id=:id AND kullanici_id=:kullanici_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $data->id);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->bindParam(':dil_adi', $data->dil_adi);
            $stmt->bindParam(':seviye', $data->seviye);
            $stmt->bindParam(':okuma_seviyesi', $data->okuma_seviyesi);
            $stmt->bindParam(':yazma_seviyesi', $data->yazma_seviyesi);
            $stmt->bindParam(':konusma_seviyesi', $data->konusma_seviyesi);
            $stmt->bindParam(':sertifika', $data->sertifika);
            $stmt->execute();
            echo json_encode(['success' => true, 'mesaj' => 'Dil güncellendi'], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'DELETE':
            $id = $_GET['id'] ?? null;
            $query = "DELETE FROM diller WHERE id=:id AND kullanici_id=:kullanici_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->execute();
            echo json_encode(['success' => true, 'mesaj' => 'Dil silindi'], JSON_UNESCAPED_UNICODE);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'mesaj' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
?>
