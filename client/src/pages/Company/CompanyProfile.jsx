/**
 * Şirket Profili Sayfası
 * Modern ve profesyonel tasarım
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar,
  Users,
  Save,
  Upload,
  Briefcase,
  Info,
  CheckCircle,
  Loader,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { companyService } from '../../services/companyService';
import { locationService } from '../../services/locationService';
import { categoryService } from '../../services/categoryService';
import { useAuthStore } from '../../store/authStore';

const CompanyProfile = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('genel');
  const [company, setCompany] = useState(null);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    isim: '',
    sehir_id: '',
    ilce_id: '',
    kategori_id: '',
    adres: '',
    telefon: '',
    email: '',
    website: '',
    aciklama: '',
    kurulus_tarihi: '',
    calisan_sayisi: ''
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(0);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (formData.sehir_id) {
      loadDistricts(formData.sehir_id);
    }
  }, [formData.sehir_id]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      const [citiesData, categoriesData] = await Promise.all([
        locationService.getCities(),
        categoryService.getCategories()
      ]);
      
      setCities(citiesData.kayitlar || citiesData || []);
      setCategories(categoriesData.kayitlar || categoriesData || []);
      
      try {
        const companyData = await companyService.getMyCompany();
        setCompany(companyData);
        setFormData({
          isim: companyData.isim || '',
          sehir_id: companyData.sehir_id || '',
          ilce_id: companyData.ilce_id || '',
          kategori_id: companyData.kategori_id || '',
          adres: companyData.adres || '',
          telefon: companyData.telefon || '',
          email: companyData.email || '',
          website: companyData.website || '',
          aciklama: companyData.aciklama || '',
          kurulus_tarihi: companyData.kurulus_tarihi || '',
          calisan_sayisi: companyData.calisan_sayisi || ''
        });
        setProfileCompletion(companyData.profil_tamamlanma || 0);
        
        if (companyData.sehir_id) {
          loadDistricts(companyData.sehir_id);
        }
      } catch (error) {
        console.log('Şirket profili bulunamadı, yeni profil oluşturulacak');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Veri yüklenirken hata:', error);
      setLoading(false);
    }
  };

  const loadDistricts = async (cityId) => {
    try {
      const data = await locationService.getDistricts(cityId);
      setDistricts(data.kayitlar || data || []);
    } catch (error) {
      console.error('İlçeler yüklenemedi:', error);
      setDistricts([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      
      const result = await companyService.createOrUpdateCompany(formData);
      
      await loadInitialData();
      
      alert(result.mesaj || 'Şirket bilgileri başarıyla kaydedildi!');
      setSaving(false);
    } catch (error) {
      console.error('Şirket profili kaydedilemedi:', error);
      alert(error.response?.data?.mesaj || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      setSaving(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sections = [
    { id: 'genel', label: 'Genel Bilgiler', icon: Info, color: 'blue' },
    { id: 'iletisim', label: 'İletişim', icon: Phone, color: 'green' },
    { id: 'detaylar', label: 'Detaylar', icon: Building2, color: 'purple' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Şirket Profili</h1>
                <p className="text-sm text-gray-500">Şirket bilgilerinizi düzenleyin</p>
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {saving ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Kaydet
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sticky top-24">
              {/* Logo Upload */}
              <div className="mb-6">
                <div className="relative group">
                  <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
                    {logoPreview || company?.logo_url ? (
                      <img
                        src={logoPreview || company?.logo_url}
                        alt="Logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building2 className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-xl">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-white mx-auto mb-2" />
                      <span className="text-white text-sm font-medium">Logo Yükle</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? `bg-${section.color}-50 text-${section.color}-700 shadow-sm`
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className={`w-5 h-5 mr-3 ${isActive ? `text-${section.color}-600` : 'text-gray-400'}`} />
                        {section.label}
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4" />}
                    </button>
                  );
                })}
              </nav>

              {/* Progress */}
              <div className="mt-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Tamamlanma</span>
                  <span className={`text-lg font-bold ${profileCompletion >= 50 ? 'text-green-600' : 'text-blue-600'}`}>
                    {profileCompletion}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${profileCompletion >= 50 ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
                {profileCompletion < 50 && (
                  <p className="text-xs text-gray-600 mt-2">
                    İlan yayınlamak için %50 gerekli
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Warning */}
            {profileCompletion < 50 && (
              <div className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-xl p-4 shadow-sm">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-900 mb-1">
                      İlan Yayınlamak İçin Profil Tamamlama Gerekli
                    </h4>
                    <p className="text-sm text-yellow-800">
                      İş ilanı yayınlayabilmek için profilinizi en az %50 tamamlamalısınız. 
                      Lütfen tüm zorunlu alanları doldurun.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Genel Bilgiler */}
              {activeSection === 'genel' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mr-3">
                      <Info className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Genel Bilgiler</h2>
                      <p className="text-sm text-gray-500">Şirketinizin temel bilgileri</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {/* Şirket Adı */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Şirket Adı <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="isim"
                        value={formData.isim}
                        onChange={handleInputChange}
                        placeholder="Şirket adınızı girin"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>

                    {/* Kategori */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Kategori <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="kategori_id"
                        value={formData.kategori_id}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      >
                        <option value="">Kategori seçin</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.isim}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Lokasyon */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Şehir <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="sehir_id"
                          value={formData.sehir_id}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        >
                          <option value="">Şehir seçin</option>
                          {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.isim}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          İlçe
                        </label>
                        <select
                          name="ilce_id"
                          value={formData.ilce_id}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-50 disabled:text-gray-500"
                          disabled={!formData.sehir_id}
                        >
                          <option value="">İlçe seçin</option>
                          {districts.map((district) => (
                            <option key={district.id} value={district.id}>
                              {district.isim}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Şirket Hakkında */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Şirket Hakkında
                      </label>
                      <textarea
                        name="aciklama"
                        value={formData.aciklama}
                        onChange={handleInputChange}
                        rows="6"
                        placeholder="Şirketiniz hakkında detaylı bilgi verin..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Şirketinizin misyonu, vizyonu ve çalışma kültürü hakkında bilgi verin.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* İletişim */}
              {activeSection === 'iletisim' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mr-3">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">İletişim Bilgileri</h2>
                      <p className="text-sm text-gray-500">İletişim ve adres bilgileri</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {/* Telefon */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Telefon
                      </label>
                      <input
                        type="tel"
                        name="telefon"
                        value={formData.telefon}
                        onChange={handleInputChange}
                        placeholder="+90 (5xx) xxx xx xx"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      />
                    </div>

                    {/* E-posta */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        E-posta
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="info@sirketiniz.com"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      />
                    </div>

                    {/* Website */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Globe className="w-4 h-4 inline mr-2" />
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://www.sirketiniz.com"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      />
                    </div>

                    {/* Adres */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Adres
                      </label>
                      <textarea
                        name="adres"
                        value={formData.adres}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="Şirket adresinizi girin"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Detaylar */}
              {activeSection === 'detaylar' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mr-3">
                      <Building2 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Şirket Detayları</h2>
                      <p className="text-sm text-gray-500">Ek şirket bilgileri</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {/* Kuruluş Tarihi */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Kuruluş Tarihi
                      </label>
                      <input
                        type="date"
                        name="kurulus_tarihi"
                        value={formData.kurulus_tarihi}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      />
                    </div>

                    {/* Çalışan Sayısı */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Users className="w-4 h-4 inline mr-2" />
                        Çalışan Sayısı
                      </label>
                      <select
                        name="calisan_sayisi"
                        value={formData.calisan_sayisi}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      >
                        <option value="">Seçin</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-200">51-200</option>
                        <option value="201-500">201-500</option>
                        <option value="501+">501+</option>
                      </select>
                    </div>

                    {/* İpucu */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-xl p-4">
                      <div className="flex items-start">
                        <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-semibold text-blue-900 mb-1">
                            Profil Tamamlama İpucu
                          </h4>
                          <p className="text-sm text-blue-800">
                            Eksiksiz bir profil, iş arayanların şirketinizi daha iyi tanımasını sağlar ve 
                            başvuru oranlarını artırır.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>

            {/* İstatistikler */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                <Briefcase className="w-8 h-8 mb-3 opacity-80" />
                <div className="text-3xl font-bold mb-1">{company?.ilan_sayisi || 0}</div>
                <div className="text-blue-100 text-sm">Aktif İlan</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
                <Users className="w-8 h-8 mb-3 opacity-80" />
                <div className="text-3xl font-bold mb-1">{company?.basvuru_sayisi || 0}</div>
                <div className="text-green-100 text-sm">Toplam Başvuru</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                <Users className="w-8 h-8 mb-3 opacity-80" />
                <div className="text-3xl font-bold mb-1">{company?.calisan_sayisi || 0}</div>
                <div className="text-purple-100 text-sm">Çalışan Sayısı</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
