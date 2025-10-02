/**
 * Şirket Hakkında Bileşeni
 * Şirket açıklaması ve bilgileri
 */
import { FileText } from 'lucide-react';

const CompanyAbout = ({ aciklama }) => {
  if (!aciklama) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-6 h-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">Şirket Hakkında</h2>
      </div>

      <div className="prose max-w-none text-gray-700 leading-relaxed">
        <p className="whitespace-pre-line">{aciklama}</p>
      </div>
    </div>
  );
};

export default CompanyAbout;
