import FaqsSection from "../FaqsSection";

const HairFaqs = () => {
  // FAQs data for the Hair Flow page
  const hairFaqs = [
    {
      question: "What causes hair loss?",
      answer:
        "Hair loss can be caused by genetics (male pattern baldness), hormonal changes, medical conditions, medications, stress, and certain hair treatments or styling practices. Male pattern baldness, the most common cause, is related to genetics and male hormones.",
    },
    {
      question: "How do hair loss medications work?",
      answer:
        "Medications like Finasteride (Propecia) work by blocking the conversion of testosterone to DHT, a hormone that contributes to hair loss. Minoxidil (Rogaine) works by increasing blood flow to the hair follicles and prolonging the growth phase of hair.",
    },
    {
      question:
        "How long does it take to see results with hair loss treatments?",
      answer:
        "Most hair loss treatments require at least 3-6 months of consistent use before noticeable results. Full results typically take 12 months or longer. It's important to be patient and consistent with treatment.",
    },
    {
      question: "Are there any side effects with hair loss medications?",
      answer:
        "Finasteride may cause sexual side effects in a small percentage of men, including decreased libido and erectile dysfunction. Minoxidil may cause scalp irritation, unwanted hair growth elsewhere on the body, or initial shedding. Most side effects are mild and temporary.",
    },
    {
      question: "Can I use multiple hair loss treatments together?",
      answer:
        "Yes, combining treatments like Finasteride and Minoxidil can be more effective than using either treatment alone. They work through different mechanisms, so they can complement each other for better results.",
    },
  ];

  return (
    <>
      <div className="mt-16">
        <FaqsSection
          title="Frequently Asked Questions"
          subtitle=""
          faqs={hairFaqs}
        />
      </div>
    </>
  );
};

export default HairFaqs;
