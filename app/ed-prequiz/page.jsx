"use client";
import CoverSection from "@/components/utils/CoverSection";
import CustomImage from "@/components/utils/CustomImage";
import Link from "next/link";
import ListWithIcons from "@/components/ListWithIcons";
import { FaArrowRightLong } from "react-icons/fa6";
import ProudPartner from "@/components/ProudPartner";
import { CiClock1 } from "react-icons/ci";

const items = [
  {
    icon: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Pre%20Sell/hospital%201.png",
    alt: "Hospital",
    text: " FDA Approved Meds",
  },
  {
    icon: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Pre%20Sell/dns-services%201.png",
    alt: "Services",
    text: "Guidance from MEDICAL experts",
  },
  {
    icon: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Pre%20Sell/stethoscope%201.png",
    alt: "No-doctor",
    text: "Affordable treatment options",
  },
];
const edPreQuizCoverData = {
  proudPartner: true,
  subtitle: "Find the ED treatment that’s right for you.",
  image:
    "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/new-ed-cover-adjusted.webp",

  buttons: [
    {
      text: "Get Started",
      href: "/ed-pre-consultation-quiz/",
      primary: true,
      ariaLabel: "Opt1",
      width: "170px",
    },
  ],
};

export default function edPreQuiz() {
  const data = edPreQuizCoverData;
  return (
    <CoverSection>
      <div className="grid md:grid-cols-2 gap-6 md:gap-20 items-center">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <CiClock1 />

            <span>Take our 1-minute quiz.</span>
          </div>

          {data.subtitle && (
            <div
              dangerouslySetInnerHTML={{ __html: data.subtitle }}
              className="text-[32px] lg:text-[48px] headers-font leading-[36.8px] md:leading-[53.52px] font-[550] tracking-[-0.01em] md:tracking-[-0.02em] mb-4 md:mb-8 capitalize"
            ></div>
          )}
          {data.upperNote && (
            <div
              className="text-[14px] md:text-[16px] md:tracking-[-0.02em] mb-[24px] md:mb-[40px] w-[300px] md:w-[390px] h-[58px]"
              dangerouslySetInnerHTML={{ __html: data.upperNote }}
            ></div>
          )}
          {items && <ListWithIcons items={items} />}

          <div className="flex flex-col lg:flex-row gap-2">
            {data.buttons.map((button, index) => (
              <Link
                key={index}
                href={button.href}
                className={`h-11 md:px-[24px] py-3 md:py-[11.5px] rounded-[64px] flex items-center space-x-2 transition justify-center ${
                  button.width || "w-full"
                } ${
                  button.color
                    ? `${button.color} hover:bg-gray-800 text-white`
                    : button.primary
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-white border-solid border border-black text-black hover:bg-gray-100"
                }`}
              >
                <span className="text-[14px] leading-[19.6px] md:leading-[21px] font-[500] md:font-[400]">
                  {button.text}
                </span>
                <FaArrowRightLong />
              </Link>
            ))}
          </div>
          {data.note && (
            <div
              className="text-[12px] text-center mt-5 w-full md:w-[310px]"
              dangerouslySetInnerHTML={{ __html: data.note }}
            ></div>
          )}
          <div className="hidden md:block">
            {data.proudPartner && (
              <>
                <br />
                <br />
                <ProudPartner section />
              </>
            )}
          </div>
        </div>
        <div
          className={`relative overflow-hidden rounded-[16px] w-full h-[335px] ${
            data.imageHeight || "md:h-[696px]"
          } `}
        >
          <CustomImage src={data.image} alt={data.title} fill />
        </div>
        <div className=" md:hidden">
          {data.proudPartner && (
            <>
              <br />
              <br />
              <ProudPartner section />
            </>
          )}
        </div>
      </div>
    </CoverSection>
  );
}
