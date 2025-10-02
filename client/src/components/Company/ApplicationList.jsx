/**
 * Başvuru Listesi Bileşeni
 * Başvuruları tablo formatında gösterir
 */
import { useState } from 'react';
import { Eye, Mail, Phone } from 'lucide-react';
import ApplicationStatus from '../Applications/ApplicationStatus';
import ApplicationActions from './ApplicationActions';

const ApplicationList = ({ applications, onStatusChange, onViewDetail }) => {
  const [loadingId, setLoadingId] = useState(null);

  // Tarih formatla
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    setLoadingId(applicationId);
    try {
      await onStatusChange(applicationId, newStatus);
    } finally {
      setLoadingId(null);
    }
  };

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <div className="text-gray-400 text-6xl mb-4">📋</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Henüz başvuru yok
        </h3>
        <p className="text-gray-600">
          Bu ilana henüz başvuru yapılmamış
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Desktop: Tablo */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aday
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İletişim
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tarih
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-50">
                {/* Aday */}
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold">
                        {application.isim?.charAt(0)}{application.soyisim?.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {application.isim} {application.soyisim}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: #{application.id}
                      </div>
                    </div>
                  </div>
                </td>

                {/* İletişim */}
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    {application.email && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Mail className="w-3 h-3" />
                        <a href={`mailto:${application.email}`} className="hover:text-primary-600">
                          {application.email}
                        </a>
                      </div>
                    )}
                    {application.telefon && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone className="w-3 h-3" />
                        <a href={`tel:${application.telefon}`}>
                          {application.telefon}
                        </a>
                      </div>
                    )}
                  </div>
                </td>

                {/* Tarih */}
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(application.basvuru_tarihi)}
                </td>

                {/* Durum */}
                <td className="px-6 py-4">
                  <ApplicationStatus durum={application.durum} />
                </td>

                {/* İşlemler */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onViewDetail(application)}
                      className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      title="Detay"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Kartlar */}
      <div className="md:hidden divide-y divide-gray-200">
        {applications.map((application) => (
          <div key={application.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-medium text-gray-900">
                  {application.isim} {application.soyisim}
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(application.basvuru_tarihi)}
                </div>
              </div>
              <ApplicationStatus durum={application.durum} />
            </div>

            {application.email && (
              <div className="text-sm text-gray-600 mb-1">
                📧 {application.email}
              </div>
            )}

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => onViewDetail(application)}
                className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Detay
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationList;
