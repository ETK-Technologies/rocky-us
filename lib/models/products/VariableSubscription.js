/**
 * Variable Subscription Product Model
 * Represents a WooCommerce variable subscription product
 */
import VariableProduct from "./VariableProduct";

export class VariableSubscription extends VariableProduct {
  constructor(productData) {
    super(productData);
    this.type = "variable-subscription";
  }

  /**
   * Get subscription details
   * @returns {Array} Subscription details
   */
  getSubscriptionOptions() {
    return this.data.subscriptions || [];
  }

  /**
   * Check if product has subscription options
   * @returns {boolean} True if product has subscription options
   */
  hasSubscriptions() {
    const options = this.getSubscriptionOptions();
    return Array.isArray(options) && options.length > 0;
  }

  /**
   * Get subscription periods (e.g., month, year)
   * @returns {Array} Subscription periods
   */
  getSubscriptionPeriods() {
    const options = this.getSubscriptionOptions();
    if (!options || !Array.isArray(options)) return [];

    return [...new Set(options.map((option) => option.period))];
  }

  /**
   * Get subscription intervals (e.g., 1, 3, 6)
   * @returns {Array} Subscription intervals
   */
  getSubscriptionIntervals() {
    const options = this.getSubscriptionOptions();
    if (!options || !Array.isArray(options)) return [];

    return [...new Set(options.map((option) => option.interval))];
  }

  /**
   * Format product data for display on product page
   * @returns {Object} Formatted product data
   */
  formatForDisplay() {
    const baseDisplayData = super.formatForDisplay();

    return {
      ...baseDisplayData,
      subscriptionOptions: this.getSubscriptionOptions(),
      subscriptionPeriods: this.getSubscriptionPeriods(),
      subscriptionIntervals: this.getSubscriptionIntervals(),
      hasSubscriptions: this.hasSubscriptions(),
    };
  }
}

export default VariableSubscription;
