import React, { useEffect } from "react";
import Image from "next/image";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "@/styles/payment-element.css";

// Error Boundary Component
class PaymentElementErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      "PaymentElement Error Boundary caught an error:",
      error,
      errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            Payment form error: {this.state.error?.message || "Unknown error"}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Separate component for Payment Element that only renders inside Elements provider
const PaymentElementWrapper = ({
  clientSecret,
  billingAddress,
  onElementsReady,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  console.log("PaymentElementWrapper state:", {
    stripe: !!stripe,
    elements: !!elements,
    clientSecret: !!clientSecret,
    billingAddress: billingAddress
      ? {
          name:
            billingAddress.first_name && billingAddress.last_name
              ? `${billingAddress.first_name} ${billingAddress.last_name}`
              : "missing",
          email: billingAddress.email || "missing",
          phone: billingAddress.phone || "missing",
        }
      : "missing",
  });

  // Notify parent when Elements are ready
  useEffect(() => {
    if (stripe && elements && onElementsReady) {
      onElementsReady(elements);
    }
  }, [stripe, elements, onElementsReady]);

  if (!stripe || !elements || !clientSecret) {
    return (
      <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          Loading payment form... Please wait.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <PaymentElementErrorBoundary>
        <PaymentElement
          options={{
            layout: "tabs",
            paymentMethodTypes: ["card", "link", "apple_pay", "google_pay"],
            wallets: {
              applePay: "auto",
              googlePay: "auto",
              link: "auto",
            },
            fields: {
              billingDetails: "never",
            },
            defaultValues: {
              billingDetails: {
                name:
                  billingAddress?.first_name && billingAddress?.last_name
                    ? `${billingAddress.first_name} ${billingAddress.last_name}`
                    : undefined,
                email: billingAddress?.email || undefined,
                phone: billingAddress?.phone || undefined,
                country: billingAddress?.country || "US",
              },
            },
            terms: {
              card: "never", // Hide the "Save my information" checkbox
            },
          }}
          className="payment-element"
        />
      </PaymentElementErrorBoundary>
    </div>
  );
};

const Payment = ({
  setFormData,
  cardNumber,
  setCardNumber,
  expiry,
  setExpiry,
  cvc,
  setCvc,
  cardType,
  setCardType,
  onValidationChange, // New prop for validation callback
  clientSecret, // New prop for Stripe client secret
  billingAddress, // New prop for billing address
  onElementsReady, // New prop for Elements ready callback
}) => {
  // Debug logging
  useEffect(() => {
    console.log("Payment component state:", {
      clientSecret: clientSecret ? "present" : "missing",
    });
  }, [clientSecret]);

  // Call validation callback whenever payment data changes
  useEffect(() => {
    if (onValidationChange) {
      // For Payment Element, we'll validate on submit
      // The Payment Element handles its own validation
      if (clientSecret) {
        onValidationChange(true); // Payment Element will handle validation
      } else {
        onValidationChange(false); // No payment method available
      }
    }
  }, [clientSecret, onValidationChange]);

  return (
    <div>
      <div className="my-6">
        <h1 className="text-lg font-semibold">Payment</h1>
        <p className="text-gray-700 text-sm">
          All transactions are secure and encrypted.
        </p>
      </div>

      <div className="bg-white w-full lg:max-w-[512px] p-6 rounded-[16px] shadow-sm border border-gray-300">
        <h1 className="flex items-center justify-between">
          <span className="font-semibold text-sm">Payment Methods</span>
          <div className="h-8 w-[50%] relative">
            <Image
              fill
              src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/payment-methods.png"
              alt="payment-methods"
              className="object-contain"
            />
          </div>
        </h1>

        <div className="border-t border-gray-200 pt-4">
          {clientSecret === "error" ? (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                Failed to load payment form. Please refresh the page and try
                again.
              </p>
            </div>
          ) : clientSecret && clientSecret !== "error" ? (
            <PaymentElementWrapper
              clientSecret={clientSecret}
              billingAddress={billingAddress}
              onElementsReady={onElementsReady}
            />
          ) : (
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Loading payment form... Please wait.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
