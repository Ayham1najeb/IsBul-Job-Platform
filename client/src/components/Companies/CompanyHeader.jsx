/**
 * Şirket Başlık Bileşeni
 * Şirket başlığı ve temel bilgiler
 */
import { Building2, MapPin, Globe, Users, Calendar } from 'lucide-react';

const CompanyHeader = ({ company }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          {company.logo_url ? (
            <img
              src={company.logo_url}
              alt={company.isim}
              className="w-32 h-32 rounded-lg object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-32 h-32 rounded-lg bg-primary-100 flex items-center justify-center border-2 border-primary-200">
              <Building2 className="w-16 h-16 text-primary-600" />
            </div>
          )}
        </div>

        {/* Şirket Bilgileri */}
        <div className="flex-1">
          {/* Başlık */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {company.isim}
          </h1>

          {/* Kategori */}
          {company.kategori_isim && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                {company.kategori_isim}
              </span>
            </div>
          )}

          {/* Detay Bilgileri */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {/* Lokasyon */}
            {company.sehir_isim && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Lokasyon</div>
                  <div>
                    {company.sehir_isim}
                    {company.ilce_isim && `, ${company.ilce_isim}`}
                  </div>
                </div>
              </div>
            )}

            {/* Website */}
            {company.website && (
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Website</div>
                  <a
                    href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    Ziyaret Et
                  </a>
                </div>
              </div>
            )}

            {/* Çalışan Sayısı */}
            {company.calisan_sayisi && (
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Çalışan Sayısı</div>
                  <div>{company.calisan_sayisi}</div>
                </div>
              </div>
            )}

            {/* Kuruluş Yılı */}
            {company.kurulis_yili && (
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Kuruluş Yılı</div>
                  <div>{company.kurulis_yili}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* İletişim Bilgileri */}
      {(company.telefon || company.email || company.adres) && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">İletişim Bilgileri</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {company.telefon && (
              <div>
                <span className="text-gray-600">Telefon:</span>
                <span className="ml-2 text-gray-900">{company.telefon}</span>
              </div>
            )}
            {company.email && (
              <div>
                <span className="text-gray-600">E-posta:</span>
                <a
                  href={`mailto:${company.email}`}
                  className="ml-2 text-primary-600 hover:text-primary-700"
                >
                  {company.email}
                </a>
              </div>
            )}
            {company.adres && (
              <div className="md:col-span-3">
                <span className="text-gray-600">Adres:</span>
                <span className="ml-2 text-gray-900">{company.adres}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyHeader;
