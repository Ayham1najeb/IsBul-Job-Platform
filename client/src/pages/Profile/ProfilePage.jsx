/**
 * Profil Sayfası
 * Kullanıcı profil bilgilerini gösterir
 */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { profileService } from '../../services/profileService';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import { Edit, Lock, Loader, Briefcase, FileText } from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const [user, setUser] = useState(authUser);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await profileService.getProfile();
      console.log('API Response:', response);
      const profileData = response.data;
      console.log('Profile Data:', profileData);
      setUser(profileData);
      // Store'u da güncelle
      updateUser({
        ...authUser,
        ...profileData
      });
    } catch (error) {
      console.error('Profil yüklenemedi:', error);
      console.error('Error details:', error.response?.data);
      // Hata durumunda authUser'ı kullan
      setUser(authUser);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (file) => {
    // Dosya boyutu kontrolü kaldırıldı çünkü sıkıştırma ProfileHeader'da yapılıyor
    // Resim zaten sıkıştırılmış olarak geliyor
    
    try {
      setUploading(true);
      const response = await profileService.uploadPhoto(file);
      
      console.log('Upload response:', response);
      console.log('File size:', (file.size / 1024).toFixed(2) + ' KB');
      
      // Profili yeniden yükle
      await loadProfile();
      
      alert('✅ Profil fotoğrafı başarıyla güncellendi!');
    } catch (error) {
      console.error('Fotoğraf yükleme hatası:', error);
      console.error('Error response:', error.response?.data);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
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
