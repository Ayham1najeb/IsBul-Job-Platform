/**
 * Admin Doğrulama Sayfası
 * Yeni admin hesabını doğrular
 */
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, Loader, CheckCircle } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useAuthStore } from '../../store/authStore';

const VerifyAdmin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tempPassword, setTempPassword] = useState('');

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  // Kod girişi için otomatik focus
  const handleCodeChange = (index, value) => {
    if (value.length > 1) {
      value = value[0];
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Otomatik olarak sonraki input'a geç
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Backspace ile önceki input'a dön
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Yapıştırma işlemi
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setCode(newCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join('');

    if (verificationCode.length !== 6) {
      setError('Lütfen 6 haneli kodu girin');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await adminService.verifyAdmin(email, verificationCode);

      if (response.success) {
        // Token ve kullanıcı bilgilerini kaydet
        setAuth(response.token, response.user);
        setTempPassword(response.temp_password);

        // Başarı mesajı göster
        setTimeout(() => {
          navigate('/admin');
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.mesaj || 'Doğrulama başarısız oldu');
    } finally {
      setLoading(false);
    }
  };

  if (tempPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Hesap Başarıyla Oluşturuldu! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Admin hesabınız aktifleştirildi. Admin paneline yönlendiriliyorsunuz...
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-yellow-800 mb-2">
              ⚠️ Geçici Şifreniz:
            </p>
            <code className="text-lg font-mono bg-white px-4 py-2 rounded border border-yellow-300 block">
              {tempPassword}
            </code>
            <p className="text-xs text-yellow-700 mt-2">
              Bu şifreyi güvenli bir yerde saklayın ve ilk girişinizde değiştirin.
            </p>
          </div>
          <Loader className="w-6 h-6 text-primary-600 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Doğrulama
          </h2>
          <p className="text-gray-600">
            E-posta adresinize gönderilen 6 haneli kodu girin
          </p>
          <p className="text-sm text-gray-500 mt-2">
            📧 {email}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Kod Girişi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              Doğrulama Kodu
            </label>
            <div className="flex gap-2 justify-center" onPaste={handlePaste}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          {/* Hata Mesajı */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || code.join('').length !== 6}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Doğrulanıyor...
              </>
            ) : (
              'Hesabı Aktifleştir'
            )}
          </button>
        </form>

        {/* Yardım */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Kod gelmedi mi?{' '}
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              Tekrar Gönder
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAdmin;
