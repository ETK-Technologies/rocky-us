"use client";

import { useVariationSelection } from "../hooks/useVariationSelection";
import { VARIATION_TYPES } from "@/lib/constants/productTypes";
import SubscriptionOptions from "./SubscriptionOptions";
import FrequencyOptions from "./FrequencyOptions";
import QuantityOptions from "./QuantityOptions";

/**
 * VariationSelector Component
 * Main component for handling all product variation types
 */
const VariationSelector = ({
  type,
  variations,
  onVariationChange,
  productType,
}) => {
  // Use our custom hook for variation selection logic
  const {
    selectedSubscription,
    selectedFrequency,
    selectedQuantity,
    handleSubscriptionSelect,
    handleFrequencySelect,
    handleQuantitySelect,
  } = useVariationSelection(variations, type, onVariationChange);

  // Render appropriate component based on variation type
  switch (type) {
    case VARIATION_TYPES.SUBSCRIPTION:
      return (
        <SubscriptionOptions
          options={variations}
          selectedOption={selectedSubscription}
          onSelect={handleSubscriptionSelect}
        />
      );

    case VARIATION_TYPES.FREQUENCY:
      return (
        <div className="space-y-6">
          {variations?.frequency && (
            <FrequencyOptions
              options={variations.frequency}
              selectedValue={selectedFrequency?.value}
              onSelect={handleFrequencySelect}
            />
          )}

          {selectedFrequency &&
            variations?.quantities &&
            variations.quantities[selectedFrequency.value] && (
              <QuantityOptions
                options={variations.quantities[selectedFrequency.value]}
                selectedOption={selectedQuantity}
                onSelect={handleQuantitySelect}
              />
            )}
        </div>
      );

    case VARIATION_TYPES.QUANTITY:
      return (
        <div className="space-y-6">
          {variations?.frequency && (
            <FrequencyOptions
              options={variations.frequency}
              selectedValue={selectedFrequency?.value}
              onSelect={handleFrequencySelect}
            />
          )}

          {selectedFrequency &&
            variations?.quantities &&
            variations.quantities[selectedFrequency.value] && (
              <QuantityOptions
                options={variations.quantities[selectedFrequency.value]}
                selectedOption={selectedQuantity}
                onSelect={handleQuantitySelect}
              />
            )}
        </div>
      );

    default:
      return null;
  }
};

export default VariationSelector;
