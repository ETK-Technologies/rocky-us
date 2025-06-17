import CustomContainImage from "@/components/utils/CustomContainImage";

const PillSliderImages = [
  {
    image: "https://stg-1.rocky.health/wp-content/uploads/3-2.png",
  },
  {
    image: "https://stg-1.rocky.health/wp-content/uploads/1-3.png",
  },
  {
    image: "https://stg-1.rocky.health/wp-content/uploads/3-2.png",
  },
  {
    image: "https://stg-1.rocky.health/wp-content/uploads/1-3.png",
  },
  {
    image: "https://stg-1.rocky.health/wp-content/uploads/3-2.png",
  },
  {
    image: "https://stg-1.rocky.health/wp-content/uploads/1-3.png",
  },
  {
    image: "https://stg-1.rocky.health/wp-content/uploads/3-2.png",
  },
  {
    image: "https://stg-1.rocky.health/wp-content/uploads/1-3.png",
  },
  {
    image: "https://stg-1.rocky.health/wp-content/uploads/3-2.png",
  },
  {
    image: "https://stg-1.rocky.health/wp-content/uploads/1-3.png",
  },
];

const PillSlider = () => {
  return (
    <div className="px-5 py-8">
      <div className="max-w-[1184px] mx-auto relative overflow-hidden w-full  py-10 ">
        <div className="md:hidden bg-[linear-gradient(270deg,rgba(255,255,255,0)_0%,#ffffff_100%)] absolute -right-[5px] md:right-0 top-[85px] w-[80px] h-[39px] z-10 rotate-[180deg]"></div>
        <div className="md:hidden bg-[linear-gradient(270deg,rgba(255,255,255,0)_0%,#ffffff_100%)] absolute -left-[5px] md:left-0 top-[85px] w-[80px] h-[39px] z-10"></div>
        <div className="flex items-center gap-[40px] md:gap-[82px] whitespace-nowrap w-fit h-[39px] relative animate-scroll">
          {PillSliderImages.concat(PillSliderImages).map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0 min-w-[150px] max-w-[300px]"
            >
              <div className="relative rounded-2xl overflow-hidden w-full min-h-[100px] flex justify-center items-center ">
                <CustomContainImage
                  src={card.image}
                  // className="object-contain filter brightness-0 grayscale"
                  fill
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PillSlider;
