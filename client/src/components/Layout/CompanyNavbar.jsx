/**
 * Şirket Navbar Bileşeni
 * Şirketler için özel navigasyon menüsü
 */
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  Briefcase, 
  Building2, 
  FileText, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';
import { getImageUrl } from '../../utils/imageHelper';
import { useState } from 'react';
import NotificationBell from '../Notifications/NotificationBell';

const CompanyNavbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: '/company/dashboard', label: 'Panel', icon: Building2 },
    { path: '/company/jobs', label: 'İlanlarım', icon: Briefcase },
    { path: '/company/applications', label: 'Başvurular', icon: FileText },
    { path: '/company/candidates', label: 'Adaylar', icon: Users },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo ve Ana Menü */}
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/company/dashboard" className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">İş Bul</span>
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">
                Şirket
              </span>
            </Link>

            {/* Desktop Menü */}
            <div className="hidden md:flex md:ml-10 md:space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sağ Taraf - Bildirimler ve Profil */}
          <div className="flex items-center space-x-4">
            {/* Bildirimler */}
            <NotificationBell />

            {/* Profil Menüsü */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {user?.profil_foto ? (
                  <img
                    src={getImageUrl(user.profil_foto)}
                    alt={user.isim}
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center border-2 border-primary-200">
                    <Building2 className="w-4 h-4 text-primary-600" />
                  </div>
                )}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.isim}</p>
                  <p className="text-xs text-gray-500">Şirket Hesabı</p>
                </div>
              </button>

              {/* Dropdown Menü */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user?.isim}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  
                  <Link
                    to="/company/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Şirket Profili
                  </Link>
                  
                  <div className="border-t border-gray-200 my-1"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default CompanyNavbar;
