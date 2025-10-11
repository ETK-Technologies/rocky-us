import Section from "../utils/Section";
import RecommendCard from "./RecommendCard";

const Recommended = ({ products = [], isLoading = false }) => {
  // Create skeleton cards for loading state
  const renderSkeletonCards = () => {
    return Array.from({ length: 4 }, (_, index) => (
      <div
        key={index}
        className="bg-[#F6F6F5] rounded-2xl p-6 border-[0.5px] border-[#E2E2E1] w-[280px] h-[480px] flex-shrink-0 flex flex-col"
      >
        <div className="text-center">
          <div className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-full mx-auto mb-[16px] bg-gray-300 animate-pulse"></div>
        </div>
        <div className="h-6 bg-gray-300 animate-pulse rounded mb-4"></div>
        <div className="mb-[24px] flex-grow space-y-2">
          <div className="h-4 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-4 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-4 bg-gray-300 animate-pulse rounded"></div>
        </div>
        <div className="h-12 bg-gray-300 animate-pulse rounded-full"></div>
      </div>
    ));
  };

  return (
    <Section>
      <h1 className="text-center headers-font text-[24px] lg:text-[32px] tracking-[-2%] font-[550] leading-[115%] mb-[56px]">
        Complete Your Wellness Stack with These Trusted Picks
      </h1>
      <div className="flex gap-2 md:gap-6 justify-start md:justify-center items-center overflow-x-auto scrollbar-hide lg:gab-6 max-w-[1200px] mx-auto">
        {isLoading
          ? renderSkeletonCards()
          : products.map((product, index) => (
              <RecommendCard key={product.id || index} product={product} />
            ))}
      </div>
    </Section>
  );
};

export default Recommended;
