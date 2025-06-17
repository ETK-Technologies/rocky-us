import React from "react";
import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[666px] rounded-2xl overflow-hidden mb-8">
      <Image
        src="/services/ed-medication-display.png"
        alt="ED Medication display"
        fill
        className="object-cover"
        quality={100}
        priority
      />
    </div>
  );
};

export default HeroImage;