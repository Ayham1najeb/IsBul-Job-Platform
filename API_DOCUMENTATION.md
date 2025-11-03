# 📚 API Dokümantasyonu

İş Bul Platformu RESTful API Dokümantasyonu

**Base URL**: `https://api.your-domain.com/api/`

**Authentication**: JWT Token (Bearer Token)

---

## 🔐 Authentication

### Register
```http
POST /auth/register.php
Content-Type: application/json

{
  "isim": "Ahmet",
  "soyisim": "Yılmaz",
  "email": "ahmet@example.com",
  "sifre": "password123",
  "rol": "is_arayan"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Kullanıcı başarıyla kaydedildi",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "isim": "Ahmet",
    "email": "ahmet@example.com",
    "rol": "is_arayan"
  }
}
```

### Login
```http
POST /auth/login.php
Content-Type: application/json

{
  "email": "ahmet@example.com",
  "sifre": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "isim": "Ahmet",
    "email": "ahmet@example.com",
    "rol": "is_arayan"
  }
}
```

---

## 💼 İş İlanları

### Tüm İlanları Listele
```http
GET /jobs/?kategori_id=1&sehir_id=2&calisma_sekli=full-time&limit=20&offset=0
```

**Query Parameters:**
- `kategori_id` (optional): Kategori ID
- `sehir_id` (optional): Şehir ID
- `calisma_sekli` (optional): full-time, part-time, remote
- `arama` (optional): Arama terimi
- `limit` (optional): Sayfa başına kayıt (default: 20)
- `offset` (optional): Başlangıç pozisyonu (default: 0)

**Response:**
```json
{
  "kayitlar": [
    {
      "id": 1,
      "baslik": "Frontend Developer",
      "sirket_isim": "Tech Corp",
      "kategori": "Yazılım",
      "sehir": "İstanbul",
      "calisma_sekli": "full-time",
      "tarih": "2025-01-15"
    }
  ],
  "toplam": 100
}
```

### İlan Detayı
```http
GET /jobs/detail.php?id=1
```

**Response:**
```json
{
  "ilan": {
    "id": 1,
    "baslik": "Frontend Developer",
    "aciklama": "React ve Vue.js bilen...",
    "sirket": {
      "id": 1,
      "isim": "Tech Corp"
    }
  }
}
```

### İlan Oluştur (Şirket - Auth Gerekli)
```http
POST /jobs/create.php
Authorization: Bearer {token}
Content-Type: application/json

{
  "baslik": "Backend Developer",
  "aciklama": "Node.js ve PHP bilen...",
  "kategori_id": 1,
  "sehir_id": 2,
  "calisma_sekli": "full-time",
  "maas_min": 10000,
  "maas_max": 15000
}
```

---

## 📝 Başvurular

### Başvuru Yap (İş Arayan - Auth Gerekli)
```http
POST /applications/create.php
Authorization: Bearer {token}
Content-Type: application/json

{
  "ilan_id": 1,
  "mesaj": "Bu pozisyona ilgi duyuyorum"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Başvuru başarıyla gönderildi",
  "basvuru_id": 1
}
```

### Kullanıcının Başvuruları
```http
GET /applications/user.php
Authorization: Bearer {token}
```

### Şirketin Başvuruları
```http
GET /applications/company.php?ilan_id=1
Authorization: Bearer {token}
```

### Başvuru Durumu Güncelle (Şirket - Auth Gerekli)
```http
PUT /applications/update-status.php
Authorization: Bearer {token}
Content-Type: application/json

{
  "basvuru_id": 1,
  "durum": "kabul"
}
```

---

## 💬 Mesajlar

### Mesaj Gönder (Auth Gerekli)
```http
POST /messages/send.php
Authorization: Bearer {token}
Content-Type: application/json

{
  "alici_id": 2,
  "mesaj": "Merhaba, iş ilanınızla ilgileniyorum",
  "ilan_id": 1
}
```

### Mesajlarım
```http
GET /messages/
Authorization: Bearer {token}
```

### Konuşma
```http
GET /messages/conversation.php?user_id=2
Authorization: Bearer {token}
```

### Yeni Mesajlar (Performans Optimizasyonu)
```http
GET /messages/new-messages.php?user_id=2&last_message_id=100
Authorization: Bearer {token}
```

### Online Durumu
```http
GET /messages/online-status.php?user_id=2
Authorization: Bearer {token}
```

**Response:**
```json
{
  "online": true,
  "son_aktivite": "2025-01-15 10:30:00"
}
```

### Heartbeat (Online Durumu Bildir)
```http
POST /messages/heartbeat.php
Authorization: Bearer {token}
Content-Type: application/json

{
  "diger_kullanici_id": 2
}
```

---

## 👤 Profil

### Profil Bilgileri
```http
GET /users/profile.php
Authorization: Bearer {token}
```

### Profil Güncelle
```http
PUT /users/update.php
Authorization: Bearer {token}
Content-Type: application/json

{
  "isim": "Ahmet",
  "soyisim": "Yılmaz",
  "telefon": "05551234567"
}
```

---

## 📄 Özgeçmiş

### Özgeçmiş Bilgileri
```http
GET /resumes/user-resume.php
Authorization: Bearer {token}
```

### İş Deneyimi Ekle
```http
POST /resumes/experience.php
Authorization: Bearer {token}
Content-Type: application/json

{
  "sirket": "Tech Corp",
  "pozisyon": "Developer",
  "baslangic_tarihi": "2020-01-01",
  "bitis_tarihi": "2023-12-31",
  "aciklama": "React ve Node.js projeleri..."
}
```

---

## 🏢 Şirketler

### Şirket Listesi
```http
GET /companies/?sehir_id=1&kategori_id=2
```

### Şirket Detayı
```http
GET /companies/detail.php?id=1
```

### Şirket Profili Güncelle (Auth Gerekli)
```http
PUT /companies/update.php
Authorization: Bearer {token}
Content-Type: application/json

{
  "isim": "Tech Corp",
  "aciklama": "Yazılım geliştirme şirketi",
  "sehir_id": 1
}
```

---

## 🔔 Bildirimler

### Bildirimlerim
```http
GET /notifications/
Authorization: Bearer {token}
```

### Bildirimi Okundu İşaretle
```http
POST /notifications/mark-read.php
Authorization: Bearer {token}
Content-Type: application/json

{
  "bildirim_id": 1
}
```

### Tümünü Okundu İşaretle
```http
POST /notifications/mark-all-read.php
Authorization: Bearer {token}
```

---

## ⚠️ Hata Kodları

| Kod | Açıklama |
|-----|----------|
| 200 | Başarılı |
| 201 | Oluşturuldu |
| 400 | Hatalı İstek |
| 401 | Yetkilendirme Gerekli |
| 403 | Erişim Reddedildi |
| 404 | Bulunamadı |
| 429 | Çok Fazla İstek (Rate Limit) |
| 500 | Sunucu Hatası |

---

## 📝 Notlar

- Tüm authenticated endpoint'ler `Authorization: Bearer {token}` header'ı gerektirir
- Rate limiting: Dakikada 60 istek
- Pagination: `limit` ve `offset` parametreleri kullanılır
- Tarih formatı: `YYYY-MM-DD` veya `YYYY-MM-DD HH:MM:SS`
- Response format: Her zaman JSON

---

**Son Güncelleme**: 2025
**API Versiyonu**: 1.0

