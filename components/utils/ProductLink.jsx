"use client";

import { useCallback } from "react";
import Link from "next/link";

/**
 * Enhanced product link component that prefetches product data
 * This improves the user experience by starting data fetching early
 */
export default function ProductLink({
  href,
  children,
  className = "",
  prefetch = true,
  ...props
}) {
  // Function to prefetch product data when hovering over a link
  const prefetchProductData = useCallback(
    (slug) => {
      // Extract slug from href pattern /product/[slug]/
      if (!slug) {
        const match = href.match(/\/product\/([^/]+)/);
        if (match && match[1]) {
          slug = match[1];
        }
      }

      // Only prefetch if we have a valid slug and prefetching is enabled
      if (slug && prefetch) {
        // Start fetching the API data
        fetch(`/api/products/${slug}`, { priority: "high" }).catch(() => {}); // Silently handle errors in prefetch
      }
    },
    [href, prefetch]
  );

  return (
    <Link
      href={href}
      className={className}
      prefetch={true}
      onMouseEnter={() => {
        // Extract slug from href and prefetch data
        const match = href.match(/\/product\/([^/]+)/);
        if (match && match[1]) {
          prefetchProductData(match[1]);
        }
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
