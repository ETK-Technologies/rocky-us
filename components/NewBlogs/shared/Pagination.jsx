"use client";

import ReactPaginate from "react-paginate";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) {
  if (totalPages <= 1) return null;

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1; // ReactPaginate uses 0-based indexing
    onPageChange(selectedPage);
  };

  return (
    <div className={className}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        pageCount={totalPages}
        pageRangeDisplayed={4}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1} // Convert to 0-based indexing for ReactPaginate
        activeClassName="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white"
        pageClassName="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-200"
        containerClassName="flex items-center justify-center space-x-2 my-4"
        nextClassName="hover:text-gray-700 rounded-full !ml-10"
        previousClassName="hover:text-gray-700 rounded-full mr-10"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
