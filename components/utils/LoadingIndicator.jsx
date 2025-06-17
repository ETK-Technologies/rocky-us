"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const LoadingIndicatorContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let loadingTimeoutId;
    let showIndicatorTimeoutId;

    // Start loading when route changes
    setIsLoading(true);

    // Only show the indicator if loading takes longer than 80ms
    // This prevents flashing the indicator for quick product page loads
    showIndicatorTimeoutId = setTimeout(() => {
      if (isLoading) {
        setShowIndicator(true);
      }
    }, 80);

    // Use a shorter timeout to make navigation feel more responsive
    loadingTimeoutId = setTimeout(() => {
      setIsLoading(false);
      setShowIndicator(false);
    }, 100);

    return () => {
      clearTimeout(loadingTimeoutId);
      clearTimeout(showIndicatorTimeoutId);
    };
  }, [pathname, searchParams]);

  if (!showIndicator) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div className="h-full bg-blue-600 animate-loading"></div>
    </div>
  );
};

const LoadingIndicator = () => {
  return (
    <div suppressHydrationWarning>
      <Suspense fallback={null}>
        <LoadingIndicatorContent />
      </Suspense>
    </div>
  );
};

export default LoadingIndicator;
