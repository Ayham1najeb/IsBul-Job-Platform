/**
 * Profil Bilgileri Bileşeni
 * Kullanıcı profil bilgilerini gösterir
 */
import { User, Mail, Phone, MapPin, Briefcase, Calendar } from 'lucide-react';

const ProfileInfo = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Profil Bilgileri</h2>

      <div className="space-y-4">
        {/* Ad Soyad */}
        <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
          <User className="w-5 h-5 text-gray-400 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm text-gray-600">Ad Soyad</div>
            <div className="font-medium text-gray-900">
              {user.isim} {user.soyisim}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
          <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm text-gray-600">E-posta</div>
            <div className="font-medium text-gray-900">{user.email}</div>
          </div>
        </div>

        {/* Telefon */}
        <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
          <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm text-gray-600">Telefon</div>
            <div className="font-medium text-gray-900">
              {user.telefon || 'Belirtilmemiş'}
            </div>
          </div>
        </div>

        {/* Lokasyon */}
        <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm text-gray-600">Şehir</div>
            <div className="font-medium text-gray-900">
              {user.sehir || 'Belirtilmemiş'}
            </div>
          </div>
        </div>

        {/* Rol */}
        <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
          <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm text-gray-600">Hesap Tipi</div>
            <div className="font-medium text-gray-900">
              {user.rol === 'is_arayan' && 'İş Arayan'}
              {user.rol === 'firma' && 'Şirket'}
              {user.rol === 'admin' && 'Yönetici'}
            </div>
          </div>
        </div>

        {/* Üyelik Tarihi */}
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm text-gray-600">Üyelik Tarihi</div>
            <div className="font-medium text-gray-900">
              {user.kayit_tarihi ? new Date(user.kayit_tarihi).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
