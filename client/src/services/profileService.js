/**
 * Profil Servisi
 * Kullanıcı profil yönetimi için API servisi
 */
import api from '../config/api';

export const profileService = {
  // Profil bilgilerini getir
  getProfile: async () => {
    const response = await api.get('/users/profile.php');
    return response.data;
  },

  // Profil bilgilerini güncelle
  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile.php', profileData);
    return response.data;
  },

  // Profil fotoğrafı yükle
  uploadPhoto: async (file) => {
    const formData = new FormData();
    formData.append('photo', file);
    
    const response = await api.post('/users/upload-photo.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
