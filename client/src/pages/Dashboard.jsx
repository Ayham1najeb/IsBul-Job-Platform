/**
 * Kontrol Paneli Bileşeni
 * Kullanıcı ana kontrol paneli
 */
import { useAuthStore } from '../store/authStore';
import { Briefcase, FileText, MessageSquare, User } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Hoş geldin, {user?.isim} {user?.soyisim}
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.rol === 'is_arayan' && 'İş Arayan Kontrol Paneli'}
            {user?.rol === 'firma' && 'Şirket Kontrol Paneli'}
            {user?.rol === 'admin' && 'Yönetici Kontrol Paneli'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Kayıtlı İşler</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
              </div>
              <Briefcase className="h-10 w-10 text-primary-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Başvurular</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
              </div>
              <FileText className="h-10 w-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Mesajlar</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
              </div>
              <MessageSquare className="h-10 w-10 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Profil</p>
                <p className="text-sm font-medium text-gray-900 mt-1">%60 Tamamlandı</p>
              </div>
              <User className="h-10 w-10 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Son Aktiviteler</h2>
            <div className="text-center py-8 text-gray-500">
              Henüz aktivite yok
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Önerilen İşler</h2>
            <div className="text-center py-8 text-gray-500">
              Henüz öneri yok
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
