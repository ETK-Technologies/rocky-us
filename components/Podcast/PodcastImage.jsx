import React from "react";
import Image from "next/image";

const PodcastImage = () => {
  return (
    <div className="relative w-full md:w-2/4 mb-6 md:mb-0">
      <div className="relative mx-auto">
        <div className="relative hidden md:block">
          <Image
            src="/podcast/podcast-listener.jpg"
            alt="Man listening to podcast"
            width={572}
            height={696}
            priority
            className="mx-auto"
          />
        </div>
        <div className="relative md:hidden">
          <Image
            src="/podcast/podcast-listener.jpg"
            alt="Man listening to podcast"
            width={308}
            height={375}
            priority
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default PodcastImage;
