import Link from "next/link";
import CustomImage from "../../utils/CustomImage";
import Section from "../../utils/Section";
import LossItem from "./LossItem";
import { FaArrowRightLong } from "react-icons/fa6";

const LossStartsHere = () => {
  return (
    <>
      <Section bg="bg-[#F5F4EF]">
        <div className="flex flex-col md:flex-row gap-8 relative">
          <div className="relative md:w-1/2 hidden md:block">
            <div className="bg-white px-5 p-2 gap-4 justify-center items-center rounded-full border-[#AE7E56] border-solid border-[5px] flex absolute right-0 z-10">
              <div>
                <div className="w-[16px] h-[16px] border-solid border-[1px] brder-[#00B67A33] bg-[#00B67A] rounded-full"></div>
              </div>
              <div>
                <p className="text-[16px] font-[POPPINS] font-bold  text-[#AE7E56] ">
                  Same/next day
                </p>
                <p className="text-[16px] font-[POPPINS] font-medium">
                  appointments available
                </p>
              </div>
            </div>
            <CustomImage
              src="/bo3/Bg.png"
              height="750"
              width="750"
            ></CustomImage>
          </div>
          <div className="md:w-1/2">
            <div className="bg-[#AE7E56] text-center rounded-t-2xl p-1">
              <p className="text-white text-[14px] font-medium">
                Canada’s Leading Weight Loss Program
              </p>
            </div>
            <div className="bg-[#AE7E56] rounded-b-2xl pt-1">
              <div className="card lg:p-[40px] p-[16px] bg-white rounded-2xl">
                <h1 className="text-[28px]  md:w-[420px] font-[450] leading-[114.99999999999999%] md:tracking-[-2px] md:text-[40px]">
                  Sustainable Weight Loss Starts Here.
                </h1>

                <p className="font-[POPPINS] text-[16px] font-bold mt-[24px] mb-[12px]">
                  What’s Included:
                </p>

                <LossItem
                  img="/bo3/reminder_medical_1.png"
                  title="Virtual appointment to determine treatment plan"
                  iconClassName="w-[35px] h-[24px]"
                ></LossItem>

                <LossItem
                  img="/bo3/microscope1.png"
                  title="Review of Lab Work"
                  iconClassName="w-[35px] h-[24px]"
                  description="Includes in-depth biology, hormonal and metabolic suitability results."
                ></LossItem>
                <LossItem
                  img="/bo3/stethoscope2.png"
                  title="Health Canada Approved Treatments, if eligible"
                  iconClassName="w-[35px] h-[24px]"
                ></LossItem>

                <LossItem
                  img="/bo3/ibm.png"
                  title="Health Coaching by Licensed Clinicians"
                  iconClassName="w-[35px] h-[24px]"
                ></LossItem>

                <LossItem
                  img="/bo3/chat1.png"
                  title="24/7 Medical Support"
                ></LossItem>

                <LossItem
                  img="/bo3/ibm1.png"
                  title="Nutrition and lifestyle tips"
                ></LossItem>

                <Link
                  className="h-11 mt-5 bg-black text-[white] md:px-[24px] py-3 md:py-[11.5px] rounded-[64px] flex items-center space-x-2 transition justify-center"
                  href="/wl-pre-consultation"
                >
                  <span className="text-[14px] leading-[19.6px] md:leading-[21px] font-[500] md:font-[400]">
                    Get Started
                  </span>
                  <FaArrowRightLong />
                </Link>
                <div className="text-center mt-2">
                  <p className="text-center font-medium font-[POPPINS] text-[14px]">
                    It only takes 3 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative md:w-1/2 md:hidden block">
            <div className="bg-white px-5 p-2 gap-4 justify-center items-center rounded-full border-[#AE7E56] border-solid border-[5px] flex absolute right-0 z-10">
              <div>
                <div className="w-[16px] h-[16px] border-solid border-[1px] brder-[#00B67A33] bg-[#00B67A] rounded-full"></div>
              </div>
              <div>
                <p className="text-[16px] font-[POPPINS] font-bold  text-[#AE7E56] ">
                  Same/next day
                </p>
                <p className="text-[16px] font-[POPPINS] font-medium">
                  appointments available
                </p>
              </div>
            </div>
            <CustomImage
              src="/bo3/Bg.png"
              height="750"
              width="750"
            ></CustomImage>
          </div>
        </div>
      </Section>
    </>
  );
};

export default LossStartsHere;
