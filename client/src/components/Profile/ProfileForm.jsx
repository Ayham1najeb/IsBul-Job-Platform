/**
 * Profil Düzenleme Form Bileşeni
 * Kullanıcı profil bilgilerini düzenleme formu
 */
import { useState, useEffect } from 'react';
import { jobService } from '../../services/jobService';

const ProfileForm = ({ initialData, onSubmit, onCancel }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    isim: '',
    soyisim: '',
    telefon: '',
    dogum_tarihi: '',
    cinsiyet: '',
    sehir_id: '',
    ilce_id: '',
    adres: '',
    website: '',
    ...initialData
  });

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      const data = await jobService.getCities();
      setCities(data.kayitlar || []);
    } catch (error) {
      console.error('Şehirler yüklenemedi:', error);
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
      {/* Ad Soyad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ad *
          </label>
          <input
            type="text"
            name="isim"
            value={formData.isim}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Soyad *
          </label>
          <input
            type="text"
            name="soyisim"
            value={formData.soyisim}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Email (Read-only) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          E-posta
        </label>
        <input
          type="email"
          value={formData.email}
          disabled
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
        />
        <p className="text-xs text-gray-500 mt-1">
          E-posta adresi değiştirilemez
        </p>
      </div>

      {/* Telefon & Doğum Tarihi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefon
          </label>
          <input
            type="tel"
            name="telefon"
            value={formData.telefon || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="0555 123 45 67"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Doğum Tarihi
          </label>
          <input
            type="date"
            name="dogum_tarihi"
            value={formData.dogum_tarihi || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Cinsiyet */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cinsiyet
        </label>
        <select
          name="cinsiyet"
          value={formData.cinsiyet || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Seçiniz</option>
          <option value="erkek">Erkek</option>
          <option value="kadin">Kadın</option>
          <option value="diger">Diğer</option>
        </select>
      </div>

      {/* Şehir */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Şehir
        </label>
        <select
          name="sehir_id"
          value={formData.sehir_id || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Şehir Seçin</option>
          {cities.map(city => (
            <option key={city.id} value={city.id}>{city.isim}</option>
          ))}
        </select>
      </div>

      {/* Adres */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adres
        </label>
        <textarea
          name="adres"
          value={formData.adres || ''}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Tam adresiniz..."
        />
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Website / Portfolio
        </label>
        <input
          type="url"
          name="website"
          value={formData.website || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="https://..."
        />
      </div>

      {/* Butonlar */}
      <div className="flex gap-4 pt-6 border-t mt-6">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
        >
          {loading ? 'Kaydediliyor...' : '💾 Değişiklikleri Kaydet'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          İptal
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
