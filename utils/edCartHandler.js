// Create a utility file for ED cart functions
import { toast } from "react-toastify";
import { logger } from "@/utils/devLogger";

/**
 * Add ED product to cart directly using API
 * @param {Object} productOptions - Product options including variation ID, preference, etc.
 * @param {String} dosage - Selected dosage
 * @returns {Promise<Object>} Result of the cart addition operation
 */
export const addEdProductToCart = async (productOptions, dosage) => {
  try {
    // Construct the request body for the cart API
    const requestBody = {
      productId:
        productOptions.productId || productOptions.variationId.split(",")[0],
      variationId: productOptions.variationId,
      quantity: 1,
      isSubscription: false,
      attributes: {
        "Dose/ Strength": dosage,
      },
      meta_data: [
        {
          key: "_dosage",
          value: dosage,
        },
      ],
    };

    // For generic/brand preference, add it to attributes if needed
    if (productOptions.preference) {
      requestBody.attributes.Brand =
        productOptions.preference === "brand" ? "Brand" : "Generic";
    }

    logger.log("Adding ED product to cart:", requestBody);

    // Handle authentication and sessionId
    try {
      const { isAuthenticated } = await import("@/lib/cart/cartService");
      const authenticated = isAuthenticated();
      logger.log("🔐 edCartHandler - User authenticated:", authenticated);
      
      if (authenticated) {
        // Remove sessionId for authenticated users
        if (requestBody.sessionId) {
          logger.warn("⚠️ Removing sessionId from authenticated user request");
          delete requestBody.sessionId;
        }
        logger.log("✅ Sending authenticated request (no sessionId)");
      } else {
        // Add sessionId for guest users
        const { getSessionId } = await import("@/services/sessionService");
        const sessionId = getSessionId();
        if (sessionId) {
          requestBody.sessionId = sessionId;
          logger.log("✅ Sending guest request (with sessionId)");
        }
      }
    } catch (err) {
      logger.warn("Could not check authentication status:", err);
    }

    // Make the API call to add the item to cart
    const response = await fetch("/api/cart/add-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error("Error adding product to cart:", errorText);
      throw new Error(`Failed to add product to cart: ${response.statusText}`);
    }

    const result = await response.json();
    logger.log("Product added to cart:", result);

    // Show success message
    toast.success("Product added to cart");

    return {
      success: true,
      result,
    };
  } catch (error) {
    logger.error("Error in addEdProductToCart:", error);

    // Show error message
    toast.error("Failed to add product to cart. Please try again.");

    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Handle ED product checkout based on authentication status
 * @param {Object} productOptions - Product options including variation ID, preference, etc.
 * @param {String} dosage - Selected dosage
 * @returns {Promise<Object>} Result object with success status and redirect URL
 */
export const handleEdProductCheckout = async (productOptions, dosage) => {
  try {
    // Check if user is authenticated
    const isAuthenticated =
      typeof document !== "undefined"
        ? document.cookie.includes("authToken=")
        : false;

    if (isAuthenticated) {
      // For authenticated users, add directly to cart via API and redirect to checkout
      const addToCartResult = await addEdProductToCart(productOptions, dosage);

      if (addToCartResult.success) {
        return {
          success: true,
          redirectUrl: "/checkout?ed-flow=1", // Clean URL without product IDs
        };
      } else {
        return {
          success: false,
          error: addToCartResult.error,
        };
      }
    } else {
      // For unauthenticated users, redirect to login/register with redirect to checkout
      const redirectToCheckout = encodeURIComponent("/checkout?ed-flow=1");
      return {
        success: true,
        redirectUrl: `/login-register/?ed-flow=1&onboarding=1&view=account&viewshow=register&redirect_to=${redirectToCheckout}`,
      };
    }
  } catch (error) {
    logger.error("Error in handleEdProductCheckout:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Build a checkout URL for ED products with addon items
 * Follows the same pattern as the build_checkout_url_for_new_ed_cross_sell PHP function
 * @param {Object} mainProduct - The main ED product with variationId
 * @param {Array} addons - Array of addon products that have been selected
 * @param {Boolean} isAuthenticated - Whether user is authenticated
 * @returns {String} The checkout URL with all products
 */
export const buildEdCheckoutUrl = (
  mainProduct,
  addons = [],
  isAuthenticated = false
) => {
  // Base cart URL (different for authenticated vs. unauthenticated users)
  const baseUrl = isAuthenticated ? "/checkout" : "/login-register";

  // Get the main product ID (from variationId which should contain the actual product ID)
  let mainProductId = "";
  if (mainProduct && mainProduct.variationId) {
    // Use the first part of the variationId as the main product ID (handles case of comma-separated IDs)
    mainProductId = mainProduct.variationId.split(",")[0];
  }

  if (!mainProductId) {
    logger.error(
      "Error: No valid product ID found for main product",
      mainProduct
    );
    return isAuthenticated ? "/checkout" : "/login-register";
  }

  // Start building the products string
  let productsString = mainProductId;

  // Process each addon product
  if (addons && addons.length > 0) {
    addons.forEach((addon) => {
      if (!addon || !addon.id) return;

      // Add the addon ID to the product string
      productsString += "%2C" + addon.id; // URL-encoded comma
    });
  }

  // Build the final URL
  let finalUrl = `${baseUrl}?`;

  // Add authentication parameters if user is not authenticated
  if (!isAuthenticated) {
    finalUrl += "onboarding=1&view=account&viewshow=register&";
  }

  // Add the ed-flow parameter
  finalUrl += "ed-flow=1";

  // Add the products parameter
  finalUrl += `&onboarding-add-to-cart=${productsString}`;

  // Add subscription parameter for the main product (hardcoded to 1_month_1 as in the example)
  finalUrl += `&convert_to_sub_${mainProductId}=1_month_1`;

  // Add any dosage information if available
  if (mainProduct && mainProduct.selectedDose) {
    finalUrl += `&dose_${mainProductId}=${encodeURIComponent(
      mainProduct.selectedDose
    )}`;
  }

  // Add subscription parameters for addon products if they are subscription type
  addons.forEach((addon) => {
    if (
      addon &&
      addon.id &&
      addon.dataType === "subscription" &&
      addon.dataVar
    ) {
      finalUrl += `&convert_to_sub_${addon.id}=${addon.dataVar}`;
    }
  });

  logger.log("Generated ED checkout URL:", finalUrl);
  return finalUrl;
};
