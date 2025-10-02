<?php
/**
 * Şirket Modeli
 * Şirket veritabanı işlemleri
 */

class Company {
    private $conn;
    private $table_name = "Firmalar";
    
    public $id;
    public $kullanici_id;
    public $isim;
    public $sehir_id;
    public $ilce_id;
    public $kategori_id;
    public $adres;
    public $telefon;
    public $email;
    public $website;
    public $logo_url;
    public $aciklama;
    public $kurulis_yili;
    public $calisan_sayisi;
    public $aktif;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    /**
     * Tüm şirketleri getir
     */
    public function getAll($filters = []) {
        $query = "SELECT 
                    f.*,
                    s.isim as sehir_isim,
                    il.isim as ilce_isim,
                    k.isim as kategori_isim,
                    COUNT(DISTINCT i.id) as ilan_sayisi
                  FROM " . $this->table_name . " f
                  LEFT JOIN Sehirler s ON f.sehir_id = s.id
                  LEFT JOIN Ilceler il ON f.ilce_id = il.id
                  LEFT JOIN Kategoriler k ON f.kategori_id = k.id
                  LEFT JOIN Ilanlar i ON f.id = i.firma_id AND i.aktif = 1
                  WHERE f.aktif = 1";
        
        if (!empty($filters['sehir_id'])) {
            $query .= " AND f.sehir_id = :sehir_id";
        }
        if (!empty($filters['kategori_id'])) {
            $query .= " AND f.kategori_id = :kategori_id";
        }
        
        $query .= " GROUP BY f.id ORDER BY f.id DESC";
        
        if (!empty($filters['limit'])) {
            $query .= " LIMIT :limit";
            if (!empty($filters['offset'])) {
                $query .= " OFFSET :offset";
            }
        }
        
        $stmt = $this->conn->prepare($query);
        
        if (!empty($filters['sehir_id'])) {
            $stmt->bindParam(':sehir_id', $filters['sehir_id']);
        }
        if (!empty($filters['kategori_id'])) {
            $stmt->bindParam(':kategori_id', $filters['kategori_id']);
        }
        if (!empty($filters['limit'])) {
            $stmt->bindParam(':limit', $filters['limit'], PDO::PARAM_INT);
            if (!empty($filters['offset'])) {
                $stmt->bindParam(':offset', $filters['offset'], PDO::PARAM_INT);
            }
        }
        
        $stmt->execute();
        return $stmt;
    }
    
    /**
     * ID'ye göre şirket getir
     */
    public function getById() {
        $query = "SELECT 
                    f.*,
                    s.isim as sehir_isim,
                    il.isim as ilce_isim,
                    k.isim as kategori_isim
                  FROM " . $this->table_name . " f
                  LEFT JOIN Sehirler s ON f.sehir_id = s.id
                  LEFT JOIN Ilceler il ON f.ilce_id = il.id
                  LEFT JOIN Kategoriler k ON f.kategori_id = k.id
                  WHERE f.id = :id
                  LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Şirket oluştur
     */
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                  SET kullanici_id = :kullanici_id,
                      isim = :isim,
                      sehir_id = :sehir_id,
                      ilce_id = :ilce_id,
                      kategori_id = :kategori_id,
                      adres = :adres,
                      telefon = :telefon,
                      email = :email,
                      website = :website,
                      aciklama = :aciklama,
                      kurulis_yili = :kurulis_yili,
                      calisan_sayisi = :calisan_sayisi,
                      aktif = 1";
        
        $stmt = $this->conn->prepare($query);
        
        $this->isim = htmlspecialchars(strip_tags($this->isim));
        $this->aciklama = htmlspecialchars(strip_tags($this->aciklama));
        
        $stmt->bindParam(':kullanici_id', $this->kullanici_id);
        $stmt->bindParam(':isim', $this->isim);
        $stmt->bindParam(':sehir_id', $this->sehir_id);
        $stmt->bindParam(':ilce_id', $this->ilce_id);
        $stmt->bindParam(':kategori_id', $this->kategori_id);
        $stmt->bindParam(':adres', $this->adres);
        $stmt->bindParam(':telefon', $this->telefon);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':website', $this->website);
        $stmt->bindParam(':aciklama', $this->aciklama);
        $stmt->bindParam(':kurulis_yili', $this->kurulis_yili);
        $stmt->bindParam(':calisan_sayisi', $this->calisan_sayisi);
        
        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }
    
    /**
     * Şirket güncelle
     */
    public function update() {
        $query = "UPDATE " . $this->table_name . "
                  SET isim = :isim,
                      sehir_id = :sehir_id,
                      ilce_id = :ilce_id,
                      kategori_id = :kategori_id,
                      adres = :adres,
                      telefon = :telefon,
                      email = :email,
                      website = :website,
                      aciklama = :aciklama,
                      kurulis_yili = :kurulis_yili,
                      calisan_sayisi = :calisan_sayisi";
        
        if (!empty($this->logo_url)) {
            $query .= ", logo_url = :logo_url";
        }
        
        $query .= " WHERE id = :id AND kullanici_id = :kullanici_id";
        
        $stmt = $this->conn->prepare($query);
        
        $this->isim = htmlspecialchars(strip_tags($this->isim));
        
        $stmt->bindParam(':isim', $this->isim);
        $stmt->bindParam(':sehir_id', $this->sehir_id);
        $stmt->bindParam(':ilce_id', $this->ilce_id);
        $stmt->bindParam(':kategori_id', $this->kategori_id);
        $stmt->bindParam(':adres', $this->adres);
        $stmt->bindParam(':telefon', $this->telefon);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':website', $this->website);
        $stmt->bindParam(':aciklama', $this->aciklama);
        $stmt->bindParam(':kurulis_yili', $this->kurulis_yili);
        $stmt->bindParam(':calisan_sayisi', $this->calisan_sayisi);
        
        if (!empty($this->logo_url)) {
            $stmt->bindParam(':logo_url', $this->logo_url);
        }
        
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':kullanici_id', $this->kullanici_id);
        
        return $stmt->execute();
    }
}
