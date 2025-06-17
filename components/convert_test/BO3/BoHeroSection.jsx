import Link from "next/link";
import ListWithIcons from "../../ListWithIcons";
import Section from "../../utils/Section";
import Rating from "./Rating";
import { FaArrowRightLong, FaInfinity } from "react-icons/fa6";
import CustomImage from "../../utils/CustomImage";
import RockyFeatures from "../../RockyFeatures";
import ProudPartner from "../../ProudPartner";
import RockyFeaturesTC from "./RockyFeaturesTC";

const BoHeroSection = ({ items }) => {
  return (
    <>
      <Section bg="bg-[#F8F7F3] mb-5 relative section-one">
        <div className="flex flex-col sm:flex-row  gap-4 lg:gap-8">
          <div className="lg:pt-8  pt-1 sm:flex-1">
            <div className="flex items-center align-middle mb-[8px]">
              <span className="px-1">
                <Rating></Rating>
              </span>{" "}
              <p className="font-[POPPINS] flex font-medium text-[14px] leading-[140%]">
                TRUSTED BY 350K+ CANADIANS
              </p>
            </div>
            <h1 className="font-semibold  text-[32px] lg:text-[57px] tracking-[-2%] leading-[114.99999999999999%]">
              Real Weight Loss.
            </h1>
            <h1 className="font-semibold mb-[20px] lg:mb-[40px]  text-[32px] lg:text-[57px] tracking-[-2%] leading-[114.99999999999999%]">
              Backed By Science.
            </h1>
            <div className="mt-3">
              <div className="mb-[20px] lg:mb-[40px]">
                {items && <ListWithIcons items={items} />}
              </div>
              <div className="lg:w-2/3 ">
                <Link
                  className="hero-button h-11 mb-[8px] bg-black text-[white] md:px-[24px] py-3 md:py-[11.5px] rounded-[64px] flex items-center space-x-2 transition justify-center"
                  href="/wl-pre-consultation"
                >
                  <span className="text-[14px] leading-[19.6px] md:leading-[21px] font-[500] md:font-[400]">
                    Check Eligibility
                  </span>
                  <FaArrowRightLong />
                </Link>
                <p className="flex items-center justify-center mt-2 lg:mb-0 text-[14px] leading-[140%]">
                  <span className="px-1 text-[#D3876A]">
                    <FaInfinity />
                  </span>{" "}
                  Transform your body or your money back.
                </p>
                <br />
                <br />
                <div className="lg:flex items-center justify-center hidden">
                  <ProudPartner section bg="bg-[#F8F7F3]" />
                </div>
              </div>
            </div>
          </div>
          <div className="sm:flex-1 relative mt-[-8%]">
            <CustomImage
              src="/bo3/heroSec.png"
              width="175"
              height="175"
              className="absolute hidden lg:block lg:bottom-[60px] lg:left-[-75px]    z-10"
            ></CustomImage>

            <CustomImage
              src="/bo3/bo3HeroSection.jpg"
              className="lg:h-[720px] h-[272px]  rounded-2xl w-[552px] "
              width={552}
              height={1080}
              alt="bo3-hero-section"
            ></CustomImage>

            <CustomImage
              src="/bo3/heroSec.png"
              width="240"
              height="200"
              className="block lg:hidden mx-auto mt-[-25px]"
            ></CustomImage>
          </div>
        </div>

        <div className="absolute bottom-[-30px] w-[90%] lg:w-auto bg-white rounded-2xl">
          <RockyFeaturesTC />
        </div>
      </Section>
    </>
  );
};

export default BoHeroSection;
