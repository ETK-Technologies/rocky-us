
"use client";
import { useState, useRef } from "react";



const WLProgressBar = ({ isMobile = false }) => {
  const MIN = 100; // Min value
  const MAX = 200; // Max value
  const [value, setValue] = useState(150);
  const [toLoose, settoLoose] = useState(150 * 0.25);
  const trackRef = useRef(null);

  // Converts value to % of the track (for positioning)
  const valueToPercent = (val) => ((val - MIN) / (MAX - MIN)) * 100;

  // Mouse drag logic
  const onMouseDown = (e) => {
    e.preventDefault();
    const onMouseMove = (moveEvent) => {
      const rect = trackRef.current.getBoundingClientRect();
      let percent = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));
      const newValue = Math.round(MIN + ((MAX - MIN) * percent) / 100);
      setValue(newValue);
    };
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onTrackClick = (e) => {
    const rect = trackRef.current.getBoundingClientRect();
    let percent = ((e.clientX - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    const newValue = Math.round(MIN + ((MAX - MIN) * percent) / 100);
    setValue(newValue);
    settoLoose(Math.round(newValue * 0.25));
  };

  return (
    <>
      {isMobile ? (
        <>
          {/* for mobile version */}
          <div className="bg-gradient-to-b from-[#67482E] to-[#36251A] pb-4  rounded-3xl flex-1 block lg:hidden">
            <div className="flex justify-center items-center flex-col h-[335px] w-[335px]">
              <p className="font-[POPPINS] text-center mb-8 mt-[32px] text-[12px] lg:text-[16px] font-normal leading-[140%] text-[#F5D3BB]">
                You could loose:
              </p>
              <p className="font-[POPPINS] mb-[24px] lg:mb-[60px] leading-[84%] tracking-[-2%] text-[#F2A565] font-medium ">
                <span className="text-[65px] mb-2 md:text-[104px]">
                  -{toLoose}
                </span>{" "}
                lbs
              </p>
              <p className="font-[POPPINS] mb-[12px] text-center text-[12px] lg:text-[16px] tracking-[0%] font-normal leading-[140%] text-[#F5D3BB]">
                Current Weight:
              </p>
              <div className="bg-[#251D16] text-[12px] md:text-[12px] font-medium text-center w-fit px-4 rounded-2xl text-[#F2A565] font-[POPPINS]">
                <span className="text-[16px] md:text-[24px]">{value}</span> lbs
              </div>
              <div className="relative overflow-hidden mt-[42px] h-[140px] flex items-center justify-center">
                <div
                  ref={trackRef}
                  className="relative w-full max-w-[340px] h-[80px] cursor-pointer"
                  onClick={onTrackClick}
                  style={{ background: "none" }}
                >
                  <img
                    src="/bo3/slider.png"
                    className="w-full pointer-events-none select-none"
                    alt="slider track"
                  />
                  {/* Thumb */}
                  <div
                    className="absolute lg:top-0 top-[-20px]"
                    style={{
                      left: `calc(${valueToPercent(value)}% - 18px)`, // center the thumb
                      transition: "left 0.1s",
                      zIndex: 2,
                    }}
                    onMouseDown={onMouseDown}
                  >
                    <img
                      src="/bo3/SlideRcontroller.png"
                      className="w-[35px] pointer-events-auto select-none"
                      alt="slider thumb"
                      draggable={false}
                      style={{ userSelect: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end of mobile version */}
        </>
      ) : (
        <>
          <div className="bg-gradient-to-b from-[#67482E] to-[#36251A] pb-4 p-[32px] rounded-3xl flex-1 hidden lg:block">
            <div className="flex justify-center items-center flex-col">
              <p className="font-[POPPINS] text-center mb-14 text-[12px] lg:text-[16px] font-normal leading-[140%] text-[#F5D3BB]">
                You could loose:
              </p>
              <p className="font-[POPPINS] mb-[24]px lg:mb-[60px] leading-[84%] tracking-[-2%] text-[#F2A565] font-medium ">
                <span className="text-[76px] md:text-[104px]">-{toLoose}</span>{" "}
                lbs
              </p>
              <p className="font-[POPPINS] mb-[12px] text-center text-[12px] lg:text-[16px] font-normal leading-[140%] text-[#F5D3BB]">
                Current Weight:
              </p>
              <div className="bg-[#251D16] text-[12px] md:text-[12px] font-medium text-center w-fit px-4 rounded-2xl text-[#F2A565] font-[POPPINS]">
                <span className="text-[16px] md:text-[24px]">{value}</span> lbs
              </div>
              <div className="relative overflow-hidden mt-[42px] h-[140px] flex items-center justify-center">
                <div
                  ref={trackRef}
                  className="relative w-full max-w-[340px] h-[80px] cursor-pointer"
                  onClick={onTrackClick}
                  style={{ background: "none" }}
                >
                  <img
                    src="/bo3/slider.png"
                    className="w-full pointer-events-none select-none"
                    alt="slider track"
                  />
                  {/* Thumb */}
                  <div
                    className="absolute top-0"
                    style={{
                      left: `calc(${valueToPercent(value)}% - 18px)`, // center the thumb
                      transition: "left 0.1s",
                      zIndex: 2,
                    }}
                    onMouseDown={onMouseDown}
                  >
                    <img
                      src="/bo3/SlideRcontroller.png"
                      className="w-[35px] pointer-events-auto select-none"
                      alt="slider thumb"
                      draggable={false}
                      style={{ userSelect: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WLProgressBar;
