<?php
/**
 * Kategoriler Endpoint
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT id, isim, aciklama FROM Kategoriler ORDER BY isim ASC";
$stmt = $db->prepare($query);
$stmt->execute();

$kategoriler = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    array_push($kategoriler, $row);
}

http_response_code(200);
echo json_encode(array("kayitlar" => $kategoriler), JSON_UNESCAPED_UNICODE);
