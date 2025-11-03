/**
 * Kayıtlı İş Kartı Bileşeni
 * Kayıtlı iş ilanlarını gösterir
 */
import { Link } from 'react-router-dom';
import { Building2, MapPin, DollarSign, Clock, Bookmark, Eye } from 'lucide-react';

const SavedJobCard = ({ job, onRemove }) => {
  // Tarih formatla
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const today = new Date();
    
    // Tarihleri sadece tarih kısmına indir (saat bilgisi olmadan)
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    // Gün farkını hesapla
    const diffTime = todayOnly - dateOnly;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Bugün';
    if (diffDays === 1) return 'Dün';
    if (diffDays < 7) return `${diffDays} gün önce`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} hafta önce`;
    return `${Math.floor(diffDays / 30)} ay önce`;
  };

  // Çalışma şekli etiketleri
  const workTypeLabels = {
    'full-time': 'Tam Zamanlı',
    'part-time': 'Yarı Zamanlı',
    'remote': 'Uzaktan',
    'hybrid': 'Hibrit',
    'contract': 'Sözleşmeli'
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Üst Kısım */}
      <div className="flex items-start gap-4 mb-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          {job.firma_logo ? (
            <img
              src={job.firma_logo}
              alt={job.firma_isim}
              className="w-16 h-16 rounded-lg object-cover border border-gray-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-primary-100 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary-600" />
            </div>
          )}
        </div>

        {/* İlan Bilgileri */}
        <div className="flex-1 min-w-0">
          <Link
            to={`/jobs/${job.id}`}
            className="text-lg font-semibold text-gray-900 hover:text-primary-600 mb-1 block"
          >
            {job.baslik}
          </Link>
          <p className="text-gray-600 mb-2">{job.firma_isim}</p>

          {/* Etiketler */}
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              {workTypeLabels[job.calisma_sekli] || job.calisma_sekli}
            </span>
            {job.pozisyon_seviyesi && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full capitalize">
                {job.pozisyon_seviyesi}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Detaylar */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
        {/* Lokasyon */}
        {job.sehir_isim && (
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{job.sehir_isim}</span>
          </div>
        )}

        {/* Maaş */}
        {job.maas_aralik && (
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{job.maas_aralik}</span>
          </div>
        )}

        {/* Yayınlanma */}
        <div className="flex items-center gap-1 ml-auto">
          <Clock className="w-4 h-4" />
          <span>{formatDate(job.yayinlanma_tarihi)}</span>
        </div>
      </div>

      {/* Kaydedilme Tarihi */}
      {job.kaydedilme_tarihi && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            <Bookmark className="w-4 h-4 inline mr-1" />
            {formatDate(job.kaydedilme_tarihi)} tarihinde kaydedildi
          </p>
        </div>
      )}

      {/* Butonlar */}
      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <Link
          to={`/jobs/${job.id}`}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Eye className="w-4 h-4" />
          İlanı Görüntüle
        </Link>
        <button
          onClick={() => onRemove(job.id)}
          className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          Kaldır
        </button>
      </div>
    </div>
  );
};

export default SavedJobCard;
