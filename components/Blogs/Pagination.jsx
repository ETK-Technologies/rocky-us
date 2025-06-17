import ReactPaginate from "react-paginate";

const Pagination = ({ Pages, currentPage, goToPage }) => {
  return (
    <>
      
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        activeClassName="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white"
        pageClassName="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-200"
        containerClassName="flex items-center justify-center space-x-2 my-4"
        nextClassName="hover:text-gray-700 rounded-full !ml-10"
        previousClassName="hover:text-gray-700 rounded-full mr-10"
        pageRangeDisplayed={4}
        pageCount={Pages.length}
        onPageChange={goToPage}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
