"use client";

import { useRef } from "react";
import ScrollArrows from "../ScrollArrows";
import HairProductCard from "./HairProductCard";

const products = [
  {
    id: "96913",
    label: "Most Popular",
    bestFor: ["Stopping Hair Loss", "Regrowing Hair"],
    benefits: [
      "Clinically proven to prevent hair loss and stimulate hair growth.",
      "See results in 3 months.",
      "Easy-to-use foam ensures targeted treatment and fewer side effects than pills.",
    ],
    image:
      "https://myrocky.b-cdn.net/WP%20Images/Hair%20Loss/2-in-1-Growth-Plan.png",
    badge: "https://myrocky.b-cdn.net/WP%20Images/Hair%20Loss/mask-group.png",
    title: "2 in 1 Growth Plan",
    description: "Finasteride 0.5% & Minoxidil 5% Foam",
    tooltip:
      "A prescription hair loss treatment, our topical finasteride and minoxidil foam is a dual-action solution promoting hair regrowth while curbing hair loss.",
    supply: "2 Months Supply",
    price: 135,
    addToCartLink:
      "/login-register/?onboarding=1&view=account&viewshow=login&consultation-required=1&onboarding-add-to-cart=96913",
  },
  {
    id: "6288",
    bestFor: ["Stopping Hair Loss", "Regrowing Hair"],
    benefits: [
      "Clinically proven to prevent hair loss and stimulate hair growth.",
      "See results in 3 months.",
      "Once-daily pill and topical solution.",
    ],
    image:
      "https://myrocky.b-cdn.net/WP%20Images/Hair%20Loss/The%20Growth%20Plan.png",
    badge: "https://myrocky.b-cdn.net/WP%20Images/Hair%20Loss/mask-group.png",
    title: "The Growth Plan",
    description: "Propecia (finasteride) Tablets and Minoxidil Solution",
    tooltip: "Daily prescription pill clinically proven to prevent hair loss.",
    supply: "3 Months Supply",
    price: 180,
    addToCartLink:
      "/login-register/?onboarding=1&view=account&viewshow=login&consultation-required=1&onboarding-add-to-cart=6288",
  },
  {
    id: "267",
    bestFor: ["Regrowing Hair"],
    benefits: [
      "No prescription required.",
      "Helps thicken and grow hair.",
      "Simple daily dropper application.",
    ],
    image:
      "https://myrocky.b-cdn.net/WP%20Images/Hair%20Loss/Back-On-Track.png",
    badge: "https://myrocky.b-cdn.net/WP%20Images/Hair%20Loss/mask-group.png",
    title: "Back On Track",
    description: "Minoxidil 5% Topical Solution",
    tooltip:
      "Topical formula that promotes hair regrowth for a fuller head of hair.",
    supply: "3 Months Supply",
    price: 101.25,
    regularPrice: 135,
    addToCartLink:
      "/login-register/?onboarding=1&view=account&viewshow=login&consultation-required=1&onboarding-add-to-cart=267",
  },
  {
    id: "263",
    bestFor: ["Stopping Hair Loss"],
    benefits: [
      "Stops hair loss from worsening.",
      "Just one pill a day.",
      "Great for long-term hair care.",
    ],
    image:
      "https://myrocky.b-cdn.net/WP%20Images/Hair%20Loss/Not-on-my-watch.png",
    badge: "https://myrocky.b-cdn.net/WP%20Images/Hair%20Loss/mask-group.png",
    title: "Not On My Watch",
    description: "Finasteride (Propecia) Tablets",
    tooltip: "Daily prescription pill clinically proven to prevent hair loss.",
    supply: "3 Months Supply",
    price: 123.75,
    addToCartLink:
      "/login-register/?onboarding=1&view=account&viewshow=login&consultation-required=1&onboarding-add-to-cart=263",
  },
];

const HairProducts = () => {
  const scrollContainerRef = useRef(null);

  return (
    <>
      <div className="text-start mb-[23px] md:mb-[31px]">
        <h2 className="text-[32px] md:text-[48px] leading-[36.8px] md:leading-[53.52px] font-[550] tracking-[-0.01em] md:tracking-[-0.02em] headers-font mb-23 md:mb-[16px]">
          Choose Your Plan
        </h2>
        <p className="text-[18px] md:text-[20px] leading-[25.2px] md:leading-[30px] font-[400] ">
          Pause or cancel at any time
        </p>
      </div>
      <div className="overflow-x-auto !no-scrollbar relative">
        <div className=" mx-auto ">
          <div className="relative">
            {/* <ScrollArrows scrollContainerRef={scrollContainerRef} /> */}

            <div ref={scrollContainerRef} className=" max-w-[384px] mx-auto">
              {products
                .filter((product) => product.id === "96913")
                .map((product, index) => (
                  <HairProductCard key={index} {...product} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HairProducts;
