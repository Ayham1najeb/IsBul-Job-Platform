<?php
/**
 * Sertifikalar CRUD Endpoint
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
            $query = "SELECT * FROM sertifikalar WHERE kullanici_id = :kullanici_id ORDER BY tarih DESC";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->execute();
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents("php://input"));
            $query = "INSERT INTO sertifikalar 
                      (kullanici_id, sertifika_adi, kurum, tarih, gecerlilik_tarihi, sertifika_no, aciklama, dosya_url) 
                      VALUES (:kullanici_id, :sertifika_adi, :kurum, :tarih, :gecerlilik_tarihi, :sertifika_no, :aciklama, :dosya_url)";
            $stmt = $db->prepare($query);
            
            // Değişkenlere ata
            $gecerlilik_tarihi = $data->gecerlilik_tarihi ?? null;
            $sertifika_no = $data->sertifika_no ?? null;
            $aciklama = $data->aciklama ?? null;
            $dosya_url = $data->dosya_url ?? null;
            
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->bindParam(':sertifika_adi', $data->sertifika_adi);
            $stmt->bindParam(':kurum', $data->kurum);
            $stmt->bindParam(':tarih', $data->tarih);
            $stmt->bindParam(':gecerlilik_tarihi', $gecerlilik_tarihi);
            $stmt->bindParam(':sertifika_no', $sertifika_no);
            $stmt->bindParam(':aciklama', $aciklama);
            $stmt->bindParam(':dosya_url', $dosya_url);
            $stmt->execute();
            echo json_encode(['success' => true, 'mesaj' => 'Sertifika eklendi', 'id' => $db->lastInsertId()], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));
            $query = "UPDATE sertifikalar SET sertifika_adi=:sertifika_adi, kurum=:kurum, tarih=:tarih, 
                      gecerlilik_tarihi=:gecerlilik_tarihi, sertifika_no=:sertifika_no, aciklama=:aciklama, dosya_url=:dosya_url
                      WHERE id=:id AND kullanici_id=:kullanici_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $data->id);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->bindParam(':sertifika_adi', $data->sertifika_adi);
            $stmt->bindParam(':kurum', $data->kurum);
            $stmt->bindParam(':tarih', $data->tarih);
            $stmt->bindParam(':gecerlilik_tarihi', $data->gecerlilik_tarihi);
            $stmt->bindParam(':sertifika_no', $data->sertifika_no);
            $stmt->bindParam(':aciklama', $data->aciklama);
            $stmt->bindParam(':dosya_url', $data->dosya_url);
            $stmt->execute();
            echo json_encode(['success' => true, 'mesaj' => 'Sertifika güncellendi'], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'DELETE':
            $id = $_GET['id'] ?? null;
            $query = "DELETE FROM sertifikalar WHERE id=:id AND kullanici_id=:kullanici_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->execute();
            echo json_encode(['success' => true, 'mesaj' => 'Sertifika silindi'], JSON_UNESCAPED_UNICODE);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'mesaj' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
?>
