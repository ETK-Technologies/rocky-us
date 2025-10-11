'use client';

import { useState } from 'react';
import Image from 'next/image';
import { testimonials } from './data/testimonials';

export default function TestimonialSlider() {
    const [current, setCurrent] = useState(0);
    const [showAfter, setShowAfter] = useState(false);
    const isFirst = current === 0;
    const isLast = current === testimonials.length - 1;

    const { name, condition, treatment, quote, beforeImg, afterImg } = testimonials[current];

    const handlePrev = () => {
        setShowAfter(false);
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setShowAfter(false);
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <section className="bg-[#FAF9F6] py-12 px-4">
            <div className='max-w-6xl mx-auto'>
                <h2 className="text-3xl md:text-5xl font-semibold text-start mb-8 md:mb-12 headers-font">
                    Join The League Of <br /> Extraordinary Skin
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
                    <div className="flex flex-col items-center">

                        <div className="relative w-[335px] h-[335px] md:w-[480px] md:h-[480px] rounded-3xl overflow-hidden">
                            <Image
                                src={showAfter ? afterImg : beforeImg}
                                alt={`${name} ${showAfter ? 'after' : 'before'}`}
                                fill
                                className="object-cover"
                            />
                            {/* Toggle Buttons */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 bg-[#3A37331F] rounded-full shadow p-1">
                                <button
                                    className={`px-3 py-1 text-sm rounded-full ${!showAfter ? 'bg-white text-black' : 'text-white'
                                        }`}
                                    onClick={() => setShowAfter(false)}
                                >
                                    Before
                                </button>
                                <button
                                    className={`px-3 py-1 text-sm rounded-full ${showAfter ? 'bg-white text-black' : 'text-white'
                                        }`}
                                    onClick={() => setShowAfter(true)}
                                >
                                    After
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-xl flex flex-col justify-between gap-6 md:max-w-[480px]">
                        <div>
                            <h3 className="text-xl font-semibold">{name}</h3>
                            <p className="mt-4 text-black text-base md:text-lg">{quote}</p>
                        </div>

                        <hr className="border-gray-200" />

                        <div className="flex justify-between text-sm text-gray-600">
                            <div className='flex flex-col gap-4'>
                                <div className="font-medium text-black">CONDITION</div>
                                <div>{condition}</div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className="font-medium text-black">TREATMENT</div>
                                <div>{treatment}</div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2 justify-center md:justify-start">
                            <button
                                onClick={handlePrev}
                                className={`w-9 h-9 border border-black rounded-full flex items-center justify-center text-base hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}
                                disabled={isFirst}
                            >
                                <Image src="/skin-care/arrow.svg" alt="Previous" width={16} height={16} className='scale-x-[-1]' />
                            </button>
                            <button
                                onClick={handleNext}
                                className={`w-9 h-9 border border-black rounded-full flex items-center justify-center text-base hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}
                                disabled={isLast}
                            >
                                <Image src="/skin-care/arrow.svg" alt="Next" width={16} height={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
