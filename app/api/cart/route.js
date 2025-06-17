import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const encodedCredentials = cookieStore.get("authToken");

    if (!encodedCredentials) {
      // For unauthenticated users, we'll check for a cookie that might contain local cart data
      const localCart = cookieStore.get("localCart");

      if (localCart) {
        try {
          // Try to parse the local cart data from the cookie
          const parsedCart = JSON.parse(localCart.value);
          console.log(
            "Retrieved local cart from cookie with items:",
            parsedCart.items?.length || 0
          );

          // Ensure items exists and is an array
          if (!parsedCart.items || !Array.isArray(parsedCart.items)) {
            console.warn(
              "Local cart missing items array, initializing empty cart"
            );
            parsedCart.items = [];
          }

          // Ensure each item has the required properties for display
          const enhancedItems = parsedCart.items.map((item) => {
            // Create a proper display structure for each item
            return {
              ...item,
              // Ensure images exist in the right format
              images:
                item.images && item.images.length > 0
                  ? item.images
                  : [{ thumbnail: "", src: "" }],
              // Ensure prices are properly formatted
              prices: {
                currency_symbol: "$",
                regular_price:
                  typeof item.price === "number" ? item.price * 100 : 0,
                sale_price:
                  typeof item.price === "number" ? item.price * 100 : 0,
              },
              // Ensure totals exist
              totals: {
                total:
                  typeof item.price === "number"
                    ? item.price * item.quantity
                    : 0,
                subtotal:
                  typeof item.price === "number"
                    ? item.price * item.quantity
                    : 0,
              },
            };
          });

          // Return the enhanced local cart data
          return NextResponse.json({
            items: enhancedItems,
            total_items: parsedCart.total_items || 0,
            total_price: parsedCart.total_price || "0.00",
            needs_shipping: true,
            coupons: [],
            shipping_rates: parsedCart.shipping_rates || [],
            is_local_cart: true, // Add a flag to indicate this is a local cart
          });
        } catch (e) {
          console.error("Error parsing local cart from cookie:", e);
        }
      }

      // If no local cart data is found or parsing fails, return an empty cart
      console.log("User not authenticated, returning empty cart");

      return NextResponse.json({
        items: [],
        total_items: 0,
        total_price: "0.00",
        needs_shipping: false,
        coupons: [],
        shipping_rates: [],
        is_local_cart: true,
      });
    }

    const response = await axios.get(`${BASE_URL}/wp-json/wc/store/cart`, {
      headers: {
        Authorization: `${encodedCredentials.value}`,
      },
    });

    cookieStore.set("cart-nonce", response.headers.nonce);

    // Ensure the response has the expected structure
    const responseData = response.data;
    if (!responseData.items || !Array.isArray(responseData.items)) {
      console.warn("Server returned invalid cart structure, fixing...");
      responseData.items = responseData.items || [];
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error getting cart:", error.response?.data || error.message);

    // Return a valid cart structure even on error
    return NextResponse.json(
      {
        error: error.response?.data?.message || "Failed to get cart",
        items: [], // Always include empty items array
        total_items: 0,
        total_price: "0.00",
        coupons: [],
        shipping_rates: [],
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { itemKey, quantity } = await req.json();
    const cookieStore = await cookies();

    const encodedCredentials = cookieStore.get("authToken");

    if (!encodedCredentials) {
      return NextResponse.json(
        {
          error: "Not authenticated..",
          items: [], // Always include empty items array to prevent undefined errors
          total_items: 0,
          total_price: "0.00",
        },
        { status: 401 }
      );
    }

    const response = await axios.post(
      `${BASE_URL}/wp-json/wc/store/cart/update-item`,
      { key: itemKey, quantity },
      {
        headers: {
          Authorization: `${encodedCredentials.value}`,
          nonce: cookieStore.get("cart-nonce")?.value,
        },
      }
    );

    // Ensure response data has the expected structure
    const responseData = response.data;
    if (!responseData.items || !Array.isArray(responseData.items)) {
      console.warn("Server returned invalid cart structure, fixing...");
      responseData.items = responseData.items || [];
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error(
      "Error updating cart:",
      error.response?.data || error.message
    );

    // Return a valid cart structure even on error
    return NextResponse.json(
      {
        error: error.response?.data?.message || "Failed to update cart",
        items: [], // Always include empty items array
        total_items: 0,
        total_price: "0.00",
      },
      { status: error.response?.status || 500 }
    );
  }
}

/**
 * DELETE method to properly remove items from the cart
 * This uses the dedicated remove-item endpoint instead of updating quantity to 0
 */
export async function DELETE(req) {
  try {
    const { itemKey } = await req.json();
    const cookieStore = await cookies();

    const encodedCredentials = cookieStore.get("authToken");

    if (!encodedCredentials) {
      return NextResponse.json(
        {
          error: "Not authenticated",
          items: [],
          total_items: 0,
          total_price: "0.00",
        },
        { status: 401 }
      );
    }

    // First, get the current cart to check the items
    const currentCartResponse = await axios.get(
      `${BASE_URL}/wp-json/wc/store/cart`,
      {
        headers: {
          Authorization: `${encodedCredentials.value}`,
        },
      }
    );

    const currentCart = currentCartResponse.data;

    // Helper function to check if Body Optimization Program can be removed
    const checkBodyOptimizationRemoval = (cartItems, itemToRemoveKey) => {
      const BODY_OPTIMIZATION_PROGRAM_ID = "148515";
      const WEIGHT_LOSS_PRODUCT_IDS = [
        "142977",
        "453501",
        "276277",
        "369797",
        "490537",
      ];

      const itemToRemove = cartItems.find(
        (item) => item.key === itemToRemoveKey
      );

      if (
        !itemToRemove ||
        itemToRemove.id !== parseInt(BODY_OPTIMIZATION_PROGRAM_ID)
      ) {
        return { allowed: true, message: "" };
      }

      const hasWeightLossProducts = cartItems.some(
        (item) =>
          WEIGHT_LOSS_PRODUCT_IDS.includes(item.id.toString()) &&
          item.key !== itemToRemoveKey
      );

      if (hasWeightLossProducts) {
        return {
          allowed: false,
          message:
            "Body Optimization Program cannot be removed while Weight Loss products are in your cart. Please remove the Weight Loss products first.",
        };
      }

      return { allowed: true, message: "" };
    };

    // Helper function to get items to remove (including Body Optimization Program when removing WL products)
    const getItemsToRemoveWithWL = (cartItems, itemToRemoveKey) => {
      const BODY_OPTIMIZATION_PROGRAM_ID = "148515";
      const WEIGHT_LOSS_PRODUCT_IDS = [
        "142977",
        "453501",
        "276277",
        "369797",
        "490537",
      ];

      const itemToRemove = cartItems.find(
        (item) => item.key === itemToRemoveKey
      );

      if (
        !itemToRemove ||
        !WEIGHT_LOSS_PRODUCT_IDS.includes(itemToRemove.id.toString())
      ) {
        return [itemToRemoveKey];
      }

      const bodyOptimizationItem = cartItems.find(
        (item) => item.id === parseInt(BODY_OPTIMIZATION_PROGRAM_ID)
      );

      const itemsToRemove = [itemToRemoveKey];

      if (bodyOptimizationItem) {
        itemsToRemove.push(bodyOptimizationItem.key);
        console.log(
          "Also removing Body Optimization Program when removing Weight Loss product"
        );
      }

      return itemsToRemove;
    };

    // Check if Body Optimization Program removal is allowed
    const removalCheck = checkBodyOptimizationRemoval(
      currentCart.items,
      itemKey
    );
    if (!removalCheck.allowed) {
      console.warn(
        "Body Optimization Program removal blocked:",
        removalCheck.message
      );
      return NextResponse.json(
        {
          error: removalCheck.message,
          items: currentCart.items || [],
          total_items: currentCart.total_items || 0,
          total_price: currentCart.total_price || "0.00",
        },
        { status: 400 }
      );
    }

    // Get all items that should be removed
    const itemKeysToRemove = getItemsToRemoveWithWL(currentCart.items, itemKey);

    // Remove all items
    let finalCartData = currentCart;

    for (const keyToRemove of itemKeysToRemove) {
      try {
        const response = await axios.post(
          `${BASE_URL}/wp-json/wc/store/cart/remove-item`,
          { key: keyToRemove },
          {
            headers: {
              Authorization: `${encodedCredentials.value}`,
              nonce: cookieStore.get("cart-nonce")?.value,
            },
          }
        );

        // Update the cart data after each removal
        finalCartData = response.data;

        // Update nonce if provided
        if (response.headers && response.headers.nonce) {
          cookieStore.set("cart-nonce", response.headers.nonce);
        }

        console.log(`Item ${keyToRemove} removed from server cart`);
      } catch (error) {
        console.error(
          `Error removing item ${keyToRemove} from cart:`,
          error.response?.data || error.message
        );
        // Continue with other items even if one fails
      }
    }

    // Ensure response data has the expected structure
    if (!finalCartData.items || !Array.isArray(finalCartData.items)) {
      console.warn("Server returned invalid cart structure, fixing...");
      finalCartData.items = finalCartData.items || [];
    }

    return NextResponse.json(finalCartData);
  } catch (error) {
    console.error(
      "Error removing item from cart:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        error:
          error.response?.data?.message || "Failed to remove item from cart",
        items: [], // Always include empty items array
        total_items: 0,
        total_price: "0.00",
      },
      { status: error.response?.status || 500 }
    );
  }
}
