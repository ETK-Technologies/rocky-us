import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = ({href = "/ed-prequiz"}) => {
  return (
    <div className="flex items-center justify-between max-w-[1184px] mx-auto px-5 pt-2">
      <Image
        src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Rocky-TM_upscayl_2x.webp"
        alt="ED-5 Logo"
        width={100}
        height={100}
      />
      <Link
        href={href}
        className="py-2 px-4 rounded-full text-white bg-[#00B67A] hover:bg-[#00A06D] font-medium text-sm md:text-base transition-colors"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Header;
