const ZonnicIngredients = ({ data: ingredientsData }) => {
  // Default static data
  const defaultData = {
    title: "ZONNIC Ingredients Explained.",
    subtitle:
      "Ingredients: Water, plant-based fibres, flavouring, sweetener, and nicotine.",
    imageUrl:
      "https://myrocky.b-cdn.net/WP%20Images/zonnic/ingredients-explained.png",
    bgColor:
      "bg-[linear-gradient(180deg,#B7F7AD_46.17%,#91D787_99.42%)] md:bg-[linear-gradient(90deg,#B7F7AD_31%,#91D787_99.92%)]",
    ingredients: [
      {
        name: "Plant-based fibres",
        img: "https://myrocky.b-cdn.net/WP%20Images/zonnic/Plant-based-fibres.png",
      },
      {
        name: "Water",
        img: "https://myrocky.b-cdn.net/WP%20Images/zonnic/Water.png",
      },
      {
        name: "Sweetener",
        img: "https://myrocky.b-cdn.net/WP%20Images/zonnic/Sweetener.png",
      },
      {
        name: "Nicotine",
        img: "https://myrocky.b-cdn.net/WP%20Images/zonnic/Nicotine.png",
      },
      {
        name: "Flavouring",
        img: "https://myrocky.b-cdn.net/WP%20Images/zonnic/Flavouring.png",
      },
    ],
  };

  const { title, subtitle, imageUrl, ingredients, bgColor } =
    ingredientsData || defaultData;

  return (
    <div className="mx-auto flex flex-col md:flex-row justify-between rounded-[16px] overflow-hidden md:min-h-[600px] ">
      <div
        className={`flex flex-col justify-center px-4 md:px-14 pt-10 md:pt-0 w-full min-h-full md:max-w-[592px] ${bgColor}`}
      >
        <h2 className="text-[32px] font-[450] md:text-[48px] leading-9 md:leading-[54px] headers-font mb-3">
          {title}
        </h2>
        <p className="text-[16px] md:text-[20px] font-[400] leading-[24px] md:leading-[30px] max-w-[290px] md:max-w-[462px] mb-8 md:mb-10">
          <span className="font-bold">ZONNIC</span> {subtitle}
        </p>
        <ul className="flex md:gap-5 justify-between max-w-[372px]">
          <div>
            {ingredients.slice(0, 3).map((item, index) => (
              <li key={index} className="flex items-center gap-2 mb-3">
                {item.img ? (
                  <img
                    className="w-[24px] h-[24px]"
                    src={item.img}
                    alt={item.name}
                  />
                ) : (
                  <span className="text-[20px] font-bold">•</span>
                )}
                <span className="text-[16px] md:text-[18px] font-[500]">
                  {item.name}
                </span>
              </li>
            ))}
          </div>
          <div className="flex flex-col justify-end md:justify-start">
            {ingredients.slice(3).map((item, index) => (
              <li key={index} className="flex items-center gap-2 mb-3">
                {item.img ? (
                  <img
                    className="w-[24px] h-[24px]"
                    src={item.img}
                    alt={item.name}
                  />
                ) : (
                  <span className="text-[20px] font-bold">•</span>
                )}
                <span className="text-[16px] md:text-[18px] font-[500]">
                  {item.name}
                </span>
              </li>
            ))}
          </div>
        </ul>
      </div>
      <div className="w-full h-[300px] md:h-full md:w-[592px] self-end">
        <img
          className="w-full h-full object-contain object-right"
          src={imageUrl}
          alt="ingredients-explained"
        />
      </div>
    </div>
  );
};

export default ZonnicIngredients;
