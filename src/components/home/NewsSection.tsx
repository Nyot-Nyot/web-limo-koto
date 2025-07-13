'use client';

import { useMemo } from 'react';
import NewsCard from '@/components/berita/NewsCard';

interface NewsData {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  category: string;
}

interface NewsSectionProps {
  newsData: NewsData[];
}

export default function NewsSection({ newsData }: NewsSectionProps) {
  // Memoize filtered news data untuk performance
  const filteredNewsData = useMemo(() => {
    return newsData.slice(0, 3); // Show only first 3 news for performance
  }, [newsData]);

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

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNewsData.map((news) => (
            <NewsCard
              key={news.id}
              href={`/berita/${news.id}`}
              title={news.title}
              excerpt={news.content}
              imageSrc={news.image}
              date={news.date}
              views={Math.floor(Math.random() * 1000) + 100}
              category={news.category}
              categoryColor="bg-blue-500"
              backgroundGradient="bg-gradient-to-br from-blue-500 to-purple-600"
              emoji="📰"
            />
          ))}
        </div>

        {/* View More Button */}
        {newsData.length > 3 && (
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