<?php
/**
 * Şehirler Endpoint
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT id, isim FROM Sehirler ORDER BY isim ASC";
$stmt = $db->prepare($query);
$stmt->execute();

$sehirler = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    array_push($sehirler, $row);
}

http_response_code(200);
echo json_encode(array("kayitlar" => $sehirler), JSON_UNESCAPED_UNICODE);
