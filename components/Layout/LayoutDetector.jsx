"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { shouldUseMinimalLayout } from "@/utils/layoutConfig";

/**
 * The LayoutDetector component handles dynamic layout changes
 * based on client-side navigation. It updates the DOM directly
 * to show or hide header/footer elements when navigating between
 * minimal and full layout pages.
 */
const LayoutDetector = () => {
  const pathname = usePathname();
  const [isMinimalLayout, setIsMinimalLayout] = useState(false);

  useEffect(() => {
    if (!pathname) return;

    // Normalize the path to match server-side processing
    // Remove query parameters and trailing slashes for consistent matching
    const normalizedPath = pathname.split("?")[0].replace(/\/$/, "");

    // Determine if current path should use minimal layout
    const shouldBeMinimal = shouldUseMinimalLayout(normalizedPath);
    setIsMinimalLayout(shouldBeMinimal);

    // Get header and footer elements with more reliable selectors
    const navbarElement = document.querySelector("header.navbar-main");
    const footerElement = document.querySelector("footer.footer-main");

    // Get the section under the footer (LegitScript section)
    const footerUnderElement = document.querySelector(
      ".bg-white.flex.justify-between.items-center.p-4"
    );

    // Use a small delay to ensure DOM is ready
    setTimeout(() => {
      if (navbarElement) {
        // Use classList instead of style for better CSS integration
        if (shouldBeMinimal) {
          navbarElement.classList.add("layout-hidden");
          navbarElement.style.display = "none";
        } else {
          navbarElement.classList.remove("layout-hidden");
          navbarElement.style.display = "";
        }
      }

      if (footerElement) {
        if (shouldBeMinimal) {
          footerElement.classList.add("layout-hidden");
          footerElement.style.display = "none";
        } else {
          footerElement.classList.remove("layout-hidden");
          footerElement.style.display = "";
        }
      }

      // Also hide/show the part under the footer
      if (footerUnderElement) {
        if (shouldBeMinimal) {
          footerUnderElement.classList.add("layout-hidden");
          footerUnderElement.style.display = "none";
        } else {
          footerUnderElement.classList.remove("layout-hidden");
          footerUnderElement.style.display = "";
        }
      }

      // Update body data attribute for CSS targeting
      document.body.setAttribute(
        "data-layout",
        shouldBeMinimal ? "minimal" : "full"
      );

      // For debugging - uncomment if needed
      // console.log(`Client path: ${normalizedPath}, Minimal Layout: ${shouldBeMinimal}`);
    }, 10);
  }, [pathname]); // Re-run effect when pathname changes

  return null; // This component doesn't render anything visible
};

export default LayoutDetector;
