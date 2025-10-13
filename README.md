# İş Bul - Job Search Platform 🚀

<div align="center">

![İş Bul](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18-blue)
![PHP](https://img.shields.io/badge/PHP-7.4+-purple)
![MySQL](https://img.shields.io/badge/MySQL-5.7+-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

**Modern job search platform connecting job seekers with employers**

*İş arayanlar ve işverenler arasında köprü kuran modern iş arama platformu*

[Türkçe](#-proje-hakkında) • [English](#-about) • [Features](#-özellikler) • [Installation](#-kurulum-ve-çalıştırma) • [Tech Stack](#️-teknoloji-altyapısı)

</div>

---

## 🎯 Proje Durumu

Bu proje modern web teknolojileri ile geliştirilmektedir:

### ✅ Frontend: React (İLERLİYOR - %75 TAMAMLANDI)
- ⚛️ React 18 + Vite
- 🎨 TailwindCSS ile modern tasarım
- 🧭 React Router ile sayfa yönetimi
- 📦 Zustand ile state yönetimi
- 🔄 TanStack Query ile veri yönetimi
- 📱 Tam responsive tasarım
- ✅ **Tamamlanan Sayfalar**:
  - Ana Sayfa (Home) - Modern hero section, kategoriler, istatistikler
  - Giriş (Login) - Gelişmiş tasarım, animasyonlar
  - Kayıt (Register) - Modern form, hesap tipi seçimi
  - Dashboard - Kullanıcı paneli
  - İş İlanları (Jobs) - Liste, detay, filtreleme
  - Şirketler (Companies) - Liste, detay, profil
  - Başvurular (Applications) - Kullanıcı ve şirket başvuruları
  - Profil (Profile) - Görüntüleme ve düzenleme (genişletilmiş)
  - Özgeçmiş (Resume) - Oluşturma, düzenleme, önizleme, PDF indirme
  - Kayıtlı İşler (Saved Jobs)
  - Hakkımızda (About)
  - İletişim (Contact)
  - SSS (FAQ)
  - Şirket Oluşturma (Company Create)

### ✅ Backend: PHP + MySQL (TAMAMLANDI)
- 🐘 PHP 7.4+ ile RESTful API
- 💾 MySQL 5.7+ veritabanı
- 🔐 JWT ile kimlik doğrulama
- 🛡️ PDO ile güvenli veritabanı bağlantısı
- 🌐 CORS yapılandırması
- ✅ **6 Model + 26 Endpoint Hazır**
- ✅ **Database Migrations & Seeds Hazır**

## 📖 Proje Hakkında

İş Bul, iş arayanlar ve işverenler arasında köprü kuran modern bir iş arama platformudur. React ile geliştirilmiş kullanıcı arayüzü, PHP API üzerinden MySQL veritabanı ile iletişim kurar.

**Bitirme Projesi** olarak geliştirilmiş bu platform, şunları sağlar:
- 👔 **İş Arayanlar**: İş arama, başvuru yapma ve takip
- 🏢 **Şirketler**: İlan yayınlama, başvuru yönetimi ve yetenek bulma
- 👨‍💼 **Yöneticiler**: Platform yönetimi

### 📖 About

İş Bul is a comprehensive job search platform designed to bridge the gap between job seekers and employers. Built as a **final year graduation project**, it provides a seamless experience for all users with modern technologies.

## 🏗️ Mimari Yapı

```
┌─────────────────────────────────────────┐
│         İş Bul Platformu                │
├─────────────────────────────────────────┤
│                                         │
│  📱 React Frontend (client/)            │
│     ├── Kullanıcı arayüzü              │
│     ├── TailwindCSS ile stil           │
│     └── Axios ile API çağrıları        │
│              ↓ HTTP ↑                   │
│  🔌 PHP API (api/)                      │
│     ├── Endpoint'ler                   │
│     ├── İş mantığı                     │
│     ├── JWT doğrulama                  │
│     └── PDO ile veritabanı             │
│              ↓ SQL ↑                    │
│  💾 MySQL Veritabanı                    │
│     ├── Kullanıcılar                   │
│     ├── İş ilanları                    │
│     ├── Şirketler                      │
│     └── Başvurular                     │
│                                         │
└─────────────────────────────────────────┘
```

## 🛠️ Teknoloji Altyapısı

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Stil**: TailwindCSS
- **Routing**: React Router v6
- **State**: Zustand + TanStack Query
- **HTTP**: Axios
- **İkonlar**: Lucide React

### Backend
- **Dil**: PHP 7.4+
- **Veritabanı**: MySQL 5.7+
- **Bağlantı**: PDO (PHP Data Objects)
- **Kimlik Doğrulama**: JWT (JSON Web Token)
- **API Tipi**: RESTful

### Geliştirme Ortamı
- **Sunucu**: XAMPP (Apache + MySQL)
- **PHP**: 7.4+
- **Node.js**: 16+ (Frontend için)

## Veritabanı Yapısı

Veritabanı, aşağıdaki ana tablolardan oluşmaktadır:

- **Kullanicilar**: Kullanıcı hesapları (iş arayanlar, firmalar, yöneticiler)
- **Firmalar**: Firma bilgileri ve profilleri
- **Ilanlar**: İş ilanları
- **Kategoriler**: İş kategorileri
- **Meslekler**: Meslek türleri
- **Sehirler/Ilceler**: Konum bilgileri
- **Basvurular**: İş başvuruları
- **Ozgecmisler**: Kullanıcı özgeçmişleri
- **Beceriler**: Yetenek ve beceri listesi
- **Mesajlar**: Kullanıcılar arası mesajlaşma
- **Degerlendirmeler**: Firma değerlendirmeleri
- **AcilIlanlar**: Acil iş ilanları
- **PartTimeIlanlar**: Yarı zamanlı iş ilanları

## 📁 Proje Yapısı

```
IsBul/
├── api/                              # 🐘 PHP Backend
│   ├── config/
│   │   ├── database.php             # ✅ MySQL bağlantısı (PDO)
│   │   └── cors.php                 # ✅ CORS ayarları
│   ├── models/
│   │   ├── User.php                 # ✅ Kullanıcı modeli
│   │   ├── Job.php                  # 🔄 İş ilanı modeli (yapılacak)
│   │   ├── Company.php              # 🔄 Şirket modeli (yapılacak)
│   │   └── Application.php          # 🔄 Başvuru modeli (yapılacak)
│   ├── auth/
│   │   ├── register.php             # ✅ Kayıt endpoint
│   │   └── login.php                # ✅ Giriş endpoint
│   ├── jobs/
│   │   ├── index.php                # 🔄 İş ilanları listesi (yapılacak)
│   │   ├── create.php               # 🔄 İlan oluştur (yapılacak)
│   │   └── [id].php                 # 🔄 İlan detay (yapılacak)
│   ├── companies/
│   │   └── ...                      # 🔄 Şirket endpoint'leri (yapılacak)
│   ├── applications/
│   │   └── ...                      # 🔄 Başvuru endpoint'leri (yapılacak)
│   ├── middleware/
│   │   └── auth.php                 # ✅ JWT doğrulama
│   ├── utils/
│   │   └── jwt.php                  # ✅ JWT yardımcıları
│   ├── .htaccess                    # ✅ Apache yapılandırması
│   └── index.php                    # ✅ API giriş noktası
│
├── client/                           # ⚛️ React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Navbar.jsx       # ✅ Üst menü
│   │   │   │   ├── Footer.jsx       # ✅ Alt bilgi
│   │   │   │   └── Layout.jsx       # ✅ Ana layout
│   │   │   └── ProtectedRoute.jsx   # ✅ Korumalı route
│   │   ├── pages/
│   │   │   ├── Home.jsx             # ✅ Ana sayfa
│   │   │   ├── Login.jsx            # ✅ Giriş sayfası
│   │   │   ├── Register.jsx         # ✅ Kayıt sayfası
│   │   │   ├── Dashboard.jsx        # ✅ Kontrol paneli
│   │   │   ├── Jobs.jsx             # 🔄 İş ilanları (yapılacak)
│   │   │   ├── JobDetails.jsx       # 🔄 İlan detay (yapılacak)
│   │   │   └── ...                  # 🔄 Diğer sayfalar
│   │   ├── services/
│   │   │   ├── authService.js       # ✅ Auth API çağrıları
│   │   │   ├── jobService.js        # ✅ İş ilanı API çağrıları
│   │   │   ├── companyService.js    # ✅ Şirket API çağrıları
│   │   │   └── applicationService.js # ✅ Başvuru API çağrıları
│   │   ├── store/
│   │   │   └── authStore.js         # ✅ Auth state yönetimi
│   │   ├── config/
│   │   │   ├── api.js               # ✅ Axios yapılandırması
│   │   │   └── constants.js         # ✅ Sabitler
│   │   ├── utils/
│   │   │   └── helpers.js           # ✅ Yardımcı fonksiyonlar
│   │   ├── App.jsx                  # ✅ Ana uygulama
│   │   ├── main.jsx                 # ✅ Giriş noktası
│   │   └── index.css                # ✅ TailwindCSS
│   ├── public/
│   ├── .env                         # ✅ Ortam değişkenleri
│   ├── package.json                 # ✅ Bağımlılıklar
│   ├── vite.config.js               # ✅ Vite yapılandırması
│   └── tailwind.config.js           # ✅ Tailwind yapılandırması
│
├── database/
│   └── schema.sql                   # ✅ MySQL veritabanı şeması
│
├── uploads/                         # 📁 Yüklenen dosyalar
│   ├── resumes/                     # Özgeçmişler
│   ├── logos/                       # Şirket logoları
│   └── profiles/                    # Profil resimleri
│
├── README.md                        # 📖 Bu dosya
├── PROJE_YAPISI.md                 # 📋 Detaylı yapı
├── OZET.md                         # 📝 Proje özeti
└── BASLARKEN.md                    # 🚀 Başlangıç kılavuzu
```

### 📊 Durum Göstergeleri
- ✅ **Tamamlandı**: Çalışıyor ve kullanıma hazır
- 🔄 **Yapılacak**: Henüz geliştirilmedi
- 📁 **Klasör**: Dizin yapısı

## ✨ Özellikler

### 👤 Kullanıcılar (İş Arayanlar) İçin
- ✅ Hesap oluşturma ve giriş yapma
- ✅ İş ilanlarını arama ve filtreleme
- ✅ İş ilanı detaylarını görüntüleme
- ✅ İş ilanlarına başvurma
- ✅ Başvuru durumlarını takip etme
- ✅ İş ilanlarını kaydetme
- ✅ Profil yönetimi ve düzenleme (genişletilmiş: doğum tarihi, cinsiyet, adres, website)
- ✅ Profil fotoğrafı yükleme (kalıcı)
- ✅ Özgeçmiş oluşturma ve düzenleme (tam özellikli)
- ✅ İş deneyimi, eğitim, beceriler, diller, sertifikalar yönetimi
- ✅ Özgeçmiş önizleme (2 şablon: Klasik & Minimal)
- ✅ PDF olarak indirme (text-selectable)
- ✅ Şirket profillerini görüntüleme
- 🔄 Mesajlaşma sistemi (yapılacak)
- 🔄 Firmaları takip etme ve değerlendirme (yapılacak)

### 🏢 Firmalar İçin
- ✅ Firma profili oluşturma ve düzenleme
- ✅ İş ilanı yayınlama ve yönetme
- ✅ Başvuruları inceleme ve yönetme
- ✅ Başvuru durumu güncelleme
- ✅ Şirket istatistikleri
- ✅ Aday özgeçmişlerini görüntüleme
- 🔄 Aday filtreleme ve arama (geliştirilecek)
- 🔄 Detaylı raporlar (yapılacak)
- 🔄 Firma değerlendirmelerini görüntüleme (yapılacak)

### 👨‍💼 Yöneticiler İçin
- 🔄 Kullanıcı ve firma yönetimi (yapılacak)
- 🔄 İçerik moderasyonu (yapılacak)
- 🔄 Sistem ayarları ve konfigürasyonu (yapılacak)
- 🔄 İstatistikler ve raporlar (yapılacak)
- 🔄 Kategori ve meslek yönetimi (yapılacak)

## 🔌 API Endpoints

### ✅ Tamamlanan Backend API (26 Endpoint)

#### 🔐 Kimlik Doğrulama (3)
- ✅ `POST /api/auth/register.php` - Yeni kullanıcı kaydı
- ✅ `POST /api/auth/login.php` - Kullanıcı girişi
- ✅ `GET /api/index.php` - API bilgisi

#### 💼 İş İlanları (5)
- ✅ `GET /api/jobs/` - Tüm ilanları listele (filtreleme: kategori, şehir, çalışma şekli, arama)
- ✅ `GET /api/jobs/detail.php?id=` - İlan detayı
- ✅ `POST /api/jobs/create.php` - Yeni ilan oluştur (Şirket - Auth gerekli)
- ✅ `PUT /api/jobs/update.php` - İlan güncelle (Şirket - Auth gerekli)
- ✅ `DELETE /api/jobs/delete.php?id=` - İlan sil (Şirket - Auth gerekli)

#### 🏢 Şirketler (3)
- ✅ `GET /api/companies/` - Şirketleri listele (filtreleme: şehir, kategori)
- ✅ `GET /api/companies/detail.php?id=` - Şirket detayı + ilanları
- ✅ `PUT /api/companies/update.php` - Şirket güncelle (Şirket - Auth gerekli)

#### 📝 Başvurular (4)
- ✅ `POST /api/applications/create.php` - Başvuru yap (İş Arayan - Auth gerekli)
- ✅ `GET /api/applications/user.php` - Kullanıcının başvuruları (Auth gerekli)
- ✅ `GET /api/applications/job.php?ilan_id=` - İlana yapılan başvurular (Şirket - Auth gerekli)
- ✅ `PUT /api/applications/update-status.php` - Başvuru durumu güncelle (Şirket - Auth gerekli)

#### 📄 Özgeçmişler (16)
- ✅ `GET /api/resumes/get-full.php` - Tam özgeçmiş getir (Auth gerekli)
- ✅ `GET /api/resumes/settings.php` - Özgeçmiş ayarları getir
- ✅ `POST /api/resumes/settings.php` - Özgeçmiş ayarları kaydet
- ✅ `GET /api/resumes/experience.php` - İş deneyimleri
- ✅ `POST /api/resumes/experience.php` - Deneyim ekle
- ✅ `PUT /api/resumes/experience.php` - Deneyim güncelle
- ✅ `DELETE /api/resumes/experience.php` - Deneyim sil
- ✅ `GET /api/resumes/education.php` - Eğitimler
- ✅ `POST /api/resumes/education.php` - Eğitim ekle
- ✅ `PUT /api/resumes/education.php` - Eğitim güncelle
- ✅ `DELETE /api/resumes/education.php` - Eğitim sil
- ✅ `GET /api/resumes/skills.php` - Beceriler
- ✅ `POST /api/resumes/skills.php` - Beceri ekle
- ✅ `DELETE /api/resumes/skills.php` - Beceri sil
- ✅ `GET /api/resumes/languages.php` - Diller
- ✅ `POST /api/resumes/languages.php` - Dil ekle
- ✅ `PUT /api/resumes/languages.php` - Dil güncelle
- ✅ `DELETE /api/resumes/languages.php` - Dil sil
- ✅ `GET /api/resumes/certificates.php` - Sertifikalar
- ✅ `POST /api/resumes/certificates.php` - Sertifika ekle
- ✅ `PUT /api/resumes/certificates.php` - Sertifika güncelle
- ✅ `DELETE /api/resumes/certificates.php` - Sertifika sil

#### 💬 Mesajlar (3)
- ✅ `POST /api/messages/send.php` - Mesaj gönder (Auth gerekli)
- ✅ `GET /api/messages/` - Kullanıcının mesajları (Auth gerekli)
- ✅ `GET /api/messages/conversation.php?user_id=` - İki kullanıcı arası konuşma (Auth gerekli)

#### 📂 Kategoriler (1)
- ✅ `GET /api/categories/` - Tüm kategorileri listele

#### 📍 Lokasyonlar (2)
- ✅ `GET /api/locations/cities.php` - Tüm şehirleri listele
- ✅ `GET /api/locations/districts.php?sehir_id=` - Şehre göre ilçeleri listele

---

### 📊 Backend İstatistikleri

| Kategori | Endpoint Sayısı | Durum |
|----------|----------------|-------|
| **Kimlik Doğrulama** | 3 | ✅ Tamamlandı |
| **İş İlanları** | 5 | ✅ Tamamlandı |
| **Şirketler** | 3 | ✅ Tamamlandı |
| **Başvurular** | 4 | ✅ Tamamlandı |
| **Özgeçmişler** | 16 | ✅ Tamamlandı |
| **Mesajlar** | 3 | ✅ Tamamlandı |
| **Kullanıcılar** | 3 | ✅ Tamamlandı |
| **Kategoriler** | 1 | ✅ Tamamlandı |
| **Lokasyonlar** | 2 | ✅ Tamamlandı |
| **TOPLAM** | **42** | **✅ %100** |

---

### 🔄 Geliştirilecek Endpoints (İleride)

#### Kullanıcılar (3)
- ✅ `GET /api/users/profile.php` - Profil bilgisi (Auth gerekli)
- ✅ `PUT /api/users/profile.php` - Profil güncelle (Auth gerekli)
- ✅ `POST /api/users/upload-photo.php` - Profil fotoğrafı yükle (Auth gerekli)

#### Değerlendirmeler
- 🔄 `POST /api/ratings/create.php` - Şirket değerlendirmesi yap
- 🔄 `GET /api/ratings/company.php?firma_id=` - Şirket değerlendirmeleri

#### Admin
- 🔄 `GET /api/admin/stats.php` - Platform istatistikleri
- 🔄 `GET /api/admin/users.php` - Kullanıcı yönetimi
- 🔄 `PUT /api/admin/moderate.php` - İçerik moderasyonu

## 🚀 Kurulum ve Çalıştırma

### ⚠️ ÖNEMLİ: İki Ayrı Kısım!

Bu proje **iki ayrı teknoloji** kullanıyor:
1. **Backend (PHP)** - XAMPP üzerinde çalışır, npm install GEREKMİYOR! ❌
2. **Frontend (React)** - Node.js gerektirir, npm install GEREKLİ! ✅

### Ön Gereksinimler
- **XAMPP** (Apache + MySQL) - Backend için
- **Node.js 16+** - Sadece Frontend için
- **PHP 7.4+** - XAMPP ile birlikte gelir
- **MySQL 5.7+** - XAMPP ile birlikte gelir

---

### 1️⃣ Veritabanı Kurulumu

```bash
# XAMPP'i başlat
1. XAMPP Control Panel'i aç
2. Apache'yi başlat ✅
3. MySQL'i başlat ✅

# phpMyAdmin'de
4. http://localhost/phpmyadmin adresine git
5. Yeni veritabanı oluştur: "isbul"
6. SQL sekmesine git
7. database/schema.sql dosyasını içe aktar
```

---

### 2️⃣ Backend (PHP) - npm install GEREKMİYOR!

```php
// api/config/database.php dosyasını kontrol et
private $host = "localhost";
private $db_name = "isbul";
private $username = "root";
private $password = "";
```

**Backend otomatik çalışır** (XAMPP Apache sayesinde):
```bash
# Tarayıcıda test et:
http://localhost/IsBul/api

# Göreceğin mesaj:
{
  "message": "İş Bul (Job Search) API'ye Hoş Geldiniz",
  "version": "2.0.0"
}
```

✅ **Backend hazır! Hiçbir komut çalıştırmana gerek yok!**

---

### 3️⃣ Frontend (React) - npm install GEREKLİ!

```bash
# ⚠️ DİKKAT: client/ klasörüne git!
cd C:\xampp\htdocs\IsBul\client

# Bağımlılıkları yükle (sadece ilk kez)
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Tarayıcıda aç
http://localhost:5173
```

✅ **Frontend çalışıyor!**

---

### 4️⃣ Ortam Değişkenleri

```bash
# client/.env dosyası (zaten yapılandırılmış)
VITE_API_URL=http://localhost/IsBul/api
```

---

## 📊 Çalışma Şeması

```
Kök Dizin (C:\xampp\htdocs\IsBul\)
├── api/              ← PHP Backend (npm install GEREKMİYOR!)
│   └── XAMPP Apache otomatik çalıştırır
│
└── client/           ← React Frontend (npm install GEREKLİ!)
    └── npm run dev ile çalıştır
```

## 🧪 Test Etme

### Backend Testi
```bash
# Tarayıcıda aç
http://localhost/IsBul/api

# Göreceğin mesaj:
{
  "message": "İş Bul (Job Search) API'ye Hoş Geldiniz",
  "version": "2.0.0"
}
```

### Frontend Testi
```bash
# Tarayıcıda aç
http://localhost:5173

# Ana sayfa görünmeli
```

### Kayıt Testi
```bash
1. http://localhost:5173/register
2. Formu doldur
3. "Hesap Oluştur" butonuna tıkla
4. Dashboard'a yönlendirileceksin
```

## 🔄 Sistem Akışı

### 1️⃣ Kullanıcı Kaydı
```
React Form → Axios → PHP API → MySQL
     ↓                              ↓
Dashboard ← JWT Token ← PHP ← Kayıt
```

### 2️⃣ Kullanıcı Girişi
```
React Form → Axios → PHP API → MySQL
     ↓                              ↓
Dashboard ← JWT Token ← PHP ← Doğrulama
```

### 3️⃣ İş İlanı Arama (Gelecek)
```
React Search → Axios → PHP API → MySQL
      ↓                              ↓
  İlan Listesi ← JSON ← PHP ← Sorgu
```

## 📊 Veri Akışı

```
┌──────────────┐
│   React UI   │ (Kullanıcı arayüzü)
└──────┬───────┘
       │ HTTP Request (Axios)
       ↓
┌──────────────┐
│   PHP API    │ (İş mantığı)
└──────┬───────┘
       │ SQL Query (PDO)
       ↓
┌──────────────┐
│    MySQL     │ (Veri depolama)
└──────────────┘
```

## 🎯 Sonraki Adımlar

### Kısa Vadeli (1 Hafta)
1. ✅ İş ilanları API endpoint'leri
2. ✅ Şirketler API endpoint'leri
3. ✅ React'te İş ilanları sayfası
4. ✅ React'te Şirketler sayfası

### Orta Vadeli (2-3 Hafta)
1. Başvuru sistemi (API + UI)
2. Profil ve özgeçmiş sayfaları
3. Mesajlaşma sistemi
4. Dosya yükleme (özgeçmiş, logo)

### Uzun Vadeli (1 Ay+)
1. Admin paneli
2. Gelişmiş arama ve filtreleme
3. Bildirim sistemi
4. İstatistikler ve raporlar
5. Performans optimizasyonu

## 📚 Dokümantasyon

- `README.md` - Bu dosya (ana dokümantasyon)
- `PROJE_YAPISI.md` - Detaylı proje yapısı
- `OZET.md` - Proje özeti ve durum
- `BASLARKEN.md` - Hızlı başlangıç kılavuzu
- `TAMAMLANAN_ISLEMLER.md` - Tamamlanan işlemler listesi
- `client/README.md` - React frontend dokümantasyonu

## 🔐 Güvenlik Özellikleri

- ✅ JWT token authentication
- ✅ Password hashing (bcrypt)
- ✅ SQL injection koruması (PDO prepared statements)
- ✅ Input sanitization
- ✅ CORS yapılandırması
- ✅ Token expiration (30 gün)

---

## 🤝 Katkıda Bulunma

Bu akademik bir proje olsa da, öneriler ve geri bildirimler memnuniyetle karşılanır!

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

---

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

## 👨‍💻 Geliştirici

**Ayham Najeb**
- GitHub: [@Ayham1najeb](https://github.com/Ayham1najeb)

---

## 🙏 Teşekkürler

- React ekibine harika framework için
- TailwindCSS'e utility-first CSS için
- Tüm açık kaynak katkıda bulunanlara

---

## 📊 Proje İstatistikleri

- ✅ **Backend**: %100 Tamamlandı (6 Model + 42 Endpoint)
- ✅ **Frontend**: %75 Tamamlandı (16 sayfa + 30+ bileşen hazır)
- ✅ **Database**: %100 Tamamlandı (Migrations & Seeds)
- ✅ **UI/UX**: Modern ve responsive tasarım
- ✅ **Özgeçmiş Sistemi**: %90 Tamamlandı
- ✅ **Profil Yönetimi**: %100 Tamamlandı
- 📅 **Tahmini Tamamlanma**: [01.11.2025]

### Detaylı İlerleme

| Bileşen | Tamamlanma | Durum |
|---------|-----------|-------|
| **Backend API** | %100 | ✅ Tamamlandı |
| **Database Schema** | %100 | ✅ Tamamlandı |
| **Database Migrations** | %100 | ✅ Tamamlandı |
| **Database Seeds** | %100 | ✅ Tamamlandı |
| **Authentication** | %100 | ✅ Tamamlandı |
| **Frontend Pages** | %75 | 🔄 Devam Ediyor |
| **UI Components** | %70 | 🔄 Devam Ediyor |
| **UI/UX Design** | %80 | 🔄 Devam Ediyor |
| **Özgeçmiş Sistemi** | %90 | ✅ Neredeyse Tamamlandı |
| **Profil Yönetimi** | %100 | ✅ Tamamlandı |
| **PDF İndirme** | %100 | ✅ Tamamlandı |
| **Testing** | %20 | 🔄 Başladı |

### 🎨 Son Güncellemeler (13 Ekim 2025)
- ✅ Özgeçmiş sistemi tamamlandı (5 bölüm: Deneyim, Eğitim, Beceriler, Diller, Sertifikalar)
- ✅ 2 özgeçmiş şablonu eklendi (Klasik & Minimal)
- ✅ PDF indirme özelliği (text-selectable, çok sayfalı)
- ✅ Profil yönetimi genişletildi (doğum tarihi, cinsiyet, adres, website)
- ✅ Profil fotoğrafı yükleme sistemi (kalıcı)
- ✅ Scroll to top özelliği eklendi
- ✅ 16 özgeçmiş API endpoint'i eklendi
- ✅ 3 profil API endpoint'i eklendi
- ✅ Tab-based navigation ile özgeçmiş düzenleme
- ✅ Real-time önizleme sistemi
- ✅ Şablon değiştirme özelliği
- ✅ Görünürlük ayarları (Herkese Açık, Sadece Şirketler, Gizli)

---

<div align="center">

**⭐ Bu projeyi faydalı bulduysanız yıldız vermeyi unutmayın!**

Bitirme projesi için ❤️ ile yapıldı

**Proje Durumu**: 🔄 Aktif Geliştirme  
**Versiyon**: 1.3.0  
**Son Güncelleme**: 2025-10-13  
**Teknoloji**: React + PHP + MySQL  
**İlerleme**: %75 Tamamlandı

</div>
