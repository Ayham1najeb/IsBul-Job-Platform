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
  },

  // Yeni admin ekle
  addAdmin: async (email) => {
    const response = await api.post('/admin/add-admin.php', { email });
    return response.data;
  },

  // Admin doğrula
  verifyAdmin: async (email, code) => {
    const response = await api.post('/admin/verify-admin.php', {
      email,
      code
    });
    return response.data;
  },

  // Admin onayla
  approveAdmin: async (userId) => {
    const response = await api.post('/admin/approve-admin.php', {
      user_id: userId
    });
    return response.data;
  }
};
