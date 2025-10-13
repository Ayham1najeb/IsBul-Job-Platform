/**
 * Mesaj Servisi
 * Mesajlaşma işlemleri için API servisi
 */
import api from '../config/api';

export const messageService = {
  // Tüm mesajları getir
  getMessages: async () => {
    const response = await api.get('/messages/');
    return response.data;
  },

  // Belirli bir kullanıcı ile konuşmayı getir
  getConversation: async (userId) => {
    const response = await api.get(`/messages/conversation.php?user_id=${userId}`);
    return response.data;
  },

  // Mesaj gönder
  sendMessage: async (messageData) => {
    const response = await api.post('/messages/send.php', messageData);
    return response.data;
  },

  // Mesajı okundu olarak işaretle
  markAsRead: async (messageId) => {
    const response = await api.put(`/messages/mark-read.php`, { id: messageId });
    return response.data;
  },

  // Mesajı sil
  deleteMessage: async (messageId) => {
    const response = await api.delete(`/messages/delete.php?id=${messageId}`);
    return response.data;
  },
};
