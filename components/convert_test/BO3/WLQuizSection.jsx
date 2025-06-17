"use client";
import { useState } from "react";
import Section from "../../utils/Section";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const WLQuizSection = () => {
  const [value, setValue] = useState(500);
  const [toLose, settoLose] = useState( Math.round(500 * 0.25));


  const handleWeightChange = (newWeight) => {
    setValue(newWeight); 
    settoLose(Math.round(newWeight * 0.25)); 
  }
  return (
    <>
      <Section>
        <div className="bg-[#F8F7F3] md:p-16 p-4 flex gap-10  justify-center items-center rounded-2xl flex-col md:flex-row">
          <div className="md:w-1/2 w-full text-center md:text-left">
            <h1 className="font-semibold text-[32px] md:text-[48px] leading-[114.99999999999999%]">
              How Much Weight Could You Lose?
            </h1>
            <Link
              className="md:w-[75%] h-11 mt-4 bg-black text-[white] md:px-[24px] py-3 md:py-[11.5px] rounded-[64px] flex items-center space-x-2 transition justify-center"
              href="/wl-pre-consultation"
            >
              <span className="text-[14px] leading-[19.6px] md:leading-[21px] font-[500] md:font-[400]">
                Take The Quiz
              </span>
              <FaArrowRightLong />
            </Link>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="bg-white rounded-2xl  p-4">
              <div className="flex justify-center md:justify-start items-center gap-10 flex-row p-4">
                <p className="font-[POPPINS] text-[16px] w-1/2 tracking-[-0.7px]">
                  Select your current weight
                </p>
                <div className="flex justify-end w-1/2">
                  <div>
                    <span className="text-[32px] px-1">{value}</span>
                    <span>lbs</span>
                  </div>
                </div>
              </div>
              <div>
                <input
                  type="range"
                  min="300"
                  max="1500"
                  value={value}
                  onChange={(e) => handleWeightChange(e.target.value)}
                  className="w-full h-2 mt-4 bg-gray-100 
                  rounded-md range  accent-[#AE7E56]"
                />
              </div>
              <div className="bg-[#F9F9F9] rounded-2xl px-2 m-4 flex justify-center items-center mb-2">
                <p className="font-[POPPINS] text-[16px] font-semibold tracking-[-0.7px] w-1/2">
                  Weight you could lose (lbs):
                </p>
                <div className="flex justify-end w-1/2">
                  <div>
                    <span className="md:text-[72px] text-[36px] px-1 font-semibold">{toLose}</span>
                    <span>lbs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default WLQuizSection;
