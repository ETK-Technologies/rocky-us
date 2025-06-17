const MoneyBack = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
      <div className="w-[147px] h-[147px]">
        <img
          loading="lazy"
          src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/MoneyBack.png"
          alt="Lose-Weight-or-Your-Money-Back"
          className="mx-auto w-full object-cover"
        />
      </div>
      <div className="text-center lg:text-start">
        <h2 className="text-[22px] lg:text-[40px] font-[550] headers-font mb-2">
          See Progress or Your Money Back
        </h2>
        <p className="text-[#535353] text-[14px] lg:text-[16px] font-[400] mb-4">
          Transform your body or we'll fully refund all your consultation costs.
        </p>
        <a
          href="#"
          id="open-modal"
          className="underline text-[16px] font-[500]"
        >
          Learn more
        </a>
      </div>
    </div>
  );
};

export default MoneyBack;
