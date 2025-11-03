/**
 * İş İlanı Kartı Bileşeni
 * İş ilanlarını kart formatında gösterir
 */
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
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
    <Link 
      to={`/jobs/${job.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border border-gray-200 hover:border-primary-500"
    >
      {/* Üst Kısım: Logo ve Şirket */}
      <div className="flex items-start gap-4 mb-4">
        {/* Şirket Logosu */}
        <div className="flex-shrink-0">
          {job.firma?.logo_url ? (
            <img 
              src={job.firma.logo_url} 
              alt={job.firma.isim}
              className="w-16 h-16 rounded-lg object-cover border border-gray-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-primary-100 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-primary-600" />
            </div>
          )}
        </div>

        {/* İlan Bilgileri */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {job.baslik}
          </h3>
          <p className="text-gray-600 mb-2">
            {job.firma?.isim}
          </p>
          
          {/* Etiketler */}
          <div className="flex flex-wrap gap-2">
            {/* Çalışma Şekli */}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {workTypeLabels[job.calisma_sekli] || job.calisma_sekli}
            </span>
            
            {/* Pozisyon Seviyesi */}
            {job.pozisyon_seviyesi && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize">
                {job.pozisyon_seviyesi}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Açıklama */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {job.aciklama}
      </p>

      {/* Alt Kısım: Detaylar */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        {/* Lokasyon */}
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{job.lokasyon?.sehir}</span>
          {job.lokasyon?.ilce && <span>, {job.lokasyon.ilce}</span>}
        </div>

        {/* Maaş */}
        {job.maas_aralik && (
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{job.maas_aralik}</span>
          </div>
        )}

        {/* Yayınlanma Tarihi */}
        <div className="flex items-center gap-1 ml-auto">
          <Clock className="w-4 h-4" />
          <span>{formatDate(job.yayinlanma_tarihi)}</span>
        </div>
      </div>

      {/* Kategori */}
      {job.kategori?.isim && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {job.kategori.isim}
          </span>
        </div>
      )}
    </Link>
  );
};

export default JobCard;
