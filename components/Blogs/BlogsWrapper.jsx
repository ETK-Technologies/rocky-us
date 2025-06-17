import Blog from "./Blog";

const BlogsWrapper = ({ Blogs, loading }) => {
  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-96">
          <div className="max-w-sm rounded-2xl overflow-hidden bg-gray-100 animate-pulse w-100 h-100"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Blogs.map((blog) => (
            <Blog key={blog.id} blog={blog}></Blog>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogsWrapper;
