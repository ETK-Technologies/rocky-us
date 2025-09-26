"use client";

import { useState, useEffect } from "react";
import { logger } from "@/utils/devLogger";
import BlogCard from "../../shared/BlogCard";
import BlogCardSkeleton from "../../components/BlogCardSkeleton";
import { blogService } from "../../services/blogService";

export default function BlogGrid({
  blogs = [],
  isLoading = false,
  className = "",
  categoryId,
  initialTotalPages = 1,
}) {
  const [allBlogs, setAllBlogs] = useState(blogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(initialTotalPages > 1);

  // Update blogs when prop changes
  useEffect(() => {
    setAllBlogs(blogs);
    setTotalPages(initialTotalPages);
    setHasMorePages(initialTotalPages > 1);
    setCurrentPage(1);
  }, [blogs, initialTotalPages]);

  const loadMoreBlogs = async () => {
    if (isLoadingMore || !hasMorePages) return;

    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const response = await blogService.getBlogs(nextPage, categoryId);

      if (response.blogs && response.blogs.length > 0) {
        setAllBlogs((prev) => [...prev, ...response.blogs]);
        setCurrentPage(nextPage);
        setHasMorePages(nextPage < response.totalPages);
      } else {
        setHasMorePages(false);
      }
    } catch (error) {
      logger.error("Error loading more blogs:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`${className}`}>
        {/* Featured article skeleton */}
        <div className="bg-white rounded-lg overflow-hidden  mb-8">
          <div className="md:flex">
            <div className="md:w-2/3 p-6">
              <BlogCardSkeleton variant="featured" />
            </div>
            <div className="md:w-1/3 p-6 md:pl-0 border-l border-gray-100">
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <BlogCardSkeleton key={i} variant="sidebar" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Latest articles skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <BlogCardSkeleton key={i} variant="default" />
          ))}
        </div>
      </div>
    );
  }

  if (!allBlogs || allBlogs.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No articles found
        </h3>
        <p className="text-gray-600">
          There are no articles in this category yet.
        </p>
      </div>
    );
  }

  // Safety check for blog data
  const validBlogs = allBlogs.filter(
    (blog) => blog && typeof blog === "object"
  );

  if (validBlogs.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No valid articles found
        </h3>
        <p className="text-gray-600">
          There was an issue loading the articles.
        </p>
      </div>
    );
  }

  const mainArticle = validBlogs[0];
  const sidebarArticles = validBlogs.slice(1, 4);
  const latestArticles = validBlogs.slice(4);

  return (
    <div className={className}>
      {/* Featured Article Section */}
      <section
        className={`pb-14  ${
          latestArticles.length > 0 &&
          "border-b border-[#9292923D] border-gray-100"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-5">
          {/* Main featured article */}
          <div className="md:w-2/3">
            <BlogCard
              blog={mainArticle}
              variant="featured"
              className="border-0 shadow-none"
              isClickable={true}
            />
          </div>

          {/* Sidebar articles */}
          <div className="space-y-6">
            {sidebarArticles.map((blog, index) => (
              <BlogCard
                key={blog.id || index}
                blog={blog}
                variant="sidebar"
                className="border-0 shadow-none p-0"
                isClickable={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      {latestArticles.length > 0 && (
        <>
          <h2 className="text-3xl md:text-4xl headers-font font-bold text-gray-900 mb-8 mt-14">
            Latest
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {latestArticles.map((blog, index) => (
              <BlogCard
                key={blog.id || index}
                blog={blog}
                variant="default"
                isClickable={true}
              />
            ))}
          </div>
        </>
      )}

      {/* Load More Button */}
      {hasMorePages && (
        <div className="text-center cursor-pointer">
          <button
            onClick={loadMoreBlogs}
            disabled={isLoadingMore}
            className={`px-8 py-3 w-full md:w-fit transition-colors cursor-pointer rounded-full ${
              isLoadingMore
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-black border border-[#0000003D] "
            }`}
          >
            {isLoadingMore ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              "See more blogs"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
