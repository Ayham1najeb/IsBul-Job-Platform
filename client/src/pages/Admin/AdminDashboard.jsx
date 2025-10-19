/**
 * Admin Dashboard Sayfası
 * Platform genelindeki istatistikleri ve özet bilgileri gösterir
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Briefcase, Building2, FileText, TrendingUp, 
  Activity, MapPin, Loader, ArrowRight 
} from 'lucide-react';
import StatsCard from '../../components/Admin/StatsCard';
import { adminService } from '../../services/adminService';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
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

  // Haftalık kullanıcı grafiği verisi
  const weeklyUsersData = {
    labels: stats.haftalik_kullanicilar.map(item => 
      new Date(item.tarih).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
    ).reverse(),
    datasets: [{
      label: 'Yeni Kullanıcılar',
      data: stats.haftalik_kullanicilar.map(item => item.sayi).reverse(),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  // Kullanıcı rolleri grafiği
  const userRolesData = {
    labels: stats.kullanici_rolleri.map(item => {
      const roleNames = {
        'is_arayan': 'İş Arayan',
        'firma': 'Şirket',
        'admin': 'Admin'
      };
      return roleNames[item.rol] || item.rol;
    }),
    datasets: [{
      data: stats.kullanici_rolleri.map(item => item.count),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)'
      ],
      borderWidth: 0
    }]
  };

  // Popüler kategoriler grafiği
  const categoriesData = {
    labels: stats.populer_kategoriler.slice(0, 5).map(item => item.isim),
    datasets: [{
      label: 'İlan Sayısı',
      data: stats.populer_kategoriler.slice(0, 5).map(item => item.ilan_sayisi),
      backgroundColor: 'rgba(139, 92, 246, 0.8)',
      borderRadius: 8
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
              <p className="text-gray-600 mt-1">Platform yönetimi ve istatistikler</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/admin/users"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Kullanıcı Yönetimi
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Toplam Kullanıcı"
            value={stats.genel.toplam_kullanici}
            icon={Users}
            color="blue"
          />
          <StatsCard
            title="Aktif İlanlar"
            value={stats.genel.aktif_ilan}
            icon={Briefcase}
            color="green"
          />
          <StatsCard
            title="Toplam Başvuru"
            value={stats.genel.toplam_basvuru}
            icon={FileText}
            color="purple"
          />
          <StatsCard
            title="Toplam Şirket"
            value={stats.genel.toplam_sirket}
            icon={Building2}
            color="orange"
          />
          <StatsCard
            title="Toplam İlan"
            value={stats.genel.toplam_ilan}
            icon={Activity}
            color="indigo"
          />
          <StatsCard
            title="Aylık Başvuru"
            value={stats.genel.aylik_basvuru}
            icon={TrendingUp}
            color="red"
          />
        </div>

        {/* Grafikler */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Haftalık Kullanıcılar */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Son 7 Gün - Yeni Kullanıcılar</h3>
            <Line 
              data={weeklyUsersData}
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

          {/* Kullanıcı Rolleri */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kullanıcı Dağılımı</h3>
            <div className="flex items-center justify-center">
              <div className="w-64 h-64">
                <Doughnut 
                  data={userRolesData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Popüler Kategoriler */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">En Popüler Kategoriler</h3>
          <Bar 
            data={categoriesData}
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

        {/* Hızlı Erişim */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/admin/users"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Kullanıcı Yönetimi</h4>
            <p className="text-sm text-gray-600">Kullanıcıları görüntüle ve yönet</p>
          </Link>

          <Link
            to="/admin/jobs"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center justify-between mb-4">
              <Briefcase className="w-8 h-8 text-green-600" />
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">İlan Yönetimi</h4>
            <p className="text-sm text-gray-600">İlanları onayla veya reddet</p>
          </Link>

          <Link
            to="/admin/companies"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center justify-between mb-4">
              <Building2 className="w-8 h-8 text-purple-600" />
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Şirket Yönetimi</h4>
            <p className="text-sm text-gray-600">Şirketleri görüntüle ve yönet</p>
          </Link>

          <Link
            to="/admin/statistics"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-orange-600" />
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Detaylı İstatistikler</h4>
            <p className="text-sm text-gray-600">Tüm istatistikleri görüntüle</p>
          </Link>
        </div>

        {/* Popüler Şehirler */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">En Popüler Şehirler</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stats.populer_sehirler.slice(0, 10).map((city, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-medium text-gray-900">{city.sehir}</p>
                  <p className="text-sm text-gray-600">{city.ilan_sayisi} ilan</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
