/**
 * Konuşma Bileşeni
 * Mesaj konuşma ekranı
 */
import { useState, useEffect, useRef } from 'react';
import { messageService } from '../../services/messageService';
import MessageInput from './MessageInput';
import { User, Loader, Phone, Video, MoreVertical } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Conversation = ({ user, onSendMessage }) => {
  const { user: currentUser } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadConversation();
  }, [user.userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversation = async () => {
    try {
      setLoading(true);
      const data = await messageService.getConversation(user.userId);
      setMessages(data.mesajlar || []);
    } catch (error) {
      console.error('Konuşma yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (messageText) => {
    try {
      await onSendMessage({
        alici_id: user.userId,
        mesaj: messageText,
        konu: 'Mesaj'
      });
      loadConversation();
    } catch (error) {
      throw error;
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Bugün';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Dün';
    } else {
      return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  };

  // Mesajları tarihe göre grupla
  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(message => {
      const date = new Date(message.gonderme_tarihi).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col h-full" style={{ height: 'calc(100vh - 200px)' }}>
      {/* Başlık */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.userName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900">{user.userName}</h3>
            <p className="text-sm text-gray-500">Çevrimiçi</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Mesajlar */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader className="w-8 h-8 text-primary-600 animate-spin" />
          </div>
        ) : (
          <>
            {Object.entries(groupedMessages).map(([date, msgs]) => (
              <div key={date}>
                {/* Tarih Ayırıcı */}
                <div className="flex items-center justify-center my-4">
                  <div className="bg-white px-4 py-1 rounded-full shadow-sm border border-gray-200">
                    <span className="text-xs text-gray-600 font-medium">
                      {formatDate(msgs[0].gonderme_tarihi)}
                    </span>
                  </div>
                </div>

                {/* Mesajlar */}
                {msgs.map((message) => {
                  const isOwn = message.gonderen_id === currentUser.id;
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3 animate-fade-in`}
                    >
                      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`px-4 py-2 rounded-2xl shadow-sm ${
                            isOwn
                              ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-br-none'
                              : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
                          }`}
                        >
                          <p className="text-sm break-words">{message.mesaj}</p>
                        </div>
                        <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-xs text-gray-500">
                            {formatTime(message.gonderme_tarihi)}
                          </span>
                          {isOwn && message.okundu && (
                            <span className="text-xs text-primary-600">✓✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Mesaj Gönderme */}
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default Conversation;
