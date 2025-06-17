import ImageWithList from "@/components/ImageWithList";
import ListWithNumbers from "@/components/ListWithNumbers";
import Link from "next/link";

const items = [
  "Answer some questions",
  "Get personalized recommendations",
  "Fast delivery, discreet shipping"
];

const FindTreatment = () => {
  return (
    <ImageWithList
      image="https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/FindTreatment.webp"
      imagePosition="right"
    >
      {/* Heading */}
      <h1 className="text-[32px] lg:text-[48px] leading-[36.8px] md:leading-[53.52px] font-[550] mb-[24px] md:mb-[42px] tracking-[-0.01em] md:tracking-[-0.02em] headers-font">
        Find a Treatment That <br /> Fits Your Lifestyle
      </h1>

      {/* List */}
      <ListWithNumbers
        items={items}
        bgNumberGradient="bg-[linear-gradient(90deg,#D3876A_0%,#A55255_100%)]"
      />

      {/* Button */}
      <div className="">
        <Link
          href="/ed-prequiz/"
          className="h-11 md:px-[24px] py-3 md:py-[11.5px] rounded-[64px] flex items-center space-x-2 transition justify-center w-full md:w-fit  bg-black text-white hover:bg-gray-800"
        >
          <span className="text-[14px] leading-[19.6px] md:leading-[21px] font-[500] md:font-[400]">
            Start your quiz
          </span>
          <svg
            className="mt-1"
            width="12"
            height="11"
            viewBox="0 0 12 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 0.5L6.285 1.1965L10.075 5H0V6H10.075L6.285 9.7865L7 10.5L12 5.5L7 0.5Z"
              fill="white"
            ></path>
          </svg>
        </Link>
      </div>
    </ImageWithList>
  );
};

export default FindTreatment;
