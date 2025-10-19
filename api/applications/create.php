<?php
/**
 * Başvuru Oluşturma Endpoint
 * İş ilanına başvuru yapma - CV ile birlikte
 */

require_once '../config/cors_headers.php';
include_once '../config/database.php';
include_once '../models/Application.php';
include_once '../middleware/auth.php';

// Kimlik doğrulama kontrolü
$auth = authenticate();
if (!$auth['success']) {
    http_response_code(401);
    echo json_encode(array("mesaj" => $auth['message']), JSON_UNESCAPED_UNICODE);
    exit();
}

$user_data = $auth['data'];

// Sadece iş arayanlar başvurabilir
if ($user_data->rol !== 'is_arayan') {
    http_response_code(403);
    echo json_encode(array("mesaj" => "Sadece iş arayanlar başvuru yapabilir."), JSON_UNESCAPED_UNICODE);
    exit();
}

$database = new Database();
$db = $database->getConnection();

// POST verilerini al
$data = json_decode(file_get_contents("php://input"));

// Zorunlu alanları kontrol et
if (empty($data->ilan_id)) {
    http_response_code(400);
    echo json_encode(array("mesaj" => "İlan ID gerekli."), JSON_UNESCAPED_UNICODE);
    exit();
}

// CV kontrolü - Kullanıcının CV'si var mı?
$has_cv = false;

// Deneyim kontrolü
$exp_query = "SELECT COUNT(*) as total FROM is_deneyimleri WHERE kullanici_id = :kullanici_id";
$exp_stmt = $db->prepare($exp_query);
$exp_stmt->bindParam(':kullanici_id', $user_data->id);
$exp_stmt->execute();
$exp_count = $exp_stmt->fetch(PDO::FETCH_ASSOC);

// Eğitim kontrolü
$edu_query = "SELECT COUNT(*) as total FROM egitim_bilgileri WHERE kullanici_id = :kullanici_id";
$edu_stmt = $db->prepare($edu_query);
$edu_stmt->bindParam(':kullanici_id', $user_data->id);
$edu_stmt->execute();
$edu_count = $edu_stmt->fetch(PDO::FETCH_ASSOC);

// Beceri kontrolü
$skill_query = "SELECT COUNT(*) as total FROM kullanici_becerileri_detay WHERE kullanici_id = :kullanici_id";
$skill_stmt = $db->prepare($skill_query);
$skill_stmt->bindParam(':kullanici_id', $user_data->id);
$skill_stmt->execute();
$skill_count = $skill_stmt->fetch(PDO::FETCH_ASSOC);

// En az birinde veri varsa CV var demektir
if ($exp_count['total'] > 0 || $edu_count['total'] > 0 || $skill_count['total'] > 0) {
    $has_cv = true;
}

if (!$has_cv) {
    http_response_code(400);
    echo json_encode(
        array(
            "mesaj" => "Başvuru yapabilmek için önce özgeçmişinizi oluşturmalısınız.",
            "cv_gerekli" => true
        ),
        JSON_UNESCAPED_UNICODE
    );
    exit();
}

$application = new Application($db);

$application->kullanici_id = $user_data->id;
$application->ilan_id = $data->ilan_id;
$application->notlar = !empty($data->notlar) ? $data->notlar : null;

try {
    if ($application->create()) {
        http_response_code(201);
        echo json_encode(
            array(
                "mesaj" => "Başvurunuz başarıyla gönderildi.",
                "basvuru_id" => $application->id
            ),
            JSON_UNESCAPED_UNICODE
        );
    } else {
        http_response_code(400);
        echo json_encode(
            array("mesaj" => "Bu ilana zaten başvuru yaptınız."),
            JSON_UNESCAPED_UNICODE
        );
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(
        array(
            "mesaj" => "Başvuru kaydedilemedi: " . $e->getMessage(),
            "hata" => $e->getMessage()
        ),
        JSON_UNESCAPED_UNICODE
    );
}
