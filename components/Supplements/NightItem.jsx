import { FaCheckCircle } from "react-icons/fa";

const NightItem = ({ item, desc }) => {
  return (
    <>
      <div className="mb-[24px]">
        <div className="flex  gap-[8px] justify-start items-start">
          <div className="w-[20px]">
            <FaCheckCircle className="text-[#AE7E56] text-[18px] lg:text-[20px] w-[20px] h-[20px]"></FaCheckCircle>
          </div>
          <div>
            <span className="font-[550] subheaders-font text-[18px] lg:text-[20px] leading-[110%] letter-spacing-[-2%] mb-[8px]">
              {item}
            </span>
            <div>
              <p className="font-[POPPINS] font-normal text-[14px] lg:text-[16px] leading-[140%] text-[#000000CC]">
                {desc}
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-[#EBE9DF] border-[3px] mb-[24px]" />
    </>
  );
};

export default NightItem;
