/**
 * İş Arama Bileşeni
 * İş ilanlarında arama yapma
 */
import { useState } from 'react';
import { Search } from 'lucide-react';

const JobSearch = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="İş pozisyonu veya şirket ara..."
          className="block w-full pl-10 pr-24 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-2">
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
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
      </div>
    </form>
  );
};

export default JobSearch;
