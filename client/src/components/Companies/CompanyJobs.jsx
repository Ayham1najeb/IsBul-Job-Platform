/**
 * Şirket İlanları Bileşeni
 * Şirketin yayınladığı iş ilanları
 */
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';

const CompanyJobs = ({ ilanlar = [] }) => {
  if (ilanlar.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Açık Pozisyonlar</h2>
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>Şu anda açık pozisyon bulunmamaktadır.</p>
        </div>
      </div>
    );
  }

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
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-primary-600" />
          Açık Pozisyonlar
          <span className="text-lg text-gray-500">({ilanlar.length})</span>
        </h2>
      </div>

      <div className="space-y-4">
        {ilanlar.map((ilan) => (
          <Link
            key={ilan.id}
            to={`/jobs/${ilan.id}`}
            className="block p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
          >
            {/* Başlık */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600">
              {ilan.baslik}
            </h3>

            {/* Etiketler */}
            <div className="flex flex-wrap gap-2 mb-3">
              {/* Çalışma Şekli */}
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {workTypeLabels[ilan.calisma_sekli] || ilan.calisma_sekli}
              </span>

              {/* Pozisyon Seviyesi */}
              {ilan.pozisyon_seviyesi && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full capitalize">
                  {ilan.pozisyon_seviyesi}
                </span>
              )}
            </div>

            {/* Detaylar */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {/* Lokasyon */}
              {ilan.sehir_isim && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{ilan.sehir_isim}</span>
                </div>
              )}

              {/* Maaş */}
              {ilan.maas_aralik && (
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{ilan.maas_aralik}</span>
                </div>
              )}

              {/* Yayınlanma */}
              <div className="flex items-center gap-1 ml-auto">
                <Clock className="w-4 h-4" />
                <span>{formatDate(ilan.yayinlanma_tarihi)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompanyJobs;
