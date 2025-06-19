"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";

const MobilePodcastSlider = ({ episodes }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [sortBy, setSortBy] = useState("Newest to Oldest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const swiperRef = useRef(null);

  const sortOptions = ["Newest to Oldest", "Oldest to Newest", "Most Watched"];

  useEffect(() => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  }, [activeSlide]);

  const handlePrev = () => {
    if (swiperRef.current && !swiperRef.current.isBeginning) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && !swiperRef.current.isEnd) {
      swiperRef.current.slideNext();
    }
  };

  const getSortedEpisodes = () => {
    let sortedEpisodes = [...episodes];

    switch (sortBy) {
      case "Oldest to Newest":
        sortedEpisodes.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "Most Watched":
        // Add logic for most watched sorting (Not finished)
        break;
      default:
        sortedEpisodes.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return sortedEpisodes;
  };

  return (
    <div className="md:hidden">
      {/* Sort Dropdown */}
      <div className="flex relative mb-6">
        <div className="relative w-full">
          <button
            className="flex gap-2 justify-between items-center px-4 py-2 w-full text-sm text-black bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <p>
              <span className="text-[#929292]">Sort By: </span>
              <span className="text-black">{sortBy}</span>
            </p>
            <IoIosArrowDown
              className={`transition-transform ${
                showSortDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showSortDropdown && (
            <div className="absolute right-0 z-10 mt-2 w-full bg-white rounded-lg border border-gray-100 shadow-lg">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-sm ${
                    sortBy === option ? "bg-gray-50" : ""
                  }`}
                  onClick={() => {
                    setSortBy(option);
                    setShowSortDropdown(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Swiper
        slidesPerView={1.3}
        spaceBetween={8}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setActiveSlide(swiper.activeIndex);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {getSortedEpisodes().map((episode) => (
          <SwiperSlide key={episode.id}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-10 p-6 flex flex-col h-full min-h-[660px]">
              <div className="relative h-[300px] w-full">
                <Image
                  src={episode.image}
                  alt={episode.title}
                  fill
                  className="object-cover rounded-2xl"
                  priority={activeSlide === episodes.indexOf(episode)}
                />
              </div>

              <div className="flex flex-col flex-grow pt-6">
                <p className="bg-[#F7F9FB] text-xs px-4 py-1 rounded-full w-fit mb-4">
                  {episode.category}
                </p>
                <p className="text-sm text-[#929292] headers-font font-[550] mb-4">
                  {episode.date} . {`${episode.duration} mins streaming`}
                </p>
                <h3 className="mb-4 text-2xl font-medium headers-font">
                  {episode.title}
                </h3>
                <div className="flex-grow"></div>
                <button className="py-3 w-full text-white bg-black rounded-full">
                  Listen Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        :global(.swiper-pagination) {
          display: none !important;
        }
      `}</style>

      <div className="flex gap-4 justify-between items-center">
        <button
          className={`w-8 h-8 ${
            isBeginning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={handlePrev}
          aria-label="Previous slide"
          disabled={isBeginning}
        >
          <BiChevronLeft className="w-8 h-8" />
        </button>

        {/* Pagination */}
        <div className="flex gap-2 items-center">
          {(() => {
            const pages = [];
            const total = episodes.length;
            const current = activeSlide;

            const pushButton = (i) => {
              pages.push(
                <button
                  key={i}
                  className={`w-8 h-8 ${
                    current === i
                      ? "bg-black text-white rounded-full flex items-center justify-center border"
                      : "text-black"
                  }`}
                  onClick={() => swiperRef.current?.slideTo(i)}
                >
                  {i + 1}
                </button>
              );
            };

            if (total <= 5) {
              for (let i = 0; i < total; i++) pushButton(i);
            } else {
              pushButton(0);

              if (current > 2) pages.push(<span key="start-dots">...</span>);

              const middle = [current - 1, current, current + 1].filter(
                (i) => i > 0 && i < total - 1
              );
              middle.forEach(pushButton);

              if (current < total - 3)
                pages.push(<span key="end-dots">...</span>);

              pushButton(total - 1);
            }

            return pages;
          })()}
        </div>

        <button
          className={`w-8 h-8 ${
            isEnd ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={handleNext}
          aria-label="Next slide"
          disabled={isEnd}
        >
          <BiChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default MobilePodcastSlider;
