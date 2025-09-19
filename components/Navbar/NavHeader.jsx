import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import DesktopIcons from "./DesktopIcons";

const NavHeader = ({
  menuScrollRef,
  selectedTreatment,
  handleToggle,
  token,
  nameToShow,
  setSelectedTreatment,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (menuScrollRef.current) {
        setScrolled(menuScrollRef.current.scrollTop > 0);
      }
    };

    const ref = menuScrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
    }

    return () => {
      if (ref) ref.removeEventListener("scroll", handleScroll);
    };
  }, [menuScrollRef]);

  return (
    <div
      className={`flex items-center justify-between sticky top-0 bg-white z-50 px-[24px] md:px-10 pt-[24px] md:pt-10 pb-4 ${
        scrolled ? "shadow-custom" : ""
      }`}
    >
      {selectedTreatment ? (
        <button
          onClick={() => setSelectedTreatment(null)}
          className=" rounded-full hover:bg-gray-100"
          aria-label="Back to menu"
        >
          <IoArrowBack size={24} />
        </button>
      ) : (
        <span className="headers-font text-[24px] md:text-[32px]">Menu</span>
      )}
      <div className="flex items-center ">
        <DesktopIcons
          token={token}
          nameToShow={nameToShow}
          handleToggle={handleToggle}
        />
        <button
          onClick={handleToggle}
          className="text-black focus:outline-none z-50 p-2 hover:bg-[#F5F4EF] hover:rounded-full"
          aria-label="Toggle menu"
        >
          <IoClose size={24} />
        </button>
      </div>
    </div>
  );
};

export default NavHeader;
