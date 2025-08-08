import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  APPLE_PAY_CONFIG,
  checkApplePayAvailability,
} from "@/lib/constants/applePay";

const ApplePayButton = ({
  amount,
  currency = "USD",
  billingAddress,
  onPaymentSuccess,
  onPaymentError,
  isProcessing = false,
  disabled = false,
}) => {
  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false);
  const [applePayInstance, setApplePayInstance] = useState(null);
  const applePayInstanceRef = useRef(null);
  const [initializationStatus, setInitializationStatus] =
    useState("not_started");
  const applePayRef = useRef(null);

  // Check if Apple Pay is available
  useEffect(() => {
    const checkAvailability = async () => {
      console.log("Checking Apple Pay availability...");

      try {
        const isAvailable = checkApplePayAvailability();
        console.log("Apple Pay available:", isAvailable);

        if (isAvailable === true) {
          console.log("Setting Apple Pay as available and initializing...");
          setIsApplePayAvailable(true);
          await initializeApplePay();
        } else {
          console.log("Apple Pay not available on this device/browser");
          setIsApplePayAvailable(false);
        }
      } catch (error) {
        console.error("Error checking Apple Pay availability:", error);
        setIsApplePayAvailable(false);
      }
    };

    // Delay the check to ensure everything is loaded
    const timer = setTimeout(checkAvailability, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Initialize Apple Pay with Paysafe.js
  const initializeApplePay = async () => {
    try {
      // Wait for Paysafe.js to load if not already loaded
      let attempts = 0;
      const maxAttempts = 10;

      while (typeof window.paysafe === "undefined" && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        attempts++;
      }

      if (typeof window.paysafe === "undefined") {
        console.error("Paysafe.js SDK not loaded after waiting");

        // Try to load the SDK dynamically as fallback
        try {
          const script = document.createElement("script");
          script.src = "https://hosted.paysafe.com/js/v1/latest/paysafe.min.js";
          script.async = true;

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });

          // Wait a bit more for initialization
          await new Promise((resolve) => setTimeout(resolve, 1000));

          if (typeof window.paysafe === "undefined") {
            console.error(
              "Paysafe.js SDK still not available after dynamic loading"
            );
            setIsApplePayAvailable(false);
            return;
          }
        } catch (error) {
          console.error("Failed to load Paysafe.js SDK dynamically:", error);
          setIsApplePayAvailable(false);
          return;
        }
      }

      // Get API key from backend
      const apiKeyResponse = await fetch("/api/paysafe/api-key");
      const apiKeyData = await apiKeyResponse.json();

      if (!apiKeyData.success || !apiKeyData.apiKey) {
        console.error(
          "Failed to get API key from backend:",
          apiKeyData.message
        );
        setIsApplePayAvailable(false);
        return;
      }

      const API_KEY = apiKeyData.apiKey;
      // Hard code account ID for testing (numeric as per docs)
      const ACCOUNT_ID = 1002990600;

      console.log("Default Account ID:", ACCOUNT_ID);
      console.log("Environment:", APPLE_PAY_CONFIG.ENVIRONMENT);

      const options = {
        currencyCode: currency,
        environment: APPLE_PAY_CONFIG.ENVIRONMENT,
        accounts: {
          default: ACCOUNT_ID,
        },
        fields: {
          applePay: {
            selector: "#apple-pay",
            ...APPLE_PAY_CONFIG.BUTTON_STYLES,
          },
        },
      };

      console.log("Paysafe options:", options);

      // Initialize Paysafe fields with retry logic
      let retryCount = 0;
      const maxRetries = 3;

      while (retryCount < maxRetries) {
        try {
          console.log(`Attempt ${retryCount + 1} to initialize Apple Pay...`);
          console.log("About to call paysafe.fields.setup...");

          const instance = await window.paysafe.fields.setup(API_KEY, options);
          console.log("Paysafe fields setup completed, instance:", instance);
          setApplePayInstance(instance);
          applePayInstanceRef.current = instance;

          // Show Apple Pay button
          console.log("About to call instance.show()...");
          const paymentMethods = await instance.show();
          console.log(
            "Instance.show() completed, paymentMethods:",
            paymentMethods
          );

          if (paymentMethods.applePay && !paymentMethods.applePay.error) {
            // Add click event listener
            if (applePayRef.current) {
              applePayRef.current.addEventListener(
                "click",
                handleApplePayClick
              );
            }
            console.log("Apple Pay initialized successfully");
            console.log("Payment methods:", paymentMethods);
            setInitializationStatus("success");
            return; // Success, exit the retry loop
          } else {
            console.error(
              "Apple Pay not available:",
              paymentMethods.applePay?.error
            );
            console.log("Full payment methods response:", paymentMethods);
            setIsApplePayAvailable(false);
            setInitializationStatus("failed");
            return; // Failed, exit the retry loop
          }
        } catch (error) {
          retryCount++;
          console.error(`Attempt ${retryCount} failed:`, error);

          if (retryCount >= maxRetries) {
            console.error("All retry attempts failed");
            setIsApplePayAvailable(false);
            setInitializationStatus("failed");
            return;
          }

          // Wait before retrying
          console.log(`Waiting 2 seconds before retry ${retryCount + 1}...`);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
    } catch (error) {
      console.error("Error initializing Apple Pay:", error);
      setIsApplePayAvailable(false);
      setInitializationStatus("failed");
    }
  };

  // Handle Apple Pay button click
  const handleApplePayClick = async (event) => {
    if (isProcessing || disabled) {
      return;
    }

    try {
      const instance = applePayInstanceRef.current;
      if (!instance) {
        throw new Error("Apple Pay not initialized");
      }

      // Normalize amount to minor units and validate (max 11 digits per Paysafe)
      console.log(
        "Apple Pay incoming amount prop:",
        amount,
        "currency:",
        currency
      );
      const rawAmountNumber = Number(amount);
      const zeroDecimalCurrencies = ["JPY", "KRW"];
      const isZeroDecimal = zeroDecimalCurrencies.includes(
        String(currency).toUpperCase()
      );
      let normalizedAmount = isZeroDecimal
        ? Math.round(rawAmountNumber)
        : Math.round(rawAmountNumber * 100);

      // Fallback hardcoded test amount ($1.00) if invalid
      if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
        console.warn(
          "Invalid Apple Pay amount, using fallback $1.00:",
          amount,
          normalizedAmount
        );
        normalizedAmount = 100; // $1.00 in minor units
      }
      if (String(normalizedAmount).length > 11) {
        console.error(
          "Apple Pay amount too large (max 11 digits):",
          normalizedAmount
        );
        throw new Error("Amount too large. Please contact support.");
      }

      // Prepare payment data
      const paymentData = {
        amount: normalizedAmount,
        transactionType: APPLE_PAY_CONFIG.TRANSACTION_TYPE,
        paymentType: APPLE_PAY_CONFIG.PAYMENT_TYPE,
        applePay: {
          country: billingAddress?.country || "US",
        },
        customerDetails: {
          billingDetails: {
            country: billingAddress?.country || "US",
            zip: billingAddress?.postcode || "",
            street: billingAddress?.address_1 || "",
            city: billingAddress?.city || "",
            state: billingAddress?.state || "",
          },
        },
        merchantRefNum: "merchant-ref-num-" + new Date().getTime(),
      };

      // Tokenize the payment
      const result = await instance.tokenize(paymentData);

      if (result.token) {
        // Close Apple Pay window
        try {
          if (typeof instance.complete === "function") {
            instance.complete("success");
          }
        } catch (completeErr) {
          console.warn(
            "instance.complete('success') unsupported:",
            completeErr
          );
        }

        // Call success callback with token
        onPaymentSuccess({
          token: result.token,
          paymentType: "apple_pay",
          amount: amount,
          currency: currency,
        });
      } else {
        throw new Error("No payment token received");
      }
    } catch (error) {
      console.error("Apple Pay payment error:", error);

      // Close Apple Pay window
      const instance = applePayInstanceRef.current;
      try {
        if (instance && typeof instance.complete === "function") {
          instance.complete("fail");
        }
      } catch (completeErr) {
        console.warn("instance.complete('fail') unsupported:", completeErr);
      }

      // Call error callback
      onPaymentError(error?.message || "Apple Pay payment failed");
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (applePayRef.current) {
        applePayRef.current.removeEventListener("click", handleApplePayClick);
      }
    };
  }, []);

  // Debug: Always show in development to see what's happening
  if (!isApplePayAvailable && process.env.NODE_ENV === "development") {
    return (
      <div className="apple-pay-container">
        <div className="text-xs text-red-500 mb-2">
          Apple Pay NOT Available - Status: {initializationStatus}
        </div>
        <div
          style={{
            width: "100%",
            height: "44px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            backgroundColor: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
          }}
        >
          Apple Pay Not Available
        </div>
      </div>
    );
  }

  if (!isApplePayAvailable) {
    return null;
  }

  return (
    <div className="apple-pay-container">
      {/* Debug info in development */}
      {process.env.NODE_ENV === "development" && (
        <div className="text-xs text-gray-500 mb-2">
          Apple Pay Status: {initializationStatus}
        </div>
      )}
      <div
        id="apple-pay"
        ref={applePayRef}
        className={`apple-pay-button ${
          disabled || isProcessing || initializationStatus !== "success"
            ? "disabled"
            : ""
        }`}
        style={{
          width: "100%",
          height: "44px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          backgroundColor:
            disabled || isProcessing || initializationStatus !== "success"
              ? "#f3f4f6"
              : "#ffffff",
          cursor:
            disabled || isProcessing || initializationStatus !== "success"
              ? "not-allowed"
              : "pointer",
          opacity:
            disabled || isProcessing || initializationStatus !== "success"
              ? 0.6
              : 1,
          pointerEvents:
            disabled || isProcessing || initializationStatus !== "success"
              ? "none"
              : "auto",
        }}
      />
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
          <div className="w-6 h-6 border-2 border-[#AE7E56] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ApplePayButton;
