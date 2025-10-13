/**
 * Özgeçmiş Ayarları Sayfası
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeService } from '../../services/resumeService';
import { Settings, Save, Loader, Eye, EyeOff, Link as LinkIcon, Briefcase } from 'lucide-react';

const ResumeSettingsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    baslik: '',
    ozet: '',
    linkedin_url: '',
    github_url: '',
    website_url: '',
    portfolio_url: '',
    gorunurluk: 'sadece_sirketler',
    pdf_template: 'klasik'
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await resumeService.getSettings();
      if (data.data) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error('Ayarlar yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      console.log('Kaydedilecek ayarlar:', settings);
      const response = await resumeService.saveSettings(settings);
      console.log('Kaydetme yanıtı:', response);
      alert('✅ Ayarlar başarıyla kaydedildi!');
      // Ayarları yeniden yükle
      await loadSettings();
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      console.error('Hata detayı:', error.response?.data);
      alert(`❌ Kaydetme hatası: ${error.response?.data?.mesaj || error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 flex items-center justify-center">
        <Loader className="w-12 h-12 text-primary-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center shadow-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                Özgeçmiş Ayarları
              </h1>
              <p className="text-gray-600">Görünürlük ve profil ayarlarınızı yönetin</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
          {/* Başlık ve Özet */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-orange-600" />
              Profil Bilgileri
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlık
              </label>
              <input
                type="text"
                value={settings.baslik || ''}
                onChange={(e) => setSettings({ ...settings, baslik: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Örn: Senior Frontend Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Özet
              </label>
              <textarea
                rows="4"
                value={settings.ozet || ''}
                onChange={(e) => setSettings({ ...settings, ozet: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Kendinizi kısaca tanıtın..."
              />
            </div>
          </div>

          {/* Sosyal Medya Linkleri */}
          <div className="space-y-4 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-900">Sosyal Medya & Web</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={settings.linkedin_url || ''}
                onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="https://linkedin.com/in/kullanici-adi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={settings.github_url || ''}
                onChange={(e) => setSettings({ ...settings, github_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="https://github.com/kullanici-adi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={settings.website_url || ''}
                onChange={(e) => setSettings({ ...settings, website_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="https://www.website.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Portfolio URL
              </label>
              <input
                type="url"
                value={settings.portfolio_url || ''}
                onChange={(e) => setSettings({ ...settings, portfolio_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="https://portfolio.com"
              />
            </div>
          </div>

          {/* Görünürlük */}
          <div className="space-y-4 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-600" />
              Görünürlük Ayarları
            </h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">Önemli Bilgi</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Bu ayar özgeçmişinizin platformda kimler tarafından görülebileceğini belirler. 
                    Şirketlerin sizi bulabilmesi için "Sadece Şirketler" seçeneğini öneriyoruz.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Özgeçmişim kimler görebilir?
              </label>
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  settings.gorunurluk === 'herkese_acik'
                    ? 'border-green-500 bg-green-50 shadow-md'
                    : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="gorunurluk"
                    value="herkese_acik"
                    checked={settings.gorunurluk === 'herkese_acik'}
                    onChange={(e) => setSettings({ ...settings, gorunurluk: e.target.value })}
                    className="mt-1 text-green-600 focus:ring-green-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-gray-900">Herkese Açık</div>
                      <Eye className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Herkes özgeçmişinizi görebilir ve indirebilir
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        Maksimum Görünürlük
                      </span>
                    </div>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  settings.gorunurluk === 'sadece_sirketler'
                    ? 'border-orange-500 bg-orange-50 shadow-md'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="gorunurluk"
                    value="sadece_sirketler"
                    checked={settings.gorunurluk === 'sadece_sirketler'}
                    onChange={(e) => setSettings({ ...settings, gorunurluk: e.target.value })}
                    className="mt-1 text-orange-600 focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-gray-900">Sadece Şirketler</div>
                      <Briefcase className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Sadece kayıtlı ve onaylanmış şirketler özgeçmişinizi görebilir
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                        Önerilen ⭐
                      </span>
                      <span className="text-xs text-gray-500">Dengeli gizlilik</span>
                    </div>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  settings.gorunurluk === 'gizli'
                    ? 'border-red-500 bg-red-50 shadow-md'
                    : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="gorunurluk"
                    value="gizli"
                    checked={settings.gorunurluk === 'gizli'}
                    onChange={(e) => setSettings({ ...settings, gorunurluk: e.target.value })}
                    className="mt-1 text-red-600 focus:ring-red-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-gray-900">Gizli</div>
                      <EyeOff className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Sadece siz özgeçmişinizi görebilirsiniz. Şirketler sizi bulamaz.
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                        Maksimum Gizlilik
                      </span>
                      <span className="text-xs text-gray-500">İş aramıyorsanız</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* ملاحظة: تم نقل اختيار القالب إلى صفحة المعاينة */}
          <div className="space-y-4 pt-6 border-t">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">PDF Şablonu Seçimi</p>
                  <p className="text-sm text-blue-700 mt-1">
                    PDF şablonunu <strong>Önizleme</strong> sayfasında seçebilirsiniz. Önizleme sayfasında farklı şablonları deneyebilir ve beğendiğinizi indirebilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* حذف قسم PDF Şablonu القديم */}
          <div className="hidden">
            <h3 className="text-lg font-semibold text-gray-900">PDF Şablonu</h3>
            <p className="text-sm text-gray-600">PDF olarak indirdiğinizde kullanılacak şablonu seçin</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Modern Template */}
              <label
                className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                  settings.pdf_template === 'modern'
                    ? 'border-orange-600 bg-orange-50 shadow-lg'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <input
                  type="radio"
                  name="pdf_template"
                  value="modern"
                  checked={settings.pdf_template === 'modern'}
                  onChange={(e) => setSettings({ ...settings, pdf_template: e.target.value })}
                  className="sr-only"
                />
                {settings.pdf_template === 'modern' && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="text-center">
                  {/* Modern Template Preview */}
                  <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg mb-3 p-3 border border-gray-200">
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded mb-2"></div>
                    <div className="space-y-1">
                      <div className="h-1.5 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-1.5 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-1 bg-gray-200 rounded w-full mt-2"></div>
                      <div className="h-1 bg-gray-200 rounded w-5/6"></div>
                      <div className="flex gap-1 mt-2">
                        <div className="h-1 bg-blue-400 rounded w-1/4"></div>
                        <div className="h-1 bg-purple-400 rounded w-1/4"></div>
                        <div className="h-1 bg-pink-400 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900">Modern</div>
                  <div className="text-xs text-gray-500 mt-1">Renkli ve dinamik</div>
                </div>
              </label>

              {/* Klasik Template */}
              <label
                className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                  settings.pdf_template === 'klasik'
                    ? 'border-orange-600 bg-orange-50 shadow-lg'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <input
                  type="radio"
                  name="pdf_template"
                  value="klasik"
                  checked={settings.pdf_template === 'klasik'}
                  onChange={(e) => setSettings({ ...settings, pdf_template: e.target.value })}
                  className="sr-only"
                />
                {settings.pdf_template === 'klasik' && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="text-center">
                  {/* Klasik Template Preview */}
                  <div className="w-full h-32 bg-white rounded-lg mb-3 p-3 border-2 border-gray-300">
                    <div className="h-2 bg-gray-800 rounded mb-2"></div>
                    <div className="space-y-1">
                      <div className="h-1.5 bg-gray-700 rounded w-3/4"></div>
                      <div className="h-1.5 bg-gray-600 rounded w-1/2"></div>
                      <div className="border-t border-gray-300 my-2"></div>
                      <div className="h-1 bg-gray-400 rounded w-full"></div>
                      <div className="h-1 bg-gray-400 rounded w-5/6"></div>
                      <div className="h-1 bg-gray-400 rounded w-4/6"></div>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900">Klasik</div>
                  <div className="text-xs text-gray-500 mt-1">Profesyonel ve resmi</div>
                </div>
              </label>

              {/* Minimal Template */}
              <label
                className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                  settings.pdf_template === 'minimal'
                    ? 'border-orange-600 bg-orange-50 shadow-lg'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <input
                  type="radio"
                  name="pdf_template"
                  value="minimal"
                  checked={settings.pdf_template === 'minimal'}
                  onChange={(e) => setSettings({ ...settings, pdf_template: e.target.value })}
                  className="sr-only"
                />
                {settings.pdf_template === 'minimal' && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="text-center">
                  {/* Minimal Template Preview */}
                  <div className="w-full h-32 bg-gray-50 rounded-lg mb-3 p-3 border border-gray-200">
                    <div className="h-1.5 bg-gray-900 rounded w-2/3 mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-1 bg-gray-300 rounded w-full"></div>
                      <div className="h-1 bg-gray-300 rounded w-5/6"></div>
                      <div className="h-1 bg-gray-300 rounded w-4/6"></div>
                      <div className="flex gap-2 mt-3">
                        <div className="h-4 w-4 border border-gray-400 rounded-full"></div>
                        <div className="h-4 w-4 border border-gray-400 rounded-full"></div>
                        <div className="h-4 w-4 border border-gray-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900">Minimal</div>
                  <div className="text-xs text-gray-500 mt-1">Sade ve şık</div>
                </div>
              </label>
            </div>
          </div>

          {/* Butonlar */}
          <div className="flex items-center gap-4 pt-6">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/resume')}
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeSettingsPage;
