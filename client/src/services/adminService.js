/**
 * Admin Servisi
 * Admin panel işlemleri için API çağrıları
 */
import api from '../config/api';

export const adminService = {
  // İstatistikleri getir
  getStats: async () => {
    const response = await api.get('/admin/stats.php');
    return response.data;
  },

  // Kullanıcıları listele
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users.php', { params });
    return response.data;
  },

  // Kullanıcı güncelle
  updateUser: async (userId, data) => {
    const response = await api.put('/admin/users.php', {
      id: userId,
      ...data
    });
    return response.data;
  },

  // Kullanıcı sil
  deleteUser: async (userId) => {
    const response = await api.delete('/admin/users.php', {
      data: { id: userId }
    });
    return response.data;
  },

  // İlan/Şirket moderasyonu
  moderate: async (type, id, action, reason = '') => {
    const response = await api.put('/admin/moderate.php', {
      type,
      id,
      action,
      reason
    });
    return response.data;
  }
};
