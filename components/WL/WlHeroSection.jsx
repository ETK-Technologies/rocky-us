import Link from "next/link";
import LogoContainer from "../PreLanders/LogoContainer";
import Popup from "./Popup";
import Image from "next/image";
import CustomImage from "../utils/CustomImage";

const WlHeroSection = ({ h1, h2, p, href, btnText }) => {
  return (
    <section className="relative bg-white min-h-screen flex flex-col">
      <LogoContainer quizHref={href} />
      <div className="flex-1 mt-24 flex flex-col sm:flex-row items-center max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 w-full py-16 md:py-0">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] leading-[1.1] font-semibold text-black">
            {h1}
          </h1>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] leading-[1.1] font-semibold text-[#00A76F] mb-4">
            {h2}
          </h2>
          <p className="text-base md:text-lg text-[#000000D9] mb-6 max-w-[90%]">
            {p}
          </p>
          {href && (
            <Link
              href={href}
              className="inline-flex items-center justify-center bg-[#00A76F] hover:bg-[#008f5e] text-white font-medium py-3 px-6 rounded-full transition-colors duration-200"
            >
              {btnText} {btnText && !btnText.includes("→") && "→"}
            </Link>
          )}
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
          <div className="relative w-[90%] md:w-[80%]">
            <CustomImage
              src="https://myrocky.b-cdn.net/assets/new-design/pre%20wl/pre-wl-cover.webp"
              alt="Weight Loss"
              className="w-full rounded-2xl shadow-lg"
              width="150"
              height="150"
              quality="100"
            />
            <div className="absolute bottom-5 left-5 md:left-10">
              <Popup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WlHeroSection;
