/**
 * Şirket Kartı Bileşeni
 * Şirketleri kart formatında gösterir
 */
import { Building2, MapPin, Briefcase, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompanyCard = ({ company }) => {
  return (
    <Link
      to={`/companies/${company.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border border-gray-200 hover:border-primary-500"
    >
      {/* Üst Kısım: Logo ve Temel Bilgiler */}
      <div className="flex items-start gap-4 mb-4">
        {/* Şirket Logosu */}
        <div className="flex-shrink-0">
          {company.logo_url ? (
            <img
              src={company.logo_url}
              alt={company.isim}
              className="w-20 h-20 rounded-lg object-cover border border-gray-200"
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-primary-100 flex items-center justify-center">
              <Building2 className="w-10 h-10 text-primary-600" />
            </div>
          )}
        </div>

        {/* Şirket Bilgileri */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
            {company.isim}
          </h3>

          {/* Lokasyon */}
          {company.sehir && (
            <div className="flex items-center gap-1 text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{company.sehir}</span>
            </div>
          )}

          {/* Kategori */}
          {company.kategori && (
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
              {company.kategori}
            </span>
          )}
        </div>
      </div>

      {/* Açıklama */}
      {company.aciklama && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {company.aciklama}
        </p>
      )}

      {/* Alt Kısım: İstatistikler */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        {/* İlan Sayısı */}
        <div className="flex items-center gap-2 text-sm">
          <Briefcase className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">
            <span className="font-semibold text-primary-600">
              {company.ilan_sayisi || 0}
            </span>
            {' '}aktif ilan
          </span>
        </div>

        {/* Website */}
        {company.website && (
          <div className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700">
            <ExternalLink className="w-4 h-4" />
            <span>Website</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CompanyCard;
