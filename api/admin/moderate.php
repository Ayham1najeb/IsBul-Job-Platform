<?php
/**
 * Admin Moderasyon Endpoint
 * İş ilanlarını ve şirketleri onaylama/reddetme
 */

require_once '../config/cors_headers.php';
require_once '../config/database.php';
require_once '../middleware/auth.php';

// Kimlik doğrulama ve admin kontrolü
$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(['success' => false, 'mesaj' => $auth['message']]);
    exit();
}

if ($auth['data']->rol !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'mesaj' => 'Bu işlem için yetkiniz yok']);
    exit();
}

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method !== 'PUT') {
        http_response_code(405);
        echo json_encode(['success' => false, 'mesaj' => 'Geçersiz istek metodu']);
        exit();
    }
    
    $data = json_decode(file_get_contents("php://input"));
    
    if (empty($data->type) || empty($data->id) || empty($data->action)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'mesaj' => 'Eksik bilgi']);
        exit();
    }
    
    $type = $data->type; // 'job' veya 'company'
    $id = $data->id;
    $action = $data->action; // 'approve' veya 'reject'
    $reason = isset($data->reason) ? $data->reason : '';
    
    if ($type === 'job') {
        // İş ilanı moderasyonu
        if ($action === 'approve') {
            $query = "UPDATE is_ilanlari SET durum = 'aktif' WHERE id = :id";
        } else if ($action === 'reject') {
            $query = "UPDATE is_ilanlari SET durum = 'reddedildi' WHERE id = :id";
        } else {
            http_response_code(400);
            echo json_encode(['success' => false, 'mesaj' => 'Geçersiz işlem']);
            exit();
        }
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $id);
        
        if ($stmt->execute()) {
            // Moderasyon kaydı oluştur
            $logQuery = "INSERT INTO moderasyon_kayitlari (ilan_id, admin_id, islem, sebep) 
                        VALUES (:ilan_id, :admin_id, :islem, :sebep)";
            $logStmt = $db->prepare($logQuery);
            $logStmt->bindParam(':ilan_id', $id);
            $logStmt->bindParam(':admin_id', $auth['data']->id);
            $logStmt->bindParam(':islem', $action);
            $logStmt->bindParam(':sebep', $reason);
            $logStmt->execute();
            
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'mesaj' => $action === 'approve' ? 'İlan onaylandı' : 'İlan reddedildi'
            ]);
        } else {
            throw new Exception('İşlem gerçekleştirilemedi');
        }
        
    } else if ($type === 'company') {
        // Şirket moderasyonu (kullanıcı rolü güncelleme)
        if ($action === 'approve') {
            $query = "UPDATE kullanicilar SET rol = 'firma' WHERE id = :id";
        } else if ($action === 'reject') {
            $query = "UPDATE kullanicilar SET rol = 'is_arayan' WHERE id = :id";
        } else {
            http_response_code(400);
            echo json_encode(['success' => false, 'mesaj' => 'Geçersiz işlem']);
            exit();
        }
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $id);
        
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'mesaj' => $action === 'approve' ? 'Şirket onaylandı' : 'Şirket reddedildi'
            ]);
        } else {
            throw new Exception('İşlem gerçekleştirilemedi');
        }
        
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'mesaj' => 'Geçersiz tip']);
        exit();
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'mesaj' => 'Bir hata oluştu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
