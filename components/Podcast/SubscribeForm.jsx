import React from "react";
import Image from "next/image";

const SubscribeForm = () => {
  return (
    <div className="md:w-1/2 md:order-2 order-3">
      <div className="hidden md:block">
        <h2 className="text-3xl headers-font font-medium mb-2 leading-[115%">
          Never Miss An Episode!
        </h2>
        <p className="text-base mb-6 text-[#000000A6]">
          Stay updated with the latest episodes and health tips!
        </p>
      </div>

      <form className="flex flex-col md:flex-row gap-3">
        <input
          type="email"
          placeholder="Enter your email address"
          className="px-6 py-3 text-[#00000080] text-sm placeholder:text-sm rounded-full border border-[#E2E2E1] w-full outline-none focus:outline-none  bg-white"
          aria-label="Email address"
          required
        />
        <button
          type="submit"
          className="bg-black text-white py-3 px-8 rounded-full flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all"
          aria-label="Subscribe to podcast updates"
        >
          <span className="text-sm font-medium">Subscribe</span>
          <Image
            src="/podcast/subscribe-arrow.svg"
            alt="Arrow right"
            width={16}
            height={16}
            className="w-4 h-4"
          />
        </button>
      </form>
    </div>
  );
};

export default SubscribeForm;
