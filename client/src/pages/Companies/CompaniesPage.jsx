/**
 * Şirketler Sayfası
 * Tüm şirketleri listeler
 */
import { useState, useEffect } from 'react';
import { companyService } from '../../services/companyService';
import CompanyCard from '../../components/Companies/CompanyCard';
import CompanyFilters from '../../components/Companies/CompanyFilters';
import { Building2, Loader, Search } from 'lucide-react';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    sehir_id: '',
    kategori_id: '',
    limit: 20,
    offset: 0
  });

  // Şirketleri yükle
  useEffect(() => {
    loadCompanies();
  }, [filters]);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await companyService.getAllCompanies(filters);
      setCompanies(data.kayitlar || []);
    } catch (err) {
      console.error('Şirketler yüklenemedi:', err);
      setError('Şirketler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  // Arama
  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Arama API'si eklenecek
    const filtered = companies.filter(company =>
      company.isim.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCompanies(filtered);
  };

  // Filtre değişikliği
  const handleFilterChange = (newFilters) => {
    setFilters({
      ...newFilters,
      offset: 0
    });
  };

  // Filtreleri temizle
  const handleClearFilters = () => {
    setFilters({
      sehir_id: '',
      kategori_id: '',
      limit: 20,
      offset: 0
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-primary-600" />
            Şirketler
          </h1>
          <p className="text-gray-600 mt-2">
            {companies.length > 0
              ? `${companies.length} şirket bulundu`
              : 'İş veren şirketleri keşfedin'}
          </p>
        </div>

        {/* Arama */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Şirket ara..."
              className="block w-full pl-10 pr-24 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    loadCompanies();
                  }}
                  className="text-gray-400 hover:text-gray-600 px-2"
                >
                  Temizle
                </button>
              )}
              <button
                type="submit"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Ara
              </button>
            </div>
          </form>
        </div>

        {/* İçerik */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sol: Filtreler */}
          <div className="lg:col-span-1">
            <CompanyFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Sağ: Şirketler */}
          <div className="lg:col-span-3">
            {/* Yükleniyor */}
            {loading && companies.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                <p className="text-gray-600">Şirketler yükleniyor...</p>
              </div>
            )}

            {/* Hata */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {error}
              </div>
            )}

            {/* Şirketler */}
            {!loading && !error && companies.length === 0 && (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Şirket bulunamadı
                </h3>
                <p className="text-gray-600 mb-4">
                  Arama kriterlerinize uygun şirket bulunamadı.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}

            {!loading && !error && companies.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
