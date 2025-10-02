<?php
/**
 * API Ana Giriş Noktası
 * İş Bul Platformu API
 */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

echo json_encode(array(
    "message" => "İş Bul (Job Search) API'ye Hoş Geldiniz",
    "version" => "2.0.0",
    "type" => "PHP + MySQL",
    "endpoints" => array(
        "auth" => array(
            "register" => "/api/auth/register.php",
            "login" => "/api/auth/login.php"
        ),
        "documentation" => "Yakında gelecek"
    )
));
?>
