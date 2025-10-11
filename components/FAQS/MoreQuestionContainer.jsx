import MoreQuestions from "../MoreQuestions";

const MoreQuestionContainer = ({ debouncedValue, displayedFaqs }) => {
  return (
    <>
      {/* Show this only when there are no search results */}
      {debouncedValue && displayedFaqs.length === 0 && (
        <div className="mt-8">
          <p className="text-center text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <MoreQuestions link="/contact-us" buttonText="Contact Us" />
        </div>
      )}

      {/* Show this only when not searching or when there are search results */}
      {(!debouncedValue || displayedFaqs.length > 0) && (
        <MoreQuestions link="/contact-us" buttonText="Contact Us" />
      )}
    </>
  );
};

export default MoreQuestionContainer;
