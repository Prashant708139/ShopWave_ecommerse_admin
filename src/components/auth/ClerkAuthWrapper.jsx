import React from "react";
import { ClerkProvider } from "@clerk/clerk-react";

export const ClerkAuthWrapper = ({ publishableKey, children }) => {
  if (!publishableKey || !publishableKey.startsWith("pk_")) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>{children}</ClerkProvider>
  );
};
