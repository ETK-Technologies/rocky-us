"use client";
import { useState, useEffect } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";

import Link from "next/link";
import Image from "next/image";
import MorePages from "./MorePages";

const MobileMenu = ({ menuItems, displayName, token }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // Track open menu index

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index); // Toggle open menu
  };

  const ProfileIcon = ({ setIsOpen }) => {
    const [isProfileItemOpen, setIsProfileItemOpen] = useState(false);

    // Determine the display name with the same fallback logic as desktop
    let nameToShow = displayName;
    if (!nameToShow && typeof window !== "undefined") {
      const userName = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userName="))
        ?.split("=")[1];
      const userEmail = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userEmail="))
        ?.split("=")[1];

      if (userName) {
        nameToShow = decodeURIComponent(userName).split(" ")[0];
      } else if (userEmail) {
        const decodedEmail = decodeURIComponent(userEmail);
        nameToShow =
          decodedEmail.length > 15
            ? decodedEmail.substring(0, 12) + "..."
            : decodedEmail;
      } else {
        nameToShow = "Guest";
      }
    }

    return (
      <>
        {token ? (
          <div className="border-b pb-2">
            <button
              className="px-5 text-black font-semibold hover:text-gray-500 w-full flex items-center justify-between"
              onClick={() => setIsProfileItemOpen(!isProfileItemOpen)}
            >
              <p>Hi, {nameToShow}!</p>

              <span
                className={`transform transition-transform duration-300 ${
                  isProfileItemOpen ? "rotate-[270deg] mb-2" : "rotate-[90deg]"
                }`}
              >
                &gt;
              </span>
            </button>
            {isProfileItemOpen && (
              <div className="pl-4">
                <button
                  onClick={() => goToProfile()}
                  className="block px-4 py-1 text-gray-700 hover:bg-slate-200 hover:text-black w-full text-start"
                >
                  My Account
                </button>

                <form action="/api/logout" method="POST">
                  <button
                    // onClick={() => setIsOpen(false)}
                    className="block px-4 py-1 text-gray-700 hover:bg-slate-200 hover:text-black w-full text-start"
                  >
                    Logout
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between pl-5 pr-3.5 py-2 border-b border-solid">
            <Link
              className="headers-font"
              href="/login-register?viewshow=login"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>

            <CiUser size={22} />
          </div>
        )}
      </>
    );
  };

  const goToProfile = () => {
    window.location.href = "/my-account";
  };

  return (
    <div className="md:hidden flex items-center">
      {/* Burger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-black focus:outline-none "
        aria-label="Toggle mobile menu"
      >
        {isOpen ? (
          <IoClose className="text-2xl" />
        ) : (
          <FiAlignJustify className="text-2xl" />
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute -left-5 top-[67px] w-[calc(100%+40px)] min-h-screen max-h-screen overflow-y-auto bg-white z-50 pb-64">
          {/* Profile Icon */}
          <ProfileIcon setIsOpen={setIsOpen} />
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.text}
              item={item}
              isOpen={openMenu === index}
              toggleMenu={() => toggleMenu(index)}
              setIsOpen={setIsOpen}
            />
          ))}
          <MorePages setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
};

export default MobileMenu;

const MenuItem = ({ item, isOpen, toggleMenu, setIsOpen }) => {
  return (
    <div className="group px-5 py-2">
      {item.withoutMegaMenu ? (
        <Link
          href={item.link}
          className="text-black font-semibold hover:text-gray-500 w-full flex items-center justify-between"
          onClick={() => setIsOpen(false)}
          prefetch={true}
        >
          <p>{item.text}</p>
        </Link>
      ) : (
        <button
          onClick={toggleMenu}
          className="text-black font-semibold hover:text-gray-500 w-full flex items-center justify-between"
        >
          <p>{item.text}</p>
          <span
            className={`transform transition-transform duration-300 ${
              isOpen ? "rotate-[270deg]" : "rotate-90"
            }`}
          >
            &gt;
          </span>
        </button>
      )}
      {!item.withoutMegaMenu && isOpen && (
        <MegaMenu item={item} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

const MegaMenu = ({ item, setIsOpen }) => {
  return (
    <div className="py-5">
      {item.mainText && (
        <p className="text-[14px] font-[500] mb-5 leading-[15.4px] headers-font">
          <Link
            href={item.mainLink}
            onClick={() => setIsOpen(false)}
            prefetch={true}
          >
            {item.mainText}
          </Link>
        </p>
      )}
      <ul className="mt-2">
        {item.sections?.map((section, index) => (
          <div
            key={`${section.title || section.name || "section"}-${index}`}
            className={`${section.title ? "mt-7" : ""}`}
          >
            {section.title && (
              <h2 className="uppercase text-[12px] font-[600] mb-3 text-[#454545]">
                {section.title}
              </h2>
            )}
            {section.products.map((product, productIndex) => (
              <li
                key={`${product.name}-${productIndex}`}
                className="py-1.5 text-[14px] font-[400] text-[#212121]"
              >
                <Link
                  href={product.link}
                  onClick={() => setIsOpen(false)}
                  prefetch={true}
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </div>
        ))}
      </ul>
      {item.getStartedLink && (
        <div className="">
          <h2 className="text-[12px] font-[600]  mb-5 border-hover text-[#454545]">
            <Link
              onClick={() => setIsOpen(false)}
              href={item.getStartedLink}
              prefetch={true}
            >
              GET STARTED
            </Link>
          </h2>
          <div
            className="relative rounded-[16px] overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 26.27%)",
            }}
          >
            <p className="absolute !z-[9999] p-4 text-[18px] font-[450] text-[#ffffff] headers-font">
              {item.getStartedText}
            </p>
            <Link
              prefetch={true}
              onClick={() => setIsOpen(false)}
              href={item.getStartedLink}
              className="absolute !z-[99999] bg-white p-3 flex items-center justify-center rounded-full bottom-4 left-4"
            >
              <FaArrowRightLong />
            </Link>
            <div className="relative w-full h-[266px]">
              <div
                className="absolute left-0 bottom-0 w-full h-full z-50"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 26.27%)",
                }}
              ></div>
              <Image
                className="w-full h-full object-cover"
                fill
                src={item.getStartedImage}
                alt="nav-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
