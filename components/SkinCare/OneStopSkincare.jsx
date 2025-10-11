import React from "react";
import Image from "next/image";
import { steps } from "./data/steps";
const OneStopSkincare = () => {

    return (
        <section className="bg-[#F5F4EF] py-14 md:py-24 px-4 md:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
                <div className="text-left mb-8 md:mb-14">
                    <p className="text-sm font-medium text-[#AE7E56] mb-4">
                        One-Stop Skincare
                    </p>
                    <p className="text-3xl md:text-5xl text-black font-medium">
                        Skip The <br /> Dermatologist Office
                    </p>
                </div>

                <div className="flex flex-col gap-8 md:gap-4">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center md:items-center justify-between gap-8 md:gap-12 w-full relative ${index !== steps.length - 1 ? 'pb-8 md:pb-4' : ''
                                }`}
                        >
                            {/* Text */}
                            <div className="w-full h-full md:w-1/2 flex flex-col justify-center text-left">
                                <div className="flex items-center justify-start mb-4">
                                    <span className="text-base md:text-xl font-semibold text-[#AE7E56]">
                                        {step.number}
                                    </span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-medium text-black mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-[#000000CC] text-base md:text-lg">
                                    {step.description}
                                </p>
                            </div>

                            {/* Image */}
                            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    width={400}
                                    height={300}
                                    className="rounded-lg object-cover w-full h-auto"
                                />
                            </div>

                            {/* Border that only spans text width */}
                            {index !== steps.length - 1 && (
                                <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-px bg-gray-300"></div>
                            )}
                        </div>

                    ))}
                </div>
            </div>
        </section>
    );
};

export default OneStopSkincare;
