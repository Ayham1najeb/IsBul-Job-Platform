<?php
/**
 * Veritabanı Bağlantı Sınıfı
 * MySQL veritabanına PDO ile bağlantı sağlar
 */
class Database {
    private $host = "localhost";
    private $db_name = "isbul";
    private $username = "root";
    private $password = "";
    public $conn;

    /**
     * Veritabanı bağlantısını döndürür
     * @return PDO|null
     */
    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Bağlantı hatası: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>
