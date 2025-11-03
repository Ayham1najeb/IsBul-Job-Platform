/**
 * Mesajlar Sayfası
 * Kullanıcı mesajlaşma sayfası
 */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { messageService } from '../../services/messageService';
import MessageList from '../../components/Messages/MessageList';
import Conversation from '../../components/Messages/Conversation';
import { MessageSquare, Loader, Search, Users } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const MessagesPage = () => {
  const location = useLocation();
  const { user: currentUser } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  // Location state'den gelen bilgi ile otomatik konuşma açma
  useEffect(() => {
    if (location.state?.openConversation && messages.length > 0) {
      const userId = parseInt(location.state.openConversation);
      
      // Mesaj listesinde bu kullanıcı ile konuşma var mı kontrol et
      const message = messages.find(
        msg => (msg.gonderen_id === userId || msg.alici_id === userId)
      );
      
      if (message) {
        const otherUserId = message.gonderen_id === currentUser.id 
          ? message.alici_id 
          : message.gonderen_id;
        
        setSelectedUser({
          userId: otherUserId,
          userName: message.gonderen_id === currentUser.id 
            ? `${message.alici_isim || ''} ${message.alici_soyisim || ''}`.trim() || 'Kullanıcı'
            : `${message.gonderen_isim || ''} ${message.gonderen_soyisim || ''}`.trim() || 'Kullanıcı',
          avatar: null
        });
      } else {
        // Eğer mesaj yoksa, direkt kullanıcı ID'si ile aç
        setSelectedUser({
          userId: userId,
          userName: 'Kullanıcı',
          avatar: null
        });
      }
      
      // State'i temizle
      window.history.replaceState({}, document.title);
    }
  }, [location.state, messages, currentUser?.id]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await messageService.getMessages();
      // API "kayitlar" döndürüyor, "mesajlar" değil
      const messagesData = data.kayitlar || data.mesajlar || [];
      // current_user_id ekle
      const messagesWithUser = messagesData.map(msg => ({
        ...msg,
        current_user_id: currentUser.id
      }));
      setMessages(messagesWithUser);
    } catch (error) {
      console.error('Mesajlar yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = async (messageData) => {
    try {
      await messageService.sendMessage(messageData);
      loadMessages();
    } catch (error) {
      console.error('Mesaj gönderilemedi:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Mesajlar yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Mesajlar
              </h1>
              <p className="text-gray-600">Şirketler ve adaylarla iletişim</p>
            </div>
          </div>
        </div>

        {/* Mesajlaşma Alanı */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
          {/* Sol: Mesaj Listesi */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Arama */}
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Mesajlarda ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Mesaj Listesi */}
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                {messages.length === 0 ? (
                  <div className="p-8 text-center">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Henüz mesajınız yok</p>
                  </div>
                ) : (
                  <MessageList
                    messages={messages}
                    selectedUser={selectedUser}
                    onSelectUser={handleSelectUser}
                    searchTerm={searchTerm}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sağ: Konuşma */}
          <div className="lg:col-span-2">
            {selectedUser ? (
              <Conversation
                user={selectedUser}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 h-full flex items-center justify-center p-12">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="w-12 h-12 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Bir konuşma seçin
                  </h3>
                  <p className="text-gray-500">
                    Mesajlaşmaya başlamak için sol taraftan bir kullanıcı seçin
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
