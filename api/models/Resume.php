<?php
/**
 * Özgeçmiş Modeli
 * Kullanıcı özgeçmiş işlemleri
 */

class Resume {
    private $conn;
    private $table_name = "Ozgecmisler";
    
    public $id;
    public $kullanici_id;
    public $baslik;
    public $ozet;
    public $deneyimler;
    public $egitimler;
    public $beceriler;
    public $diller;
    public $sertifikalar;
    public $dosya_url;
    public $olusturma_tarihi;
    public $guncelleme_tarihi;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    /**
     * Kullanıcının özgeçmişini getir
     */
    public function getByUserId($kullanici_id) {
        $query = "SELECT * FROM " . $this->table_name . "
                  WHERE kullanici_id = :kullanici_id
                  LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':kullanici_id', $kullanici_id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Özgeçmiş oluştur
     */
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                  SET kullanici_id = :kullanici_id,
                      baslik = :baslik,
                      ozet = :ozet,
                      deneyimler = :deneyimler,
                      egitimler = :egitimler,
                      beceriler = :beceriler,
                      diller = :diller,
                      sertifikalar = :sertifikalar,
                      olusturma_tarihi = NOW(),
                      guncelleme_tarihi = NOW()";
        
        $stmt = $this->conn->prepare($query);
        
        $this->baslik = htmlspecialchars(strip_tags($this->baslik));
        $this->ozet = htmlspecialchars(strip_tags($this->ozet));
        
        $stmt->bindParam(':kullanici_id', $this->kullanici_id);
        $stmt->bindParam(':baslik', $this->baslik);
        $stmt->bindParam(':ozet', $this->ozet);
        $stmt->bindParam(':deneyimler', $this->deneyimler);
        $stmt->bindParam(':egitimler', $this->egitimler);
        $stmt->bindParam(':beceriler', $this->beceriler);
        $stmt->bindParam(':diller', $this->diller);
        $stmt->bindParam(':sertifikalar', $this->sertifikalar);
        
        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }
    
    /**
     * Özgeçmiş güncelle
     */
    public function update() {
        $query = "UPDATE " . $this->table_name . "
                  SET baslik = :baslik,
                      ozet = :ozet,
                      deneyimler = :deneyimler,
                      egitimler = :egitimler,
                      beceriler = :beceriler,
                      diller = :diller,
                      sertifikalar = :sertifikalar,
                      guncelleme_tarihi = NOW()";
        
        if (!empty($this->dosya_url)) {
            $query .= ", dosya_url = :dosya_url";
        }
        
        $query .= " WHERE id = :id AND kullanici_id = :kullanici_id";
        
        $stmt = $this->conn->prepare($query);
        
        $this->baslik = htmlspecialchars(strip_tags($this->baslik));
        $this->ozet = htmlspecialchars(strip_tags($this->ozet));
        
        $stmt->bindParam(':baslik', $this->baslik);
        $stmt->bindParam(':ozet', $this->ozet);
        $stmt->bindParam(':deneyimler', $this->deneyimler);
        $stmt->bindParam(':egitimler', $this->egitimler);
        $stmt->bindParam(':beceriler', $this->beceriler);
        $stmt->bindParam(':diller', $this->diller);
        $stmt->bindParam(':sertifikalar', $this->sertifikalar);
        
        if (!empty($this->dosya_url)) {
            $stmt->bindParam(':dosya_url', $this->dosya_url);
        }
        
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':kullanici_id', $this->kullanici_id);
        
        return $stmt->execute();
    }
    
    /**
     * ID'ye göre özgeçmiş getir
     */
    public function getById() {
        $query = "SELECT 
                    o.*,
                    k.isim,
                    k.soyisim,
                    k.email,
                    k.telefon
                  FROM " . $this->table_name . " o
                  LEFT JOIN Kullanicilar k ON o.kullanici_id = k.id
                  WHERE o.id = :id
                  LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
