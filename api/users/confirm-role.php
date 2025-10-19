<?php
/**
 * Rol Onaylama Endpoint
 * Kullanıcı yeni rolünü onaylar
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

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Rolü onayla
    $query = "UPDATE kullanicilar SET rol_confirmed = TRUE WHERE id = :user_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'mesaj' => 'Rol onaylandı'
        ], JSON_UNESCAPED_UNICODE);
    } else {
        throw new Exception('Rol onaylanamadı');
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'mesaj' => 'Bir hata oluştu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
