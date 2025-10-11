import FaqItem from "../FaqItem";

const FAQSContainer = ({ isSearching, debouncedValue, searchValue, displayedFaqs }) => {
  const SearchSkeleton = () => (
    <div className="animate-pulse">
      {[1, 2, 3].map((item) => (
        <div key={item} className="border-b border-gray-300 py-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="gap-6">
        {isSearching && !debouncedValue && searchValue.trim().length >= 3 ? (
          <SearchSkeleton />
        ) : (
          displayedFaqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
              isHighlighted={
                !!debouncedValue && debouncedValue.trim().length >= 3
              }
            />
          ))
        )}
      </div>
    </>
  );
};

export default FAQSContainer;
