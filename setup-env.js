const fs = require("fs");
const path = require("path");

console.log("🔧 Apple Pay Environment Setup");
console.log("===============================\n");

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

console.log("\n📝 Required environment variables for Apple Pay:");
console.log("===============================================");
console.log("");
console.log("# Paysafe Configuration (existing)");
console.log("PAYSAFE_ACCOUNT_ID=your_account_id");
console.log("PAYSAFE_API_USERNAME=your_api_username");
console.log("PAYSAFE_API_PASSWORD=your_api_password");
console.log('PAYSAFE_ENVIRONMENT=test  # or "live" for production');
console.log("");
console.log("# Optional Apple Pay Configuration");
console.log('NEXT_PUBLIC_PAYSAFE_ENVIRONMENT=test  # or "live"');
console.log("NEXT_PUBLIC_PAYSAFE_ACCOUNT_ID=your_account_id");
console.log("");

if (!envExists) {
  console.log(
    "💡 Create a .env.local file in your project root with the above variables"
  );
  console.log(
    '💡 Replace "your_account_id", "your_api_username", etc. with your actual Paysafe credentials'
  );
}

console.log("\n🔍 To test your setup:");
console.log("1. Add your environment variables to .env.local");
console.log("2. Restart your development server");
console.log("3. Visit your checkout page");
console.log("4. Check the debug info panel for status");
console.log("5. Test the API endpoint: /api/paysafe/test-api-key");
