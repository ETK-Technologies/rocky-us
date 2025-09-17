/**
 * Logger Test/Demo
 * Run this to test the logger functionality
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

// Test function to demonstrate logger functionality
export const testLogger = () => {
  console.log("🧪 Testing Secure Logger...\n");

  // Test basic logging
  console.log("1. Basic Logging:");
  log.info("This is an info message");
  log.warn("This is a warning message");
  log.error("This is an error message");
  log.debug("This is a debug message");

  console.log("\n2. Payment Logging (with redaction):");
  logPayment("Processing payment", {
    cardNumber: "4242424242424242",
    cvv: "123",
    apiKey: "sk_test_123456789",
    amount: 50.0,
    orderId: "order_123",
    customerEmail: "test@example.com",
  });

  console.log("\n3. Order Logging:");
  logOrder("Order created successfully", {
    orderId: "order_456",
    total: 75.5,
    status: "pending",
    paymentMethod: "stripe_cc",
  });

  console.log("\n4. API Logging:");
  logApi("API request completed", {
    endpoint: "/api/checkout",
    method: "POST",
    status: 200,
    responseTime: "150ms",
  });

  console.log("\n5. Error Logging:");
  logError("Payment processing failed", {
    error: "Card declined",
    orderId: "order_789",
    cardLast4: "4242",
    amount: 25.0,
  });

  console.log("\n6. Sensitive Data Redaction Test:");
  logPayment("Sensitive data test", {
    password: "secret123",
    token: "tok_123456789",
    secret: "sk_live_123456789",
    creditCard: "4111111111111111",
    cvv: "999",
    ssn: "123-45-6789",
    // These should NOT be redacted
    amount: 100.0,
    orderId: "order_999",
    customerName: "John Doe",
  });

  console.log("\n✅ Logger test completed!");
  console.log("📝 Note: In production, only ERROR level logs will show.");
  console.log(
    "🔧 Configure with environment variables: LOG_LEVEL, LOG_ENABLED, etc."
  );
};

// Run test if this file is executed directly
if (
  typeof window === "undefined" &&
  process.argv[1] === new URL(import.meta.url).pathname
) {
  testLogger();
}
