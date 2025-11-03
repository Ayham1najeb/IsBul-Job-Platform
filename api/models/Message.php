<?php
/**
 * Mesaj Modeli
 * Kullanıcılar arası mesajlaşma işlemleri
 */

class Message {
    private $conn;
    private $table_name = "Mesajlar";
    
    public $id;
    public $gonderen_id;
    public $alici_id;
    public $ilan_id;
    public $konu;
    public $mesaj;
    public $okundu;
    public $gonderim_tarihi;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    /**
     * Mesaj gönder
     */
    public function send() {
        $query = "INSERT INTO " . $this->table_name . "
                  SET gonderen_id = :gonderen_id,
                      alici_id = :alici_id,
                      ilan_id = :ilan_id,
                      konu = :konu,
                      mesaj = :mesaj,
                      okundu = 0,
                      gonderme_tarihi = NOW()";
        
        $stmt = $this->conn->prepare($query);
        
        $this->konu = htmlspecialchars(strip_tags($this->konu));
        $this->mesaj = htmlspecialchars(strip_tags($this->mesaj));
        
        $stmt->bindParam(':gonderen_id', $this->gonderen_id);
        $stmt->bindParam(':alici_id', $this->alici_id);
        $stmt->bindParam(':ilan_id', $this->ilan_id);
        $stmt->bindParam(':konu', $this->konu);
        $stmt->bindParam(':mesaj', $this->mesaj);
        
        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }
    
    /**
     * Kullanıcının mesajlarını getir
     */
    public function getUserMessages($kullanici_id) {
        $query = "SELECT 
                    m.*,
                    g.isim as gonderen_isim,
                    g.soyisim as gonderen_soyisim,
                    a.isim as alici_isim,
                    a.soyisim as alici_soyisim,
                    i.baslik as ilan_baslik
                  FROM " . $this->table_name . " m
                  LEFT JOIN Kullanicilar g ON m.gonderen_id = g.id
                  LEFT JOIN Kullanicilar a ON m.alici_id = a.id
                  LEFT JOIN Ilanlar i ON m.ilan_id = i.id
                  WHERE m.gonderen_id = :kullanici_id OR m.alici_id = :kullanici_id
                  ORDER BY m.gonderme_tarihi DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':kullanici_id', $kullanici_id);
        $stmt->execute();
        
        return $stmt;
    }
    
    /**
     * İki kullanıcı arasındaki konuşmayı getir
     */
    public function getConversation($user1_id, $user2_id) {
        $query = "SELECT 
                    m.*,
                    g.isim as gonderen_isim,
                    g.soyisim as gonderen_soyisim,
                    i.baslik as ilan_baslik,
                    i.id as ilan_id
                  FROM " . $this->table_name . " m
                  LEFT JOIN Kullanicilar g ON m.gonderen_id = g.id
                  LEFT JOIN Ilanlar i ON m.ilan_id = i.id
                  WHERE (m.gonderen_id = :user1_id AND m.alici_id = :user2_id)
                     OR (m.gonderen_id = :user2_id AND m.alici_id = :user1_id)
                  ORDER BY m.gonderme_tarihi ASC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user1_id', $user1_id);
        $stmt->bindParam(':user2_id', $user2_id);
        $stmt->execute();
        
        return $stmt;
    }
    
    /**
     * Belirli bir mesaj ID'sinden sonraki yeni mesajları getir
     */
    public function getNewMessages($user1_id, $user2_id, $last_message_id = 0) {
        $query = "SELECT 
                    m.*,
                    g.isim as gonderen_isim,
                    g.soyisim as gonderen_soyisim,
                    i.baslik as ilan_baslik,
                    i.id as ilan_id
                  FROM " . $this->table_name . " m
                  LEFT JOIN Kullanicilar g ON m.gonderen_id = g.id
                  LEFT JOIN Ilanlar i ON m.ilan_id = i.id
                  WHERE ((m.gonderen_id = :user1_id AND m.alici_id = :user2_id)
                     OR (m.gonderen_id = :user2_id AND m.alici_id = :user1_id))
                     AND m.id > :last_message_id
                  ORDER BY m.gonderme_tarihi ASC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user1_id', $user1_id);
        $stmt->bindParam(':user2_id', $user2_id);
        $stmt->bindParam(':last_message_id', $last_message_id, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt;
    }
    
    /**
     * Mesajı okundu olarak işaretle
     */
    public function markAsRead() {
        $query = "UPDATE " . $this->table_name . "
                  SET okundu = 1
                  WHERE id = :id AND alici_id = :alici_id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':alici_id', $this->alici_id);
        
        return $stmt->execute();
    }
    
    /**
     * Okunmamış mesaj sayısı
     */
    public function getUnreadCount($kullanici_id) {
        $query = "SELECT COUNT(*) as sayi FROM " . $this->table_name . "
                  WHERE alici_id = :kullanici_id AND okundu = 0";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':kullanici_id', $kullanici_id);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['sayi'];
    }
}
