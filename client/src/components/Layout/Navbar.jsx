/**
 * Navbar Bileşeni
 * Üst menü çubuğu bileşeni - Güncellenmiş ve Sticky
 */
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Briefcase, User, LogOut, Menu, X, Bookmark, FileText, Building2, Bell } from 'lucide-react';
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
            {/* İş İlanları Dropdown */}
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

            {/* Şirketler Link */}
            <Link
              to="/companies"
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Şirketler
            </Link>

            {/* Keşfet Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1">
                Keşfet
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link to="/blog" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg">
                  📝 Blog
                </Link>
                <Link to="/career-guide" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  📚 Kariyer Rehberi
                </Link>
                <Link to="/salary-guide" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  💵 Maaş Rehberi
                </Link>
                <Link to="/about" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-lg">
                  ℹ️ Hakkımızda
                </Link>
              </div>
            </div>

            {isAuthenticated ? (
              <>
                {/* İş Arayan Menüsü */}
                {user?.rol === 'is_arayan' && (
                  <>
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

                {/* Şirket Menüsü */}
                {user?.rol === 'firma' && (
                  <>
                    <Link
                      to="/company/dashboard"
                      className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <Building2 className="h-4 w-4" />
                      Panel
                    </Link>
                    <Link
                      to="/company/jobs"
                      className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      İlanlarım
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
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                    >
                      Profilim
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                    >
                      Çıkış Yap
                    </button>
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
