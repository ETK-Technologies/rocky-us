import { useEffect, useState } from "react";
import { checkApplePayAvailability } from "@/lib/constants/applePay";

const ApplePayDebug = () => {
  const [debugInfo, setDebugInfo] = useState({
    windowDefined: false,
    applePaySessionDefined: false,
    canMakePayments: false,
    canMakePaymentsWithActiveCard: false,
    paysafeDefined: false,
    environment: "TEST", // Default to test environment
    accountId: "checking...",
    apiKeyStatus: "not checked",
  });

  useEffect(() => {
    const checkDebugInfo = async () => {
      // Check basic availability
      const basicInfo = {
        windowDefined: typeof window !== "undefined",
        applePaySessionDefined:
          typeof window !== "undefined" && !!window.ApplePaySession,
        canMakePayments:
          typeof window !== "undefined" && window.ApplePaySession
            ? ApplePaySession.canMakePayments()
            : false,
        canMakePaymentsWithActiveCard:
          typeof window !== "undefined" && window.ApplePaySession
            ? ApplePaySession.canMakePaymentsWithActiveCard()
            : false,
        paysafeDefined: typeof window !== "undefined" && !!window.paysafe,
        environment: "TEST", // Default to test environment
        accountId: "checking...",
        apiKeyStatus: "checking...",
      };

      setDebugInfo(basicInfo);

      // Check API key endpoint
      try {
        const response = await fetch("/api/paysafe/api-key");
        const data = await response.json();

        const info = {
          ...basicInfo,
          accountId: data.success ? data.accountId || "not set" : "API error",
          apiKeyStatus: data.success ? "✅ Working" : "❌ Failed",
        };

        setDebugInfo(info);
        console.log("Apple Pay Debug Info:", info);
      } catch (error) {
        const info = {
          ...basicInfo,
          accountId: "API error",
          apiKeyStatus: "❌ Network error",
        };
        setDebugInfo(info);
        console.log("Apple Pay Debug Info:", info);
      }
    };

    // Check immediately and after a delay
    checkDebugInfo();
    const timer = setTimeout(checkDebugInfo, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <h3 className="text-sm font-semibold text-yellow-800 mb-2">
        Apple Pay Debug Info
      </h3>
      <div className="text-xs space-y-1">
        <div>Window defined: {debugInfo.windowDefined ? "✅" : "❌"}</div>
        <div>
          ApplePaySession defined:{" "}
          {debugInfo.applePaySessionDefined ? "✅" : "❌"}
        </div>
        <div>Can make payments: {debugInfo.canMakePayments ? "✅" : "❌"}</div>
        <div>
          Can make payments with active card:{" "}
          {debugInfo.canMakePaymentsWithActiveCard ? "✅" : "❌"}
        </div>
        <div>Paysafe.js defined: {debugInfo.paysafeDefined ? "✅" : "❌"}</div>
        <div>Environment: {debugInfo.environment}</div>
        <div>Account ID: {debugInfo.accountId}</div>
        <div>API Key Status: {debugInfo.apiKeyStatus}</div>
      </div>
    </div>
  );
};

export default ApplePayDebug;
