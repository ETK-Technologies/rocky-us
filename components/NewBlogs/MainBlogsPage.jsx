"use client";

import { useEffect } from 'react';
import { useBlogFilters } from './hooks/useBlogFilters';
import { useBlogData } from './hooks/useBlogData';
import BlogHeader from './components/BlogHeader';
import CategoryFilters from './components/CategoryFilters';
import FeaturedArticles from './components/FeaturedArticles';
import LatestArticles from './components/LatestArticles';
import NewsletterSignup from './components/NewsletterSignup';
import MoreQuestions from "@/components/MoreQuestions";
import BlogPageSkeleton from './components/BlogPageSkeleton';

export default function MainBlogsPage({
    initialBlogs = [],
    initialCategories = [],
    initialTotalPages = 1
}) {
    const {
        currentPage,
        loadNextPage
    } = useBlogFilters();

    const {
        blogs,
        totalPages,
        isLoading,
        loadMoreBlogs
    } = useBlogData(initialBlogs, initialTotalPages);

    useEffect(() => {
        if (currentPage > 1) {
            loadMoreBlogs(currentPage);
        }
    }, [currentPage, loadMoreBlogs]);

    const handleLoadMore = () => {
        loadNextPage();
    };

    // Show skeleton if no initial data
    if (!initialBlogs || initialBlogs.length === 0) {
        return <BlogPageSkeleton />;
    }

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <BlogHeader />

                {/* Category Filters */}
                <CategoryFilters
                    categories={initialCategories}
                    selectedCategoryId="0"
                    showAllBlogs={false}
                />

                {/* Featured Articles */}
                <FeaturedArticles blogs={blogs} isLoading={isLoading} />

                {/* Latest Articles */}
                <LatestArticles
                    blogs={blogs}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onLoadMore={handleLoadMore}
                    isLoading={isLoading}
                />

                <MoreQuestions
                    title="Join 350K+ Users & receive actionable health tips."
                    buttonText="Sign up to our newsletter"
                    buttonWidth="240"
                    link="/login-register?viewshow=register"
                />
            </div>
        </main>
    );
}
