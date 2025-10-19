/**
 * Gelişmiş Arama Bileşeni
 * Arama geçmişi, kayıtlı aramalar ve öneriler içerir
 */
import { useState, useEffect } from 'react';
import { Search, History, Star, X, Bookmark, TrendingUp } from 'lucide-react';

const AdvancedSearch = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [popularSearches] = useState([
    'Yazılım Geliştirici',
    'Muhasebe Elemanı',
    'Satış Danışmanı',
    'Grafik Tasarımcı',
    'İnsan Kaynakları'
  ]);

  // LocalStorage'dan arama geçmişini yükle
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const saved = JSON.parse(localStorage.getItem('savedSearches') || '[]');
    setSearchHistory(history.slice(0, 5)); // Son 5 arama
    setSavedSearches(saved);
  }, []);

  // Arama yap
  const handleSearch = (term) => {
    if (!term.trim()) return;

    // Arama geçmişine ekle
    const newHistory = [term, ...searchHistory.filter(h => h !== term)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));

    onSearch(term);
    setShowSuggestions(false);
  };

  // Aramayı kaydet
  const handleSaveSearch = (term) => {
    if (savedSearches.includes(term)) {
      // Zaten kayıtlıysa kaldır
      const newSaved = savedSearches.filter(s => s !== term);
      setSavedSearches(newSaved);
      localStorage.setItem('savedSearches', JSON.stringify(newSaved));
    } else {
      // Kaydet
      const newSaved = [...savedSearches, term];
      setSavedSearches(newSaved);
      localStorage.setItem('savedSearches', JSON.stringify(newSaved));
    }
  };

  // Arama geçmişini temizle
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // Geçmişten sil
  const removeFromHistory = (term) => {
    const newHistory = searchHistory.filter(h => h !== term);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  return (
    <div className="relative">
      {/* Arama Kutusu */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
          placeholder="İş pozisyonu, şirket veya kelime ara..."
          className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Öneriler Paneli */}
      {showSuggestions && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowSuggestions(false)}
          />
          
          {/* Öneriler */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-20 max-h-96 overflow-y-auto">
            {/* Kayıtlı Aramalar */}
            {savedSearches.length > 0 && (
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                  <Bookmark className="w-4 h-4 text-primary-600" />
                  Kayıtlı Aramalar
                </div>
                <div className="space-y-2">
                  {savedSearches.map((term, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer group"
                      onClick={() => handleSearch(term)}
                    >
                      <span className="text-gray-900">{term}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveSearch(term);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-gray-400 hover:text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Arama Geçmişi */}
            {searchHistory.length > 0 && (
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <History className="w-4 h-4 text-gray-600" />
                    Son Aramalar
                  </div>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-gray-500 hover:text-red-600"
                  >
                    Temizle
                  </button>
                </div>
                <div className="space-y-2">
                  {searchHistory.map((term, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer group"
                      onClick={() => handleSearch(term)}
                    >
                      <span className="text-gray-700">{term}</span>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveSearch(term);
                          }}
                          className={savedSearches.includes(term) ? 'text-primary-600' : 'text-gray-400 hover:text-primary-600'}
                        >
                          <Star className={`w-4 h-4 ${savedSearches.includes(term) ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromHistory(term);
                          }}
                        >
                          <X className="w-4 h-4 text-gray-400 hover:text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Popüler Aramalar */}
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <TrendingUp className="w-4 h-4 text-green-600" />
                Popüler Aramalar
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(term)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full text-sm transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Ara Butonu */}
      <div className="mt-4">
        <button
          onClick={() => handleSearch(searchTerm)}
          className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium"
        >
          Ara
        </button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
