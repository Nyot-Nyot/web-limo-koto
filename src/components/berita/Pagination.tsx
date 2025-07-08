interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-8 md:mt-12 px-4">
      {/* Mobile Pagination */}
      <div className="flex sm:hidden items-center gap-2">
        <button 
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ←
        </button>
        <span className="px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-sm">
          {currentPage}
        </span>
        <span className="px-2 text-white/60 text-sm">of</span>
        <span className="px-2 text-white/60 text-sm">{totalPages}</span>
        <button 
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          →
        </button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex items-center space-x-2 md:space-x-3">
        <button 
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg md:rounded-xl hover:bg-white/20 transition-all duration-300 text-white font-medium shadow-lg hover:shadow-xl text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        
        {getVisiblePages().map((page, index) => (
          page === '...' ? (
            <span key={index} className="px-1 md:px-2 text-white/60 text-sm md:text-base">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(page as number)}
              className={`px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold shadow-lg text-sm md:text-base transition-all duration-300 ${
                currentPage === page
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white'
              }`}
            >
              {page}
            </button>
          )
        ))}
        
        <button 
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg md:rounded-xl hover:bg-white/20 transition-all duration-300 text-white font-medium shadow-lg hover:shadow-xl text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
