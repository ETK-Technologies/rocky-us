import Image from "next/image";

import { features } from "./data/features";

const SkincareHighlight = () => {
    return (
        <section className="w-full ">
            <div className=" w-full bg-[#F5F4EF]">
                <div className="overflow-hidden md:hidden py-4">
                    <div className="animate-scroll whitespace-nowrap flex gap-6 text-sm font-medium px-4">
                        {features.concat(features).map((item, i) => (
                            <div key={i} className="inline-flex items-center gap-1 shrink-0">
                                <Image src={item.icon} alt={item.text} width={24} height={24} />
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hidden md:flex justify-center gap-10 text-sm font-medium py-4">
                    {features.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Image src={item.icon} alt={item.text} width={24} height={24} />
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* <div className="bg-[#F5F4EF] text-black py-8 md:py-14 px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <p className="text-sm text-[#AE7E56] font-medium">Transform Your Skin</p>
                    <h2 className="text-lg md:text-2xl font-semibold mt-3 md:mt-5">
                        Feel better in your skin
                    </h2>

                    <div className="flex justify-center gap-3 my-2">
                        {["skin-3.png", "skin-2.png", "skin-1.png"].map((img, i) => (
                            <div
                                key={i}
                                className="w-[52px] h-[28px] md:w-[82px] md:h-[44px] overflow-hidden flex-shrink-0 rounded-full"
                            >
                                <Image
                                    src={`/skin-care/${img}`}
                                    alt={`skin ${i + 1}`}
                                    width={82}
                                    height={44}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        ))}
                    </div>

                    <p className="text-lg md:text-2xl font-medium">
                        with made-for-you prescription skincare.
                    </p>
                </div>
            </div> */}
        </section>
    );
};

export default SkincareHighlight;
