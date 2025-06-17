"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RockyFeatures from "@/components/RockyFeatures";
import CoverSection from "@/components/utils/CoverSection";
import Section from "@/components/utils/Section";
import HowRockyWorks from "@/components/HowRockyWorks";
import RockyInTheNews from "@/components/RockyInTheNews";
import Categories from "@/components/Reviews/Categories";
import CustomImage from "@/components/utils/CustomImage";
import ListWithIcons from "@/components/ListWithIcons";
import { FaArrowRightLong } from "react-icons/fa6";
import WhyChewalis from "@/components/ChewalisPage/WhyChewalis";
import TeamSection from "@/components/TeamSection";
import ReviewsSection from "@/components/ReviewsSection";
import ChewalisFaqs from "@/components/ChewalisPage/ChewalisFaqs";
import ChewalisProducts from "@/components/ChewalisPage/ChewalisProducts";
import EdTreatment from "@/components/ChewalisPage/EdTreatment";
import TakeRockyChewalis from "@/components/ChewalisPage/TakeRockyChewalis";
import CommonStats from "@/components/ChewalisPage/CommonStats";
import SafeAndSecure from "@/components/ChewalisPage/SafeAndSecure";
import EdAtYourFingertips from "@/components/ChewalisPage/EdAtYourFingertips";

const heroItems = [
  {
    text: "New discreet dissolvable mint",
    icon: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Pre%20Sell/hospital%201.png",
  },
  {
    text: "Same proven ingredients as Cialis©",
    icon: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Pre%20Sell/stethoscope%201.png",
  },
  {
    text: "No office visit required",
    icon: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Pre%20Sell/dns-services%201.png",
  },
];

const HeroSection = () => {
  const countdownDuration = 4 * 24 * 60 * 60 * 1000; // 4 days in milliseconds
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [deliveryDay, setDeliveryDay] = useState("");

  useEffect(() => {
    // Only run this code on the client side
    if (typeof window === 'undefined') return;
    
    let targetTime = new Date();
    const savedTime = localStorage.getItem("deliveryTargetTime");
    if (savedTime) {
      targetTime = new Date(savedTime);
      if (new Date() > targetTime) {
        localStorage.removeItem("deliveryTargetTime");
        setNewTargetTime();
      }
    } else {
      setNewTargetTime();
    }

    function setNewTargetTime() {
      targetTime = new Date();
      targetTime.setTime(targetTime.getTime() + countdownDuration);
      localStorage.setItem("deliveryTargetTime", targetTime);
    }

    function updateCountdown() {
      const now = new Date();
      const timeDifference = targetTime - now;
      if (timeDifference > 0) {
        setTimeLeft({
          hours: Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
          ),
          seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
        });
      } else {
        setNewTargetTime();
      }
    }

    function updateDeliveryDay() {
      const options = { weekday: "long" };
      setDeliveryDay(targetTime.toLocaleDateString(undefined, options));
    }

    updateDeliveryDay();
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto  grid md:grid-cols-2 gap-8 items-center relative">
      <div className="max-w-[500px]">
        <h1 className="text-3xl lg:text-[48px] font-semibold leading-tight mb-3">
          Boost intimacy with Chewalis Mints.
        </h1>
        <ListWithIcons items={heroItems} />
        <p className="md:hidden pb-5">
          Skip the long wait times and get 1:1 support form a licensed
          healthcare practitioner.
        </p>

        <div className="flex flex-col lg:flex-row gap-2">
          <Link
            href="/ed-flow/"
            className="h-11 md:px-[24px] py-3 md:py-[11.5px] rounded-[64px] flex items-center space-x-2 transition justify-center bg-black text-white hover:bg-gray-800"
          >
            <span className="text-[14px] leading-[19.6px] md:leading-[21px] font-[500] md:font-[400]">
              Get Started
            </span>
            <FaArrowRightLong />
          </Link>

          <Link
            href="/ed-pre-consultation-quiz/"
            className="h-11 md:px-[24px] py-3 md:py-[11.5px] rounded-[64px] flex items-center space-x-2 transition justify-center bg-white border border-black text-black hover:bg-gray-100"
          >
            <span className="text-[14px] leading-[19.6px] md:leading-[21px] font-[500] md:font-[400]">
              See if treatment is right for me
            </span>
            <FaArrowRightLong />
          </Link>
        </div>

        <div className="mt-5">
          <p className="mb-2">Order within</p>
          <div className="flex items-center gap-1 text-lg font-semibold mb-2">
            <div className="rounded-md p-2  text-center bg-white text-[#D3876A]">
              {timeLeft.hours}h
            </div>
            :
            <div className="rounded-md p-2  text-center bg-white text-[#D3876A]">
              {timeLeft.minutes}m
            </div>
            :
            <div className="rounded-md p-2  text-center bg-white text-[#D3876A]">
              {timeLeft.seconds}s
            </div>
          </div>
          <p>
            for delivery by{" "}
            <span className="text-gradient font-bold text-[#D3876A]">
              {deliveryDay}
            </span>
          </p>
        </div>
      </div>
      <div className="overflow-hidden w-full relative rounded-3xl h-[335px] md:h-[500px] ">
        <CustomImage
          src="https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/chewalis-cover-adjusted.webp"
          alt="hero Image"
          fill
        />
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div>
      <CoverSection>
        <HeroSection />
      </CoverSection>
      <RockyFeatures />

      <Section>
        <WhyChewalis />
      </Section>

      <RockyInTheNews />

      <Section bg={"bg-[#f7f9fb]"}>
        <EdTreatment />
      </Section>

      <Section>
        <TakeRockyChewalis />
      </Section>

      <Section>
        <HowRockyWorks
          title="How to get Rocky Chewalis Mints Online"
          subtitle="Quick, simple, convenient. We’re here to support your health journey every step of the way through."
        />
      </Section>

      <Section>
        <ChewalisProducts />
      </Section>
      <hr className=" border-t-[0.5px] border-[#E2E2E1]" />
      <Section>
        <TeamSection />
      </Section>

      <Section bg={"bg-[#F5F4EF]"}>
        <ReviewsSection />
      </Section>

      <Section>
        <CommonStats />
      </Section>

      <Section bg={"bg-[#F7F9FB]"}>
        <EdAtYourFingertips />
      </Section>

      <Section>
        <SafeAndSecure />
      </Section>

      <Section>
        <ChewalisFaqs />
      </Section>
    </div>
  );
}
