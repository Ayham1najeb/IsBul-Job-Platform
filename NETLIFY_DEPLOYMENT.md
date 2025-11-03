# 🚀 Netlify Deployment Kılavuzu

Bu kılavuz, İş Bul platformunun **Frontend** kısmını Netlify'de deploy etmek için adım adım talimatlar içerir.

---

## ⚠️ ÖNEMLİ NOTLAR

### Netlify Sadece Frontend İçin!
- ✅ **Netlify**: Frontend (React) için mükemmel
- ❌ **Netlify**: PHP backend ve MySQL database için **UYGUN DEĞİL**

### Tam Deployment İçin Gereksinimler:
1. **Frontend (React)** → Netlify ✅
2. **Backend (PHP)** → PHP hosting (ör: Vercel, Heroku, Render, 000webhost)
3. **Database (MySQL)** → MySQL hosting (ör: PlanetScale, Supabase, 000webhost)

---

## 📋 Adım 1: GitHub Repository Hazırlığı

### 1.1 Repository'yi GitHub'a Push Et

```bash
# Proje klasöründe
cd /Applications/XAMPP/xamppfiles/htdocs/IsBul-Job-Platform

# Git repository başlat (eğer yoksa)
git init

# .gitignore dosyası oluştur (eğer yoksa)
cat > .gitignore << EOF
# Dependencies
node_modules/
client/node_modules/

# Build outputs
client/dist/
client/build/

# Environment variables
.env
.env.local
.env.production
client/.env
client/.env.local

# Uploads
uploads/
api/uploads/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
EOF

# GitHub'a ekle
git add .
git commit -m "Initial commit - Netlify deployment ready"

# GitHub repository oluştur ve push et
# GitHub'da yeni repository oluştur: IsBul-Job-Platform
git remote add origin https://github.com/Ayham1najeb/IsBul-Job-Platform.git
git branch -M main
git push -u origin main
```

---

## 📋 Adım 2: Netlify'de Site Oluşturma

### 2.1 Netlify Hesabı

1. [Netlify](https://app.netlify.com) hesabına giriş yap
2. "Add new site" → "Import an existing project"
3. GitHub'ı seç ve repository'yi bağla

### 2.2 Build Settings

Netlify'de aşağıdaki ayarları yap:

```
Base directory: client
Build command: npm run build
Publish directory: client/dist
```

**Veya** `netlify.toml` dosyası zaten hazır, Netlify otomatik algılayacak.

---

## 📋 Adım 3: Environment Variables

### 3.1 Netlify Dashboard'da Environment Variables Ayarla

1. Site settings → Environment variables
2. Aşağıdaki değişkenleri ekle:

```
VITE_API_URL = https://your-backend-url.com/api
```

**⚠️ ÖNEMLİ**: Backend URL'ini production backend'inizin URL'i ile değiştirin!

---

## 📋 Adım 4: Backend Deployment (PHP)

### Seçenek 1: Vercel (Önerilir - Ücretsiz)

Vercel serverless functions ile PHP desteği sağlar:

```bash
# 1. Vercel CLI kurulumu
npm install -g vercel

# 2. api/ klasöründe Vercel projesi oluştur
cd api
vercel

# 3. Vercel.json dosyası oluştur
cat > vercel.json << EOF
{
  "version": 2,
  "builds": [
    {
      "src": "**/*.php",
      "use": "@vercel/php"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
EOF

# 4. Deploy
vercel --prod
```

### Seçenek 2: Render (Ücretsiz)

1. [Render](https://render.com) hesabı oluştur
2. New → Web Service
3. Repository'yi bağla
4. Settings:
   - **Root Directory**: `api`
   - **Build Command**: (boş bırak)
   - **Start Command**: `php -S 0.0.0.0:$PORT`
   - **Environment**: PHP

### Seçenek 3: 000webhost (Ücretsiz)

1. [000webhost](https://www.000webhost.com) hesabı oluştur
2. Yeni site oluştur
3. File Manager'dan `api/` klasörünü yükle
4. `api/config/database.php` dosyasını düzenle

---

## 📋 Adım 5: Database Deployment (MySQL)

### Seçenek 1: PlanetScale (Önerilir - Ücretsiz)

1. [PlanetScale](https://planetscale.com) hesabı oluştur
2. Yeni database oluştur
3. Connection string'i al
4. Backend'de `database.php` dosyasını güncelle

### Seçenek 2: Supabase (Ücretsiz)

1. [Supabase](https://supabase.com) hesabı oluştur
2. Yeni project oluştur
3. MySQL connection string'i al
4. Backend'de `database.php` dosyasını güncelle

### Seçenek 3: 000webhost (Ücretsiz)

000webhost hem PHP hem MySQL sağlar:
1. Database oluştur
2. phpMyAdmin'den SQL schema'yı import et
3. Connection bilgilerini `database.php`'ye ekle

---

## 📋 Adım 6: Backend Configuration

### 6.1 Database Connection Güncelle

`api/config/database.php` dosyasını güncelle:

```php
<?php
class Database {
    private $host = "your-database-host.com"; // PlanetScale, Supabase, vb.
    private $db_name = "your_database_name";
    private $username = "your_username";
    private $password = "your_password";
    // ...
}
```

### 6.2 CORS Headers Güncelle

`api/config/cors_headers.php` dosyasını güncelle:

```php
// Production için sadece Netlify domain'inize izin verin
header('Access-Control-Allow-Origin: https://your-site.netlify.app');
header('Access-Control-Allow-Credentials: true');
```

---

## 📋 Adım 7: Frontend Build & Deploy

### 7.1 Local Build Test

```bash
cd client
npm install
npm run build
```

### 7.2 Netlify Auto Deploy

1. GitHub'a push yap
2. Netlify otomatik deploy edecek
3. Deploy logları kontrol et

---

## 📋 Adım 8: Post-Deployment Checklist

### ✅ Kontroller:

- [ ] Frontend Netlify'de çalışıyor mu?
- [ ] Backend API çalışıyor mu? (test: `https://your-backend.com/api`)
- [ ] Database bağlantısı çalışıyor mu?
- [ ] CORS ayarları doğru mu?
- [ ] Environment variables ayarlanmış mı?
- [ ] Tüm API endpoints çalışıyor mu?
- [ ] Login/Register çalışıyor mu?
- [ ] Images yükleniyor mu?

---

## 🔧 Troubleshooting

### Problem: CORS Hatası

**Çözüm**: `api/config/cors_headers.php` dosyasında Netlify URL'ini ekle:

```php
header('Access-Control-Allow-Origin: https://your-site.netlify.app');
```

### Problem: API 404 Hatası

**Çözüm**: Backend URL'ini kontrol et, `VITE_API_URL` environment variable'ını doğru ayarla.

### Problem: Build Hatası

**Çözüm**: 
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problem: Database Bağlantı Hatası

**Çözüm**: Database connection string'ini kontrol et, SSL sertifikalarını kontrol et.

---

## 📊 Önerilen Stack (Tam Deployment)

### Ücretsiz Seçenekler:

| Component | Service | Ücretsiz Limit |
|-----------|---------|----------------|
| Frontend | Netlify | ✅ Unlimited |
| Backend | Render | ✅ 750 hours/month |
| Database | PlanetScale | ✅ 1 database, 5GB |
| **Alternatif** | | |
| Frontend | Netlify | ✅ Unlimited |
| Backend | 000webhost | ✅ Unlimited |
| Database | 000webhost | ✅ 2 databases |

---

## 🎯 Hızlı Başlangıç (Netlify + Render + PlanetScale)

### 1. Frontend (Netlify)
```bash
# GitHub'a push et
git push origin main

# Netlify'de import et
# https://app.netlify.com → Import from Git → GitHub
```

### 2. Backend (Render)
```bash
# Render'de yeni Web Service oluştur
# Repository: IsBul-Job-Platform
# Root Directory: api
# Build Command: (boş)
# Start Command: php -S 0.0.0.0:$PORT
```

### 3. Database (PlanetScale)
```bash
# PlanetScale'de yeni database oluştur
# Connection string'i al
# Backend'de database.php'yi güncelle
```

---

**Son Güncelleme**: 15 Ocak 2025  
**Versiyon**: 1.0

