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

### ✅ Frontend: React (DEVAM EDİYOR)
- ⚛️ React 18 + Vite
- 🎨 TailwindCSS ile modern tasarım
- 🧭 React Router ile sayfa yönetimi
- 📦 Zustand ile state yönetimi
- 🔄 TanStack Query ile veri yönetimi
- 📱 Tam responsive tasarım

### ✅ Backend: PHP + MySQL (DEVAM EDİYOR)
- 🐘 PHP 7.4+ ile RESTful API
- 💾 MySQL 5.7+ veritabanı
- 🔐 JWT ile kimlik doğrulama
- 🛡️ PDO ile güvenli veritabanı bağlantısı
- 🌐 CORS yapılandırması

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
- 🔄 İş ilanlarını arama ve filtreleme (yapılacak)
- 🔄 Özgeçmiş oluşturma ve düzenleme (yapılacak)
- 🔄 İş ilanlarına başvurma (yapılacak)
- 🔄 Firmaları takip etme ve değerlendirme (yapılacak)
- 🔄 İlanlara yorum yapma ve kaydetme (yapılacak)
- 🔄 Mesajlaşma sistemi (yapılacak)
- 🔄 Beceri profilini yönetme (yapılacak)
- 🔄 Başvuru durumlarını takip etme (yapılacak)

### 🏢 Firmalar İçin
- 🔄 Firma profili oluşturma ve düzenleme (yapılacak)
- 🔄 İş ilanı yayınlama ve yönetme (yapılacak)
- 🔄 Başvuruları inceleme ve adaylarla iletişim (yapılacak)
- 🔄 Aday filtreleme ve arama (yapılacak)
- 🔄 İstatistikler ve raporlar (yapılacak)
- 🔄 Acil iş ilanları oluşturma (yapılacak)
- 🔄 Yarı zamanlı iş ilanları oluşturma (yapılacak)
- 🔄 Firma değerlendirmelerini görüntüleme (yapılacak)

### 👨‍💼 Yöneticiler İçin
- 🔄 Kullanıcı ve firma yönetimi (yapılacak)
- 🔄 İçerik moderasyonu (yapılacak)
- 🔄 Sistem ayarları ve konfigürasyonu (yapılacak)
- 🔄 İstatistikler ve raporlar (yapılacak)
- 🔄 Kategori ve meslek yönetimi (yapılacak)
- 🔄 Şehir ve ilçe yönetimi (yapılacak)

## 🔌 API Endpoints

### ✅ Çalışan Endpoints

#### Kimlik Doğrulama
- `POST /api/auth/register.php` - Yeni kullanıcı kaydı
- `POST /api/auth/login.php` - Kullanıcı girişi
- `GET /api/index.php` - API bilgisi

### 🔄 Geliştirilecek Endpoints

#### İş İlanları
- `GET /api/jobs/` - Tüm ilanları listele
- `GET /api/jobs/[id].php` - İlan detayı
- `POST /api/jobs/create.php` - Yeni ilan oluştur
- `PUT /api/jobs/[id].php` - İlan güncelle
- `DELETE /api/jobs/[id].php` - İlan sil

#### Şirketler
- `GET /api/companies/` - Şirketleri listele
- `GET /api/companies/[id].php` - Şirket detayı
- `POST /api/companies/create.php` - Şirket oluştur
- `PUT /api/companies/[id].php` - Şirket güncelle

#### Başvurular
- `GET /api/applications/` - Başvuruları listele
- `POST /api/applications/create.php` - Başvuru yap
- `PUT /api/applications/[id].php` - Başvuru durumu güncelle

#### Kullanıcılar
- `GET /api/users/profile.php` - Profil bilgisi
- `PUT /api/users/profile.php` - Profil güncelle

#### Mesajlar
- `GET /api/messages/` - Mesajları listele
- `POST /api/messages/send.php` - Mesaj gönder

#### Özgeçmişler
- `GET /api/resumes/` - Özgeçmiş getir
- `POST /api/resumes/create.php` - Özgeçmiş oluştur
- `PUT /api/resumes/update.php` - Özgeçmiş güncelle

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

**İsminiz**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- LinkedIn: [LinkedIn Profiliniz](https://linkedin.com/in/YOUR_PROFILE)
- Email: your.email@example.com

---

## 🙏 Teşekkürler

- React ekibine harika framework için
- TailwindCSS'e utility-first CSS için
- Tüm açık kaynak katkıda bulunanlara

---

## 📊 Proje İstatistikleri

- ✅ Backend: Kimlik doğrulama sistemi tamamlandı
- 🔄 Frontend: Temel sayfalar tamamlandı
- 🔄 Özellikler: Geliştirme aşamasında
- 📅 Tahmini Tamamlanma: [Tarihiniz]

---

<div align="center">

**⭐ Bu projeyi faydalı bulduysanız yıldız vermeyi unutmayın!**

Bitirme projesi için ❤️ ile yapıldı

**Proje Durumu**: 🔄 Aktif Geliştirme  
**Versiyon**: 2.0.0  
**Son Güncelleme**: 2025-10-02  
**Teknoloji**: React + PHP + MySQL

</div>
