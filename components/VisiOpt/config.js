/**
 * Configuration options for VisiOpt integration
 */
export const VisiOptConfig = {
  debug: true, // Set to false to disable console logs in production
  baseUrl: "https://visiopt.com/client/js_test/test", // Base URL for VisiOpt scripts
  defaultWid: 937, // Default website ID
  defaultFlickerTime: 0, // Reduced flicker time to 100ms for minimal flash
  defaultFlickerElement: "html", // Default flicker element
};
