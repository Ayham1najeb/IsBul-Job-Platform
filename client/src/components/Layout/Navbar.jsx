/**
 * Navbar Bileşeni
 * Üst menü çubuğu bileşeni - Güncellenmiş ve Sticky
 */
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Briefcase, User, LogOut, Menu, X, Bookmark, FileText, Building2, Bell, MessageSquare, FileUser, Settings, Shield, Users, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import NotificationBell from '../Notifications/NotificationBell';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll efekti
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white shadow-lg py-2' 
        : 'bg-white shadow-md py-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">İş Bul</span>
            </Link>
          </div>

          {/* Masaüstü Navigasyon */}
          <div className="hidden md:flex items-center space-x-1">
            {/* İş İlanları Dropdown - Admin için gizle */}
            {user?.rol !== 'admin' && (
              <div className="relative group">
                <Link
                  to="/jobs"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                >
                  İş İlanları
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link to="/jobs?kategori=1" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg">
                  💻 Yazılım & Teknoloji
                </Link>
                <Link to="/jobs?kategori=2" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  📊 Pazarlama & Satış
                </Link>
                <Link to="/jobs?kategori=3" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  🎨 Tasarım & Kreatif
                </Link>
                <Link to="/jobs?kategori=4" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  💰 Finans & Muhasebe
                </Link>
                <Link to="/jobs?calisma_sekli=remote" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-t">
                  🏠 Uzaktan Çalışma
                </Link>
                <Link to="/jobs" className="block px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 font-medium rounded-b-lg border-t">
                  Tüm İlanları Gör →
                </Link>
              </div>
            </div>
            )}

            {/* Şirketler Link - Admin için gizle */}
            {user?.rol !== 'admin' && (
              <Link
                to="/companies"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Şirketler
              </Link>
            )}

            {isAuthenticated ? (
              <>
                {/* İş Arayan Menüsü */}
                {user?.rol === 'is_arayan' && (
                  <>
                    <Link
                      to="/resume"
                      className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <FileUser className="h-4 w-4" />
                      Özgeçmişim
                    </Link>
                    <Link
                      to="/applications"
                      className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Başvurularım
                    </Link>
                    <Link
                      to="/saved-jobs"
                      className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <Bookmark className="h-4 w-4" />
                      Kayıtlı İşler
                    </Link>
                  </>
                )}
                
                {/* Mesajlar - Admin hariç */}
                {user?.rol !== 'admin' && (
                  <Link
                    to="/messages"
                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Mesajlar
                  </Link>
                )}

                {/* Admin Menüsü */}
                {user?.rol === 'admin' && (
                  <>
                    <Link
                      to="/admin"
                      className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <Shield className="h-4 w-4" />
                      Admin Panel
                    </Link>
                    <Link
                      to="/admin/users"
                      className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <Users className="h-4 w-4" />
                      Kullanıcılar
                    </Link>
                    <Link
                      to="/admin/statistics"
                      className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <BarChart3 className="h-4 w-4" />
                      İstatistikler
                    </Link>
                  </>
                )}

                {/* Bildirimler */}
                <NotificationBell />

                {/* Profil Menüsü */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                    <User className="h-5 w-5" />
                    <span>{user?.isim}</span>
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                    {/* Kullanıcı Bilgisi */}
                    <div className={`px-4 py-3 ${
                      user?.rol === 'admin' 
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-700'
                    } text-white`}>
                      <p className="font-semibold">{user?.isim} {user?.soyisim}</p>
                      <p className="text-xs opacity-90">{user?.email}</p>
                      {user?.rol === 'admin' && (
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                          <Shield className="w-3 h-3" />
                          Admin
                        </span>
                      )}
                    </div>

                    {/* Menü İçeriği */}
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profilim
                      </Link>
                      <Link
                        to={user?.rol === 'admin' ? '/admin' : user?.rol === 'firma' ? '/company/dashboard' : '/dashboard'}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <Briefcase className="w-4 h-4" />
                        Dashboard
                      </Link>
                      
                      {user?.rol === 'is_arayan' && (
                        <>
                          <Link
                            to="/resume"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            Özgeçmişim
                          </Link>
                          <Link
                            to="/applications"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            Başvurularım
                          </Link>
                          <Link
                            to="/saved-jobs"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          >
                            <Bookmark className="w-4 h-4" />
                            Kayıtlı İşler
                          </Link>
                        </>
                      )}

                      {/* Admin Menü Öğeleri */}
                      {user?.rol === 'admin' && (
                        <>
                          <div className="border-t border-gray-100 my-2"></div>
                          <Link
                            to="/admin/users"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                          >
                            <Users className="w-4 h-4" />
                            Kullanıcı Yönetimi
                          </Link>
                          <Link
                            to="/admin/jobs"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                          >
                            <Briefcase className="w-4 h-4" />
                            İlan Yönetimi
                          </Link>
                          <Link
                            to="/admin/statistics"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                          >
                            <BarChart3 className="w-4 h-4" />
                            İstatistikler
                          </Link>
                        </>
                      )}

                      {user?.rol !== 'admin' && (
                        <Link
                          to="/messages"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Mesajlar
                        </Link>
                      )}

                      <div className="border-t border-gray-100 my-2"></div>

                      {user?.rol === 'is_arayan' && (
                        <Link
                          to="/profile/edit"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Ayarlar
                        </Link>
                      )}
                      
                      {user?.rol === 'firma' && (
                        <Link
                          to="/company/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Şirket Profili
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Çıkış Yap
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Hesap Oluştur
                </Link>
              </>
            )}
          </div>

          {/* Mobil menü butonu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Navigasyon */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/jobs"
              className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              İş İlanları
            </Link>
            <Link
              to="/companies"
              className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Şirketler
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Kontrol Paneli
                </Link>
                <Link
                  to="/profile"
                  className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profilim
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-right text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-base font-medium"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/register"
                  className="block bg-primary-600 text-white hover:bg-primary-700 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Hesap Oluştur
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
