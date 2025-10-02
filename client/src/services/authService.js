/**
 * Kimlik Doğrulama Servisi
 * Kullanıcı kaydı, girişi ve yetkilendirme işlemleri
 */
import api from '../config/api';

export const authService = {
  // Yeni kullanıcı kaydı
  register: async (userData) => {
    const response = await api.post('/auth/register.php', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Kullanıcı girişi
  login: async (credentials) => {
    const response = await api.post('/auth/login.php', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Kullanıcı çıkışı
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Mevcut kullanıcıyı getir
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Kullanıcı kimliği doğrulandı mı kontrol et
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Şifre sıfırlama isteği
  requestPasswordReset: async (email) => {
    const response = await api.post('/auth/reset-password-request.php', { email });
    return response.data;
  },

  // Şifre sıfırlama
  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password.php', { token, newPassword });
    return response.data;
  },
};
