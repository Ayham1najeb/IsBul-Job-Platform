/**
 * Mesaj Listesi Bileşeni
 * Kullanıcı mesaj listesi
 */
import { User, Circle } from 'lucide-react';

const MessageList = ({ messages, selectedUser, onSelectUser, searchTerm }) => {
  // Mesajları kullanıcılara göre grupla
  const groupedMessages = messages.reduce((acc, message) => {
    const otherUserId = message.gonderen_id === message.current_user_id 
      ? message.alici_id 
      : message.gonderen_id;
    
    if (!acc[otherUserId]) {
      acc[otherUserId] = {
        userId: otherUserId,
        userName: message.gonderen_id === message.current_user_id 
          ? message.alici_isim 
          : message.gonderen_isim,
        lastMessage: message.mesaj,
        lastMessageDate: message.gonderme_tarihi,
        unread: !message.okundu && message.alici_id === message.current_user_id,
        avatar: message.profil_foto
      };
    }
    return acc;
  }, {});

  const userList = Object.values(groupedMessages);

  // Arama filtresi
  const filteredUsers = userList.filter(user =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tarih formatla
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Dün';
    } else if (days < 7) {
      return `${days} gün önce`;
    } else {
      return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
    }
  };

  return (
    <div className="divide-y divide-gray-100">
      {filteredUsers.map((user) => (
        <div
          key={user.userId}
          onClick={() => onSelectUser(user)}
          className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${
            selectedUser?.userId === user.userId
              ? 'bg-primary-50 border-l-4 border-primary-600'
              : ''
          }`}
        >
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
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
              {user.unread && (
                <Circle className="absolute -top-1 -right-1 w-4 h-4 text-primary-600 fill-current" />
              )}
            </div>

            {/* İçerik */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className={`font-semibold truncate ${
                  user.unread ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  {user.userName}
                </h4>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                  {formatDate(user.lastMessageDate)}
                </span>
              </div>
              <p className={`text-sm truncate ${
                user.unread ? 'text-gray-900 font-medium' : 'text-gray-600'
              }`}>
                {user.lastMessage}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
