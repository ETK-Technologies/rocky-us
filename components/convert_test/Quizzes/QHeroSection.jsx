import CustomImage from "@/components/utils/CustomImage";
import Question from "./Question";

const QHeroSection = ({img, firstQuestion, total_questions, onOptionSelect = null, answers =[]}) => {

    return (<>
        <div className="flex gap-4 flex-col lg:flex-row items-center max-w-[1184px] mx-auto px-5 pt-2">
            <div className="flex-1">
                <CustomImage src={img} className="w-full h-auto rounded-[16px]" width="1000" height="1000"></CustomImage>
            </div>
            <div className="flex-1">
                <Question no="1" onOptionSelect={onOptionSelect} answers={answers} total_question={total_questions} title={firstQuestion.title} options={firstQuestion.options}></Question>
            </div>
        </div>
    </>);
};

export default QHeroSection;