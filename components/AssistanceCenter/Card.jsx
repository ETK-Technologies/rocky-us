import Link from "next/link";

const Card = ({ card }) => {
  return (
    <div>
      <div
        className="w-full relative md:max-w-[350px] min-w-[240px] min-h-[328px] md:min-w-[350px] h-[328px] md:h-[480px] snap-center bg-cover bg-center rounded-2xl overflow-hidden"
       style={{ backgroundImage: `url('${card.img}')` }}
      >
        <div className="flex flex-col p-[12px] md:p-[24px] w-full h-full justify-between relative z-[5]">
          <div className="text-white flex-1">
            <p className="text-[16px] mb-1">{card.category}</p>
            <h4 className="text-[22px] leading-[25.3px] md:text-[30px] md:leading-[33px] pr-10">
              {card.title}
            </h4>
          </div>
          <Link href={card.to} className="text-black flex items-center justify-center gap-4 bg-white font-semibold text-center rounded-full text-sm w-full py-3">
            <span className="">{card.btn}</span>
            <svg
              width="12"
              height="11"
              viewBox="0 0 12 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 0.5L6.285 1.1965L10.075 5H0V6H10.075L6.285 9.7865L7 10.5L12 5.5L7 0.5Z"
                fill="black"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#00000096] via-transparent to-transparent z-5"></div>
      </div>
    </div>
  );
};

export default Card;
