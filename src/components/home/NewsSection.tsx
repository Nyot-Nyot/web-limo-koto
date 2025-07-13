'use client';

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
  // Sort by date desc, ambil 3 berita terbaru
  const sortedNews = [...newsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <section id="berita" className="py-20 px-4">
      <div className="max-w-7xl mx-auto px-2 md:px-0">
        <div className="text-center text-white mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Berita <span className="text-yellow-400">Terbaru</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Berita terbaru seputar kegiatan dan perkembangan di Nagari Lima Koto
          </p>
        </div>
        {/* Show only 3 latest news for both desktop and mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {sortedNews && sortedNews.length > 0 ? (
            sortedNews.map((news) => (
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
            ))
          ) : (
            <div className="col-span-full text-center text-gray-300 py-8">
              <p>Tidak ada berita terbaru saat ini</p>
            </div>
          )}
        </div>
        <div className="text-center mt-10">
          <a 
            href="/berita" 
            className="inline-flex items-center px-6 py-3 border-white border-2 text-base font-semibold rounded-md text-white bg-transparent hover:bg-white hover:text-black transition"
          >
            Lihat Semua Berita
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 