import CustomImage from "../utils/CustomImage";
import Section from "../utils/Section";

const ImagesSection = ({ images }) => {
  return (
    <Section>
      <div className="overflow-x-auto lg:overflow-x-hidden scrollbar-hide">
        <div className="w-full">
          <div className="relative flex justify-between items-center gap-8">
            {images.map((image, index) => (
              <div key={`d_${index}`} className="flex-1 min-w-[260px]">
                <CustomImage
                  key={index}
                  src={image.path}
                  height={384}
                  width={384}
                  className="w-[260px] h-[260px] lg:w-[384px] lg:h-[384px] rounded-2xl mb-[24px]"
                />
                <h2 className="font-[550] headers-font text-[18px] lg:text-[20px] leading-[110%] letter-spacing-[-2%] mb-[16px]">
                  {image.title}
                </h2>
                <p className="font-normal text-[14px] lg:text-[16px] leading-[140%] font-[POPPINS] text-[#212121]">
                  {image.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ImagesSection;
