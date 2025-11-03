-- Mesajlar tablosuna ilan_id alanı ekle
ALTER TABLE `mesajlar` 
ADD COLUMN `ilan_id` int(11) DEFAULT NULL AFTER `alici_id`,
ADD KEY `ilan_id` (`ilan_id`),
ADD CONSTRAINT `mesajlar_ibfk_3` FOREIGN KEY (`ilan_id`) REFERENCES `ilanlar` (`id`) ON DELETE SET NULL;

