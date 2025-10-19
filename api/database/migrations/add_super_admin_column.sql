-- =====================================================
-- Super Admin Sütunu Ekle
-- Silinemeyen ana admin için
-- =====================================================

ALTER TABLE kullanicilar 
ADD COLUMN IF NOT EXISTS is_super_admin BOOLEAN DEFAULT FALSE AFTER email_verified;

-- Super Admin kullanıcısını ekle veya güncelle
INSERT INTO kullanicilar (
    isim, 
    soyisim, 
    email, 
    sifre, 
    rol, 
    email_verified, 
    is_super_admin
) VALUES (
    'Super',
    'Admin',
    'ayhamoy2@gmail.com',
    '$2y$10$YourHashedPasswordHere',
    'admin',
    TRUE,
    TRUE
) ON DUPLICATE KEY UPDATE 
    rol = 'admin',
    is_super_admin = TRUE,
    email_verified = TRUE;
