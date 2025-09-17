/**
 * Logger Usage Examples
 * This file demonstrates how to use the secure logger utility
 */

import {
  log,
  logError,
  logWarn,
  logInfo,
  logDebug,
  logPayment,
  logApi,
  logOrder,
} from "./logger.js";

// Example usage in different scenarios

// 1. Basic logging
export const basicLoggingExamples = () => {
  log.info("Application started");
  log.warn("This is a warning message");
  log.error("This is an error message");
  log.debug("Debug information", { userId: 123, action: "login" });
};

// 2. Payment-specific logging (automatically redacts sensitive data)
export const paymentLoggingExamples = () => {
  // This will automatically redact sensitive fields
  logPayment("Processing payment", {
    cardNumber: "4242424242424242",
    cvv: "123",
    amount: 50.0,
    customerId: "cus_123",
  });

  // Order logging
  logOrder("Order created", {
    orderId: "order_123",
    total: 50.0,
    paymentMethod: "stripe_cc",
  });
};

// 3. API logging
export const apiLoggingExamples = () => {
  logApi("API request sent", {
    endpoint: "/api/checkout",
    method: "POST",
    status: 200,
  });
};

// 4. Error handling with logging
export const errorHandlingExample = async () => {
  try {
    // Some operation that might fail
    const result = await fetch("/api/some-endpoint");
    if (!result.ok) {
      throw new Error(`API returned ${result.status}`);
    }
  } catch (error) {
    // Log the error with context
    logError("Failed to fetch data", {
      error: error.message,
      endpoint: "/api/some-endpoint",
      timestamp: new Date().toISOString(),
    });
  }
};

// 5. Conditional logging based on environment
export const conditionalLoggingExample = () => {
  // This will only log in development
  logDebug("Detailed debug info", {
    step: "payment_processing",
    data: {
      /* sensitive data */
    },
  });

  // This will always log (if level allows)
  logError("Critical error occurred", {
    error: "Payment failed",
    orderId: "order_123",
  });
};

// 6. Custom logger configuration
export const customLoggerExample = () => {
  // You can create a custom logger instance
  import { SecureLogger } from "./logger.js";

  const customLogger = new SecureLogger({
    level: 2, // INFO level
    enableTimestamp: true,
    prefix: {
      error: "🚨 ERROR",
      warn: "⚠️ WARN",
      info: "ℹ️ INFO",
      debug: "🐛 DEBUG",
    },
  });

  customLogger.info("Custom logger message");
};

// 7. Redaction examples
export const redactionExamples = () => {
  // These fields will be automatically redacted
  logPayment("Payment data", {
    cardNumber: "4242424242424242", // → [REDACTED]
    cvv: "123", // → [REDACTED]
    apiKey: "sk_test_123", // → [REDACTED]
    password: "secret123", // → [REDACTED]
    amount: 50.0, // → 50.00 (not redacted)
    orderId: "order_123", // → order_123 (not redacted)
  });
};

// 8. Environment-specific behavior
export const environmentExamples = () => {
  // In development: logs will show
  // In production: logs will be suppressed (unless level is ERROR)

  logDebug("This only shows in development");
  logInfo("This shows in development and test");
  logError("This always shows (if logging is enabled)");
};

// 9. Performance considerations
export const performanceExample = () => {
  // Good: Simple message
  logInfo("User logged in");

  // Good: Structured data
  logPayment("Payment processed", { orderId: "123", amount: 50 });

  // Avoid: Complex object serialization in production
  // logDebug("Complex data", veryLargeObject); // Only in development
};

// 10. Integration with existing code
export const integrationExample = () => {
  // Replace console.log
  // console.log("Order created:", orderData);
  logOrder("Order created:", orderData);

  // Replace console.error
  // console.error("Payment failed:", error);
  logError("Payment failed:", error);

  // Replace console.warn
  // console.warn("Deprecated API used");
  logWarn("Deprecated API used");
};
