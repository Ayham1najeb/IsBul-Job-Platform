/**
 * İş İlanı Form Bileşeni
 * İlan oluşturma ve düzenleme formu
 */
import { useState, useEffect } from 'react';
import { jobService } from '../../services/jobService';

const JobForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);

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
    deneyim_yili: 0,
    egitim_seviyesi: '',
    son_basvuru_tarihi: '',
    ...initialData
  });

  useEffect(() => {
    loadFilters();
  }, []);

  useEffect(() => {
    if (formData.sehir_id) {
      loadDistricts(formData.sehir_id);
    }
  }, [formData.sehir_id]);

  const loadFilters = async () => {
    try {
      const [categoriesData, citiesData] = await Promise.all([
        jobService.getCategories(),
        jobService.getCities()
      ]);
      setCategories(categoriesData.kayitlar || []);
      setCities(citiesData.kayitlar || []);
    } catch (error) {
      console.error('Filtreler yüklenemedi:', error);
    }
  };

  const loadDistricts = async (sehirId) => {
    try {
      const data = await jobService.getDistricts(sehirId);
      setDistricts(data.kayitlar || []);
    } catch (error) {
      console.error('İlçeler yüklenemedi:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Başlık */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          İlan Başlığı *
        </label>
        <input
          type="text"
          name="baslik"
          value={formData.baslik}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Örn: Senior Frontend Developer"
        />
      </div>

      {/* Kategori ve Şehir */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori *
          </label>
          <select
            name="kategori_id"
            value={formData.kategori_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Kategori Seçin</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.isim}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Şehir *
          </label>
          <select
            name="sehir_id"
            value={formData.sehir_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Şehir Seçin</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>{city.isim}</option>
            ))}
          </select>
        </div>
      </div>

      {/* İlçe */}
      {districts.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            İlçe
          </label>
          <select
            name="ilce_id"
            value={formData.ilce_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">İlçe Seçin (Opsiyonel)</option>
            {districts.map(district => (
              <option key={district.id} value={district.id}>{district.isim}</option>
            ))}
          </select>
        </div>
      )}

      {/* Açıklama */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          İş Tanımı *
        </label>
        <textarea
          name="aciklama"
          value={formData.aciklama}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="İş tanımını detaylı bir şekilde yazın..."
        />
      </div>

      {/* Gereksinimler */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gereksinimler
        </label>
        <textarea
          name="gereksinimler"
          value={formData.gereksinimler}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="Her satıra bir gereksinim yazın..."
        />
        <p className="text-xs text-gray-500 mt-1">Her satıra bir gereksinim yazın</p>
      </div>

      {/* Sorumluluklar */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sorumluluklar
        </label>
        <textarea
          name="sorumluluklar"
          value={formData.sorumluluklar}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="Her satıra bir sorumluluk yazın..."
        />
      </div>

      {/* Çalışma Detayları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Çalışma Şekli *
          </label>
          <select
            name="calisma_sekli"
            value={formData.calisma_sekli}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="full-time">Tam Zamanlı</option>
            <option value="part-time">Yarı Zamanlı</option>
            <option value="remote">Uzaktan</option>
            <option value="hybrid">Hibrit</option>
            <option value="contract">Sözleşmeli</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pozisyon Seviyesi
          </label>
          <select
            name="pozisyon_seviyesi"
            value={formData.pozisyon_seviyesi}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="intern">Stajyer</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-Level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deneyim (Yıl)
          </label>
          <input
            type="number"
            name="deneyim_yili"
            value={formData.deneyim_yili}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Maaş ve Eğitim */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maaş Aralığı
          </label>
          <input
            type="text"
            name="maas_aralik"
            value={formData.maas_aralik}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="Örn: 15.000 - 25.000 TL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Eğitim Seviyesi
          </label>
          <select
            name="egitim_seviyesi"
            value={formData.egitim_seviyesi}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Seçiniz</option>
            <option value="lise">Lise</option>
            <option value="onlisans">Ön Lisans</option>
            <option value="lisans">Lisans</option>
            <option value="yuksek_lisans">Yüksek Lisans</option>
            <option value="doktora">Doktora</option>
          </select>
        </div>
      </div>

      {/* Son Başvuru Tarihi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Son Başvuru Tarihi
        </label>
        <input
          type="date"
          name="son_basvuru_tarihi"
          value={formData.son_basvuru_tarihi}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Butonlar */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? 'Kaydediliyor...' : (initialData ? 'Güncelle' : 'İlan Oluştur')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          İptal
        </button>
      </div>
    </form>
  );
};

export default JobForm;
