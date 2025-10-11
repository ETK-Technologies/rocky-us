import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

/**
 * Get or initialize Stripe client with publishable key
 * @returns {Promise} Stripe instance
 */
export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      console.error("Stripe publishable key is not configured");
      return null;
    }

    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
};


