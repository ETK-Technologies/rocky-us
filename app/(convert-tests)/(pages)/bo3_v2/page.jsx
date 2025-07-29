"use client";
import BO3MoneyBack from "@/components/convert_test/BO3/BO3MoneyBack";
import BoHeroSection from "@/components/convert_test/BO3/BoHeroSection";
import ImagesSection from "@/components/convert_test/BO3/ImagesSection";
import ImageWithText from "@/components/convert_test/BO3/ImageWithText";
import LoseUp from "@/components/convert_test/BO3/LoseUp";
import LossStartsHere from "@/components/convert_test/BO3/LossStartsHere";
import RockyDifference from "@/components/convert_test/BO3/RockyDifference";
import WLModal from "@/components/convert_test/BO3/WLModal";
import WLQuizSection from "@/components/convert_test/BO3/WLQuizSection";
import WLWork from "@/components/convert_test/BO3/WLWork";
import ResultSection from "@/components/BodyOptimization/ResultSection";
import FaqsSection from "@/components/FaqsSection";
import MoreQuestions from "@/components/MoreQuestions";
import RockyInTheNews from "@/components/RockyInTheNews";
import Section from "@/components/utils/Section";
import { useState, useEffect } from "react";
import WLModalSlider from "@/components/convert_test/BO3/WLModalSlider";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
const items = [
  {
    icon: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/chart-average.png",
    alt: "Hospital",
    text: "Lose 15-20% of your body weight in a year*",
  },
  {
    icon: "https://myrocky.b-cdn.net/WP%20Images/Weight%20Loss/dns-services.webp",
    alt: "Services",
    text: "Access the right medication for you, with your GLP-1 prescription.",
  },
  {
    icon: "https://myrocky.b-cdn.net/WP%20Images/Weight%20Loss/stethoscope.webp",
    alt: "Visits",
    text: "Personalized treatments with ongoing clinical support.",
  },
];

const Images = [
  {
    title: "Overcome biology with science",
    description:
      "Weight loss isn’t just about willpower. Get access to prescription-only weight loss treatments designed to regulate appetite, overcome biological factors and support long-term results.",
    img: "",
  },
  {
    title: "Dedicated support at your fingertips",
    description:
      "Keep the weight off with 1:1 guidance & 24/7 support from licensed medical providers. Connect with your provider instantly through our platform.",
    img: "",
  },
  {
    title: "Holistic Approach",
    description:
      "On average, Rocky members lose 2-5x more weight vs. similar programs. Our approach goes beyond just treatments – we help you develop habits for a healthier, happier you.",
    img: "",
  },
];

const WeightLossProgramItems = [
  {
    id: "1",
    time: "",
    title: "Work with your body",
    description:
      "Traditional diets don’t work for everyone—genetics play a major role, influencing up to 70% of body weight. That’s why we combine GLP-1 treatments, nutrition, and personalized care to work with your body, not against it.",
  },
  {
    id: "2",
    time: "",
    title: "No restrictive dieting",
    description:
      "Restrictive diets fail because they fight your body, not support it. Instead of cutting out foods, we focus on nutrient-rich, balanced eating that fuels your metabolism and promotes lasting results.",
  },
  {
    id: "3",
    time: "",
    title: "Optimize overall wellbeing",
    description:
      "Our approach goes beyond just medications and the number on the scale. We focus on whole-body health—optimizing gut health, sleep, and movement to enhance energy, vitality, and long-term well-being.",
  },
  {
    id: "4",
    time: "",
    title: "Fits your schedulen",
    description:
      "Traditional weight loss demands your life revolve around it. Our approach integrates seamlessly into your existing routine, with treatment plans and check-ins that adapt to your schedule, rather than the othey way around it.",
  },
];

const loseUpItems = [
  {
    id: "1",
    time: "Step 1",
    title: "Tell us about your health",
    description:
      "Tell us about your health and goals and complete lab work (or provide us with recent results). This initial comprehensive consultation ($99) will help us tailor advice specifically for you.",
  },
  {
    id: "2",
    time: "Step 2",
    title: "Take a lab test",
    description: "",
  },
  {
    id: "3",
    time: "Step 3",
    title: "Provider writes an Rx",
    description:
      "Your medication will arrive within 1-2 business days, free of charge. Sometimes it may take longer depending on where you live.",
  },
  {
    id: "4",
    time: "Step 4",
    title: "Ongoing care & support",
    description: "",
  },
];

const faqs = [
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

export default function BodyOptimization3V2() {
  const [openModal, setOpenModal] = useState(false);
  const [showFixedDiv, setShowFixedDiv] = useState(false);

  useEffect(() => {
    const modalOpened = localStorage.getItem("modalOpened");
    if (!modalOpened) {
      const timer = setTimeout(() => {
        setOpenModal(true);
        localStorage.setItem("modalOpened", "true");
      }, 45000);

      return () => clearTimeout(timer);
    } else {
      setOpenModal(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const button = document.querySelector(".hero-button");
      if (button) {
        const buttonBottom = button.getBoundingClientRect().bottom;
        setShowFixedDiv(buttonBottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div
        className={`bg-white min-w-full lg:hidden justify-center text-center items-center flex fixed p-4 bottom-0 z-30 transition-transform duration-500 ${
          showFixedDiv ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Link
          className="h-11 w-full lg:w-[400px] mb-[8px] bg-black text-[white] md:px-[24px] py-3 md:py-[11.5px] rounded-[64px] flex items-center space-x-2 transition justify-center"
          href="/wl-pre-consultation"
        >
          <span className="text-[14px] leading-[19.6px] md:leading-[21px] font-[500] md:font-[400]">
            Check Eligibility
          </span>
          <FaArrowRightLong />
        </Link>
      </div>

      {openModal && <WLModalSlider setOpenModal={openModal} />}
      <BoHeroSection items={items}></BoHeroSection>
      <ImagesSection />
      <LoseUp
        ProgramWorksData={loseUpItems}
        title="Lose Up to 25% of Body Weight in 4 Simple Steps"
        description="The comprehensive support you need to succeed in your weight loss journey."
      ></LoseUp>
      <RockyInTheNews />
      <WLWork
        ProgramWorksData={WeightLossProgramItems}
        showBtn={true}
        imgClass="rounded-2xl"
        title="Weight Loss That Works with Your Body & Schedule"
        description="It's not magic; it's metabolic science – with tailored treatments and evidence-based lifestyle advice that seamlessly fits into your schedule."
      />

      <Section bg="bg-stone-100">
        <RockyDifference></RockyDifference>
      </Section>
      <Section>
        <ResultSection />
      </Section>
      <Section>
        <BO3MoneyBack></BO3MoneyBack>
      </Section>
      <LossStartsHere></LossStartsHere>
      <Section bg="bg-[#F9F9F9]">
        <FaqsSection
          faqs={faqs}
          title="Your Questions, Answered"
          name="Meet Rocky"
          subtitle="Frequently asked questions"
        />
        <MoreQuestions link="/faqs/" bg="bg-white" />
      </Section>
      <ImageWithText
        img="/bo3/mobile.png"
        title="Sustainable weight loss made easy"
        text_1="You’ll have regular 1:1 chats with your medical provider. They’ll help you build a custom plan and provide guidance and support so you hit your goals."
        text_2="Track progress, gain insights, manage appointments, treatments, and more—all from your all-in-1 Rocky Health portal."
      />
      <WLQuizSection></WLQuizSection>
    </>
  );
}
