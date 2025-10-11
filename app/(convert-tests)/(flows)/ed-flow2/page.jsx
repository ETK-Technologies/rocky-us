"use client";

import EdProducts from "@/components/convert_test/Flows/EdFlow/V2/EdProducts";
import EdFaqs from "@/components/Flows/EdFaqs";
import FlowCallBack from "@/components/Flows/FlowCallBack";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function EdFlowV2Content() {
  const searchParams = useSearchParams();
  const showonly = searchParams.get("showonly");
  return (
    <div className="ed-flow flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow bg-white">
        <div className="max-w-[1184px] mx-auto px-5 py-10">
          {/* ED Products Section - Pass the filter parameter */}
          <EdProducts showonly={showonly} />

          {/* FAQs Section */}
          <EdFaqs />
        </div>
      </main>

      {/* No footer as requested */}
    </div>
  );
}

export default function EdFlowV2() {
  return (
    <Suspense fallback={<FlowCallBack className="ed-flow" LoadingText="Loading ED Flow..." />}>
      <EdFlowV2Content />
    </Suspense>
  );
}
