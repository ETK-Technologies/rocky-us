"use client";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

const CategorySorting = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const sortOptions = ["Newest to Oldest", "Oldest to Newest", "Most Watched"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
    };

    if (showSortDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortDropdown]);

  return (
    <div className="flex flex-col mb-4 md:mb-[56px] w-full md:flex-row md:justify-between">
      <div className="flex flex-wrap gap-3 justify-center mb-4 w-full md:w-fit md:mb-0">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-6 py-4 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-[#0000000A] text-[#4B4948] hover:bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="hidden relative md:block" ref={dropdownRef}>
        <button
          className="flex gap-2 items-center px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
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
                className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
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
  );
};

export default CategorySorting;
