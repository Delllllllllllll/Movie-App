import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pages = [];
  const maxVisisblePages = 5;
  const sidePages = 1;

  const generatePages = () => {
    if (totalPages <= maxVisisblePages + 2 * sidePages) {
      // few pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // lost of pages
      // this will generate the pages between the current page
      const startPage = Math.max(currentPage - sidePages, 2);
      const endPage = Math.min(currentPage + sidePages, totalPages - 1);
      
      pages.push(1);

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pagesArr = generatePages();
  return (
    <div className="absolute bottom-5 left-0 right-0 mx-auto w-max">
      <div className="flex gap-2">
        <button
          className={`flex items-center px-3 py-1 gap-2 bg-[#322559] text-white rounded-md hover:bg-[#1a0d47] transition duration-300 shadow-lg ${currentPage === 1 ? 'bg-[#322559] opacity-50 cursor-not-allowed' : 'bg-[#322559] hover:bg-[#1a0d47]'}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="text-[12px] font-medium">Prev</span>
        </button>
        <div className="flex gap-2">
          {pagesArr.map((page, i) => (
            <button
              key={i}
              className={`min-w-[35px] px-3 py-1 text-white border border-[#432961] rounded-md hover:bg-[#1a0d47] transition duration-300 shadow-lg ${
                page === currentPage ? "bg-[#1a0d47]" : ""
              }`}
              onClick={typeof page === 'number' ? () => onPageChange(page) : undefined}
            >
              <span className="text-[12px] font-medium">{page}</span>
            </button>
          ))}
        </div>
        <button
          className={`flex items-center px-3 py-1 gap-2 bg-[#322559] text-white rounded-md hover:bg-[#1a0d47] transition duration-300 shadow-lg ${currentPage === totalPages ? 'bg-[#322559] opacity-50 cursor-not-allowed' : 'bg-[#322559] hover:bg-[#1a0d47]'}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="text-[12px] font-medium">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
