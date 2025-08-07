// Apple Pay Configuration Constants
export const APPLE_PAY_CONFIG = {
  // Environment settings
  ENVIRONMENT:
    process.env.NEXT_PUBLIC_PAYSAFE_ENVIRONMENT === "live" ? "LIVE" : "TEST",

  // Currency settings
  CURRENCY: "USD",

  // Button styling
  BUTTON_STYLES: {
    type: "buy",
    label: "Pay with Apple Pay",
    color: "white-outline", // Options: white, white-outline, black, black-outline
  },

  // Payment types
  PAYMENT_TYPE: "APPLEPAY",
  TRANSACTION_TYPE: "PAYMENT",

  // Error messages
  ERROR_MESSAGES: {
    NOT_AVAILABLE: "Apple Pay is not available on this device",
    INITIALIZATION_FAILED: "Failed to initialize Apple Pay",
    PAYMENT_FAILED: "Apple Pay payment failed",
    TOKEN_MISSING: "Apple Pay token is missing",
    NETWORK_ERROR: "Network error during Apple Pay payment",
  },

  // Success messages
  SUCCESS_MESSAGES: {
    PAYMENT_SUCCESS: "Apple Pay payment processed successfully",
    ORDER_CREATED: "Order created successfully with Apple Pay",
  },
};

// Apple Pay availability check
export const checkApplePayAvailability = () => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    // Check if ApplePaySession exists
    if (!window.ApplePaySession) {
      return false;
    }

    // Check if device can make payments
    const canMakePayments = ApplePaySession.canMakePayments();

    // Check if device can make payments with active card
    let canMakePaymentsWithActiveCard = false;
    try {
      canMakePaymentsWithActiveCard =
        typeof ApplePaySession.canMakePaymentsWithActiveCard === "function";
    } catch (error) {
      canMakePaymentsWithActiveCard = false;
    }

    return canMakePayments && canMakePaymentsWithActiveCard;
  } catch (error) {
    return false;
  }
};

// Apple Pay merchant capabilities
export const MERCHANT_CAPABILITIES = [
  "supports3DS",
  "supportsCredit",
  "supportsDebit",
];

// Apple Pay supported networks
export const SUPPORTED_NETWORKS = ["visa", "masterCard", "amex", "discover"];

// Apple Pay payment request configuration
export const createPaymentRequest = (amount, currency = "USD") => ({
  countryCode: "US",
  currencyCode: currency,
  supportedNetworks: SUPPORTED_NETWORKS,
  merchantCapabilities: MERCHANT_CAPABILITIES,
  total: {
    label: "Rocky Health",
    amount: amount.toString(),
  },
});
