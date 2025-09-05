/**
 * Payment-related constants
 */

// Order statuses
export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  ON_HOLD: "on-hold",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  FAILED: "failed",
};

// Payment statuses
export const PAYMENT_STATUS = {
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  PENDING: "PENDING",
};

// Response statuses
export const RESPONSE_STATUS = {
  SUCCESS: "completed",
  PAYMENT_SUCCESS_ORDER_UPDATE_FAILED: "payment_success_order_update_failed",
};

// Supported currencies
export const SUPPORTED_CURRENCIES = ["USD", "CAD", "EUR", "GBP"];

// Payment meta keys
export const PAYMENT_META_KEYS = {
  STRIPE_PAYMENT_INTENT_ID: "_stripe_payment_intent_id",
  STRIPE_PAYMENT_METHOD_ID: "_stripe_payment_method_id",
  STRIPE_PAYMENT_CONFIRMED: "_stripe_payment_confirmed",
  STRIPE_PAYMENT_CONFIRMED_AT: "_stripe_payment_confirmed_at",
};

// API endpoints
export const API_ENDPOINTS = {
  STRIPE_LIVE: "https://api.stripe.com",
  STRIPE_TEST: "https://api.stripe.com", // Stripe uses same endpoint for test/live
};

// Error messages
export const ERROR_MESSAGES = {
  NOT_AUTHENTICATED: "Not authenticated",
  INVALID_PAYMENT_DATA: "Invalid payment data",
  SERVER_CONFIG_ERROR: "Server configuration error",
  PAYMENT_PROCESSING_FAILED: "Payment processing failed",
  ORDER_UPDATE_FAILED: "Payment processed but order update failed",
  CART_EMPTY_FAILED: "Failed to empty cart after payment",
};
