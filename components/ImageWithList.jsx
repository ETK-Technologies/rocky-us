import CustomImage from "@/components/utils/CustomImage";

const ImageWithList = ({
  image,
  imagePosition = "right",
  mobileImagePosition = "bottom",
  children
}) => {
  return (
    <div
      // className={`flex flex-col-reverse md:flex-row items-center gap-[24px] md:gap-[80px] ${
      //   imagePosition === "left" ? "md:flex-row-reverse" : ""
      // }`}
      className={`flex flex-col md:flex-row items-center gap-[24px] md:gap-[80px] 
        ${imagePosition === "left" ? "md:flex-row-reverse" : ""} 
        ${mobileImagePosition === "bottom" ? "flex-col" : "flex-col-reverse"}`}
    >
      {/* Image */}

      <div className="relative overflow-hidden rounded-[16px] w-full md:w-[552px] h-[335px] md:h-[584px] flex justify-center lg:justify-start">
        <CustomImage
          src={image}
          fill
        />
      </div>

      {/* Children (Content) */}
      <div className="w-full md:w-1/2">{children}</div>
    </div>
  );
};

export default ImageWithList;
