"use client";

import { GoogleOAuthProvider as GoogleProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function GoogleOAuthProvider({ children }) {
  // If no Google Client ID is configured, render children without Google OAuth
  if (!GOOGLE_CLIENT_ID) {
    console.warn(
      "Google OAuth Client ID not configured. Google Sign-In will be unavailable."
    );
    return <>{children}</>;
  }

  return (
    <GoogleProvider clientId={GOOGLE_CLIENT_ID}>{children}</GoogleProvider>
  );
}
