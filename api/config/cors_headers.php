<?php
/**
 * CORS Headers Configuration
 * Include this file at the top of every PHP endpoint
 */

// Netlify ve diğer izin verilen origin'ler
$allowedOrigins = [
    'https://your-site.netlify.app',
    'https://your-site-name.netlify.app',
    'http://localhost:5173', // Development
    'http://localhost:3000', // Development
];

// Request origin'i al
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Origin izinli listede mi kontrol et
if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
} else {
    // Development için tüm origin'lere izin ver (production'da kaldırılmalı)
    header('Access-Control-Allow-Origin: *');
}

// CORS headers
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, x-auth-token');
header('Access-Control-Max-Age: 3600');
header('Content-Type: application/json; charset=UTF-8');

// Handle OPTIONS request (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
