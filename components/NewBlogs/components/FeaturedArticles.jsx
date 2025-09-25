import BlogCard from '../shared/BlogCard';
import BlogCardSkeleton from './BlogCardSkeleton';

export default function FeaturedArticles({ blogs = [], isLoading = false }) {
    if (isLoading) {
        return (
            <section className="mb-16">
                <BlogCardSkeleton variant="featured" />
            </section>
        );
    }

    if (!blogs || blogs.length === 0) {
        return null;
    }

    // Safety check for blog data
    const validBlogs = blogs.filter(blog => blog && typeof blog === 'object');

    if (validBlogs.length === 0) {
        return null;
    }

    const mainArticle = validBlogs[0];
    const sidebarArticles = validBlogs.slice(1, 4);

    return (
        <section className="pb-14 border-b border-[#9292923D] border-gray-100">
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
    );
}
