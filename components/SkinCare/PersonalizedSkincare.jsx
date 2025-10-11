import React from "react";
import CustomImage from "@/components/utils/CustomImage";
import { FaCheck } from "react-icons/fa";
import BrimaryButton from "@/components/ui/buttons/BrimaryButton";
// import BrimaryButton from './../ui/buttons/BrimaryButton';

const PersonalizedSkincare = () => {
    const features = [
        "Automatic refills so you never run out",
        "Update, change or pause subscription at any time",
        "All products use only dermatologist-trusted ingredients"
    ];

    return (
        <section className=" md:bg-desktop-aging-gradient overflow-hidden ">
            {/* Mobile Layout - Full Background Image */}
            <div className="lg:hidden relative w-full ">
                {/* Full-cover background image */}
                <div className="relative w-full h-[340px] bg-mobile-aging-gradient">
                    <CustomImage
                        src="https://myrocky.b-cdn.net/Other%20Images/skin-care/transform-aging-m.png"
                        alt="Personalized skincare background"
                        fill
                        className={"object-[-18px] md:object-[0]"}
                    />
                </div>

                {/* Content Section */}
                <div className="relative z-10 py-9 px-5 flex flex-col justify-end h-full">
                    <h2 className="text-[40px] font-[550] leading-[115%] tracking-[-2%] mb-6 md:mb-8 headers-font text-black">
                        Personalized Skincare,<br /> 100% Online
                    </h2>

                    {/* Features List */}
                    <div className="space-y-6 mb-7">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <div className="flex-shrink-0 w-[17px] h-[17px] bg-[#AE7E56] mt-[2px] rounded-full flex items-center justify-center">
                                    <FaCheck className="text-white text-[10px]" />
                                </div>
                                <div className="max-w-[307px] md:max-w-max">
                                    <p className="text-base leading-[140%] text-black font-[400] tracking-[0%]">
                                        {feature}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Centered Get Started Button */}
                    <BrimaryButton
                        className="w-full bg-black text-white px-8 py-3 rounded-full text-[16px] font-[500] hover:bg-gray-800 transition-colors duration-200"
                        href="/assistance-center"
                        arrowIcon={true}
                    >
                        Get Started today
                    </BrimaryButton>
                </div>
            </div>

            <div className="hidden lg:flex relative h-[700px] justify-between w-full">
                {/* Content Section */}
                <div className=" flex-1 ">
                    <div className="flex justify-center items-center ">
                        <div className="pl-[220px] mt-[134.5px]">
                            <h2 className="text-[60px] font-[550] leading-[115%] tracking-[-2%] mb-8 headers-font text-black md:max-w-[480px]">
                                Personalized Skincare,<br /> 100% Online
                            </h2>

                            {/* Features List */}
                            <div className="mb-10">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3 mb-[24px]">
                                        <div className="flex-shrink-0 w-[21px] h-[21px] mt-[2px] bg-[#AE7E56] rounded-full flex items-center justify-center">
                                            <FaCheck className="text-white text-xs" />
                                        </div>
                                        <div className="max-w-[448px]">
                                            <p className="text-[16px] leading-[140%] text-[#000000CC] font-[400] tracking-[0%]">
                                                {feature}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <BrimaryButton
                                className="w-full max-w-[231px] bg-black text-white px-4 py-4 rounded-full text-[16px] font-[500] hover:bg-gray-800 transition-colors duration-200 leading-[140%]"
                                href="/assistance-center"
                                arrowIcon={true}
                            >
                                Get Started today
                            </BrimaryButton>
                        </div>
                    </div>
                </div>

                <div className="flex-1 h-full ">
                    <CustomImage
                        src="https://myrocky.b-cdn.net/Other%20Images/skin-care/transform-aging-d.png"
                        alt="Personalized skincare background"
                        width={500}
                        height={700}
                        className="object-[-30px]  h-full w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default PersonalizedSkincare;
