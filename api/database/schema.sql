-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: isbul
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

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

--
-- Table structure for table `acililanlar`
--

DROP TABLE IF EXISTS `acililanlar`;
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

--
-- Dumping data for table `acililanlar`
--

LOCK TABLES `acililanlar` WRITE;
/*!40000 ALTER TABLE `acililanlar` DISABLE KEYS */;
/*!40000 ALTER TABLE `acililanlar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `basvurular`
--

DROP TABLE IF EXISTS `basvurular`;
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

--
-- Dumping data for table `basvurular`
--

LOCK TABLES `basvurular` WRITE;
/*!40000 ALTER TABLE `basvurular` DISABLE KEYS */;
/*!40000 ALTER TABLE `basvurular` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `beceriler`
--

DROP TABLE IF EXISTS `beceriler`;
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

--
-- Dumping data for table `beceriler`
--

LOCK TABLES `beceriler` WRITE;
/*!40000 ALTER TABLE `beceriler` DISABLE KEYS */;
/*!40000 ALTER TABLE `beceriler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `degerlendirmeler`
--

DROP TABLE IF EXISTS `degerlendirmeler`;
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

--
-- Dumping data for table `degerlendirmeler`
--

LOCK TABLES `degerlendirmeler` WRITE;
/*!40000 ALTER TABLE `degerlendirmeler` DISABLE KEYS */;
/*!40000 ALTER TABLE `degerlendirmeler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diller`
--

DROP TABLE IF EXISTS `diller`;
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

--
-- Dumping data for table `diller`
--

LOCK TABLES `diller` WRITE;
/*!40000 ALTER TABLE `diller` DISABLE KEYS */;
/*!40000 ALTER TABLE `diller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `egitim_bilgileri`
--

DROP TABLE IF EXISTS `egitim_bilgileri`;
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

--
-- Dumping data for table `egitim_bilgileri`
--

LOCK TABLES `egitim_bilgileri` WRITE;
/*!40000 ALTER TABLE `egitim_bilgileri` DISABLE KEYS */;
/*!40000 ALTER TABLE `egitim_bilgileri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `firmalar`
--

DROP TABLE IF EXISTS `firmalar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `firmalar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `calisan_sayisi` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sehir_id` (`sehir_id`),
  KEY `ilce_id` (`ilce_id`),
  KEY `kategori_id` (`kategori_id`),
  CONSTRAINT `firmalar_ibfk_1` FOREIGN KEY (`sehir_id`) REFERENCES `sehirler` (`id`),
  CONSTRAINT `firmalar_ibfk_2` FOREIGN KEY (`ilce_id`) REFERENCES `ilceler` (`id`),
  CONSTRAINT `firmalar_ibfk_3` FOREIGN KEY (`kategori_id`) REFERENCES `kategoriler` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `firmalar`
--

LOCK TABLES `firmalar` WRITE;
/*!40000 ALTER TABLE `firmalar` DISABLE KEYS */;
/*!40000 ALTER TABLE `firmalar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `firmatakipcileri`
--

DROP TABLE IF EXISTS `firmatakipcileri`;
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

--
-- Dumping data for table `firmatakipcileri`
--

LOCK TABLES `firmatakipcileri` WRITE;
/*!40000 ALTER TABLE `firmatakipcileri` DISABLE KEYS */;
/*!40000 ALTER TABLE `firmatakipcileri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ilanlar`
--

DROP TABLE IF EXISTS `ilanlar`;
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
  `maas_aralik` varchar(100) DEFAULT NULL,
  `egitim_seviyesi` enum('lise','onlisans','lisans','yuksek_lisans','doktora') DEFAULT 'lisans',
  `calisma_sekli` varchar(50) DEFAULT NULL,
  `pozisyon_seviyesi` varchar(50) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ilanlar`
--

LOCK TABLES `ilanlar` WRITE;
/*!40000 ALTER TABLE `ilanlar` DISABLE KEYS */;
/*!40000 ALTER TABLE `ilanlar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ilceler`
--

DROP TABLE IF EXISTS `ilceler`;
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

--
-- Dumping data for table `ilceler`
--

LOCK TABLES `ilceler` WRITE;
/*!40000 ALTER TABLE `ilceler` DISABLE KEYS */;
/*!40000 ALTER TABLE `ilceler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `is_deneyimleri`
--

DROP TABLE IF EXISTS `is_deneyimleri`;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `is_deneyimleri`
--

LOCK TABLES `is_deneyimleri` WRITE;
/*!40000 ALTER TABLE `is_deneyimleri` DISABLE KEYS */;
/*!40000 ALTER TABLE `is_deneyimleri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `isalarmları`
--

DROP TABLE IF EXISTS `isalarmları`;
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

--
-- Dumping data for table `isalarmları`
--

LOCK TABLES `isalarmları` WRITE;
/*!40000 ALTER TABLE `isalarmları` DISABLE KEYS */;
/*!40000 ALTER TABLE `isalarmları` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategoriler`
--

DROP TABLE IF EXISTS `kategoriler`;
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

--
-- Dumping data for table `kategoriler`
--

LOCK TABLES `kategoriler` WRITE;
/*!40000 ALTER TABLE `kategoriler` DISABLE KEYS */;
INSERT INTO `kategoriler` VALUES (1,'Yazılım & Teknoloji','Yazılım geliştirme, IT ve teknoloji pozisyonları','📁'),(2,'Pazarlama & Satış','Pazarlama, satış ve müşteri ilişkileri','📁'),(3,'Tasarım & Kreatif','Grafik tasarım, UI/UX ve kreatif pozisyonlar','📁'),(4,'Finans & Muhasebe','Finans, muhasebe ve ekonomi','📁'),(5,'Mühendislik','Makine, elektrik, inşaat mühendisliği','📁'),(6,'Satış & İş Geliştirme','Satış temsilcisi ve iş geliştirme','📁'),(7,'Eğitim & Öğretim','Öğretmenlik ve eğitim danışmanlığı','📁'),(8,'İnsan Kaynakları','İK, işe alım ve personel yönetimi','📁'),(9,'Sağlık','Sağlık hizmetleri ve tıbbi pozisyonlar','📁'),(10,'Hukuk','Avukatlık ve hukuk danışmanlığı','📁'),(11,'Üretim & Lojistik','Üretim, lojistik ve tedarik zinciri','📁'),(12,'Müşteri Hizmetleri','Müşteri destek ve çağrı merkezi','📁'),(13,'Medya & İletişim','Gazetecilik, PR ve medya','📁'),(14,'Turizm & Otelcilik','Turizm, otel ve restoran yönetimi','📁'),(15,'Güvenlik','Güvenlik ve koruma hizmetleri','📁');
/*!40000 ALTER TABLE `kategoriler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kaydedilenilanlar`
--

DROP TABLE IF EXISTS `kaydedilenilanlar`;
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

--
-- Dumping data for table `kaydedilenilanlar`
--

LOCK TABLES `kaydedilenilanlar` WRITE;
/*!40000 ALTER TABLE `kaydedilenilanlar` DISABLE KEYS */;
/*!40000 ALTER TABLE `kaydedilenilanlar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kullanici_becerileri_detay`
--

DROP TABLE IF EXISTS `kullanici_becerileri_detay`;
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

--
-- Dumping data for table `kullanici_becerileri_detay`
--

LOCK TABLES `kullanici_becerileri_detay` WRITE;
/*!40000 ALTER TABLE `kullanici_becerileri_detay` DISABLE KEYS */;
/*!40000 ALTER TABLE `kullanici_becerileri_detay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kullanicibeceriler`
--

DROP TABLE IF EXISTS `kullanicibeceriler`;
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

--
-- Dumping data for table `kullanicibeceriler`
--

LOCK TABLES `kullanicibeceriler` WRITE;
/*!40000 ALTER TABLE `kullanicibeceriler` DISABLE KEYS */;
/*!40000 ALTER TABLE `kullanicibeceriler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kullanicilar`
--

DROP TABLE IF EXISTS `kullanicilar`;
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kullanicilar`
--

LOCK TABLES `kullanicilar` WRITE;
/*!40000 ALTER TABLE `kullanicilar` DISABLE KEYS */;
INSERT INTO `kullanicilar` VALUES (8,'ihsan','alapsi','lohalip916@fogdiver.com',1,0,'http://localhost/IsBul-Job-Platform/uploads/profiles/user_8_1760882565.jpg',NULL,NULL,'$2y$10$nC60piiLzdUWF1hzmfwPCOrhh9xbeSsbcuBfjMolqtNZ8r9dE0YeO','',NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-19 16:54:08','2025-10-19 18:29:32',1,'is_arayan',0,1),(9,'Super','Admin','ayhamoy2@gmail.com',1,1,'http://localhost/IsBul-Job-Platform/uploads/profiles/user_9_1760885917.jpg',NULL,NULL,'$2y$10$zyChpL0i43a5YR.cjoYboOV.zeB0qUjN.3nZLZCNu7hf/kiJPEDjq',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-19 17:42:37','2025-10-19 18:29:19',1,'admin',0,1);
/*!40000 ALTER TABLE `kullanicilar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesajlar`
--

DROP TABLE IF EXISTS `mesajlar`;
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

--
-- Dumping data for table `mesajlar`
--

LOCK TABLES `mesajlar` WRITE;
/*!40000 ALTER TABLE `mesajlar` DISABLE KEYS */;
/*!40000 ALTER TABLE `mesajlar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meslekler`
--

DROP TABLE IF EXISTS `meslekler`;
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

--
-- Dumping data for table `meslekler`
--

LOCK TABLES `meslekler` WRITE;
/*!40000 ALTER TABLE `meslekler` DISABLE KEYS */;
/*!40000 ALTER TABLE `meslekler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moderasyon_kayitlari`
--

DROP TABLE IF EXISTS `moderasyon_kayitlari`;
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

--
-- Dumping data for table `moderasyon_kayitlari`
--

LOCK TABLES `moderasyon_kayitlari` WRITE;
/*!40000 ALTER TABLE `moderasyon_kayitlari` DISABLE KEYS */;
/*!40000 ALTER TABLE `moderasyon_kayitlari` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mulakatlar`
--

DROP TABLE IF EXISTS `mulakatlar`;
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

--
-- Dumping data for table `mulakatlar`
--

LOCK TABLES `mulakatlar` WRITE;
/*!40000 ALTER TABLE `mulakatlar` DISABLE KEYS */;
/*!40000 ALTER TABLE `mulakatlar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ozgecmis_ayarlari`
--

DROP TABLE IF EXISTS `ozgecmis_ayarlari`;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ozgecmis_ayarlari`
--

LOCK TABLES `ozgecmis_ayarlari` WRITE;
/*!40000 ALTER TABLE `ozgecmis_ayarlari` DISABLE KEYS */;
/*!40000 ALTER TABLE `ozgecmis_ayarlari` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ozgecmisler`
--

DROP TABLE IF EXISTS `ozgecmisler`;
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

--
-- Dumping data for table `ozgecmisler`
--

LOCK TABLES `ozgecmisler` WRITE;
/*!40000 ALTER TABLE `ozgecmisler` DISABLE KEYS */;
/*!40000 ALTER TABLE `ozgecmisler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parttimeilanlar`
--

DROP TABLE IF EXISTS `parttimeilanlar`;
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

--
-- Dumping data for table `parttimeilanlar`
--

LOCK TABLES `parttimeilanlar` WRITE;
/*!40000 ALTER TABLE `parttimeilanlar` DISABLE KEYS */;
/*!40000 ALTER TABLE `parttimeilanlar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeler`
--

DROP TABLE IF EXISTS `projeler`;
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

--
-- Dumping data for table `projeler`
--

LOCK TABLES `projeler` WRITE;
/*!40000 ALTER TABLE `projeler` DISABLE KEYS */;
/*!40000 ALTER TABLE `projeler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `referanslar`
--

DROP TABLE IF EXISTS `referanslar`;
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

--
-- Dumping data for table `referanslar`
--

LOCK TABLES `referanslar` WRITE;
/*!40000 ALTER TABLE `referanslar` DISABLE KEYS */;
/*!40000 ALTER TABLE `referanslar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sehirler`
--

DROP TABLE IF EXISTS `sehirler`;
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

--
-- Dumping data for table `sehirler`
--

LOCK TABLES `sehirler` WRITE;
/*!40000 ALTER TABLE `sehirler` DISABLE KEYS */;
INSERT INTO `sehirler` VALUES (1,'İstanbul','Diğer'),(2,'Ankara','Diğer'),(3,'İzmir','Diğer'),(4,'Bursa','Diğer'),(5,'Antalya','Diğer'),(6,'Adana','Diğer'),(7,'Konya','Diğer'),(8,'Gaziantep','Diğer'),(9,'Şanlıurfa','Diğer'),(10,'Kocaeli','Diğer'),(11,'Mersin','Diğer'),(12,'Diyarbakır','Diğer'),(13,'Hatay','Diğer'),(14,'Manisa','Diğer'),(15,'Kayseri','Diğer'),(16,'Samsun','Diğer'),(17,'Balıkesir','Diğer'),(18,'Kahramanmaraş','Diğer'),(19,'Van','Diğer'),(20,'Aydın','Diğer'),(21,'Denizli','Diğer'),(22,'Sakarya','Diğer'),(23,'Tekirdağ','Diğer'),(24,'Muğla','Diğer'),(25,'Eskişehir','Diğer'),(26,'Mardin','Diğer'),(27,'Malatya','Diğer'),(28,'Erzurum','Diğer'),(29,'Trabzon','Diğer'),(30,'Elazığ','Diğer');
/*!40000 ALTER TABLE `sehirler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sektorler`
--

DROP TABLE IF EXISTS `sektorler`;
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

--
-- Dumping data for table `sektorler`
--

LOCK TABLES `sektorler` WRITE;
/*!40000 ALTER TABLE `sektorler` DISABLE KEYS */;
INSERT INTO `sektorler` VALUES (1,'Bilgi Teknolojileri','Yazılım, donanım ve IT hizmetleri','2025-10-02 21:45:57'),(2,'Finans','Bankacılık, sigorta ve finans hizmetleri','2025-10-02 21:45:57'),(3,'Sağlık','Hastane, klinik ve sağlık kuruluşları','2025-10-02 21:45:57'),(4,'Eğitim','Okul, üniversite ve eğitim kurumları','2025-10-02 21:45:57'),(5,'Perakende','Mağaza ve perakende satış','2025-10-02 21:45:57'),(6,'Üretim','İmalat ve üretim tesisleri','2025-10-02 21:45:57'),(7,'İnşaat','İnşaat ve gayrimenkul','2025-10-02 21:45:57'),(8,'Turizm','Otel, restoran ve turizm','2025-10-02 21:45:57'),(9,'Lojistik','Taşımacılık ve lojistik','2025-10-02 21:45:57'),(10,'Enerji','Enerji ve doğal kaynaklar','2025-10-02 21:45:57'),(11,'Telekomünikasyon','İletişim ve telekomünikasyon','2025-10-02 21:45:57'),(12,'Medya','Gazete, TV ve dijital medya','2025-10-02 21:45:57'),(13,'Otomotiv','Otomotiv ve yan sanayi','2025-10-02 21:45:57'),(14,'Gıda','Gıda üretim ve dağıtım','2025-10-02 21:45:57'),(15,'Tekstil','Tekstil ve hazır giyim','2025-10-02 21:45:57');
/*!40000 ALTER TABLE `sektorler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sertifikalar`
--

DROP TABLE IF EXISTS `sertifikalar`;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sertifikalar`
--

LOCK TABLES `sertifikalar` WRITE;
/*!40000 ALTER TABLE `sertifikalar` DISABLE KEYS */;
/*!40000 ALTER TABLE `sertifikalar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification_codes`
--

DROP TABLE IF EXISTS `verification_codes`;
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_codes`
--

LOCK TABLES `verification_codes` WRITE;
/*!40000 ALTER TABLE `verification_codes` DISABLE KEYS */;
INSERT INTO `verification_codes` VALUES (1,'ihsanalapsi@gmail.com','655744',NULL,'email_verification','2025-10-14 20:33:01',0,'2025-10-14 11:18:01'),(5,'bayburt23fabio@gmail.com','148133',NULL,'email_verification','2025-10-14 20:40:11',1,'2025-10-14 11:25:11'),(6,'badarit468@fanlvr.com','732262','{\"isim\":\"safsa\",\"soyisim\":\"safsfa\",\"email\":\"badarit468@fanlvr.com\",\"sifre\":\"$2y$10$iMM2isrn7uVAM9P1LY.rk.lhOC7.2lKFCN81zZQ5CZgb88GF0WiWK\",\"telefon\":\"\",\"rol\":\"is_arayan\"}','email_verification','2025-10-14 22:07:15',1,'2025-10-14 12:52:16'),(10,'test@example.com','490505','{\"isim\":\"Test\",\"soyisim\":\"User\",\"email\":\"test@example.com\",\"sifre\":\"$2y$10$LuFjtVIopG50xkfgix9qD.yDRP4y00go6hwEZ45A1hMxQStP1Ta.6\",\"telefon\":\"1234567890\",\"rol\":\"is_arayan\"}','email_verification','2025-10-19 16:06:05',0,'2025-10-19 16:51:06'),(11,'newtest@example.com','307920','{\"isim\":\"Test\",\"soyisim\":\"User\",\"email\":\"newtest@example.com\",\"sifre\":\"$2y$10$QmxhzTqRmwxG7j4XWffEt.Id3eJbZ5\\/mSQXvPo7QdxikTNIuwp\\/Hq\",\"telefon\":\"1234567890\",\"rol\":\"is_arayan\"}','email_verification','2025-10-19 17:07:47',0,'2025-10-19 16:52:47'),(12,'lohalip916@fogdiver.com','682059','{\"isim\":\"ihsan\",\"soyisim\":\"alapsi\",\"email\":\"lohalip916@fogdiver.com\",\"sifre\":\"$2y$10$nC60piiLzdUWF1hzmfwPCOrhh9xbeSsbcuBfjMolqtNZ8r9dE0YeO\",\"telefon\":\"\",\"rol\":\"is_arayan\"}','email_verification','2025-10-19 17:08:47',1,'2025-10-19 16:53:47');
/*!40000 ALTER TABLE `verification_codes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-19 18:39:26
