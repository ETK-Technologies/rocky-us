import Image from "next/image";
import WLProgramItem from "../../WL/WLProgramItem";
import Section from "../../utils/Section";
import CustomImage from "../../utils/CustomImage";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const WLWork = ({
  ProgramWorksData = [],
  imgPath = "/bo3/sec3Image.png",
  imgClass = "",
  title = "",
  description = "",
  showBtn = false,
  bg="bg-[#F8F7F3]",
}) => {
  return (
    <>
      <Section bg={bg}>
        <div className="text-center">
          <div className="flex lg:mt-20  flex-col sm:flex-row">
            {/* Large Screen View */}
            <div className="lg:w-1/2 hidden lg:block w-full">
              {/* Image  */}
              <div className="flex content-start items-center w-full overflow-hidden sm:flex-row">
                <div className="w-full">
                  <CustomImage
                    height="550"
                    width="550"
                    src={imgPath}
                    alt="mobile image"
                    className={imgClass}
                  />
                </div>
              </div>
            </div>

            
            <div className="lg:w-1/2 pt-24 w-full hidden lg:block text-left">
              <h1 className="text-[24px] lg:text-[40px] font-medium leading-none mb-[16px]">
                {title}
              </h1>
              <p className="text-[16px] lg:text-[18px] mb-[40px]">
                {description}
              </p>
              {ProgramWorksData.map((item, index) => (
                <WLProgramItem
                  className="lg:w-full"
                  Item={item}
                  key={item.id}
                />
              ))}

              {showBtn && (
                <Link
                  href="/wl-pre-consultation"
                  className="h-11 bg-black w-90 mt-10 text-[white] md:px-[24px] py-3 md:py-[11.5px] rounded-[64px] flex items-center space-x-2 transition justify-center"
                >
                  <span className="text-[14px] leading-[19.6px] md:leading-[21px] font-[500] md:font-[400]">
                    Check Eligibility
                  </span>
                  <FaArrowRightLong />
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="lg:hidden">
          <h1 className="text-[28px] lg:text-[40px] font-medium leading-[114.99999999999999%] tracking-[-2px] mb-[12px]">
            {title}
          </h1>
          <p className="text-[16px] font-[POPPINS] leading-[114.99999999999999%] tracking-[0px] font-normal  lg:text-[18px] mb-[32px] lg:mb-[40px]">{description}</p>
          <CustomImage
            height="550"
            width="550"
            src={imgPath}
            alt="mobile image"
            className={imgClass + ` mb-[32px]`}
          />

            {ProgramWorksData.map((item, index) => (
                <WLProgramItem
                  className="lg:w-full"
                  Item={item}
                  key={item.id}
                />
              ))}

              {showBtn && (
                <Link
                  href="/wl-pre-consultation"
                  className="h-11 bg-black w-90 mt-10 text-[white] md:px-[24px] py-3 md:py-[11.5px] rounded-[64px] flex items-center space-x-2 transition justify-center"
                >
                  <span className="text-[14px] leading-[19.6px] md:leading-[21px] font-[500] md:font-[400]">
                    Check Eligibility
                  </span>
                  <FaArrowRightLong />
                </Link>
              )}
        </div>
      </Section>
    </>
  );
};

export default WLWork;
