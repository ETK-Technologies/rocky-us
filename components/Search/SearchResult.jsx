"use client";
import {
  getContentType,
  getImageUrl,
  getTitle,
  getUrl,
} from "@/app/search/searchHelpers";
import Link from "next/link";
import SearchPagination from "./SearchPagination";
import { useCallback, useEffect, useMemo, useState } from "react";

const SearchResult = ({ query, results }) => {
  const resultsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const { totalPages, currentResults } = useMemo(() => {
    const totalPages = Math.ceil(results.length / resultsPerPage);
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
    return { totalPages, currentResults };
  }, [results, currentPage, resultsPerPage]);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  }, []);

  const paginationButtons = useMemo(() => {
    if (totalPages <= 1) return [];

    return Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
      if (currentPage <= 3) {
        return i + 1;
      } else if (currentPage >= totalPages - 2) {
        return totalPages - 4 + i;
      } else {
        return currentPage - 2 + i;
      }
    });
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  return (
    <>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-8">
          Search Results for "{query}"
        </h1>

        {currentResults.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600">No results found for "{query}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentResults.map((result, index) => (
              <Link
                key={index}
                href={getUrl(result)}
                className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {getTitle(result)}
                  </h2>
                  <p className="text-gray-600 mb-4">{getContentType(result)}</p>
                  {getImageUrl(result) && (
                    <img
                      src={getImageUrl(result)}
                      alt={getTitle(result)}
                      className="w-full h-48 object-cover rounded"
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <SearchPagination
          handlePageChange={handlePageChange}
          paginationButtons={paginationButtons}
          totalPages={totalPages}
          currentPage={currentPage}
        />
        {/* {totalPages > 1 && (
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
        )} */}
      </div>
    </>
  );
};

export default SearchResult;
