/**
 * Sayfalama Bileşeni
 * Sayfa numaralarıyla gezinme
 */
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  itemsPerPage = 20,
  totalItems = 0
}) => {
  // Sayfa numaralarını oluştur
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Maksimum görünür sayfa sayısı
    
    if (totalPages <= maxVisible) {
      // Tüm sayfaları göster
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Akıllı sayfalama
      if (currentPage <= 3) {
        // Başlangıç
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Son
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Ortada
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();
  
  // Gösterilen öğe aralığı
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) {
    return null; // Tek sayfa varsa gösterme
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      {/* Bilgi */}
      <div className="text-sm text-gray-600">
        <span className="font-medium">{startItem}</span>
        {' - '}
        <span className="font-medium">{endItem}</span>
        {' / '}
        <span className="font-medium">{totalItems}</span>
        {' sonuç gösteriliyor'}
      </div>

      {/* Sayfa Numaraları */}
      <div className="flex items-center gap-2">
        {/* Önceki */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Önceki sayfa"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Sayfa Numaraları */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-gray-500"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`
                  min-w-[40px] px-3 py-2 rounded-lg font-medium transition-colors
                  ${
                    currentPage === page
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }
                `}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Sonraki */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Sonraki sayfa"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Mobil: Sayfa Bilgisi */}
      <div className="sm:hidden text-sm text-gray-600">
        Sayfa {currentPage} / {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
