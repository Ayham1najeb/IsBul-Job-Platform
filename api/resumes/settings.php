<?php
/**
 * Özgeçmiş Ayarları Endpoint
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
        $query = "SELECT * FROM ozgecmis_ayarlari WHERE kullanici_id = :kullanici_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':kullanici_id', $user_id);
        $stmt->execute();
        $ayarlar = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$ayarlar) {
            // Varsayılan ayarlar oluştur
            $query = "INSERT INTO ozgecmis_ayarlari (kullanici_id) VALUES (:kullanici_id)";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->execute();
            
            $query = "SELECT * FROM ozgecmis_ayarlari WHERE kullanici_id = :kullanici_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':kullanici_id', $user_id);
            $stmt->execute();
            $ayarlar = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        
        echo json_encode(['success' => true, 'data' => $ayarlar], JSON_UNESCAPED_UNICODE);
        
    } elseif ($method === 'PUT' || $method === 'POST') {
        $data = json_decode(file_get_contents("php://input"));
        
        // Önce var mı kontrol et
        $query = "SELECT id FROM ozgecmis_ayarlari WHERE kullanici_id = :kullanici_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':kullanici_id', $user_id);
        $stmt->execute();
        $exists = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($exists) {
            // Güncelle
            $query = "UPDATE ozgecmis_ayarlari SET 
                      baslik=:baslik, ozet=:ozet, linkedin_url=:linkedin_url, github_url=:github_url,
                      website_url=:website_url, portfolio_url=:portfolio_url, gorunurluk=:gorunurluk, pdf_template=:pdf_template
                      WHERE kullanici_id=:kullanici_id";
        } else {
            // Oluştur
            $query = "INSERT INTO ozgecmis_ayarlari 
                      (kullanici_id, baslik, ozet, linkedin_url, github_url, website_url, portfolio_url, gorunurluk, pdf_template) 
                      VALUES (:kullanici_id, :baslik, :ozet, :linkedin_url, :github_url, :website_url, :portfolio_url, :gorunurluk, :pdf_template)";
        }
        
        $stmt = $db->prepare($query);
        
        $baslik = isset($data->baslik) ? $data->baslik : '';
        $ozet = isset($data->ozet) ? $data->ozet : '';
        $linkedin_url = isset($data->linkedin_url) ? $data->linkedin_url : '';
        $github_url = isset($data->github_url) ? $data->github_url : '';
        $website_url = isset($data->website_url) ? $data->website_url : '';
        $portfolio_url = isset($data->portfolio_url) ? $data->portfolio_url : '';
        $gorunurluk = isset($data->gorunurluk) ? $data->gorunurluk : 'sadece_sirketler';
        $pdf_template = isset($data->pdf_template) ? $data->pdf_template : 'klasik';
        
        $stmt->bindValue(':kullanici_id', $user_id);
        $stmt->bindValue(':baslik', $baslik);
        $stmt->bindValue(':ozet', $ozet);
        $stmt->bindValue(':linkedin_url', $linkedin_url);
        $stmt->bindValue(':github_url', $github_url);
        $stmt->bindValue(':website_url', $website_url);
        $stmt->bindValue(':portfolio_url', $portfolio_url);
        $stmt->bindValue(':gorunurluk', $gorunurluk);
        $stmt->bindValue(':pdf_template', $pdf_template);
        
        $stmt->execute();
        
        echo json_encode(['success' => true, 'mesaj' => 'Ayarlar kaydedildi'], JSON_UNESCAPED_UNICODE);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'mesaj' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
?>
