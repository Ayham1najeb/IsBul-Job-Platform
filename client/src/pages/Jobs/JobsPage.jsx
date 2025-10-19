/**
 * İş İlanları Sayfası
 * Tüm iş ilanlarını listeler
 */
import { useState, useEffect } from 'react';
import { jobService } from '../../services/jobService';
import JobCard from '../../components/Jobs/JobCard';
import JobFilters from '../../components/Jobs/JobFilters';
import AdvancedSearch from '../../components/Jobs/AdvancedSearch';
import { Briefcase, Loader } from 'lucide-react';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    kategori_id: '',
    sehir_id: '',
    calisma_sekli: '',
    arama: '',
    limit: 20,
    offset: 0
  });
  const [totalJobs, setTotalJobs] = useState(0);

  // İş ilanlarını yükle
  useEffect(() => {
    loadJobs();
  }, [filters]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await jobService.getAllJobs(filters);
      
      setJobs(data.kayitlar || []);
      setTotalJobs(data.toplam || 0);
    } catch (err) {
      console.error('İlanlar yüklenemedi:', err);
      setError('İş ilanları yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  // Arama
  const handleSearch = (searchTerm) => {
    setFilters({
      ...filters,
      arama: searchTerm,
      offset: 0
    });
  };

  // Filtre değişikliği
  const handleFilterChange = (newFilters) => {
    setFilters({
      ...newFilters,
      offset: 0
    });
  };

  // Filtreleri temizle
  const handleClearFilters = () => {
    setFilters({
      kategori_id: '',
      sehir_id: '',
      calisma_sekli: '',
      arama: '',
      limit: 20,
      offset: 0
    });
  };

  // Daha fazla yükle
  const loadMore = () => {
    setFilters({
      ...filters,
      offset: filters.offset + filters.limit
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-primary-600" />
            İş İlanları
          </h1>
          <p className="text-gray-600 mt-2">
            {totalJobs > 0 ? `${totalJobs} ilan bulundu` : 'İş ilanlarını keşfedin'}
          </p>
        </div>

        {/* Gelişmiş Arama */}
        <div className="mb-6">
          <AdvancedSearch 
            onSearch={handleSearch}
            initialValue={filters.arama}
          />
        </div>

        {/* İçerik */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sol: Filtreler */}
          <div className="lg:col-span-1">
            <JobFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Sağ: İlanlar */}
          <div className="lg:col-span-3">
            {/* Yükleniyor */}
            {loading && jobs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                <p className="text-gray-600">İş ilanları yükleniyor...</p>
              </div>
            )}

            {/* Hata */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {error}
              </div>
            )}

            {/* İlanlar */}
            {!loading && !error && jobs.length === 0 && (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  İlan bulunamadı
                </h3>
                <p className="text-gray-600 mb-4">
                  Arama kriterlerinize uygun ilan bulunamadı.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}

            {!loading && !error && jobs.length > 0 && (
              <>
                {/* İlan Listesi */}
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                {/* Daha Fazla Yükle */}
                {jobs.length < totalJobs && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <Loader className="w-5 h-5 animate-spin" />
                          Yükleniyor...
                        </span>
                      ) : (
                        `Daha Fazla Göster (${totalJobs - jobs.length} ilan kaldı)`
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
