import CustomImage from "@/components/utils/CustomImage";
import Question from "./Question";

const QHeroSection = ({
  img,
  firstQuestion,
  total_questions,
  onOptionSelect = null,
  answers = [],
  hero_class = "",
  hero_title = "",
  hero_description = "",
}) => {
  return (
    <div
      className={`flex gap-4 flex-col lg:flex-row items-center mx-auto ${
        hero_class == "" ? "max-w-[1184px] px-5 pt-2" : ""
      }`}
    >
      <div className="flex-1">
        <div className="relative">
          {hero_title && (
            <div className="absolute top-[32px] lg:top-[53px] px-4 lg:px-[50px]  mx-auto z-10">
              <h1 className="headers_font font-[550] mb-[18px]  text-center leading-[120%] text-[26px] lg:text-[40px] text-white">
                {hero_title}
              </h1>
              <p className="leading-[140%] text-center lg:px-10 lg:text-[16px] text-[15px] text-white font-[500]">
                {hero_description}
              </p>
            </div>
          )}
          <CustomImage
            src={img}
            className={`w-full h-auto  ${hero_class || "rounded-[16px]"}`}
            width="1000"
            height="1000"
          ></CustomImage>
        </div>
      </div>
      <div className="flex-1">
        <div className={hero_class == "" ? "" : "px-5"}>
          <Question
            no="1"
            onOptionSelect={onOptionSelect}
            answers={answers}
            total_question={total_questions}
            title={firstQuestion.title}
            options={firstQuestion.options}
          ></Question>
        </div>
      </div>
    </div>
  );
};

export default QHeroSection;
