/**
 * Şirket Paneli
 * Modern ve profesyonel dashboard tasarımı
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  Eye, 
  TrendingUp, 
  Plus,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { companyService } from '../../services/companyService';

const CompanyDashboard = () => {
  const { user } = useAuthStore();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompanyData();
  }, []);

  const loadCompanyData = async () => {
    try {
      const data = await companyService.getMyCompany();
      setCompany(data);
    } catch (error) {
      console.error('Şirket verileri yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: 'Aktif İlanlar',
      value: company?.ilan_sayisi || '0',
      icon: Briefcase,
      gradient: 'from-blue-500 to-blue-600',
      link: '/company/jobs',
      change: '+0%'
    },
    {
      title: 'Toplam Başvuru',
      value: company?.basvuru_sayisi || '0',
      icon: Users,
      gradient: 'from-green-500 to-green-600',
      link: '/company/applications',
      change: '+0%'
    },
    {
      title: 'İlan Görüntüleme',
      value: '0',
      icon: Eye,
      gradient: 'from-purple-500 to-purple-600',
      link: '/company/jobs',
      change: '+0%'
    },
    {
      title: 'Profil Tamamlama',
      value: `${company?.profil_tamamlanma || 0}%`,
      icon: TrendingUp,
      gradient: 'from-orange-500 to-orange-600',
      link: '/company/profile',
      change: ''
    }
  ];

  const quickActions = [
    {
      title: 'Yeni İlan Oluştur',
      description: 'İş ilanı yayınla',
      icon: Plus,
      link: '/company/jobs/create',
      color: 'blue',
      disabled: company?.profil_tamamlanma < 50
    },
    {
      title: 'İlanları Yönet',
      description: 'Düzenle veya sil',
      icon: Briefcase,
      link: '/company/jobs',
      color: 'indigo',
      disabled: false
    },
    {
      title: 'Başvuruları İncele',
      description: 'Adayları değerlendir',
      icon: Users,
      link: '/company/applications',
      color: 'green',
      disabled: false
    },
    {
      title: 'Profili Tamamla',
      description: 'Şirket bilgilerini düzenle',
      icon: Building2,
      link: '/company/profile',
      color: 'purple',
      disabled: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Hoş Geldiniz, {company?.isim || user?.isim || 'Şirket'}
              </h1>
              <p className="text-blue-100 text-lg">
                Şirket panelinize genel bakış
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Building2 className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profil Uyarısı */}
        {company && company.profil_tamamlanma < 50 && (
          <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-xl p-6 shadow-sm">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                  Profilinizi Tamamlayın
                </h3>
                <p className="text-yellow-800 mb-4">
                  İlan yayınlayabilmek için profilinizi en az %50 tamamlamalısınız. 
                  Şu an: <span className="font-bold">%{company.profil_tamamlanma}</span>
                </p>
                <Link
                  to="/company/profile"
                  className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                >
                  Profili Tamamla
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link
                key={index}
                to={stat.link}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    {stat.change && (
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {stat.change}
                      </span>
                    )}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.title}</div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Hızlı İşlemler */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Hızlı İşlemler</h2>
              <p className="text-gray-600 mt-1">Sık kullanılan işlemler</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600',
                indigo: 'from-indigo-500 to-indigo-600',
                green: 'from-green-500 to-green-600',
                purple: 'from-purple-500 to-purple-600'
              };
              
              return action.disabled ? (
                <div
                  key={index}
                  className="relative p-6 border-2 border-gray-200 rounded-xl bg-gray-50 opacity-60 cursor-not-allowed"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[action.color]} flex items-center justify-center mb-4 opacity-50`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">{action.title}</div>
                  <div className="text-sm text-gray-600">{action.description}</div>
                  <div className="absolute top-2 right-2">
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                      Kilitli
                    </span>
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  to={action.link}
                  className="group relative p-6 border-2 border-gray-200 rounded-xl hover:border-transparent hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[action.color]} opacity-0 group-hover:opacity-100 transition-opacity rounded-xl`}></div>
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[action.color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-semibold text-gray-900 mb-1 group-hover:text-white transition-colors">
                      {action.title}
                    </div>
                    <div className="text-sm text-gray-600 group-hover:text-white/90 transition-colors">
                      {action.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Son İlanlar ve Başvurular */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Son İlanlar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mr-3">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Son İlanlar</h2>
                  <p className="text-sm text-gray-600">Yayınlanan ilanlarınız</p>
                </div>
              </div>
              <Link 
                to="/company/jobs" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                Tümü
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4">Henüz ilan yok</p>
              <Link
                to="/company/jobs/create"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg font-medium"
              >
                <Plus className="w-5 h-5 mr-2" />
                İlk İlanı Oluştur
              </Link>
            </div>
          </div>

          {/* Son Başvurular */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Son Başvurular</h2>
                  <p className="text-sm text-gray-600">Gelen başvurular</p>
                </div>
              </div>
              <Link 
                to="/company/applications" 
                className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
              >
                Tümü
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-600">Henüz başvuru yok</p>
              <p className="text-sm text-gray-500 mt-2">
                İlan yayınladığınızda başvurular burada görünecek
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
