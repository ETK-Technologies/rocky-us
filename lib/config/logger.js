/**
 * Logger Configuration
 * Centralized configuration for the secure logger utility
 */

import { LOG_LEVELS } from "../constants/log-levels.js";

// Environment-based configuration
const getEnvironmentConfig = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case "development":
      return {
        isDevelopment: true,
        level: LOG_LEVELS.DEBUG,
        enableConsole: true,
        enableTimestamp: true,
        enableCaller: false, // Can be expensive in development
      };

    case "test":
      return {
        isDevelopment: false,
        level: LOG_LEVELS.ERROR,
        enableConsole: false, // Disable console in tests
        enableTimestamp: false,
        enableCaller: false,
      };

    case "production":
    default:
      return {
        isDevelopment: false,
        level: LOG_LEVELS.ERROR,
        enableConsole: false, // Never log to console in production
        enableTimestamp: false,
        enableCaller: false,
      };
  }
};

// Custom configuration based on environment variables
const getCustomConfig = () => {
  const config = {};

  // Allow override via environment variables
  if (process.env.LOG_LEVEL) {
    config.level =
      LOG_LEVELS[process.env.LOG_LEVEL.toUpperCase()] || LOG_LEVELS.ERROR;
  }

  if (process.env.LOG_ENABLED !== undefined) {
    config.enableConsole = process.env.LOG_ENABLED === "true";
  }

  if (process.env.LOG_TIMESTAMP !== undefined) {
    config.enableTimestamp = process.env.LOG_TIMESTAMP === "true";
  }

  if (process.env.LOG_CALLER !== undefined) {
    config.enableCaller = process.env.LOG_CALLER === "true";
  }

  return config;
};

// Merge environment and custom configuration
export const loggerConfig = {
  ...getEnvironmentConfig(),
  ...getCustomConfig(),

  // Custom prefixes for different log types
  prefix: {
    error: "🔴 ERROR",
    warn: "🟡 WARN",
    info: "🔵 INFO",
    debug: "🟢 DEBUG",
    trace: "⚪ TRACE",
  },

  // Sensitive data patterns to redact
  sensitivePatterns: [
    /password/i,
    /secret/i,
    /token/i,
    /key/i,
    /auth/i,
    /credit.?card/i,
    /cvv/i,
    /cvc/i,
    /ssn/i,
    /social.?security/i,
    /api.?key/i,
    /private.?key/i,
    /client.?secret/i,
    /webhook.?secret/i,
  ],
};

// Export configuration for easy access
export default loggerConfig;
