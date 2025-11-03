<?php
/**
 * Rate Limiter Middleware
 * API isteklerini sınırlandırır - brute force saldırılarına karşı koruma
 */

class RateLimiter {
    private static $requests = [];
    private static $maxRequests = 60; // Dakikada maksimum istek sayısı
    private static $window = 60; // Zaman penceresi (saniye)
    
    /**
     * İsteği kontrol et ve rate limit uygula
     * @param string $identifier Kullanıcı IP veya token
     * @return bool İstek geçerli mi?
     */
    public static function check($identifier) {
        $now = time();
        $key = md5($identifier);
        
        // Eski kayıtları temizle
        if (isset(self::$requests[$key])) {
            self::$requests[$key] = array_filter(
                self::$requests[$key],
                function($timestamp) use ($now) {
                    return ($now - $timestamp) < self::$window;
                }
            );
        } else {
            self::$requests[$key] = [];
        }
        
        // İstek sayısını kontrol et
        if (count(self::$requests[$key]) >= self::$maxRequests) {
            http_response_code(429);
            echo json_encode([
                "message" => "Çok fazla istek. Lütfen bir dakika sonra tekrar deneyin.",
                "retry_after" => self::$window
            ]);
            exit();
        }
        
        // İsteği kaydet
        self::$requests[$key][] = $now;
        
        return true;
    }
    
    /**
     * IP adresini al
     * @return string
     */
    public static function getClientIP() {
        $ipKeys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
        foreach ($ipKeys as $key) {
            if (!empty($_SERVER[$key])) {
                return $_SERVER[$key];
            }
        }
        return '0.0.0.0';
    }
}

