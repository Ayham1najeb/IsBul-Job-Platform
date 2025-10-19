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
            $query = "SELECT k.id, k.isim, k.soyisim, k.email, k.telefon, k.rol, 
                      s.isim as sehir, k.profil_foto, 
                      k.email_verified, k.is_super_admin, k.admin_approved, k.kayit_tarihi as olusturulma_tarihi 
                      FROM kullanicilar k
                      LEFT JOIN sehirler s ON k.sehir_id = s.id
                      WHERE 1=1";
            
            if ($search) {
                $query .= " AND (k.isim LIKE :search OR k.soyisim LIKE :search OR k.email LIKE :search)";
            }
            
            if ($rol) {
                $query .= " AND k.rol = :rol";
            }
            
            $query .= " ORDER BY k.kayit_tarihi DESC LIMIT :limit OFFSET :offset";
            
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
            
            // Rol değişikliği kontrolü
            if (isset($data->rol)) {
                // Kendi rolünü değiştirmeye çalışıyor mu?
                if ($data->id == $auth['data']->id) {
                    http_response_code(403);
                    echo json_encode(['success' => false, 'mesaj' => 'Kendi rolünüzü değiştiremezsiniz']);
                    exit();
                }
                
                // Mevcut rolü al
                $query = "SELECT rol, email, isim, is_super_admin FROM kullanicilar WHERE id = :id";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':id', $data->id);
                $stmt->execute();
                $currentUser = $stmt->fetch(PDO::FETCH_ASSOC);
                
                // Super Admin'in rolünü değiştirmeye çalışıyor mu?
                if ($currentUser && $currentUser['is_super_admin']) {
                    http_response_code(403);
                    echo json_encode(['success' => false, 'mesaj' => 'Super Admin\'in rolü değiştirilemez']);
                    exit();
                }
                
                // Rol değiştiyse, rol_confirmed'ı FALSE yap
                if ($currentUser && $currentUser['rol'] !== $data->rol) {
                    $updates[] = "rol = :rol";
                    $updates[] = "rol_confirmed = FALSE";
                    $params[':rol'] = $data->rol;
                    
                    // Eğer yeni rol Admin ise, admin_approved'ı FALSE yap
                    if ($data->rol === 'admin') {
                        $updates[] = "admin_approved = FALSE";
                    }
                    
                    // E-posta bildirimi gönder (opsiyonel)
                    // EmailService ile bildirim gönderilebilir
                }
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
            
            // Super Admin kontrolü
            $query = "SELECT is_super_admin FROM kullanicilar WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $data->id);
            $stmt->execute();
            $targetUser = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($targetUser && $targetUser['is_super_admin']) {
                http_response_code(403);
                echo json_encode(['success' => false, 'mesaj' => 'Super Admin silinemez']);
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
