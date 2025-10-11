"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { BiVolumeMute, BiVolumeFull } from "react-icons/bi";

const testimonials = [
  {
    id: 1,
    title: "How to use the Ozempic® Pen?",
    subtitle: "Medical Experts",
    description:
      "Clear instructions are provided, and your prescriber and/or pharmacist can offer additional guidance.",
    videoSrc: "https://myrocky.b-cdn.net/Exports/Vertical.mp4",
    imageSrc:
      "https://cdn.vectorstock.com/i/preview-1x/17/61/male-avatar-profile-picture-vector-10211761.jpg",
  },
  {
    id: 2,
    title: "About Weight Loss",
    subtitle: "— Dr. George Mankaryan",
    description: "Everything you need to know about Weight Loss",
    videoSrc: "https://myrocky.b-cdn.net/Updated%20Ozempic%20-%20Vertical.mp4",
    imageSrc:
      "https://mycdn.myrocky.com/wp-content/uploads/20240403134241/Dr.-George-Mankaryous.png",
  },
  {
    id: 3,
    title: "More about Ozempic®",
    subtitle: "Medical Experts",
    description: "General information on Ozempic® to get to the prime line",
    videoSrc:
      "https://myrocky.b-cdn.net/Counting%20clicks%20with%20Ozempic%201mg%20Pen.%20.mp4",
    imageSrc:
      "https://mycdn.myrocky.com/wp-content/uploads/20240403133954/cropped-2-2-100x100-1.png",
  },
];

const VideoTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mutedStates, setMutedStates] = useState(testimonials.map(() => true));
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const videoRefs = useRef([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, testimonials.length);
  }, []);

  const toggleMute = (index, e) => {
    if (e) e.stopPropagation();

    setMutedStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];

      if (videoRefs.current[index]) {
        videoRefs.current[index].muted = newStates[index];
      }

      return newStates;
    });
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.targetTouches[0].clientX);
    setTouchStart(e.targetTouches[0].clientX);

    if (sliderRef.current) {
      const transform = window
        .getComputedStyle(sliderRef.current)
        .getPropertyValue("transform");
      const matrix = new DOMMatrix(transform);
      setCurrentTranslate(matrix.m41);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const currentPosition = e.targetTouches[0].clientX;
    setTouchEnd(currentPosition);

    const diff = currentPosition - startX;
    const containerWidth = sliderRef.current?.parentElement?.offsetWidth || 0;
    const percentageDiff = (diff / containerWidth) * 33.333;
    const newTranslate = -activeIndex * 33.333 + percentageDiff;

    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${newTranslate}%)`;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    let newIndex = activeIndex;
    const swipeThreshold = 75; // Increased threshold for better mobile responsiveness

    if (touchStart - touchEnd > swipeThreshold) {
      newIndex = activeIndex === testimonials.length - 1 ? testimonials.length - 1 : activeIndex + 1;
      setActiveIndex(newIndex);
    } else if (touchEnd - touchStart > swipeThreshold) {
      newIndex = activeIndex === 0 ? 0 : activeIndex - 1;
      setActiveIndex(newIndex);
    }

    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 300ms ease-out";
      sliderRef.current.style.transform = `translateX(-${newIndex * 33.333}%)`;

      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = "";
        }
      }, 300);
    }
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const getSliderTransform = () => {
    return { transform: `translateX(-${activeIndex * 33.333}%)` };
  };

  return (
    <div className="w-full max-w-[1184px] mx-auto my-16 py-0 md:py-24">
      {/* Desktop View */}
      <div className="hidden md:flex justify-between gap-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`relative w-1/3 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
              activeIndex === index ? "opacity-100" : "opacity-80"
            }`}
            onClick={() => handleCardClick(index)}
          >
            <div
              className="relative aspect-[9/16] w-full"
              style={{ maxHeight: "437.5px" }}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="w-full h-full object-cover"
                src={testimonial.videoSrc}
                muted={mutedStates[index]}
                autoPlay
                loop
                playsInline
              />

              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 text-white">
                <div className="flex gap-2">
                  <Image
                    src={testimonial.imageSrc}
                    alt="Testimonial"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm text-[#000000] font-semibold">
                      "{testimonial.title}"
                    </h3>
                    <p className="text-[#814B00] text-sm">
                      {testimonial.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={(e) => toggleMute(index, e)}
                  className="bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                >
                  {mutedStates[index] ? (
                    <BiVolumeMute size={24} />
                  ) : (
                    <BiVolumeFull size={24} />
                  )}
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <p className="text-sm">{testimonial.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="md:hidden relative overflow-hidden w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-out"
          style={{ ...getSliderTransform(), width: `${testimonials.length * 100}%` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="w-1/3 flex-shrink-0"
            >
              <div
                className="relative w-full rounded-lg overflow-hidden"
                style={{ maxHeight: "375px" }}
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="w-full h-full object-cover"
                  style={{ maxHeight: "375px" }}
                  src={testimonial.videoSrc}
                  muted={mutedStates[index]}
                  autoPlay
                  loop
                  playsInline
                />

                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 text-white">
                  <div className="flex gap-2">
                    <Image
                      src={testimonial.imageSrc}
                      alt="Testimonial"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-xs text-[#000000] font-semibold">
                        "{testimonial.title}"
                      </h3>
                      <p className="text-[#814B00] text-xs">
                        {testimonial.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={(e) => toggleMute(index, e)}
                    className="bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                  >
                    {mutedStates[index] ? (
                      <BiVolumeMute size={20} />
                    ) : (
                      <BiVolumeFull size={20} />
                    )}
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                  <p className="text-xs">{testimonial.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoTestimonials;
