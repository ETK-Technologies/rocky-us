/**
 * Structured Logger
 * Provides consistent logging throughout the application
 */

// Set to true for development, false for production
const LOGGING_ENABLED = process.env.NODE_ENV === "development";

/**
 * Logger class for structured logging
 */
export class Logger {
  constructor(enabled = LOGGING_ENABLED) {
    this.enabled = enabled;
  }

  /**
   * Enable or disable logging
   * @param {boolean} isEnabled - Whether logging should be enabled
   */
  setEnabled(isEnabled) {
    this.enabled = !!isEnabled;
  }

  /**
   * Base log method
   * @param {string} category - Category for this log message
   * @param {string} action - The action or event being logged
   * @param {any} data - Optional data to include in the log
   */
  log(category, action, data) {
    if (!this.enabled) return;

    const timestamp = new Date().toISOString();
    const prefix = `[${category}] ${action}`;

    if (data !== undefined) {
      console.log(prefix, data);
    } else {
      console.log(prefix);
    }
  }

  /**
   * Log WooCommerce API related messages
   * @param {string} action - The action being performed
   * @param {any} data - Optional data to include
   */
  woocommerce(action, data) {
    this.log("WooCommerce", action, data);
  }

  /**
   * Log product-related messages
   * @param {string} action - The action being performed
   * @param {any} data - Optional data to include
   */
  product(action, data) {
    this.log("Product", action, data);
  }

  /**
   * Log variation-related messages
   * @param {string} action - The action being performed
   * @param {any} data - Optional data to include
   */
  variations(action, data) {
    this.log("Variations", action, data);
  }

  /**
   * Log category-related messages
   * @param {string} action - The action being performed
   * @param {any} data - Optional data to include
   */
  category(action, data) {
    this.log("Category", action, data);
  }

  /**
   * Log cart-related messages
   * @param {string} action - The action being performed
   * @param {any} data - Optional data to include
   */
  cart(action, data) {
    this.log("Cart", action, data);
  }

  /**
   * Log error messages
   * @param {string} action - The action that caused the error
   * @param {Error|string} error - The error that occurred
   */
  error(action, error) {
    if (!this.enabled) return;

    const prefix = `[Error] ${action}:`;
    console.error(prefix, error);
  }
}

// Create and export default logger instance
const logger = new Logger();
export default logger;
