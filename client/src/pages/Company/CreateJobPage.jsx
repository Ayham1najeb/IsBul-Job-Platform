/**
 * İlan Oluşturma Sayfası
 * Modern ve kullanıcı dostu tasarım
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save,
  ArrowLeft,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  FileText,
  Info,
  Loader,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { jobService } from '../../services/jobService';
import { locationService } from '../../services/locationService';
import { categoryService } from '../../services/categoryService';

const CreateJobPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    baslik: '',
    kategori_id: '',
    sehir_id: '',
    ilce_id: '',
    aciklama: '',
    gereksinimler: '',
    sorumluluklar: '',
    maas_aralik: '',
    calisma_sekli: 'full-time',
    pozisyon_seviyesi: 'mid',
    deneyim_yili: '0',
    egitim_seviyesi: '',
    son_basvuru_tarihi: ''
  });

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
      await jobService.createJob(formData);
      alert('✅ İlan başarıyla oluşturuldu!');
      navigate('/company/jobs');
    } catch (error) {
      console.error('İlan oluşturma hatası:', error);
      alert(error.response?.data?.mesaj || '❌ İlan oluşturulamadı. Lütfen tekrar deneyin.');
      setSaving(false);
    }
  };

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
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/company/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Yeni İlan Oluştur</h1>
                  <p className="text-sm text-gray-500">İş ilanı bilgilerini doldurun</p>
                </div>
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
                  İlanı Yayınla
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Temel Bilgiler */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mr-3">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Temel Bilgiler</h2>
                <p className="text-sm text-gray-500">İlan başlığı ve kategori</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* İlan Başlığı */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  İlan Başlığı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="baslik"
                  value={formData.baslik}
                  onChange={handleInputChange}
                  placeholder="Örn: Senior Frontend Developer"
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
                    <MapPin className="w-4 h-4 inline mr-2" />
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-50"
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
            </div>
          </div>

          {/* İlan Detayları */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mr-3">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">İlan Detayları</h2>
                <p className="text-sm text-gray-500">Açıklama ve gereksinimler</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Açıklama */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  İş Açıklaması <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="aciklama"
                  value={formData.aciklama}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="İş hakkında detaylı bilgi verin..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none"
                  required
                />
              </div>

              {/* Gereksinimler */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gereksinimler
                </label>
                <textarea
                  name="gereksinimler"
                  value={formData.gereksinimler}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Adayda aradığınız özellikler..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none"
                />
              </div>

              {/* Sorumluluklar */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sorumluluklar
                </label>
                <textarea
                  name="sorumluluklar"
                  value={formData.sorumluluklar}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="İş sorumlulukları..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Pozisyon Bilgileri */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Pozisyon Bilgileri</h2>
                <p className="text-sm text-gray-500">Çalışma şekli ve seviye</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Çalışma Şekli */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Çalışma Şekli
                </label>
                <select
                  name="calisma_sekli"
                  value={formData.calisma_sekli}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                >
                  <option value="full-time">Tam Zamanlı</option>
                  <option value="part-time">Yarı Zamanlı</option>
                  <option value="remote">Uzaktan</option>
                  <option value="hybrid">Hibrit</option>
                  <option value="contract">Sözleşmeli</option>
                </select>
              </div>

              {/* Pozisyon Seviyesi */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pozisyon Seviyesi
                </label>
                <select
                  name="pozisyon_seviyesi"
                  value={formData.pozisyon_seviyesi}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                >
                  <option value="intern">Stajyer</option>
                  <option value="junior">Junior</option>
                  <option value="mid">Mid-Level</option>
                  <option value="senior">Senior</option>
                  <option value="lead">Lead</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              {/* Deneyim Yılı */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deneyim (Yıl)
                </label>
                <input
                  type="number"
                  name="deneyim_yili"
                  value={formData.deneyim_yili}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                />
              </div>

              {/* Eğitim Seviyesi */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Eğitim Seviyesi
                </label>
                <select
                  name="egitim_seviyesi"
                  value={formData.egitim_seviyesi}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                >
                  <option value="">Seçin</option>
                  <option value="lise">Lise</option>
                  <option value="onlisans">Ön Lisans</option>
                  <option value="lisans">Lisans</option>
                  <option value="yuksek_lisans">Yüksek Lisans</option>
                  <option value="doktora">Doktora</option>
                </select>
              </div>

              {/* Maaş Aralığı */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Maaş Aralığı
                </label>
                <input
                  type="text"
                  name="maas_aralik"
                  value={formData.maas_aralik}
                  onChange={handleInputChange}
                  placeholder="Örn: 15.000 - 20.000 TL"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                />
              </div>

              {/* Son Başvuru Tarihi */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Son Başvuru Tarihi
                </label>
                <input
                  type="date"
                  name="son_basvuru_tarihi"
                  value={formData.son_basvuru_tarihi}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* İpucu */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-xl p-6">
            <div className="flex items-start">
              <Info className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                  İlan Oluşturma İpuçları
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Başlık net ve açıklayıcı olmalı</li>
                  <li>• Gereksinimler ve sorumluluklar detaylı yazılmalı</li>
                  <li>• Maaş aralığı belirtmek başvuru oranını artırır</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPage;
