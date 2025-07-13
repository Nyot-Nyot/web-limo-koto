'use client';

import { useMemo } from 'react';
import NewsCard from '@/components/berita/NewsCard';

interface NewsData {
  id: string;
  title: string;
  excerpt: string;
  imageSrc?: string;
  date: string;
  category: string;
  categoryColor?: string;
  backgroundGradient?: string;
  emoji?: string;
  views?: number;
  isFeatured?: boolean;
  tags?: string[];
}

interface NewsSectionProps {
  newsData: NewsData[];
}

export default function NewsSection({ newsData }: NewsSectionProps) {
  // Memoize filtered news data untuk performance
  const filteredNewsData = useMemo(() => {
    return newsData.slice(0, 6); // Show more news to have better featured/regular distribution
  }, [newsData]);

  // Separate featured and regular news
  const featuredNews = useMemo(() => {
    return filteredNewsData.filter(news => news.isFeatured).slice(0, 1); // Only show 1 featured news
  }, [filteredNewsData]);

  const regularNews = useMemo(() => {
    const nonFeatured = filteredNewsData.filter(news => !news.isFeatured);
    // If no featured news, show first 4 regular news
    // If there's featured news, show next 3 regular news
    return nonFeatured.slice(0, featuredNews.length > 0 ? 3 : 4);
  }, [filteredNewsData, featuredNews]);

  return (
    <section id="berita" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Berita Terkini
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Dapatkan informasi terbaru seputar kegiatan dan perkembangan Nagari Lima Koto
          </p>
        </div>

        {/* Featured News - Full Width */}
        {featuredNews.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
                🔥 Berita Utama
              </h3>
              <div className="w-16 h-0.5 bg-yellow-400 mx-auto"></div>
            </div>
            <div className="max-w-4xl mx-auto">
              {featuredNews.map((news) => (
                <NewsCard
                  key={news.id}
                  href={`/berita/${news.id}`}
                  title={news.title}
                  excerpt={news.excerpt}
                  imageSrc={news.imageSrc}
                  date={news.date}
                  views={news.views || Math.floor(Math.random() * 1000) + 100}
                  category={news.category}
                  categoryColor={news.categoryColor || "bg-gradient-to-r from-red-500 to-pink-600"}
                  backgroundGradient={news.backgroundGradient || "bg-gradient-to-br from-blue-500 to-purple-600"}
                  emoji={news.emoji || "🔥"}
                  isFeatured={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular News Grid */}
        {regularNews.length > 0 && (
          <div>
            <div className="text-center mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                {featuredNews.length > 0 ? "Berita Lainnya" : "Berita Terkini"}
              </h3>
              <div className="w-12 h-0.5 bg-gray-400 mx-auto"></div>
            </div>
            <div className={`grid gap-6 ${
              regularNews.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' :
              regularNews.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {regularNews.map((news) => (
                <NewsCard
                  key={news.id}
                  href={`/berita/${news.id}`}
                  title={news.title}
                  excerpt={news.excerpt}
                  imageSrc={news.imageSrc}
                  date={news.date}
                  views={news.views || Math.floor(Math.random() * 1000) + 100}
                  category={news.category}
                  categoryColor={news.categoryColor || "bg-blue-500"}
                  backgroundGradient={news.backgroundGradient || "bg-gradient-to-br from-blue-500 to-purple-600"}
                  emoji={news.emoji || "📰"}
                  isFeatured={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* View More Button */}
        {newsData.length > 4 && (
          <div className="text-center mt-12">
            <a
              href="/berita"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-300 inline-block"
            >
              Lihat Semua Berita
            </a>
          </div>
        )}
      </div>
    </section>
  );
} 