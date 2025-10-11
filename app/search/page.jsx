"use client";

import { useEffect, useState, useMemo, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchLoading from "@/components/Search/SearchLoading";
import SearchResult from "@/components/Search/SearchResult";
import Error from "@/components/Search/Error";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSearchResults = useCallback(async () => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.success) {
        // Filter out unwanted products (same logic as SearchIcon.jsx)
        const filtered = (data.data || []).filter((item) => {
          const isProduct =
            item.subtype === "product" || item.object_type === "product";
          const isPublished = item.status === "publish";
          const isVisible = item.catalog_visibility === "visible";
          const notTestCopy = !item.name?.toLowerCase().includes("copy");

          // For products, apply all filters
          if (isProduct) {
            return isPublished && isVisible && notTestCopy;
          }

          // For non-products (posts, pages), just check if they exist
          return true;
        });

        setResults(filtered);
      } else {
        setError(data.error || "An error occurred while searching");
      }
    } catch (error) {
      setError("Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  if (loading) {
    return <SearchLoading />;
  }

  if (error) {
    return <Error action={fetchSearchResults} error={error} />;
  }

  return <SearchResult query={query} results={results} />;
}

function LoadingFallback() {
  return <SearchLoading />;
}

export default function SearchResults() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SearchResultsContent />
    </Suspense>
  );
}
