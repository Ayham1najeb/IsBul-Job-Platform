/**
 * Kayıtlı İşler Sayfası
 * Kullanıcının kaydettiği iş ilanları
 */
import { useState, useEffect } from 'react';
import { savedJobsService } from '../../services/savedJobsService';
import SavedJobCard from '../../components/SavedJobs/SavedJobCard';
import { Bookmark, Loader } from 'lucide-react';

const SavedJobsPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSavedJobs();
  }, []);

  const loadSavedJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: API'den kayıtlı işleri çek
      // Şimdilik boş array
      setSavedJobs([]);
    } catch (err) {
      console.error('Kayıtlı işler yüklenemedi:', err);
      setError('Kayıtlı işler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (jobId) => {
    if (!confirm('Bu işi kayıtlı işlerden kaldırmak istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await savedJobsService.unsaveJob(jobId);
      alert('İş kayıtlı işlerden kaldırıldı!');
      loadSavedJobs();
    } catch (error) {
      console.error('Kaldırma hatası:', error);
      alert('İş kaldırılamadı.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Bookmark className="w-8 h-8 text-primary-600" />
            Kayıtlı İşler
          </h1>
          <p className="text-gray-600 mt-2">
            {savedJobs.length} kayıtlı iş
          </p>
        </div>

        {/* İçerik */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader className="w-12 h-12 text-primary-600 animate-spin mb-4" />
            <p className="text-gray-600">Kayıtlı işler yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        ) : savedJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Henüz kayıtlı iş yok
            </h3>
            <p className="text-gray-600 mb-6">
              İlgilendiğiniz iş ilanlarını kaydedin ve daha sonra kolayca erişin
            </p>
            <a
              href="/jobs"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              İş İlanlarına Göz At
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedJobs.map((job) => (
              <SavedJobCard
                key={job.id}
                job={job}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobsPage;
