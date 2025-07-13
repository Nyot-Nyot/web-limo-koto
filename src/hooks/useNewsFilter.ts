"use client";

import { useState, useMemo, useEffect } from "react";
import { NewsItem } from "@/data/newsData";

export function useNewsFilter(newsData: NewsItem[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredNews = useMemo(() => {
    const filtered = newsData.filter(news => 
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.views - a.views;
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "latest":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return filtered;
  }, [newsData, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  
  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNews, currentPage, itemsPerPage]);

  const featuredNews = useMemo(() => 
    filteredNews.find(news => news.isFeatured),
    [filteredNews]
  );

  const regularNews = useMemo(() => 
    paginatedNews.filter(news => !news.isFeatured),
    [paginatedNews]
  );

  // Reset to first page when sort order changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of news section
    document.getElementById('news-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    currentPage,
    totalPages,
    featuredNews,
    regularNews,
    handleSearch,
    handlePageChange,
    hasResults: filteredNews.length > 0
  };
}
