import CustomImage from "@/components/utils/CustomImage";

const DoctorTrustedSolutionsCards = [
  {
    title: "Private Care, <br/> 100% Online",
    description:
      "No in-person visit needed. Manage treatment in the app with a secure login.",
    image:
      "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Pre%20Sell/private%20care.webp",
    height: "480px",
    gradient:
      "linear-gradient(180deg, #A4937F 0%, rgba(191, 173, 151, 0) 60.9%)",
  },
  {
    title: "Clinically Proven <br/> Ingredients",
    description:
      "Doctor trusted, clinically tested ingredients, personalized treatments formulated for you.",
    image:
      "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Pre%20Sell/clinically%20proven.webp",
    height: "685px",
    gradient: "",
  },
  {
    title: "Vetted, Licensed Providers <br/> for Every Treatment",
    title2: "Vetted, Licensed Providers for Every Treatment",
    text: "vetted",
    description:
      "Free consultations and ongoing support from licensed providers in all Canada.",
    image:
      "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Pre%20Sell/vetted.webp",
    height: "685px",
    gradient:
      "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(194, 190, 186, 0) 87.76%)",
  },
  {
    title: "Fast,<br/> Discreet Shipping",
    description:
      "Fast & Free Delivery. You have things to do and places to be- let us do the work.",
    image:
      "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Pre%20Sell/fast%20discreet.webp",
    height: "480px",
    gradient:
      "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(131, 101, 63, 0) 54.78%)",
  },
];
const DoctorTrustedSolutions = () => {
  return (
    <>
      <h2 className="text-[25px]  lg:text-5xl font-[550] leading-[36.8px] lg:leading-[55.2px] tracking-[-0.01em]  lg:tracking-[-0.02em] mb-3 lg:mb-4 max-w-[300px] md:max-w-[560px] headers-font">
        Doctor-trusted Solutions, Personalized to You
      </h2>
      <p className="text-base lg:text-lg font-[400] leading-[22.4px] lg:leading-[25.2px] mb-10 lg:mb-14 max-w-[320px] md:max-w-full ">
        Solutions designed just for you, backed by doctors.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] ">
        {DoctorTrustedSolutionsCards &&
          DoctorTrustedSolutionsCards.map((card) => {
            return (
              <div
                className={`relative rounded-2xl overflow-hidden w-full lg:w-full h-[335px] ${
                  card.height === "480px" ? "lg:h-[480px]" : "lg:h-[685px]"
                } ${card.text === "vetted" ? "lg:-mt-[205px]" : ""}`}
                key={card.title}
                style={{ backgroundImage: card.gradient }}
              >
                <div
                  className="absolute w-full h-full z-10"
                  style={{ backgroundImage: card.gradient }}
                ></div>
                <CustomImage src={card.image} alt={card.title} fill priority />
                <div className="absolute w-full left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-center px-4 py-8 md:px-6 md:py-8">
                  <h3 className="text-[#FFFFFF] text-[28px] md:text-[40px] leading-[32.2px] md:leading-[46px] tracking-[-0.01em] md:tracking-[-0.02em] font-[450] mb-[8px] md:mb-[16px] headers-font">
                    {card.title.split("<br/>").map((line, index) => (
                      <span key={index}>
                        {line}
                        {index !== card.title.split("<br/>").length - 1 && (
                          <br />
                        )}
                      </span>
                    ))}
                  </h3>
                  <h4 className="text-[#FFFFFF] text-[16px] md:text-[18px] font-[400] leading-[22.4px] md:leading-[25.2px] text-center max-w-[285px] md:max-w-full">
                    {card.description}
                  </h4>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default DoctorTrustedSolutions;
