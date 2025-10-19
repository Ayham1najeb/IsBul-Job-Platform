# 🚀 İş Bul Platform - Kurulum Rehberi

## 📋 Gereksinimler

- **XAMPP** (Apache + MySQL + PHP 8.2+)
- **Node.js** (v18+)
- **npm** veya **yarn**
- **Git**

---

## 🚀 Hızlı Kurulum (Otomatik)

### ⚡ Tek Tıkla Kurulum

**Windows için:**
```bash
# Projeyi klonla
git clone <repository-url>
cd IsBul-Job-Platform

# Kurulum scriptini çalıştır
INSTALL.bat
```

**macOS / Linux için:**
```bash
# Projeyi klonla
git clone <repository-url>
cd IsBul-Job-Platform

# Kurulum scriptini çalıştır
./INSTALL.sh
```

**Script otomatik olarak:**
- ✅ XAMPP'i kontrol eder ve başlatır
- ✅ Veritabanını oluşturur ve şemayı içe aktarır
- ✅ Frontend bağımlılıklarını yükler
- ✅ Development server'ı başlatır
- ✅ Tarayıcıyı otomatik açar

---

## 🔧 Manuel Kurulum

### 1️⃣ XAMPP Kurulumu

1. XAMPP'i indir ve kur: https://www.apachefriends.org/
2. XAMPP Control Panel'i aç
3. **Apache** ve **MySQL**'i başlat

### 2️⃣ Projeyi Klonla

```bash
cd /Applications/XAMPP/xamppfiles/htdocs  # macOS
# veya
cd C:\xampp\htdocs  # Windows

git clone <repository-url> IsBul-Job-Platform
cd IsBul-Job-Platform
```

### 3️⃣ Veritabanını Oluştur

**ÖNEMLİ:** Veritabanı şeması **tüm tabloları, kullanıcıları ve verileri** içerir.

```bash
# macOS
/Applications/XAMPP/xamppfiles/bin/mysql -u root -e "CREATE DATABASE IF NOT EXISTS isbul CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
/Applications/XAMPP/xamppfiles/bin/mysql -u root isbul < api/database/schema.sql

# Windows
C:\xampp\mysql\bin\mysql.exe -u root -e "CREATE DATABASE IF NOT EXISTS isbul CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
C:\xampp\mysql\bin\mysql.exe -u root isbul < api/database/schema.sql
```

Bu komut şunları içe aktarır:
- ✅ Tüm tablo yapıları (30+ tablo)
- ✅ Varsayılan Super Admin hesabı
- ✅ Kategoriler, şehirler, ilçeler
- ✅ Mevcut tüm kullanıcılar ve veriler

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
curl http://localhost/IsBul-Job-Platform/api/stats/dashboard.php
```

### 5️⃣ Frontend Kurulumu

```bash
cd client

# Bağımlılıkları yükle
npm install

# .env dosyası oluştur
echo "VITE_API_URL=http://localhost/IsBul-Job-Platform/api" > .env

# Development server'ı başlat
npm run dev
```

**Tarayıcıda aç:** `http://localhost:5173`

---

## 👥 Varsayılan Kullanıcılar

Veritabanı şeması aşağıdaki hesapları içerir:

### Super Admin
- **Email:** ayhamoy2@gmail.com
- **Şifre:** ABCabc123321#
- **Rol:** Admin (Super Admin)
- **Yetkiler:** Tüm sistem yönetimi

### Test Kullanıcısı (İş Arayan)
- **Email:** lohalip916@fogdiver.com
- **Rol:** İş Arayan

---

## 🎛️ Admin Paneli Kullanımı

### 1. Admin Girişi

1. `http://localhost:5173/login` adresine git
2. Super Admin bilgileriyle giriş yap
3. Otomatik olarak `/admin` sayfasına yönlendirileceksin

### 2. Admin Dashboard Özellikleri

#### 📊 Ana Dashboard (`/admin`)

**İstatistikler:**
- 👥 Toplam kullanıcı sayısı (Admin'ler hariç)
- 💼 Toplam iş ilanı sayısı
- 🏢 Toplam şirket sayısı
- 📈 Son 7 günün kullanıcı ve ilan grafikleri

**Grafikler:**
- Kullanıcı büyüme trendi
- İlan yayınlama trendi
- Rol dağılımı (pasta grafik)

#### 👥 Kullanıcı Yönetimi (`/admin/users`)

**Özellikler:**
- ✅ Tüm kullanıcıları görüntüleme (tablo formatında)
- 🔍 Kullanıcı arama (isim, e-posta, telefon)
- 🎯 Rol filtreleme (İş Arayan / Şirket / Admin)
- 📊 Sayfalama (20 kullanıcı/sayfa)

**İşlemler:**
- 🔄 **Rol Değiştirme:** Dropdown menüden rol seç
  - İş Arayan ↔ Şirket ↔ Admin
  - Onay penceresi gösterilir
  - Kullanıcı bir sonraki girişte bilgilendirilir
  
- ✉️ **E-posta Doğrulama:** Doğrulandı/Doğrulanmadı durumunu değiştir
  
- 🗑️ **Kullanıcı Silme:** Kullanıcıyı sistemden sil
  
- ➕ **Yeni Admin Ekleme:** 
  - "Admin Ekle" butonuna tıkla
  - E-posta adresi gir
  - Sistem otomatik olarak:
    - 6 haneli doğrulama kodu oluşturur
    - Geçici şifre oluşturur
    - E-posta gönderir
  - Yeni admin doğrulama sayfasına yönlendirilir

- ✅ **Admin Onaylama:**
  - Rol değişikliği ile Admin olan kullanıcılar için
  - "Admin Onayla" butonu görünür (sarı)
  - Onaylandıktan sonra giriş yapabilir

**Güvenlik Kuralları:**
- ❌ Admin kendi rolünü değiştiremez (Badge: "Siz")
- ❌ Super Admin'in rolü değiştirilemez (Badge: "Super Admin")
- ✅ Her rol değişikliğinde onay penceresi
- ✅ Admin'e dönüştürülen kullanıcılar Super Admin onayı bekler

#### 💼 İlan Yönetimi (`/admin/jobs`)

**Özellikler:**
- 📋 Tüm iş ilanlarını görüntüleme
- 🔍 İlan arama ve filtreleme
- 📊 İlan durumu (Aktif/Pasif/Beklemede)

**İşlemler:**
- ✅ İlanları onaylama
- ❌ İlanları reddetme
- 🗑️ İlan silme
- 👁️ İlan detaylarını görüntüleme

#### 🏢 Şirket Yönetimi (`/admin/companies`)

**Özellikler:**
- 🏢 Tüm şirketleri görüntüleme
- 📊 Şirket istatistikleri
- 🔍 Şirket arama

**İşlemler:**
- ✅ Şirket profillerini onaylama
- 📝 Şirket bilgilerini görüntüleme
- 🗑️ Şirket silme

#### 📈 İstatistikler (`/admin/statistics`)

**Detaylı Analizler:**
- 📊 Kullanıcı büyüme grafikleri
- 💼 İlan trendleri
- 🏢 Şirket analizleri
- 📅 Zaman bazlı istatistikler
- 🎯 Kategori dağılımları

---

## 🔐 Rol Sistemi ve Yetkiler

### İş Arayan (`is_arayan`)
**Yetkiler:**
- ✅ İş ilanlarını görüntüleme ve başvurma
- ✅ Özgeçmiş oluşturma ve düzenleme
- ✅ İlanları kaydetme (favoriler)
- ✅ Şirketlerle mesajlaşma
- ✅ Profil yönetimi

**Dashboard:** `/dashboard`

### Şirket (`firma`)
**Yetkiler:**
- ✅ İş ilanı yayınlama ve yönetme
- ✅ Başvuruları görüntüleme ve değerlendirme
- ✅ Şirket profili oluşturma ve düzenleme
- ✅ Adaylarla mesajlaşma
- ✅ İlan istatistikleri

**Dashboard:** `/company/dashboard`

### Admin (`admin`)
**Yetkiler:**
- ✅ Tüm kullanıcıları görüntüleme ve yönetme
- ✅ Kullanıcı rollerini değiştirme
- ✅ İlanları onaylama/reddetme
- ✅ Şirket hesaplarını yönetme
- ✅ Platform istatistiklerini görüntüleme
- ❌ Kendi rolünü değiştiremez

**Dashboard:** `/admin`

### Super Admin (`admin` + `is_super_admin = 1`)
**Tüm Admin Yetkileri +**
- ✅ Yeni admin ekleme
- ✅ Admin onaylama
- ✅ Diğer admin'lerin rollerini değiştirme
- ✅ Sistem ayarları
- ✅ Tüm kullanıcı işlemleri

**Dashboard:** `/admin`

---

## 🔄 Admin Ekleme Süreçleri

### Yöntem 1: E-posta Davet ile (Önerilen)

**Adımlar:**
1. `/admin/users` sayfasına git
2. "Admin Ekle" butonuna tıkla
3. Yeni admin'in e-posta adresini gir
4. Sistem otomatik olarak:
   - 6 haneli doğrulama kodu oluşturur
   - Geçici şifre oluşturur
   - E-posta gönderir (geliştirme modunda console'a yazdırılır)
5. Yeni admin:
   - E-postasını kontrol eder
   - Doğrulama kodunu girer
   - Hesabı otomatik oluşturulur
   - Admin paneline erişim sağlar

**Avantajlar:**
- ✅ Güvenli (e-posta doğrulamalı)
- ✅ Otomatik hesap oluşturma
- ✅ Hemen aktif

### Yöntem 2: Rol Değişikliği ile

**Adımlar:**
1. `/admin/users` sayfasında mevcut kullanıcıyı bul
2. Rol dropdown'ından "Admin" seç
3. Onay penceresinde onayla
4. Kullanıcının `admin_approved` durumu FALSE olur
5. Kullanıcı giriş yapmaya çalıştığında:
   - "Admin hesabınız henüz onaylanmadı" mesajı görür
   - Giriş yapamaz
6. Super Admin `/admin/users` sayfasında:
   - Kullanıcı için "Admin Onayla" butonu görünür (sarı)
   - Butona tıkla
7. Artık kullanıcı admin olarak giriş yapabilir
8. İlk girişte:
   - Rol değişikliği bildirimi görür
   - Yeni yetkilerini onaylar
   - Admin paneline yönlendirilir

**Avantajlar:**
- ✅ Mevcut kullanıcıları admin yapma
- ✅ İki aşamalı onay (güvenli)
- ✅ Kullanıcı bilgilendirme

---

## 🛠️ Veritabanı Şeması Güncelleme

Veritabanında değişiklik yaptıysan, yeni şemayı dışa aktar:

```bash
# macOS
/Applications/XAMPP/xamppfiles/bin/mysqldump -u root isbul > api/database/schema.sql

# Windows
C:\xampp\mysql\bin\mysqldump.exe -u root isbul > api/database/schema.sql
```

Bu komut:
- ✅ Tüm tabloları dışa aktarır
- ✅ Tüm verileri içerir
- ✅ Kullanıcıları ve ayarları korur
- ✅ Diğer geliştiriciler için hazır

---

## 🐛 Sorun Giderme

### ❌ "Network Error" Hatası

**Sebep:** API URL yanlış veya Apache çalışmıyor

**Çözüm:**
1. XAMPP'te Apache'nin çalıştığından emin ol
2. `http://localhost/IsBul-Job-Platform/api/stats/dashboard.php` adresini tarayıcıda aç
3. JSON yanıt geliyorsa backend çalışıyor
4. `client/src/config/api.js` dosyasındaki URL'i kontrol et

### ❌ CORS Hatası

**Sebep:** CORS headers eksik

**Çözüm:**
1. Apache'yi yeniden başlat
2. PHP dosyalarının başında `require_once '../config/cors_headers.php';` olduğundan emin ol
3. Browser cache'i temizle

### ❌ Database Bağlantı Hatası

**Sebep:** MySQL çalışmıyor veya database yok

**Çözüm:**
1. XAMPP'te MySQL'in çalıştığından emin ol
2. phpMyAdmin'de `isbul` database'inin var olduğunu kontrol et
3. `api/config/database.php` dosyasındaki bilgileri kontrol et

### ❌ Admin Paneline Erişim Sorunu

**Sebep:** Token geçersiz veya rol yetkisi yok

**Çözüm:**
1. Çıkış yapıp tekrar giriş yap
2. Browser cache'i ve localStorage'ı temizle
3. Veritabanında kullanıcının `rol = 'admin'` olduğunu kontrol et
4. Super Admin için `is_super_admin = 1` olduğunu kontrol et

### ❌ "Admin hesabınız henüz onaylanmadı" Hatası

**Sebep:** Rol değişikliği ile admin olan kullanıcı henüz onaylanmamış

**Çözüm:**
1. Super Admin olarak giriş yap
2. `/admin/users` sayfasına git
3. İlgili kullanıcı için "Admin Onayla" butonuna tıkla
4. Kullanıcı artık giriş yapabilir

### ❌ Şirketler veya İlanlar Görünmüyor

**Sebep:** Henüz şirket hesabı oluşturulmamış veya ilan yayınlanmamış

**Çözüm:**
1. Şirket hesabı oluştur (`/register` - Şirket Hesabı)
2. Şirket profilini tamamla
3. İlan yayınla
4. Admin panelinden onayla (gerekirse)

---

## 📁 Klasör Yapısı

```
IsBul-Job-Platform/
├── api/                          # Backend (PHP)
│   ├── auth/                    # Kimlik doğrulama endpoints
│   │   ├── login.php
│   │   ├── register.php
│   │   └── verify-email.php
│   ├── admin/                   # Admin endpoints
│   │   ├── users.php           # Kullanıcı yönetimi
│   │   ├── stats.php           # İstatistikler
│   │   ├── add-admin.php       # Admin ekleme
│   │   ├── approve-admin.php   # Admin onaylama
│   │   └── verify-admin.php    # Admin doğrulama
│   ├── jobs/                    # İş ilanları endpoints
│   ├── companies/               # Şirket endpoints
│   ├── config/                  # Yapılandırma
│   │   ├── database.php
│   │   └── cors_headers.php
│   ├── database/                # Veritabanı
│   │   └── schema.sql          # Tam veritabanı şeması
│   ├── models/                  # Veri modelleri
│   ├── middleware/              # Auth middleware
│   └── utils/                   # Yardımcı fonksiyonlar
│       ├── jwt.php
│       └── EmailService.php
├── client/                      # Frontend (React)
│   ├── src/
│   │   ├── components/         # React bileşenleri
│   │   ├── pages/              # Sayfa bileşenleri
│   │   │   ├── Admin/         # Admin sayfaları
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── UsersManagement.jsx
│   │   │   │   ├── JobsManagement.jsx
│   │   │   │   ├── CompaniesManagement.jsx
│   │   │   │   ├── Statistics.jsx
│   │   │   │   └── VerifyAdmin.jsx
│   │   │   ├── Jobs/
│   │   │   ├── Companies/
│   │   │   └── ...
│   │   ├── services/           # API servisleri
│   │   │   ├── adminService.js
│   │   │   ├── jobService.js
│   │   │   └── companyService.js
│   │   ├── store/              # Zustand state
│   │   │   └── authStore.js
│   │   ├── config/             # Yapılandırma
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json
├── uploads/                     # Kullanıcı yüklemeleri
│   └── profiles/               # Profil fotoğrafları
├── SETUP.md                    # Bu dosya
└── README.md                   # Proje açıklaması
```

---

## 🔒 Güvenlik Notları

### Üretim Ortamı İçin

1. **Database Şifresi:**
   ```php
   // api/config/database.php
   private $password = "güçlü_şifre_buraya";
   ```

2. **JWT Secret Key:**
   ```php
   // api/utils/jwt.php
   private static $secret_key = "değiştir_bunu_güçlü_bir_key_ile";
   ```

3. **CORS Ayarları:**
   ```php
   // api/config/cors_headers.php
   header("Access-Control-Allow-Origin: https://yourdomain.com");
   ```

4. **Varsayılan Admin Şifresi:**
   - İlk kurulumdan sonra Super Admin şifresini değiştir
   - Güçlü şifre kullan (en az 12 karakter, büyük/küçük harf, rakam, özel karakter)

5. **E-posta Ayarları:**
   ```php
   // api/utils/EmailService.php
   // SMTP ayarlarını gerçek değerlerle değiştir
   ```

---

## 📝 API Endpoints

### Auth
- `POST /api/auth/login.php` - Giriş
- `POST /api/auth/register.php` - Kayıt
- `POST /api/auth/verify-email.php` - E-posta doğrulama

### Admin
- `GET /api/admin/users.php` - Kullanıcı listesi
- `PUT /api/admin/users.php` - Kullanıcı güncelle
- `DELETE /api/admin/users.php` - Kullanıcı sil
- `POST /api/admin/add-admin.php` - Admin ekle
- `POST /api/admin/approve-admin.php` - Admin onayla
- `POST /api/admin/verify-admin.php` - Admin doğrula
- `GET /api/admin/stats.php` - İstatistikler

### Jobs
- `GET /api/jobs/` - İlan listesi
- `GET /api/jobs/detail.php` - İlan detayı
- `POST /api/jobs/create.php` - İlan oluştur
- `PUT /api/jobs/update.php` - İlan güncelle
- `DELETE /api/jobs/delete.php` - İlan sil

### Companies
- `GET /api/companies/` - Şirket listesi
- `GET /api/companies/detail.php` - Şirket detayı
- `PUT /api/companies/update.php` - Şirket güncelle

---

## 🎯 Geliştirme İpuçları

### Frontend Development
```bash
cd client
npm run dev  # Development server (hot reload)
npm run build  # Production build
npm run preview  # Production preview
```

### Backend Testing
```bash
# API test
curl http://localhost/IsBul-Job-Platform/api/stats/dashboard.php

# Admin test (token gerekli)
curl -H "x-auth-token: YOUR_TOKEN" http://localhost/IsBul-Job-Platform/api/admin/users.php
```

### Database Backup
```bash
# Yedek al
mysqldump -u root isbul > backup_$(date +%Y%m%d).sql

# Yedekten geri yükle
mysql -u root isbul < backup_20251019.sql
```

---

## 🆘 Yardım ve Destek

Sorun yaşıyorsan:

1. **Log Dosyalarını Kontrol Et:**
   - Apache: `/Applications/XAMPP/xamppfiles/logs/error_log`
   - PHP: `/Applications/XAMPP/xamppfiles/logs/php_error_log`
   - Browser Console (F12)
   - Network Tab (API istekleri)

2. **Veritabanını Kontrol Et:**
   - phpMyAdmin: `http://localhost/phpmyadmin`
   - Tabloların var olduğunu doğrula
   - Kullanıcı rollerini kontrol et

3. **XAMPP Durumunu Kontrol Et:**
   - Apache: Port 80 çalışıyor mu?
   - MySQL: Port 3306 çalışıyor mu?
   - Yeşil ışıklar yanıyor mu?

---

**Başarılar! 🚀**

*Son güncelleme: 19 Ekim 2025*
