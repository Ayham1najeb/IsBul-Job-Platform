<?php
/**
 * İş İlanı Modeli
 * İş ilanları veritabanı işlemleri
 */

class Job {
    private $conn;
    private $table_name = "Ilanlar";
    
    // İlan özellikleri
    public $id;
    public $baslik;
    public $firma_id;
    public $kategori_id;
    public $sehir_id;
    public $ilce_id;
    public $aciklama;
    public $gereksinimler;
    public $sorumluluklar;
    public $maas_aralik;
    public $calisma_sekli;
    public $pozisyon_seviyesi;
    public $deneyim_yili;
    public $egitim_seviyesi;
    public $son_basvuru_tarihi;
    public $yayinlanma_tarihi;
    public $aktif;
    
    /**
     * Constructor
     */
    public function __construct($db) {
        $this->conn = $db;
    }
    
    /**
     * Tüm ilanları getir (filtreleme ile)
     */
    public function getAll($filters = []) {
        $query = "SELECT 
                    i.*,
                    f.isim as firma_isim,
                    f.logo_url as firma_logo,
                    k.isim as kategori_isim,
                    s.isim as sehir_isim,
                    il.isim as ilce_isim
                  FROM " . $this->table_name . " i
                  LEFT JOIN Firmalar f ON i.firma_id = f.id
                  LEFT JOIN Kategoriler k ON i.kategori_id = k.id
                  LEFT JOIN Sehirler s ON i.sehir_id = s.id
                  LEFT JOIN Ilceler il ON i.ilce_id = il.id
                  WHERE i.aktif = 1";
        
        // Filtreleme
        if (!empty($filters['kategori_id'])) {
            $query .= " AND i.kategori_id = :kategori_id";
        }
        if (!empty($filters['sehir_id'])) {
            $query .= " AND i.sehir_id = :sehir_id";
        }
        if (!empty($filters['calisma_sekli'])) {
            $query .= " AND i.calisma_sekli = :calisma_sekli";
        }
        if (!empty($filters['arama'])) {
            $query .= " AND (i.baslik LIKE :arama OR i.aciklama LIKE :arama)";
        }
        
        $query .= " ORDER BY i.yayinlanma_tarihi DESC";
        
        // Sayfalama
        if (!empty($filters['limit'])) {
            $query .= " LIMIT :limit";
            if (!empty($filters['offset'])) {
                $query .= " OFFSET :offset";
            }
        }
        
        $stmt = $this->conn->prepare($query);
        
        // Parametreleri bağla
        if (!empty($filters['kategori_id'])) {
            $stmt->bindParam(':kategori_id', $filters['kategori_id']);
        }
        if (!empty($filters['sehir_id'])) {
            $stmt->bindParam(':sehir_id', $filters['sehir_id']);
        }
        if (!empty($filters['calisma_sekli'])) {
            $stmt->bindParam(':calisma_sekli', $filters['calisma_sekli']);
        }
        if (!empty($filters['arama'])) {
            $arama = '%' . $filters['arama'] . '%';
            $stmt->bindParam(':arama', $arama);
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
     * ID'ye göre ilan getir
     */
    public function getById() {
        $query = "SELECT 
                    i.*,
                    f.isim as firma_isim,
                    f.logo_url as firma_logo,
                    f.aciklama as firma_aciklama,
                    f.website as firma_website,
                    k.isim as kategori_isim,
                    s.isim as sehir_isim,
                    il.isim as ilce_isim
                  FROM " . $this->table_name . " i
                  LEFT JOIN Firmalar f ON i.firma_id = f.id
                  LEFT JOIN Kategoriler k ON i.kategori_id = k.id
                  LEFT JOIN Sehirler s ON i.sehir_id = s.id
                  LEFT JOIN Ilceler il ON i.ilce_id = il.id
                  WHERE i.id = :id
                  LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($row) {
            $this->baslik = $row['baslik'];
            $this->firma_id = $row['firma_id'];
            $this->kategori_id = $row['kategori_id'];
            $this->sehir_id = $row['sehir_id'];
            $this->ilce_id = $row['ilce_id'];
            $this->aciklama = $row['aciklama'];
            $this->gereksinimler = $row['gereksinimler'];
            $this->sorumluluklar = $row['sorumluluklar'];
            $this->maas_aralik = $row['maas_aralik'];
            $this->calisma_sekli = $row['calisma_sekli'];
            $this->pozisyon_seviyesi = $row['pozisyon_seviyesi'];
            $this->deneyim_yili = $row['deneyim_yili'];
            $this->egitim_seviyesi = $row['egitim_seviyesi'];
            $this->son_basvuru_tarihi = $row['son_basvuru_tarihi'];
            $this->yayinlanma_tarihi = $row['yayinlanma_tarihi'];
            $this->aktif = $row['aktif'];
            
            return $row;
        }
        
        return false;
    }
    
    /**
     * Yeni ilan oluştur
     */
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                  SET baslik = :baslik,
                      firma_id = :firma_id,
                      kategori_id = :kategori_id,
                      sehir_id = :sehir_id,
                      ilce_id = :ilce_id,
                      aciklama = :aciklama,
                      gereksinimler = :gereksinimler,
                      sorumluluklar = :sorumluluklar,
                      maas_aralik = :maas_aralik,
                      calisma_sekli = :calisma_sekli,
                      pozisyon_seviyesi = :pozisyon_seviyesi,
                      deneyim_yili = :deneyim_yili,
                      egitim_seviyesi = :egitim_seviyesi,
                      son_basvuru_tarihi = :son_basvuru_tarihi,
                      yayinlanma_tarihi = NOW(),
                      aktif = 1";
        
        $stmt = $this->conn->prepare($query);
        
        // Verileri temizle
        $this->baslik = htmlspecialchars(strip_tags($this->baslik));
        $this->aciklama = htmlspecialchars(strip_tags($this->aciklama));
        $this->gereksinimler = htmlspecialchars(strip_tags($this->gereksinimler));
        $this->sorumluluklar = htmlspecialchars(strip_tags($this->sorumluluklar));
        
        // Parametreleri bağla
        $stmt->bindParam(':baslik', $this->baslik);
        $stmt->bindParam(':firma_id', $this->firma_id);
        $stmt->bindParam(':kategori_id', $this->kategori_id);
        $stmt->bindParam(':sehir_id', $this->sehir_id);
        $stmt->bindParam(':ilce_id', $this->ilce_id);
        $stmt->bindParam(':aciklama', $this->aciklama);
        $stmt->bindParam(':gereksinimler', $this->gereksinimler);
        $stmt->bindParam(':sorumluluklar', $this->sorumluluklar);
        $stmt->bindParam(':maas_aralik', $this->maas_aralik);
        $stmt->bindParam(':calisma_sekli', $this->calisma_sekli);
        $stmt->bindParam(':pozisyon_seviyesi', $this->pozisyon_seviyesi);
        $stmt->bindParam(':deneyim_yili', $this->deneyim_yili);
        $stmt->bindParam(':egitim_seviyesi', $this->egitim_seviyesi);
        $stmt->bindParam(':son_basvuru_tarihi', $this->son_basvuru_tarihi);
        
        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        
        return false;
    }
    
    /**
     * İlanı güncelle
     */
    public function update() {
        $query = "UPDATE " . $this->table_name . "
                  SET baslik = :baslik,
                      kategori_id = :kategori_id,
                      sehir_id = :sehir_id,
                      ilce_id = :ilce_id,
                      aciklama = :aciklama,
                      gereksinimler = :gereksinimler,
                      sorumluluklar = :sorumluluklar,
                      maas_aralik = :maas_aralik,
                      calisma_sekli = :calisma_sekli,
                      pozisyon_seviyesi = :pozisyon_seviyesi,
                      deneyim_yili = :deneyim_yili,
                      egitim_seviyesi = :egitim_seviyesi,
                      son_basvuru_tarihi = :son_basvuru_tarihi
                  WHERE id = :id AND firma_id = :firma_id";
        
        $stmt = $this->conn->prepare($query);
        
        // Verileri temizle
        $this->baslik = htmlspecialchars(strip_tags($this->baslik));
        $this->aciklama = htmlspecialchars(strip_tags($this->aciklama));
        
        // Parametreleri bağla
        $stmt->bindParam(':baslik', $this->baslik);
        $stmt->bindParam(':kategori_id', $this->kategori_id);
        $stmt->bindParam(':sehir_id', $this->sehir_id);
        $stmt->bindParam(':ilce_id', $this->ilce_id);
        $stmt->bindParam(':aciklama', $this->aciklama);
        $stmt->bindParam(':gereksinimler', $this->gereksinimler);
        $stmt->bindParam(':sorumluluklar', $this->sorumluluklar);
        $stmt->bindParam(':maas_aralik', $this->maas_aralik);
        $stmt->bindParam(':calisma_sekli', $this->calisma_sekli);
        $stmt->bindParam(':pozisyon_seviyesi', $this->pozisyon_seviyesi);
        $stmt->bindParam(':deneyim_yili', $this->deneyim_yili);
        $stmt->bindParam(':egitim_seviyesi', $this->egitim_seviyesi);
        $stmt->bindParam(':son_basvuru_tarihi', $this->son_basvuru_tarihi);
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':firma_id', $this->firma_id);
        
        return $stmt->execute();
    }
    
    /**
     * İlanı sil (soft delete)
     */
    public function delete() {
        $query = "UPDATE " . $this->table_name . "
                  SET aktif = 0
                  WHERE id = :id AND firma_id = :firma_id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':firma_id', $this->firma_id);
        
        return $stmt->execute();
    }
    
    /**
     * Şirkete göre ilanlar
     */
    public function getByCompany($firma_id) {
        $query = "SELECT * FROM " . $this->table_name . "
                  WHERE firma_id = :firma_id
                  ORDER BY yayinlanma_tarihi DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':firma_id', $firma_id);
        $stmt->execute();
        
        return $stmt;
    }
    
    /**
     * İlan sayısını getir
     */
    public function getCount($filters = []) {
        $query = "SELECT COUNT(*) as total FROM " . $this->table_name . " WHERE aktif = 1";
        
        if (!empty($filters['kategori_id'])) {
            $query .= " AND kategori_id = :kategori_id";
        }
        if (!empty($filters['sehir_id'])) {
            $query .= " AND sehir_id = :sehir_id";
        }
        
        $stmt = $this->conn->prepare($query);
        
        if (!empty($filters['kategori_id'])) {
            $stmt->bindParam(':kategori_id', $filters['kategori_id']);
        }
        if (!empty($filters['sehir_id'])) {
            $stmt->bindParam(':sehir_id', $filters['sehir_id']);
        }
        
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        return $row['total'];
    }
}
