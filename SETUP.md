# 🚀 İş Bul - Kurulum Rehberi

## 📋 Gereksinimler

- **XAMPP** (Apache + MySQL + PHP 8.2+)
- **Node.js** (v18+)
- **npm** veya **yarn**
- **Git**

---

## 🔧 Yeni Bir Makinede Kurulum

### 1️⃣ XAMPP Kurulumu

1. XAMPP'i indir ve kur: https://www.apachefriends.org/
2. XAMPP Control Panel'i aç
3. **Apache** ve **MySQL**'i başlat

### 2️⃣ Projeyi Klonla

```bash
cd C:\xampp\htdocs
git clone <repository-url> IsBul
cd IsBul
```

### 3️⃣ Veritabanını Oluştur

1. Tarayıcıda aç: `http://localhost/phpmyadmin`
2. Yeni veritabanı oluştur: `isbul`
3. SQL dosyalarını içe aktar:
   - `api/database/schema/` klasöründeki tüm SQL dosyaları
   - `api/database/migrations/` klasöründeki migration dosyaları
   - `api/database/seeds/` klasöründeki seed dosyaları

**Veya komut satırından:**

```bash
# Database oluştur
C:\xampp\mysql\bin\mysql.exe -u root -e "CREATE DATABASE IF NOT EXISTS isbul CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Tabloları oluştur
C:\xampp\mysql\bin\mysql.exe -u root isbul < api/database/schema/kullanicilar.sql
C:\xampp\mysql\bin\mysql.exe -u root isbul < api/database/schema/ilanlar.sql
# ... diğer schema dosyaları

# Migrations
C:\xampp\mysql\bin\mysql.exe -u root isbul < api/database/migrations/add_missing_columns.sql
C:\xampp\mysql\bin\mysql.exe -u root isbul < api/database/migrations/add_profil_foto_column.sql

# Seeds (örnek veriler)
C:\xampp\mysql\bin\mysql.exe -u root isbul < api/database/seeds/categories_and_filters.sql
```

### 4️⃣ Backend Yapılandırması

**Database bağlantısını kontrol et:**

Dosya: `api/config/database.php`

```php
private $host = "localhost";
private $db_name = "isbul";
private $username = "root";
private $password = "";  // XAMPP varsayılan şifre boş
```

**Test et:**

```bash
curl http://localhost/IsBul/api/stats/dashboard.php
```

Başarılı ise JSON yanıt göreceksin.

### 5️⃣ Frontend Kurulumu

```bash
cd client

# Bağımlılıkları yükle
npm install

# .env dosyası oluştur (opsiyonel)
copy .env.example .env

# Development server'ı başlat
npm run dev
```

**Tarayıcıda aç:** `http://localhost:5173`

---

## ⚙️ Önemli Ayarlar

### API URL

Frontend API URL'i şu dosyada tanımlı:

**Dosya:** `client/src/config/api.js`

```javascript
export const API_BASE_URL = 'http://localhost/IsBul/api';
```

### CORS Ayarları

CORS headers şurada tanımlı:

**Dosya:** `api/config/cors_headers.php`

Tüm PHP endpoint'leri bu dosyayı include eder.

---

## 🐛 Sorun Giderme

### ❌ "Network Error" Hatası

**Sebep:** API URL yanlış veya Apache çalışmıyor

**Çözüm:**
1. XAMPP'te Apache'nin çalıştığından emin ol
2. `http://localhost/IsBul/api/stats/dashboard.php` adresini tarayıcıda aç
3. JSON yanıt geliyorsa backend çalışıyor
4. `client/src/config/api.js` dosyasındaki URL'i kontrol et

### ❌ CORS Hatası

**Sebep:** CORS headers eksik

**Çözüm:**
1. Apache'yi yeniden başlat
2. PHP dosyalarının başında `require_once '../config/cors_headers.php';` olduğundan emin ol

### ❌ Database Bağlantı Hatası

**Sebep:** MySQL çalışmıyor veya database yok

**Çözüm:**
1. XAMPP'te MySQL'in çalıştığından emin ol
2. phpMyAdmin'de `isbul` database'inin var olduğunu kontrol et
3. `api/config/database.php` dosyasındaki bilgileri kontrol et

### ❌ "Profil Fotoğrafı Yüklenemedi"

**Sebep:** `profil_foto` sütunu eksik

**Çözüm:**
```bash
C:\xampp\mysql\bin\mysql.exe -u root isbul < api/database/migrations/add_profil_foto_column.sql
```

---

## 📁 Klasör Yapısı

```
IsBul/
├── api/                    # Backend (PHP)
│   ├── auth/              # Kimlik doğrulama endpoints
│   ├── config/            # Yapılandırma dosyaları
│   ├── database/          # Database schema, migrations, seeds
│   ├── models/            # Veri modelleri
│   ├── middleware/        # Auth middleware
│   └── ...
├── client/                # Frontend (React)
│   ├── src/
│   │   ├── components/   # React bileşenleri
│   │   ├── pages/        # Sayfa bileşenleri
│   │   ├── services/     # API servisleri
│   │   ├── config/       # Yapılandırma
│   │   └── ...
│   └── package.json
├── uploads/               # Kullanıcı yüklemeleri (Git'te yok)
│   └── profiles/         # Profil fotoğrafları
└── README.md
```

---

## 🎯 Varsayılan Kullanıcılar

Eğer seed dosyalarını yüklediysen, şu kullanıcılarla giriş yapabilirsin:

| Email | Şifre | Rol |
|-------|-------|-----|
| admin@isbul.com | admin123 | admin |
| firma@test.com | firma123 | firma |
| user@test.com | user123 | is_arayan |

---

## 📝 Notlar

1. **Development:** `npm run dev` komutu frontend'i başlatır
2. **Build:** `npm run build` komutu production build oluşturur
3. **Apache:** Port 80 boş olmalı
4. **MySQL:** Port 3306 boş olmalı
5. **Uploads:** `uploads/` klasörü otomatik oluşturulur

---

## 🆘 Yardım

Sorun yaşıyorsan:

1. XAMPP error log'larını kontrol et: `C:\xampp\apache\logs\error.log`
2. Browser console'u kontrol et (F12)
3. Network tab'ı kontrol et (API istekleri)

---

**Başarılar! 🚀**
