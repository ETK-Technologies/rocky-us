"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function LoadingBarContent() {
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let timeoutId;
    let delayLoaderTimeout;

    // Start loading when route changes
    setLoading(true);

    // Only show the loading overlay if the transition takes longer than 150ms
    // This prevents showing the loader for quick navigations to product pages
    delayLoaderTimeout = setTimeout(() => {
      if (loading) {
        setShowLoader(true);
      }
    }, 150);

    // Hide the loading overlay after a minimal delay
    timeoutId = setTimeout(() => {
      setLoading(false);
      setShowLoader(false);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(delayLoaderTimeout);
    };
  }, [pathname, searchParams]);

  if (!showLoader) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
    </div>
  );
}

export default function LoadingOverlay() {
  return (
    <div suppressHydrationWarning>
      <Suspense fallback={null}>
        <LoadingBarContent />
      </Suspense>
    </div>
  );
}
