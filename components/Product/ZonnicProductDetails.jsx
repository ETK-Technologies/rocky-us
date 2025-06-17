"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ProductImage } from "@/components/Product";
import { useAddItemToCart } from "@/lib/cart/cartHooks";
import { useRouter } from "next/navigation";
import CartPopup from "../Cart/CartPopup";

const ZonnicProductDetails = ({ product, variations, isLoading }) => {
  const router = useRouter();
  const addItemToCart = useAddItemToCart();

  // State management
  const [variationPrice, setVariationPrice] = useState("");
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [subscriptionTypes, setSubscriptionTypes] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [availablePacks, setAvailablePacks] = useState([]);
  const [selectedPacks, setSelectedPacks] = useState(null);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  // Initialize subscription types and frequency once on mount
  useEffect(() => {
    // Always use hardcoded subscription types
    const types = ["Monthly Supply", "Quarterly Supply"];
    setSubscriptionTypes(types);
    setSelectedFrequency(types[0]);
  }, []); // Empty dependency array - only run once on mount

  // Update available packs when frequency changes or product data loads
  useEffect(() => {
    if (product?.variations_data && selectedFrequency) {
      const freqKey = selectedFrequency.toLowerCase().replace(/\s+/g, "-");
      // Filter variations by selected frequency
      const packs = product.variations_data
        .filter((v) => {
          if (!v.attributes) return false;

          const frequencyMatch =
            v.attributes["attribute_pa_subscription-type"] === freqKey;
          return frequencyMatch;
        })
        .map((v) => {
          const packValue = v.attributes["attribute_zonnic-packs"];
          const displayLabel = packValue.replace(/-/g, " ");

          return {
            value: packValue,
            label: displayLabel,
            price: v.display_price,
            variationId: v.variation_id,
            variation: v,
          };
        });

      // Sort packs by quantity - extract the number from the label and sort numerically
      const sortedPacks = [...packs].sort((a, b) => {
        const aMatch = a.label.match(/^(\d+)/);
        const bMatch = b.label.match(/^(\d+)/);

        const aNum = aMatch ? parseInt(aMatch[1]) : 0;
        const bNum = bMatch ? parseInt(bMatch[1]) : 0;

        return aNum - bNum; // Ascending order: 5 tins, 10 tins, 15 tins
      });

      setAvailablePacks(sortedPacks);

      if (sortedPacks.length > 0) {
        setSelectedPacks(sortedPacks[0].value);
        setSelectedVariation(sortedPacks[0].variation);
        setVariationPrice(sortedPacks[0].price);
      } else {
        setSelectedPacks(null);
        setSelectedVariation(null);
        setVariationPrice("");
      }
    }
  }, [product, selectedFrequency]); // Only depend on product and selectedFrequency

  // Handle frequency change
  const handleFrequencyChange = (frequency) => {
    setSelectedFrequency(frequency);
    setSelectedPacks(null);
    setSelectedVariation(null);
    setVariationPrice("");
  };

  // Handle pack selection
  const handlePackSelection = (pack) => {
    setSelectedPacks(pack.value);
    setVariationPrice(pack.price);
    setSelectedVariation(pack.variation);
  };

  // Add to cart handler
  const handleAddToCart = async () => {
    if (!selectedVariation) return;

    try {
      setAddToCartLoading(true);

      if (!product || !product.id) {
        console.error("No product ID available for adding to cart");
        return;
      }

      // Make sure we have the correct product image URL
      const productImageUrl =
        product.images && product.images.length > 0
          ? product.images[0].src
          : product.image || "";

      // Prepare data for the cart addition with complete product details
      const cartData = {
        productId: product.id,
        quantity: 1,
        name: product.name || "ZONNIC Nicotine Pouches",
        price: variationPrice,
        // Include product image if available - with fallback options
        image: productImageUrl,
        // Include product type
        product_type: product.type || "",
      };

      // Extract the variation ID from the selected variation
      const variationId =
        selectedVariation.variation_id ||
        selectedVariation.variationId ||
        (selectedVariation.variation &&
          selectedVariation.variation.variation_id);

      if (variationId) {
        cartData.variationId = variationId;

        // Add variation attributes for display if available
        if (selectedVariation.attributes) {
          cartData.variation = Object.entries(selectedVariation.attributes).map(
            ([name, value]) => ({
              name: name.replace("attribute_", "").replace("pa_", ""),
              value: value,
            })
          );
        }

        // For variable products like Zonnic, use the variation ID as the product ID
        const isVariableProduct =
          product.type === "variable" ||
          product.type === "variable-subscription";

        if (isVariableProduct) {
          // console.log(
          //   `Variable product detected, using variation ID ${variationId} as productId for ${
          //     product.name || product.id
          //   }`
          // );
          cartData.productId = variationId;
        }
      }

      console.log("Adding to cart with data:", cartData);

      await addItemToCart(cartData);

      // Refresh the cart in the navbar
      document.getElementById("cart-refresher")?.click();

      // Show cart popup
      setShowCartPopup(true);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setAddToCartLoading(false);
    }
  };

  // Handle popup actions
  const handleContinueShopping = () => {
    setShowCartPopup(false);
  };

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <ProductImage
              src={
                product?.images?.[0]?.src ||
                product?.imageUrl ||
                "https://myrocky.b-cdn.net/WP%20Images/zonnic/zonnic-product-1.png"
              }
              alt={product?.name || "ZONNIC Nicotine Pouches"}
              priority
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col">
          {/* Product Header */}
          <div className="mb-6">
            <p className="text-2xl font-semibold headers-font mb-1">
              {product?.name || "ZONNIC Nicotine Pouches"}
            </p>
            <p className="text-xl font-medium mb-4">Chill Mint</p>
            <div
              className="text-gray-800 mb-5"
              dangerouslySetInnerHTML={{
                __html:
                  product?.description ||
                  "ZONNIC nicotine pouches offer convenient Nicotine Replacement therapy to help control cravings and ease withdrawal symptoms. Designed to support smoking cessation, they provide a nicotine alternative, reducing cravings and cigarette use.",
              }}
            />
            <p className="text-sm text-[#212121] mt-5 font-[400]">
              <span className="font-[500]">Package contains: 24 x 4mg</span>{" "}
              nicotine pouches
            </p>
          </div>

          {/* Product Options */}
          <div>
            <h2 className="text-base font-medium mb-3">Delivery Frequency:</h2>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {subscriptionTypes.map((type) => (
                <button
                  key={type}
                  className={`border border-gray-300 rounded-[8px] py-1 px-3 text-sm text-center font-medium transition-all duration-200 ${
                    selectedFrequency === type
                      ? "border-[#AE7E56] border-2 text-[#AE7E56]"
                      : "border-[#CECECE] hover:border-gray-400"
                  }`}
                  onClick={() => handleFrequencyChange(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-6">
              {selectedFrequency === "Monthly Supply"
                ? "Delivered monthly • Cancel Anytime • Free Shipping"
                : selectedFrequency === "Quarterly Supply"
                ? "Delivered quarterly • Cancel Anytime • Free Shipping"
                : null}
            </p>

            {/* Packs Selection */}
            <div className="space-y-2 mb-6">
              <h2 className="text-base font-medium">How many packs?</h2>
              <div className="grid grid-cols-3 gap-2">
                {availablePacks.length === 0 && (
                  <span className="col-span-3 text-gray-400 text-center">
                    No packs available for this frequency.
                  </span>
                )}
                {availablePacks.map((pack) => (
                  <button
                    key={pack.value}
                    className={`w-full py-1 px-3 text-sm rounded-[8px] border-2 transition-all duration-200 ${
                      selectedPacks === pack.value
                        ? "border-[#AE7E56] text-[#AE7E56]"
                        : "border-[#CECECE] hover:border-gray-400"
                    }`}
                    onClick={() => handlePackSelection(pack)}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                      <span>{pack.label}</span>
                      <span>${pack.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              className="w-full bg-black text-white py-3 px-6 rounded-full font-medium text-lg mb-6"
              onClick={handleAddToCart}
              disabled={!selectedVariation || addToCartLoading}
            >
              {addToCartLoading
                ? "Adding to Cart..."
                : `Add to Cart - $${variationPrice}`}
            </button>

            {/* Warning notice */}
            <div className="bg-[#f8f6f0] rounded-md p-4 mb-6">
              <p className="text-sm">
                <span className="font-bold">WARNING: </span>
                This product contains nicotine. Nicotine is highly addictive.
                This product is intended for smoking cessation only. Do not use
                if you are under 18 years of age.
              </p>
            </div>

            {/* Ontario Logo */}
            <div className="border border-gray-300 rounded-md p-4 flex justify-center">
              <img
                src="https://myrocky.b-cdn.net/WP%20Images/zonnic/ontario.png"
                alt="Ontario College of Pharmacists"
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cart Popup */}
      <CartPopup
        isOpen={showCartPopup}
        onClose={handleContinueShopping}
        productType={product?.type || null}
      />
    </div>
  );
};

export default ZonnicProductDetails;
