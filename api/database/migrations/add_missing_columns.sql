-- =====================================================
-- İş Bul Platform - Eksik Sütunları Ekleme
-- Bu dosyayı seed'lerden ÖNCE çalıştırın
-- =====================================================

-- ADIM 1: Önce gerekli tabloları oluştur
-- Sektorler tablosu kontrolü (eğer yoksa oluştur)
CREATE TABLE IF NOT EXISTS sektorler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isim VARCHAR(100) NOT NULL UNIQUE,
    aciklama TEXT NULL,
    olusturulma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sehirler tablosu kontrolü (eğer yoksa oluştur)
CREATE TABLE IF NOT EXISTS sehirler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isim VARCHAR(100) NOT NULL UNIQUE,
    bolge VARCHAR(50) DEFAULT 'Diğer',
    olusturulma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Kategoriler tablosu kontrolü (eğer yoksa oluştur)
CREATE TABLE IF NOT EXISTS kategoriler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isim VARCHAR(100) NOT NULL UNIQUE,
    aciklama TEXT NULL,
    ikon VARCHAR(10) DEFAULT '📁',
    olusturulma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- إضافة UNIQUE constraints إذا لم تكن موجودة (للجداول الموجودة مسبقاً)
SET @exist := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS WHERE table_schema = DATABASE() AND table_name = 'kategoriler' AND index_name = 'unique_kategori_isim');
SET @sqlstmt := IF(@exist = 0, 'ALTER TABLE kategoriler ADD UNIQUE KEY unique_kategori_isim (isim)', 'SELECT ''Index exists''');
PREPARE stmt FROM @sqlstmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @exist := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS WHERE table_schema = DATABASE() AND table_name = 'sehirler' AND index_name = 'unique_sehir_isim');
SET @sqlstmt := IF(@exist = 0, 'ALTER TABLE sehirler ADD UNIQUE KEY unique_sehir_isim (isim)', 'SELECT ''Index exists''');
PREPARE stmt FROM @sqlstmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @exist := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS WHERE table_schema = DATABASE() AND table_name = 'sektorler' AND index_name = 'unique_sektor_isim');
SET @sqlstmt := IF(@exist = 0, 'ALTER TABLE sektorler ADD UNIQUE KEY unique_sektor_isim (isim)', 'SELECT ''Index exists''');
PREPARE stmt FROM @sqlstmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ADIM 2: Mevcut tablolara sütun ekle
-- Kategoriler tablosuna ikon sütunu ekle (eğer yoksa)
SET @dbname = DATABASE();
SET @tablename = 'kategoriler';
SET @columnname = 'ikon';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND COLUMN_NAME = @columnname
  ) > 0,
  'SELECT 1',
  'ALTER TABLE kategoriler ADD COLUMN ikon VARCHAR(10) DEFAULT "📁" AFTER aciklama'
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Sehirler tablosuna bolge sütunu ekle (eğer yoksa)
SET @columnname = 'bolge';
SET @tablename = 'sehirler';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND COLUMN_NAME = @columnname
  ) > 0,
  'SELECT 1',
  'ALTER TABLE sehirler ADD COLUMN bolge VARCHAR(50) DEFAULT "Diğer" AFTER isim'
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- ADIM 3: Kullanicilar tablosuna sütunlar ekle
-- Website sütunu
SET @columnname = 'website';
SET @tablename = 'kullanicilar';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND COLUMN_NAME = @columnname
  ) > 0,
  'SELECT 1',
  'ALTER TABLE kullanicilar ADD COLUMN website VARCHAR(255) NULL AFTER email'
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Sektor_id sütunu
SET @columnname = 'sektor_id';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND COLUMN_NAME = @columnname
  ) > 0,
  'SELECT 1',
  'ALTER TABLE kullanicilar ADD COLUMN sektor_id INT NULL AFTER website'
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Sehir_id sütunu
SET @columnname = 'sehir_id';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND COLUMN_NAME = @columnname
  ) > 0,
  'SELECT 1',
  'ALTER TABLE kullanicilar ADD COLUMN sehir_id INT NULL AFTER sektor_id'
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- ADIM 4: Foreign key'leri ekle (sadece yoksa)
-- Önce mevcut constraint'leri kontrol et ve sil
SET @constraint_name = 'fk_kullanici_sektor';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
    WHERE
      CONSTRAINT_SCHEMA = @dbname
      AND TABLE_NAME = 'kullanicilar'
      AND CONSTRAINT_NAME = @constraint_name
  ) > 0,
  'ALTER TABLE kullanicilar DROP FOREIGN KEY fk_kullanici_sektor',
  'SELECT 1'
));
PREPARE dropIfExists FROM @preparedStatement;
EXECUTE dropIfExists;
DEALLOCATE PREPARE dropIfExists;

-- Sektor foreign key ekle
ALTER TABLE kullanicilar
ADD CONSTRAINT fk_kullanici_sektor 
FOREIGN KEY (sektor_id) REFERENCES sektorler(id) ON DELETE SET NULL;

-- Sehir foreign key kontrol ve ekle
SET @constraint_name = 'fk_kullanici_sehir';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
    WHERE
      CONSTRAINT_SCHEMA = @dbname
      AND TABLE_NAME = 'kullanicilar'
      AND CONSTRAINT_NAME = @constraint_name
  ) > 0,
  'ALTER TABLE kullanicilar DROP FOREIGN KEY fk_kullanici_sehir',
  'SELECT 1'
));
PREPARE dropIfExists FROM @preparedStatement;
EXECUTE dropIfExists;
DEALLOCATE PREPARE dropIfExists;

-- Sehir foreign key ekle
ALTER TABLE kullanicilar
ADD CONSTRAINT fk_kullanici_sehir 
FOREIGN KEY (sehir_id) REFERENCES sehirler(id) ON DELETE SET NULL;

-- ADIM 5: İlanlar tablosuna sütunlar ekle
SET @columnname = 'maas_aralik';
SET @tablename = 'ilanlar';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND COLUMN_NAME = @columnname
  ) > 0,
  'SELECT 1',
  'ALTER TABLE ilanlar ADD COLUMN maas_aralik VARCHAR(50) NULL AFTER pozisyon_seviyesi'
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

SET @columnname = 'egitim_seviyesi';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND COLUMN_NAME = @columnname
  ) > 0,
  'SELECT 1',
  'ALTER TABLE ilanlar ADD COLUMN egitim_seviyesi ENUM("lise", "onlisans", "lisans", "yuksek_lisans", "doktora") DEFAULT "lisans" AFTER maas_aralik'
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- ADIM 6: Basvurular tablosu kontrolü (eğer yoksa oluştur)
CREATE TABLE IF NOT EXISTS basvurular (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_id INT NOT NULL,
    ilan_id INT NOT NULL,
    durum ENUM('beklemede', 'inceleniyor', 'kabul', 'red') DEFAULT 'beklemede',
    notlar TEXT NULL,
    olusturulma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    guncelleme_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kullanici_id) REFERENCES kullanicilar(id) ON DELETE CASCADE,
    FOREIGN KEY (ilan_id) REFERENCES ilanlar(id) ON DELETE CASCADE,
    UNIQUE KEY unique_application (kullanici_id, ilan_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ADIM 7: İndeksler ekle (performans için)
-- NOT: Sadece sütun varsa index ekle

-- İlanlar kategori_id index (sadece sütun varsa)
SET @col_exists := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'ilanlar' AND COLUMN_NAME = 'kategori_id');
SET @idx_exists := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'ilanlar' AND index_name = 'idx_ilanlar_kategori');
SET @sqlstmt := IF(@col_exists > 0 AND @idx_exists = 0, 'CREATE INDEX idx_ilanlar_kategori ON ilanlar(kategori_id)', 'SELECT ''Skipped''');
PREPARE stmt FROM @sqlstmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- İlanlar sektor_id index (sadece sütun varsa)
SET @col_exists := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'ilanlar' AND COLUMN_NAME = 'sektor_id');
SET @idx_exists := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'ilanlar' AND index_name = 'idx_ilanlar_sektor');
SET @sqlstmt := IF(@col_exists > 0 AND @idx_exists = 0, 'CREATE INDEX idx_ilanlar_sektor ON ilanlar(sektor_id)', 'SELECT ''Skipped''');
PREPARE stmt FROM @sqlstmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- İlanlar sehir_id index (sadece sütun varsa)
SET @col_exists := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'ilanlar' AND COLUMN_NAME = 'sehir_id');
SET @idx_exists := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'ilanlar' AND index_name = 'idx_ilanlar_sehir');
SET @sqlstmt := IF(@col_exists > 0 AND @idx_exists = 0, 'CREATE INDEX idx_ilanlar_sehir ON ilanlar(sehir_id)', 'SELECT ''Skipped''');
PREPARE stmt FROM @sqlstmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- İlanlar durum index (sadece sütun varsa)
SET @col_exists := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'ilanlar' AND COLUMN_NAME = 'durum');
SET @idx_exists := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'ilanlar' AND index_name = 'idx_ilanlar_durum');
SET @sqlstmt := IF(@col_exists > 0 AND @idx_exists = 0, 'CREATE INDEX idx_ilanlar_durum ON ilanlar(durum)', 'SELECT ''Skipped''');
PREPARE stmt FROM @sqlstmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- İlanlar calisma_sekli index (sadece sütun varsa)
SET @col_exists := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'ilanlar' AND COLUMN_NAME = 'calisma_sekli');
SET @idx_exists := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'ilanlar' AND index_name = 'idx_ilanlar_calisma_sekli');
SET @sqlstmt := IF(@col_exists > 0 AND @idx_exists = 0, 'CREATE INDEX idx_ilanlar_calisma_sekli ON ilanlar(calisma_sekli)', 'SELECT ''Skipped''');
PREPARE stmt FROM @sqlstmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Basvurular kullanici_id index (sadece tablo varsa)
SET @tbl_exists := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'basvurular');
SET @idx_exists := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'basvurular' AND index_name = 'idx_basvurular_kullanici');
SET @sqlstmt := IF(@tbl_exists > 0 AND @idx_exists = 0, 'CREATE INDEX idx_basvurular_kullanici ON basvurular(kullanici_id)', 'SELECT ''Skipped''');
PREPARE stmt FROM @sqlstmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Basvurular ilan_id index (sadece tablo varsa)
SET @idx_exists := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'basvurular' AND index_name = 'idx_basvurular_ilan');
SET @sqlstmt := IF(@tbl_exists > 0 AND @idx_exists = 0, 'CREATE INDEX idx_basvurular_ilan ON basvurular(ilan_id)', 'SELECT ''Skipped''');
PREPARE stmt FROM @sqlstmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Basvurular durum index (sadece tablo varsa)
SET @idx_exists := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'basvurular' AND index_name = 'idx_basvurular_durum');
SET @sqlstmt := IF(@tbl_exists > 0 AND @idx_exists = 0, 'CREATE INDEX idx_basvurular_durum ON basvurular(durum)', 'SELECT ''Skipped''');
PREPARE stmt FROM @sqlstmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- =====================================================
-- Notlar:
-- 1. Bu dosyayı seed dosyasından ÖNCE çalıştırın
-- 2. Prepared statements kullanıldığı için güvenli
-- 3. Mevcut veriler korunur
-- 4. Tekrar çalıştırılabilir
-- =====================================================
