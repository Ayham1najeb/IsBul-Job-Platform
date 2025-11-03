# 🚀 Netlify Deployment - Hızlı Başlangıç

## ⚠️ ÖNEMLİ: Netlify Sadece Frontend İçin!

Netlify **sadece Frontend (React)** için kullanılabilir. PHP backend ve MySQL için **başka servisler** gerekiyor.

---

## 📋 Adım 1: GitHub Repository Hazırlığı

### 1.1 Git Repository Oluştur

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/IsBul-Job-Platform

# Git başlat (eğer yoksa)
git init

# Dosyaları ekle
git add .

# Commit
git commit -m "Initial commit - Netlify ready"

# GitHub'da repository oluştur: https://github.com/new
# Repository adı: IsBul-Job-Platform

# Remote ekle
git remote add origin https://github.com/Ayham1najeb/IsBul-Job-Platform.git

# Push et
git branch -M main
git push -u origin main
```

---

## 📋 Adım 2: Netlify'de Site Oluştur

### 2.1 Netlify'e Bağlan

1. [Netlify](https://app.netlify.com) hesabına giriş yap
2. **"Add new site"** → **"Import an existing project"**
3. **"Deploy with GitHub"** seç
4. GitHub hesabını bağla
5. Repository'yi seç: **`Ayham1najeb/IsBul-Job-Platform`**

### 2.2 Build Settings

Netlify otomatik olarak `netlify.toml` dosyasını algılayacak. Eğer algılamazsa, manuel olarak ayarla:

```
Base directory: client
Build command: npm run build
Publish directory: client/dist
```

### 2.3 Environment Variables

**Site settings** → **Environment variables** → **Add variable**:

```
Key: VITE_API_URL
Value: https://your-backend-url.com/api
```

**⚠️ ÖNEMLİ**: Backend URL'ini production backend'inizin URL'i ile değiştirin!

---

## 📋 Adım 3: Backend Deployment (PHP)

### ⚠️ ÖNEMLİ: Dependencies Kurulumu

**Backend PHP dependencies (PHPMailer) için Composer gerekli!**

- ✅ `composer.json` ve `composer.lock` Git'te olmalı
- ❌ `vendor/` klasörü Git'e eklenmemeli (çok büyük)
- ✅ Deployment sonrası `composer install` çalıştırılmalı

---

### Seçenek 1: 000webhost (ÖNERİLEN - ÜCRETSİZ + PHP + MySQL)

**Avantajlar**: 
- ✅ PHP desteği
- ✅ MySQL database (2 adet ücretsiz)
- ✅ Ücretsiz domain
- ✅ Kolay kurulum

**Adımlar**:

1. [000webhost](https://www.000webhost.com) hesabı oluştur
2. **"Create Website"** → Site adı gir
3. **File Manager**'a git
4. `api/` klasörünü yükle (ZIP olarak yükle, sonra extract et)
   
   **⚠️ ÖNEMLİ**: `vendor/` klasörünü **YÜKLEMEYİN**! Sadece:
   - `composer.json` ✅
   - `composer.lock` ✅
   - Diğer tüm dosyalar ✅

5. **Dependencies Kurulumu** (ÇOK ÖNEMLİ):
   
   **Seçenek A - SSH/Terminal varsa**:
   ```bash
   cd api
   composer install --no-dev --optimize-autoloader
   ```
   
   **Seçenek B - SSH yoksa**:
   - Composer'ı indir: https://getcomposer.org/download/
   - `composer.phar` dosyasını `api/` klasörüne yükle
   - File Manager'dan `install-dependencies.sh` çalıştır (eğer shell access varsa)
   - **VEYA** local'de `composer install` çalıştır, `vendor/` klasörünü ZIP'le ve yükle

6. **MySQL Databases** → Yeni database oluştur
7. `api/config/database.php` dosyasını düzenle:

```php
private $host = "localhost"; // veya 000webhost'un verdiği host
private $db_name = "your_database_name";
private $username = "your_username";
private $password = "your_password";
```

8. phpMyAdmin'den SQL schema'yı import et:
   - `database/schema.sql`
   - `api/database/add_ilan_id_to_mesajlar.sql`
   - `api/database/create_bildirimler_table.sql`
   - `api/database/create_aktif_sohbetler_table.sql`

9. Backend URL'i: `https://your-site.000webhostapp.com/api`

10. **Test**: `https://your-site.000webhostapp.com/api/index.php` açılmalı

### Seçenek 2: Render (Ücretsiz - Sınırlı)

1. [Render](https://render.com) hesabı oluştur
2. **New** → **Web Service**
3. GitHub repository'yi bağla
4. Settings:
   - **Root Directory**: `api`
   - **Build Command**: (boş bırak)
   - **Start Command**: `php -S 0.0.0.0:$PORT`
   - **Environment**: PHP

---

## 📋 Adım 4: Database Deployment

### Eğer 000webhost Kullanıyorsanız:

000webhost zaten MySQL sağlar, adım 3'te yapılandırdınız.

### Alternatif: PlanetScale (Ücretsiz)

1. [PlanetScale](https://planetscale.com) hesabı oluştur
2. Yeni database oluştur
3. Connection string'i al
4. Backend'de `database.php` dosyasını güncelle

---

## 📋 Adım 5: CORS Ayarları

### Backend'de CORS Güncelle

`api/config/cors_headers.php` dosyasını düzenle:

```php
<?php
// Netlify URL'inizi buraya ekleyin
$allowedOrigins = [
    'https://your-site.netlify.app',
    'https://your-site-name.netlify.app'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: *'); // Development için
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, x-auth-token');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 3600');
header('Content-Type: application/json; charset=UTF-8');

// Handle OPTIONS request (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
```

---

## 📋 Adım 6: Uploads Klasörü

### 000webhost'ta:

1. File Manager'da `uploads/` klasörü oluştur
2. Alt klasörler: `resumes/`, `logos/`, `profiles/`
3. İzinler: **755** (chmod)

---

## 📋 Adım 7: Deploy ve Test

### 7.1 Frontend Deploy

1. GitHub'a push yap:
```bash
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

2. Netlify otomatik deploy edecek
3. Deploy logları kontrol et

### 7.2 Test

1. Netlify URL'inizi aç: `https://your-site.netlify.app`
2. Login/Register test et
3. API çağrılarını kontrol et (Browser Console → Network)

---

## 🔧 Troubleshooting

### Problem: CORS Hatası

**Çözüm**: `api/config/cors_headers.php` dosyasında Netlify URL'ini ekle

### Problem: API 404

**Çözüm**: 
- Backend URL'ini kontrol et
- `VITE_API_URL` environment variable'ını Netlify'de kontrol et

### Problem: Build Hatası

**Çözüm**: 
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problem: Database Connection Error

**Çözüm**: 
- Database credentials'ı kontrol et
- SSL connection gerekli mi kontrol et

---

## 📊 Önerilen Stack (Tam Ücretsiz)

| Component | Service | URL Format |
|-----------|---------|------------|
| **Frontend** | Netlify | `https://your-site.netlify.app` |
| **Backend** | 000webhost | `https://your-site.000webhostapp.com/api` |
| **Database** | 000webhost MySQL | (Dahil) |

---

## ✅ Checklist

- [ ] GitHub repository oluşturuldu
- [ ] Netlify'de site oluşturuldu
- [ ] Backend 000webhost'ta deploy edildi
- [ ] Database kuruldu ve schema import edildi
- [ ] CORS ayarları yapıldı
- [ ] Environment variables ayarlandı
- [ ] Uploads klasörü oluşturuldu
- [ ] Test edildi (Login, Register, API calls)

---

**Son Güncelleme**: 15 Ocak 2025

