"use client";

import React, { useMemo } from "react";
import Header from "@/components/Header";
import SearchFilter from "@/components/berita/SearchFilter";
import NewsCard from "@/components/berita/NewsCard";
import AgendaSidebar from "@/components/berita/AgendaSidebar";
import Pagination from "@/components/berita/Pagination";
import SectionHeader from "@/components/berita/SectionHeader";
import { useNewsFilter } from "@/hooks/useNewsFilter";
import { useNewsData, useAgendaData } from "@/context/DataContext";

// Extended interface untuk raw news data dari context
interface ExtendedNewsData {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
  author?: string;
  category?: string;
  // Properties yang mungkin ada dari data asli
  excerpt?: string;
  views?: number;
  categoryColor?: string;
  backgroundGradient?: string;
  emoji?: string;
  isFeatured?: boolean;
  imageSrc?: string;
}

// Constants for better maintainability
const PAGE_CONFIG = {
  CONTAINER_PADDING: "px-4 md:px-6",
  SECTION_SPACING: "mb-8 md:mb-12",
  GRID_GAPS: "gap-6 md:gap-8 lg:gap-10",
  NEWS_GRID_GAPS: "gap-4 md:gap-6 lg:gap-8"
} as const;

const BACKGROUND_STYLES = {
  zIndex: -2
} as const;

const OVERLAY_STYLES = {
  zIndex: -1
} as const;

// Memoized components for better performance
const BackgroundLayer = React.memo(() => (
  <>
    {/* Fixed Background */}
    <div 
      className="fixed inset-0 bg-[url('/images/background.webp')] bg-cover bg-center bg-no-repeat bg-fixed"
      style={BACKGROUND_STYLES}
    />
    
    {/* Overlay */}
    <div className="fixed inset-0 bg-black/70" style={OVERLAY_STYLES} />
  </>
));

BackgroundLayer.displayName = 'BackgroundLayer';

const PageHeader = React.memo(() => (
  <div className="text-center mb-8 md:mb-12 mt-8">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
      Berita Terkini
    </h1>
    <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto px-4">
      Ikuti perkembangan terbaru dan informasi penting dari nagari kami
    </p>
  </div>
));

PageHeader.displayName = 'PageHeader';

const NoResultsState = React.memo(() => (
  <div className="text-center py-16">
    <div className="text-6xl mb-4">🔍</div>
    <h3 className="text-2xl font-bold mb-2">Tidak ada hasil ditemukan</h3>
    <p className="text-gray-300">
      Coba ubah kata kunci pencarian atau filter yang digunakan
    </p>
  </div>
));

NoResultsState.displayName = 'NoResultsState';

export default function BeritaPage() {
  // Use centralized data from context
  const { data: rawNewsData } = useNewsData();
  const { data: rawAgendaData } = useAgendaData();
  
  // Convert data to expected format
  const newsData = useMemo(() => 
    rawNewsData.map(news => {
      // Safely access properties that might exist in the raw data
      const rawNewsItem = news as ExtendedNewsData;
      
      return {
        ...news,
        href: `/berita/${news.id}`,
        // Use excerpt if available, otherwise create from content
        excerpt: rawNewsItem.excerpt || 
                (news.content ? news.content.substring(0, 150) + '...' : 'Tidak ada deskripsi tersedia'),
        views: rawNewsItem.views || 0,
        category: news.category || 'Berita',
        categoryColor: rawNewsItem.categoryColor || 'bg-blue-500',
        backgroundGradient: rawNewsItem.backgroundGradient || 'bg-gradient-to-r from-blue-500 to-purple-600',
        emoji: rawNewsItem.emoji || '📰',
        // Preserve featured status from original data
        isFeatured: rawNewsItem.isFeatured || false,
        imageSrc: news.image || rawNewsItem.imageSrc
      };
    }), 
    [rawNewsData]
  );
  
  const agendaData = useMemo(() => 
    rawAgendaData.map(agenda => ({
      id: agenda.id,
      title: agenda.title,
      organizer: agenda.author || 'Nagari Lima Koto',
      location: 'Nagari Lima Koto',
      date: agenda.date,
      time: '08:00'
    })), 
    [rawAgendaData]
  );

  const {
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
    hasResults
  } = useNewsFilter(newsData);

  // Memoize expensive computations
  const shouldShowPagination = useMemo(() => totalPages > 1, [totalPages]);
  const hasRegularNews = useMemo(() => regularNews.length > 0, [regularNews.length]);

  // Memoize grid layout classes
  const gridClasses = useMemo(() => 
    `grid grid-cols-1 xl:grid-cols-4 ${PAGE_CONFIG.GRID_GAPS}`,
    []
  );

  const newsGridClasses = useMemo(() => 
    `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ${PAGE_CONFIG.NEWS_GRID_GAPS}`,
    []
  );

  return (
    <div className="relative min-h-screen">
      <BackgroundLayer />
      
      <Header />
      
      <div className="min-h-screen">
        <div className={`container mx-auto ${PAGE_CONFIG.CONTAINER_PADDING} py-16 md:py-20 text-white`}>
          <PageHeader />

          {/* Search and Filter Section */}
          <SearchFilter
            searchTerm={searchTerm}
            sortBy={sortBy}
            onSearchChange={setSearchTerm}
            onSortChange={setSortBy}
            onSearch={handleSearch}
          />

          <div className={gridClasses} id="news-section">
            {/* Main Content - Berita */}
            <section className="xl:col-span-3">
              {hasResults ? (
                <>
                  {/* Featured News */}
                  {featuredNews && (
                    <div className={PAGE_CONFIG.SECTION_SPACING}>
                      <SectionHeader
                        title="Berita Utama"
                        gradientColors="bg-gradient-to-r from-white to-blue-200"
                        lineGradient="bg-gradient-to-b from-yellow-400 to-orange-500"
                      />
                      <NewsCard {...featuredNews} />
                    </div>
                  )}

                  {/* Regular News Grid */}
                  {hasRegularNews && (
                    <div className={PAGE_CONFIG.SECTION_SPACING}>
                      <SectionHeader
                        title="Berita Lainnya"
                        gradientColors="bg-gradient-to-r from-white to-blue-200"
                        lineGradient="bg-gradient-to-b from-blue-400 to-purple-500"
                      />
                      <div className={newsGridClasses}>
                        {regularNews.map((news) => (
                          <NewsCard key={news.id} {...news} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pagination */}
                  {shouldShowPagination && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              ) : (
                <NoResultsState />
              )}
            </section>

            {/* Sidebar - Agenda */}
            <AgendaSidebar agendaData={agendaData} />
          </div>
        </div>
      </div>
    </div>
  );
}