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
  const applePayRef = useRef(null);

  // Check if Apple Pay is available
  useEffect(() => {
    const checkAvailability = async () => {
      try {
        const isAvailable = checkApplePayAvailability();

        if (isAvailable === true) {
          setIsApplePayAvailable(true);
          await initializeApplePay();
        } else {
          setIsApplePayAvailable(false);
        }
      } catch (error) {
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
      const ACCOUNT_ID = apiKeyData.accountId || "1002990600";

      const options = {
        currencyCode: currency,
        environment: APPLE_PAY_CONFIG.ENVIRONMENT,
        accounts: {
          default: ACCOUNT_ID,
        },
        fields: {
          applePay: {
            selector: "#apple-pay-button",
            ...APPLE_PAY_CONFIG.BUTTON_STYLES,
          },
        },
      };

      // Initialize Paysafe fields with retry logic
      let retryCount = 0;
      const maxRetries = 3;

      while (retryCount < maxRetries) {
        try {
          const instance = await window.paysafe.fields.setup(API_KEY, options);
          setApplePayInstance(instance);

          // Show Apple Pay button
          const paymentMethods = await instance.show();

          if (paymentMethods.applePay && !paymentMethods.applePay.error) {
            // Add click event listener
            if (applePayRef.current) {
              applePayRef.current.addEventListener(
                "click",
                handleApplePayClick
              );
            }
            return; // Success, exit the retry loop
          } else {
            setIsApplePayAvailable(false);
            return; // Failed, exit the retry loop
          }
        } catch (error) {
          retryCount++;

          if (retryCount >= maxRetries) {
            setIsApplePayAvailable(false);
            return;
          }

          // Wait before retrying
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
    } catch (error) {
      setIsApplePayAvailable(false);
    }
  };

  // Handle Apple Pay button click
  const handleApplePayClick = async (event) => {
    if (isProcessing || disabled) {
      return;
    }

    try {
      if (!applePayInstance) {
        throw new Error("Apple Pay not initialized");
      }

      // Prepare payment data
      const paymentData = {
        amount: Math.round(amount * 100), // Convert to cents
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
      const result = await applePayInstance.tokenize(paymentData);

      if (result.token) {
        // Close Apple Pay window
        applePayInstance.complete("success");

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
      if (applePayInstance) {
        applePayInstance.complete("fail");
      }

      // Call error callback
      onPaymentError(error.message || "Apple Pay payment failed");
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

  if (!isApplePayAvailable) {
    return null;
  }

  return (
    <div className="apple-pay-container">
      <div
        id="apple-pay-button"
        ref={applePayRef}
        className={`apple-pay-button ${
          disabled || isProcessing ? "disabled" : ""
        }`}
        style={{
          width: "100%",
          height: "44px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          backgroundColor: disabled || isProcessing ? "#f3f4f6" : "#ffffff",
          cursor: disabled || isProcessing ? "not-allowed" : "pointer",
          opacity: disabled || isProcessing ? 0.6 : 1,
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
