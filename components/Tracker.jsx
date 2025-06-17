"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
// import Head from "next/head";
import Script from "next/script";

// Facebook Domain Verification
const facebookDomainVerification = () => (
  <Script id="facebook-domain-verification" strategy="afterInteractive">
    {`document.head.innerHTML += '<meta name="facebook-domain-verification" content="uvvbdeqdbj046v74x0oqaxhl9tyq26" />';`}
  </Script>
);

// Convert Experiences
const convertExperiencesTracker = () => (
  <Script
    id="convert-experiences-script"
    strategy="afterInteractive"
    src="//cdn-4.convertexperiments.com/v1/js/10045956-10046753.js?environment=production"
  />
);

// Facebook Pixel (Parameterized by ID)
const facebookPixelTracker = (pixelId) => (
  <Script id={`facebook-pixel-${pixelId}`} strategy="afterInteractive">
    {`!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');`}
  </Script>
);

// URL to Page Identifier Mapping
const urlToPageMap = {
  "/": "home",
  "/sex": "sex",
  "/hair": "hair",
  "/wl": "wl",
  "/mental-health": "mental-health",
  "/smoking-cessation": "smoking-cessation",
  "/smoking-consultation": "smoking-consultation",
  "/zonnic": "zonnic",
  "/reviews": "reviews",
  "/ed-products": "ed-products",
  "/hair-loss-products": "hair-loss-products",
  "/wl-products": "wl-products",
  "/dhm-blend": "dhm-blend",
  "/zonnic-product": "zonnic-product",
  "/ed": "ed",
  "/ed-prequiz": "ed-prequiz",
  "/blog": "blog",
  "/blog/[slug]": "single-blog", // Dynamic route for single blog
  "/ed-flow": "ed-flow",
  "/hair-flow": "hair-flow",
  "/how-it-works": "how-it-works",
  "/faqs": "faqs",
  "/product-faq": "product-faq",
  "/about-us": "about-us",
  "/podcast": "podcast",
  "/contact-us": "contact-us",
  "/terms-conditions": "terms-conditions",
  "/privacy-policy": "privacy-policy",
  "/service-across-canada": "service-across-canada",
  "/cart": "cart",
  "/checkout": "checkout",
  "/login-register": "login-register",
  "/wl-pre-consultation": "wl-pre-consultation",
  "/ed-pre-consultation": "ed-pre-consultation",
  "/bo2": "bo2",
  "/pre-ed1": "pre-ed1",
  "/pre-ed2": "pre-ed2",
  "/pre-ed3": "pre-ed3",
  "/pre-ed4": "pre-ed4",
  "/pre-ed5": "pre-ed5",
  "/pre-wl1": "pre-wl1",
  "/pre-wl2": "pre-wl2",
  "/pre-wl3": "pre-wl3",
  "/pre-wl4": "pre-wl4",
  "/order-received": "order-received",
};

// Mapping of pages to trackers
const pageTrackers = (page, searchParams) => {
  const trackers = [facebookDomainVerification(), convertExperiencesTracker()];

  if (
    [
      "blog",
      "single-blog",
      "ed-flow",
      "hair-flow",
      "how-it-works",
      "faqs",
      "product-faq",
      "about-us",
      "podcast",
      "contact-us",
      "terms-conditions",
      "privacy-policy",
      "service-across-canada",
      "cart",
      "checkout",
      "login",
      "register",
    ].includes(page)
  ) {
  }

  if (["pre-ed1", "pre-ed2", "pre-ed3", "pre-ed4", "pre-ed5"].includes(page)) {
    trackers.push(facebookPixelTracker("522677764108011"));
  }

  if (["pre-wl1", "pre-wl2", "pre-wl3", "pre-wl4"].includes(page)) {
    trackers.push(facebookPixelTracker("1451450365779499"));
  }

  return trackers;
};

// Main Tracker Component
const TrackerContent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Map pathname to page identifier
  const page = Object.keys(urlToPageMap).reduce((acc, key) => {
    // Handle dynamic routes (e.g., /blog/[slug])
    if (key.includes("[slug]")) {
      const basePath = key.split("[slug]")[0];

      if (pathname.startsWith(basePath)) {
        return urlToPageMap[key];
      }
    }
    return pathname === key || pathname === key + "/" ? urlToPageMap[key] : acc;
  }, "home"); // Default to 'home' if no match
  console.log("page", page);
  const trackers = pageTrackers(page, searchParams);

  return (
    <>
      {trackers.map((tracker, index) => (
        <React.Fragment key={index}>{tracker}</React.Fragment>
      ))}
    </>
  );
};
// Main Tracker Component with Suspense
const Tracker = () => {
  return (
    <Suspense fallback={null}>
      <TrackerContent />
    </Suspense>
  );
};
export default Tracker;
