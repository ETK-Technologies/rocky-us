"use client";

import { useEffect, useState } from "react";

const videoMapping = {
  ozempic: "https://myrocky.b-cdn.net/Exports/Ozempic_1.mp4",
  mounjaro:
    "https://myrocky.b-cdn.net/happy-couple-dancing-at-home-SBV-329115944-4K.mp4",
  wegovy:
    "https://myrocky.b-cdn.net/happy-couple-dancing-at-home-SBV-329115944-4K.mp4",
  rybelsus:
    "https://myrocky.b-cdn.net/happy-couple-dancing-at-home-SBV-329115944-4K.mp4",
};

const HowItWorksVideo = ({ productSlug }) => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const matchingProduct = Object.keys(videoMapping).find((key) =>
      productSlug?.toLowerCase().includes(key)
    );

    if (matchingProduct) {
      setVideoUrl(videoMapping[matchingProduct]);
    }
  }, [productSlug]);

  if (!videoUrl) return null;

  return (
    <video
      className="w-full h-full object-cover md:max-h-[500px] mt-10"
      autoPlay
      muted
      loop
      playsInline
      controls={false}
    >
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default HowItWorksVideo;
