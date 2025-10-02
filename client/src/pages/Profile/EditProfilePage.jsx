/**
 * Profil Düzenleme Sayfası
 * Kullanıcı profil bilgilerini düzenleme
 */
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { userService } from '../../services/userService';
import ProfileForm from '../../components/Profile/ProfileForm';
import { ArrowLeft } from 'lucide-react';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  const handleSubmit = async (formData) => {
    try {
      await userService.updateProfile(formData);
      
      // Store'u güncelle
      setUser({
        ...user,
        ...formData
      });
      
      alert('Profil güncellendi!');
      navigate('/profile');
    } catch (error) {
      console.error('Profil güncelleme hatası:', error);
      alert(error.response?.data?.mesaj || 'Profil güncellenemedi.');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
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
        <div className="bg-white rounded-lg shadow p-6">
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
