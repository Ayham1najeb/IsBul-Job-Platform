<?php
/**
 * Kullanıcı Modeli
 * Kullanıcı veritabanı işlemleri
 */
class User {
    private $conn;
    private $table_name = "Kullanicilar";

    public $id;
    public $isim;
    public $soyisim;
    public $email;
    public $sifre;
    public $telefon;
    public $dogum_tarihi;
    public $cinsiyet;
    public $sehir_id;
    public $ilce_id;
    public $adres;
    public $profil_resmi;
    public $kayit_tarihi;
    public $son_giris;
    public $aktif;
    public $rol;

    /**
     * Yapıcı metod
     * @param PDO $db Veritabanı bağlantısı
     */
    public function __construct($db) {
        $this->conn = $db;
    }

    /**
     * Yeni kullanıcı oluşturur
     * @return bool Başarı durumu
     */
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    isim=:isim,
                    soyisim=:soyisim,
                    email=:email,
                    sifre=:sifre,
                    telefon=:telefon,
                    rol=:rol";

        $stmt = $this->conn->prepare($query);

        // Verileri temizle
        $this->isim = htmlspecialchars(strip_tags($this->isim));
        $this->soyisim = htmlspecialchars(strip_tags($this->soyisim));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->sifre = password_hash($this->sifre, PASSWORD_BCRYPT);
        $this->telefon = htmlspecialchars(strip_tags($this->telefon));
        $this->rol = htmlspecialchars(strip_tags($this->rol));

        // Değerleri bağla
        $stmt->bindParam(":isim", $this->isim);
        $stmt->bindParam(":soyisim", $this->soyisim);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":sifre", $this->sifre);
        $stmt->bindParam(":telefon", $this->telefon);
        $stmt->bindParam(":rol", $this->rol);

        if($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }

        return false;
    }

    /**
     * E-posta adresine göre kullanıcı getirir
     * @return array|false Kullanıcı bilgileri veya false
     */
    public function getUserByEmail() {
        $query = "SELECT k.*, s.isim as sehir, i.isim as ilce 
                  FROM " . $this->table_name . " k
                  LEFT JOIN sehirler s ON k.sehir_id = s.id
                  LEFT JOIN ilceler i ON k.ilce_id = i.id
                  WHERE k.email = :email LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $this->email);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * ID'ye göre kullanıcı getirir
     * @return array|false Kullanıcı bilgileri veya false
     */
    public function getUserById() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Kullanıcı bilgilerini günceller
     * @return bool Başarı durumu
     */
    public function update() {
        $query = "UPDATE " . $this->table_name . "
                SET
                    isim=:isim,
                    soyisim=:soyisim,
                    telefon=:telefon,
                    dogum_tarihi=:dogum_tarihi,
                    cinsiyet=:cinsiyet,
                    sehir_id=:sehir_id,
                    ilce_id=:ilce_id,
                    adres=:adres
                WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        // Değerleri bağla
        $stmt->bindParam(":isim", $this->isim);
        $stmt->bindParam(":soyisim", $this->soyisim);
        $stmt->bindParam(":telefon", $this->telefon);
        $stmt->bindParam(":dogum_tarihi", $this->dogum_tarihi);
        $stmt->bindParam(":cinsiyet", $this->cinsiyet);
        $stmt->bindParam(":sehir_id", $this->sehir_id);
        $stmt->bindParam(":ilce_id", $this->ilce_id);
        $stmt->bindParam(":adres", $this->adres);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    /**
     * Son giriş zamanını günceller
     * @return bool Başarı durumu
     */
    public function updateLastLogin() {
        $query = "UPDATE " . $this->table_name . " SET son_giris = NOW() WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        return $stmt->execute();
    }

    /**
     * E-posta adresinin kullanılıp kullanılmadığını kontrol eder
     * @return bool Var mı yok mu
     */
    public function emailExists() {
        $query = "SELECT id FROM " . $this->table_name . " WHERE email = :email LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $this->email);
        $stmt->execute();
        
        return $stmt->rowCount() > 0;
    }
}
?>
