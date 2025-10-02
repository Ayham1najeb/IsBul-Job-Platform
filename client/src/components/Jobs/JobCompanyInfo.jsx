/**
 * Şirket Bilgisi Bileşeni
 * İlanı yayınlayan şirket hakkında bilgi
 */
import { Building2, MapPin, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCompanyInfo = ({ 
  firma_id,
  firma_isim, 
  firma_logo, 
  firma_aciklama,
  firma_website,
  sehir_isim,
  ilce_isim
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="w-6 h-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">Şirket Hakkında</h2>
      </div>

      {/* Şirket Başlığı */}
      <div className="flex items-start gap-4 mb-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          {firma_logo ? (
            <img 
              src={firma_logo} 
              alt={firma_isim}
              className="w-20 h-20 rounded-lg object-cover border border-gray-200"
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center">
              <Building2 className="w-10 h-10 text-gray-400" />
            </div>
          )}
        </div>

        {/* Şirket Adı ve Bilgiler */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{firma_isim}</h3>
          
          <div className="space-y-2 text-sm text-gray-600">
            {/* Lokasyon */}
            {sehir_isim && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>
                  {sehir_isim}
                  {ilce_isim && `, ${ilce_isim}`}
                </span>
              </div>
            )}

            {/* Website */}
            {firma_website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <a 
                  href={firma_website.startsWith('http') ? firma_website : `https://${firma_website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 hover:underline"
                >
                  {firma_website}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Şirket Açıklaması */}
      {firma_aciklama && (
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed line-clamp-4">
            {firma_aciklama}
          </p>
        </div>
      )}

      {/* Şirket Sayfasına Git */}
      {firma_id && (
        <div className="pt-4 border-t border-gray-200">
          <Link
            to={`/companies/${firma_id}`}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <Building2 className="w-5 h-5" />
            Şirket Profilini Görüntüle
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default JobCompanyInfo;
