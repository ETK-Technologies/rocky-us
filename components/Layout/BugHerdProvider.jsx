"use client";

import { useEffect, useState, createContext, useContext } from 'react';

// Create a context to make BugHerd user data available throughout the app
export const BugHerdContext = createContext(null);

// Hook to use the BugHerd context
export const useBugHerd = () => useContext(BugHerdContext);

export default function BugHerdProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch BugHerd user data when component mounts
    fetch('https://myrocky.ca/wp-json/custom/v1/bugherd-user')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch BugHerd data");
        return res.json();
      })
      .then(data => {
        setUser(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("BugHerd API error:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // Value to be provided to consumers of this context
  const value = {
    user,
    loading,
    error
  };

  return (
    <BugHerdContext.Provider value={value}>
      {children}
    </BugHerdContext.Provider>
  );
} 