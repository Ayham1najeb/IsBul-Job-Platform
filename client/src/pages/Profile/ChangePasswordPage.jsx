/**
 * Şifre Değiştirme Sayfası
 * Kullanıcı şifre değiştirme
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import { ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react';

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleShowPassword = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Şifre kontrolü
    if (formData.new_password !== formData.confirm_password) {
      alert('❌ Yeni şifreler eşleşmiyor!');
      return;
    }

    if (formData.new_password.length < 6) {
      alert('❌ Şifre en az 6 karakter olmalıdır!');
      return;
    }

    try {
      setLoading(true);
      await userService.changePassword({
        current_password: formData.current_password,
        new_password: formData.new_password
      });
      
      alert('✅ Şifre başarıyla değiştirildi!');
      // Formu temizle
      setFormData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
      // 1 saniye sonra profile'a dön
      setTimeout(() => {
        navigate('/profile');
      }, 1000);
    } catch (error) {
      console.error('Şifre değiştirme hatası:', error);
      alert('❌ ' + (error.response?.data?.mesaj || 'Şifre değiştirilemedi. Lütfen mevcut şifrenizi kontrol edin.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Profile Dön
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Şifre Değiştir</h1>
          <p className="text-gray-600 mt-2">
            Hesap güvenliğiniz için güçlü bir şifre kullanın
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mevcut Şifre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mevcut Şifre *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  name="current_password"
                  value={formData.current_password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => toggleShowPassword('current')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Yeni Şifre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yeni Şifre *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => toggleShowPassword('new')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                En az 6 karakter olmalıdır
              </p>
            </div>

            {/* Şifre Tekrar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yeni Şifre (Tekrar) *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => toggleShowPassword('confirm')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Uyarı */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Güvenlik İpuçları:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Güçlü ve benzersiz bir şifre kullanın</li>
                    <li>Büyük/küçük harf, rakam ve özel karakter kullanın</li>
                    <li>Şifrenizi kimseyle paylaşmayın</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                {loading ? 'Kaydediliyor...' : 'Şifreyi Kaydet'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
