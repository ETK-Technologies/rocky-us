import React from "react";
import Link from "next/link";

const Breadcrumb = ({ displayCity }) => {
  return (
    <div className="flex items-center mb-6 text-sm text-[#000000B8]">
      <Link
        href="/"
        className="text-[#000000B8] text-sm font-[450] subheaders-font leading-[140%]"
      >
        HOME
      </Link>
      <span className="mx-2 text-gray-400">/</span>
      <span className="text-gray-400 text-sm font-[450] subheaders-font leading-[140%]">
        {displayCity.toUpperCase()}
      </span>
    </div>
  );
};

export default Breadcrumb;