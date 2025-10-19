# تنظيف قاعدة البيانات للنشر على GitHub

## 📋 الخطوات

### 1. تنظيف قاعدة البيانات

قم بتشغيل SQL script لحذف جميع البيانات وإبقاء Super Admin فقط:

```bash
mysql -u root isbul < database/reset_database.sql
```

أو من phpMyAdmin:
1. افتح phpMyAdmin
2. اختر قاعدة البيانات `isbul`
3. اذهب إلى تبويب SQL
4. انسخ محتوى ملف `reset_database.sql` والصقه
5. اضغط "Go"

### 2. حذف الملفات المرفوعة

#### على Linux/Mac:
```bash
chmod +x database/clean_uploads.sh
./database/clean_uploads.sh
```

#### على Windows:
احذف يدوياً جميع الملفات من:
- `uploads/profiles/`
- `uploads/companies/`
- `uploads/certificates/`

**ملاحظة:** احتفظ بالمجلدات نفسها، فقط احذف الملفات بداخلها.

### 3. معلومات Super Admin

بعد التنظيف، ستكون معلومات الدخول:

- **Email:** ayhamoy2@gmail.com
- **Password:** ABCabc123321#
- **Role:** admin

## ⚠️ تحذير

هذا الـ script سيحذف:
- ✅ جميع المستخدمين (ماعدا Super Admin)
- ✅ جميع الشركات
- ✅ جميع الإعلانات
- ✅ جميع الطلبات
- ✅ جميع السير الذاتية
- ✅ جميع الرسائل
- ✅ جميع الإعلانات المحفوظة

**لا يمكن التراجع عن هذه العملية!**

## 📦 قبل النشر على GitHub

1. ✅ نفذ `reset_database.sql`
2. ✅ نفذ `clean_uploads.sh` أو احذف الملفات يدوياً
3. ✅ تأكد من وجود `.gitignore` يتجاهل:
   - `uploads/profiles/*`
   - `uploads/companies/*`
   - `uploads/certificates/*`
   - `.env` files
4. ✅ تأكد من عدم وجود معلومات حساسة في الكود

## 🔄 استعادة البيانات

إذا كنت تريد استعادة البيانات لاحقاً، قم بعمل backup قبل التنظيف:

```bash
mysqldump -u root isbul > backup_before_clean.sql
```
