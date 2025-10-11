import { IoSearch } from "react-icons/io5";
import CustomImage from "../utils/CustomImage";

const CoverSection = ({
  setSearchValue,
  searchValue,
  handleSearch,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <>
      <div className="faqs-cover-gradient relative">
        <div className="relative px-5 sectionWidth:px-0 pt-6 pb-14 md:pt-8 md:pb-[96px] max-w-[1184px] mx-auto h-[460px] md:h-[544px] flex flex-col md:justify-center">
          <div className="mb-10 md:mb-12">
            <h1 className="capitalize text-[40px] md:text-[60px] leading-[115%] tracking-[-0.02em] mb-2 md:mb-4 headers-font">
              How can we help?
            </h1>
            <p className="text-[16px] md:text-[20px] leading-[140%]">
              Everything you need to know, in one place.
            </p>
          </div>
          <div className="w-full md:w-[498px] h-[44px] overflow-hidden relative">
            <input
              type="search"
              placeholder="Search for Treatments or Topics"
              className="w-full h-full text-[14px] leading-[140%] pl-[58px] pr-5 border border-[#E2E2E1] rounded-[64px] focus:outline-none"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <IoSearch
              className="text-2xl absolute left-4 -translate-y-2/4 top-2/4 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
        </div>
        <div className="absolute overflow-hidden -translate-x-2/4 left-2/4 md:translate-x-0 md:left-auto !bottom-0 md:right-0 md:bottom-[120px] w-full md:w-[641.07px] !h-[335px] md:!h-[530px] z-0">
          <CustomImage
            className="object-[10px_102px] md:object-[70px_48px]"
            src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/faqs-cover.webp"
            fill
          />
        </div>
      </div>
    </>
  );
};

export default CoverSection;
