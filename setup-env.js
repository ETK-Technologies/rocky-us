const fs = require("fs");
const path = require("path");

console.log("🔧 Stripe Payment Environment Setup");
console.log("===================================\n");

// Check if .env.local exists
const envPath = path.join(__dirname, ".env.local");
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log("✅ .env.local file found");

  // Read existing content
  const content = fs.readFileSync(envPath, "utf8");
  console.log("\n📄 Current .env.local content:");
  console.log(content);
} else {
  console.log("❌ .env.local file not found");
}

console.log("\n📝 Required environment variables for Stripe:");
console.log("=============================================");
console.log("");
console.log("# Stripe Configuration");
console.log("STRIPE_SECRET_KEY=sk_test_your_secret_key");
console.log("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key");
console.log("STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret");
console.log("");
console.log("# WooCommerce Configuration");
console.log("BASE_URL=https://your-wordpress-site.com");
console.log("CONSUMER_KEY=ck_your_consumer_key");
console.log("CONSUMER_SECRET=cs_your_consumer_secret");
console.log("");
console.log("# Optional Logger Configuration");
console.log("LOG_LEVEL=DEBUG  # ERROR, WARN, INFO, DEBUG, TRACE");
console.log("LOG_ENABLED=true  # Enable/disable logging");
console.log("LOG_TIMESTAMP=true  # Show timestamps in logs");
console.log("LOG_CALLER=false  # Show file/line info (expensive)");
console.log("");

if (!envExists) {
  console.log(
    "💡 Create a .env.local file in your project root with the above variables"
  );
  console.log(
    '💡 Replace "sk_test_your_secret_key", etc. with your actual Stripe credentials'
  );
}

console.log("\n🔍 To test your setup:");
console.log("1. Add your environment variables to .env.local");
console.log("2. Restart your development server");
console.log("3. Visit your checkout page");
console.log("4. Check the debug info panel for status");
console.log("5. Test the API endpoint: /api/stripe/create-payment-intent");
console.log("6. Test the logger: node lib/utils/logger-test.js");
