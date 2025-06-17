"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  // Debounce search value
  useEffect(() => {
    // Don't trigger search if less than 3 characters
    if (searchValue.trim().length < 3) {
      setDebouncedValue("");
      setIsSearching(false);
      return;
    }

    // Set searching state immediately when user types
    setIsSearching(true);
    
    // Debounce the search value
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Original search function (for navigation to search page)
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue)}`);
      setSearchValue("");
    }
  };

  // Function to highlight text in a string
  const highlightText = useCallback((text, searchTerm) => {
    if (!searchTerm || searchTerm.trim().length < 3) return text;
    
    // For HTML content, we need to be careful not to break HTML tags
    // This is a simple implementation - for complex HTML you might need a parser
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  }, []);

  return {
    searchValue,
    setSearchValue,
    debouncedValue,
    isSearching,
    handleSearch,
    highlightText
  };
}
