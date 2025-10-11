import FaqsSection from "@/components/FaqsSection";
const faqs = [
  {
    question: "How does this cream help with hyperpigmentation?",
    answer:
      "This dermatologist-formulated cream uses tretinoin to speed cell turnover, niacinamide to calm and protect skin, azelaic acid to fade discolouration, and kojic acid to block excess pigment, working together to brighten and even skin tone.",
  },
  {
    question: "When will I start seeing results?",
    answer:
      "You may notice a brighter, more even tone in 4–6 weeks, with significant fading of dark spots and discolouration typically visible by 8–12 weeks of consistent use.",
  },
  {
    question: "Can I use it every night?",
    answer:
      "If you’re new to tretinoin, start 2–3 nights per week and increase frequency as tolerated. Your provider may recommend a schedule based on your skin’s needs.",
  },
  {
    question: "Will it cause irritation?",
    answer:
      "Some dryness, flaking, or redness can occur in the first few weeks as your skin adjusts. This is normal and can be minimized by using a gentle cleanser, moisturizer, and daily SPF.",
  },
  {
    question: "Can I use other skincare products with it?",
    answer:
      "Yes, but avoid combining with other strong ingredients (like AHAs, BHAs, or other retinoids) unless directed by your provider. Keeping your routine simple will help avoid irritation.",
  },
  {
    question: "Can I apply it to my neck or other areas?",
    answer:
      "Yes, but start slowly and watch for irritation, as these areas can be more sensitive. Use a separate pea-sized amount for each area.",
  },
  {
    question: "Can I use this if I’m pregnant or breastfeeding?",
    answer:
      "Tretinoin is not recommended during pregnancy or breastfeeding. Speak to your healthcare provider for safe alternatives.",
  },
  {
    question: "Will my pigmentation come back if I stop using it?",
    answer:
      "Pigmentation can return over time if the underlying cause (like sun exposure or hormonal changes) is not addressed. Daily SPF use is key to maintaining your results.",
  },
  {
    question: " Can I use makeup over this treatment?",
    answer:
      "Yes, you can apply makeup in the morning after cleansing your skin. Just make sure your treatment cream is fully absorbed at night and your morning routine includes SPF.",
  },
  {
    question: " Is this safe for all skin tones?",
    answer:
      "Yes, the ingredients in this formula are safe and effective for all skin tones when used as directed. ",
  },
];

const HyperPigmentationFaqs = ({ faqs: dynamicFaqs }) => {
  // Use dynamic FAQs if provided, otherwise use default FAQs
  const faqsToUse = dynamicFaqs || faqs;

  return (
    <>
      <FaqsSection
        faqs={faqsToUse}
        title={"Your Questions, Answered"}
        name={"Meet Personalized Hyper-pigmentation cream"}
        subtitle={"Frequently asked questions"}
        isFirstCardOpen={true}
      />
    </>
  );
};

export default HyperPigmentationFaqs;
