/**
 * İş İlanı Filtreleme Bileşeni
 * İş ilanlarını filtreleme seçenekleri
 */
import { useState, useEffect } from 'react';
import { jobService } from '../../services/jobService';
import { Filter, X } from 'lucide-react';

const JobFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Kategorileri ve şehirleri yükle
  useEffect(() => {
    loadFilters();
  }, []);

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

  const handleFilterChange = (filterName, value) => {
    onFilterChange({
      ...filters,
      [filterName]: value
    });
  };

  const activeFiltersCount = Object.values(filters).filter(v => v && v !== '').length;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      {/* Mobil: Filtre Butonu */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtreler
            {activeFiltersCount > 0 && (
              <span className="bg-white text-primary-600 px-2 py-0.5 rounded-full text-xs font-medium">
                {activeFiltersCount}
              </span>
            )}
          </span>
          <span>{isOpen ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Filtre İçeriği */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block space-y-4`}>
        {/* Başlık ve Temizle Butonu */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtreler
          </h3>
          {activeFiltersCount > 0 && (
            <button
              onClick={onClearFilters}
              className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Temizle
            </button>
          )}
        </div>

        {/* Kategori Filtresi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori
          </label>
          <select
            value={filters.kategori_id || ''}
            onChange={(e) => handleFilterChange('kategori_id', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Tüm Kategoriler</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.isim}
              </option>
            ))}
          </select>
        </div>

        {/* Şehir Filtresi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Şehir
          </label>
          <select
            value={filters.sehir_id || ''}
            onChange={(e) => handleFilterChange('sehir_id', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Tüm Şehirler</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.isim}
              </option>
            ))}
          </select>
        </div>

        {/* Çalışma Şekli Filtresi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Çalışma Şekli
          </label>
          <select
            value={filters.calisma_sekli || ''}
            onChange={(e) => handleFilterChange('calisma_sekli', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Tümü</option>
            <option value="full-time">Tam Zamanlı</option>
            <option value="part-time">Yarı Zamanlı</option>
            <option value="remote">Uzaktan</option>
            <option value="hybrid">Hibrit</option>
            <option value="contract">Sözleşmeli</option>
          </select>
        </div>

        {/* Aktif Filtreler */}
        {activeFiltersCount > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Aktif Filtreler ({activeFiltersCount})
            </p>
            <div className="flex flex-wrap gap-2">
              {filters.kategori_id && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  Kategori
                  <button
                    onClick={() => handleFilterChange('kategori_id', '')}
                    className="hover:text-primary-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.sehir_id && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  Şehir
                  <button
                    onClick={() => handleFilterChange('sehir_id', '')}
                    className="hover:text-primary-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.calisma_sekli && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  Çalışma Şekli
                  <button
                    onClick={() => handleFilterChange('calisma_sekli', '')}
                    className="hover:text-primary-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobFilters;
