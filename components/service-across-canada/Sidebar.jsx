import React from "react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="overflow-hidden bg-gradient-to-b from-[#E2DCD5] from-[10%] to-[#F8F5F1] to-[100%] rounded-2xl shadow-md h-fit p-6 md:min-w-[304px]">
      <div className="flex justify-center mb-4">
        <Image
          src="/services/ed-pills.png"
          alt="ED Pills"
          width={246}
          height={224}
          className="object-contain"
        />
      </div>
      <h3 className="mb-3 text-xl font-[550] headers-font">
        Get Stronger Erections
      </h3>

      <p className="mb-6 text-[#000000B8] text-sm font-normal">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>

      <Link
        href="/faqs"
        className="block py-3 w-full font-medium text-center text-white bg-black rounded-lg transition-colors hover:bg-gray-800"
      >
        Get Started →
      </Link>
    </div>
  );
};

export default Sidebar;
