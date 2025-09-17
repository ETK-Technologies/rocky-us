/**
 * Secure Logger Utility
 * Provides controlled logging that only shows in development mode
 * and can be easily configured for different environments
 */

import { loggerConfig } from "../config/logger.js";
import { LOG_LEVELS } from "../constants/log-levels.js";

class SecureLogger {
  constructor(config = {}) {
    this.config = { ...loggerConfig, ...config };
    this.isEnabled = this.config.isDevelopment && this.config.enableConsole;
  }

  /**
   * Redact sensitive information from log data
   */
  redactSensitiveData(data) {
    if (typeof data === "string") {
      return this.config.sensitivePatterns.reduce((str, pattern) => {
        return str.replace(pattern, "[REDACTED]");
      }, data);
    }

    if (typeof data === "object" && data !== null) {
      const redacted = { ...data };

      // Redact sensitive keys
      Object.keys(redacted).forEach((key) => {
        if (
          this.config.sensitivePatterns.some((pattern) => pattern.test(key))
        ) {
          redacted[key] = "[REDACTED]";
        } else if (typeof redacted[key] === "object") {
          redacted[key] = this.redactSensitiveData(redacted[key]);
        }
      });

      return redacted;
    }

    return data;
  }

  /**
   * Format log message with timestamp and caller info
   */
  formatMessage(level, message, data = null) {
    const parts = [];

    // Add timestamp
    if (this.config.enableTimestamp) {
      parts.push(`[${new Date().toISOString()}]`);
    }

    // Add level prefix
    parts.push(this.config.prefix[level] || level.toUpperCase());

    // Add message
    parts.push(message);

    return parts.join(" ");
  }

  /**
   * Check if logging is enabled for this level
   */
  shouldLog(level) {
    return (
      this.isEnabled && LOG_LEVELS[level.toUpperCase()] <= this.config.level
    );
  }

  /**
   * Core logging method
   */
  log(level, message, data = null) {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, message);

    // Redact sensitive data
    const safeData = data ? this.redactSensitiveData(data) : null;

    // Use appropriate console method
    const consoleMethod =
      level === "error"
        ? console.error
        : level === "warn"
        ? console.warn
        : console.log;

    if (safeData) {
      consoleMethod(formattedMessage, safeData);
    } else {
      consoleMethod(formattedMessage);
    }
  }

  /**
   * Error logging
   */
  error(message, data = null) {
    this.log("error", message, data);
  }

  /**
   * Warning logging
   */
  warn(message, data = null) {
    this.log("warn", message, data);
  }

  /**
   * Info logging
   */
  info(message, data = null) {
    this.log("info", message, data);
  }

  /**
   * Debug logging
   */
  debug(message, data = null) {
    this.log("debug", message, data);
  }

  /**
   * Trace logging (most verbose)
   */
  trace(message, data = null) {
    this.log("trace", message, data);
  }

  /**
   * Payment-specific logging with additional security
   */
  payment(message, data = null) {
    if (!this.shouldLog("debug")) return;

    // Extra redaction for payment data
    const paymentSafeData = data ? this.redactPaymentData(data) : null;
    this.log("debug", `💳 PAYMENT: ${message}`, paymentSafeData);
  }

  /**
   * API-specific logging
   */
  api(message, data = null) {
    if (!this.shouldLog("debug")) return;

    this.log("debug", `🌐 API: ${message}`, data);
  }

  /**
   * Order-specific logging
   */
  order(message, data = null) {
    if (!this.shouldLog("debug")) return;

    this.log("debug", `📦 ORDER: ${message}`, data);
  }

  /**
   * Extra redaction for payment data
   */
  redactPaymentData(data) {
    if (typeof data === "object" && data !== null) {
      const redacted = { ...data };

      // Redact common payment fields
      const paymentFields = [
        "cardNumber",
        "card_number",
        "number",
        "cvv",
        "cvc",
        "cardCVD",
        "card_cvc",
        "expiry",
        "exp_month",
        "exp_year",
        "client_secret",
        "payment_token",
        "stripe_secret",
        "api_key",
      ];

      paymentFields.forEach((field) => {
        if (redacted[field]) {
          redacted[field] = "[REDACTED]";
        }
      });

      return redacted;
    }

    return data;
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.isEnabled = this.config.isDevelopment && this.config.enableConsole;
  }

  /**
   * Enable/disable logging
   */
  setEnabled(enabled) {
    this.isEnabled = enabled && this.config.isDevelopment;
  }

  /**
   * Set log level
   */
  setLevel(level) {
    this.config.level =
      typeof level === "string" ? LOG_LEVELS[level.toUpperCase()] : level;
  }
}

// Create default logger instance
const logger = new SecureLogger();

// Export both the class and the instance
export default logger;
export { SecureLogger, LOG_LEVELS };

// Convenience exports for common use cases
export const log = logger;
export const logError = logger.error.bind(logger);
export const logWarn = logger.warn.bind(logger);
export const logInfo = logger.info.bind(logger);
export const logDebug = logger.debug.bind(logger);
export const logTrace = logger.trace.bind(logger);
export const logPayment = logger.payment.bind(logger);
export const logApi = logger.api.bind(logger);
export const logOrder = logger.order.bind(logger);
