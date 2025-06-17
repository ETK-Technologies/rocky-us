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

const HeroSection = () => {
  const countdownDuration = 4 * 24 * 60 * 60 * 1000; // 4 days in milliseconds
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [deliveryDay, setDeliveryDay] = useState("");

  useEffect(() => {
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
    <section className="mx-auto py-8 px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center relative">
      <div className="max-w-[500px]">
        <h1 className="text-3xl lg:text-[48px] font-semibold leading-tight mb-3">
          Don’t just take our word for it
        </h1>
        <p className="text-lg mb-5">
          Join 350,000+ people in Canada who trust Rocky for exceptional
          healthcare.
        </p>
        <Link
          href="#find-treatment"
          className="bg-black text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-gray-800 transition"
        >
          <span>Find your treatment</span>
        </Link>
        <div className="mt-5">
          <p className="mb-2">Order within</p>
          <div className="flex gap-1 text-lg font-semibold mb-2">
            <div className="rounded-md p-2 w-[48px] text-center bg-white text-[#D3876A]">
              {timeLeft.hours}h
            </div>
            :
            <div className="rounded-md p-2 w-[48px] text-center bg-white text-[#D3876A]">
              {timeLeft.minutes}m
            </div>
            :
            <div className="rounded-md p-2 w-[48px] text-center bg-white text-[#D3876A]">
              {timeLeft.seconds}s
            </div>
          </div>
          <p>
            for delivery by{" "}
            <span className="text-gradient font-bold">{deliveryDay}</span>
          </p>
        </div>
      </div>
      <div className="w-full h-full relative ">
        <Image
          src="https://myrocky.b-cdn.net/WP%20Images/Review%20Page/Reviews-section.webp"
          alt="hero Image"
          width={600}
          height={400}
          className="object-contain bottom-0 md:absolute"
        />
      </div>
    </section>
  );
};

const ReviewsSection = () => (
  <div className="bg-[#F5F4EF]">
    <div className="max-w-7xl mx-auto p-3 py-16 text-center">
      <h2 className="text-3xl md:text-5xl font-bold">What People Are Saying</h2>
      <p className="mt-4 text-lg">
        Our clinical team has put together effective treatments for you.
      </p>
      <div className="flex items-center justify-center pt-3">
        <Image
          src="https://myrocky.b-cdn.net/WP%20Images/Weight%20Loss/tp-profiles.webp"
          alt="TrustPilot"
          width={104}
          height={47}
        />
      </div>
      <div className="mt-6">
        <div
          className="trustpilot-widget"
          data-locale="en-US"
          data-template-id="539adbd6dec7e10e686debee"
          data-businessunit-id="637cea41a90e1b4641b56036"
          data-style-height="700px"
          data-style-width="100%"
          data-theme="light"
          data-stars="4,5"
          data-review-languages="en"
        >
          <iframe
            title="Customer reviews powered by Trustpilot"
            loading="auto"
            src="https://widget.trustpilot.com/trustboxes/539adbd6dec7e10e686debee/index.html?templateId=539adbd6dec7e10e686debee&amp;businessunitId=637cea41a90e1b4641b56036#locale=en-US&amp;styleHeight=700px&amp;styleWidth=100%25&amp;theme=light&amp;stars=4%2C5&amp;reviewLanguages=en"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <div>
      <CoverSection bg={"bg-[#f7f9fb]"}>
        <HeroSection />
        <br />
        <RockyFeatures />
      </CoverSection>

      <ReviewsSection />

      <Section>
        <HowRockyWorks />
      </Section>
      <RockyInTheNews />

      <Section>
        <Categories />
      </Section>
    </div>
  );
}
