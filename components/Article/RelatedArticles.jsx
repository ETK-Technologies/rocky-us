import Blog from "@/components/Blogs/Blog";
import { logger } from "@/utils/devLogger";

const RelatedArticles = ({ RelatedBlogs, loading }) => {
  logger.log("RelatedArticles component - RelatedBlogs:", RelatedBlogs);
  logger.log("RelatedArticles component - loading:", loading);
  logger.log(
    "RelatedArticles component - RelatedBlogs length:",
    RelatedBlogs?.length
  );

  if (!RelatedBlogs || RelatedBlogs.length === 0) {
    logger.log("RelatedArticles component - No related blogs, returning null");
    return null;
  }

  return (
    <section className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 mt-8">
        Related Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RelatedBlogs.map((blog, index) => (
          <Blog key={blog.id || index} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
