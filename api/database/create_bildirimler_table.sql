-- Bildirimler Tablosu Oluşturma
-- İş başvuruları ve mesajlaşma için bildirimler

CREATE TABLE IF NOT EXISTS `bildirimler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) NOT NULL,
  `tip` varchar(50) NOT NULL COMMENT 'application_created, application_accepted, message_sent',
  `baslik` varchar(255) NOT NULL,
  `mesaj` text NOT NULL,
  `ilan_id` int(11) DEFAULT NULL,
  `basvuru_id` int(11) DEFAULT NULL,
  `mesaj_id` int(11) DEFAULT NULL,
  `okundu` tinyint(1) DEFAULT 0,
  `olusturulma_tarihi` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_kullanici` (`kullanici_id`),
  KEY `idx_tip` (`tip`),
  KEY `idx_okundu` (`okundu`),
  KEY `idx_ilan` (`ilan_id`),
  KEY `idx_basvuru` (`basvuru_id`),
  KEY `idx_mesaj` (`mesaj_id`),
  CONSTRAINT `fk_bildirim_kullanici` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_bildirim_ilan` FOREIGN KEY (`ilan_id`) REFERENCES `ilanlar` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_bildirim_basvuru` FOREIGN KEY (`basvuru_id`) REFERENCES `basvurular` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_bildirim_mesaj` FOREIGN KEY (`mesaj_id`) REFERENCES `mesajlar` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

