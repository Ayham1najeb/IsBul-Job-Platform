-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2025 at 05:58 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `isbul`
--

-- --------------------------------------------------------

--
-- Table structure for table `acililanlar`
--

CREATE TABLE `acililanlar` (
  `id` int(11) NOT NULL,
  `ilan_id` int(11) DEFAULT NULL,
  `bitis_tarihi` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `basvurular`
--

CREATE TABLE `basvurular` (
  `id` int(11) NOT NULL,
  `kullanici_id` int(11) DEFAULT NULL,
  `ilan_id` int(11) DEFAULT NULL,
  `basvuru_tarihi` datetime DEFAULT current_timestamp(),
  `durum` varchar(50) DEFAULT 'beklemede',
  `notlar` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `beceriler`
--

CREATE TABLE `beceriler` (
  `id` int(11) NOT NULL,
  `isim` varchar(255) NOT NULL,
  `kategori_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `degerlendirmeler`
--

CREATE TABLE `degerlendirmeler` (
  `id` int(11) NOT NULL,
  `kullanici_id` int(11) DEFAULT NULL,
  `firma_id` int(11) DEFAULT NULL,
  `puan` int(11) DEFAULT NULL CHECK (`puan` between 1 and 5),
  `yorum` text DEFAULT NULL,
  `tarih` datetime DEFAULT current_timestamp(),
  `onaylandi` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `firmalar`
--

CREATE TABLE `firmalar` (
  `id` int(11) NOT NULL,
  `isim` varchar(255) NOT NULL,
  `sehir_id` int(11) DEFAULT NULL,
  `ilce_id` int(11) DEFAULT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `adres` text DEFAULT NULL,
  `telefon` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `aciklama` text DEFAULT NULL,
  `kurulus_tarihi` date DEFAULT NULL,
  `calisan_sayisi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `firmalar`
--

INSERT INTO `firmalar` (`id`, `isim`, `sehir_id`, `ilce_id`, `kategori_id`, `adres`, `telefon`, `email`, `website`, `logo_url`, `aciklama`, `kurulus_tarihi`, `calisan_sayisi`) VALUES
(1, 'Tech Solutions A.Ş.', 1, NULL, 1, NULL, '0212 555 0001', 'info@techsolutions.com', NULL, NULL, 'Yazılım ve teknoloji çözümleri', NULL, 50),
(2, 'Digital Marketing Pro', 1, NULL, 2, NULL, '0212 555 0002', 'info@digitalmarketing.com', NULL, NULL, 'Dijital pazarlama ajansı', NULL, 30),
(3, 'Creative Design Studio', 1, NULL, 3, NULL, '0212 555 0003', 'info@creativedesign.com', NULL, NULL, 'Tasarım ve kreatif hizmetler', NULL, 20),
(4, 'Finance Consulting', 2, NULL, 4, NULL, '0312 555 0004', 'info@financeconsulting.com', NULL, NULL, 'Mali danışmanlık', NULL, 40);

-- --------------------------------------------------------

--
-- Table structure for table `firmatakipcileri`
--

CREATE TABLE `firmatakipcileri` (
  `id` int(11) NOT NULL,
  `kullanici_id` int(11) DEFAULT NULL,
  `firma_id` int(11) DEFAULT NULL,
  `takip_tarihi` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ilanlar`
--

CREATE TABLE `ilanlar` (
  `id` int(11) NOT NULL,
  `baslik` varchar(255) NOT NULL,
  `firma_id` int(11) DEFAULT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `sehir_id` int(11) DEFAULT NULL,
  `ilce_id` int(11) DEFAULT NULL,
  `aciklama` text DEFAULT NULL,
  `gereksinimler` text DEFAULT NULL,
  `maas_aralik` varchar(100) DEFAULT NULL,
  `egitim_seviyesi` enum('lise','onlisans','lisans','yuksek_lisans','doktora') DEFAULT 'lisans',
  `calisma_sekli` varchar(50) DEFAULT NULL,
  `pozisyon_seviyesi` varchar(50) DEFAULT NULL,
  `son_basvuru_tarihi` date DEFAULT NULL,
  `yayinlanma_tarihi` date DEFAULT NULL,
  `aktif` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ilanlar`
--

INSERT INTO `ilanlar` (`id`, `baslik`, `firma_id`, `kategori_id`, `sehir_id`, `ilce_id`, `aciklama`, `gereksinimler`, `maas_aralik`, `egitim_seviyesi`, `calisma_sekli`, `pozisyon_seviyesi`, `son_basvuru_tarihi`, `yayinlanma_tarihi`, `aktif`) VALUES
(1, 'Senior Frontend Developer', 1, 1, 1, NULL, 'React ve TypeScript ile çalışacak deneyimli frontend developer arıyoruz. Modern web teknolojileri ile kullanıcı dostu arayüzler geliştirme fırsatı.', 'React, TypeScript, 5+ yıl deneyim, Redux, REST API', '25000-35000 TL', 'lisans', 'hybrid', 'senior', '2025-11-01', '2025-10-02', 1),
(2, 'Backend Developer', 1, 1, 1, NULL, 'Node.js ve MongoDB ile backend geliştirme yapacak developer. Ölçeklenebilir API\'ler geliştirme deneyimi.', 'Node.js, MongoDB, REST API, Express.js', '20000-28000 TL', 'lisans', 'remote', 'mid', '2025-11-01', '2025-10-02', 1),
(3, 'Full Stack Developer', 1, 1, 2, NULL, 'Hem frontend hem backend geliştirebilecek full stack developer. Tam kapsamlı proje geliştirme.', 'React, Node.js, PostgreSQL, Docker', '30000-40000 TL', 'lisans', 'full-time', 'senior', '2025-11-01', '2025-10-02', 1),
(4, 'Junior Frontend Developer', 1, 1, 1, NULL, 'Kariyerine başlayan, öğrenmeye açık frontend developer. Mentorluk desteği sağlanacak.', 'HTML, CSS, JavaScript, React (temel)', '12000-18000 TL', 'lisans', 'full-time', 'entry', '2025-11-01', '2025-10-02', 1),
(5, 'Dijital Pazarlama Uzmanı', 2, 2, 1, NULL, 'SEO, SEM ve sosyal medya yönetimi yapacak pazarlama uzmanı. Kampanya yönetimi ve analiz.', 'Google Ads, Facebook Ads, SEO, Analytics', '15000-22000 TL', 'lisans', 'full-time', 'mid', '2025-11-01', '2025-10-02', 1),
(6, 'İçerik Pazarlama Müdürü', 2, 2, 3, NULL, 'İçerik stratejisi ve yönetimi yapacak müdür. Takım liderliği ve strateji geliştirme.', 'İçerik stratejisi, 5+ yıl deneyim, Takım yönetimi', '28000-38000 TL', 'lisans', 'hybrid', 'senior', '2025-11-01', '2025-10-02', 1),
(7, 'Sosyal Medya Uzmanı', 2, 2, 1, NULL, 'Sosyal medya hesaplarını yönetecek, içerik üretecek uzman arıyoruz.', 'Instagram, Twitter, LinkedIn, İçerik üretimi', '13000-19000 TL', 'lisans', 'remote', 'entry', '2025-11-01', '2025-10-02', 1),
(8, 'UI/UX Designer', 3, 3, 1, NULL, 'Kullanıcı deneyimi ve arayüz tasarımı yapacak designer. Kullanıcı araştırması ve prototipleme.', 'Figma, Adobe XD, UI/UX, Kullanıcı araştırması', '18000-25000 TL', 'lisans', 'remote', 'mid', '2025-11-01', '2025-10-02', 1),
(9, 'Grafik Tasarımcı', 3, 3, 1, NULL, 'Görsel içerik ve grafik tasarım yapacak tasarımcı. Dijital ve basılı medya tasarımı.', 'Photoshop, Illustrator, InDesign', '12000-18000 TL', 'lisans', 'full-time', 'entry', '2025-11-01', '2025-10-02', 1),
(10, 'Senior Product Designer', 3, 3, 1, NULL, 'Ürün tasarımı ve kullanıcı deneyimi konusunda uzman tasarımcı. Tasarım sistemi yönetimi.', 'Figma, Sketch, Design Systems, 5+ yıl', '25000-35000 TL', 'lisans', 'hybrid', 'senior', '2025-11-01', '2025-10-02', 1),
(11, 'Mali Müşavir', 4, 4, 2, NULL, 'Şirket mali işlerini yönetecek mali müşavir. Vergi danışmanlığı ve mali raporlama.', 'SMMM, 3+ yıl deneyim, Vergi mevzuatı', '22000-30000 TL', 'lisans', 'full-time', 'senior', '2025-11-01', '2025-10-02', 1),
(12, 'Muhasebe Elemanı', 4, 4, 2, NULL, 'Günlük muhasebe işlemlerini yapacak eleman. Fatura ve dekont takibi.', 'Muhasebe bilgisi, Excel, Logo/Eta', '10000-15000 TL', 'lisans', 'full-time', 'entry', '2025-11-01', '2025-10-02', 1),
(13, 'Finans Analisti', 4, 4, 1, NULL, 'Finansal analiz ve raporlama yapacak analist. Bütçe planlama ve takip.', 'Excel, Power BI, Finansal analiz, 2+ yıl', '18000-25000 TL', 'lisans', 'full-time', 'mid', '2025-11-01', '2025-10-02', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ilceler`
--

CREATE TABLE `ilceler` (
  `id` int(11) NOT NULL,
  `isim` varchar(255) NOT NULL,
  `sehir_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `isalarmları`
--

CREATE TABLE `isalarmları` (
  `id` int(11) NOT NULL,
  `kullanici_id` int(11) DEFAULT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `anahtar_kelimeler` text DEFAULT NULL,
  `sehir_id` int(11) DEFAULT NULL,
  `bildirim_sikligi` varchar(20) DEFAULT NULL,
  `aktif` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategoriler`
--

CREATE TABLE `kategoriler` (
  `id` int(11) NOT NULL,
  `isim` varchar(255) NOT NULL,
  `aciklama` text DEFAULT NULL,
  `ikon` varchar(10) DEFAULT '?'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategoriler`
--

INSERT INTO `kategoriler` (`id`, `isim`, `aciklama`, `ikon`) VALUES
(1, 'Yazılım & Teknoloji', 'Yazılım geliştirme, IT ve teknoloji pozisyonları', '📁'),
(2, 'Pazarlama & Satış', 'Pazarlama, satış ve müşteri ilişkileri', '📁'),
(3, 'Tasarım & Kreatif', 'Grafik tasarım, UI/UX ve kreatif pozisyonlar', '📁'),
(4, 'Finans & Muhasebe', 'Finans, muhasebe ve ekonomi', '📁'),
(5, 'Mühendislik', 'Makine, elektrik, inşaat mühendisliği', '📁'),
(6, 'Satış & İş Geliştirme', 'Satış temsilcisi ve iş geliştirme', '📁'),
(7, 'Eğitim & Öğretim', 'Öğretmenlik ve eğitim danışmanlığı', '📁'),
(8, 'İnsan Kaynakları', 'İK, işe alım ve personel yönetimi', '📁'),
(9, 'Sağlık', 'Sağlık hizmetleri ve tıbbi pozisyonlar', '📁'),
(10, 'Hukuk', 'Avukatlık ve hukuk danışmanlığı', '📁'),
(11, 'Üretim & Lojistik', 'Üretim, lojistik ve tedarik zinciri', '📁'),
(12, 'Müşteri Hizmetleri', 'Müşteri destek ve çağrı merkezi', '📁'),
(13, 'Medya & İletişim', 'Gazetecilik, PR ve medya', '📁'),
(14, 'Turizm & Otelcilik', 'Turizm, otel ve restoran yönetimi', '📁'),
(15, 'Güvenlik', 'Güvenlik ve koruma hizmetleri', '📁');

-- --------------------------------------------------------

--
-- Table structure for table `kaydedilenilanlar`
--

CREATE TABLE `kaydedilenilanlar` (
  `id` int(11) NOT NULL,
  `kullanici_id` int(11) DEFAULT NULL,
  `ilan_id` int(11) DEFAULT NULL,
  `kayit_tarihi` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kullanicibeceriler`
--

CREATE TABLE `kullanicibeceriler` (
  `id` int(11) NOT NULL,
  `kullanici_id` int(11) DEFAULT NULL,
  `beceri_id` int(11) DEFAULT NULL,
  `seviye` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kullanicilar`
--

CREATE TABLE `kullanicilar` (
  `id` int(11) NOT NULL,
  `isim` varchar(255) NOT NULL,
  `soyisim` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `profil_foto` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `sektor_id` int(11) DEFAULT NULL,
  `sifre` varchar(255) NOT NULL,
  `telefon` varchar(20) DEFAULT NULL,
  `dogum_tarihi` date DEFAULT NULL,
  `cinsiyet` varchar(20) DEFAULT NULL,
  `sehir_id` int(11) DEFAULT NULL,
  `ilce_id` int(11) DEFAULT NULL,
  `adres` text DEFAULT NULL,
  `profil_resmi` varchar(255) DEFAULT NULL,
  `kayit_tarihi` datetime DEFAULT current_timestamp(),
  `son_giris` datetime DEFAULT NULL,
  `aktif` tinyint(1) DEFAULT 1,
  `rol` varchar(20) DEFAULT 'is_arayan'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kullanicilar`
--

INSERT INTO `kullanicilar` (`id`, `isim`, `soyisim`, `email`, `profil_foto`, `website`, `sektor_id`, `sifre`, `telefon`, `dogum_tarihi`, `cinsiyet`, `sehir_id`, `ilce_id`, `adres`, `profil_resmi`, `kayit_tarihi`, `son_giris`, `aktif`, `rol`) VALUES
(1, 'ayham', 'najip', 'admin@admin.com', 'http://localhost/IsBul/uploads/profiles/user_1_1760371009.png', NULL, NULL, '$2y$10$Sdv54tISVxJspLSNjS85DurL4OmXYjVFsYQv998/MDBDTP/DXbeUi', '', NULL, NULL, NULL, NULL, NULL, NULL, '2025-10-02 15:37:17', '2025-10-13 08:56:54', 1, 'is_arayan'),
(2, 'ihsan', 'alapsi', 'admin@admi.com', NULL, NULL, NULL, '$2y$10$yznpujlxRpuWFt2Qx/rzYeexbhjQkZSxD.2gZoamnB31wX09VkU7a', '', NULL, NULL, NULL, NULL, NULL, NULL, '2025-10-04 09:59:51', NULL, 1, 'is_arayan');

-- --------------------------------------------------------

--
-- Table structure for table `mesajlar`
--

CREATE TABLE `mesajlar` (
  `id` int(11) NOT NULL,
  `gonderen_id` int(11) DEFAULT NULL,
  `alici_id` int(11) DEFAULT NULL,
  `konu` varchar(255) DEFAULT NULL,
  `mesaj` text DEFAULT NULL,
  `okundu` tinyint(1) DEFAULT 0,
  `gonderme_tarihi` datetime DEFAULT current_timestamp(),
  `silindi_gonderen` tinyint(1) DEFAULT 0,
  `silindi_alici` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `meslekler`
--

CREATE TABLE `meslekler` (
  `id` int(11) NOT NULL,
  `isim` varchar(255) NOT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `aciklama` text DEFAULT NULL,
  `gereken_beceriler` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mulakatlar`
--

CREATE TABLE `mulakatlar` (
  `id` int(11) NOT NULL,
  `basvuru_id` int(11) DEFAULT NULL,
  `tarih` datetime DEFAULT NULL,
  `yer` text DEFAULT NULL,
  `notlar` text DEFAULT NULL,
  `durum` varchar(50) DEFAULT 'planlandı'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ozgecmisler`
--

CREATE TABLE `ozgecmisler` (
  `id` int(11) NOT NULL,
  `kullanici_id` int(11) DEFAULT NULL,
  `ozgecmis` text DEFAULT NULL,
  `egitim` text DEFAULT NULL,
  `deneyim` text DEFAULT NULL,
  `beceriler` text DEFAULT NULL,
  `diller` text DEFAULT NULL,
  `sertifikalar` text DEFAULT NULL,
  `referanslar` text DEFAULT NULL,
  `dosya_url` varchar(255) DEFAULT NULL,
  `guncelleme_tarihi` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `parttimeilanlar`
--

CREATE TABLE `parttimeilanlar` (
  `id` int(11) NOT NULL,
  `ilan_id` int(11) DEFAULT NULL,
  `haftalik_saat` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sehirler`
--

CREATE TABLE `sehirler` (
  `id` int(11) NOT NULL,
  `isim` varchar(255) NOT NULL,
  `bolge` varchar(50) DEFAULT 'Diğer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sehirler`
--

INSERT INTO `sehirler` (`id`, `isim`, `bolge`) VALUES
(1, 'İstanbul', 'Diğer'),
(2, 'Ankara', 'Diğer'),
(3, 'İzmir', 'Diğer'),
(4, 'Bursa', 'Diğer'),
(5, 'Antalya', 'Diğer'),
(6, 'Adana', 'Diğer'),
(7, 'Konya', 'Diğer'),
(8, 'Gaziantep', 'Diğer'),
(9, 'Şanlıurfa', 'Diğer'),
(10, 'Kocaeli', 'Diğer'),
(11, 'Mersin', 'Diğer'),
(12, 'Diyarbakır', 'Diğer'),
(13, 'Hatay', 'Diğer'),
(14, 'Manisa', 'Diğer'),
(15, 'Kayseri', 'Diğer'),
(16, 'Samsun', 'Diğer'),
(17, 'Balıkesir', 'Diğer'),
(18, 'Kahramanmaraş', 'Diğer'),
(19, 'Van', 'Diğer'),
(20, 'Aydın', 'Diğer'),
(21, 'Denizli', 'Diğer'),
(22, 'Sakarya', 'Diğer'),
(23, 'Tekirdağ', 'Diğer'),
(24, 'Muğla', 'Diğer'),
(25, 'Eskişehir', 'Diğer'),
(26, 'Mardin', 'Diğer'),
(27, 'Malatya', 'Diğer'),
(28, 'Erzurum', 'Diğer'),
(29, 'Trabzon', 'Diğer'),
(30, 'Elazığ', 'Diğer');

-- --------------------------------------------------------

--
-- Table structure for table `sektorler`
--

CREATE TABLE `sektorler` (
  `id` int(11) NOT NULL,
  `isim` varchar(100) NOT NULL,
  `aciklama` text DEFAULT NULL,
  `olusturulma_tarihi` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sektorler`
--

INSERT INTO `sektorler` (`id`, `isim`, `aciklama`, `olusturulma_tarihi`) VALUES
(1, 'Bilgi Teknolojileri', 'Yazılım, donanım ve IT hizmetleri', '2025-10-02 21:45:57'),
(2, 'Finans', 'Bankacılık, sigorta ve finans hizmetleri', '2025-10-02 21:45:57'),
(3, 'Sağlık', 'Hastane, klinik ve sağlık kuruluşları', '2025-10-02 21:45:57'),
(4, 'Eğitim', 'Okul, üniversite ve eğitim kurumları', '2025-10-02 21:45:57'),
(5, 'Perakende', 'Mağaza ve perakende satış', '2025-10-02 21:45:57'),
(6, 'Üretim', 'İmalat ve üretim tesisleri', '2025-10-02 21:45:57'),
(7, 'İnşaat', 'İnşaat ve gayrimenkul', '2025-10-02 21:45:57'),
(8, 'Turizm', 'Otel, restoran ve turizm', '2025-10-02 21:45:57'),
(9, 'Lojistik', 'Taşımacılık ve lojistik', '2025-10-02 21:45:57'),
(10, 'Enerji', 'Enerji ve doğal kaynaklar', '2025-10-02 21:45:57'),
(11, 'Telekomünikasyon', 'İletişim ve telekomünikasyon', '2025-10-02 21:45:57'),
(12, 'Medya', 'Gazete, TV ve dijital medya', '2025-10-02 21:45:57'),
(13, 'Otomotiv', 'Otomotiv ve yan sanayi', '2025-10-02 21:45:57'),
(14, 'Gıda', 'Gıda üretim ve dağıtım', '2025-10-02 21:45:57'),
(15, 'Tekstil', 'Tekstil ve hazır giyim', '2025-10-02 21:45:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `acililanlar`
--
ALTER TABLE `acililanlar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ilan_id` (`ilan_id`);

--
-- Indexes for table `basvurular`
--
ALTER TABLE `basvurular`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_basvurular_kullanici` (`kullanici_id`),
  ADD KEY `idx_basvurular_ilan` (`ilan_id`),
  ADD KEY `idx_basvurular_durum` (`durum`);

--
-- Indexes for table `beceriler`
--
ALTER TABLE `beceriler`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategori_id` (`kategori_id`);

--
-- Indexes for table `degerlendirmeler`
--
ALTER TABLE `degerlendirmeler`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kullanici_id` (`kullanici_id`),
  ADD KEY `firma_id` (`firma_id`);

--
-- Indexes for table `firmalar`
--
ALTER TABLE `firmalar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sehir_id` (`sehir_id`),
  ADD KEY `ilce_id` (`ilce_id`),
  ADD KEY `kategori_id` (`kategori_id`);

--
-- Indexes for table `firmatakipcileri`
--
ALTER TABLE `firmatakipcileri`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kullanici_id` (`kullanici_id`),
  ADD KEY `firma_id` (`firma_id`);

--
-- Indexes for table `ilanlar`
--
ALTER TABLE `ilanlar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `firma_id` (`firma_id`),
  ADD KEY `ilce_id` (`ilce_id`),
  ADD KEY `idx_ilanlar_kategori` (`kategori_id`),
  ADD KEY `idx_ilanlar_sehir` (`sehir_id`),
  ADD KEY `idx_ilanlar_calisma_sekli` (`calisma_sekli`);

--
-- Indexes for table `ilceler`
--
ALTER TABLE `ilceler`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sehir_id` (`sehir_id`);

--
-- Indexes for table `isalarmları`
--
ALTER TABLE `isalarmları`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kullanici_id` (`kullanici_id`),
  ADD KEY `kategori_id` (`kategori_id`),
  ADD KEY `sehir_id` (`sehir_id`);

--
-- Indexes for table `kategoriler`
--
ALTER TABLE `kategoriler`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_kategori_isim` (`isim`);

--
-- Indexes for table `kaydedilenilanlar`
--
ALTER TABLE `kaydedilenilanlar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kullanici_id` (`kullanici_id`),
  ADD KEY `ilan_id` (`ilan_id`);

--
-- Indexes for table `kullanicibeceriler`
--
ALTER TABLE `kullanicibeceriler`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kullanici_id` (`kullanici_id`),
  ADD KEY `beceri_id` (`beceri_id`);

--
-- Indexes for table `kullanicilar`
--
ALTER TABLE `kullanicilar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `ilce_id` (`ilce_id`),
  ADD KEY `fk_kullanici_sektor` (`sektor_id`),
  ADD KEY `fk_kullanici_sehir` (`sehir_id`);

--
-- Indexes for table `mesajlar`
--
ALTER TABLE `mesajlar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gonderen_id` (`gonderen_id`),
  ADD KEY `alici_id` (`alici_id`);

--
-- Indexes for table `meslekler`
--
ALTER TABLE `meslekler`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategori_id` (`kategori_id`);

--
-- Indexes for table `mulakatlar`
--
ALTER TABLE `mulakatlar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `basvuru_id` (`basvuru_id`);

--
-- Indexes for table `ozgecmisler`
--
ALTER TABLE `ozgecmisler`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kullanici_id` (`kullanici_id`);

--
-- Indexes for table `parttimeilanlar`
--
ALTER TABLE `parttimeilanlar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ilan_id` (`ilan_id`);

--
-- Indexes for table `sehirler`
--
ALTER TABLE `sehirler`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_sehir_isim` (`isim`);

--
-- Indexes for table `sektorler`
--
ALTER TABLE `sektorler`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `isim` (`isim`),
  ADD UNIQUE KEY `unique_sektor_isim` (`isim`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `acililanlar`
--
ALTER TABLE `acililanlar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `basvurular`
--
ALTER TABLE `basvurular`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beceriler`
--
ALTER TABLE `beceriler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `degerlendirmeler`
--
ALTER TABLE `degerlendirmeler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `firmalar`
--
ALTER TABLE `firmalar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `firmatakipcileri`
--
ALTER TABLE `firmatakipcileri`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ilanlar`
--
ALTER TABLE `ilanlar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `ilceler`
--
ALTER TABLE `ilceler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `isalarmları`
--
ALTER TABLE `isalarmları`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategoriler`
--
ALTER TABLE `kategoriler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `kaydedilenilanlar`
--
ALTER TABLE `kaydedilenilanlar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kullanicibeceriler`
--
ALTER TABLE `kullanicibeceriler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kullanicilar`
--
ALTER TABLE `kullanicilar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mesajlar`
--
ALTER TABLE `mesajlar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meslekler`
--
ALTER TABLE `meslekler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mulakatlar`
--
ALTER TABLE `mulakatlar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ozgecmisler`
--
ALTER TABLE `ozgecmisler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `parttimeilanlar`
--
ALTER TABLE `parttimeilanlar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sehirler`
--
ALTER TABLE `sehirler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `sektorler`
--
ALTER TABLE `sektorler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `acililanlar`
--
ALTER TABLE `acililanlar`
  ADD CONSTRAINT `acililanlar_ibfk_1` FOREIGN KEY (`ilan_id`) REFERENCES `ilanlar` (`id`);

--
-- Constraints for table `basvurular`
--
ALTER TABLE `basvurular`
  ADD CONSTRAINT `basvurular_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`),
  ADD CONSTRAINT `basvurular_ibfk_2` FOREIGN KEY (`ilan_id`) REFERENCES `ilanlar` (`id`);

--
-- Constraints for table `beceriler`
--
ALTER TABLE `beceriler`
  ADD CONSTRAINT `beceriler_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `kategoriler` (`id`);

--
-- Constraints for table `degerlendirmeler`
--
ALTER TABLE `degerlendirmeler`
  ADD CONSTRAINT `degerlendirmeler_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`),
  ADD CONSTRAINT `degerlendirmeler_ibfk_2` FOREIGN KEY (`firma_id`) REFERENCES `firmalar` (`id`);

--
-- Constraints for table `firmalar`
--
ALTER TABLE `firmalar`
  ADD CONSTRAINT `firmalar_ibfk_1` FOREIGN KEY (`sehir_id`) REFERENCES `sehirler` (`id`),
  ADD CONSTRAINT `firmalar_ibfk_2` FOREIGN KEY (`ilce_id`) REFERENCES `ilceler` (`id`),
  ADD CONSTRAINT `firmalar_ibfk_3` FOREIGN KEY (`kategori_id`) REFERENCES `kategoriler` (`id`);

--
-- Constraints for table `firmatakipcileri`
--
ALTER TABLE `firmatakipcileri`
  ADD CONSTRAINT `firmatakipcileri_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`),
  ADD CONSTRAINT `firmatakipcileri_ibfk_2` FOREIGN KEY (`firma_id`) REFERENCES `firmalar` (`id`);

--
-- Constraints for table `ilanlar`
--
ALTER TABLE `ilanlar`
  ADD CONSTRAINT `ilanlar_ibfk_1` FOREIGN KEY (`firma_id`) REFERENCES `firmalar` (`id`),
  ADD CONSTRAINT `ilanlar_ibfk_2` FOREIGN KEY (`kategori_id`) REFERENCES `kategoriler` (`id`),
  ADD CONSTRAINT `ilanlar_ibfk_3` FOREIGN KEY (`sehir_id`) REFERENCES `sehirler` (`id`),
  ADD CONSTRAINT `ilanlar_ibfk_4` FOREIGN KEY (`ilce_id`) REFERENCES `ilceler` (`id`);

--
-- Constraints for table `ilceler`
--
ALTER TABLE `ilceler`
  ADD CONSTRAINT `ilceler_ibfk_1` FOREIGN KEY (`sehir_id`) REFERENCES `sehirler` (`id`);

--
-- Constraints for table `isalarmları`
--
ALTER TABLE `isalarmları`
  ADD CONSTRAINT `isalarmları_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`),
  ADD CONSTRAINT `isalarmları_ibfk_2` FOREIGN KEY (`kategori_id`) REFERENCES `kategoriler` (`id`),
  ADD CONSTRAINT `isalarmları_ibfk_3` FOREIGN KEY (`sehir_id`) REFERENCES `sehirler` (`id`);

--
-- Constraints for table `kaydedilenilanlar`
--
ALTER TABLE `kaydedilenilanlar`
  ADD CONSTRAINT `kaydedilenilanlar_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`),
  ADD CONSTRAINT `kaydedilenilanlar_ibfk_2` FOREIGN KEY (`ilan_id`) REFERENCES `ilanlar` (`id`);

--
-- Constraints for table `kullanicibeceriler`
--
ALTER TABLE `kullanicibeceriler`
  ADD CONSTRAINT `kullanicibeceriler_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`),
  ADD CONSTRAINT `kullanicibeceriler_ibfk_2` FOREIGN KEY (`beceri_id`) REFERENCES `beceriler` (`id`);

--
-- Constraints for table `kullanicilar`
--
ALTER TABLE `kullanicilar`
  ADD CONSTRAINT `fk_kullanici_sehir` FOREIGN KEY (`sehir_id`) REFERENCES `sehirler` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `kullanicilar_ibfk_1` FOREIGN KEY (`sehir_id`) REFERENCES `sehirler` (`id`),
  ADD CONSTRAINT `kullanicilar_ibfk_2` FOREIGN KEY (`ilce_id`) REFERENCES `ilceler` (`id`);

--
-- Constraints for table `mesajlar`
--
ALTER TABLE `mesajlar`
  ADD CONSTRAINT `mesajlar_ibfk_1` FOREIGN KEY (`gonderen_id`) REFERENCES `kullanicilar` (`id`),
  ADD CONSTRAINT `mesajlar_ibfk_2` FOREIGN KEY (`alici_id`) REFERENCES `kullanicilar` (`id`);

--
-- Constraints for table `meslekler`
--
ALTER TABLE `meslekler`
  ADD CONSTRAINT `meslekler_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `kategoriler` (`id`);

--
-- Constraints for table `mulakatlar`
--
ALTER TABLE `mulakatlar`
  ADD CONSTRAINT `mulakatlar_ibfk_1` FOREIGN KEY (`basvuru_id`) REFERENCES `basvurular` (`id`);

--
-- Constraints for table `ozgecmisler`
--
ALTER TABLE `ozgecmisler`
  ADD CONSTRAINT `ozgecmisler_ibfk_1` FOREIGN KEY (`kullanici_id`) REFERENCES `kullanicilar` (`id`);

--
-- Constraints for table `parttimeilanlar`
--
ALTER TABLE `parttimeilanlar`
  ADD CONSTRAINT `parttimeilanlar_ibfk_1` FOREIGN KEY (`ilan_id`) REFERENCES `ilanlar` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
