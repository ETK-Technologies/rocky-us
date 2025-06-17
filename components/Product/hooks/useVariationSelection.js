"use client";

import { useState, useEffect, useCallback } from "react";
import { VARIATION_TYPES } from "@/lib/constants/productTypes";

/**
 * Custom hook to handle variation selection logic
 *
 * @param {Array|Object} variations - The variations data
 * @param {string} variationType - The variation type (SUBSCRIPTION, QUANTITY, FREQUENCY)
 * @param {Function} onVariationChange - Callback when selection changes
 * @returns {Object} Selection state and handlers
 */
export function useVariationSelection(
  variations,
  variationType,
  onVariationChange
) {
  // State for different variation types
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [selectedFrequency, setSelectedFrequency] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);

  // Helper function to sort quantities
  const sortQuantities = useCallback((quantities) => {
    if (!quantities || !Array.isArray(quantities)) return [];

    return [...quantities].sort((a, b) => {
      // Extract number from label (e.g., "4 pills" -> 4)
      const aMatch = a.label.match(/^(\d+)/);
      const bMatch = b.label.match(/^(\d+)/);

      const aNum = aMatch ? parseInt(aMatch[1]) : 0;
      const bNum = bMatch ? parseInt(bMatch[1]) : 0;
      return aNum - bNum; // Ascending order
    });
  }, []);

  // Initialize selections when variations change
  useEffect(() => {
    if (!variations) return;

    // Initialize based on variation type
    switch (variationType) {
      case VARIATION_TYPES.SUBSCRIPTION:
        if (Array.isArray(variations) && variations.length > 0) {
          setSelectedSubscription(variations[0]);

          // Notify parent of initial selection
          if (onVariationChange && typeof onVariationChange === "function") {
            onVariationChange({ subscription: variations[0] });
          }
        }
        break;

      case VARIATION_TYPES.QUANTITY:
        if (variations?.frequency && variations.frequency.length > 0) {
          const firstFreq = variations.frequency[0];
          setSelectedFrequency(firstFreq);

          if (
            variations.quantities &&
            variations.quantities[firstFreq.value]?.length > 0
          ) {
            // Sort quantities and select the first one (lowest)
            const sortedQuantities = sortQuantities(
              variations.quantities[firstFreq.value]
            );
            setSelectedQuantity(sortedQuantities[0]);

            // Notify parent of initial selection
            if (onVariationChange && typeof onVariationChange === "function") {
              onVariationChange({
                frequency: firstFreq,
                quantity: sortedQuantities[0],
              });
            }
          }
        }
        break;

      case VARIATION_TYPES.FREQUENCY:
        if (variations?.frequency && variations.frequency.length > 0) {
          const firstFreq = variations.frequency[0];
          setSelectedFrequency(firstFreq);

          if (
            variations.quantities &&
            variations.quantities[firstFreq.value]?.length > 0
          ) {
            // Sort quantities and select the first one (lowest)
            const sortedQuantities = sortQuantities(
              variations.quantities[firstFreq.value]
            );
            setSelectedQuantity(sortedQuantities[0]);

            // Notify parent of initial selection
            if (onVariationChange && typeof onVariationChange === "function") {
              onVariationChange({
                frequency: firstFreq,
                quantity: sortedQuantities[0],
              });
            }
          }
        }
        break;
    }
  }, [variations, variationType, sortQuantities, onVariationChange]);

  // Handler for subscription selection
  const handleSubscriptionSelect = useCallback(
    (subscription) => {
      if (!subscription) return;

      setSelectedSubscription(subscription);

      // Notify parent
      if (onVariationChange && typeof onVariationChange === "function") {
        onVariationChange({ subscription });
      }
    },
    [onVariationChange]
  );

  // Handler for frequency selection
  const handleFrequencySelect = useCallback(
    (frequency) => {
      if (!frequency) return;

      setSelectedFrequency(frequency);

      // Reset quantity when frequency changes
      if (
        variations?.quantities &&
        variations.quantities[frequency.value]?.length > 0
      ) {
        // Sort quantities and select the first one (lowest)
        const sortedQuantities = sortQuantities(
          variations.quantities[frequency.value]
        );
        setSelectedQuantity(sortedQuantities[0]);

        // Notify parent
        if (onVariationChange && typeof onVariationChange === "function") {
          onVariationChange({
            frequency,
            quantity: sortedQuantities[0],
          });
        }
      } else {
        setSelectedQuantity(null);

        // Notify parent of frequency change only
        if (onVariationChange && typeof onVariationChange === "function") {
          onVariationChange({ frequency });
        }
      }
    },
    [variations, sortQuantities, onVariationChange]
  );

  // Handler for quantity selection
  const handleQuantitySelect = useCallback(
    (quantity) => {
      if (!quantity) return;

      setSelectedQuantity(quantity);

      // Notify parent
      if (onVariationChange && typeof onVariationChange === "function") {
        onVariationChange({
          frequency: selectedFrequency,
          quantity,
        });
      }
    },
    [selectedFrequency, onVariationChange]
  );

  return {
    // Selection state
    selectedSubscription,
    selectedFrequency,
    selectedQuantity,

    // Selection handlers
    handleSubscriptionSelect,
    handleFrequencySelect,
    handleQuantitySelect,

    // Helper methods
    sortQuantities,
  };
}

export default useVariationSelection;
