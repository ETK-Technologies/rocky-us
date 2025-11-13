"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { logger } from "@/utils/devLogger";
import { getSessionId } from "@/services/sessionService";

const GoogleSignInButton = ({ onSuccess, onError, disabled, isLoading }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    if (disabled || isLoading) {
      return;
    }

    try {
      // Get sessionId from localStorage for guest cart merging
      const sessionId = getSessionId();

      // Build the OAuth initiation URL
      let oauthUrl = "/api/auth/google";
      
      // Add sessionId to URL if available
      if (sessionId) {
        oauthUrl += `?sessionId=${encodeURIComponent(sessionId)}`;
      }

      // Preserve redirect_to parameter if present
      const redirectTo = searchParams.get("redirect_to");
      if (redirectTo) {
        oauthUrl += sessionId ? "&" : "?";
        oauthUrl += `redirect_to=${encodeURIComponent(redirectTo)}`;
      }

      logger.log("Initiating Google OAuth:", oauthUrl);

      // Redirect to our OAuth initiation route
      // This will redirect to backend, which will redirect to Google,
      // and eventually come back to our callback route
      window.location.href = oauthUrl;
    } catch (error) {
      logger.error("Error initiating Google Sign-In:", error);
      if (onError) {
        onError();
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isLoading}
      className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-[12.5px] rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
    >
      {isLoading ? (
        <span>Signing in...</span>
      ) : (
        <>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.8055 10.2292C19.8055 9.55558 19.7501 8.9764 19.6393 8.37402H10.2002V11.845H15.6014C15.3761 13.0903 14.6569 14.1389 13.5487 14.8403V17.3542H16.8156C18.713 15.6806 19.8055 13.2014 19.8055 10.2292Z"
              fill="#4285F4"
            />
            <path
              d="M10.2002 19.8194C12.8535 19.8194 15.0763 18.9764 16.8156 17.3542L13.5487 14.8403C12.6158 15.4333 11.4444 15.7917 10.2002 15.7917C7.64206 15.7917 5.47559 14.1042 4.64731 11.7292H1.27148V14.3125C3.00761 17.6736 6.37037 19.8194 10.2002 19.8194Z"
              fill="#34A853"
            />
            <path
              d="M4.64731 11.7292C4.45177 11.1361 4.34095 10.5014 4.34095 9.84723C4.34095 9.19306 4.45177 8.55834 4.64731 7.96529V5.38196H1.27148C0.580966 6.73612 0.180664 8.24584 0.180664 9.84723C0.180664 11.4486 0.580966 12.9583 1.27148 14.3125L4.64731 11.7292Z"
              fill="#FBBC05"
            />
            <path
              d="M10.2002 3.90278C11.5573 3.90278 12.7704 4.36806 13.7283 5.27084L16.6322 2.4375C15.0763 1.03472 12.8535 0.180557 10.2002 0.180557C6.37037 0.180557 3.00761 2.32639 1.27148 5.68751L4.64731 8.27084C5.47559 5.89584 7.64206 3.90278 10.2002 3.90278Z"
              fill="#EA4335"
            />
          </svg>
          <span>Continue with Google</span>
        </>
      )}
    </button>
  );
};

export default GoogleSignInButton;
