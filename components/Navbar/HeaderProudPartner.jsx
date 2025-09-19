import CustomImage from "../utils/CustomImage";
import CustomContainImage from "../utils/CustomContainImage";

const HeaderProudPartner = () => {
  return (
    <div className="bg-[#003876] text-white py-2 text-center flex justify-center items-center gap-3">
      <span className="font-[500] text-[12px] md:text-[18px] md:me-2">
        Proud partner
      </span>
      <div className="w-0 h-8 origin-top-left  outline outline-1 outline-offset-[-0.50px] outline-white/50"></div>

      <div className="flex items-center gap-2 md:mx-2">
        <div className="relative overflow-hidden w-[26px] h-[28px] md:w-[37px] md:h-[40px] md:mx-1">
          <CustomImage
            src="/proud-logo/TML-Primary-White-R.png"
            alt="TML Primary White R%201"
            fill
          />
        </div>
        <span className="hidden md:inline font-[500] text-[12px] md:text-[18px]">
          Toronto Maple Leafs
        </span>
      </div>

      <div className="w-0 h-8 origin-top-left  outline outline-1 outline-offset-[-0.50px] outline-white/50"></div>

      <div className="flex items-center gap-2 md:mx-2">
        <div className="relative  overflow-hidden w-[35px] h-[25px] md:w-[46px] md:h-[40px] md:mx-1">
          <CustomContainImage
            src="/proud-logo/TBJ.png"
            alt="Toronto Blue Jays"
            fill
          />
        </div>
        <span className="hidden md:inline font-[500] text-[12px] md:text-[18px]">
          Toronto Blue Jays
        </span>
      </div>

      {/* <div className="w-0 h-8 origin-top-left  outline outline-1 outline-offset-[-0.50px] outline-white/50"></div>

      <div className="flex items-center gap-2 md:mx-2">
        <div className="relative overflow-hidden w-[35px] h-[25px] md:w-[46px] md:h-[40px] md:mx-1">
          <CustomContainImage
            src="/proud-logo/partner-2.png"
            alt="Toronto Argonauts"
            fill
          />
        </div>
        <span className="hidden md:inline font-[500] text-[12px] md:text-[18px]">
          Toronto Argonauts
        </span>
      </div> */}
    </div>
  );
};

export default HeaderProudPartner;
