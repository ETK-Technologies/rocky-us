import FaqsSection from "@/components/FaqsSection";
import MoreQuestions from "@/components/MoreQuestions";
const faqs = [
  {
    question: "What is Rocky?",
    answer:
      "Rocky is a 100% online platform with a focus to normalize men's health and eliminate the stigma surrounding it. At Rocky, we make it easy for patients to connect to licensed healthcare professionals. We specialize in medical conditions commonly experienced by men including Erectile Dysfunction and Hair Loss. We've built a simple & convenient online process which helps you connect to healthcare professionals in order to get customized treatment plans, shipped right to your door.",
  },
  {
    question: "How does Rocky work?",
    answer:
      "Rocky offers prescription and over-the-counter products. For prescription medication, you will need to complete an online medical intake/questionnaire...",
  },
  {
    question: "Who looks after you at Rocky?",
    answer:
      "Rocky is operated by Healthcare Professionals including Doctors, Nurse Practitioners, and Pharmacists. Our team is experienced and readily available...",
  },
  {
    question: "How does Rocky ensure patient privacy?",
    answer:
      "Rocky handles the privacy and security of all our customers with great care. Our platform meets all required regulatory compliance...",
  },
];

const HomeFaqsSection = () => {
  return (
    <>
      <FaqsSection
        faqs={faqs}
        title="Your Questions, Answered"
        name="Meet Rocky"
        subtitle="Frequently asked questions"
      />
      <MoreQuestions link="/faqs/" />
    </>
  );
};

export default HomeFaqsSection;
