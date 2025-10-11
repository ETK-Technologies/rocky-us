import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import BrimaryButton from "../ui/buttons/BrimaryButton";

const homeBlog = [
  {
    videoSrc:
      "https://myrocky.b-cdn.net/WP%20Images/merch/video1.mp4",
    title: "Merch, For the Culture.",
    subtitle: "Essential. Timeless. Original.",
    buttonText: "Shop The Collection",
    buttonLink: "#shop-banner"
  }
];

const MerchBehindTheScene = () => {
  const dataToUse =  homeBlog;

  return (
    <>
      {dataToUse.map((blog, index) => (
        <section
          key={index}
          className="md:relative w-full h-100 md:h-screen bg-black"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="relative md:absolute inset-0 w-full h-100 md:h-full object-cover"
          >
            <source src={blog.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="hidden relative z-10 md:flex flex-col justify-end items-center text-center text-[#FFFFFF] h-full px-4 py-12">
            <h1 className="text-[48px] leading-[55.2px] tracking-[-0.02em]  font-[550] headers-font">
              {blog.title}
            </h1>
            <p className="text-[20px] leading-[28px] mt-4 ">{blog.subtitle}</p>
            <BrimaryButton href={blog.buttonLink}
              arrowIcon={true}
              className="mt-[32px] bg-transparent flex items-center justify-center gap-2 w-[189px] h-[44px] border border-[#FFFFFF] text-[#FFFFFF] py-3 rounded-[64px] text-[14px] leading-[19.6px] duration-100 hover:text-black hover:bg-gray-200" >
              {blog.buttonText}
            </BrimaryButton>
          </div>

          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>

        </section>
      ))}
    </>
  );
};

export default MerchBehindTheScene;
