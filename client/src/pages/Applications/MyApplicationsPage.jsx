/**
 * Başvurularım Sayfası
 * Kullanıcının yaptığı başvuruları listeler
 */
import { useState, useEffect } from 'react';
import { applicationService } from '../../services/applicationService';
import ApplicationCard from '../../components/Applications/ApplicationCard';
import { Briefcase, Loader, Filter } from 'lucide-react';

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [filterStatus, applications]);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await applicationService.getUserApplications();
      console.log('Başvurular API yanıtı:', data);
      setApplications(data.kayitlar || data.data || []);
    } catch (err) {
      console.error('Başvurular yüklenemedi:', err);
      console.error('Hata detayı:', err.response?.data);
      setError(err.response?.data?.mesaj || 'Başvurular yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    if (filterStatus === 'all') {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(
        applications.filter(app => app.durum === filterStatus)
      );
    }
  };

  const handleCancel = async (id) => {
    if (!confirm('Bu başvuruyu iptal etmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await applicationService.cancelApplication(id);
      alert('Başvuru iptal edildi');
      loadApplications();
    } catch (error) {
      console.error('İptal hatası:', error);
      alert('Başvuru iptal edilemedi');
    }
  };

  // İstatistikler
  const stats = {
    toplam: applications.length,
    beklemede: applications.filter(a => a.durum === 'beklemede').length,
    inceleniyor: applications.filter(a => a.durum === 'inceleniyor').length,
    kabul: applications.filter(a => a.durum === 'kabul').length,
    red: applications.filter(a => a.durum === 'red').length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-primary-600" />
            Başvurularım
          </h1>
          <p className="text-gray-600 mt-2">
            {stats.toplam} başvuru
          </p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <button
            onClick={() => setFilterStatus('all')}
            className={`p-4 rounded-lg border-2 transition-all ${
              filterStatus === 'all'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-2xl font-bold text-gray-900">{stats.toplam}</div>
            <div className="text-sm text-gray-600">Toplam</div>
          </button>

          <button
            onClick={() => setFilterStatus('beklemede')}
            className={`p-4 rounded-lg border-2 transition-all ${
              filterStatus === 'beklemede'
                ? 'border-yellow-500 bg-yellow-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-2xl font-bold text-yellow-600">{stats.beklemede}</div>
            <div className="text-sm text-gray-600">Beklemede</div>
          </button>

          <button
            onClick={() => setFilterStatus('inceleniyor')}
            className={`p-4 rounded-lg border-2 transition-all ${
              filterStatus === 'inceleniyor'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-2xl font-bold text-blue-600">{stats.inceleniyor}</div>
            <div className="text-sm text-gray-600">İnceleniyor</div>
          </button>

          <button
            onClick={() => setFilterStatus('kabul')}
            className={`p-4 rounded-lg border-2 transition-all ${
              filterStatus === 'kabul'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-2xl font-bold text-green-600">{stats.kabul}</div>
            <div className="text-sm text-gray-600">Kabul</div>
          </button>

          <button
            onClick={() => setFilterStatus('red')}
            className={`p-4 rounded-lg border-2 transition-all ${
              filterStatus === 'red'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-2xl font-bold text-red-600">{stats.red}</div>
            <div className="text-sm text-gray-600">Red</div>
          </button>
        </div>

        {/* Başvurular */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader className="w-12 h-12 text-primary-600 animate-spin mb-4" />
            <p className="text-gray-600">Başvurular yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filterStatus === 'all' ? 'Henüz başvuru yok' : 'Bu durumda başvuru yok'}
            </h3>
            <p className="text-gray-600 mb-6">
              {filterStatus === 'all'
                ? 'İş ilanlarına göz atın ve başvuru yapın'
                : 'Farklı bir filtre seçin'}
            </p>
            {filterStatus === 'all' && (
              <a
                href="/jobs"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                İş İlanlarına Göz At
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplicationsPage;
