/**
 * Başvuru Detay Bileşeni
 * Başvuru ve aday detaylarını gösterir
 */
import { useState } from 'react';
import { User, Mail, Phone, Calendar, FileText, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ApplicationStatus from '../Applications/ApplicationStatus';

const ApplicationDetail = ({ application }) => {
  const navigate = useNavigate();
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
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          Özgeçmiş Bilgileri
        </h3>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{application.deneyim_sayisi || 0}</div>
            <div className="text-xs text-gray-600">Deneyim</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-2xl font-bold text-green-600">{application.egitim_sayisi || 0}</div>
            <div className="text-xs text-gray-600">Eğitim</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{application.beceri_sayisi || 0}</div>
            <div className="text-xs text-gray-600">Beceri</div>
          </div>
        </div>
        
        <button
          onClick={() => navigate(`/company/applicant-resume/${application.kullanici_id}/${application.id}`)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg font-semibold"
        >
          <Eye className="w-5 h-5" />
          <span>Özgeçmişi Görüntüle</span>
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetail;
