/**
 * Cart Service
 * Handles cart operations for both authenticated and unauthenticated users
 * For unauthenticated users, cart data is stored in localStorage
 * For authenticated users, cart operations use the server API
 */

const LOCAL_CART_KEY = "rocky-local-cart";

/**
 * Check if the user is authenticated by looking for authToken cookie
 */
const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return document.cookie.includes("authToken=");
};

/**
 * Get cart from localStorage
 */
const getLocalCart = () => {
  if (typeof window === "undefined")
    return { items: [], total_items: 0, total_price: 0 };

  try {
    const localCart = localStorage.getItem(LOCAL_CART_KEY);
    return localCart
      ? JSON.parse(localCart)
      : { items: [], total_items: 0, total_price: 0 };
  } catch (error) {
    console.error("Error getting local cart:", error);
    return { items: [], total_items: 0, total_price: 0 };
  }
};

/**
 * Save cart to localStorage and cookie to make it accessible server-side
 */
const saveLocalCart = (cart) => {
  if (typeof window === "undefined") return;

  try {
    // Save to localStorage
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));

    // Also save to cookie for server-side access
    // Set expiration to 30 days
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    // Create a serialized version with complete product details for display
    const cookieCart = {
      items: cart.items.map((item) => ({
        key: item.key,
        id: item.id,
        variation_id: item.variation_id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
        images: item.images || [],
        variation: item.variation,
        totals: {
          subtotal: item.price * item.quantity,
          total: item.price * item.quantity,
        },
        prices: {
          regular_price: item.price * 100, // Convert to cents for WooCommerce compatibility
          sale_price: item.price * 100,
          currency_symbol: "$",
        },
      })),
      total_items: cart.total_items,
      total_price: cart.total_price,
    };

    // Split the cookie if it's too large
    const cookieStr = JSON.stringify(cookieCart);
    if (cookieStr.length > 4000) {
      // If cookie is too large, store minimal version
      const minimalCookieCart = {
        items: cart.items.map((item) => ({
          key: item.key,
          id: item.id,
          variation_id: item.variation_id,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
        })),
        total_items: cart.total_items,
        total_price: cart.total_price,
      };
      document.cookie = `localCart=${JSON.stringify(
        minimalCookieCart
      )}; expires=${expiryDate.toUTCString()}; path=/`;
    } else {
      document.cookie = `localCart=${cookieStr}; expires=${expiryDate.toUTCString()}; path=/`;
    }
    console.log("Cart saved to localStorage and cookie");
  } catch (error) {
    console.error("Error saving local cart:", error);
  }
};

/**
 * Add item to local cart
 */
const addItemToLocalCart = (productData) => {
  const {
    productId,
    variationId,
    quantity = 1,
    name = "Product",
    price = 0,
    image = "",
    product_type = "",
    variation = [],
  } = productData;

  console.log("Adding item to local cart with data:", {
    productId,
    name,
    price,
    image: image ? "Present" : "Missing",
  });

  const cart = getLocalCart();
  const existingItemIndex = cart.items.findIndex(
    (item) =>
      item.id === productId &&
      (!variationId || item.variation_id === variationId)
  );

  if (existingItemIndex >= 0) {
    // Update quantity if item already exists
    cart.items[existingItemIndex].quantity += quantity;
    cart.total_items += quantity;

    // Update totals
    cart.items[existingItemIndex].totals.subtotal =
      cart.items[existingItemIndex].price *
      cart.items[existingItemIndex].quantity;
    cart.items[existingItemIndex].totals.total =
      cart.items[existingItemIndex].totals.subtotal;
  } else {
    // Format price correctly - ensure it's a valid number
    const itemPrice =
      typeof price === "number" ? price : parseFloat(price) || 0;

    // Add new item with complete information
    const newItem = {
      key: `local_${Date.now()}`,
      id: productId,
      variation_id: variationId,
      quantity: quantity,
      name: name || "Product",
      price: itemPrice,
      images: image ? [{ thumbnail: image, src: image }] : [],
      product_type: product_type,
      variation: variation,
      totals: {
        subtotal: itemPrice * quantity,
        total: itemPrice * quantity,
      },
      // Include prices property for compatibility with server cart format
      prices: {
        regular_price: itemPrice * 100, // Convert to cents for compatibility
        sale_price: itemPrice * 100,
        currency_symbol: "$",
      },
    };

    console.log("New cart item created:", {
      key: newItem.key,
      name: newItem.name,
      price: newItem.price,
      image: newItem.images.length > 0 ? "Present" : "Missing",
    });

    cart.items.push(newItem);
    cart.total_items += quantity;
  }

  // Update total price
  cart.total_price = cart.items.reduce(
    (total, item) => total + (item.totals.total || 0),
    0
  );

  saveLocalCart(cart);
  return cart;
};

/**
 * Check if Body Optimization Program can be removed from cart
 * It can only be removed if there are no Weight Loss products in the cart
 * @param {Array} cartItems - Array of cart items
 * @param {string} itemToRemoveKey - Key of the item being removed
 * @returns {Object} { allowed: boolean, message: string }
 */
const checkBodyOptimizationRemoval = (cartItems, itemToRemoveKey) => {
  // Body Optimization Program product ID
  const BODY_OPTIMIZATION_PROGRAM_ID = "148515";

  // Weight Loss product IDs that are associated with Body Optimization Program
  const WEIGHT_LOSS_PRODUCT_IDS = [
    "142977",
    "453501",
    "276277",
    "369797",
    "490537",
  ]; // Ozempic, Mounjaro, Wegovy, Rybelsus, Oral Semaglutide

  // Find the item being removed
  const itemToRemove = cartItems.find((item) => item.key === itemToRemoveKey);

  // If it's not the Body Optimization Program, allow removal
  if (!itemToRemove) {
    return { allowed: true, message: "" };
  }

  // Helper function to get product ID from cart item (handles different formats)
  const getProductId = (item) => {
    // Try different possible ID fields
    if (item.id) return String(item.id);
    if (item.product_id) return String(item.product_id);
    if (item.productId) return String(item.productId);
    return null;
  };

  const itemProductId = getProductId(itemToRemove);

  if (!itemProductId || itemProductId !== BODY_OPTIMIZATION_PROGRAM_ID) {
    return { allowed: true, message: "" };
  }

  // Check if there are any Weight Loss products in the cart
  const hasWeightLossProducts = cartItems.some((item) => {
    const productId = getProductId(item);
    if (!productId) return false;
    return (
      WEIGHT_LOSS_PRODUCT_IDS.includes(productId) &&
      item.key !== itemToRemoveKey
    );
  });

  if (hasWeightLossProducts) {
    return {
      allowed: false,
      message:
        "Body Optimization Program cannot be removed while Weight Loss products are in your cart. Please remove the Weight Loss products first.",
    };
  }

  return { allowed: true, message: "" };
};

/**
 * Remove Weight Loss products and Body Optimization Program together
 * When a WL product is removed, also remove the Body Optimization Program
 * @param {Array} cartItems - Array of cart items
 * @param {string} itemToRemoveKey - Key of the WL item being removed
 * @returns {Array} Array of item keys to remove
 */
const getItemsToRemoveWithWL = (cartItems, itemToRemoveKey) => {
  // Body Optimization Program product ID
  const BODY_OPTIMIZATION_PROGRAM_ID = "148515";

  // Weight Loss product IDs
  const WEIGHT_LOSS_PRODUCT_IDS = [
    "142977",
    "453501",
    "276277",
    "369797",
    "490537",
  ];

  // Helper function to get product ID from cart item (handles different formats)
  const getProductId = (item) => {
    // Try different possible ID fields
    if (item.id) return String(item.id);
    if (item.product_id) return String(item.product_id);
    if (item.productId) return String(item.productId);
    return null;
  };

  // Find the item being removed
  const itemToRemove = cartItems.find((item) => item.key === itemToRemoveKey);

  // If it's not a Weight Loss product, return only the original item
  if (!itemToRemove) {
    return [itemToRemoveKey];
  }

  const itemProductId = getProductId(itemToRemove);

  if (!itemProductId || !WEIGHT_LOSS_PRODUCT_IDS.includes(itemProductId)) {
    return [itemToRemoveKey];
  }

  // It's a WL product - also remove Body Optimization Program if it exists
  const bodyOptimizationItem = cartItems.find((item) => {
    const productId = getProductId(item);
    return productId === BODY_OPTIMIZATION_PROGRAM_ID;
  });

  const itemsToRemove = [itemToRemoveKey];

  if (bodyOptimizationItem) {
    itemsToRemove.push(bodyOptimizationItem.key);
    console.log(
      "Also removing Body Optimization Program when removing Weight Loss product"
    );
  }

  return itemsToRemove;
};

/**
 * Remove an item from the local cart
 * @param {string} itemKey - The key of the item to remove
 * @returns {Object} The updated cart or error object
 */
const removeItemFromLocalCart = (itemKey) => {
  const cart = getLocalCart();

  // Ensure cart has the correct structure
  if (!cart.items) {
    console.warn("Cart missing items array when removing item");
    cart.items = [];
    cart.total_items = 0;
    cart.total_price = 0;
    saveLocalCart(cart);
    return cart;
  }

  // Check if Body Optimization Program removal is allowed
  const removalCheck = checkBodyOptimizationRemoval(cart.items, itemKey);
  if (!removalCheck.allowed) {
    console.warn(
      "Body Optimization Program removal blocked:",
      removalCheck.message
    );
    return {
      error: removalCheck.message,
      items: cart.items,
      total_items: cart.total_items,
      total_price: cart.total_price,
    };
  }

  // Get all items that should be removed (including Body Optimization Program if removing WL product)
  const itemKeysToRemove = getItemsToRemoveWithWL(cart.items, itemKey);

  // Remove all items
  itemKeysToRemove.forEach((keyToRemove) => {
    const itemIndex = cart.items.findIndex((item) => item.key === keyToRemove);

    if (itemIndex > -1) {
      const removedItem = cart.items[itemIndex];
      cart.items.splice(itemIndex, 1);

      // Update totals
      cart.total_items -= removedItem.quantity;

      console.log(
        `Item ${keyToRemove} (${removedItem.name}) removed from cart`
      );
    } else {
      console.warn(
        `Item ${keyToRemove} not found in cart when attempting to remove it`
      );
    }
  });

  // Recalculate total price
  cart.total_price = cart.items.reduce(
    (total, item) => total + (item.totals?.total || 0),
    0
  );

  console.log(
    `${itemKeysToRemove.length} item(s) removed from cart, ${cart.items.length} items remaining`
  );

  // Save the updated cart
  saveLocalCart(cart);

  // Return a valid cart object with required properties to prevent crashes
  return {
    ...cart,
    items: cart.items || [],
    total_items: cart.total_items || 0,
    total_price: cart.total_price || 0,
  };
};

/**
 * Get cart items (either from localStorage or API)
 */
const getCart = async () => {
  if (isAuthenticated()) {
    try {
      const response = await fetch("/api/cart");
      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }
      return await response.json();
    } catch (error) {
      console.error("Error getting cart from API:", error);
      return { items: [], total_items: 0, total_price: 0 };
    }
  } else {
    return getLocalCart();
  }
};

/**
 * Add item to cart (either to localStorage or via API)
 */
const addItemToCart = async (productData) => {
  if (isAuthenticated()) {
    try {
      const response = await fetch("/api/cart/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add item to cart");
      }

      return await response.json();
    } catch (error) {
      console.error("Error adding to cart via API:", error);
      throw error;
    }
  } else {
    return addItemToLocalCart(productData);
  }
};

/**
 * Helper function to create a delay for retry logic
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after the specified delay
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Migrate local cart to server cart upon authentication
 * Includes retry mechanism and only clears local cart after successful migration
 */
const migrateLocalCartToServer = async () => {
  const localCart = getLocalCart();

  if (localCart.items.length === 0) return true;

  // Initialize retry settings
  const MAX_RETRIES = 3;
  let currentRetry = 0;
  let migrationSuccessful = false;

  console.log(
    `Starting cart migration with ${localCart.items.length} items : `,
    localCart.items
  );

  // Convert cart items to the format expected by our API
  const cartItems = localCart.items.map((item) => ({
    productId: item.id,
    variationId: item.variation_id,
    quantity: item.quantity,
  }));

  console.log(`Cart items for migration:`, cartItems);

  // Migration function with retry logic
  while (currentRetry < MAX_RETRIES && !migrationSuccessful) {
    try {
      if (currentRetry > 0) {
        // Exponential backoff delay before retry (500ms, 1000ms, 2000ms...)
        const backoffDelay = 500 * Math.pow(2, currentRetry - 1);
        console.log(
          `Retry attempt ${currentRetry}. Waiting ${backoffDelay}ms before retry...`
        );
        await delay(backoffDelay);
      }

      console.log(
        `Migration attempt ${currentRetry + 1}/${MAX_RETRIES} with items : `,
        cartItems
      );

      // Send all cart items in a single request to the new batch endpoint
      const response = await fetch("/api/cart/migrate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to migrate cart");
      }

      const migrationResult = await response.json();
      console.log("Cart migration successful:", migrationResult);

      // Mark migration as successful
      migrationSuccessful = true;
    } catch (error) {
      currentRetry++;
      console.error(
        `Cart migration failed (attempt ${currentRetry}/${MAX_RETRIES}):`,
        error
      );

      if (currentRetry >= MAX_RETRIES) {
        console.error("Max retries exceeded. Cart migration failed.");
      }
    }
  }

  // Only clear local cart if migration was successful
  if (migrationSuccessful) {
    console.log("Migration successful, clearing local cart");
    clearLocalCart();
    return true;
  } else {
    console.log("Migration failed, preserving local cart data");
    return false;
  }
};

/**
 * Clear local cart
 */
const clearLocalCart = () => {
  if (typeof window === "undefined") return;

  // Clear from localStorage
  localStorage.removeItem(LOCAL_CART_KEY);

  // Clear from cookie
  document.cookie =
    "localCart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  console.log("Local cart cleared from localStorage and cookie");
};

/**
 * Empty the cart (remove all items)
 * Works for both authenticated and unauthenticated users
 */
const emptyCart = async () => {
  if (isAuthenticated()) {
    try {
      const response = await fetch("/api/cart/empty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to empty cart");
      }

      return await response.json();
    } catch (error) {
      console.error("Error emptying cart via API:", error);
      throw error;
    }
  } else {
    // For unauthenticated users, just clear the local cart
    clearLocalCart();
    return {
      success: true,
      message: "Local cart emptied",
      items: [],
      total_items: 0,
      total_price: 0,
    };
  }
};

/**
 * Check if an item can be removed from cart (for UI purposes)
 * @param {Array} cartItems - Array of cart items
 * @param {string} itemKey - Key of the item to check
 * @returns {boolean} Whether the item can be removed
 */
const canRemoveItem = (cartItems, itemKey) => {
  // Ensure we have valid input
  if (!Array.isArray(cartItems) || !itemKey) {
    return true; // Default to allowing removal if we can't determine
  }

  // Body Optimization Program product ID
  const BODY_OPTIMIZATION_PROGRAM_ID = "148515";
  // Weight Loss product IDs
  const WEIGHT_LOSS_PRODUCT_IDS = [
    "142977",
    "453501",
    "276277",
    "369797",
    "490537",
  ]; // Ozempic, Mounjaro, Wegovy, Rybelsus, Oral Semaglutide

  // Find the item we're checking
  const item = cartItems.find((cartItem) => cartItem.key === itemKey);

  if (!item) {
    return true;
  }

  // Helper function to get product ID from cart item (handles different formats)
  const getProductId = (item) => {
    // Try different possible ID fields
    if (item.id) return String(item.id);
    if (item.product_id) return String(item.product_id);
    if (item.productId) return String(item.productId);
    return null;
  };

  const itemProductId = getProductId(item);

  // If it's not the Body Optimization Program, allow removal
  if (!itemProductId || itemProductId !== BODY_OPTIMIZATION_PROGRAM_ID) {
    return true;
  }

  // Check if there are any Weight Loss products in the cart
  const hasWeightLossProducts = cartItems.some((cartItem) => {
    const productId = getProductId(cartItem);
    if (!productId) return false;
    return (
      WEIGHT_LOSS_PRODUCT_IDS.includes(productId) && cartItem.key !== itemKey
    );
  });

  const removalCheck = checkBodyOptimizationRemoval(cartItems, itemKey);
  return removalCheck.allowed;
};

/**
 * Debug function to examine cart structure - call from browser console
 * Usage: window.debugCart()
 */
const debugCart = () => {
  const cart = getLocalCart();
  console.log("=== CART DEBUG INFO ===");
  console.log("Full cart object:", cart);
  console.log("Items array:", cart.items);
  console.log("Items details:");
  cart.items.forEach((item, index) => {
    console.log(`Item ${index}:`, {
      key: item.key,
      name: item.name,
      id: item.id,
      product_id: item.product_id,
      productId: item.productId,
      variation_id: item.variation_id,
      quantity: item.quantity,
      price: item.price,
    });
  });

  // Test the canRemoveItem function for each item
  console.log("Testing canRemoveItem for each item:");
  cart.items.forEach((item, index) => {
    const canRemove = canRemoveItem(cart.items, item.key);
    console.log(`Item ${index} (${item.name}) can be removed:`, canRemove);
  });

  console.log("=== END CART DEBUG INFO ===");
  return cart;
};

// Make it available globally for debugging
if (typeof window !== "undefined") {
  window.debugCart = debugCart;
}

export {
  isAuthenticated,
  getCart,
  addItemToCart,
  migrateLocalCartToServer,
  clearLocalCart,
  getLocalCart,
  saveLocalCart,
  removeItemFromLocalCart,
  emptyCart,
  checkBodyOptimizationRemoval,
  getItemsToRemoveWithWL,
  canRemoveItem,
  debugCart,
};
