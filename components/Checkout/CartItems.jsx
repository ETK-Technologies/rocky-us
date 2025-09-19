import Image from "next/image";

const CartItems = ({ items }) => {
  // Handle case where items might be undefined or empty
  if (!items || items.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-gray-500">No items in cart</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {items.map((item) => (
        <div key={item.key}>
          <CartItem item={item} />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CartItems;

const CartItem = ({ item }) => {
  const itemPrice = item.totals.line_total / 100;

  const currencySymbol = item.prices.currency_symbol || "$"; // Default to $

  const subscription = item.extensions?.subscriptions;
  const isSubscription = subscription && subscription.billing_interval;

  // Special handling for Oral Semaglutide product (ID: 490537)
  // This product should be treated as a monthly subscription even if WooCommerce metadata is missing
  const isOralSemaglutide = item.id === 490537 || item.product_id === 490537;
  const isSubscriptionWithFallback = isSubscription || isOralSemaglutide;

  let supply = "";
  if (
    subscription &&
    subscription.billing_interval &&
    subscription.billing_period
  ) {
    const interval = subscription.billing_interval;
    const period = subscription.billing_period;

    // Pluralize the period if interval > 1
    const pluralPeriod = interval > 1 ? `${period}s` : period;
    supply = `every ${interval} ${pluralPeriod}`;
  } else if (isOralSemaglutide) {
    // Default to monthly for Oral Semaglutide if no subscription data
    supply = "every 4 weeks";
  }

  const intervalText = isSubscriptionWithFallback ? `${supply}` : "";

  return (
    <div className="flex gap-4 py-4 w-full">
      <Image
        width={65}
        height={65}
        src={item.images[0]?.thumbnail}
        alt={item.name}
        className="rounded-md min-w-[65px] min-h-[65px] w-[65px] h-[65px]"
      />
      <div className="text-[14px] font-semibold">
        <h5>
          <span dangerouslySetInnerHTML={{ __html: item.name }}></span>{" "}
          {!isSubscriptionWithFallback &&
            item.variation[0] &&
            `(${item.variation[0]?.value})`}
        </h5>

        {item.name != "Body Optimization Program" && (
          <p className="text-[12px]">
            {currencySymbol}
            {itemPrice.toFixed(2)} /{" "}
            <span className="text-[12px]  font-normal">
              {isSubscriptionWithFallback && intervalText}
              {!isSubscriptionWithFallback &&
                item.variation[1] &&
                item.variation[1]?.value}
            </span>
          </p>
        )}
        {item.name === "Body Optimization Program" && (
          <div className="flex flex-col">
            <p className="text-sm md:text-base font-[500] text-[#212121] underline text-nowrap">
              Monthly membership:
            </p>
            <p className="text-sm md:text-base font-[300] text-[#212121]">
              Consultation fee $99 | Monthly follow-up fee $99
            </p>
            <p className="text-sm md:text-base font-[500] text-[#212121] mt-2 underline">
              Includes:
            </p>
            <ul className="text-sm md:text-base font-[300] text-[#212121] list-none pl-5">
              <li className="text-nowrap">- Monthly prescription</li>
              <li className="text-nowrap">- Follow-ups with clinicians</li>
              <li className="text-nowrap">- Pharmacist counselling</li>
            </ul>
          </div>
        )}
        <p className="text-gray-500 mt-1 font-thin text-[12px]">
          {isSubscriptionWithFallback && "Pause Or Cancel Anytime"}
        </p>
      </div>
    </div>
  );
};
