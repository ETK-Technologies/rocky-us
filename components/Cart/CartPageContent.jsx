"use client";
import CartCalculations from "@/components/Cart/CartCalculations";
import CartItems from "@/components/Cart/CartItems";
import EmptyCart from "@/components/Cart/EmptyCart";
import CartSkeleton from "@/components/ui/skeletons/CartSkeleton";
import { useEffect, useState, useCallback } from "react";
import { getCart } from "@/lib/cart/cartService";

const CartPageContent = () => {
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Create a callback to fetch cart items that we can reuse
  const fetchCartItems = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Fetching cart items...");

      // Use our cartService instead of directly calling the API
      const data = await getCart();
      console.log("Cart data received:", data);

      // Ensure data has the expected structure before setting state
      if (data && typeof data === "object") {
        // If items is missing or not an array, initialize it as an empty array
        if (!data.items || !Array.isArray(data.items)) {
          console.warn(
            "Cart data missing items array, initializing empty cart"
          );
          data.items = [];
        }
        setCartItems(data);
      } else {
        console.error("Invalid cart data structure:", data);
        setCartItems({ items: [], total_items: 0, total_price: 0 });
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      // Provide empty cart as fallback
      setCartItems({ items: [], total_items: 0, total_price: 0 });
      setError(true);
    } finally {
      setLoading(false);
      console.log("Cart loading complete");
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchCartItems();

    // Add event listener for cart refresher element clicks
    const handleCartRefresh = () => {
      console.log("Cart refresh event triggered in cart page");
      fetchCartItems();
    };

    // Listen for the custom event
    document.addEventListener("cart-updated", handleCartRefresh);

    // Create a MutationObserver to watch for cart refresh clicks
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-refreshed"
        ) {
          console.log("Cart refresher clicked, updating cart page");
          fetchCartItems();
        }
      });
    });

    const refresherElement = document.getElementById("cart-refresher");
    if (refresherElement) {
      observer.observe(refresherElement, { attributes: true });
    }

    return () => {
      document.removeEventListener("cart-updated", handleCartRefresh);
      observer.disconnect();
    };
  }, [fetchCartItems]);

  // Use loading state instead of checking if cartItems is null
  if (loading && !cartItems) {
    console.log("Showing cart skeleton while loading");
    return <CartSkeleton />;
  }

  // Now we can safely assume cartItems is not null
  if (error || !cartItems.items || cartItems.items.length === 0) {
    console.log("Showing empty cart");
    return <EmptyCart />;
  }

  console.log("Rendering cart with items:", cartItems.items.length);
  return (
    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-100px)] border-t">
      <CartItems items={cartItems.items} setCartItems={setCartItems} />
      <CartCalculations cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

export default CartPageContent;
