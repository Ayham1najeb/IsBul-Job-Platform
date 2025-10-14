# 📧 Email Verification & Password Reset Setup Guide

## 🚀 خطوات التثبيت

### 1️⃣ تثبيت PHPMailer

افتح Terminal في مجلد `api`:

```bash
cd c:\xampp\htdocs\IsBul\api
composer require phpmailer/phpmailer
```

إذا لم يكن Composer مثبتاً:
- قم بتحميله من: https://getcomposer.org/download/
- أو استخدم XAMPP Control Panel → Shell

---

### 2️⃣ إنشاء جدول verification_codes

افتح phpMyAdmin: http://localhost/phpmyadmin

اختر قاعدة البيانات `isbul_db` وقم بتشغيل:

```sql
-- إنشاء جدول رموز التحقق
CREATE TABLE IF NOT EXISTS verification_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    code VARCHAR(6) NOT NULL,
    expires_at DATETIME NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_code (code),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- إضافة عمود email_verified
ALTER TABLE kullanicilar 
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE AFTER email;
```

---

### 3️⃣ التحقق من الإعدادات

#### ✅ تأكد من:

1. **PHPMailer مثبت:**
```bash
cd api
composer show phpmailer/phpmailer
```

2. **الجداول موجودة:**
```sql
SHOW TABLES LIKE 'verification_codes';
DESCRIBE kullanicilar;
```

3. **الملفات موجودة:**
- ✅ `api/utils/EmailService.php`
- ✅ `api/auth/verify-email.php`
- ✅ `api/auth/resend-code.php`
- ✅ `client/src/pages/VerifyEmail.jsx`

---

## 🎯 كيف يعمل النظام؟

### **1. التسجيل:**
```
المستخدم → Register → إنشاء حساب → إرسال رمز 6 أرقام → VerifyEmail
```

### **2. التحقق:**
```
إدخال الرمز → verify-email.php → تفعيل الحساب → Login
```

### **3. إعادة الإرسال:**
```
"Yeniden Gönder" → resend-code.php → رمز جديد → البريد
```

---

## 📧 معلومات البريد

- **المرسل:** ayhamoy2@gmail.com
- **الاسم:** IsBul Platform
- **SMTP:** smtp.gmail.com:587
- **App Password:** empz jcwh nqjj imxw

---

## 🧪 اختبار النظام

### **1. سجل حساب جديد:**
```
http://localhost:5173/register
```

### **2. تحقق من البريد:**
- افتح: ayhamoy2@gmail.com
- ابحث عن رسالة "IsBul - E-posta Doğrulama Kodu"
- انسخ الرمز (6 أرقام)

### **3. أدخل الرمز:**
```
http://localhost:5173/verify-email
```

### **4. تسجيل الدخول:**
```
http://localhost:5173/login
```

---

## 🔧 استكشاف الأخطاء

### ❌ **خطأ: "Undefined type PHPMailer"**
**الحل:**
```bash
cd api
composer install
```

### ❌ **خطأ: "Table 'verification_codes' doesn't exist"**
**الحل:** قم بتشغيل SQL من الخطوة 2

### ❌ **خطأ: "SMTP connect() failed"**
**الحل:** 
1. تأكد من App Password صحيح
2. تأكد من الاتصال بالإنترنت
3. تحقق من إعدادات Firewall

### ❌ **البريد لا يصل:**
**الحل:**
1. تحقق من Spam folder
2. تحقق من App Password
3. راجع `php_error.log` في XAMPP

---

## 📝 ملاحظات مهمة

1. ⏰ **الرمز صالح لـ 15 دقيقة فقط**
2. 🔒 **لا تشارك App Password مع أحد**
3. 📧 **تحقق من Spam folder دائماً**
4. 🔄 **يمكن إعادة إرسال الرمز بدون حد**

---

---

## 🔐 نظام استعادة كلمة المرور

### **كيف يعمل؟**

#### **1. نسيت كلمة المرور:**
```
المستخدم → Forgot Password → إدخال البريد → إرسال رمز
```

#### **2. إعادة التعيين:**
```
إدخال الرمز + كلمة مرور جديدة → Reset Password → Login
```

### **الملفات:**
- ✅ `api/auth/forgot-password.php` - إرسال رمز
- ✅ `api/auth/reset-password.php` - تغيير كلمة المرور
- ✅ `client/src/pages/ForgotPassword.jsx` - صفحة طلب الرمز
- ✅ `client/src/pages/ResetPassword.jsx` - صفحة إدخال الرمز وكلمة المرور الجديدة

### **اختبار النظام:**

1. اذهب إلى: `http://localhost:5173/login`
2. اضغط "Şifremi unuttum?"
3. أدخل بريدك الإلكتروني
4. ✅ ستصلك رسالة مع رمز استعادة
5. أدخل الرمز وكلمة المرور الجديدة
6. ✅ سيتم تغيير كلمة المرور

---

## 🎉 انتهى!

الآن نظام التحقق من البريد الإلكتروني **واستعادة كلمة المرور** يعملان بشكل كامل! 🚀
