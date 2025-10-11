"use client";
import { IoSearch } from "react-icons/io5";
import HelpCenterCard from "@/components/HelpCenter/HelpCenterCard";
import CoverSection from "@/components/utils/CoverSection";
import { useSearch } from "@/components/utils/UseSearch";

const helpCenterCards = [
  {
    title: "The Basics",
    imageUrl: "https://myrocky.b-cdn.net/WP%20Images/help-center/1.webp",
    linkUrl: "",
  },
  {
    title: "My Account",
    imageUrl: "https://myrocky.b-cdn.net/WP%20Images/help-center/2.webp",
    linkUrl: "",
  },
  {
    title: "Medical Care",
    imageUrl: "https://myrocky.b-cdn.net/WP%20Images/help-center/3.webp",
    linkUrl: "",
  },
  {
    title: "Shipping",
    imageUrl: "https://myrocky.b-cdn.net/WP%20Images/help-center/4.webp",
    linkUrl: "",
  },
  {
    title: "Privacy & Security",
    imageUrl: "https://myrocky.b-cdn.net/WP%20Images/help-center/5.webp",
    linkUrl: "",
  },
  {
    title: "Troubleshooting",
    imageUrl: "https://myrocky.b-cdn.net/WP%20Images/help-center/6.webp",
    linkUrl: "",
  },
];

const HelpCenterContent = () => {
  const { searchValue, setSearchValue, handleSearch } = useSearch();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <CoverSection>
      <div className="text-center ">
        <h1 className="text-[40px] md:text-[60px] leading-[115%] headers-font mb-4">
          Help Center
        </h1>
        <p className="text-[18px] md:text-[20px] leading-[140%] mb-4 md:mb-12">
          Everything you need to know, all in one place.
        </p>
        <div className="w-full md:max-w-[784px] mx-auto h-[74px]  flex justify-center items-center mb-10 md:mb-[72px] ">
          <div className="relative w-full border-b border-black">
          
            <input
              type="search"
              placeholder="How can we help you?"
              className="w-full h-full py-[25px] pr-10 text-[16px] outline-none focus:none"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <IoSearch
              className="cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl"
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-[11px] md:gap-[18px]">
        {helpCenterCards.map((card, index) => (
          <div key={index}>
            <HelpCenterCard {...card} />
          </div>
        ))}
      </div>
    </CoverSection>
  );
};
export default HelpCenterContent; 