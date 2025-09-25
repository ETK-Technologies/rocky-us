"use client";

import { useState, useEffect, useCallback } from "react";
import { logger } from "@/utils/devLogger";
import { blogService } from "../services/blogService";

export const useBlogData = (initialBlogs = [], initialTotalPages = 1) => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMoreBlogs = useCallback(async (page, categoryId = null) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await blogService.getBlogs(page, categoryId);

      if (page === 1) {
        // First page - replace all blogs
        setBlogs(result.blogs);
      } else {
        // Subsequent pages - append blogs
        setBlogs((prev) => [...prev, ...result.blogs]);
      }

      setTotalPages(result.totalPages);
      return result;
    } catch (err) {
      setError(err.message);
      logger.error("Error loading more blogs:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshBlogs = useCallback(
    async (categoryId = null) => {
      await loadMoreBlogs(1, categoryId);
    },
    [loadMoreBlogs]
  );

  // Initialize with server-side data
  useEffect(() => {
    setBlogs(initialBlogs);
    setTotalPages(initialTotalPages);
  }, [initialBlogs, initialTotalPages]);

  return {
    blogs,
    totalPages,
    isLoading,
    error,
    loadMoreBlogs,
    refreshBlogs,
  };
};
