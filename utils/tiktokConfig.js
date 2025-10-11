/**
 * TikTok Configuration
 * Configure your TikTok Pixel ID here
 */

// Replace 'YOUR_PIXEL_ID' with your actual TikTok Pixel ID
export const TIKTOK_PIXEL_ID =
  process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || "CAFVBSRC77U9MLGRGE10";

// TikTok tracking configuration
export const TIKTOK_CONFIG = {
  pixelId: TIKTOK_PIXEL_ID,
  debug: process.env.NODE_ENV === "development",
  enabled: true, // Set to false to disable TikTok tracking
};

// Export individual config values for convenience
export const { pixelId, debug, enabled } = TIKTOK_CONFIG;
