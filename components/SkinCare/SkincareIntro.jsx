import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

import { checklist } from "./data/checkList";
import BrimaryButton from "../ui/buttons/BrimaryButton";
export default function SkincareIntro() {
    return (
        <section className="w-full px-4 py-8 md:py-16 flex justify-center items-center">
            <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-7 md:gap-20">
                <div className="w-full lg:w-1/2 md:mb-0">
                    <div className="rounded-2xl overflow-hidden w-full h-[407px] md:w-[552px] md:h-[670px] relative">
                        <Image
                            src="/skin-care/skincare-girl.jpg"
                            alt="Girl applying skincare"
                            layout="fill"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>

                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-left">
                        Proven <br className="block md:hidden" /> Skincare,<br /> 100% Online
                    </h2>

                    <ul className="space-y-4 mb-8">
                        {checklist.map((item, index) => (
                            <li key={index} className="flex items-start justify-start text-base leading-relaxed text-black text-start">
                                <FaCheckCircle className="text-[#AE7E56] mr-3 shrink-0 w-[21px] h-[21px]" />
                                <span className="max-w-[303px] md:max-w-max" >{item}</span>
                            </li>
                        ))}
                    </ul>

                    <BrimaryButton href="assistance-center/" className="bg-black text-white px-6 py-3 rounded-full text-sm md:text-base font-medium items-center justify-center space-x-2 hover:bg-black/80 transition w-full md:w-fit block" arrowIcon={true}>
                        <span>Get Started Today</span>
                        {/* <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg> */}
                    </BrimaryButton>
                </div>
            </div>
        </section>
    );
}
