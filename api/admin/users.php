<?php
/**
 * Admin Kullanıcı Yönetimi Endpoint
 * Kullanıcıları listeleme, güncelleme ve silme
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
    switch ($method) {
        case 'GET':
            // Kullanıcıları listele
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 20;
            $offset = ($page - 1) * $limit;
            $search = isset($_GET['search']) ? $_GET['search'] : '';
            $rol = isset($_GET['rol']) ? $_GET['rol'] : '';
            
            // Toplam kayıt sayısı
            $countQuery = "SELECT COUNT(*) as total FROM kullanicilar WHERE 1=1";
            $params = [];
            
            if ($search) {
                $countQuery .= " AND (isim LIKE :search OR soyisim LIKE :search OR email LIKE :search)";
                $params[':search'] = "%$search%";
            }
            
            if ($rol) {
                $countQuery .= " AND rol = :rol";
                $params[':rol'] = $rol;
            }
            
            $stmt = $db->prepare($countQuery);
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            $stmt->execute();
            $total = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
            
            // Kullanıcıları getir
            $query = "SELECT id, isim, soyisim, email, telefon, rol, sehir, profil_foto, 
                      email_verified, olusturulma_tarihi 
                      FROM kullanicilar WHERE 1=1";
            
            if ($search) {
                $query .= " AND (isim LIKE :search OR soyisim LIKE :search OR email LIKE :search)";
            }
            
            if ($rol) {
                $query .= " AND rol = :rol";
            }
            
            $query .= " ORDER BY olusturulma_tarihi DESC LIMIT :limit OFFSET :offset";
            
            $stmt = $db->prepare($query);
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => $users,
                'pagination' => [
                    'total' => (int)$total,
                    'page' => $page,
                    'limit' => $limit,
                    'pages' => ceil($total / $limit)
                ]
            ], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'PUT':
            // Kullanıcı güncelle
            $data = json_decode(file_get_contents("php://input"));
            
            if (empty($data->id)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'mesaj' => 'Kullanıcı ID gerekli']);
                exit();
            }
            
            $updates = [];
            $params = [':id' => $data->id];
            
            if (isset($data->rol)) {
                $updates[] = "rol = :rol";
                $params[':rol'] = $data->rol;
            }
            
            if (isset($data->email_verified)) {
                $updates[] = "email_verified = :email_verified";
                $params[':email_verified'] = $data->email_verified ? 1 : 0;
            }
            
            if (empty($updates)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'mesaj' => 'Güncellenecek alan bulunamadı']);
                exit();
            }
            
            $query = "UPDATE kullanicilar SET " . implode(', ', $updates) . " WHERE id = :id";
            $stmt = $db->prepare($query);
            
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(['success' => true, 'mesaj' => 'Kullanıcı güncellendi']);
            } else {
                throw new Exception('Kullanıcı güncellenemedi');
            }
            break;
            
        case 'DELETE':
            // Kullanıcı sil
            $data = json_decode(file_get_contents("php://input"));
            
            if (empty($data->id)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'mesaj' => 'Kullanıcı ID gerekli']);
                exit();
            }
            
            // Kendi hesabını silmeye çalışıyor mu?
            if ($data->id == $auth['data']->id) {
                http_response_code(400);
                echo json_encode(['success' => false, 'mesaj' => 'Kendi hesabınızı silemezsiniz']);
                exit();
            }
            
            $query = "DELETE FROM kullanicilar WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $data->id);
            
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(['success' => true, 'mesaj' => 'Kullanıcı silindi']);
            } else {
                throw new Exception('Kullanıcı silinemedi');
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'mesaj' => 'Geçersiz istek metodu']);
            break;
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'mesaj' => 'Bir hata oluştu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
