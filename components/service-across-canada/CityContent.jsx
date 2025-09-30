import React from "react";
import Link from "next/link";

const CityContent = ({ cityInfo, displayCity }) => {
  return (
    <div className="md:col-span-2">
      <p className="mb-6 text-[#000000] text-lg leading-[150%]">
        {cityInfo.description}
      </p>

      <h2 className="mb-4 text-2xl md:text-[40px] font-[550] headers-font">
        Order ED Medication in {displayCity}, USA
      </h2>

      {["orderInfo", "processInfo", "deliveryInfo", "educationInfo"].map(
        (infoType) => (
          <p
            key={infoType}
            className="mb-6 text-[#000000] text-lg leading-[150%]"
          >
            {cityInfo[infoType]}
          </p>
        )
      )}

      <h2 className="mb-4 text-2xl md:text-[32px] font-[550] headers-font">
        Buy Viagra or Cialis in {displayCity} From Your Home
      </h2>

      <p className="mb-6 text-[#000000] text-lg leading-[150%]">
        {cityInfo.buyFromHome}
      </p>

      <h2 className="mb-4 text-2xl md:text-[32px] font-[550] headers-font">
        ED Medication Locally in USA From Coast to Coast
      </h2>

      <p className="text-[#000000] text-lg leading-[150%]">
        Rocky's ED products are available across USA in{" "}
        <Link
          href="/service-across-USA/toronto"
          className="text-[#8B4513] underline"
        >
          Toronto
        </Link>
        ,{" "}
        <Link
          href="/service-across-USA/calgary"
          className="text-[#8B4513] underline"
        >
          Calgary
        </Link>
        ,{" "}
        <Link
          href="/service-across-USA/edmonton"
          className="text-[#8B4513] underline"
        >
          Edmonton
        </Link>
        ,{" "}
        <Link
          href="/service-across-USA/ottawa"
          className="text-[#8B4513] underline"
        >
          Ottawa
        </Link>
        ,{" "}
        <Link
          href="/service-across-USA/halifax"
          className="text-[#8B4513] underline"
        >
          Halifax
        </Link>
        ,{" "}
        <Link
          href="/service-across-USA/vancouver"
          className="text-[#8B4513] underline"
        >
          Vancouver
        </Link>
        , and many more! Browse our products and enhance your sexual health
        today.
      </p>
    </div>
  );
};

export default CityContent;
