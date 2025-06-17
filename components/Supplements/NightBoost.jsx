import CustomImage from "../utils/CustomImage";
import Section from "../utils/Section";
import NightItem from "./NightItem";

const NightBoost = ({title, description, img, bullets}) => {
  return (
    <>
      <Section bg="bg-[#F5F4EF]">
        <div className="flex lg:flex-row gap-[80px] flex-col items-center ">
          <div className="flex-1">
            <h1 className="lg:text-[48px] headers-font text-[29px] font-[550] letter-spacing[-1%] leading-[115%] mb-[16px]">
              {title}
            </h1>
            <p className="font-[POPPINS] font-normal text-[16px] lg:text-[18px] leading-[140%] text-[#000000] mb-[56px]">
              {description}
            </p>
            <div>
              { bullets.map((item, index) => (
                <NightItem key={index} item={item.title} desc={item.desc} />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <CustomImage
            src={img}
            height={1000}
            width={1000}
            className="rounded-2xl w-[335px] h-[443] lg:w-[560px] lg:h-[740px]"
            ></CustomImage>
          </div>
        </div>
      </Section>
    </>
  );
};

export default NightBoost;
