"use client";

import { useState, useEffect } from "react";
import CustomContainImage from "../utils/CustomContainImage";
import { FaInfoCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";

const CrossSellModal = ({
  isOpen,
  onClose,
  selectedProduct,
  onCheckout,
  isLoading,
}) => {
  // Early validation - don't even try to initialize the modal with invalid product data
  if (
    isOpen &&
    (!selectedProduct ||
      !selectedProduct.productIds ||
      selectedProduct.price === 0)
  ) {
    console.error(
      "Invalid product data provided to CrossSellModal:",
      selectedProduct
    );
    // Close the modal if it was somehow opened with invalid data
    if (typeof onClose === "function") {
      setTimeout(() => onClose(), 0);
    }
    return null;
  }

  const [addedProducts, setAddedProducts] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [deliveryDate, setDeliveryDate] = useState("Thursday");
  const [openDescriptions, setOpenDescriptions] = useState({});
  const [checkoutUrl, setCheckoutUrl] = useState("#");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup in case modal is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Create the countdown effect using localStorage
  useEffect(() => {
    if (!isOpen) return;

    // Initialize or update the delivery time
    const initializeDeliveryTime = () => {
      // Check if there's a stored time
      const storageTime =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("testTime"))
          : null;
      let deliveryTime = storageTime;
      const compareTime = new Date().getTime() + 4 * 60 * 60 * 1000; // 4 hours from now

      // Logic for setting/updating delivery time
      if (storageTime) {
        if (deliveryTime < compareTime) {
          // If less than 4 hours left, reset to 16 hours from now
          const newDeliveryTime = new Date().getTime() + 16 * 60 * 60 * 1000;
          if (typeof window !== "undefined") {
            localStorage.setItem("testTime", JSON.stringify(newDeliveryTime));
          }
          deliveryTime = newDeliveryTime;
        }
      } else {
        // If no stored time, set to 16 hours from now
        const newDeliveryTime = new Date().getTime() + 16 * 60 * 60 * 1000;
        if (typeof window !== "undefined") {
          localStorage.setItem("testTime", JSON.stringify(newDeliveryTime));
        }
        deliveryTime = newDeliveryTime;
      }

      return deliveryTime;
    };

    // Calculate and set delivery day of week
    const calculateDeliveryDay = () => {
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 2); // Delivery in 2 days

      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return days[deliveryDate.getDay()];
    };

    const deliveryTime = initializeDeliveryTime();
    setDeliveryDate(calculateDeliveryDay());

    // Update countdown every second
    const updateRemainingTime = () => {
      const currentTime = new Date().getTime();
      const timeDifference = deliveryTime - currentTime;

      if (timeDifference <= 0) {
        // Time expired, reset
        const newDeliveryTime = new Date().getTime() + 16 * 60 * 60 * 1000;
        if (typeof window !== "undefined") {
          localStorage.setItem("testTime", JSON.stringify(newDeliveryTime));
        }

        // Recalculate with new time
        const newTimeDifference = newDeliveryTime - currentTime;

        const hours = Math.floor(newTimeDifference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (newTimeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((newTimeDifference % (1000 * 60)) / 1000);

        setTimeRemaining({ hours, minutes, seconds });
      } else {
        // Calculate remaining time
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeRemaining({ hours, minutes, seconds });
      }
    };

    // Initial update
    updateRemainingTime();

    // Set interval for countdown
    const intervalId = setInterval(updateRemainingTime, 1000);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [isOpen]);

  const addOnProducts = [
    {
      id: "262914",
      title: "Essential T-Boost",
      price: 35,
      quantity: "60 Capsules",
      frequency: "30-days supply",
      image:
        "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/webp-images/support-removebg-preview.webp",
      description:
        "Helps improve overall testosterone levels, enhance libido, and promote a sense of well-being.",
      dataType: "simple",
      dataVar: "",
      dataAddToCart: "262914",
    },
    // {
    //   id: "276",
    //   title: "Lidocaine Cream",
    //   price: 35,
    //   quantity: "(30 applications-30g)",
    //   frequency: "One time purchase",
    //   image:
    //     "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/webp-images/RockyHealth-HQ-113-scaled-300x300.webp",
    //   description:
    //     "- Last 6-8x longer in bed\n- Works in 5-10 mins\n- 20-30 uses",
    //   dataType: "subscription",
    //   dataVar: "1_month_1",
    //   dataAddToCart:
    //     "276&convert_to_sub_276=1_month_1&quantity=1&add-product-subscription=276",
    // },
    // {
    //   id: "52162",
    //   title: "Lidocaine Spray",
    //   price: 35,
    //   quantity: "(30 applications-30g)",
    //   frequency: "One time purchase",
    //   image:
    //     "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/webp-images/RockyHealth-May2022-HQ-137-600x900.webp",
    //   description:
    //     "- Last 6-8x longer in bed\n- Works in 2-5 mins\n- Easy spray on\n- 20-30 uses",
    //   dataType: "subscription",
    //   dataVar: "1_month_1",
    //   dataAddToCart:
    //     "52162&convert_to_sub_52162=1_month_1&quantity=1&add-product-subscription=52162",
    // },
    // {
    //   id: "13534",
    //   title: "Durex Condoms",
    //   price: 10,
    //   quantity: "(Pack of 10)",
    //   frequency: "One time purchase",
    //   image:
    //     "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/RockyHealth-August-2022-HQ-14-300x300.jpeg",
    //   description:
    //     "- Fitted shape for exceptional sensitivity and feel\n- 20% thinner than standard condoms",
    //   dataType: "simple",
    //   dataVar: "",
    //   dataAddToCart: "13534",
    // },
    {
      id: "353755",
      title: "Rocky Dad Hat",
      price: 30,
      quantity: "",
      frequency: "One time purchase",
      image:
        "https://mycdn.myrocky.ca/wp-content/uploads/20241211132726/Copy-of-RockyHealth-15-scaled.webp",
      description: "",
      dataType: "simple",
      dataVar: "",
      dataAddToCart: "353755",
    },
    {
      id: "359245",
      title: "DHM Blend",
      price: 19,
      quantity: "(5 pack)",
      frequency: "One time purchase",
      image:
        "https://rh-staging.etk-tech.com/wp-content/uploads/Screenshot-2024-12-19-183607.png",
      description:
        "DHM Blend is a science-backed formulation featuring Dihydromyricetin (DHM), L-Cysteine, Milk Thistle, Prickly Pear, and a Vitamin B Complex.\nPortable & Convenient: Compact packaging makes it easy to carry in your pocket or purse.\nAffordable: Just a few dollars per serving.\nTrusted Worldwide: Over 300,000 customers globally have made DHM Blend their go-to choice.",
      dataType: "simple",
      dataVar: "",
      dataAddToCart: "359245",
    },
  ];

  // Function to get full addon product details from its ID
  const getAddonById = (addonId) => {
    return addOnProducts.find((addon) => addon.id === addonId);
  };

  const toggleAddon = (addonId) => {
    if (addedProducts.includes(addonId)) {
      setAddedProducts(addedProducts.filter((id) => id !== addonId));
    } else {
      setAddedProducts([...addedProducts, addonId]);
    }
  };

  const toggleDescription = (addonId) => {
    setOpenDescriptions({
      ...openDescriptions,
      [addonId]: !openDescriptions[addonId],
    });
  };

  // Generate checkout URL for the href

  // Handle the checkout process
  const handleCheckout = async () => {
    try {
      console.log("ED checkout clicked with addons:", addedProducts);

      // Create main product data
      const mainProduct = {
        id: selectedProduct.productIds,
        name: selectedProduct.name,
        price: selectedProduct.price,
        isSubscription: selectedProduct.frequency === "monthly-supply",
      };

      // Create addon data with proper structure
      const selectedAddons = addedProducts
        .map((addonId) => {
          const addon = getAddonById(addonId);
          if (addon) {
            return {
              id: addon.dataAddToCart || addon.id,
              dataAddToCart: addon.dataAddToCart || addon.id,
              name: addon.title,
              price: addon.price,
              isSubscription: addon.dataType === "subscription",
            };
          }
          return null;
        })
        .filter(Boolean);
      console.log("ED main product:", mainProduct);
      console.log("ED selected addons:", selectedAddons);
      // Use the centralized addToCartAndRedirect function
      if (onCheckout) {
        onCheckout(selectedAddons);
      }
    } catch (error) {
      console.error("Error during ED checkout:", error);
      alert("There was an issue processing your checkout. Please try again.");
    }
  };

  /// Handle slider arrows for mobile scrolling
  const handleSliderArrow = (direction) => {
    const slider = document.querySelector(".addons-slider");
    if (slider) {
      const scrollAmount = direction === "left" ? -250 : 250;
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Return null if modal is not open, but only after all state hooks have been declared
  if (!isOpen) return null;

  return (
    <div className="new-cross-sell-popup fixed w-screen m-auto bg-[#FFFFFF] z-[9999] top-[0] left-[0] flex flex-col headers-font tracking-tight h-[100vh] overflow-auto">
      <div className="new-cross-sell-popup-cart-section w-[100%] max-w-7xl p-5 md:pr-10 pb-6 md:pb-12 py-12 min-h-fit mx-auto">
        <div className="popup-cart-product-row-wrapper">
          <div className="congratulations relative bg-[#f5f5f0] rounded-xl text-sm px-2 p-2 md:px-4 md:p-4 border border-solid border-[#E2E2E1]">
            <p className="text-left">
              Congrats! You get <span className="font-bold">FREE 2-day</span>{" "}
              express shipping.
              <FaInfoCircle
                className="ml-1 inline-block cursor-pointer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
            </p>
            {showTooltip && (
              <div className="absolute bg-white text-[#444] py-[10px] px-[20px] rounded-md border border-solid border-[#757575] top-12 left-4">
                2 day shipping applies from the date the prescription is issued.
              </div>
            )}
          </div>

          <div className="mt-4 md:mt-8 flex border-b border-gray-200 border-solid md:py-[12px] px-10 justify-between">
            <div>
              <p className="font-[500] text-[12px] text-[#212121] hidden md:block">
                Product
              </p>
            </div>
            <div className="flex flex-col items-end justify-center">
              <p className="font-[500] text-[12px] text-[#212121] hidden md:block">
                <span>Total</span>
              </p>
            </div>
          </div>

          {/* Main product */}
          <div className="flex border-b border-gray-200 border-solid  py-[24px] md:px-10 justify-between">
            <div className="flex items-center gap-3">
              <div className="overflow-hidden relative float-right min-h-[70px] min-w-[70px] h-[70px] w-[70px] block rounded-xl bg-[#f3f3f3] p-1">
                <CustomContainImage
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                />
              </div>
              <div>
                <p className="font-semibold text-[14px] text-gray-800 text-left max-w-[150px] md:max-w-full">
                  {selectedProduct.name || ""} - ({selectedProduct.dosage || ""}
                  )
                </p>

                <p className="text-[12px] text-[#212121] block text-left">
                  {selectedProduct.frequency === "monthly-supply"
                    ? "Every One Month"
                    : "Every Three Months"}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end justify-center">
              <p className="font-[500] text-[14px] text-black">
                <span className="popup-cart-main-item-price">
                  ${selectedProduct?.price || ""}
                </span>
              </p>
              <p className="popup-cart-main-item-frequency font-[400] text-[12px] text-[#212121] capitalize text-right">
                {selectedProduct.pills} pills ({selectedProduct.preference})
              </p>
              {/* <p className="font-normal text-[16px] text-gray-800">
                ${selectedProduct.price}{" "}
                <span className="text-xs text-gray-500">
                  {selectedProduct.pills} pills ({selectedProduct.preference})
                </span>
              </p> */}
            </div>
          </div>

          {/* Added addon products */}
          {addedProducts.length > 0 &&
            addedProducts.map((addonId) => {
              const addon = getAddonById(addonId);
              return (
                <div
                  key={addon.id}
                  className="popup-cart-product-row flex border-b border-gray-200 border-solid py-[24px] md:px-10 justify-between relative"
                >
                  <div className="flex items-center gap-3 relative">
                    {/* <button
                      onClick={() => toggleAddon(addon.id)}
                      className="remove-addon-item absolute -translate-y-2/4 top-2/4 left-[-35px]   "
                    >
                      <RiDeleteBin6Line className="text-2xl text-black hover:text-gray-500 duration-100 " />
                    </button> */}
                    <div className="relative overflow-hidden float-right min-h-[70px] min-w-[70px] h-[70px] w-[70px] block rounded-xl bg-[#f3f3f3] p-1">
                      <CustomContainImage
                        src={addon.image}
                        alt={addon.title}
                        fill
                      />
                    </div>
                    <div>
                      <p className="popup-cart-item-title font-semibold text-[14px] text-gray-800 text-left">
                        {addon.title}
                      </p>
                      <span className="popup-cart-item-quantity text-[12px] text-[#212121] block text-left">
                        {addon.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center">
                    <p className="font-[500] text-[14px] text-black">
                      <span className="popup-cart-item-price">
                        ${addon.price}
                      </span>
                    </p>
                    <p className="popup-cart-item-frequency font-[400] text-[12px] text-[#212121] capitalize text-right">
                      {addon.frequency}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex justify-end pt-2 static checkout-btn-new w-auto bg-transparent p-0">
          <button
            onClick={handleCheckout}
            className="block bg-black border-0 rounded-full text-white p-2 px-10 mt-2 md:mt-4 w-full text-center md:w-fit"
          >
            Checkout
          </button>
        </div>

        <div className="text-center md:text-end mt-[12px] md:mt-[24px] text-[14px] font-[400]">
          Order within{" "}
          <span className="text-[#814B00]">
            {timeRemaining.hours}h{" "}
            {String(timeRemaining.minutes).padStart(2, "0")}m{" "}
            {String(timeRemaining.seconds).padStart(2, "0")}s{" "}
          </span>
          for delivery on {deliveryDate}
        </div>
      </div>
      <style jsx>{`
        .addons-slider {
          -ms-overflow-style: none; /* For Internet Explorer and Edge */
          scrollbar-width: none; /* For Firefox */
        }

        .addons-slider::-webkit-scrollbar {
          display: none; /* For Chrome, Safari, and Opera */
        }

        .right-arrow {
          right: calc(25% - 300px);
        }

        .left-arrow {
          left: calc(25% - 300px);
        }

        .slider-arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          color: black;
          font-weight: bolder;
          top: 180px;
          position: absolute;
          cursor: pointer;
          z-index: 100000;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      <div className="bg-[#f9f9f9]">
        <div className="new-cross-sell-popup-addons-section p-[2%] pt-5 max-w-7xl mx-auto">
          <h3 className="text-center text-[#000000] text-[22px] md:text-[24px] leading-[115%] headers-font mt-4">
            Our recommended Add-ons
          </h3>
          <p className="text-center text-[14px] md:text-[16px] font-[400] text-black leading-[140%] max-w-[257px] md:max-w-full mx-auto mt-2">
            Get exclusive savings on our most popular products
          </p>

          <div className="slider-arrows relative hidden md:block">
            <span
              className="slider-arrow left-arrow shadow-md"
              onClick={() => handleSliderArrow("left")}
            >
              <FaChevronLeft size="1em" />
            </span>

            <span
              className="slider-arrow right-arrow shadow-md"
              onClick={() => handleSliderArrow("right")}
            >
              <FaChevronRight size="1em" />
            </span>
          </div>

          <div className="grid grid-cols-2 md:flex w-[100%] mt-10 overflow-x-auto addons-slider gap-4 pb-1">
            {addOnProducts.map((addon) => (
              <div
                key={addon.id}
                className="basis-1/2 md:basis-1/4 md:min-w-[220px]"
              >
                <div className="relative shadow rounded-[12px] overflow-hidden bg-[#FFFFFF] border-solid min-h-[220px] flex flex-col">
                  <div className={`addon${addon.id}-box-top relative`}>
                    <a
                      data-addon-class={`addon${addon.id}-box-body-alt-text`}
                      href="#"
                      className="addon-toggle absolute top-[10px] right-[10px] cursor-pointer border border-gray-400 text-xs text-gray-500 border-solid rounded-[25px] w-[15px] h-[15px] text-center leading-[14px] z-[9999]"
                      onClick={(e) => toggleDescription(addon.id, e)}
                    >
                      !
                    </a>
                  </div>
                  {!openDescriptions[addon.id] ? (
                    <div
                      className={`addon${addon.id}-box-body relative my-[20px] mx-4 flex flex-col flex-grow`}
                    >
                      <div className="text-center">
                        <img
                          loading="lazy"
                          className="w-[135px] h-[135px] mx-auto mb-4 block rounded object-cover"
                          src={addon.image}
                          alt={addon.title}
                        />
                      </div>
                      <div className="text-center mb-2 border-b border-gray-200 border-solid border-1 flex-grow">
                        <h4 className="text-center font-semibold text-[14px] leading-[19px] min-h-[38px] flex items-center justify-center">
                          {" "}
                          .{addon.title}
                        </h4>
                        <small className="text-center text-[#212121] font-[400] text-[12px] mb-2 inline-block">
                          {addon.quantity}
                        </small>
                      </div>
                      <p className="font-[500] text-[14px] text-black text-center">
                        ${addon.price}
                      </p>
                      {/* <button
                        onClick={() => toggleAddon(addon.id)}
                        className={`data-addon-id-${
                          addon.id
                        } add-to-cart-addon-product cursor-pointer border ${
                          addedProducts.includes(addon.id)
                            ? "border-[#814B00] text-[#814B00]"
                            : "border-[#D8D8D8] text-black"
                        } border-solid rounded-full w-full text-center font-[500] text-[14px] block py-2 mt-2`}
                        data-addon-id={addon.id}
                        data-title={addon.title}
                        data-price={addon.price}
                        data-addtocart={addon.id}
                        data-quantity={addon.quantity}
                        data-frequency={addon.frequency}
                        data-image={addon.image}
                      >
                        {addedProducts.includes(addon.id)
                          ? "Added to Cart"
                          : "Add To Cart"}
                      </button> */}
                      <div className="flex items-center gap-2 w-full">
                        <button
                          onClick={() => {
                            if (!addedProducts.includes(addon.id)) {
                              setAddedProducts([...addedProducts, addon.id]);
                            }
                          }}
                          className={`data-addon-id-${
                            addon.id
                          } add-to-cart-addon-product cursor-pointer border ${
                            addedProducts.includes(addon.id)
                              ? "border-[#814B00] text-[#814B00]"
                              : "border-[#D8D8D8] text-black"
                          } border-solid rounded-full w-full text-center font-[500] text-[14px] block py-2 mt-2`}
                          data-addon-id={addon.id}
                          data-title={addon.title}
                          data-price={addon.price}
                          data-addtocart={addon.id}
                          data-quantity={addon.quantity}
                          data-frequency={addon.frequency}
                          data-image={addon.image}
                          style={{ position: "relative", zIndex: 20 }}
                          disabled={addedProducts.includes(addon.id)}
                        >
                          {addedProducts.includes(addon.id)
                            ? "Added to Cart"
                            : "Add To Cart"}
                        </button>
                        {addedProducts.includes(addon.id) && (
                          <button
                            onClick={() =>
                              setAddedProducts(
                                addedProducts.filter((id) => id !== addon.id)
                              )
                            }
                            className="remove-addon-item mt-2"
                            aria-label="Remove addon"
                            type="button"
                          >
                            <RiDeleteBin6Line className="text-2xl text-red-500 hover:text-red-700 duration-100" />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`addon${addon.id}-box-body-alt-text absolute bg-[#FFFFFF] px-3 py-2 top-[0] z-[999] h-[100%] w-[100%]`}
                    >
                      <p className="text-gray-600 text-[11px] md:text-[13px] border-b border-gray-200 border-solid border-1 my-2 mt-4">
                        {addon.description}
                      </p>
                      <p className="font-semibold text-sm text-gray-800">
                        ${addon.price}
                      </p>
                      <p className="font-normal text-[12px] text-gray-500">
                        {addon.frequency}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="my-2 border-b border-gray-300 border-solid border-1">
            &nbsp;
          </div>
          <p className="text-center text-[12px] font-normal text-gray-600">
            Subscription plan auto renews
          </p>
          <p className="text-center text-[12px] font-normal text-gray-600">
            Subscription can be cancelled anytime
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="cross-sell-close-popup  new-popup-dialog-close-button dialog-lightbox-close-button absolute top-3 md:top-5 right-3 md:right-10 z-[99999] cursor-pointer "
      >
        <IoIosCloseCircleOutline className="text-2xl md:text-4xl" />
      </button>
    </div>
  );
};

export default CrossSellModal;
