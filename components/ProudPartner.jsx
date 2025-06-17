import CustomImage from "./utils/CustomImage";
import CustomContainImage from "./utils/CustomContainImage";

const ProudPartner = ({ section = false , bg="bg-white" }) => {
  return (
    <div
      className={`flex items-center justify-center ${bg} ${
        section
          ? "gap-3 h-[60px] md:justify-start"
          : "gap-3 md:gap-6 h-[71px] md:h-[88px]"
      }`}
    >
      <div className="text-center">
        <div
          className={`relative overflow-hidden mx-auto ${
            section
              ? "h-[28.64px] w-[78.41px]"
              : "h-[35px] w-[96px] md:h-[42px] md:w-[115px]"
          }`}
        >
          <CustomContainImage
            src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Rocky-TM_upscayl_2x.webp"
            alt="Rocky Logo"
            fill
          />
        </div>
        <p className={`leading-[140%] font-[600] text-[10px] md:text-[14px]`}>
          proud partner
        </p>
      </div>

      <div className="h-full w-px bg-gray-300" />

      <div className={`flex items-center gap-3 md:gap-6`}>
        <div
          className={`relative overflow-hidden w-[50px] h-[60px] md:w-[60px] md:h-[70px]`}
        >
          <CustomContainImage
            src="https://myrocky.b-cdn.net/partner-1.png"
            alt="Toronto Maple Leafs Logo"
            fill
          />
        </div>
        <div
          className={`relative overflow-hidden w-[60px] h-[60px] md:w-[70px] md:h-[70px]`}
        >
          <CustomContainImage
            src="/proud-logo/TBJ.png"
            alt="Toronto Blue Jays"
            fill
          />
        </div>
        <div
          className={`relative overflow-hidden w-[50px] h-[60px] md:w-[60px] md:h-[70px]`}
        >
          <CustomContainImage
            src="https://myrocky.b-cdn.net/partner-2.png"
            alt="boat"
            fill
          />
        </div>
      </div>
    </div>
  );
};
// 64 57

export default ProudPartner;
