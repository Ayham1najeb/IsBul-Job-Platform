/**
 * Şirket İstatistikleri Bileşeni
 * Şirket istatistikleri ve metrikleri
 */
import { Briefcase, Users, Star, TrendingUp } from 'lucide-react';

const CompanyStats = ({ ilanlar = [] }) => {
  // İstatistikleri hesapla
  const stats = {
    toplamIlan: ilanlar.length,
    aktifIlan: ilanlar.filter(i => i.aktif).length,
    // Ortalama maaş hesaplanabilir (şimdilik 0)
    ortalamaMaas: 0,
    // Ortalama değerlendirme (şimdilik 0)
    ortalamaDegerlendirme: 0
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Şirket İstatistikleri</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Toplam İlan */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.toplamIlan}
              </div>
              <div className="text-sm text-gray-600">Toplam İlan</div>
            </div>
          </div>
        </div>

        {/* Aktif İlan */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.aktifIlan}
              </div>
              <div className="text-sm text-gray-600">Aktif İlan</div>
            </div>
          </div>
        </div>

        {/* Değerlendirme (Placeholder) */}
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.ortalamaDegerlendirme.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Değerlendirme</div>
            </div>
          </div>
        </div>

        {/* Takipçi (Placeholder) */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Takipçi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyStats;
