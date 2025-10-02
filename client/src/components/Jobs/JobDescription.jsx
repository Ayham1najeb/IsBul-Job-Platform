/**
 * İş İlanı Açıklama Bileşeni
 * İlan açıklaması ve sorumluluklar
 */
import { FileText, CheckCircle } from 'lucide-react';

const JobDescription = ({ aciklama, sorumluluklar }) => {
  // Sorumlulukları parse et (JSON string ise)
  const parseSorumluluklar = () => {
    if (!sorumluluklar) return [];
    
    try {
      // JSON string ise parse et
      if (typeof sorumluluklar === 'string') {
        return JSON.parse(sorumluluklar);
      }
      // Array ise direkt döndür
      if (Array.isArray(sorumluluklar)) {
        return sorumluluklar;
      }
      // String ise satırlara böl
      return sorumluluklar.split('\n').filter(s => s.trim());
    } catch (error) {
      // Parse edilemezse string olarak satırlara böl
      return sorumluluklar.split('\n').filter(s => s.trim());
    }
  };

  const sorumlulukListesi = parseSorumluluklar();

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      {/* İş Tanımı */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">İş Tanımı</h2>
        </div>
        <div className="prose max-w-none text-gray-700 leading-relaxed">
          {aciklama ? (
            <p className="whitespace-pre-line">{aciklama}</p>
          ) : (
            <p className="text-gray-500 italic">İş tanımı belirtilmemiş.</p>
          )}
        </div>
      </div>

      {/* Sorumluluklar */}
      {sorumlulukListesi.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Sorumluluklar</h2>
          </div>
          <ul className="space-y-3">
            {sorumlulukListesi.map((sorumluluk, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                </div>
                <span className="text-gray-700 leading-relaxed">{sorumluluk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobDescription;
