import HighlightedText from "./HighlightedText";
import FAQItem from "./FAQItem";

export default function HighlightedFAQItem({ question, answer, highlight }) {
  return (
    <FAQItem
      question={<HighlightedText text={question} highlight={highlight} />}
      answer={<HighlightedText text={answer} highlight={highlight} />}
    />
  );
}
