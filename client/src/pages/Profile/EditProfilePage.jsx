/**
 * Profil Düzenleme Sayfası
 * Kullanıcı profil bilgilerini düzenleme
 */
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { profileService } from '../../services/profileService';
import ProfileForm from '../../components/Profile/ProfileForm';
import { ArrowLeft } from 'lucide-react';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);

  const handleSubmit = async (formData) => {
    try {
      await profileService.updateProfile(formData);
      
      // Store'u güncelle
      updateUser({
        ...user,
        ...formData
      });
      
      alert('✅ Profil başarıyla güncellendi!');
      navigate('/profile');
    } catch (error) {
      console.error('Profil güncelleme hatası:', error);
      alert(error.response?.data?.mesaj || '❌ Profil güncellenemedi.');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Profile Dön
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Profili Düzenle</h1>
          <p className="text-gray-600 mt-2">
            Profil bilgilerinizi güncelleyin
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <ProfileForm
            initialData={user}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
