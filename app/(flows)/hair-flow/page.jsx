"use client";

import { Suspense } from "react";
import FlowCallBack from "@/components/Flows/FlowCallBack";
import FlowContent from "@/components/Flows/FlowContent";


// Main page component with Suspense boundary
const HairFlowPage = () => {
  return (
    <Suspense fallback={<FlowCallBack className="hair-flow" LoadingText="Loading Hair Flow..." />}>
      <FlowContent flowType="Hair" />
    </Suspense>
  );
};

export default HairFlowPage;
