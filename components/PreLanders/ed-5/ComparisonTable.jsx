import { memo } from "react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

const ComparisonTable = memo(() => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-10">
      {/* Left side with button */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0 md:text-start text-center ">
        <div className="mb-8 ">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 ">
            Go On Enjoy Your Best Nights.
          </h2>
          <p className="text-2xl font-light text-gray-500">No Planning.</p>
        </div>

        <div className="mb-6">
          <p className="text-base text-gray-700 mx-auto">
            Clinically-proven treatments made with ingredients that provide long
            lasting support—so you're always ready when they are.
          </p>
        </div>
        <Link
          href="/ed-prequiz"
          className="py-3 px-6 rounded-full text-white bg-[#00B67A] hover:bg-[#00A06D] font-medium text-lg transition-colors w-full sm:w-auto"
        >
          Find my treatment
        </Link>
      </div>

      {/* Right side with comparison table */}
      <div className="w-full md:w-[42%] mb-8 md:mb-0 md:text-start text-center">
        <div className="flex">
          <div className="w-[40%]">
            <div className="w-full h-[52px] md:h-[80] border-b-[1px] border-b-[#0000001F]">
              {/* Empty Cell */}
            </div>

            {[
              "Token",
              "Sex ready anytime",
              "24/7 medical support",
              "100% online, no waiting or doctor visit needed",
              "Lowest price guarantee",
            ].map((item, index) => (
              <div
                key={index}
                className="min-w-[112px] flex justify-start items-center h-[52px] md:h-[80] border-b-[1px] border-b-[#0000001F]"
              >
                <span className="w-full text-[12px] text-left lg:text-[14px] font-[500] leading-[140%] font-[POPPINS]">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div className="w-[30%] bg-gradient-to-b from-[#EFE2D7] via-[#F7EBE4] to-[#AE7E56] rounded-[16px]">
            <div className="w-full flex justify-center items-center h-[52px] md:h-[80] border-b-[1px] border-b-[#0000001F]">
              <span className="text-[14px] lg:text-[18px]  font-[600] leading-[140%] font-[POPPINS]">
                Daily
              </span>
            </div>

            <div className="w-full flex justify-center items-center h-[52px] md:h-[80] border-b-[1px] border-b-[#0000001F]">
              <span className="text-[12px] lg:text-[14px] font-[500] leading-[140%] font-[POPPINS]">
                Once a day
              </span>
            </div>

            <div className="w-full flex justify-center items-center h-[52px] md:h-[80] border-b-[1px] border-b-[#0000001F]">
              <span className="text-[14px] font-[500] leading-[140%] font-[POPPINS]">
                <FaCheckCircle className="text-[19px] lg:text-[23px]"></FaCheckCircle>
              </span>
            </div>
            <div className="w-full flex justify-center items-center h-[52px] md:h-[80] border-b-[1px] border-b-[#0000001F]">
              <span className="text-[14px] font-[500] leading-[140%] font-[POPPINS]">
                <FaCheckCircle className="text-[19px] lg:text-[23px]"></FaCheckCircle>
              </span>
            </div>
            <div className="w-full flex justify-center items-center h-[52px] md:h-[80] border-b-[1px] border-b-[#0000001F]">
              <span className="text-[14px] font-[500] leading-[140%] font-[POPPINS]">
                <FaCheckCircle className="text-[19px] lg:text-[23px]"></FaCheckCircle>
              </span>
            </div>
            <div className="w-full flex justify-center items-center h-[52px] md:h-[80] border-b-[1px] border-b-[#0000001F]">
              <span className="text-[14px] font-[500] leading-[140%] font-[POPPINS]">
                <FaCheckCircle className="text-[19px] lg:text-[23px]"></FaCheckCircle>
              </span>
            </div>
          </div>

          <div className="w-[30%]">
            <div className="w-full flex justify-center items-center h-[52px] md:h-[80] border-b-[1px] border-b-[#0000001F]">
              <span className="text-[14px] lg:text-[18px] font-[600] leading-[140%] font-[POPPINS]">
                Before Sex
              </span>
            </div>

            <div className="w-full flex  justify-center items-center h-[52px] md:h-[80] border-b-[1px] border-b-[#0000001F]">
              <span className="text-[12px] lg:text-[14px] text-center font-[500] leading-[140%] font-[POPPINS]">
                15 min - 1 hour <span className="block">before sex</span>
              </span>
            </div>

            <div className="w-full flex justify-center items-center h-[52px] md:h-[80] border-b-[1px] border-b-[#0000001F]">
              <span className="text-[14px] font-[500] leading-[140%] font-[POPPINS]">
                <FaCheckCircle className="text-[19px] lg:text-[23px]"></FaCheckCircle>
              </span>
            </div>
            <div className="w-full flex justify-center items-center h-[52px] md:h-[80] border-b-[1px] border-b-[#0000001F]">
              <span className="text-[14px] font-[500] leading-[140%] font-[POPPINS]">
                <FaCheckCircle className="text-[19px] lg:text-[23px]"></FaCheckCircle>
              </span>
            </div>
            <div className="w-full flex justify-center items-center h-[52px] md:h-[80] border-b-[1px] border-b-[#0000001F]">
              <span className="text-[14px] font-[500] leading-[140%] font-[POPPINS]">
                <FaCheckCircle className="text-[19px] lg:text-[23px]"></FaCheckCircle>
              </span>
            </div>
            <div className="w-full flex justify-center items-center h-[52px] md:h-[80] border-b-[1px] border-b-[#0000001F]">
              <span className="text-[14px] font-[500] leading-[140%] font-[POPPINS]">
                <FaCheckCircle className="text-[19px] lg:text-[23px]"></FaCheckCircle>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
ComparisonTable.displayName = "ComparisonTable";

export default ComparisonTable;
