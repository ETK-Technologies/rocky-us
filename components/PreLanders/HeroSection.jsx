import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoContainer from "./LogoContainer";

const EdHeroSection = memo(
  ({
    bgImage,
    desktopBgImage,
    mobileBgImage,
    title,
    subTitle,
    btnText,
    quizHref,
  }) => {
    return (
      <section className="relative flex flex-col overflow-hidden bg-[#D5C9BD]">
        <div className="relative z-10 flex flex-col md:flex-row md:min-h-screen w-full max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 ">
          <div className="w-full md:w-1/2 flex flex-col justify-center pt-16 md:pt-0">
            <LogoContainer quizHref={quizHref} />
            <h1 className="mt-4 md:mt-0 text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-bold text-black headers-font mb-4">
              {title}
            </h1>
            <p className="text-base md:text-lg text-[#000000D9] mb-8 max-w-[90%] md:max-w-[80%]">
              {subTitle}
            </p>
            {quizHref && (
              <Link
                href={quizHref}
                className="inline-flex items-center justify-center bg-[#00A76F] hover:bg-[#008f5e] text-white font-medium py-3 px-6 rounded-full transition-colors duration-200 w-full md:w-fit"
              >
                <span className="inline-flex items-center">
                  {btnText} {btnText && !btnText.includes("→") && "→"}
                </span>
              </Link>
            )}
          </div>
          {desktopBgImage && (
            <div className="hidden md:flex w-full md:w-1/2 items-center justify-center relative">
              <Image
                src={desktopBgImage}
                alt="Background"
                fill
                priority
                className="object-contain z-0"
                quality={60}
                sizes="(max-width: 768px) 480px,
                       (max-width: 1024px) 768px,
                       (max-width: 1440px) 1280px,
                       1920px"
                style={{ position: "absolute" }}
              />
            </div>
          )}
        </div>
        {mobileBgImage && (
          <div className="block sm:hidden w-full mt-6">
            <Image
              src={mobileBgImage}
              alt="Background"
              width={800}
              height={500}
              className="w-full h-auto object-cover"
              quality={100}
              priority
              sizes="100vw"
            />
          </div>
        )}
      </section>
    );
  }
);

EdHeroSection.displayName = "EdHeroSection";

export default EdHeroSection;
