/**
 * Navbar Bileşeni
 * Üst menü çubuğu bileşeni
 */
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Briefcase, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">İş Bul</span>
            </Link>
          </div>

          {/* Masaüstü Navigasyon */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/jobs"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              İş İlanları
            </Link>
            <Link
              to="/companies"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Şirketler
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Kontrol Paneli
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User className="h-5 w-5" />
                  <span>{user?.isim}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Çıkış Yap</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium"
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
