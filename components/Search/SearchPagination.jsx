const SearchPagination = ({
  totalPages,
  paginationButtons,
  handlePageChange,
  currentPage
}) => {
  return (
    <>
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                Previous
              </button>
            )}

            {paginationButtons.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  page === currentPage
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}

            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                Next
              </button>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default SearchPagination;
