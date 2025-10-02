/**
 * Profil Sayfası
 * Kullanıcı profil bilgilerini gösterir
 */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { userService } from '../../services/userService';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import { Edit, Lock, Loader, Briefcase, FileText } from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuthStore();
  const [user, setUser] = useState(authUser);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // TODO: API'den profil bilgilerini çek
    // loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await userService.getProfile();
      setUser(data);
    } catch (error) {
      console.error('Profil yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (file) => {
    // Dosya türü kontrolü
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Sadece resim dosyaları yüklenebilir (JPG, PNG, GIF, WEBP)');
      return;
    }

    // Dosya boyutu kontrolü (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Dosya boyutu 5MB\'dan küçük olmalıdır');
      return;
    }

    try {
      setUploading(true);
      const response = await userService.uploadPhoto(file);
      
      // Kullanıcı bilgilerini güncelle
      const updatedUser = { ...user, profil_foto: response.profil_foto };
      setUser(updatedUser);
      
      // Store'u güncelle
      useAuthStore.getState().updateUser(updatedUser);
      
      alert('✅ Profil fotoğrafı başarıyla güncellendi!');
    } catch (error) {
      console.error('Fotoğraf yükleme hatası:', error);
      alert('❌ Fotoğraf yüklenemedi: ' + (error.response?.data?.mesaj || error.message));
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Profil yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <ProfileHeader user={user} onPhotoUpload={handlePhotoUpload} />

        {/* İçerik */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol: Profil Bilgileri */}
          <div className="lg:col-span-2">
            <ProfileInfo user={user} />
          </div>

          {/* Sağ: Hızlı İşlemler */}
          <div className="lg:col-span-1 space-y-4">
            {/* Profil Düzenle */}
            <Link
              to="/profile/edit"
              className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Edit className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Profili Düzenle</div>
                  <div className="text-sm text-gray-600">Bilgilerini güncelle</div>
                </div>
              </div>
            </Link>

            {/* Şifre Değiştir */}
            <Link
              to="/profile/change-password"
              className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Şifre Değiştir</div>
                  <div className="text-sm text-gray-600">Güvenlik ayarları</div>
                </div>
              </div>
            </Link>

            {/* İş Arayan için Özgeçmiş */}
            {user.rol === 'is_arayan' && (
              <>
                <Link
                  to="/resume"
                  className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Özgeçmişim</div>
                      <div className="text-sm text-gray-600">CV'ni yönet</div>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/applications"
                  className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Başvurularım</div>
                      <div className="text-sm text-gray-600">Başvurularını gör</div>
                    </div>
                  </div>
                </Link>
              </>
            )}

            {/* Şirket için Panel */}
            {user.rol === 'firma' && (
              <Link
                to="/company/dashboard"
                className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Şirket Paneli</div>
                    <div className="text-sm text-gray-600">İlanlarını yönet</div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
