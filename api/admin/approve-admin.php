<?php
/**
 * Admin Onaylama Endpoint
 * Super Admin yeni admin'i onaylar
 */

require_once '../config/cors_headers.php';
require_once '../config/database.php';
require_once '../middleware/auth.php';

// Kimlik doğrulama ve Super Admin kontrolü
$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(['success' => false, 'mesaj' => $auth['message']]);
    exit();
}

// Super Admin kontrolü
if ($auth['data']->rol !== 'admin' || !$auth['data']->is_super_admin) {
    http_response_code(403);
    echo json_encode(['success' => false, 'mesaj' => 'Bu işlem için Super Admin yetkisi gerekli']);
    exit();
}

$database = new Database();
$db = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

if (empty($data->user_id)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'mesaj' => 'Kullanıcı ID gerekli']);
    exit();
}

try {
    // Kullanıcının admin olduğunu kontrol et
    $query = "SELECT rol, admin_approved FROM kullanicilar WHERE id = :user_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $data->user_id);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        http_response_code(404);
        echo json_encode(['success' => false, 'mesaj' => 'Kullanıcı bulunamadı']);
        exit();
    }
    
    if ($user['rol'] !== 'admin') {
        http_response_code(400);
        echo json_encode(['success' => false, 'mesaj' => 'Kullanıcı admin değil']);
        exit();
    }
    
    // Admin'i onayla
    $query = "UPDATE kullanicilar SET admin_approved = TRUE WHERE id = :user_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $data->user_id);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'mesaj' => 'Admin onaylandı'
        ], JSON_UNESCAPED_UNICODE);
    } else {
        throw new Exception('Admin onaylanamadı');
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'mesaj' => 'Bir hata oluştu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
