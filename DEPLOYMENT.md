# 🚀 Deployment Kılavuzu

Bu dokümantasyon, İş Bul platformunun production ortamına deploy edilmesi için gerekli adımları içerir.

---

## 📋 Ön Gereksinimler

### Sunucu Gereksinimleri
- **PHP**: 7.4 veya üzeri
- **MySQL**: 5.7 veya üzeri (veya MariaDB 10.3+)
- **Web Server**: Apache 2.4+ veya Nginx 1.18+
- **Node.js**: 16+ (production build için)
- **Composer**: PHP bağımlılıkları için (opsiyonel)

### Gerekli PHP Extensions
- `pdo_mysql`
- `json`
- `mbstring`
- `openssl`
- `fileinfo`

---

## 🔧 Adım 1: Backend Deployment

### 1.1 Dosyaları Yükleme

```bash
# Backend dosyalarını sunucuya yükle
scp -r api/ user@your-server.com:/var/www/html/
```

### 1.2 Veritabanı Kurulumu

```bash
# MySQL'e bağlan
mysql -u root -p

# Veritabanı oluştur
CREATE DATABASE isbul_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Kullanıcı oluştur (güvenlik için)
CREATE USER 'isbul_user'@'localhost' IDENTIFIED BY 'güçlü_şifre_buraya';
GRANT ALL PRIVILEGES ON isbul_platform.* TO 'isbul_user'@'localhost';
FLUSH PRIVILEGES;
```

### 1.3 Veritabanı Şemasını İçe Aktar

```bash
# SQL dosyalarını çalıştır
mysql -u isbul_user -p isbul_platform < database/schema.sql
mysql -u isbul_user -p isbul_platform < api/database/add_ilan_id_to_mesajlar.sql
mysql -u isbul_user -p isbul_platform < api/database/create_bildirimler_table.sql
mysql -u isbul_user -p isbul_platform < api/database/create_aktif_sohbetler_table.sql
```

### 1.4 Yapılandırma Dosyalarını Güncelle

`api/config/database.php` dosyasını düzenle:

```php
<?php
class Database {
    private $host = "localhost"; // Sunucu adresi
    private $db_name = "isbul_platform";
    private $username = "isbul_user";
    private $password = "güçlü_şifre_buraya";
    // ...
}
```

`api/utils/jwt.php` dosyasında JWT secret'ı güncelle:

```php
private static $secret = "PRODUCTION_JWT_SECRET_KEY_BURAYA"; // Güçlü bir key kullan
```

### 1.5 Uploads Klasörü İzinleri

```bash
# Uploads klasörü oluştur ve izinleri ayarla
mkdir -p uploads/{resumes,logos,profiles}
chmod -R 755 uploads
chown -R www-data:www-data uploads
```

### 1.6 .htaccess Yapılandırması (Apache)

`api/.htaccess` dosyası oluştur:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php [QSA,L]

# Güvenlik başlıkları
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "DENY"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"
```

### 1.7 Nginx Yapılandırması (Nginx kullanıyorsanız)

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html/api;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Uploads için
    location ~* ^/uploads/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 🎨 Adım 2: Frontend Deployment

### 2.1 Production Build

```bash
cd client
npm install
npm run build
```

Bu komut `client/dist/` klasöründe production-ready dosyalar oluşturur.

### 2.2 Environment Variables

`.env.production` dosyası oluştur:

```env
VITE_API_URL=https://api.your-domain.com
VITE_APP_NAME=İş Bul
```

Sonra build'i tekrar çalıştır:

```bash
npm run build
```

### 2.3 Frontend Dosyalarını Yükleme

```bash
# Build edilmiş dosyaları sunucuya yükle
scp -r dist/* user@your-server.com:/var/www/html/frontend/
```

### 2.4 Nginx Frontend Yapılandırması

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html/frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 🔒 Adım 3: Güvenlik Yapılandırması

### 3.1 HTTPS Kurulumu (Let's Encrypt)

```bash
# Certbot kurulumu
sudo apt-get install certbot python3-certbot-nginx

# SSL sertifikası al
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 3.2 CORS Yapılandırması

`api/config/cors_headers.php` dosyasını production için güncelle:

```php
// Production için sadece kendi domain'inize izin verin
header('Access-Control-Allow-Origin: https://your-domain.com');
header('Access-Control-Allow-Credentials: true');
```

### 3.3 Güvenlik Başlıkları

`api/.htaccess` veya Nginx yapılandırmasına ekle:

```apache
# HTTPS zorunluluğu
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set Content-Security-Policy "default-src 'self'"
```

---

## 📊 Adım 4: Veritabanı Yedekleme

### 4.1 Otomatik Yedekleme Scripti

`backup.sh` dosyası oluştur:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u isbul_user -p'password' isbul_platform > backup_$DATE.sql
# Yedekleri uzak sunucuya gönder (opsiyonel)
# scp backup_$DATE.sql user@backup-server.com:/backups/
```

Cron job ekle (her gün saat 02:00):

```bash
0 2 * * * /path/to/backup.sh
```

---

## 🧪 Adım 5: Deployment Sonrası Kontroller

### 5.1 API Testleri

```bash
# Health check
curl https://api.your-domain.com/index.php

# Login test
curl -X POST https://api.your-domain.com/auth/login.php \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","sifre":"test123"}'
```

### 5.2 Frontend Testleri

- [ ] Ana sayfa yükleniyor mu?
- [ ] Login/Register çalışıyor mu?
- [ ] API çağrıları başarılı mı?
- [ ] Responsive tasarım çalışıyor mu?
- [ ] Tüm sayfalar erişilebilir mi?

### 5.3 Performans Kontrolleri

- [ ] Page load time < 3 saniye
- [ ] API response time < 500ms
- [ ] Database query optimization
- [ ] Image optimization
- [ ] CDN kullanımı (opsiyonel)

---

## 🔄 Adım 6: Güncelleme Süreci

### 6.1 Backend Güncelleme

```bash
# 1. Yeni dosyaları yükle
scp -r api/* user@server:/var/www/html/api/

# 2. Veritabanı migration'ları çalıştır
mysql -u isbul_user -p isbul_platform < api/database/new_migration.sql

# 3. Cache temizle (varsa)
# 4. Logları kontrol et
```

### 6.2 Frontend Güncelleme

```bash
# 1. Yeni build oluştur
cd client
npm run build

# 2. Eski dosyaları yedekle
ssh user@server "mv /var/www/html/frontend /var/www/html/frontend_backup_$(date +%Y%m%d)"

# 3. Yeni dosyaları yükle
scp -r dist/* user@server:/var/www/html/frontend/

# 4. Eski yedekleri temizle (30 gün sonra)
```

---

## 📝 Notlar

- **Environment Variables**: Production'da hassas bilgileri environment variables olarak saklayın
- **Error Logging**: Production'da hata loglarını aktif tutun ama kullanıcıya göstermeyin
- **Monitoring**: Uptime monitoring (UptimeRobot, Pingdom) kullanın
- **Backup**: Düzenli veritabanı yedeklemeleri alın
- **Updates**: Güvenlik güncellemelerini düzenli yapın

---

## 🆘 Sorun Giderme

### API 500 Hatası
- PHP error log'larını kontrol et: `/var/log/apache2/error.log`
- Database bağlantısını kontrol et
- File permissions'ı kontrol et

### Frontend Build Hatası
- Node.js versiyonunu kontrol et
- `node_modules` sil ve tekrar `npm install` yap
- Environment variables'ı kontrol et

### CORS Hatası
- `cors_headers.php` dosyasını kontrol et
- Domain'in doğru yazıldığından emin ol

---

**Son Güncelleme**: 2025
**Versiyon**: 1.0

