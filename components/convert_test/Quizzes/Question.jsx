import Link from "next/link";
import ProgressIndicatorTC from "./ProgressIndicatorTC";

const Question = ({
  no,
  total_question,
  title,
  options,
  onOptionSelect,
  answers = [],
}) => {
  return (
    <>
      <div className="w-full p-1 lg:p-8" id={`question-${no}`}>
        <div className="flex flex-col text-center items-center">
          <ProgressIndicatorTC
            currentQuestion={no}
            totalQuestions={total_question}
          ></ProgressIndicatorTC>
          <h2 className="font-[450] text-[26px]  lg:text-[40px] leading-[120%] tracking-[0px]">
            {title}
          </h2>

          <div>
            <div className="flex flex-col gap-4 mt-8">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => onOptionSelect(no, option.id)}
                  //isSelected={answers[1] === option.id}
                  className={`
                      w-full  md:w-[400px] h-[44px] p-4 border 
                  rounded-full text-center transition-colors  flex justify-center items-center
                  text-[14px] font-[POPPINS] font-medium leading-[140%] tracking-[0px] 
                  ${
                    answers[no] === option.id
                      ? "bg-[#03A670] text-white border-[#03A670]"
                      : "bg-white text-black border-gray-300"
                  }
                  hover:bg-[#03A670] hover:text-white border-gray-300
                    `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
