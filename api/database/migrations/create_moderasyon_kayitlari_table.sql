-- =====================================================
-- Moderasyon Kayıtları Tablosu
-- Admin işlemlerini kaydetmek için
-- =====================================================

CREATE TABLE IF NOT EXISTS moderasyon_kayitlari (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ilan_id INT NULL,
    admin_id INT NOT NULL,
    islem ENUM('approve', 'reject') NOT NULL,
    sebep TEXT NULL,
    olusturulma_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ilan (ilan_id),
    INDEX idx_admin (admin_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
