import Card from "./Card";

const CardContainer = ({ cards }) => {
  return (
    <div className="flex gap-4 items-center md:justify-center overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-2xl">
      {cards.map((card, index) => (
            <Card key={ index } card={card}></Card>
          ))}
    </div>
  );
};

export default CardContainer;
