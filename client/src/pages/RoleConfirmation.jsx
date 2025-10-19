/**
 * Rol Onay Sayfası
 * İlk giriş için rol değişikliği onayı
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, Briefcase, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../config/api';

const RoleConfirmation = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const roleInfo = {
    'admin': {
      title: 'Admin',
      icon: Shield,
      color: 'purple',
      description: 'Platform yönetimi ve kullanıcı kontrolü yetkilerine sahip olacaksınız.',
      permissions: [
        'Tüm kullanıcıları görüntüleme ve yönetme',
        'İş ilanlarını onaylama/reddetme',
        'Platform istatistiklerini görüntüleme',
        'Şirket hesaplarını yönetme'
      ]
    },
    'firma': {
      title: 'Şirket',
      icon: Briefcase,
      color: 'blue',
      description: 'İş ilanı yayınlama ve başvuruları yönetme yetkilerine sahip olacaksınız.',
      permissions: [
        'İş ilanı oluşturma ve yönetme',
        'Başvuruları görüntüleme ve değerlendirme',
        'Şirket profili oluşturma',
        'Adaylarla mesajlaşma'
      ]
    },
    'is_arayan': {
      title: 'İş Arayan',
      icon: UserIcon,
      color: 'green',
      description: 'İş arama ve başvuru yapma yetkilerine sahip olacaksınız.',
      permissions: [
        'İş ilanlarını görüntüleme ve başvurma',
        'Özgeçmiş oluşturma',
        'İş ilanlarını kaydetme',
        'Şirketlerle mesajlaşma'
      ]
    }
  };

  const info = roleInfo[user?.rol] || roleInfo['is_arayan'];
  const Icon = info.icon;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      
      // Rolü onayla
      await api.put('/users/confirm-role.php');
      
      // Store'u güncelle
      updateUser({ ...user, rol_confirmed: true });
      
      // Yönlendir
      if (user?.rol === 'admin') {
        navigate('/admin');
      } else if (user?.rol === 'firma') {
        navigate('/company/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Rol onaylama hatası:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-20 h-20 bg-${info.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Icon className={`w-10 h-10 text-${info.color}-600`} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Yeni Rolünüz: {info.title}
          </h1>
          <p className="text-gray-600">
            Hesabınızın rolü değiştirildi
          </p>
        </div>

        {/* Description */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <p className="text-gray-700 mb-4">
            {info.description}
          </p>
          
          <h3 className="font-semibold text-gray-900 mb-3">Yeni Yetkileriniz:</h3>
          <ul className="space-y-2">
            {info.permissions.map((permission, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{permission}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>Önemli:</strong> Bu değişikliği onayladıktan sonra, yeni rolünüze uygun özelliklere erişebileceksiniz.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`flex-1 py-3 bg-${info.color}-600 text-white rounded-lg hover:bg-${info.color}-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium`}
          >
            {loading ? 'Onaylanıyor...' : 'Anladım, Devam Et'}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Sorularınız için destek ekibimizle iletişime geçebilirsiniz.
        </p>
      </div>
    </div>
  );
};

export default RoleConfirmation;
