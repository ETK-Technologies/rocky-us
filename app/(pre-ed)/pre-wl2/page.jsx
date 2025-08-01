import FaqsSection from "@/components/FaqsSection";
import ReviewsSection from "@/components/ReviewsSection";
import Section from "@/components/utils/Section";
import WlHeroSection from "@/components/WL/WlHeroSection";
import WLProgram from "@/components/WL/WLProgram";

const WlFaqs = [
  {
    question: "How much does the Body Optimization Program cost?",
    answer:
      "The initial consultation fee is $99. The cost of medication along with a $40 program fee is charged monthly. The program fee includes access to clinicians, new prescriptions and pharmacy counselling.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "To determine insurance coverage you will need to contact your insurance provider directly. We can provide you with a detailed invoice upon request, which you can submit to your insurance for reimbursement purposes.",
  },
  {
    question: "What can I expect after I sign up?",
    answer:
      "Upon completing the initial online consultation, a Rocky Healthcare provider will assess this and determine if you are eligible. Please check your account for messages from your clinician.",
  },
  {
    question: "Why do I need a blood test?",
    answer:
      "Blood tests give insight into your current health and allows your clinician to better understand your needs. This helps them tailor their advice to meet your specific situation.",
  },
  {
    question: "What are the side effects of GLP-1 medications?",
    answer:
      "Common side effects include nausea, vomiting, abdominal pain, constipation and/or diarrhea. More severe side effects are rare but can include pancreatitis, gallbladder disease, low blood sugar, severe allergies, visual disturbances, rapid heartbeat, and mood disturbances. This is not a full list and we encourage you to please consult with a clinician for further information.",
  },
  {
    question: "How do I schedule a call with my provider?",
    answer:
      "After submitting your questionnaire, you will be able to schedule a call with a licensed Canadian prescriber. To request this, simply send a message to your prescriber through your account by clicking on messages. They will send you a link to schedule a call at your convenience.",
  },
  {
    question: "Can I cancel at any time?",
    answer:
      "Cancellations can be made at any time to avoid future charges. However, previously incurred monthly fees are nonrefundable.",
  },
  {
    question: "How do GLP-1s work?",
    answer:
      "Body Optimization injections available through Rocky belong to the GLP-1 class of medications, mimicking the natural hormone GLP-1. They work by reducing appetite and promoting a feeling of fullness, leading to reduced food intake and body optimization.",
  },
  {
    question: "How can I get a GLP-1 prescription at Rocky?",
    answer:
      'Simply click <a href="/wl-pre-consultation" class="underlined-link">here</a> and get started today!',
  },
  {
    question: "Which GLP-1s does Rocky offer?",
    answer:
      "Rocky provides prescriptions for several GLP-1 medications, including Ozempic, Mounjaro® and Wegovy.",
  },
];

const WeightLossProgramItems = [
  {
    id: "1",
    time: "Today",
    title: "Start your initial consultation ($99)",
    description:
      "Share your health history and weight loss goals with us online to get started. Same day appointment to meet our licensed medical provider.",
  },
  {
    id: "2",
    time: "In 3 days",
    title: "Take a lab test",
    description:
      "Share your health history and weight loss goals with us online to get started. Same day appointment to meet our licensed medical provider.",
  },
  {
    id: "3",
    time: "Within 1 week",
    title: "Provider writes an Rx",
    description:
      "Share your health history and weight loss goals with us online to get started. Same day appointment to meet our licensed medical provider.",
  },
  {
    id: "4",
    time: "Free & Discreet 2-Day Delivery",
    title: "Get your medication",
    description:
      "Share your health history and weight loss goals with us online to get started. Same day appointment to meet our licensed medical provider.",
  },

  {
    id: "5",
    time: "On-going care & support",
    title: "Begin treatment",
    description:
      "Share your health history and weight loss goals with us online to get started. Same day appointment to meet our licensed medical provider.",
  },
];

export default function WlPrelander2() {
  return (
    <main>
      <WlHeroSection
        h1="Achieve your ideal weight"
        h2="with a breakthrough approach –"
        p="your transformation starts today."
        href="/body-optimization"
        btnText="Get Started →"
      ></WlHeroSection>

      <WLProgram ProgramWorksData={WeightLossProgramItems}></WLProgram>

      <Section bg={"bg-[#F5F4EF]"}>
        <ReviewsSection />
      </Section>

      <Section>
        <FaqsSection
          faqs={WlFaqs}
          title="Your Questions, Answered"
          name="Meet Rocky"
          subtitle="Frequently asked questions"
        />
      </Section>
    </main>
  );
}
