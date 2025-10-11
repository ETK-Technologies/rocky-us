import Trustpilot from "@/components/Sex/Trustpilot";
import CustomImage from "@/components/utils/CustomImage";

const HighesttRate = ({ blockMode = false }) => {
  const ratings = [
    {
      image:
        "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/New%20ED%20Page/ch-1.png",
      text: "2-Day discreet delivery",
    },
    {
      image:
        "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/New%20ED%20Page/ch-2.png",
      text: "FDA Approved meds",
    },
    {
      image:
        "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/New%20ED%20Page/ch-3.png",
      text: "Free same-day prescription",
    },
    {
      image:
        "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/New%20ED%20Page/ch-4.png",
      text: "Free unlimited medical support",
    },
    {
      image:
        "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/New%20ED%20Page/ch-5.png",
      text: "Lowest price guarantee",
    },
  ];
  return (
    <>
      <section
        className={`py-10 ${
          blockMode ? "" : "pt-[7rem] md:pt-[4rem] mt-[10rem] relative"
        } `}
      >
        {/* Ratings Section */}
        <div
          className={` w-[335px] md:!w-[calc(100%_-_50px)] md:max-w-[1184px] lg:w-full mx-auto  bg-white border border-solid border-[#E2E2E1] rounded-lg py-[32px] md:py-[40px] shadow-[0px_1px_1px_0px_#E2E2E1] ${
            blockMode ? "" : "absolute -translate-x-2/4 left-2/4 -top-[10rem]"
          }`}
        >
          <div className="overflow-hidden mx-auto lg:max-w-5xl">
            <h2 className="text-[22px] md:text-[30px] leading-[25.3px] md:leading-[33px] font-[450] text-center mx-auto md:tracking-[-0.02em] max-w-[271px] md:max-w-full headers-font">
              The United States highest rated online pharmacy
            </h2>
            <div className="mb-8 md:mb-10 mt-4">
              <Trustpilot />
            </div>

            {/* Ratings List */}
            <div className="relative ">
              <div className="md:hidden bg-[linear-gradient(270deg,rgba(255,255,255,0)_0%,#ffffff_100%)] absolute -right-[5px] md:right-0 bottom-[0] w-[96px] h-[72px] z-10 rotate-[180deg]"></div>
              <div className="md:hidden bg-[linear-gradient(270deg,rgba(255,255,255,0)_0%,#ffffff_100%)] absolute -left-[5px] md:left-0 bottom-[0] w-[96px] h-[72px] z-10"></div>

              <div className=" gap-6 justify-center hidden md:flex">
                {ratings.map((item, index) => (
                  <div
                    key={index}
                    className="text-center min-w-[120px] max-w-[130px]"
                  >
                    <div className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] mx-auto mb-2 relative">
                      <CustomImage
                        src={item.image}
                        alt={item.text}
                        className="object-cover rounded-2xl"
                        fill
                      />
                    </div>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex md:hidden gap-6 justify-center animate-scroll-faster md:animate-none">
                {[...ratings, ...ratings].map((item, index) => (
                  <div
                    key={index}
                    className="text-center min-w-[120px] max-w-[130px]"
                  >
                    <div className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] mx-auto mb-2 relative">
                      <CustomImage
                        src={item.image}
                        alt={item.text}
                        className="object-cover rounded-2xl"
                        fill
                      />
                    </div>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HighesttRate;
