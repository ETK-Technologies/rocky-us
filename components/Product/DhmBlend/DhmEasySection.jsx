import ImageWithList from "@/components/ImageWithList";
import ListWithNumbers from "@/components/ListWithNumbers";
import Link from "next/link";

const items = [
  '<div> <p className="text-[16px] md:text-[18px] font-[500]">Pack it</p> <p className="text-[14px] md:text-[16px] font-[400] leading-[19.6px] lg:leading-[22.4px]">Bring DHM Blend with you & take it during your evening, or before bed (not the next day).</p> </div>',
  '<div className=""> <p className="text-[16px] md:text-[18px] font-[500]">Wash it down</p> <p className="text-[14px] md:text-[16px] font-[400] leading-[19.6px] lg:leading-[22.4px]">Drink water, or for best results pair with Hydration Replenisher.</p> </div>',
  '<div> <p className="text-[16px] md:text-[18px] font-[500]">Rise & Shine</p> <p className="text-[14px] md:text-[16px] font-[400] leading-[19.6px] lg:leading-[22.4px]">Wake up ready to seize the day and get back to doing what you love.</p> </div>',
];

const DhmEasySection = () => {
  return (
    <div className="relative">
      <div className="absolute bottom-[-56px] md:bottom-[-90px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E2E2E1] to-transparent"></div>

      <ImageWithList
        image="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/New%20Product%20Page/DHMBlend60Pack.jpg"
        imagePosition="right"
      >
        {/* Heading */}
        <h1 className="text-[32px] lg:text-[48px] leading-[36.8px] md:leading-[53.52px] font-[550] mb-[24px] md:mb-[42px] tracking-[-0.01em] md:tracking-[-0.02em] headers-font">
          Easy as 1, 2, 3...
        </h1>

        {/* List */}
        <ListWithNumbers items={items} bgNumberGradient="bg-[#4224A4]" />
        <hr className=" border-b border-[#E2E2E1] mb-6" />
        {/* Button */}
        <div className="">
          <Link
            href="/product/dhm-blend"
            className="h-11 md:px-[24px] py-3 md:py-[11.5px] rounded-[64px] flex items-center space-x-2 transition justify-center w-full md:w-fit  bg-[#4224A4]  hover:bg-[#4224A4] text-white "
          >
            <span className="text-[14px] leading-[19.6px] md:leading-[21px] font-[500] md:font-[400]">
              Get Started
            </span>
            <svg
              className="mt-1"
              width="12"
              height="11"
              viewBox="0 0 12 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 0.5L6.285 1.1965L10.075 5H0V6H10.075L6.285 9.7865L7 10.5L12 5.5L7 0.5Z"
                fill="white"
              ></path>
            </svg>
          </Link>
        </div>
      </ImageWithList>
    </div>
  );
};

export default DhmEasySection;
