/**
 * Profil Başlık Bileşeni
 * Kullanıcı profil başlığı ve fotoğraf
 */
import { useState } from 'react';
import { User, Camera, Mail, Phone, MapPin, Calendar, Loader } from 'lucide-react';

const ProfileHeader = ({ user, onPhotoUpload }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      await onPhotoUpload(file);
      setUploading(false);
    }
  };

  // Üyelik tarihi formatla
  const formatDate = (dateString) => {
    if (!dateString) return 'Belirtilmemiş';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Rol etiketleri
  const roleLabels = {
    'is_arayan': 'İş Arayan',
    'firma': 'Şirket',
    'admin': 'Yönetici'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profil Fotoğrafı */}
        <div className="flex-shrink-0">
          <div className="relative">
            {user.profil_foto ? (
              <img
                src={user.profil_foto}
                alt={user.isim}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center border-4 border-primary-200">
                <User className="w-16 h-16 text-primary-600" />
              </div>
            )}

            {/* Fotoğraf Yükleme Butonu */}
            <label className={`absolute bottom-0 right-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors shadow-lg ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {uploading ? (
                <Loader className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Camera className="w-5 h-5 text-white" />
              )}
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        {/* Kullanıcı Bilgileri */}
        <div className="flex-1">
          {/* İsim ve Rol */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user.isim} {user.soyisim}
            </h1>
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
              {roleLabels[user.rol] || user.rol}
            </span>
          </div>

          {/* Detay Bilgileri */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Email */}
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">E-posta</div>
                <div>{user.email}</div>
              </div>
            </div>

            {/* Telefon */}
            {user.telefon && (
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Telefon</div>
                  <div>{user.telefon}</div>
                </div>
              </div>
            )}

            {/* Lokasyon */}
            {user.sehir && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Lokasyon</div>
                  <div>{user.sehir}</div>
                </div>
              </div>
            )}

            {/* Üyelik Tarihi */}
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">Üyelik Tarihi</div>
                <div>{formatDate(user.olusturulma_tarihi || user.kayit_tarihi)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
