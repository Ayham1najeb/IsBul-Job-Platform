<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, x-auth-token');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';
include_once '../models/User.php';
include_once '../middleware/auth.php';

$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(['success' => false, 'mesaj' => 'Yetkisiz erisim'], JSON_UNESCAPED_UNICODE);
    exit();
}

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (empty($data->current_password) || empty($data->new_password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'mesaj' => 'Tum alanlar gerekli'], JSON_UNESCAPED_UNICODE);
    exit();
}

if (strlen($data->new_password) < 6) {
    http_response_code(400);
    echo json_encode(['success' => false, 'mesaj' => 'Sifre en az 6 karakter olmalidir'], JSON_UNESCAPED_UNICODE);
    exit();
}

try {
    $userId = $auth['data']->kullanici_id;
    
    $query = "SELECT sifre FROM kullanicilar WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $userId);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        http_response_code(404);
        echo json_encode(['success' => false, 'mesaj' => 'Kullanici bulunamadi'], JSON_UNESCAPED_UNICODE);
        exit();
    }
    
    if (!password_verify($data->current_password, $user['sifre'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'mesaj' => 'Mevcut sifre yanlis'], JSON_UNESCAPED_UNICODE);
        exit();
    }
    
    $hashed_password = password_hash($data->new_password, PASSWORD_BCRYPT);
    
    $query = "UPDATE kullanicilar SET sifre = :sifre WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':sifre', $hashed_password);
    $stmt->bindParam(':id', $userId);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'mesaj' => 'Sifre basariyla degistirildi'
        ], JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'mesaj' => 'Sifre degistirilemedi'], JSON_UNESCAPED_UNICODE);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'mesaj' => 'Bir hata olustu: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
