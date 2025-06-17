"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";

const SearchIcon = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const inputRef = useRef(null);
  const InputDivRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue)}`);
      setSearchOpen(false);
      setSearchValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    } else if (e.key === "Escape") {
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        InputDivRef.current &&
        !InputDivRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <div className="flex items-center">
      <button
        onClick={() => setSearchOpen(true)}
        className="focus:outline-none"
        aria-label="Search"
        suppressHydrationWarning
      >
        <CiSearch size={24} />
      </button>

      {searchOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center">
          <div className="w-full max-w-xl mx-auto px-4">
            <div
              ref={InputDivRef}
              className="bg-white shadow-md rounded-md p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Search</h3>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="focus:outline-none"
                  aria-label="Close search"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <input
                ref={inputRef}
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <p className="text-sm text-gray-500 mt-2">
                Hit enter to search or ESC to close
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchIcon;
