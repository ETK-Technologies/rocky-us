"use client";
import CustomImage from "@/components/utils/CustomImage";
import React, { useState, useEffect } from "react";

const RadioImagesQuestion = ({
  config,
  userData,
  onSelect,
  onContinue,
  onSubmitData,
  isValid,
}) => {
  const [openPopup, setOpenPopup] = useState(null);
  const [zoomState, setZoomState] = useState({ id: null, x: 50, y: 50 });
  const [canHover, setCanHover] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!openPopup) return;
    const handleDocClick = () => setOpenPopup(null);
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, [openPopup]);

  // detect if the device supports hover (desktop) or not (touch/mobile)
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: hover)");
    const update = () => setCanHover(Boolean(mq.matches));
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // close magnifier when clicking anywhere outside (for mobile/tap behavior)
  useEffect(() => {
    if (!zoomState.id) return;
    const handleDocClick = () => setZoomState({ id: null, x: 50, y: 50 });
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, [zoomState.id]);

  const handleContinue = async () => {
    if (isValid && onContinue && !isSubmitting) {
      setIsSubmitting(true);
      try {
        // Submit data first, then continue
        if (onSubmitData) {
          await onSubmitData();
        }
        onContinue();
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {config.options.map((option) => (
          <div
            key={option.id}
            className={`w-full text-left px-3 sm:px-4 py-4 sm:py-5 md:py-6 border-[1px] rounded-lg flex items-center gap-3 sm:gap-4 transition-all duration-200 cursor-pointer hover:shadow-md active:scale-[0.98] ${
              userData[config.field] === option.id
                ? "border-[#A7885A] bg-[#FFFBF7] shadow-sm"
                : "border-[#E2E2E1] hover:border-[#A7885A]/30"
            }`}
            onClick={() => {
              // selecting an option should also close any open info popup
              setOpenPopup(null);
              onSelect(option.id, option);
            }}
          >
            {option.image && (
              <div
                className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] relative"
                onMouseEnter={(e) => {
                  if (!canHover) return;
                  setZoomState({ id: option.id, x: 50, y: 50 });
                }}
                onMouseLeave={(e) => {
                  if (!canHover) return;
                  setZoomState({ id: null, x: 50, y: 50 });
                }}
                onMouseMove={(e) => {
                  if (!canHover) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setZoomState({ id: option.id, x, y });
                }}
                onClick={(e) => {
                  // on touch devices, toggle magnifier on tap and prevent parent selection
                  if (canHover) return;
                  e.stopPropagation();
                  e.preventDefault();
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setZoomState((prev) =>
                    prev.id === option.id
                      ? { id: null, x: 50, y: 50 }
                      : { id: option.id, x, y }
                  );
                }}
                onPointerMove={(e) => {
                  // update position while the magnifier is open on touch/pointer devices
                  if (canHover) return;
                  if (zoomState.id !== option.id) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setZoomState({ id: option.id, x, y });
                }}
              >
                <CustomImage
                  src={option.image}
                  alt={option.label}
                  fill
                  className={`rounded-md object-cover transition-opacity duration-200 ${
                    userData[config.field] === option.id
                      ? "opacity-100"
                      : "opacity-70"
                  }`}
                />

                {/* Magnifier preview: desktop = small preview, mobile = centered full-width overlay */}
                {zoomState.id === option.id &&
                  (canHover ? (
                    <div
                      className="absolute pointer-events-none left-full top-0 ml-3 w-[250px] h-[250px] lg:w-[320px] lg:h-[320px] border-[3px] lg:border-[5px] rounded overflow-hidden z-50 bg-black shadow-2xl border-[#A7885A]"
                      style={{
                        backgroundImage: `url(${option.image})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: `${zoomState.x}% ${zoomState.y}%`,
                        backgroundSize: `250%`,
                        backgroundColor: "#000",
                      }}
                    />
                  ) : (
                    <div
                      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                      onClick={() => setZoomState({ id: null, x: 50, y: 50 })}
                    >
                      {/* Close button (mobile) */}
                      <button
                        type="button"
                        aria-label="Close image"
                        onClick={(e) => {
                          e.stopPropagation();
                          setZoomState({ id: null, x: 50, y: 50 });
                        }}
                        className="absolute top-4 right-4 z-60 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-gray-100 transition-colors duration-200 text-lg sm:text-xl font-bold"
                      >
                        ✕
                      </button>

                      <div className="w-full max-w-lg mx-auto px-4">
                        <div className="bg-white rounded-lg overflow-hidden border border-[#A7885A] shadow-2xl w-full">
                          <img
                            src={option.image}
                            alt={option.label}
                            className="w-full h-auto object-contain block max-h-[calc(100vh-160px)]"
                            onClick={(e) => {
                              // prevent overlay from closing when tapping the image itself
                              e.stopPropagation();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            <div className="flex-1 relative flex items-center gap-2">
              <span className="text-[14px] sm:text-[16px] md:text-[18px] font-medium leading-[140%] tracking-[0%] text-black text-left">
                {option.label}
              </span>

              {/* Render info icon only if option.info (or description) exists */}
              {(option.infoIcon || option.infoText) && (
                <div className="absolute right-0">
                  <button
                    type="button"
                    aria-expanded={openPopup === option.id}
                    onClick={(e) => {
                      // prevent the parent button from firing
                      e.stopPropagation();
                      e.preventDefault();
                      setOpenPopup((prev) =>
                        prev === option.id ? null : option.id
                      );
                    }}
                    className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full bg-gray-100 border text-[10px] sm:text-xs text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                  >
                    i
                  </button>

                  {openPopup === option.id && (
                    <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 w-40 sm:w-48 p-2 bg-white border rounded-lg shadow-lg text-[11px] sm:text-xs text-gray-800 max-w-[90vw]">
                      {option.infoText}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RadioImagesQuestion;
