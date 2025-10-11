"use client";

import { Suspense } from "react";
import FlowCallBack from "@/components/Flows/FlowCallBack";
import FlowContent from "@/components/Flows/FlowContent";


// Main page component with Suspense boundary
const EdFlowPage = () => {
  return (
    <Suspense fallback={<FlowCallBack className="ed-flow" LoadingText="Loading ED Flow..." />}>
      <FlowContent flowType="ED" />
    </Suspense>
  );
};

export default EdFlowPage;
