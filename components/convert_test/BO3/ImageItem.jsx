import CustomImage from "../../utils/CustomImage";

const ImageItem = ({
  image,
  title,
  description,
  className = "",
  showBg = false,
}) => {
  return (
    <>
      <div className={`card rounded-2xl relative` + " " + className}>
        {showBg && (
          <img
            src="/bo3/lines_bg.png"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl z-0"
            alt="background lines"
          />
        )}
        <div className="relative z-10">
          <h1 className=" text-[28px] lg:text-[40px] leading-[114.99999999999999%] tracking-[-2%] font-[POPPINS] mb-[24px] font-medium">
            {title}
          </h1>
          <p className="lg:text-[16px] text-[14px] leading-[140%] tracking-[0px] font-normal mb-[30px] font-[POPPINS]">{description}</p>

          <div className="flex items-center justify-center">
            <CustomImage
              src={image}
              alt={title}
              width="500"
              height="500"
              className={showBg ? `md:w-[472px] md:h-[620px]` : `md:relative md:right-[45px]`}
            ></CustomImage>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageItem;
