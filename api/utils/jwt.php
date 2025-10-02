<?php
/**
 * JWT (JSON Web Token) Yardımcı Sınıfı
 * Token oluşturma ve doğrulama işlemleri
 */
class JWT {
    // Güvenlik anahtarı - Üretimde mutlaka değiştirin!
    private static $secret_key = "your_secret_key_here_change_in_production";
    private static $encrypt = 'HS256';
    private static $aud = null;

    /**
     * JWT token oluşturur
     * @param array $payload Token içeriği
     * @return string JWT token
     */
    public static function encode($payload) {
        $header = json_encode(['typ' => 'JWT', 'alg' => self::$encrypt]);
        $payload = json_encode($payload);
        
        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
        
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$secret_key, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        
        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    /**
     * JWT token'ı çözer ve doğrular
     * @param string $jwt JWT token
     * @return object|null Çözülmüş payload veya null
     */
    public static function decode($jwt) {
        if (empty($jwt)) {
            return null;
        }

        $tokenParts = explode('.', $jwt);
        if (count($tokenParts) != 3) {
            return null;
        }

        $header = base64_decode($tokenParts[0]);
        $payload = base64_decode($tokenParts[1]);
        $signatureProvided = $tokenParts[2];

        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
        
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$secret_key, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        if ($base64UrlSignature !== $signatureProvided) {
            return null;
        }

        return json_decode($payload);
    }

    /**
     * Authorization başlığını alır
     * @return string|null
     */
    public static function getAuthorizationHeader() {
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        return $headers;
    }

    /**
     * Bearer token'ı çıkarır
     * @return string|null
     */
    public static function getBearerToken() {
        $headers = self::getAuthorizationHeader();
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        
        // React uygulaması ile uyumluluk için x-auth-token başlığını kontrol et
        if (isset($_SERVER['HTTP_X_AUTH_TOKEN'])) {
            return $_SERVER['HTTP_X_AUTH_TOKEN'];
        }
        
        return null;
    }
}
?>
