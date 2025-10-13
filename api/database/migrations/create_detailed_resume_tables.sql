-- =====================================================
-- Özgeçmiş Detaylı Tablolar - Week 3
-- Tarih: 13 Ekim 2025
-- Açıklama: İş deneyimi, eğitim, beceri, dil ve sertifika tabloları
-- =====================================================

USE isbul;

-- =====================================================
-- 1. İş Deneyimleri Tablosu
-- =====================================================
CREATE TABLE IF NOT EXISTS is_deneyimleri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_id INT NOT NULL,
    sirket_adi VARCHAR(255) NOT NULL,
    pozisyon VARCHAR(255) NOT NULL,
    baslangic_tarihi DATE NOT NULL,
    bitis_tarihi DATE NULL,
    halen_calisiyor BOOLEAN DEFAULT FALSE,
    aciklama TEXT,
    sehir VARCHAR(100),
    sektor VARCHAR(100),
    sira INT DEFAULT 0,
    olusturulma_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    guncelleme_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kullanici_id) REFERENCES kullanicilar(id) ON DELETE CASCADE,
    INDEX idx_kullanici (kullanici_id),
    INDEX idx_sira (sira)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 2. Eğitim Bilgileri Tablosu
-- =====================================================
CREATE TABLE IF NOT EXISTS egitim_bilgileri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_id INT NOT NULL,
    okul_adi VARCHAR(255) NOT NULL,
    bolum VARCHAR(255) NOT NULL,
    derece ENUM('lise', 'onlisans', 'lisans', 'yuksek_lisans', 'doktora') DEFAULT 'lisans',
    baslangic_tarihi DATE NOT NULL,
    bitis_tarihi DATE NULL,
    devam_ediyor BOOLEAN DEFAULT FALSE,
    not_ortalamasi DECIMAL(3,2) NULL,
    aciklama TEXT,
    sehir VARCHAR(100),
    sira INT DEFAULT 0,
    olusturulma_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    guncelleme_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kullanici_id) REFERENCES kullanicilar(id) ON DELETE CASCADE,
    INDEX idx_kullanici (kullanici_id),
    INDEX idx_sira (sira)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 3. Diller Tablosu
-- =====================================================
CREATE TABLE IF NOT EXISTS diller (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_id INT NOT NULL,
    dil_adi VARCHAR(100) NOT NULL,
    seviye ENUM('baslangic', 'orta', 'ileri', 'anadil') DEFAULT 'orta',
    okuma_seviyesi ENUM('zayif', 'orta', 'iyi', 'cok_iyi') DEFAULT 'orta',
    yazma_seviyesi ENUM('zayif', 'orta', 'iyi', 'cok_iyi') DEFAULT 'orta',
    konusma_seviyesi ENUM('zayif', 'orta', 'iyi', 'cok_iyi') DEFAULT 'orta',
    sertifika VARCHAR(255) NULL,
    olusturulma_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    guncelleme_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kullanici_id) REFERENCES kullanicilar(id) ON DELETE CASCADE,
    INDEX idx_kullanici (kullanici_id),
    UNIQUE KEY unique_kullanici_dil (kullanici_id, dil_adi)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 4. Sertifikalar Tablosu
-- =====================================================
CREATE TABLE IF NOT EXISTS sertifikalar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_id INT NOT NULL,
    sertifika_adi VARCHAR(255) NOT NULL,
    kurum VARCHAR(255) NOT NULL,
    tarih DATE NOT NULL,
    gecerlilik_tarihi DATE NULL,
    sertifika_no VARCHAR(100) NULL,
    aciklama TEXT,
    dosya_url VARCHAR(255) NULL,
    olusturulma_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    guncelleme_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kullanici_id) REFERENCES kullanicilar(id) ON DELETE CASCADE,
    INDEX idx_kullanici (kullanici_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 5. Kullanıcı Becerileri Tablosu (Detaylı)
-- =====================================================
CREATE TABLE IF NOT EXISTS kullanici_becerileri_detay (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_id INT NOT NULL,
    beceri_adi VARCHAR(255) NOT NULL,
    kategori VARCHAR(100) NULL,
    seviye ENUM('baslangic', 'orta', 'ileri', 'uzman') DEFAULT 'orta',
    yil_deneyim INT DEFAULT 0,
    olusturulma_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    guncelleme_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kullanici_id) REFERENCES kullanicilar(id) ON DELETE CASCADE,
    INDEX idx_kullanici (kullanici_id),
    INDEX idx_kategori (kategori)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 6. Projeler Tablosu
-- =====================================================
CREATE TABLE IF NOT EXISTS projeler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_id INT NOT NULL,
    proje_adi VARCHAR(255) NOT NULL,
    aciklama TEXT,
    baslangic_tarihi DATE NOT NULL,
    bitis_tarihi DATE NULL,
    devam_ediyor BOOLEAN DEFAULT FALSE,
    rol VARCHAR(100),
    teknolojiler TEXT,
    proje_url VARCHAR(255) NULL,
    github_url VARCHAR(255) NULL,
    sira INT DEFAULT 0,
    olusturulma_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    guncelleme_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kullanici_id) REFERENCES kullanicilar(id) ON DELETE CASCADE,
    INDEX idx_kullanici (kullanici_id),
    INDEX idx_sira (sira)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 7. Referanslar Tablosu
-- =====================================================
CREATE TABLE IF NOT EXISTS referanslar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_id INT NOT NULL,
    isim VARCHAR(255) NOT NULL,
    pozisyon VARCHAR(255),
    sirket VARCHAR(255),
    telefon VARCHAR(20),
    email VARCHAR(255),
    iliskilendirme VARCHAR(255),
    olusturulma_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    guncelleme_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kullanici_id) REFERENCES kullanicilar(id) ON DELETE CASCADE,
    INDEX idx_kullanici (kullanici_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 8. Özgeçmiş Ayarları Tablosu
-- =====================================================
CREATE TABLE IF NOT EXISTS ozgecmis_ayarlari (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_id INT NOT NULL UNIQUE,
    baslik VARCHAR(255),
    ozet TEXT,
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    website_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    gorunurluk ENUM('herkese_acik', 'sadece_sirketler', 'gizli') DEFAULT 'sadece_sirketler',
    pdf_template VARCHAR(50) DEFAULT 'modern',
    son_guncelleme DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kullanici_id) REFERENCES kullanicilar(id) ON DELETE CASCADE,
    INDEX idx_kullanici (kullanici_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Başarı Mesajı
-- =====================================================
SELECT 'Özgeçmiş detaylı tabloları başarıyla oluşturuldu!' as Mesaj,
       '8 yeni tablo eklendi' as Detay;
