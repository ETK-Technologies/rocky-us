import Image from "next/image";
import Link from "next/link";

const StatisticsSection = ({ to = "" }) => {
  return (
    <>
      <div className="max-w-[1184px] mx-auto lg:p-0 p-5">
        <div className="my-20">
          <div className="relative rounded-[16px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 ">
              <Image
                src="https://mycdn.myrocky.ca/wp-content/uploads/20250408140715/bg-individual.jpg"
                alt="Water droplets on skin"
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Content */}
            <div className="relative z-10  flex flex-col items-start">
              <div className="text-white  lg:py-[64px] lg:px-[64px] py-[32px] px-[32px]">
                <h2 className="text-[108px] md:text-[140px] leading-[80%] header-font font-[550] mb-4">
                  87
                  <span className="text-[32px] leading-[115%] subheader-font font-[550] align-top">
                    %
                  </span>
                </h2>
                <p className="text-[16px] leading-[140%] md:text-xl max-w-md mb-[164px] lg:mb-[250px]">
                  of users feel more confident knowing they can perform every
                  time after starting with Rocky.
                </p>

                <Link
                  href={to}
                  className="mt-8 flex justify-center items-center h-[52px] lg:w-[209px] w-full  text-center   rounded-full text-white bg-[#00B67A] hover:bg-[#00A06D] font-medium text-lg transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          <p className="text-xs mt-[8px] text-[#000000A6]">
            *Individual results may vary. Based on survey responses of 74 Rocky
            treatments users.
          </p>
        </div>
      </div>
    </>
  );
};

export default StatisticsSection;
