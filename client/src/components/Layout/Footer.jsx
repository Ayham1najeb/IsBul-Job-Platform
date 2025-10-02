/**
 * Footer Bileşeni
 * Sayfa alt bilgi bileşeni
 */
import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Hakkında */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold">İş Bul</span>
            </div>
            <p className="text-gray-400 text-sm">
              İş arayanlar ve işverenler arasında köprü kuran modern iş arama platformu
            </p>
          </div>

          {/* Hızlı Bağlantılar */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-white text-sm">
                  İş İlanları
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-400 hover:text-white text-sm">
                  Şirketler
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-sm">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white text-sm">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* İş Arayanlar İçin */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İş Arayanlar İçin</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white text-sm">
                  Hesap Oluştur
                </Link>
              </li>
              <li>
                <Link to="/resume" className="text-gray-400 hover:text-white text-sm">
                  Özgeçmiş Oluştur
                </Link>
              </li>
              <li>
                <Link to="/applications" className="text-gray-400 hover:text-white text-sm">
                  Başvurularım
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="h-4 w-4" />
                <span>info@isbul.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone className="h-4 w-4" />
                <span>+90 123 456 7890</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 İş Bul. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
