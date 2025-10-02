/**
 * İş İlanı Başlık Bileşeni
 * İlan başlığı ve temel bilgiler
 */
import { Briefcase, MapPin, Clock, DollarSign, Building2 } from 'lucide-react';

const JobHeader = ({ job }) => {
  // Tarih formatla
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      {/* Üst Kısım: Logo ve Temel Bilgiler */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Şirket Logosu */}
        <div className="flex-shrink-0">
          {job.firma_logo ? (
            <img 
              src={job.firma_logo} 
              alt={job.firma_isim}
              className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-24 h-24 rounded-lg bg-primary-100 flex items-center justify-center border-2 border-primary-200">
              <Building2 className="w-12 h-12 text-primary-600" />
            </div>
          )}
        </div>

        {/* İlan Bilgileri */}
        <div className="flex-1">
          {/* Başlık */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {job.baslik}
          </h1>

          {/* Şirket Adı */}
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-gray-500" />
            <span className="text-xl text-gray-700 font-medium">
              {job.firma_isim}
            </span>
          </div>

          {/* Etiketler */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Çalışma Şekli */}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <Briefcase className="w-4 h-4 mr-1" />
              {workTypeLabels[job.calisma_sekli] || job.calisma_sekli}
            </span>

            {/* Pozisyon Seviyesi */}
            {job.pozisyon_seviyesi && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 capitalize">
                {job.pozisyon_seviyesi}
              </span>
            )}

            {/* Deneyim */}
            {job.deneyim_yili > 0 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {job.deneyim_yili} yıl deneyim
              </span>
            )}
          </div>

          {/* Detay Bilgileri */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {/* Lokasyon */}
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">Lokasyon</div>
                <div>
                  {job.sehir_isim}
                  {job.ilce_isim && `, ${job.ilce_isim}`}
                </div>
              </div>
            </div>

            {/* Maaş */}
            {job.maas_aralik && (
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Maaş</div>
                  <div>{job.maas_aralik}</div>
                </div>
              </div>
            )}

            {/* Yayınlanma Tarihi */}
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">Yayınlanma</div>
                <div>{formatDate(job.yayinlanma_tarihi)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Son Başvuru Tarihi Uyarısı */}
      {job.son_basvuru_tarihi && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-amber-800">
            <Clock className="w-5 h-5" />
            <span className="font-medium">
              Son Başvuru Tarihi: {formatDate(job.son_basvuru_tarihi)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobHeader;
