import { BlogCard } from "./BlogCard";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";
import { getPosts } from "@/lib/api/getPosts";
import { logger } from "@/utils/devLogger";

const ErrorDisplay = ({ message }) => (
  <div
    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{message}</span>
  </div>
);

const BlogSection = async () => {
  let posts = [];
  let error = null;
  logger.log(posts, 'Posts');

  try {
    posts = await getPosts();
    logger.log(posts, 'Posts');
  } catch (err) {
    error = err.message || "Failed to load blog posts";
  }

  return (
    <SectionContainer paddingY="py-14 md:py-24">
      <SectionHeader
        title="Learn More From Our Blog"
        subtitle="Recent articles"
        className="mb-10 md:mb-14"
      />

      {error ? (
        <ErrorDisplay message={error} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts && posts.length > 0 ? (
            posts
              .slice(0, 3)
              .map((post) => <BlogCard key={post.id} post={post} />)
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No blog posts available
            </p>
          )}
        </div>
      )}
    </SectionContainer>
  );
};

export default BlogSection;
