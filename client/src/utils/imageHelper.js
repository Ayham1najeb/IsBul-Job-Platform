/**
 * Resim URL Helper
 * Resim yollarını tam URL'ye çevirir
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/IsBul-Job-Platform';

/**
 * Resim yolunu tam URL'ye çevir
 * @param {string} imagePath - Veritabanından gelen resim yolu (örn: "uploads/profiles/user_1.jpg")
 * @returns {string} - Tam resim URL'si
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // Eğer zaten tam URL ise, olduğu gibi döndür
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Başında / varsa kaldır
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Tam URL oluştur
  return `${API_BASE_URL}/${cleanPath}`;
};

/**
 * Varsayılan avatar URL'si
 */
export const getDefaultAvatar = () => {
  return 'https://ui-avatars.com/api/?background=3B82F6&color=fff&name=User';
};
