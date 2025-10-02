/**
 * Şirket Başvurular Sayfası
 * Şirketin ilanlarına gelen başvuruları yönetir
 */
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { applicationService } from '../../services/applicationService';
import { jobService } from '../../services/jobService';
import ApplicationList from '../../components/Company/ApplicationList';
import ApplicationDetail from '../../components/Company/ApplicationDetail';
import ApplicationActions from '../../components/Company/ApplicationActions';
import { ArrowLeft, Loader, Filter, X } from 'lucide-react';

const ApplicationsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const ilanId = searchParams.get('ilan_id');

  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(ilanId || '');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (selectedJob) {
      loadApplications(selectedJob);
    }
  }, [selectedJob]);

  useEffect(() => {
    filterApplications();
  }, [filterStatus, applications]);

  const loadJobs = async () => {
    try {
      // TODO: Şirketin kendi ilanlarını getir
      const data = await jobService.getAllJobs({ limit: 100 });
      setJobs(data.kayitlar || []);
      
      if (ilanId && data.kayitlar?.length > 0) {
        setSelectedJob(ilanId);
      } else if (data.kayitlar?.length > 0) {
        setSelectedJob(data.kayitlar[0].id.toString());
      }
    } catch (error) {
      console.error('İlanlar yüklenemedi:', error);
    }
  };

  const loadApplications = async (jobId) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedApplication(null);

      const data = await applicationService.getJobApplications(jobId);
      setApplications(data.kayitlar || []);
    } catch (err) {
      console.error('Başvurular yüklenemedi:', err);
      setError('Başvurular yüklenirken bir hata oluştu.');
      setApplications([]);
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

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await applicationService.updateApplicationStatus(applicationId, newStatus);
      alert('Başvuru durumu güncellendi!');
      
      // Listeyi yenile
      loadApplications(selectedJob);
      
      // Detay açıksa güncelle
      if (selectedApplication?.id === applicationId) {
        setSelectedApplication({
          ...selectedApplication,
          durum: newStatus
        });
      }
    } catch (error) {
      console.error('Durum güncelleme hatası:', error);
      alert('Durum güncellenemedi.');
    }
  };

  const handleViewDetail = (application) => {
    setSelectedApplication(application);
  };

  const handleCloseDetail = () => {
    setSelectedApplication(null);
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
          <button
            onClick={() => navigate('/company/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Panele Dön
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Başvurular</h1>
          <p className="text-gray-600 mt-2">
            İlanlarınıza gelen başvuruları yönetin
          </p>
        </div>

        {/* İlan Seçimi */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            İlan Seçin
          </label>
          <select
            value={selectedJob}
            onChange={(e) => {
              setSelectedJob(e.target.value);
              setSearchParams({ ilan_id: e.target.value });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">İlan Seçin</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.baslik} ({job.basvuru_sayisi || 0} başvuru)
              </option>
            ))}
          </select>
        </div>

        {selectedJob && (
          <>
            {/* İstatistikler */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
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

            {/* İçerik */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sol: Liste */}
              <div className="lg:col-span-2">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow">
                    <Loader className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                    <p className="text-gray-600">Başvurular yükleniyor...</p>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    {error}
                  </div>
                ) : (
                  <ApplicationList
                    applications={filteredApplications}
                    onStatusChange={handleStatusChange}
                    onViewDetail={handleViewDetail}
                  />
                )}
              </div>

              {/* Sağ: Detay */}
              <div className="lg:col-span-1">
                {selectedApplication ? (
                  <div className="sticky top-6">
                    <div className="bg-white rounded-lg shadow p-6 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Başvuru Detayı</h3>
                        <button
                          onClick={handleCloseDetail}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <ApplicationDetail application={selectedApplication} />

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">Durum Değiştir</h4>
                        <ApplicationActions
                          currentStatus={selectedApplication.durum}
                          onStatusChange={(status) => handleStatusChange(selectedApplication.id, status)}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow p-12 text-center">
                    <div className="text-gray-400 text-4xl mb-3">👈</div>
                    <p className="text-gray-600">
                      Detayları görmek için bir başvuru seçin
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationsPage;
