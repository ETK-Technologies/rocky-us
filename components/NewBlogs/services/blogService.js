import { logger } from "@/utils/devLogger";

function getBaseUrl() {
  if (typeof window === "undefined") {
    return "https://www.myrocky.ca";
  }
  // Client-side: use relative URLs to proxy through Next.js API routes
  return "";
}

function getHeaders() {
  // Only include Authorization header on server-side
  if (typeof window === "undefined") {
    return {
      Accept: "application/json",
      Authorization: process.env.ADMIN_TOKEN,
    };
  }
  // Client-side: no Authorization header needed
  return {
    Accept: "application/json",
  };
}

export const blogService = {
  async getBlogs(page = 1, categories = null) {
    try {
      let url = `${getBaseUrl()}/api/blogs?page=${page}&_embed`;
      if (categories && categories !== "0") {
        url += `&categories=${categories}`;
      }

      const res = await fetch(url, {
        cache: "no-store",
        headers: getHeaders(),
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error(
            "Authentication error: Please check your API credentials"
          );
        } else if (res.status === 404) {
          throw new Error("API endpoint not found: Please check your BASE_URL");
        } else if (res.status >= 500) {
          throw new Error(
            "Server error: The WordPress server is experiencing issues"
          );
        } else {
          throw new Error(`API request failed with status ${res.status}`);
        }
      }

      const data = await res.json();

      const totalPages =
        parseInt(res.headers.get("TotalPages")) ||
        parseInt(res.headers.get("X-Total-Pages")) ||
        data.totalPages ||
        1;

      return {
        blogs: data,
        totalPages,
        currentPage: page,
      };
    } catch (error) {
      logger.error("Error fetching blogs:", error);
      throw error;
    }
  },

  async getAllPageBlogs(currentPage = 1, categories = null) {
    try {
      // Always fetch categories first
      const categoriesData = await this.getBlogCategories();

      // Build URL for blogs - use environment variable for server-side, relative for client-side
      let url = `${getBaseUrl()}/api/blogs?page=${currentPage}`;
      if (categories && categories !== "0") {
        url += `&categories=${categories}`;
      }

      const res = await fetch(url, {
        cache: "no-store",
        headers: getHeaders(),
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error(
            "Authentication error: Please check your API credentials"
          );
        } else if (res.status === 404) {
          throw new Error("API endpoint not found: Please check your BASE_URL");
        } else if (res.status >= 500) {
          throw new Error(
            "Server error: The WordPress server is experiencing issues"
          );
        } else {
          throw new Error(`API request failed with status ${res.status}`);
        }
      }

      const data = await res.json();

      // Create page numbers array like in BlogsPage.jsx
      const pageNumbers = Array.from(
        { length: parseInt(res.headers.get("TotalPages")) || 1 },
        (_, index) => index + 1
      );

      return {
        blogs: data,
        categories: categoriesData,
        totalPages: pageNumbers,
        totalPagesCount: parseInt(res.headers.get("TotalPages")) || 1,
        currentPage: currentPage,
      };
    } catch (error) {
      logger.error("Error fetching all page blogs:", error);
      throw error;
    }
  },

  async getBlogsByCategory(categorySlug, page = 1) {
    try {
      // Get all categories
      const categories = await this.getBlogCategories();
      const category = categories.find((cat) => cat.slug === categorySlug);

      if (!category) {
        throw new Error("Category not found");
      }

      // Fetch blogs for that category
      return await this.getBlogs(page, category.id);
    } catch (error) {
      logger.error("Error fetching blogs by category:", error);
      throw error;
    }
  },

  async getBlogBySlug(slug) {
    try {
      // Direct WordPress API call instead of going through our API route
      const url = `${
        process.env.BASE_URL || "https://www.myrocky.ca"
      }/wp-json/wp/v2/posts?slug=${slug}&_embed=true`;
      const res = await fetch(url, {
        cache: "no-store",
        headers: {
          Authorization: process.env.ADMIN_TOKEN || "",
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error(
            "Authentication error: Please check your API credentials"
          );
        } else if (res.status === 404) {
          throw new Error("Blog not found: Please check the slug");
        } else if (res.status >= 500) {
          throw new Error(
            "Server error: The WordPress server is experiencing issues"
          );
        } else {
          throw new Error(`API request failed with status ${res.status}`);
        }
      }

      const data = await res.json();

      // WordPress returns an array, we want the first (and only) item
      if (!data || data.length === 0) {
        throw new Error("Blog not found: Please check the slug");
      }

      return data[0];
    } catch (error) {
      logger.error("Error fetching blog by slug:", error);
      throw error;
    }
  },

  async getBlogCategories() {
    try {
      const res = await fetch(`${getBaseUrl()}/api/BlogCategories`, {
        cache: "no-store",
        headers: getHeaders(),
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error(
            "Authentication error: Please check your API credentials"
          );
        } else if (res.status === 404) {
          throw new Error("API endpoint not found: Please check your BASE_URL");
        } else if (res.status >= 500) {
          throw new Error(
            "Server error: The WordPress server is experiencing issues"
          );
        } else {
          throw new Error(`API request failed with status ${res.status}`);
        }
      }

      return await res.json();
    } catch (error) {
      logger.error("Error fetching blog categories:", error);
      throw error;
    }
  },
};
