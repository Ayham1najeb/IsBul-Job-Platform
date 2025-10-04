<?php
/**
 * Kullanıcının Başvuruları Endpoint
 */

// CORS Headers
require_once '../config/cors_headers.php';

include_once '../config/database.php';
include_once '../models/Application.php';
include_once '../middleware/auth.php';

$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(array("success" => false, "mesaj" => $auth['message']), JSON_UNESCAPED_UNICODE);
    exit();
}

$user_data = $auth['data'];

$database = new Database();
$db = $database->getConnection();

$application = new Application($db);

try {
    $stmt = $application->getUserApplications($user_data->id);
    $num = $stmt->rowCount();

    if ($num > 0) {
        $basvurular = array();
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($basvurular, $row);
        }
        
        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "kayitlar" => $basvurular,
            "toplam" => $num
        ), JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "mesaj" => "Başvuru bulunamadı.",
            "kayitlar" => array(),
            "toplam" => 0
        ), JSON_UNESCAPED_UNICODE);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        "success" => false,
        "mesaj" => "Başvurular yüklenirken bir hata oluştu: " . $e->getMessage()
    ), JSON_UNESCAPED_UNICODE);
}
