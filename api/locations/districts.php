<?php
/**
 * İlçeler Endpoint
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$sehir_id = isset($_GET['sehir_id']) ? $_GET['sehir_id'] : null;

if ($sehir_id) {
    $query = "SELECT id, isim, sehir_id FROM Ilceler WHERE sehir_id = :sehir_id ORDER BY isim ASC";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':sehir_id', $sehir_id);
} else {
    $query = "SELECT id, isim, sehir_id FROM Ilceler ORDER BY isim ASC";
    $stmt = $db->prepare($query);
}

$stmt->execute();

$ilceler = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    array_push($ilceler, $row);
}

http_response_code(200);
echo json_encode(array("kayitlar" => $ilceler), JSON_UNESCAPED_UNICODE);
