"use client";
import { FaCheckCircle, FaRegTimesCircle, FaTimesCircle } from "react-icons/fa";
import CustomImage from "../utils/CustomImage";

const ComparingTable = ({
  title,
  sec_title,
  third_title,
  desc = null,
  img,
  f_col = [],
  sec_col = [],
  third_col = [],
  fourth_col = [],
  section_bg = "bg-white",
  unique_col_bg = "",
}) => {
  // Define the gradient style
  const gradientStyle = {
    background:
      "linear-gradient(348.23deg, #AE7E56 -6.68%, #F7EBE4 51.89%, #EFE2D7 88.25%)",
  };

  return (
    <>
      <div className={`w-full max-w-6xl mx-auto lg:px-4 ${section_bg}`}>
        {/* Title Section */}
        <div className="py-7 flex lg:hidden  flex-col justify-center items-start gap-2">
          <div className="flex flex-col justify-start items-start gap-4">
            <div className="w-full text-center md:text-left">
              <span className="text-black font-semibold text-3xl md:text-4xl">
                {title}
              </span>
            </div>
            {desc && (
              <div className="w-full text-center md:text-left text-black text-lg font-normal leading-relaxed">
                {desc}
              </div>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="flex flex-row overflow-x-auto lg:overflow-x-hidden scrollbar-hide">
          {/* Features Column */}

          <div className={fourth_col.length >= 1 ? `w-1/3 lg:w-2/5` : `w-1/3 lg:w-[450px]`}>
            <div className="lg:h-48 h-24 border-b border-black flex items-center">
              {/* Empty space to align with other columns */}

              <div className="lg:flex hidden flex-col  justify-start items-start gap-4">
                <div className="w-full text-center md:text-left pr-36">
                  <span className="text-black  font-[550] headers-font text-[48px] leading-[115%] tracking-[-2%]">
                    {title}
                  </span>
                </div>
                {desc && (
                  <div className="w-full text-center md:text-left text-black text-lg font-normal leading-relaxed">
                    {desc}
                  </div>
                )}
              </div>
            </div>
            {f_col.map((item, index) => (
              <div
                key={index}
                className="lg:h-20 h-[110px]  border-b border-black flex items-center lg:px-4"
              >
                <div className="text-black text-base text-[14px] lg:text-[16px] leading-[120%]  font-semibold">
                  {item}
                </div>
              </div>
            ))}
            <div className="lg:h-20 h-[110px] "></div>
          </div>

          {/* Product Column */}
          <div
            className={
              fourth_col.length >= 1
                ? `w-1/3 lg:w-1/5  min-w-[125px]  rounded-lg md:rounded-3xl`
                : `w-1/4  min-w-[125px]  rounded-lg md:rounded-3xl`
            }
            style={gradientStyle}
          >
            <div className="lg:h-48 h-24 border-b border-black/95 flex justify-center items-center">
              <CustomImage
                src={img}
                width={100}
                height={100}
                className="w-100 h-100 lg:w-[148px] lg:h-[148px]  object-contain"
              />
            </div>
            {sec_col.map((item, index) => (
              <div
                key={index}
                className="lg:h-20 flex-1 h-[110px] lg:px-4 px-1 border-b border-black/95 flex justify-center items-center"
              >
                <div className="flex flex-col w-full lg:w-auto lg:flex-row items-center justify-center  lg:gap-3 gap-1 lg:px-6">
                  {item ? (
                    <FaCheckCircle className="text-black text-xl md:text-2xl" />
                  ) : (
                    <FaRegTimesCircle className="text-black text-xl md:text-2xl" />
                  )}
                </div>
              </div>
            ))}

            <div className="lg:h-20 h-[110px] "></div>
          </div>

          {/* Second Column */}
          <div
            className={
              fourth_col.length >= 1
                ? `w-1/3 lg:w-1/5  min-w-[125px]  rounded-lg md:rounded-3xl  `
                : `w-1/3  min-w-[125px]  rounded-lg md:rounded-3xl  `
            }
          >
            <div className="lg:h-48 h-24 border-b border-black flex justify-center items-center">
              <div className={`text-black text-center text-[14px] lg:text-[18px] font-[POPPINS] font-medium leading-[120%] ${sec_title.length >=  20 ? `p-24` : `p-36` }`}>
                {sec_title} 
              </div>
            </div>
            {third_col.map((item, index) => (
              <div
                key={index}
                className="lg:h-20 flex-1 h-[110px] lg:px-4 px-1 border-b border-black/95 flex justify-center items-center"
              >
                <div className="flex flex-col w-full lg:w-auto lg:flex-row items-center justify-center  lg:gap-3 gap-1 lg:px-6">
                  {item ? (
                    <FaCheckCircle className="text-black text-xl md:text-2xl" />
                  ) : (
                    <FaRegTimesCircle className="text-black text-xl md:text-2xl" />
                  )}
                </div>
              </div>
            ))}

            <div className="lg:h-20 h-[110px] "></div>
          </div>

          {fourth_col.length >= 1 && (
            <>
              {/* third Column */}
              <div className="w-1/3 lg:w-1/4 min-w-[125px] ">
                <div className="lg:h-48 h-24 border-b border-black flex justify-center items-center">
                  <div className={`text-black text-center text-[14px] lg:text-[18px] font-[POPPINS] font-medium leading-[120%] ${third_title.length >=  20 ? `p-24` : `p-36` }`}>
                    {third_title}
                  </div>
                </div>
                {fourth_col.map((item, index) => (
                  <div
                    key={index}
                    className="lg:h-20 flex-1 h-[110px] lg:px-4 px-1 border-b border-black/95 flex justify-center items-center"
                  >
                    <div className="flex flex-col w-full lg:w-auto lg:flex-row items-center justify-center  lg:gap-3 gap-1 lg:px-6">
                      {item ? (
                        <FaCheckCircle className="text-black text-xl md:text-2xl" />
                      ) : (
                        <FaRegTimesCircle className="text-black text-xl md:text-2xl" />
                      )}
                    </div>
                  </div>
                ))}
                <div className="lg:h-20 h-[110px] "></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ComparingTable;
