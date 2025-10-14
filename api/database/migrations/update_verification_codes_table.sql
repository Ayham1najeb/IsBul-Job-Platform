-- =====================================================
-- تحديث جدول verification_codes لحفظ بيانات المستخدم مؤقتاً
-- =====================================================

ALTER TABLE verification_codes 
ADD COLUMN IF NOT EXISTS user_data TEXT NULL AFTER code,
ADD COLUMN IF NOT EXISTS type ENUM('email_verification', 'password_reset') DEFAULT 'email_verification' AFTER user_data;

-- إضافة index للنوع
ALTER TABLE verification_codes 
ADD INDEX IF NOT EXISTS idx_type (type);
