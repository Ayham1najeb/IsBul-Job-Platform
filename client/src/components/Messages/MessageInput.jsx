/**
 * Mesaj Girişi Bileşeni
 * Mesaj yazma ve gönderme
 */
import { useState } from 'react';
import { Send, Smile } from 'lucide-react';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || sending) return;

    try {
      setSending(true);
      await onSend(message.trim());
      setMessage('');
      
      // Mesaj gönderildikten sonra focus'u kaldır
      // Kullanıcı yeni mesajı görmek istediği için focus'u kaldırıyoruz
      setTimeout(() => {
        const textarea = e.target.querySelector('textarea');
        if (textarea) {
          textarea.blur();
        }
      }, 50);
    } catch (error) {
      console.error('Mesaj gönderilemedi:', error);
      alert('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
      <div className="flex items-end gap-2">
        {/* Emoji - Sadece metin mesajlarına izin veriliyor, dosya ekleme yok */}
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Mesaj Girişi */}
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Mesajınızı yazın..."
            rows="1"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all"
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
        </div>

        {/* Gönder Butonu */}
        <button
          type="submit"
          disabled={!message.trim() || sending}
          className={`p-3 rounded-xl transition-all ${
            message.trim() && !sending
              ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-lg hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Klavye Kısayolu */}
      <div className="mt-2 text-xs text-gray-500 text-right">
        Enter ile gönder, Shift+Enter ile yeni satır
      </div>
    </form>
  );
};

export default MessageInput;
