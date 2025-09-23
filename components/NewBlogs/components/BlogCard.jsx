"use client";

import { useState } from "react";
import { logger } from "@/utils/devLogger";

export default function BlogCard({
  blog,
  variant = "default",
  className = "",
}) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Safety check for blog data
  if (!blog || typeof blog !== "object") {
    logger.warn("BlogCard: Invalid blog data:", blog);
    return null;
  }

  // Debug logging to understand data structure
  if (process.env.NODE_ENV === "development") {
    logger.log("BlogCard data:", {
      title: blog.title,
      excerpt: blog.excerpt,
      authors: blog.authors,
      embedded: blog._embedded,
      featuredMedia: blog.featured_media,
    });
  }

  // Extract and sanitize data from WordPress API response
  const extractText = (field) => {
    if (typeof field === "string") return field;
    if (field && typeof field === "object" && field.rendered)
      return field.rendered;
    if (field && typeof field === "object" && field.name) return field.name;
    return "";
  };

  const extractTags = (tags) => {
    if (!tags || !Array.isArray(tags)) return [];
    return tags.map((tag) => extractText(tag)).filter(Boolean);
  };

  // Extract title and excerpt
  const title = extractText(blog.title) || "Untitled";
  const excerpt = extractText(blog.excerpt) || "No excerpt available";

  // Extract author - try multiple sources
  let author = "Unknown Author";
  if (blog.authors && blog.authors.length > 0) {
    author =
      blog.authors[0].display_name || blog.authors[0].name || "Unknown Author";
  } else if (
    blog._embedded &&
    blog._embedded.author &&
    blog._embedded.author.length > 0
  ) {
    author = blog._embedded.author[0].name || "Unknown Author";
  }

  // Extract category - try multiple sources
  let category = "Uncategorized";
  if (
    blog._embedded &&
    blog._embedded["wp:term"] &&
    blog._embedded["wp:term"][0] &&
    blog._embedded["wp:term"][0].length > 0
  ) {
    category = blog._embedded["wp:term"][0][0].name || "Uncategorized";
  } else if (blog.categories && Array.isArray(blog.categories)) {
    // If we have category IDs, we might need to fetch category names separately
    category = "Category " + blog.categories[0];
  }

  // Extract tags
  let tags = [];
  if (
    blog._embedded &&
    blog._embedded["wp:term"] &&
    blog._embedded["wp:term"][2]
  ) {
    tags = extractTags(blog._embedded["wp:term"][2]);
  }

  // Extract featured image
  let featuredImage = null;
  if (
    blog._embedded &&
    blog._embedded["wp:featuredmedia"] &&
    blog._embedded["wp:featuredmedia"].length > 0
  ) {
    const media = blog._embedded["wp:featuredmedia"][0];
    featuredImage =
      media.source_url ||
      media.media_details?.sizes?.medium?.source_url ||
      media.media_details?.sizes?.large?.source_url;
  }

  // Remove HTML tags from excerpt for clean display
  const cleanExcerpt = excerpt.replace(/<[^>]*>/g, "").trim();

  const renderImage = (aspectRatio = "16:9") => {
    if (featuredImage && !imageError) {
      return (
        <div
          className={`relative ${
            aspectRatio === "16:9" ? "aspect-video" : "w-[88px] h-[88px]"
          }`}
        >
          {/* Loading skeleton */}
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse"></div>
          )}

          <img
            src={featuredImage}
            alt={title}
            className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />
        </div>
      );
    }

    // Fallback to placeholder if no image or image error
    return (
      <div
        className={`bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-mono text-sm ${
          aspectRatio === "16:9" ? "aspect-video" : "aspect-square"
        }`}
      >
        {aspectRatio}
      </div>
    );
  };

  const renderTags = () => {
    if (tags.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };

  if (variant === "featured") {
    return (
      <article className={`bg-white rounded-lg overflow-hidden ${className}`}>
        <div className="md:flex">
          <div className="md:w-2/3 p-6">
            {renderImage("16:9")}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4 mb-2 leading-tight">
              {title}
            </h2>
            <p className="text-gray-600 text-sm mb-3">
              {author} in {category}
            </p>
            <p className="text-gray-700 mb-4 line-clamp-3">{cleanExcerpt}</p>
            {renderTags()}
          </div>
          <div className="md:w-1/3 p-6 md:pl-0">
            {/* Sidebar featured articles will be rendered here */}
          </div>
        </div>
      </article>
    );
  }

  if (variant === "sidebar") {
    return (
      <article className={`bg-white rounded-lg overflow-hidden ${className}`}>
        <div className="flex gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
              {title}
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              {author} in {category}
            </p>
            <p className="text-gray-700 text-sm mb-3 line-clamp-2">
              {cleanExcerpt}
            </p>
            {renderTags()}
          </div>
          <div className="flex-shrink-0">{renderImage("1:1")}</div>
        </div>
      </article>
    );
  }

  // Default grid layout
  return (
    <article className={`bg-white rounded-lg overflow-hidden ${className}`}>
      {renderImage("16:9")}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          {author} in {category}
        </p>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {cleanExcerpt}
        </p>
        {renderTags()}
      </div>
    </article>
  );
}
