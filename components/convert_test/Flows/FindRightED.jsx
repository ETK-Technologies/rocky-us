import CustomImage from "@/components/utils/CustomImage";
import Section from "@/components/utils/Section";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa6";

const FindRightED = () => {
  return (
    <>
      <Section bg="!px-0">
        <div className="bg-[#F6F5F1] py-[56px] px-[20px] md:py-[96px] md:px-[128px]">
          <div className="text-center">
            <h1 className="headers-font font-[550] leading-[115%] md:text-[48px] text-[32px] tracking-tight mb-[16px]">
              Find the Right ED Treatment for You
            </h1>
            <p className="font-[400] text-[16px] md:text-[18px] leading-[140%] font-regular md:mb-[56px] mb-[32px]">
              Compare effectiveness, speed, side effects, and more to{" "}
              <span className="block">
                {" "}
                choose the best option with confidence.{" "}
              </span>
            </p>
          </div>
          {/* Comparing Large Screen Table */}
          <div className="">
            {/* Mobile-only centered title row */}
           
            <div className="flex justify-start relative items-center">
              <div className="w-[25%] hidden md:block">
                {/* header of column */}
                <div className="flex justify-start items-center mb-[16px] border-b border-[#CCCCCC] h-[140px]">
                  <p className="text-[22px] leading-[140%] font-[600] ">
                    Feature
                  </p>
                </div>
                {[
                  "Onset Time",
                  "How Long It Works",
                  "Use Frequency",
                  "Can Take with Food",
                  "Prescription Needed",
                ].map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-start items-center  border-b border-[#CCCCCC] h-[70px]"
                    >
                      <p className="text-[16px] leading-[140%] font-[600]">
                        {item}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="md:w-[25%] w-[33.333%] text-center">
                <div className="flex justify-start items-center flex-col mb-[16px] border-b border-[#CCCCCC] md:h-[140px] h-[120px]">
                  <CustomImage
                    src="/pre_ed/pill-4.png"
                    width="50"
                    height="50"
                    className="object-cover rounded-2xl w-[30px] h-[30px] mb-[10px] md:w-[45px] md:h-[45px]"
                  />
                  <p className="md:text-[16px] text-[15px] font-[600] leading-[140%]">
                    Cialis
                  </p>
                  <p className="md:text-[16px] text-[15px] font-[500] leading-[140%]">
                    (Tadalafil)
                  </p>
                </div>

                <div className="absolute left-0 right-0 md:hidden">
                    <p className="font-[600] text-[16px] leading-[140%]">
                        Onset Time
                    </p>
                </div>

                <div className="flex justify-center items-center  border-b border-[#CCCCCC] md:h-[70px] h-[120px]">
                  <p className="md:text-[16px] text-[14px] leading-[140%] font-[400]">
                    30-60 minutes
                  </p>
                </div>


                <div className="absolute mt-[10px] mb-[10px] left-0 right-0 md:hidden">
                    <p className="font-[600] text-[16px] leading-[140%]">
                        How Long It Works
                    </p>
                </div>

                <div className="flex justify-center items-center  border-b border-[#CCCCCC] md:h-[70px] h-[120px]">
                  <p className="md:text-[16px] text-[14px] leading-[140%] font-[400]">
                    Up to 36 hours
                  </p>
                </div>

                 <div className="absolute mt-[10px] mb-[10px] left-0 right-0 md:hidden">
                    <p className="font-[600] text-[16px] leading-[140%]">
                        Use Frequency
                    </p>
                </div>

                <div className="flex justify-center items-center  border-b border-[#CCCCCC] md:h-[70px] h-[120px]">
                  <p className="md:text-[16px] text-[14px] leading-[140%] font-[400]">
                    As needed
                  </p>
                </div>

                <div className="absolute mt-[10px] mb-[10px] left-0 right-0 md:hidden">
                    <p className="font-[600] text-[16px] leading-[140%]">
                        Can Take with Food
                    </p>
                </div>

                <div className="flex justify-center items-center  border-b border-[#CCCCCC] md:h-[70px] h-[120px]">
                  <p className="md:text-[16px] text-[14px] leading-[140%] font-[400]">
                    <FaCheckCircle className="text-[#AE7E56] text-[22px]" />
                  </p>
                </div>

                <div className="absolute mt-[10px] mb-[10px] left-0 right-0 md:hidden">
                    <p className="font-[600] text-[16px] leading-[140%]">
                       Prescription Needed
                    </p>
                </div>

                <div className="flex justify-center items-center  border-b border-[#CCCCCC] md:h-[70px] h-[120px]">
                  <p className="md:text-[16px] text-[14px] leading-[140%] font-[400]">
                    <FaCheckCircle className="text-[#AE7E56] text-[22px]" />
                  </p>
                </div>
              </div>
              <div className="md:w-[25%] w-[33.333%] text-center">
                <div className="flex justify-start items-center flex-col mb-[16px] border-b border-[#CCCCCC] md:h-[140px] h-[120px]">
                  <CustomImage
                    src="/pre_ed/pill-2.png"
                    width="50"
                    height="50"
                    className="object-cover rounded-2xl mb-[10px] w-[30px] h-[30px]  md:w-[45px] md:h-[45px]"
                  />
                  <p className="md:text-[16px] text-[15px] font-[600] leading-[140%] ">
                    Viagra
                  </p>
                  <p className="md:text-[16px] text-[15px] font-[500] leading-[140%]">
                    (Sildenafil)
                  </p>
                </div>

                <div className="flex justify-center items-center  border-b border-[#CCCCCC] md:h-[70px] h-[120px]">
                  <p className="md:text-[16px] text-[14px] leading-[140%] font-[400]">
                    30-60 minutes
                  </p>
                </div>

                <div className="flex justify-center items-center  border-b border-[#CCCCCC] md:h-[70px] h-[120px]">
                  <p className="md:text-[16px] text-[14px] leading-[140%] font-[400]">
                    4-6 hours
                  </p>
                </div>

                <div className="flex justify-center items-center  border-b border-[#CCCCCC] md:h-[70px] h-[120px]">
                  <p className="md:text-[16px] text-[14px] leading-[140%] font-[400]">
                    As needed
                  </p>
                </div>
                <div className="flex justify-center items-center  border-b border-[#CCCCCC] md:h-[70px] h-[120px]">
                  <p className="md:text-[16px] text-[14px] leading-[140%] font-[400]">
                    <FaRegCircle className="text-[#AE7E56] text-[22px]" />
                  </p>
                </div>

                <div className="flex justify-center items-center  border-b border-[#CCCCCC] md:h-[70px] h-[120px]">
                  <p className="md:text-[16px] text-[14px] leading-[140%] font-[400]">
                    <FaCheckCircle className="text-[#AE7E56] text-[22px]" />
                  </p>
                </div>
              </div>
              <div className="md:w-[25%] w-[33.333%] text-center">
                <div className="flex justify-start items-center flex-col mb-[16px] border-b border-[#CCCCCC] md:h-[140px] h-[120px]">
                  <CustomImage
                    src="/pre_ed/pill-1.png"
                    width="50"
                    height="50"
                    className="object-cover rounded-2xl mb-[10px] w-[30px] h-[30px]  md:w-[45px] md:h-[45px] "
                  />
                  <p className="md:text-[16px] text-[15px] font-[600] leading-[140%]">
                    Sublingual Rocky
                  </p>
                  <p className="md:text-[16px] text-[15px] font-[500] leading-[140%]">
                    (Tadalafil)
                  </p>
                </div>

                <div className="flex justify-center items-center  border-b border-[#CCCCCC] md:h-[70px] h-[120px]">
                  <p className="md:text-[16px] text-[14px] leading-[140%] font-[400]">
                    30-60 minutes
                  </p>
                </div>
                <div className="flex justify-center items-center  border-b border-[#CCCCCC] md:h-[70px] h-[120px]">
                  <p className="md:text-[16px] text-[14px] leading-[140%] font-[400]">
                    Up to 36 hours
                  </p>
                </div>
                <div className="flex justify-center items-center  border-b border-[#CCCCCC] md:h-[70px] h-[120px]">
                  <p className="md:text-[16px] text-[14px] leading-[140%] font-[400]">
                    As needed
                  </p>
                </div>

                <div className="flex justify-center items-center  border-b border-[#CCCCCC] md:h-[70px] h-[120px]">
                  <p className="md:text-[16px] text-[14px] leading-[140%] font-[400]">
                    <FaCheckCircle className="text-[#AE7E56] text-[22px]" />
                  </p>
                </div>

                <div className="flex justify-center items-center  border-b border-[#CCCCCC] md:h-[70px] h-[120px]">
                  <p className="md:text-[16px] text-[14px] leading-[140%] font-[400]">
                    <FaCheckCircle className="text-[#AE7E56] text-[22px]" />
                  </p>
                </div>
              </div>
            </div>
          </div>



          {/* Comparing Mobile Screen Table */}

          <p className="mt-[56px] text-[10px] leading-[140%] md:w-[70%]">
            Cialis and Viagra are prescription medications intended to support
            healthy sexual function. As with any medication, they may cause mild
            side effects such as headache, indigestion, flushing, or nasal
            congestion in some individuals. Sublingual Tadalafil dissolves under
            the tongue, bypassing the stomach and reducing potential side
            effect. Always consult with your healthcare provider to ensure these
            treatments are right for you.
          </p>
        </div>
      </Section>
    </>
  );
};

export default FindRightED;
