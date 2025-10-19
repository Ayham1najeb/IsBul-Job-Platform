-- =====================================================
-- IsBul Job Platform - Database Schema
-- =====================================================
-- Bu dosya veritabanı yapısını içerir (veri içermez)
-- Kurulum: mysql -u root -p < api/database/schema.sql
-- =====================================================

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acililanlar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ilan_id` int(11) DEFAULT NULL,
  `bitis_tarihi` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ilan_id` (`ilan_id`),
  CONSTRAINT `acililanlar_ibfk_1` FOREIGN KEY (`ilan_id`) REFERENCES `ilanlar` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `basvurular` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) DEFAULT NULL,
  `ilan_id` int(11) DEFAULT NULL,
  `basvuru_tarihi` datetime DEFAULT current_timestamp(),
  `durum` varchar(50) DEFAULT 'beklemede',
  `notlar` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_basvurular_kullanici` (`kullanici_id`),
  KEY `idx_basvurular_ilan` (`ilan_id`),
  KEY `idx_basvurular_durum` (`durum`),
  CONSTRAINT `basvurular_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`),
  CONSTRAINT `basvurular_ibfk_2` FOREIGN KEY (`ilan_id`) REFERENCES `ilanlar` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `beceriler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isim` varchar(255) NOT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kategori_id` (`kategori_id`),
  CONSTRAINT `beceriler_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `kategoriler` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `degerlendirmeler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) DEFAULT NULL,
  `firma_id` int(11) DEFAULT NULL,
  `puan` int(11) DEFAULT NULL CHECK (`puan` between 1 and 5),
  `yorum` text DEFAULT NULL,
  `tarih` datetime DEFAULT current_timestamp(),
  `onaylandi` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `kullanici_id` (`kullanici_id`),
  KEY `firma_id` (`firma_id`),
  CONSTRAINT `degerlendirmeler_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`),
  CONSTRAINT `degerlendirmeler_ibfk_2` FOREIGN KEY (`firma_id`) REFERENCES `firmalar` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diller` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) NOT NULL,
  `dil_adi` varchar(100) NOT NULL,
  `seviye` enum('baslangic','orta','ileri','anadil') DEFAULT 'orta',
  `okuma_seviyesi` enum('zayif','orta','iyi','cok_iyi') DEFAULT 'orta',
  `yazma_seviyesi` enum('zayif','orta','iyi','cok_iyi') DEFAULT 'orta',
  `konusma_seviyesi` enum('zayif','orta','iyi','cok_iyi') DEFAULT 'orta',
  `sertifika` varchar(255) DEFAULT NULL,
  `olusturulma_tarihi` datetime DEFAULT current_timestamp(),
  `guncelleme_tarihi` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_kullanici_dil` (`kullanici_id`,`dil_adi`),
  KEY `idx_kullanici` (`kullanici_id`),
  CONSTRAINT `diller_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `egitim_bilgileri` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) NOT NULL,
  `okul_adi` varchar(255) NOT NULL,
  `bolum` varchar(255) NOT NULL,
  `derece` enum('lise','onlisans','lisans','yuksek_lisans','doktora') DEFAULT 'lisans',
  `baslangic_tarihi` date NOT NULL,
  `bitis_tarihi` date DEFAULT NULL,
  `devam_ediyor` tinyint(1) DEFAULT 0,
  `not_ortalamasi` decimal(3,2) DEFAULT NULL,
  `aciklama` text DEFAULT NULL,
  `sehir` varchar(100) DEFAULT NULL,
  `sira` int(11) DEFAULT 0,
  `olusturulma_tarihi` datetime DEFAULT current_timestamp(),
  `guncelleme_tarihi` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_kullanici` (`kullanici_id`),
  KEY `idx_sira` (`sira`),
  CONSTRAINT `egitim_bilgileri_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `firmalar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) DEFAULT NULL,
  `isim` varchar(255) NOT NULL,
  `sehir_id` int(11) DEFAULT NULL,
  `ilce_id` int(11) DEFAULT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `adres` text DEFAULT NULL,
  `telefon` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `aciklama` text DEFAULT NULL,
  `kurulus_tarihi` date DEFAULT NULL,
  `calisan_sayisi` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sehir_id` (`sehir_id`),
  KEY `ilce_id` (`ilce_id`),
  KEY `kategori_id` (`kategori_id`),
  KEY `fk_firma_kullanici` (`kullanici_id`),
  CONSTRAINT `firmalar_ibfk_1` FOREIGN KEY (`sehir_id`) REFERENCES `sehirler` (`id`),
  CONSTRAINT `firmalar_ibfk_2` FOREIGN KEY (`ilce_id`) REFERENCES `ilceler` (`id`),
  CONSTRAINT `firmalar_ibfk_3` FOREIGN KEY (`kategori_id`) REFERENCES `kategoriler` (`id`),
  CONSTRAINT `fk_firma_kullanici` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `firmatakipcileri` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) DEFAULT NULL,
  `firma_id` int(11) DEFAULT NULL,
  `takip_tarihi` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `kullanici_id` (`kullanici_id`),
  KEY `firma_id` (`firma_id`),
  CONSTRAINT `firmatakipcileri_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`),
  CONSTRAINT `firmatakipcileri_ibfk_2` FOREIGN KEY (`firma_id`) REFERENCES `firmalar` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ilanlar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `baslik` varchar(255) NOT NULL,
  `firma_id` int(11) DEFAULT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `sehir_id` int(11) DEFAULT NULL,
  `ilce_id` int(11) DEFAULT NULL,
  `aciklama` text DEFAULT NULL,
  `gereksinimler` text DEFAULT NULL,
  `sorumluluklar` text DEFAULT NULL,
  `maas_aralik` varchar(100) DEFAULT NULL,
  `egitim_seviyesi` enum('lise','onlisans','lisans','yuksek_lisans','doktora') DEFAULT 'lisans',
  `calisma_sekli` varchar(50) DEFAULT NULL,
  `pozisyon_seviyesi` varchar(50) DEFAULT NULL,
  `deneyim_yili` int(11) DEFAULT 0,
  `son_basvuru_tarihi` date DEFAULT NULL,
  `yayinlanma_tarihi` date DEFAULT NULL,
  `aktif` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `firma_id` (`firma_id`),
  KEY `ilce_id` (`ilce_id`),
  KEY `idx_ilanlar_kategori` (`kategori_id`),
  KEY `idx_ilanlar_sehir` (`sehir_id`),
  KEY `idx_ilanlar_calisma_sekli` (`calisma_sekli`),
  CONSTRAINT `ilanlar_ibfk_1` FOREIGN KEY (`firma_id`) REFERENCES `firmalar` (`id`),
  CONSTRAINT `ilanlar_ibfk_2` FOREIGN KEY (`kategori_id`) REFERENCES `kategoriler` (`id`),
  CONSTRAINT `ilanlar_ibfk_3` FOREIGN KEY (`sehir_id`) REFERENCES `sehirler` (`id`),
  CONSTRAINT `ilanlar_ibfk_4` FOREIGN KEY (`ilce_id`) REFERENCES `ilceler` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ilceler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isim` varchar(255) NOT NULL,
  `sehir_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sehir_id` (`sehir_id`),
  CONSTRAINT `ilceler_ibfk_1` FOREIGN KEY (`sehir_id`) REFERENCES `sehirler` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `is_deneyimleri` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) NOT NULL,
  `sirket_adi` varchar(255) NOT NULL,
  `pozisyon` varchar(255) NOT NULL,
  `baslangic_tarihi` date NOT NULL,
  `bitis_tarihi` date DEFAULT NULL,
  `halen_calisiyor` tinyint(1) DEFAULT 0,
  `aciklama` text DEFAULT NULL,
  `sehir` varchar(100) DEFAULT NULL,
  `sektor` varchar(100) DEFAULT NULL,
  `sira` int(11) DEFAULT 0,
  `olusturulma_tarihi` datetime DEFAULT current_timestamp(),
  `guncelleme_tarihi` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_kullanici` (`kullanici_id`),
  KEY `idx_sira` (`sira`),
  CONSTRAINT `is_deneyimleri_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `isalarmları` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) DEFAULT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `anahtar_kelimeler` text DEFAULT NULL,
  `sehir_id` int(11) DEFAULT NULL,
  `bildirim_sikligi` varchar(20) DEFAULT NULL,
  `aktif` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `kullanici_id` (`kullanici_id`),
  KEY `kategori_id` (`kategori_id`),
  KEY `sehir_id` (`sehir_id`),
  CONSTRAINT `isalarmları_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`),
  CONSTRAINT `isalarmları_ibfk_2` FOREIGN KEY (`kategori_id`) REFERENCES `kategoriler` (`id`),
  CONSTRAINT `isalarmları_ibfk_3` FOREIGN KEY (`sehir_id`) REFERENCES `sehirler` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kategoriler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isim` varchar(255) NOT NULL,
  `aciklama` text DEFAULT NULL,
  `ikon` varchar(10) DEFAULT '?',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_kategori_isim` (`isim`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kaydedilenilanlar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) DEFAULT NULL,
  `ilan_id` int(11) DEFAULT NULL,
  `kayit_tarihi` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `kullanici_id` (`kullanici_id`),
  KEY `ilan_id` (`ilan_id`),
  CONSTRAINT `kaydedilenilanlar_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`),
  CONSTRAINT `kaydedilenilanlar_ibfk_2` FOREIGN KEY (`ilan_id`) REFERENCES `ilanlar` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kullanici_becerileri_detay` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) NOT NULL,
  `beceri_adi` varchar(255) NOT NULL,
  `kategori` varchar(100) DEFAULT NULL,
  `seviye` enum('baslangic','orta','ileri','uzman') DEFAULT 'orta',
  `yil_deneyim` int(11) DEFAULT 0,
  `olusturulma_tarihi` datetime DEFAULT current_timestamp(),
  `guncelleme_tarihi` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_kullanici` (`kullanici_id`),
  KEY `idx_kategori` (`kategori`),
  CONSTRAINT `kullanici_becerileri_detay_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kullanicibeceriler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) DEFAULT NULL,
  `beceri_id` int(11) DEFAULT NULL,
  `seviye` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kullanici_id` (`kullanici_id`),
  KEY `beceri_id` (`beceri_id`),
  CONSTRAINT `kullanicibeceriler_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`),
  CONSTRAINT `kullanicibeceriler_ibfk_2` FOREIGN KEY (`beceri_id`) REFERENCES `beceriler` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kullanicilar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isim` varchar(255) NOT NULL,
  `soyisim` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified` tinyint(1) DEFAULT 0,
  `is_super_admin` tinyint(1) DEFAULT 0,
  `profil_foto` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `sektor_id` int(11) DEFAULT NULL,
  `sifre` varchar(255) NOT NULL,
  `telefon` varchar(20) DEFAULT NULL,
  `dogum_tarihi` date DEFAULT NULL,
  `cinsiyet` varchar(20) DEFAULT NULL,
  `sehir_id` int(11) DEFAULT NULL,
  `ilce_id` int(11) DEFAULT NULL,
  `adres` text DEFAULT NULL,
  `profil_resmi` varchar(255) DEFAULT NULL,
  `kayit_tarihi` datetime DEFAULT current_timestamp(),
  `son_giris` datetime DEFAULT NULL,
  `aktif` tinyint(1) DEFAULT 1,
  `rol` varchar(20) DEFAULT 'is_arayan',
  `rol_confirmed` tinyint(1) DEFAULT 0,
  `admin_approved` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `ilce_id` (`ilce_id`),
  KEY `fk_kullanici_sektor` (`sektor_id`),
  KEY `fk_kullanici_sehir` (`sehir_id`),
  CONSTRAINT `fk_kullanici_sehir` FOREIGN KEY (`sehir_id`) REFERENCES `sehirler` (`id`) ON DELETE SET NULL,
  CONSTRAINT `kullanicilar_ibfk_1` FOREIGN KEY (`sehir_id`) REFERENCES `sehirler` (`id`),
  CONSTRAINT `kullanicilar_ibfk_2` FOREIGN KEY (`ilce_id`) REFERENCES `ilceler` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mesajlar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gonderen_id` int(11) DEFAULT NULL,
  `alici_id` int(11) DEFAULT NULL,
  `konu` varchar(255) DEFAULT NULL,
  `mesaj` text DEFAULT NULL,
  `okundu` tinyint(1) DEFAULT 0,
  `gonderme_tarihi` datetime DEFAULT current_timestamp(),
  `silindi_gonderen` tinyint(1) DEFAULT 0,
  `silindi_alici` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `gonderen_id` (`gonderen_id`),
  KEY `alici_id` (`alici_id`),
  CONSTRAINT `mesajlar_ibfk_1` FOREIGN KEY (`gonderen_id`) REFERENCES `kullanicilar` (`id`),
  CONSTRAINT `mesajlar_ibfk_2` FOREIGN KEY (`alici_id`) REFERENCES `kullanicilar` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meslekler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isim` varchar(255) NOT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `aciklama` text DEFAULT NULL,
  `gereken_beceriler` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kategori_id` (`kategori_id`),
  CONSTRAINT `meslekler_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `kategoriler` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moderasyon_kayitlari` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ilan_id` int(11) DEFAULT NULL,
  `admin_id` int(11) NOT NULL,
  `islem` enum('approve','reject') NOT NULL,
  `sebep` text DEFAULT NULL,
  `olusturulma_tarihi` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_ilan` (`ilan_id`),
  KEY `idx_admin` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mulakatlar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `basvuru_id` int(11) DEFAULT NULL,
  `tarih` datetime DEFAULT NULL,
  `yer` text DEFAULT NULL,
  `notlar` text DEFAULT NULL,
  `durum` varchar(50) DEFAULT 'planlandı',
  PRIMARY KEY (`id`),
  KEY `basvuru_id` (`basvuru_id`),
  CONSTRAINT `mulakatlar_ibfk_1` FOREIGN KEY (`basvuru_id`) REFERENCES `basvurular` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ozgecmis_ayarlari` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) NOT NULL,
  `baslik` varchar(255) DEFAULT NULL,
  `ozet` text DEFAULT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL,
  `github_url` varchar(255) DEFAULT NULL,
  `website_url` varchar(255) DEFAULT NULL,
  `portfolio_url` varchar(255) DEFAULT NULL,
  `gorunurluk` enum('herkese_acik','sadece_sirketler','gizli') DEFAULT 'sadece_sirketler',
  `pdf_template` varchar(50) DEFAULT 'modern',
  `son_guncelleme` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `kullanici_id` (`kullanici_id`),
  KEY `idx_kullanici` (`kullanici_id`),
  CONSTRAINT `ozgecmis_ayarlari_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ozgecmisler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) DEFAULT NULL,
  `ozgecmis` text DEFAULT NULL,
  `egitim` text DEFAULT NULL,
  `deneyim` text DEFAULT NULL,
  `beceriler` text DEFAULT NULL,
  `diller` text DEFAULT NULL,
  `sertifikalar` text DEFAULT NULL,
  `referanslar` text DEFAULT NULL,
  `dosya_url` varchar(255) DEFAULT NULL,
  `guncelleme_tarihi` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `kullanici_id` (`kullanici_id`),
  CONSTRAINT `ozgecmisler_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parttimeilanlar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ilan_id` int(11) DEFAULT NULL,
  `haftalik_saat` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ilan_id` (`ilan_id`),
  CONSTRAINT `parttimeilanlar_ibfk_1` FOREIGN KEY (`ilan_id`) REFERENCES `ilanlar` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projeler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) NOT NULL,
  `proje_adi` varchar(255) NOT NULL,
  `aciklama` text DEFAULT NULL,
  `baslangic_tarihi` date NOT NULL,
  `bitis_tarihi` date DEFAULT NULL,
  `devam_ediyor` tinyint(1) DEFAULT 0,
  `rol` varchar(100) DEFAULT NULL,
  `teknolojiler` text DEFAULT NULL,
  `proje_url` varchar(255) DEFAULT NULL,
  `github_url` varchar(255) DEFAULT NULL,
  `sira` int(11) DEFAULT 0,
  `olusturulma_tarihi` datetime DEFAULT current_timestamp(),
  `guncelleme_tarihi` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_kullanici` (`kullanici_id`),
  KEY `idx_sira` (`sira`),
  CONSTRAINT `projeler_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `referanslar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) NOT NULL,
  `isim` varchar(255) NOT NULL,
  `pozisyon` varchar(255) DEFAULT NULL,
  `sirket` varchar(255) DEFAULT NULL,
  `telefon` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `iliskilendirme` varchar(255) DEFAULT NULL,
  `olusturulma_tarihi` datetime DEFAULT current_timestamp(),
  `guncelleme_tarihi` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_kullanici` (`kullanici_id`),
  CONSTRAINT `referanslar_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sehirler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isim` varchar(255) NOT NULL,
  `bolge` varchar(50) DEFAULT 'Diğer',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_sehir_isim` (`isim`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sektorler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isim` varchar(100) NOT NULL,
  `aciklama` text DEFAULT NULL,
  `olusturulma_tarihi` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `isim` (`isim`),
  UNIQUE KEY `unique_sektor_isim` (`isim`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sertifikalar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) NOT NULL,
  `sertifika_adi` varchar(255) NOT NULL,
  `kurum` varchar(255) NOT NULL,
  `tarih` date NOT NULL,
  `gecerlilik_tarihi` date DEFAULT NULL,
  `sertifika_no` varchar(100) DEFAULT NULL,
  `aciklama` text DEFAULT NULL,
  `dosya_url` varchar(255) DEFAULT NULL,
  `olusturulma_tarihi` datetime DEFAULT current_timestamp(),
  `guncelleme_tarihi` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_kullanici` (`kullanici_id`),
  CONSTRAINT `sertifikalar_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `verification_codes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `code` varchar(6) NOT NULL,
  `user_data` text DEFAULT NULL,
  `type` enum('email_verification','password_reset') DEFAULT 'email_verification',
  `expires_at` datetime NOT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`),
  KEY `idx_code` (`code`),
  KEY `idx_expires` (`expires_at`),
  KEY `idx_type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


-- =====================================================
-- Super Admin Account
-- =====================================================
-- Email: ayhamoy2@gmail.com
-- Password: ABCabc123321#
-- =====================================================

INSERT INTO kullanicilar (isim, soyisim, email, sifre, rol, email_verified, is_super_admin, aktif, admin_approved, rol_confirmed)
VALUES ('Super', 'Admin', 'ayhamoy2@gmail.com', '$2y$10$YourHashedPasswordWillBeSetBySetupScript', 'admin', 1, 1, 1, 1, 1);
