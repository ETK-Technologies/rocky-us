"use client";
import { useState } from "react";
import Link from "next/link";

const MorePages = ({ setIsOpen }) => {
  const [isOpen, setDropdownOpen] = useState(false);

  const handleLinkClick = () => {
    setDropdownOpen(false);
    if (setIsOpen) {
      setIsOpen(false); // Close the main mobile menu
    }
  };

  return (
    <div className="relative group px-5 md:px-0">
      {/* Desktop: hover, Mobile: click */}
      <div
        className="flex items-center justify-between py-[2px] cursor-pointer text-black font-semibold hover:text-gray-500 z-10 md:block"
        onClick={() => setDropdownOpen(!isOpen)}
      >
        <span>More</span>
        {/* Arrow Icon for Mobile */}
        <span
          className={`md:hidden transform transition-transform duration-300 ${
            isOpen ? "rotate-[270deg]" : "rotate-90"
          }`}
        >
          &gt;
        </span>
      </div>

      {/* Dropdown */}
      <div
        className={`
          absolute md:top-[20px] md:left-0  md:bg-white md:shadow-md md:rounded-md z-50  md:pt-5 md:pb-2 md:min-w-[120px]
          transition-opacity duration-200 
          md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible
          ${isOpen ? "block" : "hidden"} md:block
        `}
      >
        <Link
          onClick={handleLinkClick}
          href="/reviews"
          className="block py-1.5 px-2 text-[14px] font-[400] text-[#212121]"
        >
          Reviews
        </Link>
        <Link
          onClick={handleLinkClick}
          href="/blog"
          className="block py-1.5 px-2 text-[14px] font-[400] text-[#212121]"
        >
          Blogs
        </Link>
        <Link
          onClick={handleLinkClick}
          href="/mental-health"
          className="block py-1.5 px-2 text-[14px] font-[400] text-[#212121]"
        >
          Mental Health
        </Link>
      </div>
    </div>
  );
};

export default MorePages;
