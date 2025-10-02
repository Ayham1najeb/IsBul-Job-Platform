/**
 * Benzer İlanlar Bileşeni
 * Aynı kategorideki diğer ilanları gösterir
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobService } from '../../services/jobService';
import { Briefcase, MapPin, DollarSign, ArrowRight } from 'lucide-react';

const SimilarJobs = ({ currentJobId, kategoriId, limit = 3 }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (kategoriId) {
      loadSimilarJobs();
    }
  }, [kategoriId, currentJobId]);

  const loadSimilarJobs = async () => {
    try {
      setLoading(true);
      const data = await jobService.getAllJobs({
        kategori_id: kategoriId,
        limit: limit + 1 // Mevcut ilanı çıkarmak için +1
      });

      // Mevcut ilanı filtrele
      const filtered = (data.kayitlar || []).filter(
        job => job.id !== parseInt(currentJobId)
      ).slice(0, limit);

      setJobs(filtered);
    } catch (error) {
      console.error('Benzer ilanlar yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Benzer İlanlar</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary-600" />
          Benzer İlanlar
        </h2>
        <Link
          to={`/jobs?kategori_id=${kategoriId}`}
          className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
        >
          Tümünü Gör
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Link
            key={job.id}
            to={`/jobs/${job.id}`}
            className="block p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
          >
            {/* Başlık */}
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600">
              {job.baslik}
            </h3>

            {/* Şirket */}
            <p className="text-sm text-gray-600 mb-3">
              {job.firma?.isim}
            </p>

            {/* Detaylar */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              {/* Lokasyon */}
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{job.lokasyon?.sehir}</span>
              </div>

              {/* Maaş */}
              {job.maas_aralik && (
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  <span>{job.maas_aralik}</span>
                </div>
              )}

              {/* Çalışma Şekli */}
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                {job.calisma_sekli === 'full-time' && 'Tam Zamanlı'}
                {job.calisma_sekli === 'part-time' && 'Yarı Zamanlı'}
                {job.calisma_sekli === 'remote' && 'Uzaktan'}
                {job.calisma_sekli === 'hybrid' && 'Hibrit'}
                {job.calisma_sekli === 'contract' && 'Sözleşmeli'}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Daha Fazla */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <Link
          to={`/jobs?kategori_id=${kategoriId}`}
          className="block text-center text-primary-600 hover:text-primary-700 font-medium"
        >
          Kategorideki Tüm İlanları Gör →
        </Link>
      </div>
    </div>
  );
};

export default SimilarJobs;
