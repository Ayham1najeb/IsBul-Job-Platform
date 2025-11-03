# 🚀 Backend Deployment - Dependencies Kurulumu

## ⚠️ ÖNEMLİ: Vendor Klasörü Git'e Eklenmez!

`vendor/` klasörü **asla** Git'e eklenmemelidir çünkü:
- Çok büyük (yüzlerce MB)
- Her deployment'ta yeniden oluşturulabilir
- `composer.json` ve `composer.lock` yeterli

---

## 📋 Deployment Sonrası Adımlar

### 1. Composer.json ve Composer.lock Kontrolü

✅ **Git'e eklenmeli**:
- `api/composer.json` ✅
- `api/composer.lock` ✅

❌ **Git'e EKLENMEMELİ**:
- `api/vendor/` ❌ (çok büyük, gereksiz)

### 2. Backend Deployment'ta Dependencies Kurulumu

#### Seçenek 1: 000webhost (File Manager)

1. **File Manager**'a git
2. `api/` klasörüne git
3. **Terminal** veya **SSH** kullan (eğer varsa):
   ```bash
   cd api
   composer install --no-dev --optimize-autoloader
   ```

4. **Eğer SSH yoksa**:
   - `composer.phar` dosyasını indir: https://getcomposer.org/download/
   - File Manager'dan `api/` klasörüne yükle
   - `install-dependencies.sh` script'ini çalıştır (eğer shell access varsa)

#### Seçenek 2: Render (Terminal Access)

Render otomatik olarak `composer.json` algılar ve `composer install` çalıştırır.

Eğer çalıştırmazsa, **Build Command** ekle:
```bash
cd api && composer install --no-dev --optimize-autoloader
```

#### Seçenek 3: Manual Upload

Eğer `composer install` çalıştıramıyorsanız:

1. **Local'de vendor yükle**:
   ```bash
   cd api
   composer install --no-dev --optimize-autoloader
   ```

2. **vendor/ klasörünü ZIP'le**:
   ```bash
   zip -r vendor.zip vendor/
   ```

3. **000webhost File Manager'dan yükle** ve extract et

⚠️ **Not**: Bu yöntem **önerilmez** çünkü vendor çok büyük. Ama eğer composer çalışmıyorsa geçici çözüm olabilir.

---

## 🔧 Composer Kurulumu (Eğer Gerekirse)

### Local'de Test Et

```bash
cd api

# Composer kurulu mu kontrol et
composer --version

# Eğer yoksa, kur
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"

# Dependencies yükle
php composer.phar install --no-dev --optimize-autoloader
# veya
composer install --no-dev --optimize-autoloader
```

### Production'da

```bash
# Production'da sadece production dependencies
composer install --no-dev --optimize-autoloader

# veya
php composer.phar install --no-dev --optimize-autoloader
```

---

## ✅ Kontrol Listesi

Deployment sonrası kontrol:

- [ ] `api/vendor/` klasörü var mı?
- [ ] `api/vendor/autoload.php` dosyası var mı?
- [ ] `api/vendor/phpmailer/` klasörü var mı?
- [ ] Email gönderme test edildi mi?
- [ ] `composer.json` ve `composer.lock` Git'te var mı?

---

## 🐛 Troubleshooting

### Problem: "Class 'PHPMailer\PHPMailer\PHPMailer' not found"

**Çözüm**: 
```bash
cd api
composer install --no-dev --optimize-autoloader
```

### Problem: Composer bulunamıyor

**Çözüm**: 
1. Composer'ı manuel indir: https://getcomposer.org/download/
2. `composer.phar` dosyasını `api/` klasörüne yükle
3. `php composer.phar install` çalıştır

### Problem: SSH/Shell access yok

**Çözüm**: 
1. Local'de `composer install` çalıştır
2. `vendor/` klasörünü ZIP'le
3. File Manager'dan yükle ve extract et

---

**Son Güncelleme**: 15 Ocak 2025

