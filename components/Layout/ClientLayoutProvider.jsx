"use client";

import LayoutDetector from "./LayoutDetector";
import BugHerdProvider from "./BugHerdProvider";

/**
 * ClientLayoutProvider serves as a client component wrapper
 * that can be imported into server components.
 * It includes client-side functionality like the LayoutDetector
 * without affecting server-side rendering.
 */
const ClientLayoutProvider = ({ children }) => {
  return (
    <BugHerdProvider>
      <LayoutDetector />
      {children}
    </BugHerdProvider>
  );
};

export default ClientLayoutProvider;
