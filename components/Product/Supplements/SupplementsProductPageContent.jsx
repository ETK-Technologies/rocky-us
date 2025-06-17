"use client";

import Section from "@/components/utils/Section";
import dynamic from "next/dynamic";
import SupplementsProductDetails from "./SupplementsProductDetails";
import ImagesSection from "@/components/Supplements/ImagesSection";
import NightBoost from "@/components/Supplements/NightBoost";
import Recommended from "@/components/Supplements/Recommended";
import ComparingTable from "@/components/Supplements/ComparingTable";
import { memo, useState, useEffect } from "react";

// Dynamic imports for non-critical sections
const DynamicReviewsSection = dynamic(
  () => import("@/components/ReviewsSection"),
  {
    loading: () => (
      <div className="min-h-[300px] bg-[#F5F4EF] animate-pulse"></div>
    ),
    ssr: false,
  }
);

const DynamicHomeFaqsSection = dynamic(
  () => import("@/components/HomePage/HomeFaqsSection"),
  {
    loading: () => <div className="min-h-[200px] animate-pulse"></div>,
    ssr: false,
  }
);

const SupplementsProductPageContent = memo(({ clientProps, faqs }) => {
  const { product, variations, isLoading } = clientProps;
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loadingRecommended, setLoadingRecommended] = useState(false);

  // Fallback product slugs when no related products are available
  const fallbackProductSlugs = [
    "essential-gut-relief",
    "essential-mood-balance",
    "essential-night-boost",
  ];

  // Fetch recommended products based on related_ids
  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      // Always set loading to true initially
      setLoadingRecommended(true);

      try {
        const response = await fetch("/api/products/recommended", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productIds: product?.related_ids || [],
            fallbackSlugs: fallbackProductSlugs,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.products) {
            setRecommendedProducts(data.products);
          } else {
            console.error("Failed to fetch recommended products:", data.error);
            setRecommendedProducts([]);
          }
        } else {
          console.error("API request failed:", response.statusText);
          setRecommendedProducts([]);
        }
      } catch (error) {
        console.error("Error fetching recommended products:", error);
        setRecommendedProducts([]);
      } finally {
        setLoadingRecommended(false);
      }
    };

    fetchRecommendedProducts();
  }, [product?.related_ids]);

  // Define FAQs for different supplement products
  const getProductFAQs = () => {
    const productName = product?.name || "";
    const slug = product?.slug || "";

    // Hair Growth Support FAQs
    if (
      productName.toLowerCase().includes("hair growth") ||
      productName.toLowerCase().includes("hair-growth") ||
      slug.includes("hair-growth-support")
    ) {
      return [
        {
          question: "How do I take Hair Support?",
          answer:
            "Simply take 1 capsule twice daily with water. With 60 veggie capsules per bottle, you're set for a one-month journey to healthier hair.",
        },
        {
          question: "Is Hair Support suitable for vegetarians?",
          answer:
            "Absolutely! Andropecia Hair Support is formulated with veggie capsules and plant based ingredients, making it perfect for vegetarians.",
        },
        {
          question: "Can women use Hair Support?",
          answer:
            "Hair Support is designed specifically for men's hair health and is not intended for use by women.",
        },
        {
          question: "Are there any side effects?",
          answer:
            "Hair Support is generally well-tolerated. However, it's best to consult a healthcare professional before starting any new supplement.",
        },
        {
          question: "Will Hair Support regrow my hair?",
          answer:
            "Hair Support is designed to support hair health and growth. Results may vary, but it can contribute to fuller, healthier hair.",
        },
        {
          question:
            "Can I use Hair Support with other medications or supplements?",
          answer:
            "If you're taking other medications or supplements, consult your healthcare professional before combining them with Hair Support.",
        },
        {
          question: "How long until I see results?",
          answer:
            "Results may vary, but many start noticing positive changes within three months of consistent use.",
        },
        {
          question: "Do I have to take Hair Support with food?",
          answer:
            "Hair Support can be taken with or without food, based on your preference.",
        },
      ];
    }

    // Testosterone Support FAQs
    if (
      productName.toLowerCase().includes("testosterone") ||
      productName.toLowerCase().includes("t-boost") ||
      slug.includes("testosterone-support")
    ) {
      return [
        {
          question: "How do I take Essential T-Boost?",
          answer:
            "Take 1 capsule, twice daily of Essential T-Boost with water. Each bottle contains 60 vegan capsules, providing a one-month supply.",
        },
        {
          question: "Is Essential T-Boost suitable for vegetarians?",
          answer:
            "Yes, Testosterone support is formulated with vegan capsules and is suitable for vegetarians.",
        },
        {
          question: "Can women use Essential T-Boost?",
          answer:
            "Essential T-Boost is specifically designed to support healthy testosterone levels in men and is not intended for use by women.",
        },
        {
          question:
            "Are there any side effects associated with Essential T-Boost?",
          answer:
            "Essential T-Boost is generally well-tolerated. However, as with any dietary supplement, individual responses may vary. It is always recommended to consult with a healthcare professional before starting any new supplement.",
        },
        {
          question: "Will Essential T-Boost increase muscle mass?",
          answer:
            "While Essential T-Boost may support muscle strength and vitality, it is not intended as a muscle-building supplement. Its primary focus is to support healthy testosterone levels and overall well-being.",
        },
        {
          question:
            "Can I use Essential T-Boost with other medications or supplements?",
          answer:
            "If you are taking any medications or other supplements, it's essential to consult with your healthcare professional before using Essential T-Boost to ensure there are no potential interactions.",
        },
        {
          question: "How long should I use Essential T-Boost to see results?",
          answer:
            "Individual responses may vary, but noticeable effects may be observed within a few weeks of consistent use. For optimal results, we recommend using Essential T-Boost as part of a healthy lifestyle and supplement regimen.",
        },
        {
          question: "Can Essential T-Boost be taken with food?",
          answer:
            "Essential T-Boost can be taken with or without food, depending on individual preferences. However, taking it with water may aid in faster absorption.",
        },
        {
          question: "Is Essential T-Boost Health-Canada Approved?",
          answer:
            "Yes- we are proud to offer supplements to our customers which are Health-Canada approved. This way we can guarantee safety & efficacy, and stand behind our product.",
        },
        {
          question:
            "Does Essential T-Boost have a Natural Product Number (NPN)?",
          answer: "Yes- the NPN for Essential T-Boost is 80059283.",
        },
      ];
    }

    // Default FAQs for other supplements
    return [
      {
        question: "How should I take this supplement?",
        answer:
          "Follow the directions on the product label or consult with your healthcare professional for personalized guidance.",
      },
      {
        question: "Are there any side effects?",
        answer:
          "This supplement is generally well-tolerated. However, consult your healthcare professional before starting any new supplement.",
      },
      {
        question: "How long until I see results?",
        answer:
          "Results may vary by individual. Many people notice positive changes within a few weeks to months of consistent use.",
      },
    ];
  };

  // Define content for different supplement products
  const getProductContent = () => {
    const productName = product?.name || "";
    const slug = product?.slug || "";

    // Essential Night Boost content
    if (
      productName.toLowerCase().includes("night boost") ||
      slug.includes("essential-night-boost")
    ) {
      return {
        imageSlider: [
          {
            path: "/supplements/S1.jpg",
            title: "Fall Asleep with Ease",
            description:
              "Helps you unwind and drift off naturally, without drowsiness.",
          },
          {
            path: "/supplements/S2.jpg",
            title: "Wake Up Clear & Energized",
            description:
              "Helps you unwind and drift off naturally, without drowsiness.",
          },
          {
            path: "/supplements/S3.jpg",
            title: "Gentle & Non-Habit Forming",
            description:
              "Supports your natural sleep cycle without dependency.",
          },
        ],
        ingredients: {
          title: "Essential Night Boost Ingredients Explained.",
          description: "Essential Night Boost uses top ingredients.",
          img: "/supplements/night_img.jpg",
          bullets: [
            {
              title: "L-Theanine",
              desc: "Promotes relaxation without drowsiness",
            },
            {
              title: "Magnesium Bisglycinate",
              desc: "Supports muscle relaxation and nervous system health",
            },
            {
              title: "GABA (Gamma-Aminobutyric Acid)",
              desc: "Helps calm the mind and reduce stress",
            },
            {
              title: "Glycine",
              desc: "Improves sleep quality and cognitive function",
            },
            {
              title: "Inositol",
              desc: "Supports mood balance and serotonin activity",
            },
          ],
        },
        comparison: {
          title: "Why Essential Night Boost",
          secTitle: "Melatonin Only",
          thirdTitle: "Prescription Sleep Aids",
          features: [
            "Gentle & Non-Habit Forming",
            "Supports Natural Sleep Cycle",
            "No Morning Grogginess",
            "Safe for Long-Term Use",
            "Doesn't contain Additives or Chemicals",
          ],
          productCol: [true, true, true, true, true],
          competitorCol1: [true, false, false, false, true],
          competitorCol2: [false, false, false, false, false],
        },
      };
    }

    // Essential Mood Balance content
    if (
      productName.toLowerCase().includes("mood balance") ||
      productName.toLowerCase().includes("mood boost") ||
      slug.includes("essential-mood-balance")
    ) {
      return {
        imageSlider: [
          {
            path: "/supplements/S4.jpg",
            title: "Reduces Daily Stress",
            description: "Helps you feel more in control and less overwhelmed.",
          },
          {
            path: "/supplements/S5.jpg",
            title: "Promotes Emotional Stability",
            description: "Supports a steady, balanced mood throughout the day.",
          },
          {
            path: "/supplements/S6.jpg",
            title: "Eases Anxiety Naturally",
            description:
              "Helps calm racing thoughts and tension without harsh effects.",
          },
        ],
        ingredients: {
          title: "Essential Mood Boost Ingredients Explained.",
          description: "Essential Mood Boost uses top ingredients.",
          img: "/supplements/mood_image.jpg",
          bullets: [
            {
              title: "Ashwagandha",
              desc: "Powerful adaptogenic herb that helps your body manage stress and restore balance. Trusted for centuries in Ayurvedic medicine, it supports emotional well-being by reducing anxiety, improving mood, and promoting a calm, focused state of mind—naturally and without side effects.",
            },
          ],
        },
        comparison: {
          title: "Why Essential Mood Boost",
          secTitle: "Other supplements",
          thirdTitle: "",
          features: [
            "Made in Canada",
            "Third party tested for purity",
            "No Drowsiness",
            "Non GMO without fillers",
            "Non-Habit Forming",
          ],
          productCol: [true, true, true, true, true],
          competitorCol1: [false, false, true, false, true],
          competitorCol2: [],
        },
      };
    }

    // Essential Gut Relief content
    if (
      productName.toLowerCase().includes("gut relief") ||
      slug.includes("essential-gut-relief")
    ) {
      return {
        imageSlider: [
          {
            path: "/supplements/S7.jpg",
            title: "Relieves Bloating Fast",
            description: "Helps reduce that heavy, gassy feeling after meals.",
          },
          {
            path: "/supplements/S8.jpg",
            title: "Eases Indigestion",
            description:
              "Targets common symptoms like cramping, pressure, and fullness.",
          },
          {
            path: "/supplements/S9.jpg",
            title: "Supports Healthy Digestion",
            description: "Supports liver health and smoother digestion.",
          },
        ],
        ingredients: {
          title: "Essential Gut Relief Ingredients Explained.",
          description: "Essential Gut Relief uses premium ingredients.",
          img: "/supplements/rel_image.jpg",
          bullets: [
            {
              title: "Premium Digestive Blend",
              desc: "A carefully crafted combination of natural ingredients designed to support healthy digestion, reduce bloating, and promote gut comfort. Our formula works gently to restore digestive balance and improve overall gastrointestinal health.",
            },
          ],
        },
        comparison: {
          title: "Why Essential Gut Relief",
          secTitle: "Traditional Over-the-Counter Remedies",
          thirdTitle: "",
          features: [
            "Long-Term Digestive Support",
            "Supports Overall Digestion",
            "Addresses Root Causes",
            "Multi-Symptom Relief",
            "Natural and quality tested",
          ],
          productCol: [true, true, true, true, true],
          competitorCol1: [false, false, false, false, false],
          competitorCol2: [],
        },
      };
    }

    // Hair Growth Support content
    if (
      productName.toLowerCase().includes("hair growth") ||
      productName.toLowerCase().includes("hair-growth") ||
      slug.includes("hair-growth-support")
    ) {
      return {
        imageSlider: [
          {
            path: "/supplements/hair1.jpg",
            title: "Strength That Lasts",
            description:
              "Reinforces strands to reduce breakage and boost thickness.",
          },
          {
            path: "/supplements/hair2.jpg",
            title: "Fuel Fuller Growth",
            description:
              "Supports natural hair growth with key vitamins and botanicals.",
          },
          {
            path: "/supplements/hair3.jpg",
            title: "Nourish At The Root",
            description:
              "Feeds follicles with nutrients for a healthier scalp and resilient hair.",
          },
        ],
        ingredients: {
          title: "Essential Hair Growth Support Ingredients Explained.",
          description:
            "Essential Hair Growth Support uses premium ingredients.",
          img: "/supplements/hair_img.jpg",
          bullets: [
            {
              title: "Biotin",
              desc: "Supports hair structure and promotes healthy hair growth",
            },
            {
              title: "Collagen Peptides",
              desc: "Provides building blocks for strong, healthy hair strands",
            },
            {
              title: "Saw Palmetto",
              desc: "Helps maintain healthy hair follicles and natural hair growth cycle",
            },
            {
              title: "Iron",
              desc: "Essential mineral for healthy hair growth and preventing hair loss",
            },
          ],
        },
        comparison: {
          title: "Why Essential T-Boost",
          secTitle: "Typical Boosters",
          thirdTitle: null,
          features: [
            "Natural Energy Boost",
            "Ayurvedic Formula",
            "Libido + Desire Support",
            "Clean, Plant-Based Ingredients",
            "Daily Hormonal Balance",
          ],
          productCol: [true, true, true, true, true],
          competitorCol1: [false, false, true, true, false],
          competitorCol2: [],
        },
      };
    }

    // Testosterone Support content
    if (
      productName.toLowerCase().includes("testosterone") ||
      productName.toLowerCase().includes("t-boost") ||
      slug.includes("testosterone-support")
    ) {
      return {
        imageSlider: [
          {
            path: "/supplements/testosterone1.jpg",
            title: "Unlock Lasting Energy",
            description:
              "Stay energized with natural ingredients that fight fatigue and boost stamina.",
          },
          {
            path: "/supplements/testosterone2.jpg",
            title: "Ignite Your Drive",
            description:
              "Enhance libido and performance with time-tested Ayurvedic aphrodisiacs.",
          },
          {
            path: "/supplements/testosterone3.jpg",
            title: "Balance Testosterone Naturally",
            description:
              "Support healthy hormone levels for improved mood, strength, and vitality.",
          },
        ],
        ingredients: {
          title: "Essential T-Boost Ingredients Explained.",
          description: "Essential T-Boost uses only premium ingredients.",
          img: "/supplements/testosterone_img.jpg",
          bullets: [
            {
              title: "Coenzyme Q10",
              desc: "Supports heart health and cellular energy",
            },
            {
              title: "Maca (Lepidium Meyenii, Root)",
              desc: "Enhances energy, stamina, and libido",
            },
            {
              title: "Grape Seed Extract",
              desc: "Rich in antioxidants, promotes circulation and cell protection",
            },
            {
              title: "L-Arginine",
              desc: "Boosts blood flow and circulation",
            },
            {
              title: "Tribulus (Tribulus Terrestris, Fruit)",
              desc: "Supports testosterone levels and sexual health",
            },
          ],
        },
        comparison: {
          title: "Why Essential T-Boost",
          secTitle: "Typical Boosters",
          thirdTitle: "",
          features: [
            "Natural Energy Boost",
            "Ayurvedic Formula",
            "Libido + Desire Support",
            "Clean, Plant-Based Ingredients",
            "Daily Hormonal Balance",
          ],
          productCol: [true, true, true, true, true],
          competitorCol1: [false, false, false, false, false],
          competitorCol2: [],
        },
      };
    }

    // Default content for other supplements
    return {
      imageSlider: [
        {
          path: "/supplements/S1.jpg",
          title: "Natural & Effective",
          description: "Made with premium ingredients for optimal results.",
        },
        {
          path: "/supplements/S2.jpg",
          title: "Science-Backed Formula",
          description: "Developed by healthcare professionals.",
        },
        {
          path: "/supplements/S3.jpg",
          title: "Safe & Pure",
          description: "Third-party tested for quality and purity.",
        },
      ],
      ingredients: {
        title: `${productName} Ingredients Explained.`,
        description: `${productName} uses premium ingredients.`,
        img: "/supplements/night_img.jpg",
        bullets: [
          {
            title: "Premium Ingredients",
            desc: "Made with the highest quality natural ingredients",
          },
        ],
      },
      comparison: {
        title: `Why ${productName}`,
        secTitle: "Other supplements",
        thirdTitle: "",
        features: [
          "Made in Canada",
          "Third party tested for purity",
          "No Drowsiness",
          "Non GMO without fillers",
          "Non-Habit Forming",
        ],
        productCol: [true, true, true, true, true],
        competitorCol1: [false, false, true, false, true],
        competitorCol2: [],
      },
    };
  };

  const productContent = getProductContent();
  const productFAQs = getProductFAQs();

  // Early return for loading state
  if (!product && isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="min-h-[400px] animate-pulse bg-gray-100 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="supplements-product-page">
      {/* Hero Section with Product Details */}
      <SupplementsProductDetails
        product={product}
        variations={variations}
        isLoading={isLoading}
      />

      {/* Images Section */}
      <ImagesSection images={productContent.imageSlider} />

      {/* Ingredients Section */}
      <NightBoost
        title={productContent.ingredients.title}
        description={productContent.ingredients.description}
        img={productContent.ingredients.img}
        bullets={productContent.ingredients.bullets}
      />

      {/* Comparison Table */}
      <Section>
        <ComparingTable
          img={product?.images?.[0]?.src || "/supplements/product.png"}
          title={productContent.comparison.title}
          sec_title={productContent.comparison.secTitle}
          third_title={productContent.comparison.thirdTitle}
          f_col={productContent.comparison.features}
          sec_col={productContent.comparison.productCol}
          third_col={productContent.comparison.competitorCol1}
          fourth_col={productContent.comparison.competitorCol2}
        />
      </Section>

      {/* Recommended Products - Always show this section */}
      <Recommended
        products={recommendedProducts}
        isLoading={loadingRecommended}
      />

      {/* Reviews Section */}
      <Section bg="bg-[#F5F4EF]">
        <DynamicReviewsSection />
      </Section>

      {/* FAQs Section */}
      <Section>
        <DynamicHomeFaqsSection faqs={productFAQs} />
      </Section>
    </div>
  );
});

SupplementsProductPageContent.displayName = "SupplementsProductPageContent";

export default SupplementsProductPageContent;
