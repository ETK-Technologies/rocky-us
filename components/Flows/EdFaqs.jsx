import FaqsSection from "../FaqsSection";

const EdFaqs = () => {
  // FAQs data for the ED Flow page
  const edFaqs = [
    {
      question: "What is ED?",
      answer:
        "Erectile dysfunction (ED) is the inability to get or maintain an erection firm enough for sexual activity. It's a common condition affecting millions of men, particularly as they age.",
    },
    {
      question: "How do ED medications work?",
      answer:
        "ED medications like Sildenafil (Viagra) and Tadalafil (Cialis) work by enhancing the effects of nitric oxide, a chemical your body produces that relaxes muscles in the penis. This increases blood flow and allows you to achieve an erection in response to sexual stimulation.",
    },
    {
      question: "Are ED medications safe?",
      answer:
        "When prescribed by a healthcare provider and used as directed, ED medications are generally safe for most men. However, they may not be suitable for everyone, especially those with certain health conditions or who take specific medications.",
    },
    {
      question: "How long do ED medications last?",
      answer:
        "The duration varies by medication. Sildenafil (Viagra) typically lasts 4-6 hours, while Tadalafil (Cialis) can last up to 36 hours, earning it the nickname 'the weekend pill.'",
    },
    {
      question: "What are the possible side effects?",
      answer:
        "Common side effects may include headache, facial flushing, indigestion, nasal congestion, and mild temporary vision changes. Most side effects are mild and temporary.",
    },
  ];
  return (
    <>
      <div className="mt-16">
        <FaqsSection
          title="Frequently Asked Questions"
          subtitle=""
          faqs={edFaqs}
        />
      </div>
    </>
  );
};

export default EdFaqs;
