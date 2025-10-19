/**
 * Detaylı İstatistikler Sayfası
 * Platform genelindeki detaylı istatistikler ve grafikler
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader, Download } from 'lucide-react';
import StatsCard from '../../components/Admin/StatsCard';
import { adminService } from '../../services/adminService';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await adminService.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('İstatistikler yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">İstatistikler yüklenemedi</p>
        </div>
      </div>
    );
  }

  // Haftalık ilanlar grafiği
  const weeklyJobsData = {
    labels: stats.haftalik_ilanlar.map(item => 
      new Date(item.tarih).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
    ).reverse(),
    datasets: [{
      label: 'Yeni İlanlar',
      data: stats.haftalik_ilanlar.map(item => item.sayi).reverse(),
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  // Popüler şehirler grafiği
  const citiesData = {
    labels: stats.populer_sehirler.slice(0, 10).map(item => item.sehir),
    datasets: [{
      label: 'İlan Sayısı',
      data: stats.populer_sehirler.slice(0, 10).map(item => item.ilan_sayisi),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(14, 165, 233, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(168, 85, 247, 0.8)'
      ]
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Detaylı İstatistikler</h1>
                <p className="text-gray-600 mt-1">Platform genelindeki tüm istatistikler</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <Download className="w-5 h-5" />
              <span>Rapor İndir</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grafikler */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Haftalık İlanlar */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Son 7 Gün - Yeni İlanlar</h3>
            <Line 
              data={weeklyJobsData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1
                    }
                  }
                }
              }}
            />
          </div>

          {/* Popüler Şehirler */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">En Popüler Şehirler</h3>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <Pie 
                  data={citiesData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'right'
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Kategori Detayları */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategori Bazında İlanlar</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    İlan Sayısı
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Yüzde
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stats.populer_kategoriler.map((category, index) => {
                  const total = stats.populer_kategoriler.reduce((sum, cat) => sum + parseInt(cat.ilan_sayisi), 0);
                  const percentage = ((parseInt(category.ilan_sayisi) / total) * 100).toFixed(1);
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{category.isim}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">
                        {category.ilan_sayisi}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-right">
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Şehir Detayları */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Şehir Bazında İlanlar</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {stats.populer_sehirler.map((city, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">{city.sehir}</p>
                <p className="text-2xl font-bold text-primary-600 mt-1">{city.ilan_sayisi}</p>
                <p className="text-sm text-gray-600">ilan</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
