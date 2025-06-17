import React from "react";
import SubscribeForm from "./SubscribeForm";
import PodcastSubscribeImage from "./PodcastSubscribeImage";
import SectionContainer from "./SectionContainer";

const PodcastSubscribe = () => {
  return (
    <SectionContainer
      bgColor="bg-[#F5F4EF]"
      paddingY="py-14 md:py-24"
      aria-label="Podcasts subscribe Section"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-20">
        <div className="flex flex-col gap-3 md:hidden order-1">
          <h2 className="text-3xl headers-font font-[550] md:font-semibold leading-[115%">
            Never Miss An Episode!
          </h2>
          <p className="text-base text-[#000000A6] mb-8">
            Stay updated with the latest episodes and health tips!
          </p>
        </div>
        <PodcastSubscribeImage />

        <SubscribeForm />
      </div>
    </SectionContainer>
  );
};

export default PodcastSubscribe;
