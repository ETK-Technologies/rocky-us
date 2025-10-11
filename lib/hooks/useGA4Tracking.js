/**
 * GA4 Tracking Hook
 * React hook for easy GA4 event tracking in components
 */

import { useCallback, useEffect, useRef } from "react";
import { logger } from "@/utils/devLogger";
import {
  trackGA4Event,
  trackGA4EcommerceEvent,
  trackViewItem,
  trackAddToCart,
  trackRemoveFromCart,
  trackViewCart,
  trackBeginCheckout,
  trackSearch,
  trackPageView,
  trackCustomEvent,
  trackFormSubmit,
  trackButtonClick,
  trackVideoInteraction,
} from "@/utils/ga4Events";

/**
 * Main GA4 tracking hook
 * @param {Object} options - Hook configuration options
 * @param {boolean} options.debug - Enable debug logging (default: true)
 * @param {boolean} options.enabled - Enable tracking (default: true)
 * @returns {Object} Tracking functions
 */
export const useGA4Tracking = (options = {}) => {
  const { debug = true, enabled = true } = options;
  const trackedEvents = useRef(new Set());

  // Wrapper function to respect enabled flag and prevent duplicate events
  const createTracker = useCallback(
    (trackingFn, allowDuplicates = true) => {
      return (...args) => {
        if (!enabled) return;

        // Create event key for duplicate prevention (if needed)
        if (!allowDuplicates) {
          const eventKey = JSON.stringify(args);
          if (trackedEvents.current.has(eventKey)) {
            if (debug) logger.log("[GA4] Duplicate event prevented:", eventKey);
            return;
          }
          trackedEvents.current.add(eventKey);
        }

        return trackingFn(...args, debug);
      };
    },
    [enabled, debug]
  );

  // Basic event tracking
  const trackEvent = useCallback(createTracker(trackGA4Event), [createTracker]);

  const trackEcommerceEvent = useCallback(
    createTracker(trackGA4EcommerceEvent),
    [createTracker]
  );

  // Ecommerce event tracking
  const trackProductView = useCallback(
    createTracker(trackViewItem, false), // Prevent duplicate view_item events
    [createTracker]
  );

  const trackCartAdd = useCallback(createTracker(trackAddToCart), [
    createTracker,
  ]);

  const trackCartRemove = useCallback(createTracker(trackRemoveFromCart), [
    createTracker,
  ]);

  const trackCartView = useCallback(createTracker(trackViewCart), [
    createTracker,
  ]);

  const trackCheckoutBegin = useCallback(createTracker(trackBeginCheckout), [
    createTracker,
  ]);

  // Other event tracking
  const trackSearchEvent = useCallback(createTracker(trackSearch), [
    createTracker,
  ]);

  const trackPageViewEvent = useCallback(createTracker(trackPageView), [
    createTracker,
  ]);

  const trackCustom = useCallback(createTracker(trackCustomEvent), [
    createTracker,
  ]);

  const trackForm = useCallback(createTracker(trackFormSubmit), [
    createTracker,
  ]);

  const trackButton = useCallback(createTracker(trackButtonClick), [
    createTracker,
  ]);

  const trackVideo = useCallback(createTracker(trackVideoInteraction), [
    createTracker,
  ]);

  // Clear tracked events cache (useful for route changes)
  const clearTrackedEvents = useCallback(() => {
    trackedEvents.current.clear();
  }, []);

  return {
    // Basic tracking
    trackEvent,
    trackEcommerceEvent,

    // Ecommerce tracking
    trackProductView,
    trackCartAdd,
    trackCartRemove,
    trackCartView,
    trackCheckoutBegin,

    // Other tracking
    trackSearchEvent,
    trackPageViewEvent,
    trackCustom,
    trackForm,
    trackButton,
    trackVideo,

    // Utilities
    clearTracked: clearTrackedEvents,
    isEnabled: enabled,
  };
};

/**
 * Hook specifically for product page tracking
 * @param {Object} product - Product data
 * @param {Object} options - Hook options
 * @returns {Object} Product-specific tracking functions
 */
export const useProductTracking = (product, options = {}) => {
  const tracking = useGA4Tracking(options);
  const hasTrackedView = useRef(false);

  // Auto-track product view when product data is available
  useEffect(() => {
    if (
      product &&
      product.id &&
      !hasTrackedView.current &&
      tracking.isEnabled
    ) {
      tracking.trackProductView(product);
      hasTrackedView.current = true;
    }
  }, [product, tracking]);

  // Product-specific tracking functions
  const trackAddToCart = useCallback(
    (quantity = 1, additionalData = {}) => {
      if (product) {
        tracking.trackCartAdd(product, quantity, additionalData);
      }
    },
    [product, tracking]
  );

  const trackRemoveFromCart = useCallback(
    (quantity = 1, additionalData = {}) => {
      if (product) {
        tracking.trackCartRemove(product, quantity, additionalData);
      }
    },
    [product, tracking]
  );

  return {
    ...tracking,
    trackAddToCart,
    trackRemoveFromCart,
    product,
  };
};

/**
 * Hook for cart page tracking
 * @param {Array} cartItems - Cart items array
 * @param {Object} options - Hook options
 * @returns {Object} Cart-specific tracking functions
 */
export const useCartTracking = (cartItems = [], options = {}) => {
  const tracking = useGA4Tracking(options);
  const hasTrackedView = useRef(false);

  // Auto-track cart view when cart items are available
  useEffect(() => {
    if (cartItems.length > 0 && !hasTrackedView.current && tracking.isEnabled) {
      tracking.trackCartView(cartItems);
      hasTrackedView.current = true;
    }
  }, [cartItems, tracking]);

  // Reset view tracking when cart becomes empty
  useEffect(() => {
    if (cartItems.length === 0) {
      hasTrackedView.current = false;
    }
  }, [cartItems.length]);

  const trackCheckoutBegin = useCallback(() => {
    if (cartItems.length > 0) {
      tracking.trackCheckoutBegin(cartItems);
    }
  }, [cartItems, tracking]);

  return {
    ...tracking,
    trackCheckoutBegin,
    cartItems,
  };
};

/**
 * Hook for search page tracking
 * @param {Object} options - Hook options
 * @returns {Object} Search-specific tracking functions
 */
export const useSearchTracking = (options = {}) => {
  const tracking = useGA4Tracking(options);

  const trackSearchQuery = useCallback(
    (searchTerm, resultsCount = 0, additionalData = {}) => {
      tracking.trackSearchEvent(searchTerm, {
        results_count: resultsCount,
        ...additionalData,
      });
    },
    [tracking]
  );

  return {
    ...tracking,
    trackSearchQuery,
  };
};

/**
 * Hook for form tracking
 * @param {string} formName - Form identifier
 * @param {Object} options - Hook options
 * @returns {Object} Form-specific tracking functions
 */
export const useFormTracking = (formName, options = {}) => {
  const tracking = useGA4Tracking(options);

  const trackSubmit = useCallback(
    (additionalData = {}) => {
      tracking.trackForm(formName, additionalData);
    },
    [formName, tracking]
  );

  const trackFieldInteraction = useCallback(
    (fieldName, action = "focus", additionalData = {}) => {
      tracking.trackCustom("form_field_interaction", {
        form_name: formName,
        field_name: fieldName,
        action,
        ...additionalData,
      });
    },
    [formName, tracking]
  );

  return {
    ...tracking,
    trackSubmit,
    trackFieldInteraction,
    formName,
  };
};

// Default export
export default useGA4Tracking;
