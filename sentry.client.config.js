// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://4f1390261714882c0586201abae2f749@o4510144815366144.ingest.us.sentry.io/4510144820543488",

  // Add optional integrations for additional features
  integrations: [
    Sentry.replayIntegration({
      // NOTE: This will disable built-in masking. Only use this if your site has no sensitive data, or if you've already set up other options for masking or blocking relevant data, such as 'ignore', 'block', 'mask' and 'maskFn'.
      maskAllText: false,
      blockAllMedia: false,
      maskAllInputs: false,
      maskAllTextareas: false,
      maskAllSelects: false,
      maskAllCheckboxes: false,
      maskAllRadios: false,
      maskAllFiles: false,
      maskAllPasswords: false,
      maskAllEmails: false,
    }),
    // Browser tracing for performance monitoring
    Sentry.browserTracingIntegration(),
    // Browser profiling for detailed performance analysis
    Sentry.browserProfilingIntegration(),
    // send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1.0, // Capture 100% of the transactions

  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  // ⚠️ IMPORTANT: Exclude i.myrocky.ca (Northbeam) to prevent CORS errors with sentry-trace and baggage headers
  tracePropagationTargets: [
    "localhost",
    /^https?:\/\/(www\.)?myrocky\.ca/,
    /^https?:\/\/api\.myrocky\.ca/,
    // Add other Rocky subdomains as needed, but NOT i.myrocky.ca (Northbeam)
  ],

  // Set profilesSampleRate to 1.0 to profile every transaction.
  // Since profilesSampleRate is relative to tracesSampleRate,
  // the final profiling rate can be computed as tracesSampleRate * profilesSampleRate
  // For example, a tracesSampleRate of 0.5 and profilesSampleRate of 0.5 would
  // results in 25% of transactions being profiled (0.5*0.5=0.25)
  profilesSampleRate: 1.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
