import React, { useEffect, useState } from "react";
import { addToCartAndRedirect } from "@/utils/crossSellCheckout";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";

const CrossSellPopup = ({
  isOpen,
  onClose,
  mainProduct,
  addOnProducts,
  onCheckout,
  selectedProductId,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 15,
    minutes: 38,
    seconds: 19,
  });
  const [deliveryDate, setDeliveryDate] = useState("Thursday");
  const [openDescriptions, setOpenDescriptions] = useState({});
  const [addedProducts, setAddedProducts] = useState([]);
  const [checkoutUrl, setCheckoutUrl] = useState("#");

  if (!isOpen) return null;

  // Function to get full addon product details from its ID
  const getAddonById = (addonId) => {
    return addOnProducts.find((addon) => addon.id === addonId);
  };

  // Toggle adding/removing an addon
  const toggleAddon = (addonId) => {
    if (addedProducts.includes(addonId)) {
      setAddedProducts(addedProducts.filter((id) => id !== addonId));
    } else {
      setAddedProducts([...addedProducts, addonId]);
    }
  };

  // Toggle description visibility
  const toggleDescription = (addonId, event) => {
    event.preventDefault();
    setOpenDescriptions({
      ...openDescriptions,
      [addonId]: !openDescriptions[addonId],
    });
  };

  // Generate checkout URL using the same approach as ED CrossSellModal
  const generateCheckoutUrl = () => {
    try {
      console.log("=== WL CROSS-SELL POPUP DEBUG ===");
      console.log("Main Product:", mainProduct);
      console.log("Selected Product ID:", selectedProductId);
      console.log("Added Products:", addedProducts);
      console.log("Addon Products:", addOnProducts);

      // Get main product ID
      const mainProductId = selectedProductId;
      if (!mainProductId) {
        console.error("Error: No main product ID found");
        return "#";
      }

      // Build cart URL directly - starting with the base URL
      let baseUrl = "/checkout";
      let queryParams = "?";

      // Add wl-flow parameter
      queryParams += "wl-flow=1&consultation-required=1";

      // Define weight loss product IDs that should include Body Optimization Program
      const weightLossProductIds = [
        "142975", // Ozempic
        "160468", // Mounjaro
        "250827", // Wegovy
        "369618", // Rybelsus
        "490537", // Oral Semaglutide (disabled but kept for completeness)
      ];

      // Start with main product + Body Optimization Program (always included for WL products)
      let productsString = mainProductId;

      // Always add Body Optimization Program for weight loss products
      if (weightLossProductIds.includes(mainProductId)) {
        console.log(
          `Weight loss product detected (ID: ${mainProductId}). Adding Body Optimization Program (148515) to URL (not displayed in popup)`
        );
        productsString += ",148515"; // Add BO Program to products string
      }

      // Array to hold all addon IDs (will be added to productsString later)
      const addonIds = [];

      // Now handle each addon product parameter - separate addon IDs from addon parameters
      const additionalParams = [];

      if (addedProducts.length > 0) {
        addedProducts.forEach((addonId) => {
          const addon = getAddonById(addonId);
          if (!addon) return;

          // Add addon ID to our list (to be added to productsString)
          addonIds.push(addonId);

          // CRITICAL: For subscription products, we need special subscription parameters
          if (addon.dataType === "subscription") {
            // Always add the convert_to_sub parameter for subscription products
            additionalParams.push(
              `convert_to_sub_${addonId}=${addon.dataVar || "1_month_1"}`
            );

            // Add the critical add-product-subscription parameter which is needed by WooCommerce
            additionalParams.push(`add-product-subscription=${addonId}`);

            // Add quantity parameter
            additionalParams.push(`quantity=1`);
          }
        });
      }

      // Add all addon IDs to the products string
      if (addonIds.length > 0) {
        productsString += "%2C" + addonIds.join("%2C"); // URL-encoded comma
      }

      // Add the complete product string to URL
      queryParams += `&onboarding-add-to-cart=${productsString}`;

      // Add subscription parameters for main product if it's a subscription
      if (mainProduct && mainProduct.isSubscription) {
        queryParams += `&convert_to_sub_${mainProductId}=1_month_1`;
      }

      // Add price information if available
      if (mainProduct && mainProduct.price) {
        queryParams += `&price_${mainProductId}=${encodeURIComponent(
          mainProduct.price
        )}`;
      }

      // Add all the additional parameters for addon products
      if (additionalParams.length > 0) {
        queryParams += "&" + additionalParams.join("&");
      }

      // Combine base URL and query parameters
      const finalUrl = baseUrl + queryParams;

      console.log("Generated WL checkout URL with BO Program:", finalUrl);
      return finalUrl;
    } catch (error) {
      console.error("Error generating checkout URL:", error);
      return "#"; // Fallback to hash in case of error
    }
  };

  // Handle the checkout process
  const handleCheckout = async () => {
    try {
      console.log("=== CHECKOUT BUTTON CLICKED ===");

      // Generate checkout URL
      const checkoutUrl = generateCheckoutUrl();

      if (checkoutUrl === "#") {
        throw new Error("Failed to generate checkout URL");
      }

      console.log("Redirecting to checkout URL:", checkoutUrl);

      // Navigate to the checkout URL
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("There was an issue processing your checkout. Please try again.");
    }
  };

  // Update checkout URL when dependencies change
  useEffect(() => {
    if (isOpen) {
      const url = generateCheckoutUrl();
      setCheckoutUrl(url);
    }
  }, [selectedProductId, addedProducts, mainProduct, isOpen]);

  // Handle slider arrows for mobile scrolling
  const handleSliderArrow = (direction) => {
    const slider = document.querySelector(".addons-slider");
    if (slider) {
      const scrollAmount = direction === "left" ? -250 : 250;
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      // Set up timer for countdown
      const timerInterval = setInterval(() => {
        setTimeRemaining((prev) => {
          const newSeconds = prev.seconds - 1;

          if (newSeconds < 0) {
            const newMinutes = prev.minutes - 1;

            if (newMinutes < 0) {
              const newHours = prev.hours - 1;

              if (newHours < 0) {
                // Timer expired, reset to some default value or handle as needed
                return { hours: 0, minutes: 0, seconds: 0 };
              }

              return { hours: newHours, minutes: 59, seconds: 59 };
            }

            return { ...prev, minutes: newMinutes, seconds: 59 };
          }

          return { ...prev, seconds: newSeconds };
        });
      }, 1000);

      return () => {
        clearInterval(timerInterval);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

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

          <div
            id="main-item"
            className="popup-cart-product-row flex border-b border-gray-200 border-solid py-[24px] md:px-10 justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                className="popup-cart-main-item-image object-contain float-right min-h-[70px] min-w-[70px] h-[70px] w-[70px] block rounded-xl bg-[#f3f3f3]"
                src={mainProduct?.imageUrl || "/placeholder.png"}
                alt={mainProduct?.name || "Product image"}
              />
              <div>
                <p className="popup-cart-main-item-title font-semibold text-[14px] text-gray-800 text-left">
                  {mainProduct?.name || ""}
                </p>
                <span className="popup-cart-main-item-quantity text-[12px] text-[#212121] block text-left">
                  {mainProduct?.description || ""}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end justify-center">
              <p className="font-[500] text-[14px] text-black">
                <span className="popup-cart-main-item-price">
                  ${mainProduct?.price || ""}
                </span>
              </p>
              <p className="popup-cart-main-item-frequency font-[400] text-[12px] text-[#212121] capitalize text-right">
                {mainProduct?.supply || ""}
              </p>
            </div>
          </div>

          {/* Added addon products */}
          {addedProducts.length > 0 &&
            addedProducts.map((addonId) => {
              const addon = addOnProducts.find(
                (product) => product.id === addonId
              );
              if (!addon) return null;

              return (
                <div
                  key={addon.id}
                  className="popup-cart-product-row flex border-b border-gray-200 border-solid py-[24px] md:px-10 justify-between relative"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="popup-cart-item-image float-right min-h-[70px] min-w-[70px] h-[70px] w-[70px] block rounded-xl bg-[#f3f3f3] object-cover"
                      src={addon.imageUrl}
                      alt={addon.name}
                    />
                    <div>
                      <p className="popup-cart-item-title font-semibold text-[14px] text-gray-800 text-left">
                        {addon.name}
                      </p>
                      <span className="popup-cart-item-quantity text-[12px] text-[#212121] block text-left">
                        {addon.quantity || "1-time purchase"}
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
                      {addon.frequency || "1-time purchase"}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex justify-end pt-2 popup_cart_url_outer static checkout-btn-new w-auto bg-transparent p-0">
          <a
            className="popup-cart-checkout-url add_to_cart_btn block bg-black border-0 rounded-full text-white p-2 px-10 mt-2 md:mt-4 w-full text-center md:w-fit"
            href={checkoutUrl}
            onClick={(e) => {
              e.preventDefault();
              handleCheckout();
            }}
          >
            Checkout
          </a>
        </div>

        <div
          id="delivery-hint"
          className="text-center md:text-end mt-[12px] md:mt-[24px] text-[14px] font-[400]"
        >
          Order within{" "}
          <span className="text-[#814B00]">
            {timeRemaining.hours}h{" "}
            {String(timeRemaining.minutes).padStart(2, "0")}m{" "}
            {String(timeRemaining.seconds).padStart(2, "0")}s
          </span>{" "}
          for delivery on {deliveryDate}
        </div>
      </div>

      <div className="bg-[#f9f9f9]">
        <div className="new-cross-sell-popup-addons-section p-[2%] pt-5 max-w-7xl mx-auto">
          <h3 className="text-center text-gray-800 text-[22px] headers-font mt-4">
            Our recommended Add-ons
          </h3>
          <p className="text-center text-sm font-normal text-black px-12">
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
            {addOnProducts &&
              addOnProducts.map((addon) => (
                <div
                  key={addon.id}
                  className="basis-1/2 md:basis-1/4 md:min-w-[220px]"
                >
                  <div className="relative shadow rounded-[12px] overflow-hidden bg-[#FFFFFF] border-solid min-h-[220px]">
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
                        className={`addon${addon.id}-box-body relative my-[20px] mx-4`}
                      >
                        <div className="text-center">
                          <img
                            loading="lazy"
                            className="w-[135px] h-[135px] mx-auto mb-4 block rounded object-cover"
                            src={addon.imageUrl}
                            alt={addon.name}
                          />
                        </div>
                        <div className="text-center mb-2 border-b border-gray-200 border-solid border-1">
                          <h4 className="text-center font-semibold text-[14px] leading-[19px]">
                            {addon.name}
                          </h4>
                          <small className="text-center text-[#212121] font-[400] text-[12px] mb-2 inline-block">
                            {addon.quantity || "1-time purchase"}
                          </small>
                        </div>
                        <p className="font-[500] text-[14px] text-black text-center">
                          ${addon.price}
                        </p>
                        <div className="flex items-center gap-2 w-full">
                          <button
                            onClick={() => toggleAddon(addon.id)}
                            className={`data-addon-id-${
                              addon.id
                            } add-to-cart-addon-product cursor-pointer border ${
                              addedProducts.includes(addon.id)
                                ? "border-[#814B00] text-[#814B00]"
                                : "border-[#D8D8D8] text-black"
                            } border-solid rounded-full w-full text-center font-[500] text-[14px] block py-2 mt-2`}
                            data-addon-id={addon.id}
                            data-title={addon.name}
                            data-price={addon.price}
                            data-addtocart={addon.dataAddToCart || addon.id}
                            data-quantity={addon.quantity}
                            data-frequency={addon.frequency}
                            data-image={addon.imageUrl}
                            style={{ position: "relative", zIndex: 20 }}
                          >
                            {addedProducts.includes(addon.id)
                              ? "Added to Cart"
                              : "Add To Cart"}
                          </button>
                          {addedProducts.includes(addon.id) && (
                            <button
                              onClick={() => toggleAddon(addon.id)}
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
                          {addon.frequency || "1-time purchase"}
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
        className="cross-sell-close-popup new-popup-dialog-close-button dialog-lightbox-close-button absolute top-3 md:top-5 right-3 md:right-10 z-[99999] cursor-pointer"
      >
        <IoIosCloseCircleOutline className="text-2xl md:text-4xl" />
      </button>

      <style jsx>{`
        .addons-slider {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .addons-slider::-webkit-scrollbar {
          display: none;
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
    </div>
  );
};

export default CrossSellPopup;
