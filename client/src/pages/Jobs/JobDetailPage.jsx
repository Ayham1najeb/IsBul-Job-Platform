/**
 * İş İlanı Detay Sayfası
 * Modern ve profesyonel tasarım - Başvuru butonu vurgulu
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Users,
  Calendar,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle,
  AlertCircle,
  Loader,
  Send
} from 'lucide-react';
import { jobService } from '../../services/jobService';
import { applicationService } from '../../services/applicationService';
import ApplyButton from '../../components/Jobs/ApplyButton';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadJobDetails();
  }, [id]);

  const loadJobDetails = async () => {
    try {
      setLoading(true);
      const data = await jobService.getJobById(id);
      setJob(data);
    } catch (error) {
      console.error('İlan yüklenemedi:', error);
      setError('İlan bulunamadı');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (applicationData) => {
    try {
      await applicationService.applyForJob({
        ilan_id: id,
        ...applicationData
      });
      alert('✅ Başvurunuz başarıyla gönderildi!');
      // Sayfayı yenile veya başvuru durumunu güncelle
      loadJobDetails();
    } catch (error) {
      console.error('Başvuru hatası:', error);
      const errorMsg = error.response?.data?.mesaj || 'Başvuru gönderilemedi';
      alert('❌ ' + errorMsg);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">İlan Bulunamadı</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/jobs')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            İlanlara Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/jobs')}
            className="flex items-center text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            İlanlara Dön
          </button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.baslik}</h1>
              <div className="flex flex-wrap items-center gap-4 text-blue-100">
                <Link 
                  to={`/companies/${job.firma_id}`}
                  className="flex items-center hover:text-white transition-colors"
                >
                  <Building2 className="w-5 h-5 mr-2" />
                  {job.firma_isim}
                </Link>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {job.sehir_isim}{job.ilce_isim && `, ${job.ilce_isim}`}
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  {new Date(job.yayinlanma_tarihi).toLocaleDateString('tr-TR')}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Başvuru Butonu - Üstte ve Belirgin */}
        <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Bu İlana Başvur</h3>
                <p className="text-sm text-gray-600">Hemen başvurunuzu gönderin</p>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <ApplyButton
                jobId={job.id}
                jobTitle={job.baslik}
                onApply={handleApply}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* İş Açıklaması */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3 shadow-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">İş Açıklaması</h2>
                  <p className="text-sm text-gray-500">Pozisyon hakkında detaylar</p>
                </div>
              </div>
              <div className="prose prose-sm max-w-none text-gray-700">
                <p className="whitespace-pre-wrap leading-relaxed">{job.aciklama}</p>
              </div>
            </div>

            {/* Gereksinimler */}
            {job.gereksinimler && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mr-3 shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Aranan Nitelikler</h2>
                    <p className="text-sm text-gray-500">Adayda aradığımız özellikler</p>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="whitespace-pre-wrap leading-relaxed">{job.gereksinimler}</p>
                </div>
              </div>
            )}

            {/* Sorumluluklar */}
            {job.sorumluluklar && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-3 shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">İş Sorumlulukları</h2>
                    <p className="text-sm text-gray-500">Yapılacak işler ve görevler</p>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="whitespace-pre-wrap leading-relaxed">{job.sorumluluklar}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* İlan Detayları */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">İlan Detayları</h3>
              
              <div className="space-y-5">
                {/* Maaş */}
                {job.maas_aralik && (
                  <div className="flex items-start p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Maaş Aralığı</p>
                      <p className="font-bold text-gray-900">{job.maas_aralik}</p>
                    </div>
                  </div>
                )}

                {/* Çalışma Şekli */}
                <div className="flex items-start p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Çalışma Şekli</p>
                    <p className="font-bold text-gray-900">
                      {job.calisma_sekli === 'full-time' && 'Tam Zamanlı'}
                      {job.calisma_sekli === 'part-time' && 'Yarı Zamanlı'}
                      {job.calisma_sekli === 'remote' && 'Uzaktan'}
                      {job.calisma_sekli === 'hybrid' && 'Hibrit'}
                    </p>
                  </div>
                </div>

                {/* Pozisyon Seviyesi */}
                <div className="flex items-start p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Pozisyon Seviyesi</p>
                    <p className="font-bold text-gray-900 capitalize">{job.pozisyon_seviyesi}</p>
                  </div>
                </div>

                {/* Deneyim */}
                {job.deneyim_yili > 0 && (
                  <div className="flex items-start p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Deneyim</p>
                      <p className="font-bold text-gray-900">{job.deneyim_yili} yıl</p>
                    </div>
                  </div>
                )}

                {/* Son Başvuru */}
                {job.son_basvuru_tarihi && (
                  <div className="flex items-start p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-200">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Son Başvuru</p>
                      <p className="font-bold text-gray-900">
                        {new Date(job.son_basvuru_tarihi).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Şirket Kartı */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4 border-2 border-white/30">
                  {job.firma_logo ? (
                    <img src={job.firma_logo} alt={job.firma_isim} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <Building2 className="w-7 h-7 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{job.firma_isim}</h3>
                  <p className="text-blue-100 text-sm">{job.kategori_isim}</p>
                </div>
              </div>
              
              {job.firma_aciklama && (
                <p className="text-blue-50 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {job.firma_aciklama}
                </p>
              )}
              
              <Link
                to={`/companies/${job.firma_id}`}
                className="block w-full text-center px-4 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold shadow-lg"
              >
                Şirket Profilini Gör
              </Link>
            </div>
          </div>
        </div>

        {/* Başvuru Butonu - Altta da */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Hemen Başvur</h3>
                <p className="text-sm text-gray-600">Fırsatı kaçırmayın!</p>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <ApplyButton
                jobId={job.id}
                jobTitle={job.baslik}
                onApply={handleApply}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
