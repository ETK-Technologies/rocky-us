import React from "react";
import Image from "next/image";

const DecorativeImage = ({ src, alt }) => (
  <div className="my-10 ml-12 relative md:w-[560] h-[150px] md:h-[300px] overflow-hidden rounded-2xl">
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
);

export default DecorativeImage;
