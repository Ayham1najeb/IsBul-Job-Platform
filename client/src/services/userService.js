/**
 * Kullanıcı Servisi
 * Kullanıcı profil işlemleri
 */
import api from '../config/api';

export const userService = {
  // Profil bilgilerini getir
  getProfile: async () => {
    const response = await api.get('/users/profile.php');
    return response.data;
  },

  // Profil güncelle
  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile.php', profileData);
    return response.data;
  },

  // Şifre değiştir
  changePassword: async (passwordData) => {
    const response = await api.post('/users/change-password.php', passwordData);
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

  // Dashboard istatistiklerini getir
  getDashboardStats: async () => {
    const response = await api.get('/users/dashboard-stats.php');
    return response.data;
  },
};
