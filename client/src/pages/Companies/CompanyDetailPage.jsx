/**
 * Şirket Detay Sayfası
 * Tek bir şirketin tüm detaylarını gösterir
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { companyService } from '../../services/companyService';
import { Loader, ArrowLeft, Share2, ExternalLink } from 'lucide-react';
import CompanyHeader from '../../components/Companies/CompanyHeader';
import CompanyAbout from '../../components/Companies/CompanyAbout';
import CompanyJobs from '../../components/Companies/CompanyJobs';
import CompanyStats from '../../components/Companies/CompanyStats';

const CompanyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Şirketi yükle
  useEffect(() => {
    loadCompany();
  }, [id]);

  const loadCompany = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await companyService.getCompanyById(id);
      setCompany(data);
    } catch (err) {
      console.error('Şirket yüklenemedi:', err);
      setError('Şirket bulunamadı veya yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  // Paylaş
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: company.isim,
        text: `${company.isim} - Şirket Profili`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link kopyalandı!');
    }
  };

  // Yükleniyor
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Şirket bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Hata
  if (error || !company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Şirket Bulunamadı</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/companies')}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Şirketlere Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Geri Butonu */}
        <Link
          to="/companies"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Şirketlere Dön
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol: Şirket Detayları */}
          <div className="lg:col-span-2">
            {/* Başlık */}
            <CompanyHeader company={company} />

            {/* Hakkında */}
            <CompanyAbout aciklama={company.aciklama} />

            {/* İlanlar */}
            <CompanyJobs ilanlar={company.ilanlar || []} />
          </div>

          {/* Sağ: İstatistikler ve İşlemler */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              {/* İstatistikler */}
              <CompanyStats ilanlar={company.ilanlar || []} />

              {/* İşlemler */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold text-gray-900 mb-4">İşlemler</h3>

                <div className="space-y-2">
                  {/* Website */}
                  {company.website && (
                    <a
                      href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Website'yi Ziyaret Et
                    </a>
                  )}

                  {/* Paylaş */}
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    Paylaş
                  </button>

                  {/* Tüm İlanları Gör */}
                  {company.ilanlar && company.ilanlar.length > 0 && (
                    <Link
                      to={`/jobs?firma_id=${company.id}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Tüm İlanları Gör
                    </Link>
                  )}
                </div>
              </div>

              {/* Şirket Bilgileri */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold text-gray-900 mb-4">Şirket Bilgileri</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Şirket ID:</span>
                    <span className="ml-2 font-medium text-gray-900">#{company.id}</span>
                  </div>
                  {company.kategori_isim && (
                    <div>
                      <span className="text-gray-600">Sektör:</span>
                      <span className="ml-2 font-medium text-gray-900">{company.kategori_isim}</span>
                    </div>
                  )}
                  {company.kurulis_yili && (
                    <div>
                      <span className="text-gray-600">Kuruluş:</span>
                      <span className="ml-2 font-medium text-gray-900">{company.kurulis_yili}</span>
                    </div>
                  )}
                  {company.calisan_sayisi && (
                    <div>
                      <span className="text-gray-600">Çalışan:</span>
                      <span className="ml-2 font-medium text-gray-900">{company.calisan_sayisi}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;
