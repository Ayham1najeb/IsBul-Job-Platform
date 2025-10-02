/**
 * İş Gereksinimleri Bileşeni
 * İlan gereksinimleri ve nitelikler
 */
import { ClipboardList, GraduationCap, Award } from 'lucide-react';

const JobRequirements = ({ gereksinimler, egitim_seviyesi, deneyim_yili }) => {
  // Gereksinimleri parse et
  const parseGereksinimler = () => {
    if (!gereksinimler) return [];
    
    try {
      if (typeof gereksinimler === 'string') {
        // JSON string ise parse et
        try {
          return JSON.parse(gereksinimler);
        } catch {
          // JSON değilse satırlara böl
          return gereksinimler.split('\n').filter(s => s.trim());
        }
      }
      if (Array.isArray(gereksinimler)) {
        return gereksinimler;
      }
      return [];
    } catch (error) {
      return [];
    }
  };

  const gereksinimListesi = parseGereksinimler();

  // Eğitim seviyesi etiketleri
  const egitimSeviyeleri = {
    'lise': 'Lise',
    'onlisans': 'Ön Lisans',
    'lisans': 'Lisans',
    'yuksek_lisans': 'Yüksek Lisans',
    'doktora': 'Doktora'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <ClipboardList className="w-6 h-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">Aranan Nitelikler</h2>
      </div>

      {/* Eğitim ve Deneyim */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        {/* Eğitim Seviyesi */}
        {egitim_seviyesi && (
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Eğitim Seviyesi</div>
              <div className="font-semibold text-gray-900">
                {egitimSeviyeleri[egitim_seviyesi] || egitim_seviyesi}
              </div>
            </div>
          </div>
        )}

        {/* Deneyim */}
        {deneyim_yili !== undefined && deneyim_yili !== null && (
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Deneyim</div>
              <div className="font-semibold text-gray-900">
                {deneyim_yili === 0 ? 'Deneyim gerekmez' : `${deneyim_yili} yıl`}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Gereksinimler Listesi */}
      {gereksinimListesi.length > 0 ? (
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Gereksinimler:</h3>
          <ul className="space-y-3">
            {gereksinimListesi.map((gereksinim, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 leading-relaxed">{gereksinim}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 italic">Gereksinimler belirtilmemiş.</p>
      )}
    </div>
  );
};

export default JobRequirements;
