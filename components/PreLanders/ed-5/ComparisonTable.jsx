import { memo } from "react";
import CheckmarkIcon from "./CheckmarkIcon";
import Link from "next/link";

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
      <div className="w-full md:w-1/2 overflow-x-auto md:overflow-visible">
        <div className="w-full md:min-w-[500px]">
          <div className="grid grid-cols-3 gap-0 rounded-lg overflow-hidden text-sm md:text-base">
            {/* Header row */}
            <div className="p-2 md:p-4 border-b border-gray-200"></div>
            <div className="p-2 md:p-4 border-b border-gray-200 text-center font-medium bg-gradient-to-b from-[#f5efe6] to-[#e6d0b3]">
              Daily
            </div>
            <div className="p-2 md:p-4 border-b border-gray-200 text-center font-medium">
              Before Sex
            </div>

            {/* Taken row */}
            <div className="p-2 md:p-4 border-b border-gray-200 font-medium">
              Taken
            </div>
            <div className="p-2 md:p-4 border-b border-gray-200 text-center bg-gradient-to-b from-[#f5efe6] to-[#e6d0b3]">
              Once a day
            </div>
            <div className="p-2 md:p-4 border-b border-gray-200 text-center">
              15 min - 1 hour
              <br />
              before sex
            </div>

            {/* Sex ready anytime row */}
            <div className="p-2 md:p-4 border-b border-gray-200 font-medium">
              Sex ready anytime
            </div>
            <div className="p-2 md:p-4 border-b border-gray-200 flex justify-center items-center bg-gradient-to-b from-[#f5efe6] to-[#e6d0b3]">
              <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-black flex items-center justify-center">
                <CheckmarkIcon />
              </div>
            </div>
            <div className="p-2 md:p-4 border-b border-gray-200 flex justify-center items-center">
              <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-black flex items-center justify-center">
                <CheckmarkIcon />
              </div>
            </div>

            {/* 24/7 medical support row */}
            <div className="p-2 md:p-4 border-b border-gray-200 font-medium">
              24/7 medical support
            </div>
            <div className="p-2 md:p-4 border-b border-gray-200 flex justify-center items-center bg-gradient-to-b from-[#f5efe6] to-[#e6d0b3]">
              <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-black flex items-center justify-center">
                <CheckmarkIcon />
              </div>
            </div>
            <div className="p-2 md:p-4 border-b border-gray-200 flex justify-center items-center">
              <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-black flex items-center justify-center">
                <CheckmarkIcon />
              </div>
            </div>

            {/* 100% online row */}
            <div className="p-2 md:p-4 border-b border-gray-200 font-medium">
              100% online, no waiting or
              <br />
              doctor visit needed
            </div>
            <div className="p-2 md:p-4 border-b border-gray-200 flex justify-center items-center bg-gradient-to-b from-[#f5efe6] to-[#e6d0b3]">
              <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-black flex items-center justify-center">
                <CheckmarkIcon />
              </div>
            </div>
            <div className="p-2 md:p-4 border-b border-gray-200 flex justify-center items-center">
              <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-black flex items-center justify-center">
                <CheckmarkIcon />
              </div>
            </div>

            {/* Lowest price guarantee row */}
            <div className="p-2 md:p-4 border-b border-gray-200 font-medium">
              Lowest price guarantee
            </div>
            <div className="p-2 md:p-4 border-b border-gray-200 flex justify-center items-center bg-gradient-to-b from-[#f5efe6] to-[#e6d0b3]">
              <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-black flex items-center justify-center">
                <CheckmarkIcon />
              </div>
            </div>
            <div className="p-2 md:p-4 border-b border-gray-200 flex justify-center items-center">
              <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-black flex items-center justify-center">
                <CheckmarkIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
ComparisonTable.displayName = "ComparisonTable";

export default ComparisonTable;
