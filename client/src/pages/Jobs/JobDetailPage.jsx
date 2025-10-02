/**
 * İş İlanı Detay Sayfası
 * Tek bir ilanın tüm detaylarını gösterir
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jobService } from '../../services/jobService';
import { applicationService } from '../../services/applicationService';
import { savedJobsService } from '../../services/savedJobsService';
import { Loader, ArrowLeft, Share2, Bookmark, BookmarkCheck } from 'lucide-react';
import JobHeader from '../../components/Jobs/JobHeader';
import JobDescription from '../../components/Jobs/JobDescription';
import JobRequirements from '../../components/Jobs/JobRequirements';
import JobCompanyInfo from '../../components/Jobs/JobCompanyInfo';
import ApplyButton from '../../components/Jobs/ApplyButton';
import SimilarJobs from '../../components/Jobs/SimilarJobs';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // İlanı yükle
  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await jobService.getJobById(id);
      setJob(data);
    } catch (err) {
      console.error('İlan yüklenemedi:', err);
      setError('İş ilanı bulunamadı veya yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  // Başvuru yap
  const handleApply = async (applicationData) => {
    try {
      await applicationService.applyForJob(applicationData);
    } catch (error) {
      console.error('Başvuru hatası:', error);
      throw error;
    }
  };

  // İlanı kaydet/kaldır
  const handleSaveToggle = async () => {
    try {
      if (isSaved) {
        await savedJobsService.unsaveJob(id);
        alert('İlan kayıtlı işlerden kaldırıldı!');
      } else {
        await savedJobsService.saveJob(id);
        alert('İlan kayıtlı işlere eklendi!');
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      alert('İşlem başarısız oldu.');
    }
  };

  // Paylaş
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.baslik,
        text: `${job.firma_isim} - ${job.baslik}`,
        url: window.location.href
      });
    } else {
      // Fallback: URL'yi kopyala
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
          <p className="text-gray-600">İlan yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Hata
  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">İlan Bulunamadı</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/jobs')}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              İş İlanlarına Dön
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
          to="/jobs"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          İş İlanlarına Dön
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol: İlan Detayları */}
          <div className="lg:col-span-2">
            {/* Başlık */}
            <JobHeader job={job} />

            {/* Açıklama */}
            <JobDescription 
              aciklama={job.aciklama}
              sorumluluklar={job.sorumluluklar}
            />

            {/* Gereksinimler */}
            <JobRequirements 
              gereksinimler={job.gereksinimler}
              egitim_seviyesi={job.egitim_seviyesi}
              deneyim_yili={job.deneyim_yili}
            />

            {/* Şirket Bilgisi */}
            <JobCompanyInfo 
              firma_id={job.firma_id}
              firma_isim={job.firma_isim}
              firma_logo={job.firma_logo}
              firma_aciklama={job.firma_aciklama}
              firma_website={job.firma_website}
              sehir_isim={job.sehir_isim}
              ilce_isim={job.ilce_isim}
            />

            {/* Benzer İlanlar (Mobil) */}
            <div className="lg:hidden">
              <SimilarJobs 
                currentJobId={job.id}
                kategoriId={job.kategori_id}
                limit={3}
              />
            </div>
          </div>

          {/* Sağ: Başvuru Paneli */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              {/* Başvuru Kartı */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Başvuru Yap
                </h3>

                {/* Başvuru Butonu */}
                <ApplyButton 
                  jobId={job.id}
                  jobTitle={job.baslik}
                  onApply={handleApply}
                />

                {/* İşlemler */}
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  {/* Kaydet */}
                  <button
                    onClick={handleSaveToggle}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {isSaved ? (
                      <>
                        <BookmarkCheck className="w-5 h-5 text-primary-600" />
                        <span className="text-primary-600">Kaydedildi</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-5 h-5" />
                        <span>Kaydet</span>
                      </>
                    )}
                  </button>

                  {/* Paylaş */}
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    Paylaş
                  </button>
                </div>
              </div>

              {/* İlan Bilgileri */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold text-gray-900 mb-4">İlan Bilgileri</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">İlan No:</span>
                    <span className="ml-2 font-medium text-gray-900">#{job.id}</span>
                  </div>
                  {job.kategori_isim && (
                    <div>
                      <span className="text-gray-600">Kategori:</span>
                      <span className="ml-2 font-medium text-gray-900">{job.kategori_isim}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">Yayınlanma:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {new Date(job.yayinlanma_tarihi).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Benzer İlanlar (Desktop) */}
              <div className="hidden lg:block">
                <SimilarJobs 
                  currentJobId={job.id}
                  kategoriId={job.kategori_id}
                  limit={3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
