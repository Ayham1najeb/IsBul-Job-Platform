<?php
/**
 * Başvuru Modeli
 * İş başvuruları veritabanı işlemleri
 */

class Application {
    private $conn;
    private $table_name = "basvurular";
    
    public $id;
    public $kullanici_id;
    public $ilan_id;
    public $basvuru_tarihi;
    public $durum;
    public $notlar;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    /**
     * Başvuru oluştur
     */
    public function create() {
        // Daha önce başvuru yapılmış mı kontrol et
        $check_query = "SELECT id FROM " . $this->table_name . "
                       WHERE kullanici_id = :kullanici_id AND ilan_id = :ilan_id";
        $check_stmt = $this->conn->prepare($check_query);
        $check_stmt->bindParam(':kullanici_id', $this->kullanici_id);
        $check_stmt->bindParam(':ilan_id', $this->ilan_id);
        $check_stmt->execute();
        
        if ($check_stmt->rowCount() > 0) {
            return false; // Zaten başvuru yapılmış
        }
        
        $query = "INSERT INTO " . $this->table_name . "
                  SET kullanici_id = :kullanici_id,
                      ilan_id = :ilan_id,
                      basvuru_tarihi = NOW(),
                      durum = 'beklemede',
                      notlar = :notlar";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':kullanici_id', $this->kullanici_id);
        $stmt->bindParam(':ilan_id', $this->ilan_id);
        $stmt->bindParam(':notlar', $this->notlar);
        
        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }
    
    /**
     * Kullanıcının başvurularını getir
     */
    public function getUserApplications($kullanici_id) {
        $query = "SELECT 
                    b.*,
                    i.baslik as ilan_baslik,
                    i.calisma_sekli,
                    i.maas_aralik,
                    f.isim as firma_isim,
                    f.logo_url as firma_logo
                  FROM " . $this->table_name . " b
                  LEFT JOIN Ilanlar i ON b.ilan_id = i.id
                  LEFT JOIN Firmalar f ON i.firma_id = f.id
                  WHERE b.kullanici_id = :kullanici_id
                  ORDER BY b.basvuru_tarihi DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':kullanici_id', $kullanici_id);
        $stmt->execute();
        
        return $stmt;
    }
    
    /**
     * İlana yapılan başvuruları getir (Şirket için)
     */
    public function getJobApplications($ilan_id) {
        $query = "SELECT 
                    b.*,
                    k.isim,
                    k.soyisim,
                    k.email,
                    k.telefon,
                    (SELECT COUNT(*) FROM is_deneyimleri WHERE kullanici_id = b.kullanici_id) as deneyim_sayisi,
                    (SELECT COUNT(*) FROM egitim_bilgileri WHERE kullanici_id = b.kullanici_id) as egitim_sayisi,
                    (SELECT COUNT(*) FROM kullanici_becerileri_detay WHERE kullanici_id = b.kullanici_id) as beceri_sayisi
                  FROM " . $this->table_name . " b
                  LEFT JOIN kullanicilar k ON b.kullanici_id = k.id
                  WHERE b.ilan_id = :ilan_id
                  ORDER BY b.basvuru_tarihi DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':ilan_id', $ilan_id);
        $stmt->execute();
        
        return $stmt;
    }
    
    /**
     * Başvuru durumunu güncelle
     */
    public function updateStatus() {
        $query = "UPDATE " . $this->table_name . "
                  SET durum = :durum
                  WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':durum', $this->durum);
        $stmt->bindParam(':id', $this->id);
        
        return $stmt->execute();
    }
    
    /**
     * Başvuru detayını getir
     */
    public function getById() {
        $query = "SELECT 
                    b.*,
                    i.baslik as ilan_baslik,
                    f.isim as firma_isim,
                    k.isim,
                    k.soyisim,
                    k.email
                  FROM " . $this->table_name . " b
                  LEFT JOIN Ilanlar i ON b.ilan_id = i.id
                  LEFT JOIN Firmalar f ON i.firma_id = f.id
                  LEFT JOIN Kullanicilar k ON b.kullanici_id = k.id
                  WHERE b.id = :id
                  LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
