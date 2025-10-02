/**
 * Footer Bileşeni
 * Modern ve gelişmiş sayfa alt bilgi bileşeni
 */
import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Arka plan dekoratif elementler */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Hakkında */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Briefcase className="h-10 w-10 text-blue-400" />
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">İş Bul</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              İş arayanlar ve işverenler arasında köprü kuran Türkiye'nin en modern iş arama platformu. Hayalinizdeki kariyere bir adım daha yakınsınız! 🚀
            </p>
            {/* Sosyal Medya */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Hızlı Bağlantılar */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Hızlı Bağlantılar</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  İş İlanları
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Şirketler
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  İletişim
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* İş Arayanlar İçin */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">İş Arayanlar İçin</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/register" className="text-gray-400 hover:text-purple-400 text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Ücretsiz Kayıt Ol
                </Link>
              </li>
              <li>
                <Link to="/dashboard/resume" className="text-gray-400 hover:text-purple-400 text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Özgeçmiş Oluştur
                </Link>
              </li>
              <li>
                <Link to="/dashboard/applications" className="text-gray-400 hover:text-purple-400 text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Başvurularım
                </Link>
              </li>
              <li>
                <Link to="/dashboard/saved-jobs" className="text-gray-400 hover:text-purple-400 text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Kayıtlı İlanlar
                </Link>
              </li>
              <li>
                <Link to="/career-guide" className="text-gray-400 hover:text-purple-400 text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Kariyer Rehberi
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm group">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">E-posta</p>
                  <a href="mailto:info@isbul.com" className="hover:text-blue-400 transition-colors">info@isbul.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm group">
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Telefon</p>
                  <a href="tel:+901234567890" className="hover:text-green-400 transition-colors">+90 (212) 123 45 67</a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm group">
                <MapPin className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Adres</p>
                  <span>Maslak, İstanbul<br />Türkiye</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              © {currentYear} İş Bul. Tüm hakları saklıdır. 
              <span className="hidden md:inline">|</span>
              <span className="flex items-center gap-1">
                Türkiye ile yapıldı <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              </span>
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Gizlilik Politikası
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Kullanım Şartları
              </Link>
              <Link to="/faq" className="text-gray-400 hover:text-blue-400 transition-colors">
                SSS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
