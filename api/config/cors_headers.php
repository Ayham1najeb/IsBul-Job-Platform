<?php
/**
 * CORS Headers Configuration
 * Include this file at the top of every PHP endpoint
 */

// Set CORS headers
header('Access-Control-Allow-Origin: *');
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
