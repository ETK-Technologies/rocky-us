import { CheckmarkIcon } from "@/components/PreLanders/ed-5";
import Link from "next/link";
import { FaCheckCircle, FaRegTimesCircle } from "react-icons/fa";

const ComparisonTable = ({to = '/ed-pre-consultation-quiz'}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-[60px] mt-10">
        {/* Left side with button */}
        <div className="w-full md:w-[58%] mb-8 md:mb-0 md:text-start text-center ">
          <div className="mb-8 ">
            <h2 className="text-[32px] lg:text-[48px] leading-[115%] headers-font font-[550] text-gray-900 mb-[4px] tracking-[-2%]">
              Go On Enjoy Your Best Nights.
              <span className="text-[32px] lg:text-[48px] leading-[115%] subheaders-font font-[550] text-[#9D9D9D] tracking-[-2%] mb-[20px]">
               {" "} No Planning.
              </span>
            </h2>
          </div>

          <div className="mb-[40px]">
            <p className="text-[16px] lg:text-[18px] text-black mx-auto">
              Clinically-proven treatments made with ingredients that provide
              <span className="block">
                long lasting support—so you're always ready when they are.
              </span>
            </p>
          </div>
          <Link
            href={to}
            className="py-3  px-6 rounded-full text-white bg-[#00B67A] hover:bg-[#00A06D] font-medium text-[14px] transition-colors w-full sm:w-auto"
          >
            Find my treatment
          </Link>
        </div>

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
                <>
                  <div
                    key={index}
                    className="min-w-[112px] flex justify-start items-center h-[52px] md:h-[80] border-b-[1px] border-b-[#0000001F]"
                  >
                    <span className="w-full text-[12px] text-left lg:text-[14px] font-[500] leading-[140%] font-[POPPINS]">
                      {item}
                    </span>
                  </div>
                </>
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
    </>
  );
};

export default ComparisonTable;
