"use client";

import Script from "next/script";

export default function RockoAIWidget() {
  return (
    <>
      {/* Load Rocko AI Widget script */}
      <Script
        id="rocko-ai-widget"
        strategy="lazyOnload"
        src="https://beta.leadconnectorhq.com/loader.js"
        data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="69037799d6df2aaeafb248f1"
      />
    </>
  );
}
