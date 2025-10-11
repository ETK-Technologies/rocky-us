"use client";

import { CardElement } from "@stripe/react-stripe-js";

// Card Element styling to match your design
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#251F20",
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#9CA3AF",
      },
      iconColor: "#251F20",
    },
    invalid: {
      color: "#EF4444",
      iconColor: "#EF4444",
    },
    complete: {
      iconColor: "#10B981",
    },
  },
  hidePostalCode: true, // We already collect this in billing address
};

export default function StripeCardInput({ onReady, onChange }) {
  return (
    <div className="stripe-card-input">
      <CardElement
        options={CARD_ELEMENT_OPTIONS}
        onReady={onReady}
        onChange={onChange}
      />

      <style jsx global>{`
        .stripe-card-input .StripeElement {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e2e2e1;
          border-radius: 8px;
          background: white;
          transition: border-color 0.2s ease;
        }

        .stripe-card-input .StripeElement--focus {
          border-color: #251f20;
          outline: none;
          box-shadow: 0 0 0 1px #251f20;
        }

        .stripe-card-input .StripeElement--invalid {
          border-color: #ef4444;
        }

        .stripe-card-input .StripeElement--complete {
          border-color: #10b981;
        }
      `}</style>
    </div>
  );
}
