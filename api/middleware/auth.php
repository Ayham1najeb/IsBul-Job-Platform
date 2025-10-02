<?php
/**
 * Kimlik Doğrulama Middleware
 * API isteklerinde kullanıcı kimliğini doğrular
 */
require_once __DIR__ . '/../utils/jwt.php';

class AuthMiddleware {
    /**
     * Kullanıcıyı doğrular ve bilgilerini döndürür
     * @return object Kullanıcı bilgileri
     */
    public static function authenticate() {
        $token = JWT::getBearerToken();
        
        if (!$token) {
            http_response_code(401);
            echo json_encode(["message" => "Token bulunamadı, yetkilendirme reddedildi"]);
            exit();
        }

        $decoded = JWT::decode($token);
        
        if (!$decoded) {
            http_response_code(401);
            echo json_encode(["message" => "Token geçersiz"]);
            exit();
        }

        // Token süresinin dolup dolmadığını kontrol et
        if (isset($decoded->exp) && $decoded->exp < time()) {
            http_response_code(401);
            echo json_encode(["message" => "Token süresi dolmuş"]);
            exit();
        }

        return $decoded;
    }

    /**
     * Kullanıcının admin olup olmadığını kontrol eder
     * @param object $user Kullanıcı bilgileri
     */
    public static function isAdmin($user) {
        if ($user->rol !== 'admin') {
            http_response_code(403);
            echo json_encode(["message" => "Erişim reddedildi, admin yetkisi gerekli"]);
            exit();
        }
    }

    /**
     * Kullanıcının şirket olup olmadığını kontrol eder
     * @param object $user Kullanıcı bilgileri
     */
    public static function isCompany($user) {
        if ($user->rol !== 'firma') {
            http_response_code(403);
            echo json_encode(["message" => "Erişim reddedildi, şirket yetkisi gerekli"]);
            exit();
        }
    }

    /**
     * Kullanıcının iş arayan olup olmadığını kontrol eder
     * @param object $user Kullanıcı bilgileri
     */
    public static function isJobSeeker($user) {
        if ($user->rol !== 'is_arayan') {
            http_response_code(403);
            echo json_encode(["message" => "Erişim reddedildi, iş arayan yetkisi gerekli"]);
            exit();
        }
    }

    /**
     * Kullanıcının şirket veya admin olup olmadığını kontrol eder
     * @param object $user Kullanıcı bilgileri
     */
    public static function isCompanyOrAdmin($user) {
        if ($user->rol !== 'firma' && $user->rol !== 'admin') {
            http_response_code(403);
            echo json_encode(["message" => "Erişim reddedildi, şirket veya admin yetkisi gerekli"]);
            exit();
        }
    }
}
?>
