/**
 * Validation utilities for API routes
 */

// Payment validation schema
export const validatePaymentInput = (data) => {
  const errors = [];

  // Required fields
  if (!data.order_id) {
    errors.push("Order ID is required");
  } else if (
    typeof data.order_id !== "number" &&
    typeof data.order_id !== "string"
  ) {
    errors.push("Order ID must be a number or string");
  }

  // Amount validation - allow zero for free orders with coupons
  if (data.amount === undefined || data.amount === null) {
    errors.push("Amount is required");
  } else if (typeof data.amount !== "number") {
    errors.push("Amount must be a number");
  } else if (data.amount < 0) {
    errors.push("Amount cannot be negative");
  } else if (data.amount === 0) {
    // Allow zero amount only if this is explicitly a free order (will be handled differently)
    console.log(
      "Zero amount detected - assuming this is a free order with 100% coupon"
    );
  } else if (data.amount > 0) {
    // Normal positive amount - continue with regular validation
  } else {
    errors.push("Amount must be zero or positive");
  }

  // Card validation - only required for non-zero amounts (paid orders)
  const isFreeOrder = data.amount === 0;

  if (!isFreeOrder) {
    // Only validate card details for paid orders
    if (!data.cardNumber) {
      errors.push("Card number is required");
    } else if (!/^\d{13,19}$/.test(data.cardNumber.replace(/\s/g, ""))) {
      errors.push("Invalid card number format");
    }

    if (!data.cardExpMonth) {
      errors.push("Card expiry month is required");
    } else if (!/^(0[1-9]|1[0-2])$/.test(data.cardExpMonth)) {
      errors.push("Invalid expiry month (must be 01-12)");
    }

    if (!data.cardExpYear) {
      errors.push("Card expiry year is required");
    } else if (!/^\d{2,4}$/.test(data.cardExpYear)) {
      errors.push("Invalid expiry year format");
    }

    if (!data.cardCVD) {
      errors.push("CVD is required");
    } else if (!/^\d{3,4}$/.test(data.cardCVD)) {
      errors.push("Invalid CVD format (must be 3-4 digits)");
    }
  } else {
    console.log("Skipping card validation for free order (zero amount)");
  }

  // Optional billing address validation
  if (data.billing_address) {
    if (!data.billing_address.first_name) {
      errors.push("Billing first name is required");
    }
    if (!data.billing_address.last_name) {
      errors.push("Billing last name is required");
    }
    if (
      !data.billing_address.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.billing_address.email)
    ) {
      errors.push("Valid billing email is required");
    }
  }

  // Currency validation
  if (data.currency) {
    const { SUPPORTED_CURRENCIES } = require("@/lib/constants/payment");
    if (!SUPPORTED_CURRENCIES.includes(data.currency)) {
      errors.push("Invalid currency code");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Environment validation
export const validateEnvironmentVariables = () => {
  const required = [
    "BASE_URL",
    "PAYSAFE_ACCOUNT_ID",
    "PAYSAFE_API_USERNAME",
    "PAYSAFE_API_PASSWORD",
    "ADMIN_TOKEN",
  ];

  const missing = required.filter((key) => !process.env[key]);

  return {
    isValid: missing.length === 0,
    missing,
  };
};

// Sanitize payment data for logging
export const sanitizePaymentData = (data) => {
  const sanitized = { ...data };

  // Mask sensitive data
  if (sanitized.cardNumber) {
    sanitized.cardNumber = `****${sanitized.cardNumber.slice(-4)}`;
  }
  if (sanitized.cardCVD) {
    sanitized.cardCVD = "***";
  }
  if (sanitized.billing_address?.email) {
    const email = sanitized.billing_address.email;
    const [user, domain] = email.split("@");
    sanitized.billing_address.email = `${user.slice(0, 2)}***@${domain}`;
  }

  return sanitized;
};
