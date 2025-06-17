import Section from "../../utils/Section";
import HolisticSection from "./HolisticSection";
import ImageItem from "./ImageItem";
import Shape from "./Shape";

const ImageCards = [
  {
    title: "Overcome Biology With Science",
    description:
      "Weight loss isn’t just about willpower. Get access to prescription-only weight loss treatments designed to regulate appetite, overcome biological factors and support long-term results.",
    image: "/bo3/sec2Image.png",
    bgColor: "bg-gradient-to-r from-[#F8F8F7] to-[#F5F4EF]"
  },
  {
    title: "Dedicated Support At Your Fingertips",
    description:
      "Keep the weight off with 1:1 guidance & 24/7 support from licensed medical providers. Connect with your provider instantly through our platform.",
    image: "/bo3/sec2Image2.png",
    bgColor: "bg-gradient-to-r from-[#FBF9F7] to-[#EBE3D8]",
  },
];

const ImagesSection = () => {
  return (
    <>
      <Section>
        <div className="relative">
          <div className="flex flex-col sm:flex-row gap-8">
            {ImageCards.map((imageCard, key) => (
              <ImageItem
                className={`flex-1 md:px-[40px] md:pt-[40px] px-[16px] pt-[24px] ${imageCard.bgColor}`}
                image={imageCard.image}
                title={imageCard.title}
                description={imageCard.description}
                key={key}
                showBg={key == 0 ? true : false}
              />
            ))}
          </div>
          <HolisticSection></HolisticSection>
        </div>
      </Section>
    </>
  );
};

export default ImagesSection;
