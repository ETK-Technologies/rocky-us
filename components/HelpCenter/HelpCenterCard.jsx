import Link from "next/link";
import CustomImage from "../utils/CustomImage";

const HelpCenterCard = ({ title, imageUrl, linkUrl }) => {
  const imageClassName =
    title === "Privacy & Security"
      ? "object-[1px_-65px] scale-[1.7] md:object-[10px_-186px] md:scale-[1.7]"
      : "";
  return (
    <Link href={linkUrl} className="relative">
      <div className="relative overflow-hidden rounded-[16px] w-[162px] md:w-[382.66668701171875px] md:h-[400px] h-[220px]">
        <div
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 68.95%, rgba(0, 0, 0, 0.8) 100%)",
          }}
          className="w-full h-full absolute top-0 left-0 bottom-0 right-0 z-10"
        ></div>
        <CustomImage
          src={imageUrl}
          alt={title}
          fill
          className={imageClassName}
        />
      </div>
      <span className="break-words tracking-[-0.02em] w-[113px] md:w-full absolute bottom-6 -translate-x-2/4 left-2/4 md:translate-x-0 md:left-6 text-[22px] md:text-[30px] leading-[110%] text-white subheaders-font z-20">
        {title}
      </span>
    </Link>
  );
};

export default HelpCenterCard;
