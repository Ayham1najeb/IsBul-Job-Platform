/**
 * Ana Sayfa Bileşeni
 * Platformun ana sayfası - hero, özellikler ve CTA bölümleri
 */
import { Link } from 'react-router-dom';
import { Search, Briefcase, Building2, Users } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Bölümü */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hayalinizdeki İşi Bulun
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Binlerce iş fırsatı sizi bekliyor
            </p>

            {/* Arama Çubuğu */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="İş ara..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                />
                <input
                  type="text"
                  placeholder="Konum"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                />
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-md font-semibold flex items-center justify-center gap-2">
                  <Search className="h-5 w-5" />
                  Ara
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Özellikler Bölümü */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Neden İş Bul?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Briefcase className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Binlerce İş İlanı</h3>
              <p className="text-gray-600">
                Farklı sektörlerde binlerce iş fırsatını keşfedin
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Building2 className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Güvenilir Şirketler</h3>
              <p className="text-gray-600">
                Piyasadaki en iyi şirketlerle iletişime geçin
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kolay Başvuru</h3>
              <p className="text-gray-600">
                İşlere kolayca başvurun ve başvurularınızı takip edin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bölümü */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Başlamaya Hazır Mısınız?</h2>
          <p className="text-xl mb-8">
            Bugün bize katılın ve kariyer yolculuğunuza başlayın
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold"
            >
              Hesap Oluştur
            </Link>
            <Link
              to="/jobs"
              className="bg-primary-700 hover:bg-primary-800 text-white px-8 py-3 rounded-md font-semibold border-2 border-white"
            >
              İş İlanlarına Göz At
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
