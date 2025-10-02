/**
 * Başvuru Detay Bileşeni
 * Başvuru ve aday detaylarını gösterir
 */
import { User, Mail, Phone, Calendar, FileText, Download } from 'lucide-react';
import ApplicationStatus from '../Applications/ApplicationStatus';

const ApplicationDetail = ({ application }) => {
  // Tarih formatla
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Başvuru Bilgileri */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Başvuru Bilgileri</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Başvuru Tarihi:</span>
            <span className="font-medium text-gray-900">
              {formatDate(application.basvuru_tarihi)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Durum:</span>
            <ApplicationStatus durum={application.durum} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Başvuru ID:</span>
            <span className="font-mono text-sm text-gray-900">#{application.id}</span>
          </div>
        </div>
      </div>

      {/* Aday Bilgileri */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Aday Bilgileri</h3>
        
        <div className="space-y-4">
          {/* İsim */}
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <div className="text-sm text-gray-600">Ad Soyad</div>
              <div className="font-medium text-gray-900">
                {application.isim} {application.soyisim}
              </div>
            </div>
          </div>

          {/* Email */}
          {application.email && (
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm text-gray-600">E-posta</div>
                <a
                  href={`mailto:${application.email}`}
                  className="font-medium text-primary-600 hover:text-primary-700"
                >
                  {application.email}
                </a>
              </div>
            </div>
          )}

          {/* Telefon */}
          {application.telefon && (
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm text-gray-600">Telefon</div>
                <a
                  href={`tel:${application.telefon}`}
                  className="font-medium text-gray-900"
                >
                  {application.telefon}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Başvuru Notları */}
      {application.notlar && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Başvuru Notları</h3>
          <p className="text-gray-700 whitespace-pre-line">{application.notlar}</p>
        </div>
      )}

      {/* Özgeçmiş */}
      {application.ozgecmis_url && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Özgeçmiş</h3>
          <a
            href={application.ozgecmis_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Özgeçmişi Görüntüle</span>
            <Download className="w-4 h-4 ml-auto" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetail;
