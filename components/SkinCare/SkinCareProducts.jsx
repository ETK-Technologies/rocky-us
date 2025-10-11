"use client"
import Image from 'next/image';
import { useState } from 'react';
import BrimaryButton from '../ui/buttons/BrimaryButton';
import { skinCareData } from './data/skinCareData';

export default function SkinCareProducts() {
    const [openModalIndex, setOpenModalIndex] = useState(null);

    return (
        <section className="px-4 md:px-0 py-14 md:py-24 flex flex-col max-w-7xl gap-8 mx-auto">
            {skinCareData.map((item, index) => {
                const isReversed = index % 2 !== 0;

                return (
                    <div
                        key={index}
                        className={`flex flex-col md:flex-row ${isReversed ? 'md:flex-row-reverse' : ''} items-center justify-center gap-4`}
                    >
                        {/* Image Block */}
                        <div className="w-full md:w-[592px] h-[335px] md:h-[592px] rounded-3xl overflow-hidden relative">
                            <Image
                                src={item.image}
                                alt={item.category}
                                width={600}
                                height={600}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 text-white text-2xl md:text-4xl font-semibold">
                                {item.category}
                            </div>
                        </div>

                        {/* Product Block */}
                        <div className="w-full md:w-[592px] min-h-[335px] md:h-[592px] rounded-3xl p-4 md:p-6 bg-[#F7F7F7] shadow-sm flex flex-col justify-between">
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex items-start md:items-center justify-between w-full">
                                    <h3 className="text-2xl md:text-3xl font-semibold mb-2">{item.creamTitle}</h3>
                                    <div className="flex flex-col gap-1 items-center">
                                        {item.creamLabel && <span className="text-xs bg-[#BBA796] text-white rounded-full px-3 py-1 whitespace-nowrap">
                                            {item.creamLabel}
                                        </span>}
                                        {item.strengtsLabel && <span className="text-xs bg-[#B7B7B7] text-white rounded-full px-3 py-1 whitespace-nowrap">
                                            {item.strengtsLabel}
                                        </span>}
                                    </div>
                                </div>
                                <Image
                                    src={item.creamImage}
                                    alt={item.creamTitle}
                                    width={170}
                                    height={170}
                                    className="block md:hidden"
                                />
                                <Image
                                    src={item.creamImage}
                                    alt={item.creamTitle}
                                    width={390}
                                    height={390}
                                    className="mb-4 hidden md:block"
                                />

                            </div>
                            <div className="flex flex-col gap-4 justify-center items-center">
                                <button
                                    className="text-xs text-black underline cursor-pointer flex gap-1 items-center text-center"
                                    onClick={() => setOpenModalIndex(index)}
                                >
                                    <Image
                                        src="/skin-care/information.svg"
                                        alt="information"
                                        width={16}
                                        height={16}
                                    />
                                    Important Safety information
                                </button>
                                <div className="flex gap-2 w-full">
                                    <BrimaryButton className="flex-1 bg-black text-white text-sm py-2 rounded-full" href={item.getStartedHref}>Get Started</BrimaryButton>
                                    <BrimaryButton className="flex-1 bg-white border border-gray-300 text-sm py-2 rounded-full" href={item.learnMoreHref}> Learn More</BrimaryButton>

                                </div>
                            </div>
                        </div>

                        {/* Modal Popup */}
                        {openModalIndex === index && (
                            <div className="fixed inset-0 z-50 bg-black bg-opacity-40">
                                {/* Mobile Bottom Sheet */}
                                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg p-6 animate-slide-up">
                                    <button
                                        className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
                                        onClick={() => setOpenModalIndex(null)}
                                        aria-label="Close"
                                    >
                                        ×
                                    </button>
                                    <h2 className="text-lg font-semibold mb-4 pr-8">Important Safety Information</h2>
                                    <div className="text-gray-700 text-sm leading-relaxed">
                                        {item.category === 'Acne' && (
                                            <p>For external use only. May cause dryness or irritation.<br />
                                                Avoid eyes & sun. Not for use if pregnant or breastfeeding.</p>
                                        )}
                                        {item.category === 'Anti-Aging' && (
                                            <p>For external use only. May cause dryness or irritation.<br />
                                                Avoid eyes & sun. Not for use if pregnant or breastfeeding.</p>
                                        )}
                                        {item.category === 'Hyperpigmentation' && (
                                            <p>Not recommended during pregnancy or breastfeeding. Avoid eyes, lips, and broken skin. Mild redness, dryness, or peeling may occur as your skin adjusts. Use sunscreen daily to protect results and prevent new discolouration</p>
                                        )}
                                    </div>
                                </div>

                                {/* Desktop Modal */}
                                <div className="hidden md:flex items-center justify-center min-h-screen p-4">
                                    <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative lg:min-w-[640px]">
                                        <button
                                            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                                            onClick={() => setOpenModalIndex(null)}
                                            aria-label="Close"
                                        >
                                            ×
                                        </button>
                                        <h2 className="text-xl font-semibold mb-4">Important Safety Information</h2>
                                        <div className="text-gray-700 text-sm space-y-3">
                                            {item.category === 'Acne' && (
                                                <p>For external use only. May cause dryness or irritation.<br />
                                                    Avoid eyes & sun. Not for use if pregnant or breastfeeding.</p>
                                            )}
                                            {item.category === 'Anti-Aging' && (
                                                <p>For external use only. May cause dryness or irritation.<br />
                                                    Avoid eyes & sun. Not for use if pregnant or breastfeeding.</p>
                                            )}
                                            {item.category === 'Hyperpigmentation' && (
                                                <p>Not recommended during pregnancy or breastfeeding. Avoid eyes, lips, and broken skin. Mild redness, dryness, or peeling may occur as your skin adjusts. Use sunscreen daily to protect results and prevent new discolouration</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </section>
    );
}
