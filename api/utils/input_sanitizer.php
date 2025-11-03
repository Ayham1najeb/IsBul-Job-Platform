<?php
/**
 * Input Sanitizer
 * Kullanıcı girdilerini temizler ve güvenli hale getirir
 */

class InputSanitizer {
    /**
     * String input'u temizle
     * @param string $input
     * @return string
     */
    public static function sanitizeString($input) {
        if (is_null($input)) {
            return '';
        }
        
        // HTML etiketlerini kaldır
        $input = strip_tags($input);
        
        // Özel karakterleri escape et
        $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
        
        // Fazla boşlukları temizle
        $input = trim($input);
        
        return $input;
    }
    
    /**
     * Email'i temizle ve doğrula
     * @param string $email
     * @return string|false
     */
    public static function sanitizeEmail($email) {
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        return filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : false;
    }
    
    /**
     * Integer'ı temizle
     * @param mixed $input
     * @return int
     */
    public static function sanitizeInt($input) {
        return filter_var($input, FILTER_SANITIZE_NUMBER_INT);
    }
    
    /**
     * URL'i temizle ve doğrula
     * @param string $url
     * @return string|false
     */
    public static function sanitizeURL($url) {
        $url = filter_var($url, FILTER_SANITIZE_URL);
        return filter_var($url, FILTER_VALIDATE_URL) ? $url : false;
    }
    
    /**
     * Array'i temizle (recursive)
     * @param array $input
     * @return array
     */
    public static function sanitizeArray($input) {
        if (!is_array($input)) {
            return self::sanitizeString($input);
        }
        
        $result = [];
        foreach ($input as $key => $value) {
            $cleanKey = self::sanitizeString($key);
            $cleanValue = is_array($value) 
                ? self::sanitizeArray($value) 
                : self::sanitizeString($value);
            $result[$cleanKey] = $cleanValue;
        }
        
        return $result;
    }
    
    /**
     * SQL injection'a karşı koruma - PDO prepared statements kullanılmalı
     * Bu fonksiyon ekstra güvenlik sağlar
     * @param string $input
     * @return string
     */
    public static function preventSQLInjection($input) {
        // SQL özel karakterlerini escape et
        $dangerous = ['--', ';', '/*', '*/', 'xp_', 'sp_'];
        $input = str_replace($dangerous, '', $input);
        
        return $input;
    }
    
    /**
     * XSS'e karşı koruma
     * @param string $input
     * @return string
     */
    public static function preventXSS($input) {
        // HTML etiketlerini kaldır
        $input = strip_tags($input);
        
        // JavaScript event handler'ları kaldır
        $input = preg_replace('/on\w+=\s*["\'].*?["\']/i', '', $input);
        
        // HTML entities'e çevir
        $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
        
        return $input;
    }
}

