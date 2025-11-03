<?php
/**
 * Bildirim Modeli
 * Bildirim işlemleri için model sınıfı
 */

class Notification {
    private $conn;
    private $table_name = "bildirimler";
    
    public $id;
    public $kullanici_id;
    public $tip;
    public $baslik;
    public $mesaj;
    public $ilan_id;
    public $basvuru_id;
    public $mesaj_id;
    public $okundu;
    public $olusturulma_tarihi;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    /**
     * Yeni bildirim oluştur
     */
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                  SET kullanici_id = :kullanici_id,
                      tip = :tip,
                      baslik = :baslik,
                      mesaj = :mesaj,
                      ilan_id = :ilan_id,
                      basvuru_id = :basvuru_id,
                      mesaj_id = :mesaj_id,
                      okundu = 0,
                      olusturulma_tarihi = NOW()";
        
        $stmt = $this->conn->prepare($query);
        
        $this->baslik = htmlspecialchars(strip_tags($this->baslik));
        $this->mesaj = htmlspecialchars(strip_tags($this->mesaj));
        $this->tip = htmlspecialchars(strip_tags($this->tip));
        
        $stmt->bindParam(':kullanici_id', $this->kullanici_id);
        $stmt->bindParam(':tip', $this->tip);
        $stmt->bindParam(':baslik', $this->baslik);
        $stmt->bindParam(':mesaj', $this->mesaj);
        $stmt->bindParam(':ilan_id', $this->ilan_id);
        $stmt->bindParam(':basvuru_id', $this->basvuru_id);
        $stmt->bindParam(':mesaj_id', $this->mesaj_id);
        
        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }
    
    /**
     * Kullanıcının bildirimlerini getir
     */
    public function getUserNotifications($kullanici_id, $limit = 50) {
        $query = "SELECT * FROM " . $this->table_name . "
                  WHERE kullanici_id = :kullanici_id
                  ORDER BY olusturulma_tarihi DESC
                  LIMIT :limit";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':kullanici_id', $kullanici_id);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt;
    }
    
    /**
     * Okunmamış bildirim sayısını getir
     */
    public function getUnreadCount($kullanici_id) {
        $query = "SELECT COUNT(*) as count FROM " . $this->table_name . "
                  WHERE kullanici_id = :kullanici_id AND okundu = 0";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':kullanici_id', $kullanici_id);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['count'];
    }
    
    /**
     * Bildirimi okundu olarak işaretle
     */
    public function markAsRead($id, $kullanici_id) {
        $query = "UPDATE " . $this->table_name . "
                  SET okundu = 1
                  WHERE id = :id AND kullanici_id = :kullanici_id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':kullanici_id', $kullanici_id);
        
        return $stmt->execute();
    }
    
    /**
     * Tüm bildirimleri okundu olarak işaretle
     */
    public function markAllAsRead($kullanici_id) {
        $query = "UPDATE " . $this->table_name . "
                  SET okundu = 1
                  WHERE kullanici_id = :kullanici_id AND okundu = 0";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':kullanici_id', $kullanici_id);
        
        return $stmt->execute();
    }
    
    /**
     * İlan sahibi firma ID'sini getir
     */
    public function getJobOwnerId($ilan_id) {
        $query = "SELECT firma_id FROM ilanlar WHERE id = :ilan_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':ilan_id', $ilan_id);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? $row['firma_id'] : null;
    }
    
    /**
     * Firma kullanıcı ID'sini getir (firmalar tablosundan)
     */
    public function getFirmaUserId($firma_id) {
        $query = "SELECT kullanici_id FROM firmalar WHERE id = :firma_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':firma_id', $firma_id);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? $row['kullanici_id'] : null;
    }
}

