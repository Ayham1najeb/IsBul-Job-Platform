/**
 * Başvuru Modal Bileşeni
 * Başvuru yapma modal formu
 */
import { useState } from 'react';
import { X, Send } from 'lucide-react';

const ApplicationModal = ({ isOpen, onClose, onSubmit, jobTitle }) => {
  const [formData, setFormData] = useState({
    notlar: '',
    ozgecmis_id: null
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({ notlar: '', ozgecmis_id: null });
      onClose();
    } catch (error) {
      console.error('Başvuru hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
          {/* Başlık */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Başvuru Yap</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* İlan Bilgisi */}
          <div className="mb-6 p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Başvurduğunuz İlan:</p>
            <p className="font-semibold text-gray-900">{jobTitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Notlar */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ek Notlar (Opsiyonel)
              </label>
              <textarea
                value={formData.notlar}
                onChange={(e) => setFormData({ ...formData, notlar: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Kendiniz hakkında kısa bir not ekleyebilirsiniz..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Bu not işverene iletilecektir
              </p>
            </div>

            {/* Özgeçmiş Seçimi (Placeholder) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Özgeçmiş
              </label>
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <p className="text-sm text-gray-600">
                  Varsayılan özgeçmişiniz kullanılacak
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  (Özgeçmiş yönetimi yakında eklenecek)
                </p>
              </div>
            </div>

            {/* Uyarı */}
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                ⚠️ Başvurunuz işverene iletilecektir. Lütfen bilgilerinizin doğru olduğundan emin olun.
              </p>
            </div>

            {/* Butonlar */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Başvuruyu Gönder
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
