<?php
/**
 * CORS Yapılandırması
 * Cross-Origin Resource Sharing ayarları
 */

// Tüm kaynaklardan erişime izin ver
if (isset($_SERVER['HTTP_ORIGIN'])) {
        header('Access-Control-Allow-Credentials: true');
    }

// OPTIONS istekleri için Access-Control başlıkları
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            exit(0);
}

?>
