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

  // Online durum kontrolü
  checkOnlineStatus: async (otherUserId) => {
    const response = await api.get(`/messages/online-status.php?user_id=${otherUserId}`);
    return response.data;
  },

  // Heartbeat gönder (sohbeti açık tuttuğunu bildir)
  sendHeartbeat: async (otherUserId) => {
    const response = await api.post('/messages/heartbeat.php', { 
      diger_kullanici_id: otherUserId 
    });
    return response.data;
  },

  // Heartbeat kaldır (sohbeti kapattığını bildir)
  removeHeartbeat: async (otherUserId) => {
    const response = await api.post('/messages/remove-heartbeat.php', { 
      diger_kullanici_id: otherUserId 
    });
    return response.data;
  },

  // Yeni mesajları getir (belirli bir mesaj ID'sinden sonra)
  getNewMessages: async (otherUserId, lastMessageId = 0) => {
    const response = await api.get(`/messages/new-messages.php?user_id=${otherUserId}&last_message_id=${lastMessageId}`);
    return response.data;
  },
};
