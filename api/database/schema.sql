-- Enhanced Database Schema for İş Arama (Job Search) Platform

-- Cities Table
CREATE TABLE Sehirler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isim VARCHAR(255) NOT NULL
);

-- Districts Table
CREATE TABLE Ilceler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isim VARCHAR(255) NOT NULL,
    sehir_id INT,
    FOREIGN KEY (sehir_id) REFERENCES Sehirler(id)
);

-- Categories Table
CREATE TABLE Kategoriler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isim VARCHAR(255) NOT NULL,
    aciklama TEXT
);

-- Companies Table
CREATE TABLE Firmalar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isim VARCHAR(255) NOT NULL,
    sehir_id INT,
    ilce_id INT,
    kategori_id INT,
    adres TEXT,
    telefon VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    logo_url VARCHAR(255),
    aciklama TEXT,
    kurulus_tarihi DATE,
    calisan_sayisi INT,
    FOREIGN KEY (sehir_id) REFERENCES Sehirler(id),
    FOREIGN KEY (ilce_id) REFERENCES Ilceler(id),
    FOREIGN KEY (kategori_id) REFERENCES Kategoriler(id)
);

-- Job Listings Table
CREATE TABLE Ilanlar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    baslik VARCHAR(255) NOT NULL,
    firma_id INT,
    kategori_id INT,
    sehir_id INT,
    ilce_id INT,
    aciklama TEXT,
    gereksinimler TEXT,
    maas_aralik VARCHAR(100),
    calisma_sekli VARCHAR(50), -- full-time, part-time, remote, etc.
    pozisyon_seviyesi VARCHAR(50), -- entry, mid, senior
    son_basvuru_tarihi DATE,
    yayinlanma_tarihi DATE,
    aktif BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (firma_id) REFERENCES Firmalar(id),
    FOREIGN KEY (kategori_id) REFERENCES Kategoriler(id),
    FOREIGN KEY (sehir_id) REFERENCES Sehirler(id),
    FOREIGN KEY (ilce_id) REFERENCES Ilceler(id)
);

-- Users Table
CREATE TABLE Kullanicilar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isim VARCHAR(255) NOT NULL,
    soyisim VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    sifre VARCHAR(255) NOT NULL,
    telefon VARCHAR(20),
    dogum_tarihi DATE,
    cinsiyet VARCHAR(20),
    sehir_id INT,
    ilce_id INT,
    adres TEXT,
    profil_resmi VARCHAR(255),
    kayit_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    son_giris DATETIME,
    aktif BOOLEAN DEFAULT TRUE,
    rol VARCHAR(20) DEFAULT 'is_arayan', -- is_arayan, firma, admin
    FOREIGN KEY (sehir_id) REFERENCES Sehirler(id),
    FOREIGN KEY (ilce_id) REFERENCES Ilceler(id)
);

-- Applications Table
CREATE TABLE Basvurular (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_id INT,
    ilan_id INT,
    basvuru_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    durum VARCHAR(50) DEFAULT 'beklemede', -- beklemede, inceleniyor, reddedildi, kabul_edildi, mülakat
    notlar TEXT,
    FOREIGN KEY (kullanici_id) REFERENCES Kullanicilar(id),
    FOREIGN KEY (ilan_id) REFERENCES Ilanlar(id)
);

-- Professions Table
CREATE TABLE Meslekler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isim VARCHAR(255) NOT NULL,
    kategori_id INT,
    aciklama TEXT,
    gereken_beceriler TEXT,
    FOREIGN KEY (kategori_id) REFERENCES Kategoriler(id)
);

-- User Skills Table
CREATE TABLE Beceriler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isim VARCHAR(255) NOT NULL,
    kategori_id INT,
    FOREIGN KEY (kategori_id) REFERENCES Kategoriler(id)
);

-- User-Skills Relation Table
CREATE TABLE KullaniciBeceriler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_id INT,
    beceri_id INT,
    seviye INT, -- 1-5
    FOREIGN KEY (kullanici_id) REFERENCES Kullanicilar(id),
    FOREIGN KEY (beceri_id) REFERENCES Beceriler(id)
);

-- Resumes Table
CREATE TABLE Ozgecmisler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_id INT,
    ozgecmis TEXT,
    egitim TEXT,
    deneyim TEXT,
    beceriler TEXT,
    diller TEXT,
    sertifikalar TEXT,
    referanslar TEXT,
    dosya_url VARCHAR(255),
    guncelleme_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kullanici_id) REFERENCES Kullanicilar(id)
);

-- Messages Table
CREATE TABLE Mesajlar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gonderen_id INT,
    alici_id INT,
    konu VARCHAR(255),
    mesaj TEXT,
    okundu BOOLEAN DEFAULT FALSE,
    gonderme_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    silindi_gonderen BOOLEAN DEFAULT FALSE,
    silindi_alici BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (gonderen_id) REFERENCES Kullanicilar(id),
    FOREIGN KEY (alici_id) REFERENCES Kullanicilar(id)
);

-- Company Ratings Table
CREATE TABLE Degerlendirmeler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_id INT,
    firma_id INT,
    puan INT CHECK (puan BETWEEN 1 AND 5),
    yorum TEXT,
    tarih DATETIME DEFAULT CURRENT_TIMESTAMP,
    onaylandi BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (kullanici_id) REFERENCES Kullanicilar(id),
    FOREIGN KEY (firma_id) REFERENCES Firmalar(id)
);

-- Urgent Job Listings Table
CREATE TABLE AcilIlanlar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ilan_id INT,
    bitis_tarihi DATE,
    FOREIGN KEY (ilan_id) REFERENCES Ilanlar(id)
);

-- Part-Time Job Listings Table
CREATE TABLE PartTimeIlanlar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ilan_id INT,
    haftalik_saat INT,
    FOREIGN KEY (ilan_id) REFERENCES Ilanlar(id)
);

-- Saved Jobs Table
CREATE TABLE KaydedilenIlanlar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_id INT,
    ilan_id INT,
    kayit_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kullanici_id) REFERENCES Kullanicilar(id),
    FOREIGN KEY (ilan_id) REFERENCES Ilanlar(id)
);

-- Job Alerts Table
CREATE TABLE IsAlarmları (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_id INT,
    kategori_id INT,
    anahtar_kelimeler TEXT,
    sehir_id INT,
    bildirim_sikligi VARCHAR(20), -- günlük, haftalık, aylık
    aktif BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (kullanici_id) REFERENCES Kullanicilar(id),
    FOREIGN KEY (kategori_id) REFERENCES Kategoriler(id),
    FOREIGN KEY (sehir_id) REFERENCES Sehirler(id)
);

-- Company Followers Table
CREATE TABLE FirmaTakipcileri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_id INT,
    firma_id INT,
    takip_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kullanici_id) REFERENCES Kullanicilar(id),
    FOREIGN KEY (firma_id) REFERENCES Firmalar(id)
);

-- Job Interview Table
CREATE TABLE Mulakatlar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    basvuru_id INT,
    tarih DATETIME,
    yer TEXT,
    notlar TEXT,
    durum VARCHAR(50) DEFAULT 'planlandı', -- planlandı, tamamlandı, iptal_edildi
    FOREIGN KEY (basvuru_id) REFERENCES Basvurular(id)
);
