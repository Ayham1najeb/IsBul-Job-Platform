/**
 * Kayıt Sayfası Bileşeni
 * Modern ve kullanıcı dostu kayıt formu
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Briefcase, Mail, Lock, User, Phone, AlertCircle, Eye, EyeOff, CheckCircle, Building2, Sparkles, Shield, Zap, UserPlus } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    isim: '',
    soyisim: '',
    email: '',
    sifre: '',
    telefon: '',
    rol: 'is_arayan',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Kayıt hatası:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 page-transition relative overflow-hidden">
      {/* Arka plan dekoratif elementler */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-40 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-20 right-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link to="/" className="flex justify-center animate-scale-in">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <Briefcase className="h-14 w-14 text-purple-600 group-hover:text-purple-700 transition-colors" />
              <Sparkles className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              İş Bul
            </span>
          </div>
        </Link>
        
        <h2 className="mt-8 text-center text-4xl font-bold text-gray-900 animate-fade-in">
          Ücretsiz Hesap Oluştur 🚀
        </h2>
        <p className="mt-4 text-center text-base text-gray-600 animate-fade-in" style={{animationDelay: '0.1s'}}>
          Zaten hesabınız var mı?{' '}
          <Link 
            to="/login" 
            className="font-semibold text-purple-600 hover:text-purple-700 transition-colors underline decoration-2 underline-offset-2"
          >
            Hemen giriş yapın
          </Link>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-sm py-10 px-6 shadow-2xl sm:rounded-3xl sm:px-12 border border-gray-100 animate-scale-in" style={{animationDelay: '0.2s'}}>
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3 animate-slide-in-up shadow-sm">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="isim" className="block text-sm font-semibold text-gray-700 mb-2">
                  Ad
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="isim"
                    name="isim"
                    type="text"
                    required
                    value={formData.isim}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-900 font-medium"
                    placeholder="Adınız"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="soyisim" className="block text-sm font-semibold text-gray-700 mb-2">
                  Soyad
                </label>
                <div className="relative">
                  <input
                    id="soyisim"
                    name="soyisim"
                    type="text"
                    required
                    value={formData.soyisim}
                    onChange={handleChange}
                    className="appearance-none block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-900 font-medium"
                    placeholder="Soyadınız"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                E-posta Adresi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-900 font-medium"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="telefon" className="block text-sm font-semibold text-gray-700 mb-2">
                Telefon (İsteğe Bağlı)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="telefon"
                  name="telefon"
                  type="tel"
                  value={formData.telefon}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-900 font-medium"
                  placeholder="+90 555 123 4567"
                />
              </div>
            </div>

            <div>
              <label htmlFor="sifre" className="block text-sm font-semibold text-gray-700 mb-2">
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="sifre"
                  name="sifre"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={formData.sifre}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-900 font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                En az 6 karakter olmalıdır
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Hesap Tipi Seçin
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, rol: 'is_arayan'})}
                  className={`flex flex-col items-center gap-3 p-5 border-2 rounded-2xl transition-all transform hover:scale-105 ${
                    formData.rol === 'is_arayan'
                      ? 'border-purple-600 bg-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <User className={`w-10 h-10 ${formData.rol === 'is_arayan' ? 'text-purple-600' : 'text-gray-400'}`} />
                  <span className={`font-bold text-sm ${formData.rol === 'is_arayan' ? 'text-purple-600' : 'text-gray-700'}`}>
                    İş Arayan
                  </span>
                  {formData.rol === 'is_arayan' && (
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, rol: 'firma'})}
                  className={`flex flex-col items-center gap-3 p-5 border-2 rounded-2xl transition-all transform hover:scale-105 ${
                    formData.rol === 'firma'
                      ? 'border-blue-600 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <Building2 className={`w-10 h-10 ${formData.rol === 'firma' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className={`font-bold text-sm ${formData.rol === 'firma' ? 'text-blue-600' : 'text-gray-700'}`}>
                    Şirket
                  </span>
                  {formData.rol === 'firma' && (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-3 py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Hesap oluşturuluyor...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Ücretsiz Hesap Oluştur</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Güven İşaretleri */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 group">
                <CheckCircle className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-gray-700">Ücretsiz</span>
              </div>
              <div className="flex items-center gap-2 group">
                <Zap className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-gray-700">Hızlı Kayıt</span>
              </div>
              <div className="flex items-center gap-2 group">
                <Shield className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-gray-700">Güvenli</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
