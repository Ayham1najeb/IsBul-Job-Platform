/**
 * Bildirim Servisi
 * Bildirimler ile ilgili tüm API çağrıları
 */
import api from '../config/api';

export const notificationService = {
  // Tüm bildirimleri getir
  getNotifications: async (limit = 50) => {
    const response = await api.get(`/notifications/index.php?limit=${limit}`);
    return response.data;
  },

  // Bildirimi okundu olarak işaretle
  markAsRead: async (notificationId) => {
    const response = await api.put('/notifications/mark-read.php', { id: notificationId });
    return response.data;
  },

  // Tüm bildirimleri okundu olarak işaretle
  markAllAsRead: async () => {
    const response = await api.put('/notifications/mark-all-read.php');
    return response.data;
  },
};

