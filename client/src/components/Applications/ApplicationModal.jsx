/**
 * Başvuru Modal Bileşeni
 * CV kontrolü ile geliştirilmiş başvuru formu
 */
import { useState, useEffect } from 'react';
import { X, Send, FileText, AlertCircle, CheckCircle, Upload, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { resumeService } from '../../services/resumeService';

const ApplicationModal = ({ isOpen, onClose, onSubmit, jobTitle }) => {
  const [formData, setFormData] = useState({
    notlar: '',
    ozgecmis_id: null
  });
  const [loading, setLoading] = useState(false);
  const [checkingCV, setCheckingCV] = useState(true);
  const [hasCV, setHasCV] = useState(false);
  const [cvData, setCvData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      checkUserCV();
    }
  }, [isOpen]);

  const checkUserCV = async () => {
    try {
      setCheckingCV(true);
      const response = await resumeService.getFullResume();
      
      // CV var mı kontrol et
      const hasSomeData = response.data && (
        (response.data.deneyimler && response.data.deneyimler.length > 0) ||
        (response.data.egitimler && response.data.egitimler.length > 0) ||
        (response.data.beceriler && response.data.beceriler.length > 0)
      );
      
      setHasCV(hasSomeData);
      setCvData(response.data);
    } catch (error) {
      console.error('CV kontrolü hatası:', error);
      setHasCV(false);
    } finally {
      setCheckingCV(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!hasCV) {
      alert('Lütfen önce özgeçmişinizi oluşturun!');
      return;
    }
    
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
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Başvuru Yap</h3>
                  <p className="text-blue-100 text-sm">Özgeçmişiniz ile başvurun</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/20 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* İlan Bilgisi */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
              <p className="text-sm text-gray-600 mb-1 font-medium">Başvurduğunuz İlan:</p>
              <p className="font-bold text-gray-900 text-lg">{jobTitle}</p>
            </div>

            {/* CV Kontrolü */}
            {checkingCV ? (
              <div className="mb-6 p-6 bg-gray-50 rounded-xl text-center">
                <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
                <p className="text-gray-600">Özgeçmiş kontrol ediliyor...</p>
              </div>
            ) : !hasCV ? (
              // CV Yok - Uyarı
              <div className="mb-6">
                <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl">
                  <div className="flex items-start">
                    <AlertCircle className="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-red-900 mb-2">
                        Özgeçmiş Bulunamadı
                      </h4>
                      <p className="text-red-800 mb-4">
                        Başvuru yapabilmek için önce özgeçmişinizi oluşturmalısınız. 
                        Özgeçmişiniz işverene gönderilecektir.
                      </p>
                      <Link
                        to="/resume/edit"
                        className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold shadow-lg"
                      >
                        <FileText className="w-5 h-5 mr-2" />
                        Özgeçmiş Oluştur
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // CV Var - Bilgi
              <div className="mb-6">
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-green-900 mb-2">
                        Özgeçmiş Hazır
                      </h4>
                      <p className="text-green-800 mb-3">
                        Özgeçmişiniz başvurunuzla birlikte işverene gönderilecektir.
                      </p>
                      <div className="bg-white/60 rounded-lg p-3 text-sm">
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <div className="font-bold text-green-700 text-lg">
                              {cvData?.deneyimler?.length || 0}
                            </div>
                            <div className="text-gray-600 text-xs">Deneyim</div>
                          </div>
                          <div>
                            <div className="font-bold text-green-700 text-lg">
                              {cvData?.egitimler?.length || 0}
                            </div>
                            <div className="text-gray-600 text-xs">Eğitim</div>
                          </div>
                          <div>
                            <div className="font-bold text-green-700 text-lg">
                              {cvData?.beceriler?.length || 0}
                            </div>
                            <div className="text-gray-600 text-xs">Beceri</div>
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/resume"
                        className="inline-flex items-center mt-3 text-green-700 hover:text-green-800 font-medium text-sm"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        Özgeçmişi Görüntüle
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Notlar */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Ek Notlar (Opsiyonel)
                </label>
                <textarea
                  value={formData.notlar}
                  onChange={(e) => setFormData({ ...formData, notlar: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  placeholder="Kendiniz hakkında kısa bir not ekleyebilirsiniz... (Örn: Neden bu pozisyon için uygun olduğunuzu açıklayın)"
                  disabled={!hasCV}
                />
                <p className="text-xs text-gray-500 mt-2 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Bu not işverene iletilecektir
                </p>
              </div>

              {/* Uyarı */}
              <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 rounded-xl">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-amber-900 mb-1">
                      Önemli Bilgilendirme
                    </p>
                    <p className="text-sm text-amber-800">
                      Başvurunuz ve özgeçmişiniz işverene iletilecektir. 
                      Lütfen bilgilerinizin doğru ve güncel olduğundan emin olun.
                    </p>
                  </div>
                </div>
              </div>

              {/* Butonlar */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={loading || !hasCV}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
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
    </div>
  );
};

export default ApplicationModal;
