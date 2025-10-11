"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { logger } from "@/utils/devLogger";

// Create a context to make BugHerd user data available throughout the app
export const BugHerdContext = createContext(null);

// Hook to use the BugHerd context
export const useBugHerd = () => useContext(BugHerdContext);

export default function BugHerdProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // BugHerd provider temporarily disabled
    // Uncomment the code below to re-enable BugHerd user data fetching

    /*
    // Fetch BugHerd user data when component mounts
    fetch("/api/bugherd-user")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch BugHerd data");
        return res.json();
      })
      .then((data) => {
        setUser(data.data);
        setLoading(false);
      })
      .catch((err) => {
        logger.error("BugHerd API error:", err);
        setError(err);
        setLoading(false);
      });
    */

    // Set loading to false immediately since we're not fetching data
    setLoading(false);
  }, []);

  // Value to be provided to consumers of this context
  const value = {
    user,
    loading,
    error,
  };

  return (
    <BugHerdContext.Provider value={value}>{children}</BugHerdContext.Provider>
  );
}
