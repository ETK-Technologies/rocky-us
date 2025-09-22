import Image from "next/image";
import Link from "next/link";

export default async function ContactUs() {
  return (
    <div className="px-5 pt-6 md:pt-8 mb-5 sectionWidth:px-0 ">
      <div className="max-w-[1184px] mx-auto">
        <div className="relative flex flex-col md:flex-row overflow-hidden rounded-[16px] w-full h-[984px] md:h-[906px] z-0">
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <Image
              src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/contact-us-cover-m.webp"
              alt="cover"
              fill
              className="md:hidden"
            />
            <Image
              src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/contact-us-cover-d.webp"
              alt="cover"
              fill
              className="hidden md:block object-cover"
            />
          </div>
          {/* Overlay Content */}
          <div className="z-10 p-6 md:px-20 md:py-[94.5px] flex flex-col  ">
            {/* Contact Us Heading */}
            <h2 className="text-[32px] md:text-[48px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-[4px] headers-font">
              Contact Us
            </h2>
            <p className="text-[#814B00] text-[16px] md:text-[20px] font-[400] leading-[140%] mb-[21px] md:mb-14">
              We're here for you.
            </p>

            {/* Contact Details */}
            <div className="space-y-[18px] md:space-y-[33px]">
              <div>
                <p className="text-[16px] md:text-[24px] tracking-[-0.02em] leading-[110%] mb-3 md:mb-4  capitalize headers-font">
                  For customer care inquiries:
                </p>
                <Link
                  href="mailto:contact@myrocky.ca"
                  className="text-[14px] md:text-[16px] leading-[140%] font-[600] text-[#814b00] hover:text-[#4e340fec]  "
                >
                  contact@myrocky.com
                </Link>
              </div>

              <div>
                <p className="text-[16px] md:text-[24px] tracking-[-0.02em] leading-[110%] mb-3 md:mb-4  capitalize headers-font">
                  For clinical inquiries:
                </p>
                <Link
                  href="mailto:clinic@myrocky.ca"
                  className="text-[14px] md:text-[16px] leading-[140%] font-[600] text-[#814b00] hover:text-[#4e340fec]  "
                >
                  clinic@myrocky.com
                </Link>
              </div>

              <div className="space-y-2 md:space-y-4">
                <p className="text-[16px] md:text-[24px] tracking-[-0.02em] leading-[110%] mb-3 md:mb-4  capitalize headers-font">
                  For pharmacy inquiries:
                </p>
                <div>
                  <p className="text-[14px] md:text-[16px] font-[500] leading-[140%] mb-2 md:mb-4">
                    Rocky Pharmacy (310538)
                  </p>
                  <Link
                    href="mailto:info@myrocky.ca"
                    className="text-[14px] md:text-[16px] leading-[140%] font-[600] text-[#814b00] hover:text-[#4e340fec]  "
                  >
                    pharmacy@myrocky.com
                  </Link>
                </div>
                <div>
                  <p className="text-[14px] font-[500] leading-[140%] mb-1 md:hidden">
                    Call:
                  </p>
                  <p className="text-[16px] font-[500] leading-[140%] mb-1 hidden md:block">
                    Phone:
                  </p>

                  <Link
                    href="tel:+14169001444"
                    className="text-[14px] md:text-[16px] leading-[140%] font-[600] text-[#814b00] hover:text-[#4e340fec]  "
                  >
                    +1 (888) 739-1444
                  </Link>
                </div>
                <div>
                  <p className="text-[14px] md:text-[16px] font-[500] leading-[140%] mb-1">
                    Fax:
                  </p>

                  <Link
                    href="tel:+12892761173"
                    className="text-[14px] md:text-[16px] leading-[140%] font-[600] text-[#814b00] hover:text-[#4e340fec]  "
                  >
                    +1 (289) 276-1173
                  </Link>
                </div>
                {/* <div>
                  <p className="text-[14px] md:text-[16px] font-[500] leading-[140%] mb-1">
                    Pharmacy address:
                  </p>
                  <p className="text-[14px] md:text-[16px] leading-[140%] font-[600] text-[#814b00] hover:text-[#4e340fec]  ">
                    15 - 5270 Solar Dr. <br /> Mississauga, ON L4W 5M8
                  </p>
                </div> */}
                {/* <div>
                  <p className="text-[14px] md:text-[16px] font-[500] leading-[140%] mb-1">
                    Hours:
                  </p>
                  <p className="text-[14px] md:text-[16px] leading-[140%] font-[600] text-[#814b00] hover:text-[#4e340fec]  ">
                    Mon-Fri 6-8pm EST
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* Urgent Medical Inquiries Note */}
        <div className="mt-6 md:mt-8 px-5 py-8 md:py-8 rounded-[16px] text-center border border-[#E2E2E1] shadow-[0px_1px_1px_0px_#E2E2E1] bg-[linear-gradient(268.59deg,#FFFFFF_-9.74%,#FAFAF8_65.81%)]">
          <p className="text-[20px] md:text-[24px] leading-[115%] font-[500] md:font-[450] mb-4 headers-font">
            For Urgent Medical Inquiries.
          </p>
          <p className="text-[14px] md:text-[16px] leading-[140%] font-[400]">
            Please contact your local walk-in clinic, attend the nearest
            emergency department or dial
            <Link href="tel:+911" className="font-[500] underline ml-1">
              911.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
