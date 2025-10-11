const SearchResult = ({searchValue, isSearching, debouncedValue, displayedFaqs}) => {
  return (
    <>
      {searchValue.trim().length >= 3 && (
        <div className="mb-6">
          {isSearching && !debouncedValue ? (
            <p className="text-gray-600">Searching...</p>
          ) : debouncedValue ? (
            <p className="text-gray-600">
              {displayedFaqs.length === 0
                ? `No results found for "${debouncedValue}"`
                : `Found ${displayedFaqs.length} result${
                    displayedFaqs.length === 1 ? "" : "s"
                  } for "${debouncedValue}"`}
            </p>
          ) : null}
        </div>
      )}
    </>
  );
};

export default SearchResult;
