-- =====================================================
-- Script لتنظيف قاعدة البيانات وإعادة تعيين IDs
-- يحذف جميع البيانات ويبقي فقط Super Admin
-- =====================================================

-- تعطيل فحص المفاتيح الأجنبية مؤقتاً
SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================
-- 1. حذف البيانات المرتبطة بالمستخدمين
-- =====================================================

-- حذف الطلبات
TRUNCATE TABLE basvurular;

-- حذف الإعلانات
TRUNCATE TABLE ilanlar;

-- حذف الشركات
TRUNCATE TABLE firmalar;

-- حذف السيرة الذاتية
TRUNCATE TABLE is_deneyimleri;
TRUNCATE TABLE egitim_bilgileri;
TRUNCATE TABLE kullanici_becerileri_detay;
TRUNCATE TABLE diller;
TRUNCATE TABLE sertifikalar;

-- حذف الرسائل
TRUNCATE TABLE mesajlar;

-- حذف الإعلانات المحفوظة
TRUNCATE TABLE kaydedilenilanlar;

-- =====================================================
-- 2. حذف جميع المستخدمين ماعدا Super Admin
-- =====================================================

-- حذف جميع المستخدمين ماعدا Super Admin (ID = 1)
DELETE FROM kullanicilar WHERE id != 1;

-- =====================================================
-- 3. إعادة تعيين AUTO_INCREMENT
-- =====================================================

-- إعادة تعيين IDs للجداول
ALTER TABLE kullanicilar AUTO_INCREMENT = 2;
ALTER TABLE firmalar AUTO_INCREMENT = 1;
ALTER TABLE ilanlar AUTO_INCREMENT = 1;
ALTER TABLE basvurular AUTO_INCREMENT = 1;
ALTER TABLE is_deneyimleri AUTO_INCREMENT = 1;
ALTER TABLE egitim_bilgileri AUTO_INCREMENT = 1;
ALTER TABLE kullanici_becerileri_detay AUTO_INCREMENT = 1;
ALTER TABLE diller AUTO_INCREMENT = 1;
ALTER TABLE sertifikalar AUTO_INCREMENT = 1;
ALTER TABLE mesajlar AUTO_INCREMENT = 1;
ALTER TABLE kaydedilenilanlar AUTO_INCREMENT = 1;

-- =====================================================
-- 4. تحديث معلومات Super Admin
-- =====================================================

-- تحديث معلومات Super Admin الموجود
-- Email: ayhamoy2@gmail.com
-- Password: ABCabc123321# (يجب تغييرها من لوحة التحكم)
UPDATE kullanicilar 
SET email = 'ayhamoy2@gmail.com',
    isim = 'Super',
    soyisim = 'Admin',
    rol = 'admin',
    aktif = 1,
    email_verified = 1,
    is_super_admin = 1,
    admin_approved = 1,
    rol_confirmed = 1
WHERE id = 1;

-- ملاحظة: يجب تغيير كلمة المرور من لوحة التحكم بعد تسجيل الدخول
-- أو استخدام صفحة تغيير كلمة المرور

-- =====================================================
-- 5. حذف ملفات الصور المرفوعة (يدوياً)
-- =====================================================

-- ملاحظة: يجب حذف الملفات من المجلدات يدوياً:
-- - uploads/profiles/
-- - uploads/companies/
-- - uploads/certificates/

-- =====================================================
-- 6. إعادة تفعيل فحص المفاتيح الأجنبية
-- =====================================================

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- تم الانتهاء!
-- =====================================================

SELECT 'تم تنظيف قاعدة البيانات بنجاح!' as message;
SELECT 'Super Admin Email: ayhamoy2@gmail.com' as admin_email;
SELECT 'Super Admin Password: ABCabc123321#' as admin_password;
