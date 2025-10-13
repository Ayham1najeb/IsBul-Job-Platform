/**
 * Kontrol Paneli Bileşeni
 * Kullanıcı ana kontrol paneli
 */
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  FileText, 
  MessageSquare, 
  User, 
  Bookmark,
  FileUser,
  Settings,
  TrendingUp,
  Clock,
  ArrowRight,
  Eye,
  Send,
  CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuthStore();


  const quickActions = user?.rol === 'is_arayan' ? [
    { icon: FileUser, label: 'Özgeçmişim', path: '/resume', color: 'blue' },
    { icon: Briefcase, label: 'İş İlanları', path: '/jobs', color: 'green' },
    { icon: MessageSquare, label: 'Mesajlar', path: '/messages', color: 'purple' },
    { icon: Bookmark, label: 'Kayıtlı İşler', path: '/saved-jobs', color: 'orange' },
  ] : [
    { icon: Briefcase, label: 'İlan Oluştur', path: '/company/jobs/create', color: 'blue' },
    { icon: FileText, label: 'İlanlarım', path: '/company/jobs', color: 'green' },
    { icon: MessageSquare, label: 'Mesajlar', path: '/messages', color: 'purple' },
    { icon: User, label: 'Başvurular', path: '/company/applications', color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900">
            Hoş geldin, {user?.isim}! 👋
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            {user?.rol === 'is_arayan' && 'Bugün hangi fırsatları keşfedeceksin?'}
            {user?.rol === 'firma' && 'İşletmenizi büyütmeye hazır mısınız?'}
            {user?.rol === 'admin' && 'Sistemi yönetmeye hazırsınız'}
          </p>
        </div>

        {/* Hızlı Erişim */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Hızlı Erişim
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className={`group bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all hover:-translate-y-1 border-2 border-transparent ${
                  action.color === 'blue' ? 'hover:border-blue-200' :
                  action.color === 'green' ? 'hover:border-green-200' :
                  action.color === 'purple' ? 'hover:border-purple-200' :
                  'hover:border-orange-200'
                }`}
              >
                <div className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{action.label}</h3>
                <div className="flex items-center text-sm text-gray-500 group-hover:text-blue-600">
                  <span>Git</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/saved-jobs" className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg hover:shadow-xl p-6 text-white transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Kayıtlı İşler</p>
                <p className="text-3xl font-bold mt-2">0</p>
                <p className="text-blue-100 text-xs mt-1">İş ilanı</p>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Bookmark className="h-7 w-7" />
              </div>
            </div>
          </Link>

          <Link to="/applications" className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg hover:shadow-xl p-6 text-white transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Başvurular</p>
                <p className="text-3xl font-bold mt-2">0</p>
                <p className="text-green-100 text-xs mt-1">Başvuru</p>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Send className="h-7 w-7" />
              </div>
            </div>
          </Link>

          <Link to="/messages" className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl p-6 text-white transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Mesajlar</p>
                <p className="text-3xl font-bold mt-2">0</p>
                <p className="text-purple-100 text-xs mt-1">Yeni mesaj</p>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-7 w-7" />
              </div>
            </div>
          </Link>

          <Link to="/profile" className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg hover:shadow-xl p-6 text-white transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Profil</p>
                <p className="text-2xl font-bold mt-2">%60</p>
                <p className="text-orange-100 text-xs mt-1">Tamamlandı</p>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <User className="h-7 w-7" />
              </div>
            </div>
          </Link>
        </div>

        {/* Alt Bölüm */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Son Aktiviteler */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Son Aktiviteler
              </h2>
              <Link to="/profile" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Tümünü Gör
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Profil oluşturuldu</p>
                  <p className="text-xs text-gray-500">Bugün</p>
                </div>
              </div>
              <div className="text-center py-6 text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Daha fazla aktivite yok</p>
              </div>
            </div>
          </div>

          {/* Önerilen İşler / Hızlı Linkler */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                {user?.rol === 'is_arayan' ? 'Önerilen İşler' : 'Hızlı İşlemler'}
              </h2>
              <Link to="/jobs" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Tümünü Gör
              </Link>
            </div>
            <div className="space-y-3">
              {user?.rol === 'is_arayan' ? (
                <>
                  <Link to="/jobs" className="block p-4 border-2 border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">İş İlanlarını Keşfet</h3>
                        <p className="text-sm text-gray-500">Sana uygun işleri bul</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Link>
                  <Link to="/resume" className="block p-4 border-2 border-gray-100 rounded-xl hover:border-green-200 hover:bg-green-50 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">Özgeçmişini Tamamla</h3>
                        <p className="text-sm text-gray-500">Profilini güçlendir</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/company/jobs/create" className="block p-4 border-2 border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">Yeni İlan Oluştur</h3>
                        <p className="text-sm text-gray-500">Pozisyon ekle</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Link>
                  <Link to="/company/applications" className="block p-4 border-2 border-gray-100 rounded-xl hover:border-green-200 hover:bg-green-50 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">Başvuruları İncele</h3>
                        <p className="text-sm text-gray-500">Adayları değerlendir</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
