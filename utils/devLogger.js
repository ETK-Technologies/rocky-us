/**
 * Development-only logger utility
 * Automatically filters out logs in production
 * Can be enabled in production with ?debug=true query parameter
 * Now integrated with Sentry for dual logging (console + Sentry)
 */

import * as Sentry from "@sentry/nextjs";

const isDevelopment = true; //process.env.NODE_ENV === "development";

// Check if debug mode is enabled via query parameter (client-side only)
const isDebugEnabled = () => {
  if (typeof window === "undefined") return false; // Server-side: no query params

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("debug") === "true" || urlParams.get("debug") === "1";
};

// Check if logging should be enabled
const shouldLog = () => {
  return isDevelopment || isDebugEnabled();
};

// Helper function to format arguments for Sentry
const formatArgsForSentry = (args) => {
  if (args.length === 0) return "";
  if (args.length === 1) return args[0];
  return args.join(" ");
};

export const logger = {
  log: (...args) => {
    if (shouldLog()) {
      console.log("[LOG]", ...args);
      // Also log to Sentry
      Sentry.logger.info(formatArgsForSentry(args), {
        log_source: "devLogger",
        level: "log",
      });
    }
  },

  error: (...args) => {
    if (shouldLog()) {
      console.error("[ERROR]", ...args);
      // Also log to Sentry
      Sentry.logger.error(formatArgsForSentry(args), {
        log_source: "devLogger",
        level: "error",
      });
    }
  },

  warn: (...args) => {
    if (shouldLog()) {
      console.warn("[WARN]", ...args);
      // Also log to Sentry
      Sentry.logger.warn(formatArgsForSentry(args), {
        log_source: "devLogger",
        level: "warn",
      });
    }
  },

  info: (...args) => {
    if (shouldLog()) {
      console.info("[INFO]", ...args);
      // Also log to Sentry
      Sentry.logger.info(formatArgsForSentry(args), {
        log_source: "devLogger",
        level: "info",
      });
    }
  },

  debug: (...args) => {
    if (shouldLog()) {
      console.log("[DEBUG]", ...args);
      // Also log to Sentry
      Sentry.logger.debug(formatArgsForSentry(args), {
        log_source: "devLogger",
        level: "debug",
      });
    }
  },
};

// Convenience functions
export const debug = logger.debug;
