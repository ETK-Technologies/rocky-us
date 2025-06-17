import { memo } from "react";
import Image from "next/image";

const HeroSection = memo(() => (
  <div className="w-full md:w-1/2 bg-[#A68B76] relative flex items-center justify-center p-8 rounded-l-lg">
    <div className="absolute inset-0 z-0 rounded-l-lg overflow-hidden">
      <Image
        src="/ed-prelander-5/prelanderBg.jpg"
        alt="Rocky treatment package"
        fill
        className="object-cover object-center"
        priority
      />
    </div>
    <div className="relative z-10 text-white max-w-md mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4 leading-tight">
        Trusted Treatments For Better Sex
      </h1>
      <p className="text-lg mb-6">
        Personalised ED treatment options approved by licensed
        providers—delivered discreetly.
      </p>
    </div>
  </div>
));
HeroSection.displayName = "HeroSection";

export default HeroSection;
