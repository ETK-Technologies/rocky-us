import CustomContainImage from "@/components/utils/CustomContainImage";

const PillSliderImages = [
  {
    image: "/pre_ed/pill-1.png",
  },
  {
    image: "/pre_ed/pill-2.png",
  },
  {
    image: "/pre_ed/pill-4.png",
  },
  {
    image: "/pre_ed/pill-1.png",
  },
  {
    image: "/pre_ed/pill-2.png",
  },
  {
    image: "/pre_ed/pill-4.png",
  },
  {
    image: "/pre_ed/pill-1.png",
  },
  {
    image: "/pre_ed/pill-2.png",
  },
  {
    image: "/pre_ed/pill-4.png",
  },

  {
    image: "/pre_ed/pill-1.png",
  },
  {
    image: "/pre_ed/pill-2.png",
  },
  {
    image: "/pre_ed/pill-4.png",
  },
  {
    image: "/pre_ed/pill-1.png",
  },
  {
    image: "/pre_ed/pill-2.png",
  },
  {
    image: "/pre_ed/pill-4.png",
  },
];

const PillSlider = () => {
  return (
    <div className="px-5 py-8">
      <div className="max-w-[1184px] mx-auto relative overflow-hidden w-full  py-10 ">
        <div className="flex items-center whitespace-nowrap w-fit  relative animate-scroll">
          {PillSliderImages.concat(PillSliderImages).map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0 min-w-[150px] max-w-[300px]"
            >
              <div className="relative rounded-2xl overflow-hidden w-full min-h-[100px] flex justify-center items-center ">
                <CustomContainImage src={card.image} fill />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PillSlider;
