-- Aktif Sohbetler Tablosu Oluşturma
-- Kullanıcıların hangi sohbetleri açık tuttuğunu takip eder

CREATE TABLE IF NOT EXISTS `aktif_sohbetler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kullanici_id` int(11) NOT NULL,
  `diger_kullanici_id` int(11) NOT NULL,
  `son_aktivite` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_kullanici_sohbet` (`kullanici_id`, `diger_kullanici_id`),
  KEY `idx_kullanici` (`kullanici_id`),
  KEY `idx_diger_kullanici` (`diger_kullanici_id`),
  KEY `idx_son_aktivite` (`son_aktivite`),
  CONSTRAINT `fk_aktif_sohbet_kullanici` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_aktif_sohbet_diger` FOREIGN KEY (`diger_kullanici_id`) REFERENCES `kullanicilar` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Eski kayıtları temizle (30 saniyeden eski)
DELETE FROM aktif_sohbetler WHERE TIMESTAMPDIFF(SECOND, son_aktivite, NOW()) > 30;

