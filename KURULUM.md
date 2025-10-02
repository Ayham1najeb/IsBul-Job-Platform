# İş Bul - Kurulum Kılavuzu

## 📁 Proje Yapısı

```
C:\xampp\htdocs\IsBul\
├── api/                    # PHP Backend (XAMPP üzerinde çalışır)
├── client/                 # React Frontend (npm gerektirir)
├── database/              # SQL şema dosyaları
├── uploads/               # Yüklenen dosyalar
└── README.md
```

## ⚠️ ÖNEMLİ: İki Ayrı Kısım Var!

### 1️⃣ Backend (PHP) - XAMPP
- **Konum**: `C:\xampp\htdocs\IsBul\api\`
- **Çalışma**: Apache üzerinde otomatik
- **npm install GEREKMİYOR!** ❌

### 2️⃣ Frontend (React) - Node.js
- **Konum**: `C:\xampp\htdocs\IsBul\client\`
- **Çalışma**: Vite dev server
- **npm install GEREKLİ!** ✅

---

## 🚀 Kurulum Adımları

### Adım 1: XAMPP'i Başlat
```bash
1. XAMPP Control Panel'i aç
2. Apache'yi başlat ✅
3. MySQL'i başlat ✅
```

### Adım 2: Veritabanını Oluştur
```bash
1. http://localhost/phpmyadmin adresine git
2. Yeni veritabanı oluştur: "isbul"
3. SQL sekmesine git
4. C:\xampp\htdocs\IsBul\database\schema.sql dosyasını içe aktar
```

### Adım 3: Backend Test Et
```bash
# Tarayıcıda aç:
http://localhost/IsBul/api

# Göreceğin mesaj:
{
  "message": "İş Bul (Job Search) API'ye Hoş Geldiniz",
  "version": "2.0.0"
}
```

✅ Backend çalışıyor! npm install GEREKMEDİ!

### Adım 4: Frontend Kurulumu
```bash
# ŞİMDİ client klasörüne git:
cd C:\xampp\htdocs\IsBul\client

# Bağımlılıkları yükle (sadece ilk kez):
npm install

# Dev server'ı başlat:
npm run dev

# Tarayıcıda aç:
http://localhost:5173
```

---

## 🎯 Neden İki Ayrı Kurulum?

### PHP Backend (api/)
```
❌ npm install GEREKMİYOR
✅ XAMPP Apache otomatik çalıştırır
✅ PHP dosyaları doğrudan çalışır
```

### React Frontend (client/)
```
✅ npm install GEREKLİ
✅ Node.js bağımlılıkları var
✅ Vite build tool kullanıyor
```

---

## 📊 Çalışma Şeması

```
┌─────────────────────────────────────┐
│  Tarayıcı (http://localhost:5173)  │
│         React Frontend              │
└──────────────┬──────────────────────┘
               │ HTTP Request
               ↓
┌─────────────────────────────────────┐
│  XAMPP Apache                       │
│  (http://localhost/IsBul/api)       │
│         PHP Backend                 │
└──────────────┬──────────────────────┘
               │ SQL Query
               ↓
┌─────────────────────────────────────┐
│  XAMPP MySQL                        │
│         Database (isbul)            │
└─────────────────────────────────────┘
```

---

## 🔧 Komutlar Özeti

### Backend (Kök Dizinde - npm install GEREKMİYOR!)
```bash
# Hiçbir şey yapma! XAMPP otomatik çalıştırır
# Sadece test et:
http://localhost/IsBul/api
```

### Frontend (client/ dizininde)
```bash
# İlk kez kurulum:
cd C:\xampp\htdocs\IsBul\client
npm install

# Her çalıştırmada:
npm run dev

# Build için (üretim):
npm run build
```

---

## ❓ Sık Sorulan Sorular

### S: Neden kök dizinde npm install yok?
**C**: Çünkü backend PHP! Node.js değil. XAMPP Apache kullanıyoruz.

### S: client/ klasöründe neden npm install var?
**C**: Çünkü React, Node.js tabanlı. Vite, React, TailwindCSS gibi paketler gerekli.

### S: İki terminal açmam gerekiyor mu?
**C**: Hayır! Sadece bir terminal:
- XAMPP zaten arka planda Apache'yi çalıştırıyor
- Sadece `client/` içinde `npm run dev` çalıştır

### S: Backend'i nasıl durdururum?
**C**: XAMPP Control Panel'den Apache'yi durdur.

### S: Frontend'i nasıl durdururum?
**C**: Terminal'de `Ctrl+C` bas.

---

## 🎓 Bitirme Projesi İçin

### Sunum Sırasında:
```bash
1. XAMPP'i başlat (Apache + MySQL)
2. Terminal aç
3. cd C:\xampp\htdocs\IsBul\client
4. npm run dev
5. Tarayıcıda http://localhost:5173 aç
6. Demo yap! 🎉
```

### Teslim Paketi:
```
IsBul_BitirmeProjesi/
├── Kod/
│   ├── api/              # PHP Backend (npm install GEREKMİYOR)
│   ├── client/           # React Frontend (npm install GEREKLİ)
│   └── database/         # SQL dosyaları
├── Dokümantasyon/
└── README.txt            # Bu kurulum talimatları
```

---

## ✅ Kontrol Listesi

Proje çalışıyor mu?

- [ ] XAMPP Apache çalışıyor
- [ ] XAMPP MySQL çalışıyor
- [ ] Veritabanı "isbul" oluşturuldu
- [ ] http://localhost/IsBul/api açılıyor
- [ ] `client/` içinde `npm install` yapıldı
- [ ] `npm run dev` çalışıyor
- [ ] http://localhost:5173 açılıyor

Hepsi ✅ ise **proje çalışıyor!** 🎉

---

## 🆘 Sorun Giderme

### Backend çalışmıyor:
```bash
1. XAMPP Apache çalışıyor mu kontrol et
2. http://localhost/IsBul/api adresini dene
3. api/config/database.php ayarlarını kontrol et
```

### Frontend çalışmıyor:
```bash
1. cd C:\xampp\htdocs\IsBul\client
2. npm install (tekrar dene)
3. npm run dev
4. Port 5173 kullanımda mı kontrol et
```

### Veritabanı hatası:
```bash
1. phpMyAdmin'de "isbul" veritabanı var mı?
2. schema.sql içe aktarıldı mı?
3. api/config/database.php'de kullanıcı adı/şifre doğru mu?
```

---

**Özet**: Kök dizinde npm install GEREKMİYOR! Sadece `client/` içinde gerekli! 🚀
