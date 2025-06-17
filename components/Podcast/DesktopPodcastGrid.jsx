"use client";
import React, { useState, useEffect } from "react";
import { EpisodeCard } from "./EpisodeCard";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";

const DesktopPodcastGrid = ({
  episodes,
  itemsPerPage = 4,
  sortBy = "Newest to Oldest",
}) => {
  const [activePage, setActivePage] = useState(1);
  const calculatedTotalPages = Math.ceil(episodes.length / itemsPerPage);

  useEffect(() => {
    setActivePage(1);
  }, [episodes, sortBy]);

  const getCurrentPageItems = () => {
    let sortedEpisodes = [...episodes];

    switch (sortBy) {
      case "Oldest to Newest":
        sortedEpisodes.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "Most Watched":
        // Add logic for most watched sorting (not finished)
        break;
      default: // Newest to Oldest
        sortedEpisodes.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedEpisodes.slice(startIndex, endIndex);
  };

  return (
    <div className="hidden md:block">
      <div className="grid grid-cols-2 gap-4 mb-10">
        {getCurrentPageItems().map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>

      {/* Desktop Pagination */}
      <div className="flex justify-center items-center">
        <div className="flex gap-10 justify-between items-center">
          <button
            className={`w-8 h-8 ${
              activePage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => activePage > 1 && setActivePage(activePage - 1)}
            aria-label="Previous page"
            disabled={activePage === 1}
          >
            <BiChevronLeft className="w-8 h-8" />
          </button>

          {[...Array(calculatedTotalPages)].map((_, index) => (
            <button
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activePage === index + 1
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setActivePage(index + 1)}
              aria-label={`Page ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`w-8 h-8 ${
              activePage === calculatedTotalPages
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() =>
              activePage < calculatedTotalPages && setActivePage(activePage + 1)
            }
            aria-label="Next page"
            disabled={activePage === calculatedTotalPages}
          >
            <BiChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopPodcastGrid;
