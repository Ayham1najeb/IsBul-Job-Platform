-- =====================================================
-- İş Bul Platform - Kategoriler ve Filtreler Seed Data
-- =====================================================

-- Önce mevcut verileri temizle (isteğe bağlı - dikkatli kullanın!)
-- DELETE FROM kategoriler;
-- DELETE FROM sehirler;
-- DELETE FROM sektorler;

-- Kategoriler (İş Kategorileri)
-- NOT: Eğer tablo boş değilse, bu INSERT IGNORE kullanarak tekrarları önler
INSERT IGNORE INTO kategoriler (isim, aciklama, ikon) VALUES
('Yazılım & Teknoloji', 'Yazılım geliştirme, IT ve teknoloji pozisyonları', '💻'),
('Pazarlama & Satış', 'Pazarlama, satış ve müşteri ilişkileri', '📊'),
('Tasarım & Kreatif', 'Grafik tasarım, UI/UX ve kreatif pozisyonlar', '🎨'),
('Finans & Muhasebe', 'Finans, muhasebe ve ekonomi', '💰'),
('Mühendislik', 'Makine, elektrik, inşaat mühendisliği', '⚙️'),
('Satış & İş Geliştirme', 'Satış temsilcisi ve iş geliştirme', '🤝'),
('Eğitim & Öğretim', 'Öğretmenlik ve eğitim danışmanlığı', '📚'),
('İnsan Kaynakları', 'İK, işe alım ve personel yönetimi', '👥'),
('Sağlık', 'Sağlık hizmetleri ve tıbbi pozisyonlar', '🏥'),
('Hukuk', 'Avukatlık ve hukuk danışmanlığı', '⚖️'),
('Üretim & Lojistik', 'Üretim, lojistik ve tedarik zinciri', '📦'),
('Müşteri Hizmetleri', 'Müşteri destek ve çağrı merkezi', '📞'),
('Medya & İletişim', 'Gazetecilik, PR ve medya', '📰'),
('Turizm & Otelcilik', 'Turizm, otel ve restoran yönetimi', '🏨'),
('Güvenlik', 'Güvenlik ve koruma hizmetleri', '🛡️');

-- Şehirler (Türkiye'nin büyük şehirleri)
INSERT IGNORE INTO sehirler (isim, bolge) VALUES
('İstanbul', 'Marmara'),
('Ankara', 'İç Anadolu'),
('İzmir', 'Ege'),
('Bursa', 'Marmara'),
('Antalya', 'Akdeniz'),
('Adana', 'Akdeniz'),
('Konya', 'İç Anadolu'),
('Gaziantep', 'Güneydoğu Anadolu'),
('Şanlıurfa', 'Güneydoğu Anadolu'),
('Kocaeli', 'Marmara'),
('Mersin', 'Akdeniz'),
('Diyarbakır', 'Güneydoğu Anadolu'),
('Hatay', 'Akdeniz'),
('Manisa', 'Ege'),
('Kayseri', 'İç Anadolu'),
('Samsun', 'Karadeniz'),
('Balıkesir', 'Marmara'),
('Kahramanmaraş', 'Akdeniz'),
('Van', 'Doğu Anadolu'),
('Aydın', 'Ege'),
('Denizli', 'Ege'),
('Sakarya', 'Marmara'),
('Tekirdağ', 'Marmara'),
('Muğla', 'Ege'),
('Eskişehir', 'İç Anadolu'),
('Mardin', 'Güneydoğu Anadolu'),
('Malatya', 'Doğu Anadolu'),
('Erzurum', 'Doğu Anadolu'),
('Trabzon', 'Karadeniz'),
('Elazığ', 'Doğu Anadolu');

-- Sektörler
INSERT IGNORE INTO sektorler (isim, aciklama) VALUES
('Bilgi Teknolojileri', 'Yazılım, donanım ve IT hizmetleri'),
('Finans', 'Bankacılık, sigorta ve finans hizmetleri'),
('Sağlık', 'Hastane, klinik ve sağlık kuruluşları'),
('Eğitim', 'Okul, üniversite ve eğitim kurumları'),
('Perakende', 'Mağaza ve perakende satış'),
('Üretim', 'İmalat ve üretim tesisleri'),
('İnşaat', 'İnşaat ve gayrimenkul'),
('Turizm', 'Otel, restoran ve turizm'),
('Lojistik', 'Taşımacılık ve lojistik'),
('Enerji', 'Enerji ve doğal kaynaklar'),
('Telekomünikasyon', 'İletişim ve telekomünikasyon'),
('Medya', 'Gazete, TV ve dijital medya'),
('Otomotiv', 'Otomotiv ve yan sanayi'),
('Gıda', 'Gıda üretim ve dağıtım'),
('Tekstil', 'Tekstil ve hazır giyim');

-- Çalışma Şekilleri (Enum değerleri için referans)
-- Bu değerler ilanlar tablosunda enum olarak kullanılıyor:
-- 'full-time', 'part-time', 'remote', 'hybrid', 'contract', 'internship'

-- Pozisyon Seviyeleri (Enum değerleri için referans)
-- 'junior', 'mid-level', 'senior', 'lead', 'manager', 'director'

-- Eğitim Seviyeleri (Enum değerleri için referans)
-- 'lise', 'onlisans', 'lisans', 'yuksek_lisans', 'doktora'

-- =====================================================
-- Örnek İlanlar (Test için)
-- NOT: Schema'daki ilanlar tablosu yapısına uygun
-- =====================================================

-- İlk olarak test için bazı firmalar ekleyelim (eğer yoksa)
INSERT IGNORE INTO firmalar (id, isim, sehir_id, kategori_id, email, telefon, aciklama, calisan_sayisi)
VALUES 
(1, 'Tech Solutions A.Ş.', 1, 1, 'info@techsolutions.com', '0212 555 0001', 'Yazılım ve teknoloji çözümleri', 50),
(2, 'Digital Marketing Pro', 1, 2, 'info@digitalmarketing.com', '0212 555 0002', 'Dijital pazarlama ajansı', 30),
(3, 'Creative Design Studio', 1, 3, 'info@creativedesign.com', '0212 555 0003', 'Tasarım ve kreatif hizmetler', 20),
(4, 'Finance Consulting', 2, 4, 'info@financeconsulting.com', '0312 555 0004', 'Mali danışmanlık', 40);

-- İlanlar ekle (schema'ya uygun sütunlar)
INSERT INTO ilanlar (
    baslik,
    firma_id, 
    kategori_id, 
    sehir_id, 
    aciklama, 
    gereksinimler, 
    maas_aralik,
    calisma_sekli, 
    pozisyon_seviyesi,
    son_basvuru_tarihi,
    yayinlanma_tarihi,
    aktif
) VALUES
-- Yazılım İlanları
('Senior Frontend Developer', 1, 1, 1, 'React ve TypeScript ile çalışacak deneyimli frontend developer arıyoruz. Modern web teknolojileri ile kullanıcı dostu arayüzler geliştirme fırsatı.', 'React, TypeScript, 5+ yıl deneyim, Redux, REST API', '25000-35000 TL', 'hybrid', 'senior', DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), TRUE),

('Backend Developer', 1, 1, 1, 'Node.js ve MongoDB ile backend geliştirme yapacak developer. Ölçeklenebilir API\'ler geliştirme deneyimi.', 'Node.js, MongoDB, REST API, Express.js', '20000-28000 TL', 'remote', 'mid', DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), TRUE),

('Full Stack Developer', 1, 1, 2, 'Hem frontend hem backend geliştirebilecek full stack developer. Tam kapsamlı proje geliştirme.', 'React, Node.js, PostgreSQL, Docker', '30000-40000 TL', 'full-time', 'senior', DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), TRUE),

('Junior Frontend Developer', 1, 1, 1, 'Kariyerine başlayan, öğrenmeye açık frontend developer. Mentorluk desteği sağlanacak.', 'HTML, CSS, JavaScript, React (temel)', '12000-18000 TL', 'full-time', 'entry', DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), TRUE),

-- Pazarlama İlanları
('Dijital Pazarlama Uzmanı', 2, 2, 1, 'SEO, SEM ve sosyal medya yönetimi yapacak pazarlama uzmanı. Kampanya yönetimi ve analiz.', 'Google Ads, Facebook Ads, SEO, Analytics', '15000-22000 TL', 'full-time', 'mid', DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), TRUE),

('İçerik Pazarlama Müdürü', 2, 2, 3, 'İçerik stratejisi ve yönetimi yapacak müdür. Takım liderliği ve strateji geliştirme.', 'İçerik stratejisi, 5+ yıl deneyim, Takım yönetimi', '28000-38000 TL', 'hybrid', 'senior', DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), TRUE),

('Sosyal Medya Uzmanı', 2, 2, 1, 'Sosyal medya hesaplarını yönetecek, içerik üretecek uzman arıyoruz.', 'Instagram, Twitter, LinkedIn, İçerik üretimi', '13000-19000 TL', 'remote', 'entry', DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), TRUE),

-- Tasarım İlanları
('UI/UX Designer', 3, 3, 1, 'Kullanıcı deneyimi ve arayüz tasarımı yapacak designer. Kullanıcı araştırması ve prototipleme.', 'Figma, Adobe XD, UI/UX, Kullanıcı araştırması', '18000-25000 TL', 'remote', 'mid', DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), TRUE),

('Grafik Tasarımcı', 3, 3, 1, 'Görsel içerik ve grafik tasarım yapacak tasarımcı. Dijital ve basılı medya tasarımı.', 'Photoshop, Illustrator, InDesign', '12000-18000 TL', 'full-time', 'entry', DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), TRUE),

('Senior Product Designer', 3, 3, 1, 'Ürün tasarımı ve kullanıcı deneyimi konusunda uzman tasarımcı. Tasarım sistemi yönetimi.', 'Figma, Sketch, Design Systems, 5+ yıl', '25000-35000 TL', 'hybrid', 'senior', DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), TRUE),

-- Finans İlanları
('Mali Müşavir', 4, 4, 2, 'Şirket mali işlerini yönetecek mali müşavir. Vergi danışmanlığı ve mali raporlama.', 'SMMM, 3+ yıl deneyim, Vergi mevzuatı', '22000-30000 TL', 'full-time', 'senior', DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), TRUE),

('Muhasebe Elemanı', 4, 4, 2, 'Günlük muhasebe işlemlerini yapacak eleman. Fatura ve dekont takibi.', 'Muhasebe bilgisi, Excel, Logo/Eta', '10000-15000 TL', 'full-time', 'entry', DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), TRUE),

('Finans Analisti', 4, 4, 1, 'Finansal analiz ve raporlama yapacak analist. Bütçe planlama ve takip.', 'Excel, Power BI, Finansal analiz, 2+ yıl', '18000-25000 TL', 'full-time', 'mid', DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), TRUE);

-- =====================================================
-- Notlar:
-- 1. firma_id değerleri mevcut firmalarınıza göre güncellenmelidir
-- 2. Bu seed data test amaçlıdır, gerçek verilerle değiştirilmelidir
-- 3. Tarihler otomatik olarak 30 gün sonrasına ayarlanmıştır
-- =====================================================
