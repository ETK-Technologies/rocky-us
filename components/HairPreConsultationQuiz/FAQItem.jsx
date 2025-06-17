import { useState } from "react";

export const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-5 text-left flex justify-between items-center"
            >
                <span className="font-medium text-[18px]">{question}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={isOpen ? "M18 12H6" : "M12 6v12M18 12H6"}
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="px-6 py-4">
                    <p className="text-gray-800">
                        {answer}
                    </p>
                </div>
            )}
            <div className="border-b border-gray-200 w-full mt-1"></div>
        </div>
    );
};