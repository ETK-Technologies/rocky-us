import Image from "next/image";
import CustomImage from "../../utils/CustomImage";
import Section from "../../utils/Section";
import WLProgramItem from "../../WL/WLProgramItem";

const LoseUp = ({title ='', description ='', ProgramWorksData =[] ,}) => {
  return (
    <>
        <Section bg={"!py-0"}>
          <div className="text-center">
            <div className="flex gap-12 lg:mt-20 flex-col sm:flex-row">
              <div className="lg:w-1/2 w-full text-left">
                <h1 className="text-[24px] lg:text-[40px] pt-[30px] font-semibold leading-none mb-[16px]">
                  {title}
                </h1>
                <p className="text-[16px] lg:text-[18px] mb-[40px]">
                  {description}
                </p>

                 <div className="bg-[#F8F7F3] mb-[32px] flex content-start items-center w-full overflow-hidden lg:hidden h-[355px] rounded-2xl  lg:h-[620px] sm:flex-row">
                  <div className="w-full">
                    
                    <CustomImage
                      height="250"
                      width="250"
                      src="/WL/mobile.webp"
                      alt="mobile image"
                      className="w-[160%] lg:mt-64 mt-14 lg:w-[70%] mx-auto lg:pl-[65px] pl-[35px] relative bottom-[-120px] "
                      quality="100"
                    />
                  </div>
                </div>

                {ProgramWorksData.map((item, index) => (
                  <WLProgramItem Item={item} key={item.id} className="w-full" />
                ))}
              </div>
              <div className="lg:w-1/2 w-full hidden lg:block">
                {/* Image  */}
                <div className="bg-[#F8F7F3] flex content-start items-center w-full overflow-hidden  lg:h-[620px] sm:flex-row">
                  <div className="w-full">
                    
                    <CustomImage
                      height="250"
                      width="250"
                      src="/WL/mobile.webp"
                      alt="mobile image"
                      className="w-[160%] lg:mt-64 mt-14 lg:w-[70%] mx-auto lg:pl-[65px] pl-[35px]"
                      quality="100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
    </>
  );
};

export default LoseUp;
