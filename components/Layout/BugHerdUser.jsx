"use client";

import { useBugHerd } from './BugHerdProvider';

/**
 * Example component that uses the BugHerd user data
 * This can be used anywhere in the application to display
 * or use the BugHerd user information
 */
export default function BugHerdUser() {
  const { user, loading, error } = useBugHerd();

  if (loading) {
    return <div className="text-sm">Loading BugHerd user...</div>;
  }

  if (error) {
    return null; // Fail silently
  }

  if (!user) {
    return null; // No user data available
  }

  return (
    <div className="text-sm flex items-center">
      <span>Welcome, {user.name}</span>
    </div>
  );
} 