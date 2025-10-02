/**
 * İlan Yönetimi Sayfası
 * Şirketin ilanlarını yönetme
 */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jobService } from '../../services/jobService';
import { Briefcase, Edit, Trash2, Eye, Plus, ArrowLeft } from 'lucide-react';

const ManageJobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      // TODO: Şirketin kendi ilanlarını getir
      const data = await jobService.getAllJobs({ limit: 100 });
      setJobs(data.kayitlar || []);
    } catch (error) {
      console.error('İlanlar yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu ilanı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await jobService.deleteJob(id);
      alert('İlan silindi!');
      loadJobs();
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('İlan silinemedi.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/company/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Panele Dön
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">İlanlarım</h1>
              <p className="text-gray-600 mt-2">
                {jobs.length} ilan
              </p>
            </div>
            <Link
              to="/company/jobs/create"
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Yeni İlan
            </Link>
          </div>
        </div>

        {/* İlanlar */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-4">Yükleniyor...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Henüz ilan yok
            </h3>
            <p className="text-gray-600 mb-6">
              İlk iş ilanınızı oluşturun
            </p>
            <Link
              to="/company/jobs/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <Plus className="w-5 h-5" />
              İlan Oluştur
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İlan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lokasyon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {job.baslik}
                      </div>
                      <div className="text-sm text-gray-500">
                        {job.calisma_sekli}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {job.lokasyon?.sehir}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Aktif
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(job.yayinlanma_tarihi).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/jobs/${job.id}`}
                          className="text-gray-600 hover:text-gray-900"
                          title="Görüntüle"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => navigate(`/company/jobs/edit/${job.id}`)}
                          className="text-primary-600 hover:text-primary-900"
                          title="Düzenle"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Sil"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageJobsPage;
