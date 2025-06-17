import CustomImage from "../../utils/CustomImage";
import Section from "../../utils/Section";

const ImageWithText = ({ img, title, text_1, text_2 = "" }) => {
  return (
    <>
      <Section>
        {/* desktop version */}
        <div className="gap-4 hidden md:flex items-center justify-center flex-col md:flex-row">
          <div className="md:w-1/2">
            <CustomImage
              src={img}
              width="1500"
              height="1500"
              className="w-full"
            ></CustomImage>
          </div>
          <div className="justify-center md:w-1/2 items-center">
            <h1 className="text-[32px] md:text-[48px] font-medium mb-[32px] leading-none">
              {title}
            </h1>
            <p className="text-[16px] md:text-[18px] font-[POPPINS]">
              {text_1}
            </p>
            <br />
            <br />
            <p className="text-[16px] md:text-[18px] font-[POPPINS]">
              {text_2}
            </p>
          </div>
        </div>

        {/* Mobile Version */}

        <div className="gap-4 lg:hidden">
          <div className="justify-center md:w-1/2 items-center">
            <h1 className="text-[32px] md:text-[48px] font-medium mb-[32px] leading-none">
              {title}
            </h1>
            <CustomImage
              src={img}
              width="1500"
              height="1500"
              className="w-full mb-4 mt-4"
            ></CustomImage>
            <p className="text-[16px] md:text-[18px] font-[POPPINS]">
              {text_1}
            </p>
            <br />
            <p className="text-[16px] md:text-[18px] font-[POPPINS]">
              {text_2}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default ImageWithText;
