"use client";
import { useState } from "react";

import Link from "next/link";
import CustomImage from "../../utils/CustomImage";
import Section from "../../utils/Section";
import {
  FaArrowRightLong,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaVimeo,
  FaYoutube,
} from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Footer2 = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log("Email:", email);
    if (!email) {
      setOverlayMessage({
        type: "error",
        text: "Please enter an email address",
      });
      return;
    }

    setIsLoading(true);
    setOverlayMessage(null);

    try {
      const response = await fetch(`/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok && data.success) {
        setIsSubscribed(true);
        setOverlayMessage({
          type: "success",
          text: "Thank you for subscribing!",
        });
        e.target.reset();
      } else {
        // Customize message for specific Attentive error
        const errorText = data.error.includes("No valid creative found")
          ? "Subscription is currently unavailable. Please try again later."
          : data.error || "Subscription failed. Please try again.";
        setOverlayMessage({ type: "error", text: errorText });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setOverlayMessage({
        type: "error",
        text: "An error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeOverlay = () => {
    setOverlayMessage(null);
  };

  const [menuOne, setMenuOne] = useState(true);
  const [menuTwo, setMenuTwo] = useState(false);
  const [menuThree, setMenuThree] = useState(false);
  const [menuFour, setMenuFour] = useState(false);

  const toggleMenuOne = () => {
    setMenuOne(menuOne ? false : true);
  };

  const toggleMenuTwo = () => {
    setMenuTwo(menuTwo ? false : true);
  };

  const toggleMenuThree = () => {
    setMenuThree(menuThree ? false : true);
  };

  const toggleMenuFour = () => {
    setMenuFour(menuFour ? false : true);
  };

  return (
    <>
      <Section bg="bg-black">
        <div className="flex flex-col md:flex-row gap-6 ">
          <div className="flex-auto">
            <CustomImage
              src="/bo3/myrockyca.png"
              width="150"
              height="150"
              className="mb-[24px]"
            ></CustomImage>
            <div className="flex gap-4 mb-[24px]">
              <Link
                href="https://www.facebook.com/people/Rocky-Health-Inc/100084461297628/"
                target="_blank"
                prefetch={false}
                className="text-white"
              >
                <FaFacebookF />
              </Link>
              <Link
                href="https://www.instagram.com/myrocky.ca/"
                target="_blank"
                prefetch={false}
                className="text-white"
              >
                <FaInstagram />
              </Link>
              <Link
                href="#"
                target="_blank"
                prefetch={false}
                className="text-white"
              >
                <FaVimeo />
              </Link>
              <Link
                href="#"
                target="_blank"
                prefetch={false}
                className="text-white"
              >
                <FaYoutube />
              </Link>
            </div>
            <CustomImage
              src="/ed-prelander-5/ed-footer.png"
              width="100"
              height="100"
              className="mb-[24px]"
            ></CustomImage>
            <p className="text-white font-medium mb-[8px]">
              Rocky Pharmacy (308582)
            </p>
            <p className="text-[#CCCCCC] font-[POPPINS] text-[14px]">
              101-178 John St. <br />
              Brampton, ON <br />
              L6W 2A4 M. Rizk <br />
              +1 (416) 900-1444 <br />
              Mon-Fri 6pm-8pm EST
            </p>
          </div>
          <div className="flex-1 hidden md:block">
            <p className="text-[12px] font-[POPPINS] text-[#BABABA] mb-[16px]">
              Popular
            </p>
            <ul>
              {[
                {
                  text: "Body Optimization",
                  href: "/body-optimization",
                },
                {
                  text: "Sexual Health",
                  href: "/sex",
                },
                {
                  text: "Hair Loss",
                  href: "/hair",
                },
                {
                  text: "Smoking Cessation",
                  href: "/zonnic",
                },
                {
                  text: "DHM Recovery",
                  href: "/product/dhm-blend",
                },
                {
                  text: "Mental Health",
                  href: "/mental-health",
                },
              ].map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className="hover:underline text-white text-[14px] block mb-[16px]"
                  prefetch={true}
                >
                  {link.text}
                </Link>
              ))}
            </ul>
          </div>

          <div className="flex-1 hidden md:block">
            <p className="text-[12px] font-[POPPINS] text-[#BABABA] mb-[16px]">
              About Rocky
            </p>
            <ul>
              {[
                {
                  text: "About us",
                  href: "/about-us",
                },
                {
                  text: "Podcast",
                  href: "/podcast",
                },
                {
                  text: "Blog",
                  href: "/blog",
                },
                {
                  text: "Service Across Canada",
                  href: "/service-across-canada",
                },
              ].map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className="hover:underline text-white text-[14px] block mb-[16px]"
                  prefetch={true}
                >
                  {link.text}
                </Link>
              ))}
            </ul>
          </div>

          <div className="flex-1 hidden md:block">
            <p className="text-[12px] font-[POPPINS] text-[#BABABA] mb-[16px]">
              Support
            </p>
            <ul>
              {[
                {
                  text: "Contact us",
                  href: "/contact-us",
                },
                {
                  text: "How It Works",
                  href: "/how-it-works",
                },
                {
                  text: "General FAQs",
                  href: "/faqs",
                },
                {
                  text: "Product FAQs",
                  href: "/product-faq",
                },
                {
                  text: "Returns & Refunds",
                  href: "/",
                },
              ].map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className="hover:underline text-white text-[14px] block mb-[16px]"
                  prefetch={true}
                >
                  {link.text}
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex-1 hidden md:block">
            <p className="text-[12px] font-[POPPINS] text-[#BABABA] mb-[16px]">
              Legal
            </p>
            <ul>
              {[
                {
                  text: "Privacy Policy",
                  href: "/privacy-policy",
                },
                {
                  text: "Terms & Conditions",
                  href: "/terms-of-use",
                },
              ].map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className="hover:underline text-white text-[14px] block mb-[16px]"
                  prefetch={true}
                >
                  {link.text}
                </Link>
              ))}
            </ul>
          </div>

          {/* Mobile Version */}
          <div className="flex-1 block md:hidden">
            <div
              onClick={toggleMenuOne}
              className="flex justify-between items-center mb-[16px]"
            >
              <p className="text-[12px] font-[POPPINS] text-[#BABABA] ">
                Popular
              </p>
              <button className="transform transition-transform duration-300">
                {menuOne ? (
                  <IoIosArrowUp className="text-[#BABABA]" />
                ) : (
                  <IoIosArrowDown className="text-[#BABABA]" />
                )}
              </button>
            </div>
            {menuOne && (
              <ul className="transform transition-transform duration-300">
                {[
                  {
                    text: "Body Optimization",
                    href: "/body-optimization",
                  },
                  {
                    text: "Sexual Health",
                    href: "/sex",
                  },
                  {
                    text: "Hair Loss",
                    href: "/hair",
                  },
                  {
                    text: "Smoking Cessation",
                    href: "/zonnic",
                  },
                  {
                    text: "DHM Recovery",
                    href: "/product/dhm-blend",
                  },
                  {
                    text: "Mental Health",
                    href: "/mental-health",
                  },
                ].map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    className="hover:underline text-white text-[14px] block mb-[16px]"
                    prefetch={true}
                  >
                    {link.text}
                  </Link>
                ))}
              </ul>
            )}
          </div>

          <div className="flex-1 block md:hidden">
            <div
              onClick={toggleMenuTwo}
              className="flex justify-between items-center mb-[16px]"
            >
              <p className="text-[12px] font-[POPPINS] text-[#BABABA] ">
                About Rocky
              </p>
              <button className="transform transition-transform duration-300">
                {menuTwo ? (
                  <IoIosArrowUp className="text-[#BABABA]" />
                ) : (
                  <IoIosArrowDown className="text-[#BABABA]" />
                )}
              </button>
            </div>
            {menuTwo && (
              <ul>
                {[
                  {
                    text: "About us",
                    href: "/about-us",
                  },
                  {
                    text: "Podcast",
                    href: "/podcast",
                  },
                  {
                    text: "Blog",
                    href: "/blog",
                  },
                  {
                    text: "Service Across Canada",
                    href: "/service-across-canada",
                  },
                ].map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    className="hover:underline text-white text-[14px] block mb-[16px]"
                    prefetch={true}
                  >
                    {link.text}
                  </Link>
                ))}
              </ul>
            )}
          </div>

          <div className="flex-1 block md:hidden">
            <div
              onClick={toggleMenuThree}
              className="flex justify-between items-center mb-[16px]"
            >
              <p className="text-[12px] font-[POPPINS] text-[#BABABA] ">
                Support
              </p>
              <button className="transform transition-transform duration-300">
                {menuThree ? (
                  <IoIosArrowUp className="text-[#BABABA]" />
                ) : (
                  <IoIosArrowDown className="text-[#BABABA]" />
                )}
              </button>
            </div>
            {menuThree && (
              <ul>
                {[
                  {
                    text: "Contact us",
                    href: "/contact-us",
                  },
                  {
                    text: "How It Works",
                    href: "/how-it-works",
                  },
                  {
                    text: "General FAQs",
                    href: "/faqs",
                  },
                  {
                    text: "Product FAQs",
                    href: "/product-faq",
                  },
                  {
                    text: "Returns & Refunds",
                    href: "/",
                  },
                ].map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    className="hover:underline text-white text-[14px] block mb-[16px]"
                    prefetch={true}
                  >
                    {link.text}
                  </Link>
                ))}
              </ul>
            )}
          </div>

          <div className="flex-1 block md:hidden">
            <div
              onClick={toggleMenuFour}
              className="flex justify-between items-center mb-[16px]"
            >
              <p className="text-[12px] font-[POPPINS] text-[#BABABA] ">
                Legal
              </p>
              <button className="transform transition-transform duration-300">
                {menuFour ? (
                  <IoIosArrowUp className="text-[#BABABA]" />
                ) : (
                  <IoIosArrowDown className="text-[#BABABA]" />
                )}
              </button>
            </div>
            {menuFour && (
              <ul>
                {[
                  {
                    text: "Privacy Policy",
                    href: "/privacy-policy",
                  },
                  {
                    text: "Terms & Conditions",
                    href: "/terms-of-use",
                  },
                ].map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    className="hover:underline text-white text-[14px] block mb-[16px]"
                    prefetch={true}
                  >
                    {link.text}
                  </Link>
                ))}
              </ul>
            )}
          </div>

          {/* end Mobile version */}
        </div>
        {/* Subscriptions */}
        <hr className="border-[#4E4E4E] border-[1px] mt-[48px] mb-[48px]" />
        <div>
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1">
              <h2 className="text-white text-[24px] mb-[16px] tracking-[114.99999999999999%] font-bold">
                Subscribe to receive news and updates.
              </h2>
              <p className="text-white text-[14px] leading-[140%]">
                Get health tips, educational research, and exclusive offers.
                Sign up with your email address to receive news and updates.
              </p>
            </div>
            <div className="flex-1 flex justify-end">
              <form onSubmit={handleSubscribe} className="md:w-[384px] w-full">
                <div className="">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    className="block w-full  md:w-[384px]  rounded-3xl px-4 bg-[#2E2E2E] text-white h-[44px]  border-[#2E2E2E]"
                    required
                    disabled={isLoading}
                    suppressHydrationWarning
                  />
                  <button
                    type="submit"
                    className="bg-white w-full mt-2 text-black  lg:w-[154px] h-[34px] rounded-2xl flex justify-center items-center gap-2"
                    disabled={isLoading}
                    suppressHydrationWarning
                  >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                    <FaArrowRightLong />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr className="border-[#4E4E4E] border-[1px] mt-[48px] mb-[48px]" />
        <p className="text-[12px] text-[#AEAEAE] leading-[140%] font-normal">
          ©2024 Rocky Health Inc. All rights reserved. Rocky Health Pharmacy
          Inc. & Rocky Health Clinic Inc. are subsidiaries of Rocky Health Inc.
        </p>
      </Section>
    </>
  );
};

export default Footer2;
