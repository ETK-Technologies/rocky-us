"use client";

import { useRef } from "react";
import ScrollArrows from "../ScrollArrows";
import EdProductCard from "./EdProductCard";
import CustomImage from "../utils/CustomImage";

const EdProducts = ({ showonly }) => {
  const scrollContainerRef = useRef(null);

  // Filter products based on the showonly parameter
  const getFilteredProducts = () => {
    const productsMap = {
      cialis: cialisProduct,
      viagra: viagraProduct,
      // chewalis: chewalisProduct,
      // variety: varietyPackProduct,
    };

    if (!showonly) {
      // If no filter is specified, show all products
      return [
        cialisProduct,
        viagraProduct,
        // chewalisProduct,
        // varietyPackProduct,
      ];
    }

    // Convert to lowercase for case-insensitive matching
    const filter = showonly.toLowerCase();

    // If the filter matches a product name, return only that product
    if (productsMap[filter]) {
      return [productsMap[filter]];
    }

    // If no match is found, return all products as fallback
    return [cialisProduct, viagraProduct, /* chewalisProduct, varietyPackProduct */];
  };

  const filteredProducts = getFilteredProducts();

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
      <div className="overflow-x-auto !no-scrollbar relative px-2 sm:px-4 md:px-0">
        <div className="mx-auto">
          <div className="relative">
            {/* Only show scroll arrows when there's more than one product */}
            {filteredProducts.length > 1 && (
              <ScrollArrows scrollContainerRef={scrollContainerRef} />
            )}

            <div
              ref={scrollContainerRef}
              className="flex gap-3 sm:gap-4 items-start justify-start md:justify-center snap-x snap-mandatory"
            >
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 min-w-[80vw] md:min-w-max snap-center"
                >
                  <EdProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-start mt-[32px] md:mt-[24px]">
        <div className="w-full md:w-[584px] ">
          <p className=" hidden lg:block text-[12px]  font-[400] text-[#212121]">
            In Canada, erectile dysfunction medications are available
            over-the-counter (OTC) and may be obtained after a prescription.
            This medication will ensure proper dosage for legal and medical
            guidelines within the country. An important note: this document must
            not change the correct products, treating, and proper advice that a
            licensed healthcare provider can use. A licensed healthcare team can
            be sure you are getting the right care and treatment.
          </p>
        </div>
        <div className="relative overflow-hidden mx-auto  md:mr-0 w-[315px] h-[48px] flex justify-center lg:justify-end mt-4 md:mt-0">
          <CustomImage src="/OCP-IMGS.webp" fill />
        </div>
      </div>
    </>
  );
};

export default EdProducts;

const cialisProduct = {
  name: "Cialis",
  tagline: '"The weekender"',
  image:
    "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/webp-images/RockyHealth-cialis-400px.webp",
  activeIngredient: "Tadalafil",
  strengths: ["10mg", "20mg"],
  preferences: ["generic", "brand"],
  frequencies: {
    "monthly-supply": "One Month",
    "quarterly-supply": "Three Months",
  },
  pillOptions: {
    "monthly-supply": [
      // {
      //   count: 4,
      //   genericPrice: 68,
      //   brandPrice: 90,
      //   variationId: "258",
      //   brandVariationId: "1421",
      // },
      {
        count: 8,
        genericPrice: 84,
        brandPrice: 170,
        variationId: "259",
        brandVariationId: "1422",
      },
      {
        count: 12,
        genericPrice: 126,
        brandPrice: 250,
        variationId: "1960",
        brandVariationId: "1962",
      },
    ],
    "quarterly-supply": [
      {
        count: 12,
        genericPrice: 126,
        brandPrice: 250,
        variationId: "260",
        brandVariationId: "1423",
      },
      {
        count: 24,
        genericPrice: 252,
        brandPrice: 490,
        variationId: "261",
        brandVariationId: "1424",
      },
      {
        count: 36,
        genericPrice: 378,
        brandPrice: 730,
        variationId: "1961",
        brandVariationId: "1420",
      },
    ],
  },
};

const viagraProduct = {
  name: "Viagra",
  tagline: '"The one-nighter"',
  image:
    "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/webp-images/RockyHealth-viagra-400px.webp",
  activeIngredient: "Sildenafil",
  strengths: ["50mg", "100mg"],
  preferences: ["generic", "brand"],
  frequencies: {
    "monthly-supply": "One Month",
    "quarterly-supply": "Three Months",
  },
  pillOptions: {
    "monthly-supply": [
      // {
      //   count: 4,
      //   genericPrice: 54,
      //   brandPrice: 70,
      //   variationId: "232",
      //   brandVariationId: "1427",
      // },
      {
        count: 8,
        genericPrice: 64,
        brandPrice: 130,
        variationId: "233",
        brandVariationId: "1428",
      },
      {
        count: 12,
        genericPrice: 96,
        brandPrice: 190,
        variationId: "234",
        brandVariationId: "1429",
      },
    ],
    "quarterly-supply": [
      {
        count: 12,
        genericPrice: 96,
        brandPrice: 190,
        variationId: "235",
        brandVariationId: "1430",
      },
      {
        count: 24,
        genericPrice: 192,
        brandPrice: 370,
        variationId: "236",
        brandVariationId: "1431",
      },
      {
        count: 36,
        genericPrice: 288,
        brandPrice: 550,
        variationId: "237",
        brandVariationId: "1432",
      },
    ],
  },
};

const chewalisProduct = {
  name: "Chewalis",
  tagline: '"The weekender"',
  image:
    "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/chewalis-ed.webp",
  activeIngredient: "Tadalafil",
  strengths: ["10mg", "20mg"],
  preferences: ["generic"],
  frequencies: {
    "monthly-supply": "One Month",
    "quarterly-supply": "Three Months",
  },
  pillOptions: {
    "monthly-supply": [
      // { count: 4, genericPrice: 74, brandPrice: 74, variationId: "219473" },
      { count: 8, genericPrice: 138, brandPrice: 138, variationId: "219484" },
      { count: 12, genericPrice: 202, brandPrice: 202, variationId: "278229" },
    ],
    "quarterly-supply": [
      { count: 12, genericPrice: 202, brandPrice: 202, variationId: "278230" },
      { count: 24, genericPrice: 394, brandPrice: 394, variationId: "278231" },
      { count: 36, genericPrice: 586, brandPrice: 586, variationId: "219488" },
    ],
  },
};

const varietyPackProduct = {
  name: "Cialis + Viagra",
  tagline: '"The Variety Pack"',
  image:
    "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/RockyHealth-variety-400px%20(1).webp",
  activeIngredient: "Tadalafil + Sildenafil",
  strengths: ["50mg & 100mg (Viagra)", "10mg & 20mg (Cialis)"],
  preferences: ["generic", "brand"],
  frequencies: {
    "monthly-supply": "One Month",
    "quarterly-supply": "Three Months",
  },
  pillOptions: {
    "monthly-supply": [
      // {
      //   count: "2/2",
      //   genericPrice: 61,
      //   brandPrice: 85,
      //   variationId: "3276,3275",
      //   brandVariationId: "3472,3468",
      // },
      {
        count: "4/4",
        genericPrice: 112,
        brandPrice: 160,
        variationId: "37669,37668",
        brandVariationId: "1421,1427",
      },
      {
        count: "6/6",
        genericPrice: 163,
        brandPrice: 235,
        variationId: "3440,3287",
        brandVariationId: "3471,3467",
      },
    ],
    "quarterly-supply": [
      {
        count: "6/6",
        genericPrice: 163,
        brandPrice: 235,
        variationId: "3439,3438",
        brandVariationId: "3470,3466",
      },
      {
        count: "12/12",
        genericPrice: 316,
        brandPrice: 440,
        variationId: "37673,37674",
        brandVariationId: "1423,1430",
      },
      {
        count: "18/18",
        genericPrice: 469,
        brandPrice: 685,
        variationId: "3442,3437",
        brandVariationId: "3469,3465",
      },
    ],
  },
};
