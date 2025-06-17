"use client";

import { useState } from "react";
import {
  addItemToCart as addItemToCartService,
  emptyCart as emptyCartService,
} from "./cartService";

/**
 * Hook for adding items to cart
 * Returns a function that adds an item to the cart and handles loading/error states
 */
export function useAddItemToCart() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addItemToCart = async (productData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await addItemToCartService(productData);
      return result;
    } catch (err) {
      setError(err.message || "Failed to add item to cart");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return addItemToCart;
}

/**
 * Hook for emptying the cart
 * Returns a function that removes all items from the cart and handles loading/error states
 */
export function useEmptyCart() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const emptyCart = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await emptyCartService();
      return result;
    } catch (err) {
      setError(err.message || "Failed to empty cart");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return emptyCart;
}

/**
 * Hook for accessing cart loading and error states
 * Useful when you need to display loading indicators or error messages
 */
export function useCartStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const setCartLoading = (loading) => setIsLoading(loading);
  const setCartError = (errorMessage) => setError(errorMessage);
  const clearCartError = () => setError(null);

  return {
    isLoading,
    error,
    setCartLoading,
    setCartError,
    clearCartError,
  };
}
