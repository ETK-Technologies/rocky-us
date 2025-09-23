import BlogCardSkeleton from "../../components/BlogCardSkeleton";
import AllBlogCard from "./AllBlogCard";

export default function BlogGrid({
  blogs = [],
  isLoading = false,
  className = "",
}) {
  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      >
        {[...Array(9)].map((_, i) => (
          <BlogCardSkeleton key={i} variant="default" />
        ))}
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No articles found
        </h3>
        <p className="text-gray-600">
          There are no articles available at the moment.
        </p>
      </div>
    );
  }

  // Safety check for blog data
  const validBlogs = blogs.filter((blog) => blog && typeof blog === "object");

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

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 ${className}`}
    >
      {validBlogs.map((blog, index) => (
        <AllBlogCard key={blog.id || index} blog={blog} />
      ))}
    </div>
  );
}
