/**
 * Şirket Paneli
 * Şirket için ana dashboard
 */
import { Link } from 'react-router-dom';
import { Briefcase, Users, Eye, TrendingUp, Plus } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const CompanyDashboard = () => {
  const { user } = useAuthStore();

  // İstatistikler (şimdilik statik)
  const stats = [
    {
      title: 'Aktif İlanlar',
      value: '0',
      icon: Briefcase,
      color: 'blue',
      link: '/company/jobs'
    },
    {
      title: 'Toplam Başvuru',
      value: '0',
      icon: Users,
      color: 'green',
      link: '/company/applications'
    },
    {
      title: 'İlan Görüntüleme',
      value: '0',
      icon: Eye,
      color: 'purple',
      link: '/company/jobs'
    },
    {
      title: 'Bu Ay Başvuru',
      value: '0',
      icon: TrendingUp,
      color: 'orange',
      link: '/company/applications'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Hoş Geldiniz, {user?.isim || 'Şirket'}
          </h1>
          <p className="text-gray-600 mt-2">
            Şirket panelinize genel bakış
          </p>
        </div>

        {/* Hızlı İşlemler */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Hızlı İşlemler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/company/jobs/create"
              className="flex items-center gap-3 p-4 border-2 border-dashed border-primary-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Yeni İlan Oluştur</div>
                <div className="text-sm text-gray-600">İş ilanı yayınla</div>
              </div>
            </Link>

            <Link
              to="/company/jobs"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-gray-50 transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">İlanları Yönet</div>
                <div className="text-sm text-gray-600">Düzenle veya sil</div>
              </div>
            </Link>

            <Link
              to="/company/applications"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-gray-50 transition-all"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Başvuruları İncele</div>
                <div className="text-sm text-gray-600">Adayları değerlendir</div>
              </div>
            </Link>
          </div>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link
                key={index}
                to={stat.link}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </Link>
            );
          })}
        </div>

        {/* Son İlanlar ve Başvurular */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Son İlanlar */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Son İlanlar</h2>
              <Link to="/company/jobs" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Tümünü Gör →
              </Link>
            </div>
            <div className="text-center py-8 text-gray-500">
              <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>Henüz ilan yok</p>
              <Link
                to="/company/jobs/create"
                className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                İlk İlanı Oluştur
              </Link>
            </div>
          </div>

          {/* Son Başvurular */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Son Başvurular</h2>
              <Link to="/company/applications" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Tümünü Gör →
              </Link>
            </div>
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>Henüz başvuru yok</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
