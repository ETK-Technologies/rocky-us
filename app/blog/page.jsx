import { Suspense } from "react";
import { logger } from "@/utils/devLogger";
import { blogService } from "@/components/NewBlogs/services/blogService";
import { MainBlogsPage } from "@/components/NewBlogs";
import BlogPageSkeleton from "@/components/NewBlogs/components/BlogPageSkeleton";
import ErrorUI from "./ErrorUI";

async function BlogsContent() {
  try {
    const [blogsData, categories] = await Promise.all([
      blogService.getBlogs(1),
      blogService.getBlogCategories(),
    ]);

    return (
      <MainBlogsPage
        initialBlogs={blogsData.blogs || []}
        initialCategories={categories || []}
        initialTotalPages={blogsData.totalPages || 1}
      />
    );
  } catch (error) {
    logger.error("Error loading blogs page:", error);
    return <ErrorUI error={error} />;
  }
}

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogPageSkeleton />}>
      <BlogsContent />
    </Suspense>
  );
}
