/**
 * Başvuru Kartı Bileşeni
 * Başvuruları kart formatında gösterir
 */
import { Link } from 'react-router-dom';
import { Building2, MapPin, Calendar, Eye, X } from 'lucide-react';
import ApplicationStatus from './ApplicationStatus';

const ApplicationCard = ({ application, onCancel }) => {
  // Tarih formatla
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Üst Kısım: Şirket ve Durum */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          {/* Şirket Logosu */}
          <div className="flex-shrink-0">
            {application.firma_logo ? (
              <img
                src={application.firma_logo}
                alt={application.firma_isim}
                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-primary-100 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-primary-600" />
              </div>
            )}
          </div>

          {/* İlan Bilgileri */}
          <div>
            <Link
              to={`/jobs/${application.ilan_id}`}
              className="text-lg font-semibold text-gray-900 hover:text-primary-600 mb-1 block"
            >
              {application.ilan_baslik}
            </Link>
            <p className="text-gray-600 mb-2">{application.firma_isim}</p>

            {/* Lokasyon */}
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{application.sehir_isim || 'Belirtilmemiş'}</span>
            </div>
          </div>
        </div>

        {/* Durum Badge */}
        <ApplicationStatus durum={application.durum} />
      </div>

      {/* Başvuru Detayları */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
        {/* Başvuru Tarihi */}
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>Başvuru: {formatDate(application.basvuru_tarihi)}</span>
        </div>

        {/* Çalışma Şekli */}
        {application.calisma_sekli && (
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            {application.calisma_sekli === 'full-time' && 'Tam Zamanlı'}
            {application.calisma_sekli === 'part-time' && 'Yarı Zamanlı'}
            {application.calisma_sekli === 'remote' && 'Uzaktan'}
            {application.calisma_sekli === 'hybrid' && 'Hibrit'}
          </span>
        )}

        {/* Maaş */}
        {application.maas_aralik && (
          <span className="text-gray-700 font-medium">
            {application.maas_aralik}
          </span>
        )}
      </div>

      {/* Notlar */}
      {application.notlar && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Notunuz:</span> {application.notlar}
          </p>
        </div>
      )}

      {/* Alt Kısım: İşlemler */}
      <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
        <Link
          to={`/jobs/${application.ilan_id}`}
          className="flex items-center gap-1 px-4 py-2 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          İlanı Görüntüle
        </Link>

        {application.durum === 'beklemede' && onCancel && (
          <button
            onClick={() => onCancel(application.id)}
            className="flex items-center gap-1 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors ml-auto"
          >
            <X className="w-4 h-4" />
            İptal Et
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;
