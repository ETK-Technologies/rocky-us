import React from "react";
import Image from "next/image";

const PodcastSubscribeImage = () => {
  return (
    <div className="md:w-1/2 md:order-1 order-2">
      <div className="md:hidden w-full">
        <Image
          src="/podcast/podcast-subscribe.png"
          alt="Podcast host recording an episode"
          width={335}
          height={335}
          className="w-full h-auto"
        />
      </div>
      <div className="hidden md:block">
        <Image
          src="/podcast/podcast-subscribe.png"
          alt="Podcast host recording an episode"
          width={552}
          height={584}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default PodcastSubscribeImage;
