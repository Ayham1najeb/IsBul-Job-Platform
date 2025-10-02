/**
 * Bildirim İkonu Bileşeni
 * Navbar'da bildirim ikonu ve sayısı
 */
import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import NotificationList from './NotificationList';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // TODO: API'den bildirimleri çek
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      // Şimdilik örnek bildirimler
      const mockNotifications = [
        {
          id: 1,
          type: 'application_status',
          title: 'Başvuru Durumu Güncellendi',
          message: 'Frontend Developer pozisyonuna başvurunuz inceleniyor',
          read: false,
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          type: 'new_job',
          title: 'Yeni İlan',
          message: 'İlgilenebileceğiniz yeni bir iş ilanı var',
          read: false,
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ];

      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Bildirimler yüklenemedi:', error);
    }
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
    setUnreadCount(0);
  };

  return (
    <div className="relative">
      {/* Bildirim Butonu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Bildirim Listesi */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <NotificationList
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;
