"use client";
import { Suspense } from "react";
import FlowCallBack from "@/components/Flows/FlowCallBack";

import EdProducts from "@/components/convert_test/EDPlans/EdProducts";
import EdFaqs from "@/components/Flows/EdFaqs";
import { useSearchParams } from "next/navigation";

// Client wrapper: useSearchParams must be used inside a client component
function EdSimpleFlowClient() {
  const searchParams = useSearchParams();
  const showonly = searchParams.get("showonly");

  return (
    <>
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
    </>
  );
}

// Server component page: wrap the client child in Suspense so
// useSearchParams runs under a Suspense boundary during rendering
const EdSimpleFlowPage = () => {
  return (
    <Suspense
      fallback={
        <FlowCallBack className="ed-flow" LoadingText="Loading ED Flow..." />
      }
    >
      <EdSimpleFlowClient />
    </Suspense>
  );
};

export default EdSimpleFlowPage;
