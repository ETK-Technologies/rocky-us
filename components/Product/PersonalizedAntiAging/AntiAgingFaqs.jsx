import FaqsSection from "@/components/FaqsSection";
const faqs = [
  {
    question: "How does this cream help with anti-aging?",
    answer:
      "This dermatologist-formulated cream combines tretinoin to accelerate cell turnover and stimulate collagen production, with ascorbic acid to brighten skin, fade discolouration, and protect against environmental damage, working together to smooth and firm skin.",
  },
  {
    question: "When will I start seeing results?",
    answer:
      "Some people notice smoother, brighter skin in 4–6 weeks, but the most visible improvements typically appear after 12 weeks of consistent use.",
  },
  {
    question: "Can I use it every night?",
    answer:
      "If you’re new to tretinoin, start with 2–3 nights per week to allow your skin to adjust, then increase frequency as tolerated. Your provider may give you a schedule tailored to your skin’s needs.",
  },
  {
    question: "Will it cause irritation or peeling?",
    answer:
      "Mild dryness, flaking, or redness can be common at first. This is a normal part of the skin renewal process and usually improves as your skin adjusts. Using a gentle cleanser and moisturizer can help.",
  },

  {
    question: "Can I use other skincare products with it?",
    answer:
      "Yes, keep your routine simple and gentle. Avoid layering other strong ingredients (like AHAs, BHAs, or exfoliating scrubs) unless directed by your provider. Always use sunscreen during the day.",
  },

  {
    question: "Can I apply it to my neck or chest?",
    answer:
      "Yes, but start slowly and monitor for irritation, as the skin on the neck and chest can be more sensitive than the face. Use a pea-sized amount for each area and follow with moisturizer.",
  },

  {
    question: "Can I use this if I’m pregnant or breastfeeding?",
    answer:
      "Tretinoin is not recommended during pregnancy or while breastfeeding. Speak with your healthcare provider about safe alternatives before using this product.",
  },
];

const AntiAgingFaqs = ({ faqs: dynamicFaqs }) => {
  // Use dynamic FAQs if provided, otherwise use default FAQs
  const faqsToUse = dynamicFaqs || faqs;

  return (
    <>
      <FaqsSection
        faqs={faqsToUse}
        title={"Your Questions, Answered"}
        name={"Meet Personalized anti-aging cream"}
        subtitle={"Frequently asked questions"}
        isFirstCardOpen={true}
      />
    </>
  );
};

export default AntiAgingFaqs;
