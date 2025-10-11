import BO3MoneyBack from "@/components/convert_test/BO3/BO3MoneyBack";
import LossStartsHere from "@/components/convert_test/BO3/LossStartsHere";
import ReviewsSection from "@/components/convert_test/ReviewsSection";
import CustomImage from "@/components/utils/CustomImage";
import Section from "@/components/utils/Section";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowRightLong, FaCheck, FaHourglass, FaStar } from "react-icons/fa6";

export default function Listicle() {
  return (
    <>
      <Section>
        <h2 className="headers-font tracking-tight font-[550] leading-[114%] text-[32px] md:text-[60px]">
          7 Reasons Why Your Weight Loss
        </h2>
        <h2 className="headers-font tracking-tight font-[550] leading-[114%] text-[32px] md:text-[60px] mb-[24px] md:mb-[40px]">
          Goals Are Finally Within Reach in 2025
        </h2>

        <div className="flex gap-[16px] mb-[24px] md:mb-[80px]">
          <div className="w-[44px] h-[44px] rounded-full">
            <CustomImage
              src="/WL/person-grg.jpg"
              className=" w-[44px] h-[44px] rounded-full"
              width="44"
              height="44"
            />
          </div>
          <div>
            <p className="font-normal text-[14px] md:text-[16px]">
              By <b>Dr. George Mankaryous</b>, M.D. CCFP
            </p>
            <p>March 4, 2025</p>
          </div>
        </div>

        <div className="bg-[#F8F7F3] p-[24px] md:p-[40px]">
          <p className="text-[14px] md:text-[18px] leading-[140%] mb-[]">
            <b>Summary:</b> If you’ve been struggling to lose weight with
            demanding diets or gym routines, it's time to discover why thousands
            are turning to <b>Rocky—Canada’s #1 weight loss program</b>.
          </p>

          <p className="text-[14px] md:text-[18px] leading-[140%] ">
            Here's why <b>Rocky members lose 2-5x more weight</b> compared to
            other programs:
          </p>
        </div>
      </Section>

      <Section>
        <div className="flex justify-center items-center md:flex-row flex-col gap-[24px] mb:gap-[80px] ">
          <div className="flex-1">
            <CustomImage
              src="/listicle/sec1.jpg"
              width="1000"
              height="1000"
              className="rounded-[16px] w-[335px] h-[251]  md:w-[552px] md:h-[414px]"
            />
          </div>
          <div className="flex-1">
            <h2 className="subheaders-font font-[450] text-[28px] leading-[115%] tracking-tight md:text-[40px] mb-[24px] md:mb-[32px]">
              1. Personalized, Doctor-Led Treatment Plan
            </h2>
            <p className="text-[14px] md:text-[18px] leading-[140%] mb-[16px]">
              Rocky goes beyond just medication. We combine clinically-proven
              treatments with a personalized plan and guidance built around{" "}
              <span className="italic">you</span>.
            </p>
            <p className="text-[14px] md:text-[18px] leading-[140%] ">
              Licensed Canadian physicians guide every step of your journey,
              providing ongoing support and adjustments based on your health
              history, goals, and lifestyle.{" "}
              <span className="font-[600]">
                This comprehensive approach leads to significantly better
                results
              </span>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex justify-center items-center md:flex-row flex-col gap-[24px] mb:gap-[80px] ">
          <div className="flex-1">
            <CustomImage
              src="/listicle/sec2.jpg"
              width="1000"
              height="1000"
              className="rounded-[16px] w-[335px] h-[251]  md:w-[552px] md:h-[414px]"
            />
          </div>
          <div className="flex-1">
            <h2 className="subheaders-font font-[450] text-[28px] leading-[115%] tracking-tight md:text-[40px] mb-[24px] md:mb-[32px]">
              2. Overcome Biology, Without Restrictive Diets
            </h2>
            <p className="text-[14px] md:text-[18px] leading-[140%] mb-[16px]">
              Weight loss isn't just about willpower; it's heavily influenced by
              genetics and hormonal balance. Our treatments address these
              biological factors and regulate appetite, without restrictive
              dieting.
            </p>
            <p className="text-[14px] md:text-[18px] leading-[140%] ">
              <span className="font-[600]">
                You’ll lose weight while enjoying the foods you love,
                guilt-free.
              </span>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section bg="bg-[#F8F7F3]">
        <div className="flex items-center justify-start gap-[1px] mb-[27px] md:mb-[32px] ">
          <div className="bg-[#00B67A] w-[20px] h-[20px] flex justify-center items-center">
            <FaStar className="text-white text-[12px]" />
          </div>
          <div className="bg-[#00B67A] w-[20px] h-[20px] flex justify-center items-center">
            <FaStar className="text-white text-[12px]" />
          </div>
          <div className="bg-[#00B67A] w-[20px] h-[20px] flex justify-center items-center">
            <FaStar className="text-white text-[12px]" />
          </div>
          <div className="bg-[#00B67A] w-[20px] h-[20px] flex justify-center items-center">
            <FaStar className="text-white text-[12px]" />
          </div>
          <div className="bg-[#00B67A] w-[20px] h-[20px] flex justify-center items-center">
            <FaStar className="text-white text-[12px]" />
          </div>
        </div>

        <div className="max-w-[642px] subheaders-font font-light leading-[115%] tracking-tight text-[28px] md:text-[40px] mb-[24px] md:mb-[32px]">
          “I'm Currently At 191 Pounds And Feel Great. Lots of Energy, Very
          Little To Report as Far as Side Effects. ”
        </div>

        <div>
          <p className="font-medium leading-[140%] text-[18px] mb-[6px]">
            Scott
          </p>
          <div className="flex justify-start items-center gap-[6px]">
            <div>
              <FaCheck className="bg-[#AE7E56] text-white rounded-full p-[3px] w-[16px] h-[16px] " />
            </div>
            <div className="text-[#000000A6] text-[14px] leading-[140%]">
              Verified customer
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex justify-center items-center md:flex-row flex-col gap-[24px] mb:gap-[80px] ">
          <div className="flex-1">
            <CustomImage
              src="/listicle/sec3.jpg"
              width="1000"
              height="1000"
              className="rounded-[16px] w-[335px] h-[251]  md:w-[552px] md:h-[414px]"
            />
          </div>
          <div className="flex-1">
            <h2 className="subheaders-font font-[450] text-[28px] leading-[115%] tracking-tight md:text-[40px] mb-[24px] md:mb-[32px]">
              3. Lose Weight While Becoming Healthier
            </h2>
            <p className="text-[14px] md:text-[18px] leading-[140%] mb-[16px]">
              At Rocky, we believe weight loss should improve your overall
              well-being. Our program includes personalized nutrition guidance
              and focuses on improving your gut health.
            </p>
            <p className="text-[14px] md:text-[18px] leading-[140%] ">
              <span className="font-[600]">
                It's not just about shedding pounds; it's about building a
                healthier, more vibrant you, inside and out.
              </span>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex justify-center items-center md:flex-row flex-col gap-[24px] mb:gap-[80px] ">
          <div className="flex-1">
            <CustomImage
              src="/listicle/sec4.jpg"
              width="1000"
              height="1000"
              className="rounded-[16px] w-[335px] h-[251]  md:w-[552px] md:h-[414px]"
            />
          </div>
          <div className="flex-1">
            <h2 className="subheaders-font font-[450] text-[28px] leading-[115%] tracking-tight md:text-[40px] mb-[24px] md:mb-[32px]">
              4. Convenient & Discreet Home Delivery
            </h2>
            <p className="text-[14px] md:text-[18px] leading-[140%] mb-[16px]">
              Skip the judgment, stigma and pharmacy lines. With Rocky, your
              prescribed medication is delivered directly to your door in
              discreet, temperature-controlled packaging.
            </p>
            <p className="text-[14px] md:text-[18px] leading-[140%] ">
              <span className="font-[600]">
                It's convenient, private, and hassle-free.
              </span>
              .
            </p>
          </div>
        </div>
      </Section>
      <Section>
        <div className="flex justify-center items-center md:flex-row flex-col gap-[24px] mb:gap-[80px] ">
          <div className="flex-1">
            <CustomImage
              src="/listicle/sec5.png"
              width="1000"
              height="1000"
              className="rounded-[16px] w-[335px] h-[251]  md:w-[552px] md:h-[414px]"
            />
          </div>
          <div className="flex-1">
            <h2 className="subheaders-font font-[450] text-[28px] leading-[115%] tracking-tight md:text-[40px] mb-[24px] md:mb-[32px]">
              5. Dedicated Support At Your Fingertips
            </h2>
            <p className="text-[14px] md:text-[18px] leading-[140%] mb-[16px]">
              You're not alone. Rocky provides{" "}
              <span className="font-[600]">
                unlimited 1:1 support from licensed Canadian medical providers
              </span>{" "}
              who guide and motivate you every step of the way.
            </p>
            <p className="text-[14px] md:text-[18px] leading-[140%] ">
              <span className="font-[600]">
                Connect with your provider whenever you need advice, and get
                regular check-ins to stay on track.
              </span>
              .
            </p>
          </div>
        </div>
      </Section>

      {/* Brown Section here */}

      <div className="bg-[#774838] overflow-hidden h-[850px] md:h-auto">
        <div className="relative">
          <div className="flex justify-center items-center">
            <div className="flex-1"></div>
            <div>
              <CustomImage
                src="/listicle/desktopBg.jpg"
                width="750"
                height="750"
                className="hidden md:block"
              />

              <CustomImage
                src="/listicle/bg.jpg"
                width="2000"
                height="2000"
                className="block md:hidden !w-auto"
              />
            </div>
          </div>

          <div className="absolute z-[9999] top-[600px] md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[335px] h-[441px] md:w-[618px] md:h-[523px] rounded-[32px] p-6 bg-black/40 backdrop-blur-md md:backdrop-blur-lg">
            <div className="flex items-center justify-center gap-[1px] mb-[27px] md:mb-[32px] ">
              <div className="bg-[#00B67A] w-[20px] h-[20px] flex justify-center items-center">
                <FaStar className="text-white text-[12px]" />
              </div>
              <div className="bg-[#00B67A] w-[20px] h-[20px] flex justify-center items-center">
                <FaStar className="text-white text-[12px]" />
              </div>
              <div className="bg-[#00B67A] w-[20px] h-[20px] flex justify-center items-center">
                <FaStar className="text-white text-[12px]" />
              </div>
              <div className="bg-[#00B67A] w-[20px] h-[20px] flex justify-center items-center">
                <FaStar className="text-white text-[12px]" />
              </div>
              <div className="bg-[#00B67A] w-[20px] h-[20px] flex justify-center items-center">
                <FaStar className="text-white text-[12px]" />
              </div>
              <div className="px-2 text-white text-[14px] leading-[20px]">
                1K reviews
              </div>
            </div>

            <div className="text-[32px] md:text-[48px] leading-[140%] tracking-tight font-semibold text-white text-center mb-[16px]">
              Find Your Personalized Weight Loss Plan
            </div>

            <div className="text-[16px] md:text-[18px] leading-[140%] text-white text-center mb-[24px] md:mb-[40px] ">
              Rocky Weight Loss members lose{" "}
              <span className="text-[20px] md:text-[28px] italic font-[700] text-[#FEA459]">
                2-5x
              </span>{" "}
              more weight compared to other programs. Now it's your turn.
            </div>

            <div className="flex justify-center items-center flex-col gap-[16px]">
              <Link
                className="h-[52px]  bg-white text-black md:px-[24px] py-3 md:py-[11.5px] rounded-[64px] flex items-center space-x-2 transition justify-center w-[295px] md:w-[320px]"
                href="/wl-pre-consultation"
              >
                <span className="text-[14px] leading-[19.6px] md:leading-[21px] font-[500] md:font-[400]">
                  Get Started
                </span>
                <FaArrowRightLong />
              </Link>

              <div className="flex justify-center items-center gap-[5px] text-white text-[14px] leading-[140%]">
                <FaHourglass className="text-[#F38122]" /> 
                <span>
                  Limited spots left
                </span>
              </div>

              <div className="flex justify-center items-center gap-[5px] text-white text-[14px] leading-[140%]">
                <FaCheckCircle className="text-[#47E3B0]" /> 
                <span>
                  Instant pre-approval
                </span>
              </div>

            </div>


          </div>
        </div>
      </div>

      <Section>
        <div className="flex justify-center items-center md:flex-row flex-col gap-[24px] mb:gap-[80px] ">
          <div className="flex-1">
            <CustomImage
              src="/listicle/sec6.jpg"
              width="1000"
              height="1000"
              className="rounded-[16px] w-[335px] h-[251]  md:w-[552px] md:h-[414px]"
            />
          </div>
          <div className="flex-1">
            <h2 className="subheaders-font font-[450] text-[28px] leading-[115%] tracking-tight md:text-[40px] mb-[24px] md:mb-[32px]">
              6. Trusted by 350,000+ Canadians
            </h2>
            <p className="text-[14px] md:text-[18px] leading-[140%] mb-[16px]">
              Join thousands, and get the support, personalized attention and
              medical excellence you deserve to achieve meaningful weight loss
              results.
            </p>
            <p className="text-[14px] md:text-[18px] leading-[140%] ">
              <span className="font-[600]">
                See why Rocky is Canada's highest-rated online pharmacy on
                Trustpilot.
              </span>
              .
            </p>
          </div>
        </div>
      </Section>
      <Section>
        <div className="flex justify-center items-center md:flex-row flex-col gap-[24px] mb:gap-[80px] ">
          <div className="flex-1">
            <CustomImage
              src="/listicle/sec7.jpg"
              width="1000"
              height="1000"
              className="rounded-[16px] w-[335px] h-[251]  md:w-[552px] md:h-[414px]"
            />
          </div>
          <div className="flex-1">
            <h2 className="subheaders-font font-[450] text-[28px] leading-[115%] tracking-tight md:text-[40px] mb-[24px] md:mb-[32px]">
              7. Lose Weight or Your Money Back
            </h2>
            <p className="text-[14px] md:text-[18px] leading-[140%] mb-[16px]">
              We're so confident in the Rocky program that we offer a 6-month
              money-back guarantee. Transform your body, or we'll refund all
              your consultation costs.
            </p>
            <p className="text-[14px] md:text-[18px] leading-[140%] ">
              <span className="font-[600] underline">
                <Link href="/body-optimization">Learn More.</Link>
              </span>
              
            </p>
          </div>
        </div>
      </Section>

      <Section bg="bg-[#F8F7F3]">
        <ReviewsSection />
        <div className="mt-[64px] md:mt-[110px]">
          <BO3MoneyBack></BO3MoneyBack>
        </div>
      </Section>

      <LossStartsHere></LossStartsHere>
    </>
  );
}
