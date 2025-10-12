"use client";

import { PaymentElement } from "@stripe/react-stripe-js";

// Payment Element styling to match your design
const PAYMENT_ELEMENT_OPTIONS = {
  layout: {
    type: "tabs",
    defaultCollapsed: false,
  },
  fields: {
    billingDetails: {
      address: {
        country: "never", // We collect this separately
        postalCode: "never", // We collect this separately
      },
    },
  },
  wallets: {
    applePay: "auto", // Show Apple Pay if available
    googlePay: "auto", // Show Google Pay if available
  },
};

export default function StripeCardInput({ onReady, onChange }) {
  return (
    <div className="stripe-payment-input">
      <PaymentElement
        options={PAYMENT_ELEMENT_OPTIONS}
        onReady={onReady}
        onChange={onChange}
      />

      <style jsx global>{`
        .stripe-payment-input {
          width: 100%;
        }

        .stripe-payment-input .StripeElement {
          width: 100%;
        }

        /* Custom styling for Payment Element */
        .stripe-payment-input [data-testid="payment-element"] {
          border-radius: 8px;
        }

        /* Tab styling */
        .stripe-payment-input .p-TabsItem {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 14px;
        }

        /* Input field styling */
        .stripe-payment-input .p-Input {
          border-radius: 6px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
