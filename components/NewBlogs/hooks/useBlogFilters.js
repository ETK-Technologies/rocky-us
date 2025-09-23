"use client";

import { useState, useCallback } from 'react';

export const useBlogFilters = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState("0");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const handleCategoryClick = useCallback((categoryId) => {
        setCurrentPage(1);
        setSelectedCategoryId(categoryId);
    }, []);

    const goToPage = useCallback((pageNo) => {
        setCurrentPage(pageNo);
    }, []);

    const loadNextPage = useCallback(() => {
        setCurrentPage(prev => prev + 1);
    }, []);

    const resetFilters = useCallback(() => {
        setSelectedCategoryId("0");
        setCurrentPage(1);
    }, []);

    return {
        selectedCategoryId,
        currentPage,
        isLoadingMore,
        setIsLoadingMore,
        handleCategoryClick,
        goToPage,
        loadNextPage,
        resetFilters
    };
};
