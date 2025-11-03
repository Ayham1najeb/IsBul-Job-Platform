/**
 * Konuşma Bileşeni
 * Mesaj konuşma ekranı
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { messageService } from '../../services/messageService';
import { jobService } from '../../services/jobService';
import MessageInput from './MessageInput';
import { User, Loader, Briefcase } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../utils/imageHelper';

const Conversation = ({ user, onSendMessage }) => {
  const { user: currentUser } = useAuthStore();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobInfo, setJobInfo] = useState(null);
  const [isOtherUserOnline, setIsOtherUserOnline] = useState(false);
  const messagesEndRef = useRef(null);
  const pollIntervalRef = useRef(null);
  const messagesRef = useRef([]); // Messages state'ini ref ile takip et

  useEffect(() => {
    loadConversation();
    
    // Live chat için polling - her 2 saniyede bir (WhatsApp/Messenger tarzı)
    // Sadece yeni mesajları getir, tüm konuşmayı yeniden yükleme
    // Bu sayede sayfa refresh olmadan yeni mesajlar görünür
    // messagesRef kullanarak her zaman güncel mesajları kontrol ederiz
    const startPolling = () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
      pollIntervalRef.current = setInterval(() => {
        checkForNewMessages();
      }, 2000);
    };
    
    // Kısa bir delay ile polling'i başlat (loadConversation tamamlanması için)
    let pollingTimeout = setTimeout(() => {
      startPolling();
    }, 1500);
    
    // Online durum kontrolü - her 3 saniyede bir (API çağrısı yapıyor)
    checkOnlineStatus();
    const onlineCheckInterval = setInterval(checkOnlineStatus, 3000);
    
    // Heartbeat gönder her 5 saniyede bir (sohbet açık olduğunu backend'e bildir)
    const heartbeatInterval = setInterval(() => {
      if (user.userId && currentUser?.id) {
        // LocalStorage'ı güncelle
        const chatKey = `chat_${Math.min(currentUser.id, user.userId)}_${Math.max(currentUser.id, user.userId)}`;
        const timestamp = Date.now();
        localStorage.setItem(chatKey, timestamp.toString());
        
        const activeChats = JSON.parse(localStorage.getItem('activeChats') || '{}');
        if (!activeChats[currentUser.id]) {
          activeChats[currentUser.id] = {};
        }
        activeChats[currentUser.id][user.userId] = timestamp;
        localStorage.setItem('activeChats', JSON.stringify(activeChats));
        
        // Backend'e heartbeat gönder
        messageService.sendHeartbeat(user.userId).catch(error => {
          console.error('Heartbeat gönderilemedi:', error);
        });
      }
    }, 5000);
    
    // Bu kullanıcının sohbeti açık olduğunu işaretle (timestamp ile)
    if (user.userId && currentUser?.id) {
      const chatKey = `chat_${Math.min(currentUser.id, user.userId)}_${Math.max(currentUser.id, user.userId)}`;
      const timestamp = Date.now();
      localStorage.setItem(chatKey, timestamp.toString());
      
      // Bu kullanıcının ID'sini activeChats'e ekle
      const activeChats = JSON.parse(localStorage.getItem('activeChats') || '{}');
      if (!activeChats[currentUser.id]) {
        activeChats[currentUser.id] = {};
      }
      activeChats[currentUser.id][user.userId] = timestamp;
      localStorage.setItem('activeChats', JSON.stringify(activeChats));
      
      // İlk heartbeat'i gönder
      messageService.sendHeartbeat(user.userId).catch(error => {
        console.error('İlk heartbeat gönderilemedi:', error);
      });
    }
    
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
      if (pollingTimeout) {
        clearTimeout(pollingTimeout);
      }
      clearInterval(onlineCheckInterval);
      clearInterval(heartbeatInterval);
      
      // Cleanup - kullanıcı sohbeti kapattı
      if (user.userId && currentUser?.id) {
        const chatKey = `chat_${Math.min(currentUser.id, user.userId)}_${Math.max(currentUser.id, user.userId)}`;
        localStorage.removeItem(chatKey);
        const chats = JSON.parse(localStorage.getItem('activeChats') || '{}');
        if (chats[currentUser.id]) {
          delete chats[currentUser.id][user.userId];
          if (Object.keys(chats[currentUser.id]).length === 0) {
            delete chats[currentUser.id];
          }
        }
        localStorage.setItem('activeChats', JSON.stringify(chats));
        
        // Backend'den heartbeat'i kaldır
        messageService.removeHeartbeat(user.userId).catch(error => {
          console.error('Heartbeat kaldırılamadı:', error);
        });
        
        // Online durumunu kapat
        setIsOtherUserOnline(false);
      }
    };
  }, [user.userId, currentUser?.id]);

  // Sadece ilk yüklemede scroll yap - otomatik güncellemelerde scroll yapma
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    // Sadece ilk yüklemede scroll yap
    if (messages.length > 0 && !loading && isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      setTimeout(() => {
    scrollToBottom();
      }, 100);
    }
  }, [loading, messages.length]);

  const checkOnlineStatus = async () => {
    try {
      if (!user.userId || !currentUser?.id || user.userId === currentUser.id) {
        setIsOtherUserOnline(false);
        return;
      }
      
      // Chat key oluştur (her zaman aynı sırada)
      const chatKey = `chat_${Math.min(currentUser.id, user.userId)}_${Math.max(currentUser.id, user.userId)}`;
      const currentTimestamp = Date.now();
      
      // Bu tarafın chat key'i var mı kontrol et (bu taraf açık mı?)
      const thisSideTimestamp = localStorage.getItem(chatKey);
      const isThisSideOpen = thisSideTimestamp && (currentTimestamp - parseInt(thisSideTimestamp)) < 30000;
      
      // Eğer bu taraf sohbeti kapattıysa, offline göster
      if (!isThisSideOpen) {
        setIsOtherUserOnline(false);
        return;
      }
      
      // API'den karşı tarafın online durumunu kontrol et
      try {
        const onlineData = await messageService.checkOnlineStatus(user.userId);
        
        // Eğer her iki taraf da açık ise → Online
        // Eğer sadece bir taraf açık ise → Offline
        if (onlineData.online && isThisSideOpen) {
          // Her iki taraf da açık - online
          setIsOtherUserOnline(true);
        } else {
          // Sadece bir taraf açık veya hiçbiri açık değil - offline
          setIsOtherUserOnline(false);
        }
      } catch (error) {
        // API hatası durumunda, sadece bu tarafın durumunu kontrol et
        // Eğer bu taraf açık ise → Online kabul et (fallback)
        setIsOtherUserOnline(isThisSideOpen);
      }
    } catch (error) {
      setIsOtherUserOnline(false);
    }
  };
  
  // Yeni mesajları kontrol et - sadece yeni mesajları getir (WhatsApp/Messenger tarzı)
  // useCallback ile sarmalıyoruz ki messages state'i her zaman güncel olsun
  const checkForNewMessages = useCallback(async () => {
    try {
      // Eğer henüz user.userId yoksa, çık
      if (!user?.userId) {
        return;
      }
      
      // Son mesaj ID'sini al - messagesRef kullan (her zaman güncel)
      // Eğer mesaj yoksa, 0 kullan (tüm mesajları getir)
      let lastMessageId = 0;
      const currentMessages = messagesRef.current;
      
      if (currentMessages.length > 0) {
        const ids = currentMessages.map(m => parseInt(m.id) || 0).filter(id => id > 0);
        if (ids.length > 0) {
          lastMessageId = Math.max(...ids);
        }
      }
      
      // Aktif element kontrolü - eğer kullanıcı input'ta yazıyorsa, focus'u koru
      const activeElement = document.activeElement;
      const isInputFocused = activeElement && (
        activeElement.tagName === 'TEXTAREA' || 
        activeElement.tagName === 'INPUT' ||
        activeElement.isContentEditable
      );
      
      // Scroll pozisyonunu ÖNCE kaydet - güncellemeden önce
      const messagesContainer = document.querySelector('.conversation-container .overflow-y-auto') || 
                               document.querySelector('.conversation-container');
      const scrollPosition = messagesContainer ? messagesContainer.scrollTop : 0;
      const scrollHeight = messagesContainer ? messagesContainer.scrollHeight : 0;
      const wasAtBottom = messagesContainer ? 
        scrollHeight - scrollPosition <= messagesContainer.clientHeight + 100 : true;
      
      // Sadece yeni mesajları getir (last_message_id'den sonra)
      const data = await messageService.getNewMessages(user.userId, lastMessageId);
      const newMessages = data.mesajlar || data.kayitlar || [];
      
      // Yeni mesajlar var mı?
      if (newMessages && newMessages.length > 0) {
        // Yeni mesajları ekle - sessiz güncelleme, focus'u değiştirme
        // Mevcut mesajlarla karıştırmamak için sadece yeni olanları ekle
        setMessages(prev => {
          const existingIds = new Set(prev.map(m => String(m.id)));
          const uniqueNewMessages = newMessages.filter(m => !existingIds.has(String(m.id)));
          
          if (uniqueNewMessages.length > 0) {
            // Sıralamayı koru - tarihe göre ASC (eski → yeni)
            const combined = [...prev, ...uniqueNewMessages];
            const sorted = combined.sort((a, b) => {
              const dateA = new Date(a.gonderme_tarihi || a.gonderim_tarihi);
              const dateB = new Date(b.gonderme_tarihi || b.gonderim_tarihi);
              return dateA - dateB;
            });
            messagesRef.current = sorted; // Ref'i güncelle
            return sorted;
          }
          return prev;
        });
        
        // Scroll pozisyonunu koru - kullanıcı pozisyonunu koru
        setTimeout(() => {
          if (messagesContainer) {
            const newScrollHeight = messagesContainer.scrollHeight;
            const heightDifference = newScrollHeight - scrollHeight;
            
            // Eğer kullanıcı en altta idi ve input'ta yazmıyorsa, yeni mesajlara scroll yap
            if (wasAtBottom && !isInputFocused && heightDifference > 0) {
              // Kullanıcı en altta idi - yeni mesajlara scroll yap (smooth)
              messagesContainer.scrollTop = messagesContainer.scrollHeight;
            } else if (!isInputFocused) {
              // Kullanıcı ortada veya üstte - scroll pozisyonunu koru
              messagesContainer.scrollTop = scrollPosition + heightDifference;
            }
            // Eğer kullanıcı input'ta yazıyorsa, scroll yapma (pozisyonunu koru)
          }
          
          // Focus'u geri verme - kullanıcı yazmayı bitirdikten sonra focus'u korumak istemiyoruz
          // Sadece kullanıcı aktif olarak yazıyorsa focus'u koru
          // if (isInputFocused && activeElement) {
          //   activeElement.focus();
          // }
        }, 50);
      }
    } catch (error) {
      console.error('Yeni mesajlar kontrol edilemedi:', error);
    }
  }, [user?.userId]);

  // İlk yükleme için konuşmayı yükle
  const loadConversation = async () => {
    try {
      setLoading(true);
      const data = await messageService.getConversation(user.userId);
      const messagesData = data.mesajlar || data.kayitlar || [];
      // Mesajları tarihe göre sırala (eski → yeni)
      const sortedMessages = messagesData.sort((a, b) => {
        const dateA = new Date(a.gonderme_tarihi || a.gonderim_tarihi);
        const dateB = new Date(b.gonderme_tarihi || b.gonderim_tarihi);
        return dateA - dateB;
      });
      setMessages(sortedMessages);
      messagesRef.current = sortedMessages; // Ref'i güncelle
      
      // Eğer mesajlarda ilan_id varsa, ilan bilgilerini yükle
      const messageWithJob = messagesData.find(msg => msg.ilan_id && msg.ilan_id !== null && msg.ilan_id !== 'null');
      
      if (messageWithJob && messageWithJob.ilan_id) {
        try {
          // Önce API'den ilan bilgilerini çekmeyi dene
          const jobData = await jobService.getJobById(messageWithJob.ilan_id);
          
          if (jobData.kayit) {
            setJobInfo(jobData.kayit);
          } else if (jobData.ilan) {
            setJobInfo(jobData.ilan);
          } else if (messageWithJob.ilan_baslik) {
            // Eğer API'den gelmediyse ama mesajda ilan_baslik varsa kullan
            setJobInfo({
              id: messageWithJob.ilan_id,
              baslik: messageWithJob.ilan_baslik
            });
          }
        } catch (error) {
          console.error('İlan bilgileri yüklenemedi:', error);
          // Hata durumunda mesajdan gelen bilgileri kullan
          if (messageWithJob.ilan_baslik) {
            setJobInfo({
              id: messageWithJob.ilan_id,
              baslik: messageWithJob.ilan_baslik
            });
          }
        }
      } else {
        // Eğer hiç ilan_id yoksa, jobInfo'yu temizle
        setJobInfo(null);
      }
    } catch (error) {
      console.error('Konuşma yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = (forceInstant = false) => {
    // Mesajlar container'ını bul - önce daha spesifik selector kullan
    const messagesContainer = document.querySelector('.conversation-messages-container') ||
                             document.querySelector('.conversation-container .overflow-y-auto') || 
                             document.querySelector('.conversation-container') ||
                             document.querySelector('.flex-1.overflow-y-auto');
    
    // Scroll yap - her iki yöntemi de kullan
    if (messagesContainer) {
      // Önce scrollHeight ile direkt scroll yap
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      
      // Küçük bir delay ile tekrar scroll yap (DOM güncellemesi için)
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // messagesEndRef ile de scroll yap (ek güvenlik)
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ 
            behavior: forceInstant ? 'auto' : 'smooth',
            block: 'end',
            inline: 'nearest'
          });
        }
      }, 10);
    } else if (messagesEndRef.current) {
      // Fallback: sadece messagesEndRef kullan
      messagesEndRef.current.scrollIntoView({ 
        behavior: forceInstant ? 'auto' : 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  };

  const handleSend = async (messageText) => {
    try {
      // Mesaj gönderilmeden önce scroll pozisyonunu kaydet
      const messagesContainer = document.querySelector('.conversation-container .overflow-y-auto') || 
                               document.querySelector('.conversation-container');
      
      // Mesaj gönder
      const response = await onSendMessage({
        alici_id: user.userId,
        mesaj: messageText,
        konu: jobInfo ? `${jobInfo.baslik} - Mesaj` : 'Mesaj',
        ilan_id: jobInfo ? jobInfo.id : null
      });
      
      // Mesaj gönderildikten sonra hemen yeni mesajları kontrol et
      // Kısa delay'ler ile birkaç kez kontrol et (backend'de kaydedilene kadar)
      setTimeout(() => {
        checkForNewMessages();
        // Scroll yap - mesaj gönderildiğinde her zaman scroll yap
        // Delay'i artırıyoruz ki DOM güncellenmiş olsun
        setTimeout(() => {
          scrollToBottom(true); // Instant scroll
          // Bir kez daha scroll yap (DOM güncellemesi için)
          setTimeout(() => {
            scrollToBottom(true);
          }, 50);
        }, 200);
      }, 500);
      
      setTimeout(() => {
        checkForNewMessages();
        // Scroll yap - tekrar kontrol et
        setTimeout(() => {
          scrollToBottom(true); // Instant scroll
          // Bir kez daha scroll yap
          setTimeout(() => {
            scrollToBottom(true);
          }, 50);
        }, 200);
      }, 1000);
      
      // Son kontrol (güvenlik için) - en önemlisi bu
      setTimeout(() => {
        checkForNewMessages();
        // Son scroll kontrolü - en önemlisi bu
        setTimeout(() => {
          scrollToBottom(true); // Instant scroll
          // Bir kez daha kontrol et (çok güvenli olmak için)
          setTimeout(() => {
            scrollToBottom(true);
            // Son bir kez daha (çok güvenli)
            setTimeout(() => {
              scrollToBottom(true);
            }, 100);
          }, 100);
        }, 300);
      }, 1800);
      
      // Focus'u kaldır - mesaj gönderildikten sonra input'tan focus'u kaldır
      setTimeout(() => {
        const activeElement = document.activeElement;
        if (activeElement && (
          activeElement.tagName === 'TEXTAREA' || 
          activeElement.tagName === 'INPUT'
        )) {
          activeElement.blur();
        }
      }, 100);
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
    <div className="conversation-container bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col h-full" style={{ height: 'calc(100vh - 200px)' }}>
      {/* İş İlanı Bilgisi (Sticky Bar) */}
      {jobInfo && (
        <div 
          className="job-sticky-bar text-white px-4 py-3 flex items-center justify-between shadow-lg"
          style={{
            background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            width: '100%'
          }}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
              <Briefcase className="w-5 h-5" style={{ color: '#ffffff' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs mb-0.5 font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Bu Konuşma Şu İş İlanı İçin:</p>
              <h4 className="font-semibold truncate" style={{ color: '#ffffff', fontSize: '16px' }}>{jobInfo.baslik}</h4>
            </div>
          </div>
          <button
            onClick={() => navigate(`/jobs/${jobInfo.id}`)}
            className="ml-3 px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex-shrink-0"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)', 
              color: '#ffffff',
              border: 'none'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
          >
            İlanı Gör
          </button>
        </div>
      )}

      {/* Başlık */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex-shrink-0">
            {user.avatar && String(user.avatar).trim() !== '' ? (
            <img
                src={getImageUrl(user.avatar)}
              alt={user.userName}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 absolute inset-0 z-10"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  const fallback = e.target.parentElement?.querySelector('.avatar-fallback');
                  if (fallback) {
                    fallback.classList.remove('hidden');
                    fallback.style.display = 'flex';
                    fallback.style.zIndex = '1';
                  }
                }}
            />
            ) : null}
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-md border-2 border-white avatar-fallback absolute inset-0"
              style={{ 
                display: (user.avatar && String(user.avatar).trim() !== '') ? 'none' : 'flex',
                zIndex: 1,
                background: 'linear-gradient(to bottom right, #60a5fa, #2563eb)',
                backgroundColor: '#3b82f6'
              }}
            >
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{user.userName}</h3>
              {isOtherUserOnline && (
                <div className="relative flex items-center">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
              )}
            </div>
            <p className={`text-sm flex items-center gap-1.5 ${
              isOtherUserOnline ? 'text-green-600 font-medium' : 'text-gray-500'
            }`} style={{
              color: isOtherUserOnline ? '#16a34a' : '#6b7280'
            }}>
              {isOtherUserOnline ? (
                <>
                  <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span>Çevrimiçi</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <span>Çevrimdışı</span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Mesajlar */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 conversation-messages-container">
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
                  // Mesaj benim mi yoksa karşı tarafın mı?
                  const isOwn = message.gonderen_id === currentUser?.id;
                  
                  // Basit kural: Gönderen (isOwn) her zaman mavi, alıcı her zaman beyaz
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3 animate-fade-in conversation-message-wrapper`}
                    >
                      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`message-bubble px-4 py-3 rounded-2xl shadow-sm ${
                            isOwn
                              ? 'message-bubble-sender bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-br-none'
                              : 'message-bubble-receiver bg-white text-gray-900 rounded-bl-none border border-gray-200'
                          }`}
                          style={{
                            backgroundColor: isOwn ? undefined : '#ffffff',
                            color: isOwn ? '#ffffff' : '#111827',
                            backgroundImage: isOwn ? 'linear-gradient(to right, #2563eb, #1d4ed8)' : undefined
                          }}
                        >
                          <p 
                            className={`text-sm break-words message-text ${
                              isOwn ? 'text-white' : 'text-gray-900'
                            }`}
                            style={{
                              color: isOwn ? '#ffffff' : '#111827'
                            }}
                          >
                            {message.mesaj}
                          </p>
                        </div>
                        <div className={`flex items-center gap-1.5 mt-1.5 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                          <span 
                            className={`text-xs font-medium message-timestamp ${
                              isOwn ? 'text-white opacity-90' : 'text-gray-500'
                            }`}
                            style={{
                              color: isOwn ? 'rgba(255, 255, 255, 0.9)' : '#6b7280',
                              fontSize: '11px'
                            }}
                          >
                            {formatTime(message.gonderme_tarihi)}
                          </span>
                          {isOwn && message.okundu === 1 && (
                            <span 
                              className="text-xs message-read"
                              style={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '12px'
                              }}
                            >
                              ✓✓
                            </span>
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
