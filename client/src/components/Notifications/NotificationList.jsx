/**
 * Bildirim Listesi Bileşeni
 * Bildirimleri listeler
 */
import { CheckCheck, Briefcase, Users, Bell, X } from 'lucide-react';

const NotificationList = ({ notifications, onMarkAsRead, onMarkAllAsRead, onClose }) => {
  // Tarih formatla
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Şimdi';
    if (diffMinutes < 60) return `${diffMinutes} dakika önce`;
    if (diffHours < 24) return `${diffHours} saat önce`;
    if (diffDays < 7) return `${diffDays} gün önce`;
    return date.toLocaleDateString('tr-TR');
  };

  // Bildirim ikonu
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'application_status':
        return <Briefcase className="w-5 h-5 text-blue-600" />;
      case 'new_job':
        return <Bell className="w-5 h-5 text-green-600" />;
      case 'message':
        return <Users className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-h-[80vh] flex flex-col">
      {/* Başlık */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h3 className="font-bold text-gray-900">Bildirimler</h3>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-600">{unreadCount} okunmamış</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Tümünü Okundu İşaretle
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bildirimler */}
      <div className="overflow-y-auto flex-1">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Henüz bildirim yok</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => !notification.read && onMarkAsRead(notification.id)}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* İkon */}
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* İçerik */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-gray-900 text-sm">
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-1"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatDate(notification.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alt Kısım */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Tüm Bildirimleri Gör
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
