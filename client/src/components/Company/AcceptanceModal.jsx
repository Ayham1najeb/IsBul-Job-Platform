/**
 * Kabul Onay Modal Bileşeni
 * Şirket başvuruyu kabul ettiğinde gösterilen modal
 */
import { useState } from 'react';
import { X, Send, Edit2, CheckCircle } from 'lucide-react';
import { messageService } from '../../services/messageService';
import { useNavigate } from 'react-router-dom';

const AcceptanceModal = ({ isOpen, onClose, application, jobTitle }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(
    `Merhaba ${application?.isim || 'Aday'},\n\n` +
    `Başvurunuzu inceledik ve sizinle çalışmak istiyoruz. ` +
    `${jobTitle} pozisyonu için sizinle iletişime geçmek isteriz.\n\n` +
    `Detaylar için lütfen bizimle iletişime geçin.\n\n` +
    `Saygılarımızla,\n` +
    `İnsan Kaynakları`
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!message.trim()) {
      alert('Mesaj boş olamaz!');
      return;
    }

    try {
      setIsSending(true);
      await messageService.sendMessage({
        alici_id: application.kullanici_id,
        mesaj: message,
        konu: `${jobTitle} - Başvuru Kabul`,
        ilan_id: application.ilan_id
      });

      // Başarılı mesaj gönderildi, mesajlar sayfasına yönlendir
      navigate('/messages', { 
        state: { 
          openConversation: application.kullanici_id,
          jobTitle: jobTitle 
        } 
      });
      
      onClose();
    } catch (error) {
      console.error('Mesaj gönderilemedi:', error);
      alert('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
    } finally {
      setIsSending(false);
    }
  };

  const handleCancel = () => {
    setMessage(
      `Merhaba ${application?.isim || 'Aday'},\n\n` +
      `Başvurunuzu inceledik ve sizinle çalışmak istiyoruz. ` +
      `${jobTitle} pozisyonu için sizinle iletişime geçmek isteriz.\n\n` +
      `Detaylar için lütfen bizimle iletişime geçin.\n\n` +
      `Saygılarımızla,\n` +
      `İnsan Kaynakları`
    );
    setIsEditing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
        {/* Başlık */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Başvuru Kabul Onayı</h3>
              <p className="text-green-100 text-sm">Adaya mesaj göndermek ister misiniz?</p>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="text-white hover:bg-green-700 rounded-lg p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* İçerik */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-900">
              <strong>{application?.isim} {application?.soyisim}</strong> adlı aday için başvuru durumu 
              <span className="font-semibold text-green-600"> "Kabul" </span>
              olarak güncellendi. Bu adayla mesajlaşmaya başlamak için aşağıdaki mesajı gönderebilir veya düzenleyebilirsiniz.
            </p>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">
                Adaya Gönderilecek Mesaj
              </label>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                <Edit2 className="w-4 h-4" />
                {isEditing ? 'İptal' : 'Düzenle'}
              </button>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              readOnly={!isEditing}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none ${
                isEditing 
                  ? 'border-primary-300 bg-white' 
                  : 'border-gray-200 bg-gray-50 cursor-not-allowed'
              }`}
              rows={10}
              placeholder="Mesajınızı buraya yazın..."
            />
          </div>
        </div>

        {/* Alt Butonlar */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-end gap-3">
          <button
            onClick={handleCancel}
            disabled={isSending}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            İptal
          </button>
          <button
            onClick={handleSend}
            disabled={isSending || !message.trim()}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg flex items-center gap-2 ${
              isSending || !message.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {isSending ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Gönderiliyor...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 stroke-2" />
                <span>Mesajı Gönder ve Sohbeti Aç</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptanceModal;

