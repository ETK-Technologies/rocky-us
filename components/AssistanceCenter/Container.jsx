import Section from "../utils/Section";
import CardContainer from "./CardContainer";

const Container = ({ title, cards }) => {
  return (
    <Section>
      <h1 className="text-2xl leading-[36.8px] mb-16 lg:text-4xl font-[500] headers-font lg:leading-[48px] headers-font text-center">
        {title}
      </h1>
      <CardContainer cards={cards}></CardContainer>
    </Section>
  );
};

export default Container;
