/**
 * Ana Sayfa Bileşeni
 * Platformun ana sayfası - Güncellenmiş ve Geliştirilmiş
 */
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, Briefcase, Building2, Users, TrendingUp, CheckCircle, Clock, Award } from 'lucide-react';
import api from '../config/api';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [stats, setStats] = useState({
    jobs: 0,
    companies: 0,
    users: 0,
    applications: 0
  });
  const [featuredCompanies, setFeaturedCompanies] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  // İstatistikleri yükle
  useEffect(() => {
    loadStats();
    loadFeaturedCompanies();
  }, []);

  const loadStats = async () => {
    try {
      setLoadingStats(true);
      const response = await api.get('/stats/dashboard.php');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('İstatistik yükleme hatası:', error);
      // Hata durumunda 0 değerlerini göster
      setStats({
        jobs: 0,
        companies: 0,
        users: 0,
        applications: 0
      });
    } finally {
      setLoadingStats(false);
    }
  };

  const loadFeaturedCompanies = async () => {
    try {
      setLoadingCompanies(true);
      const response = await api.get('/companies/featured.php');
      if (response.data.success) {
        setFeaturedCompanies(response.data.data);
      }
    } catch (error) {
      console.error('Şirketler yükleme hatası:', error);
      setFeaturedCompanies([]);
    } finally {
      setLoadingCompanies(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?arama=${searchQuery}&sehir=${location}`);
  };

  return (
    <div>
      {/* Hero Bölümü */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-24 overflow-hidden">
        {/* Hareketli arka plan */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-bounce-slow"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        {/* Izgara deseni */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Türkiye'nin En Büyük İş Platformu</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
              Hayalinizdeki İşi<br />
              <span className="text-blue-200">Hemen Bulun</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.1s'}}>
              Binlerce iş fırsatı, güvenilir şirketler ve kolay başvuru sistemi ile kariyer yolculuğunuza başlayın
            </p>

            {/* Arama Çubuğu */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="İş pozisyonu, şirket veya anahtar kelime..."
                    className="w-full pl-12 pr-4 py-4 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>
                <div className="flex-1 relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Şehir veya bölge..."
                    className="w-full pl-12 pr-4 py-4 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Search className="h-5 w-5" />
                  İş Ara
                </button>
              </div>
            </form>

            {/* Hızlı Linkler */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-in" style={{animationDelay: '0.3s'}}>
              <span className="text-blue-200 text-sm">Popüler Aramalar:</span>
              {['Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'Product Manager'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    navigate(`/jobs?arama=${term}`);
                  }}
                  className="px-4 py-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-sm transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popüler Kategoriler */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Popüler İş Kategorileri</h2>
            <p className="text-gray-600">En çok aranan pozisyonları keşfedin</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Yazılım', icon: '💻', color: 'from-blue-50 to-blue-100', kategori: 1 },
              { name: 'Pazarlama', icon: '📊', color: 'from-green-50 to-green-100', kategori: 2 },
              { name: 'Tasarım', icon: '🎨', color: 'from-purple-50 to-purple-100', kategori: 3 },
              { name: 'Finans', icon: '💰', color: 'from-yellow-50 to-yellow-100', kategori: 4 },
              { name: 'Mühendislik', icon: '⚙️', color: 'from-red-50 to-red-100', kategori: 5 },
              { name: 'Satış', icon: '🤝', color: 'from-orange-50 to-orange-100', kategori: 6 },
              { name: 'Eğitim', icon: '📚', color: 'from-pink-50 to-pink-100', kategori: 7 },
            ].map((cat, index) => (
              <Link 
                key={cat.kategori}
                to={`/jobs?kategori=${cat.kategori}`} 
                className={`group p-6 bg-gradient-to-br ${cat.color} rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1 animate-scale-in`}
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-600">İlanları Gör</p>
              </Link>
            ))}

            <Link to="/jobs" className="group p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center animate-scale-in" style={{animationDelay: '0.35s'}}>
              <div className="text-4xl mb-3">➕</div>
              <h3 className="font-bold text-gray-900">Tümünü Gör</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loadingStats ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center animate-fade-in">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stats.jobs > 0 ? `${stats.jobs.toLocaleString('tr-TR')}+` : '0'}
                </div>
                <div className="text-gray-700 font-medium">Aktif İlan</div>
              </div>
              <div className="text-center animate-fade-in" style={{animationDelay: '0.1s'}}>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stats.companies > 0 ? `${stats.companies.toLocaleString('tr-TR')}+` : '0'}
                </div>
                <div className="text-gray-700 font-medium">Şirket</div>
              </div>
              <div className="text-center animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stats.users > 0 ? `${stats.users.toLocaleString('tr-TR')}+` : '0'}
                </div>
                <div className="text-gray-700 font-medium">Kullanıcı</div>
              </div>
              <div className="text-center animate-fade-in" style={{animationDelay: '0.3s'}}>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stats.applications > 0 ? `${stats.applications.toLocaleString('tr-TR')}+` : '0'}
                </div>
                <div className="text-gray-700 font-medium">Başvuru</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Öne Çıkan Şirketler */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Öne Çıkan Şirketler</h2>
              <p className="text-gray-600">Türkiye'nin önde gelen şirketleriyle tanışın</p>
            </div>
            <Link to="/companies" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group">
              Tümünü Gör
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loadingCompanies ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : featuredCompanies.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {featuredCompanies.map((company, i) => (
                  <Link 
                    key={company.id}
                    to={`/companies/${company.id}`}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-2 group border border-gray-100 animate-scale-in"
                    style={{animationDelay: `${i * 0.05}s`}}
                  >
                    <div className="flex flex-col items-center text-center">
                      {company.logo ? (
                        <img src={company.logo} alt={company.isim} className="w-16 h-16 rounded-lg mb-3 object-cover" />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-all mb-3">
                          <Building2 className="w-8 h-8 text-blue-600" />
                        </div>
                      )}
                      <h3 className="font-bold text-gray-900 mb-1 text-sm">{company.isim}</h3>
                      <p className="text-xs text-gray-500 mb-2">{company.sektor}</p>
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">
                        {company.acik_pozisyon || 0} açık pozisyon
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-12 text-center">
                <Link 
                  to="/companies" 
                  className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Building2 className="w-5 h-5" />
                  Tüm Şirketleri Keşfet
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <Building2 className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Henüz Öne Çıkan Şirket Yok</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Şu anda öne çıkan şirket bulunmuyor. Yakında harika şirketlerle tanışacaksınız!
              </p>
              <Link 
                to="/companies" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Building2 className="w-5 h-5" />
                Tüm Şirketleri Görüntüle
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Özellikler Bölümü */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Neden İş Bul?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kariyer yolculuğunuzda size yardımcı olacak güçlü özellikler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Binlerce İş İlanı</h3>
              <p className="text-gray-600 leading-relaxed">
                Farklı sektörlerde binlerce iş fırsatını keşfedin ve hayalinizdeki işi bulun
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Güvenilir Şirketler</h3>
              <p className="text-gray-600 leading-relaxed">
                Piyasadaki en iyi ve güvenilir şirketlerle direkt iletişime geçin
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Kolay Başvuru</h3>
              <p className="text-gray-600 leading-relaxed">
                Tek tıkla başvurun ve başvurularınızı gerçek zamanlı takip edin
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">7/24 Destek</h3>
              <p className="text-gray-600 leading-relaxed">
                Her zaman yanınızdayız, sorularınız için destek ekibimize ulaşın
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nasıl Çalışır */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nasıl Çalışır?</h2>
            <p className="text-xl text-gray-600">3 basit adımda işe başlayın</p>
          </div>

          <div className="relative">
            {/* الخط الموصل بين المراحل */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200" style={{top: '48px', left: '20%', right: '20%'}}></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="text-center group animate-slide-up">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10 border-4 border-white">
                    1
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Hesap Oluştur</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Ücretsiz hesap oluşturun ve profilinizi tamamlayın
                </p>
              </div>

              <div className="text-center group animate-slide-up" style={{animationDelay: '0.1s'}}>
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10 border-4 border-white">
                    2
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">İş Ara</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Binlerce iş ilanı arasından size uygun olanları bulun
                </p>
              </div>

              <div className="text-center group animate-slide-up" style={{animationDelay: '0.2s'}}>
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10 border-4 border-white">
                    3
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Başvur</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Tek tıkla başvurun ve yanıt bekleyin
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bölümü */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 to-blue-900 text-white overflow-hidden">
        {/* Dekoratif Elementler */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">Ücretsiz Üyelik</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">Başlamaya Hazır Mısınız?</h2>
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.1s'}}>
            Bugün bize katılın ve kariyer yolculuğunuza başlayın. Binlerce iş fırsatı sizi bekliyor!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.2s'}}>
            <Link
              to="/register"
              className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Ücretsiz Hesap Oluştur
            </Link>
            <Link
              to="/jobs"
              className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-xl font-bold text-lg border-2 border-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              İş İlanlarına Göz At
            </Link>
          </div>

          {/* Güven İşaretleri */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-blue-100 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Ücretsiz Üyelik</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Güvenli Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>7/24 Destek</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
