"use client";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaCalendarAlt, FaUser, FaArrowLeft, FaFacebook, FaTwitter, FaWhatsapp, FaTags } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { mockNewsData, NewsItem, createSlug } from "@/data/newsData";

export default function BeritaDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!params?.slug) return;
    
    // Get data from localStorage if available, otherwise use mock data
    const loadNewsData = () => {
      const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
      const safeSlug = slug ?? "";
      let newsItems: NewsItem[] = mockNewsData;
      
      // Check localStorage for updated news
      const savedData = localStorage.getItem('newsData');
      if (savedData) {
        try {
          newsItems = JSON.parse(savedData);
        } catch (error) {
          console.error('Error parsing news data from localStorage:', error);
        }
      }
      
      // Find the news item by slug (URL), ID, or title slug
      const foundNews = newsItems.find(item => 
        item.href.includes(safeSlug) || 
        item.id === safeSlug || 
        createSlug(item.title) === safeSlug
      );
      
      if (foundNews) {
        setNews(foundNews);
        
        // Increment view count and save back to localStorage
        const updatedNewsItems = newsItems.map(item => 
          item.id === foundNews.id ? {...item, views: item.views + 1} : item
        );
        
        localStorage.setItem('newsData', JSON.stringify(updatedNewsItems));
      }
      
      setLoading(false);
    };
    
    loadNewsData();
    
    // Listen for data update events
    const handleDataUpdate = (event: CustomEvent) => {
      if (event.detail?.type === 'berita') {
        loadNewsData();
      }
    };
    
    window.addEventListener('dataUpdated', handleDataUpdate as EventListener);
    
    return () => {
      window.removeEventListener('dataUpdated', handleDataUpdate as EventListener);
    };
  }, [params]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat berita...</p>
        </div>
      </div>
    );
  }
  
  if (!news) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-2xl font-bold mb-4">Berita Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">Maaf, berita yang Anda cari tidak dapat ditemukan. Berita mungkin telah dihapus atau alamat URL tidak valid.</p>
          <button 
            onClick={() => router.push('/berita')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <FaArrowLeft className="inline mr-2" /> Kembali ke Daftar Berita
          </button>
        </div>
      </div>
    );
  }
  
  // Use the news data directly from the state
  const currentNews = {
    title: news.title,
    image: news.imageSrc || "/images/placeholder-news.jpg",
    author: "Admin Nagari",
    date: news.date,
    views: news.views,
    category: news.category,
    tags: news.tags || [news.category],
    href: news.href, // Pastikan URL berita juga tersedia
  };

  return (
    <div className="relative min-h-screen">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ zIndex: -2 }}
      />
      
      {/* Overlay - Disesuaikan dengan halaman lain */}
      <div className="fixed inset-0 bg-black/70" style={{ zIndex: -1 }} />
      
      <main className="relative z-10 min-h-screen text-white">
        {/* Header dengan tombol kembali - Glassmorphism */}
        <div className="px-4 md:px-6 py-4 md:py-6 border-b border-white/20 backdrop-blur-lg bg-white/10">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white hover:text-blue-300 transition-all duration-300 px-3 md:px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 shadow-lg hover:shadow-xl backdrop-blur-sm"
            >
              <FaArrowLeft className="text-sm" /> 
              <span className="hidden sm:inline">Kembali ke Berita</span>
              <span className="sm:hidden">Kembali</span>
            </button>
            
            {/* Social Share Buttons - Glassmorphism */}
            <div className="flex items-center gap-2 md:gap-3">
              <span className="hidden md:inline text-sm text-gray-300">Bagikan:</span>
              <button className="p-2 md:p-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-blue-300 hover:text-blue-200 shadow-lg">
                <FaFacebook className="w-3 h-3 md:w-4 md:h-4" />
              </button>
              <button className="p-2 md:p-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-cyan-300 hover:text-cyan-200 shadow-lg">
                <FaTwitter className="w-3 h-3 md:w-4 md:h-4" />
              </button>
              <button className="p-2 md:p-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-green-300 hover:text-green-200 shadow-lg">
                <FaWhatsapp className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-6 py-6 md:py-8">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb - Glassmorphism */}
            <nav className="mb-6 md:mb-8 p-3 md:p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg">
              <div className="flex items-center text-sm text-gray-300 flex-wrap gap-1">
                <Link href="/" className="hover:text-white transition-colors duration-300 hover:underline">
                  🏠 Beranda
                </Link>
                <span className="mx-2 text-white/60">/</span>
                <Link href="/berita" className="hover:text-white transition-colors duration-300 hover:underline">
                  📰 Berita
                </Link>
                <span className="mx-2 text-white/60">/</span>
                <span className="text-white font-medium truncate">{currentNews.title}</span>
              </div>
            </nav>

            {/* Artikel - Solid White Background untuk Readability */}
            <article className="bg-white text-black rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              {/* Header gambar */}
              <div className="relative">
                {currentNews.image ? (
                  <Image
                    src={currentNews.image}
                    alt={currentNews.title}
                    width={1200}
                    height={600}
                    className="w-full h-64 md:h-80 lg:h-96 object-cover"
                    priority // Add priority for better loading performance
                  />
                ) : (
                  <div className={`w-full h-64 md:h-80 lg:h-96 ${news.backgroundGradient || 'bg-gradient-to-br from-blue-400 to-blue-600'} flex items-center justify-center`}>
                    <span className="text-white text-4xl md:text-5xl lg:text-6xl">{news.emoji}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6">
                  <span className={`px-3 md:px-4 py-1.5 md:py-2 ${news.categoryColor || 'bg-blue-600'} text-white rounded-full text-xs md:text-sm font-semibold shadow-lg`}>
                    {currentNews.category}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 lg:p-12">
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600 mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-600" />
                    <span>{currentNews.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUser className="text-green-600" />
                    <span>{currentNews.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEye className="text-orange-600" />
                    <span>{currentNews.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTags className="text-purple-600" />
                    <span>{currentNews.category}</span>
                  </div>
                </div>

                {/* Judul - Responsive Typography */}
                <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-6 md:mb-8 leading-tight text-gray-900">
                  {currentNews.title}
                </h1>

                {/* Konten artikel - Optimized for Reading */}
                <div className="prose prose-lg md:prose-xl max-w-none text-gray-800 leading-relaxed">
                  {news.blocks ? (
                    // Render content based on blocks structure
                    news.blocks.map((block, index) => {
                      switch (block.type) {
                        case 'subheading':
                          return (
                            <h2 key={index} className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                              {block.content}
                            </h2>
                          );
                        case 'text':
                          return (
                            <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                              {block.content}
                            </p>
                          );
                        case 'image':
                          return (
                            <figure key={index} className="my-6">
                              <Image 
                                src={block.url || '/images/placeholder-news.jpg'} 
                                alt={block.caption || 'Image'} 
                                width={800} 
                                height={500}
                                className="w-full rounded-lg shadow-lg"
                              />
                              {block.caption && (
                                <figcaption className="text-center text-sm text-gray-500 mt-2">
                                  {block.caption}
                                </figcaption>
                              )}
                            </figure>
                          );
                        case 'video':
                          return (
                            <div key={index} className="relative my-6 w-full pt-[56.25%]">
                              <iframe
                                className="absolute top-0 left-0 w-full h-full rounded-lg"
                                src={block.url}
                                title={block.caption || 'Video content'}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                              {block.caption && (
                                <figcaption className="text-center text-sm text-gray-500 mt-2">
                                  {block.caption}
                                </figcaption>
                              )}
                            </div>
                          );
                        case 'quote':
                          return (
                            <blockquote key={index} className="border-l-4 border-blue-500 pl-4 my-6 italic bg-blue-50 p-4 rounded-r-lg">
                              {block.content}
                            </blockquote>
                          );
                        case 'list':
                          return (
                            <ul key={index} className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                              {block.items?.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          );
                        default:
                          return null;
                      }
                    })
                  ) : (
                    // Default content if no blocks
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {news.excerpt}
                    </p>
                  )}
                </div>

                {/* Share buttons */}
                <div className="border-t border-gray-200 pt-8 mt-12">
                  <div className="flex flex-col items-start gap-4 md:gap-6">
                    <h3 className="font-semibold text-gray-900 text-lg">Bagikan artikel ini:</h3>
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <button className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base flex-1 sm:flex-none">
                        <FaFacebook className="flex-shrink-0" />
                        <span>Facebook</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm md:text-base flex-1 sm:flex-none">
                        <FaTwitter className="flex-shrink-0" />
                        <span>Twitter</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base flex-1 sm:flex-none">
                        <FaWhatsapp className="flex-shrink-0" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="border-t border-gray-200 pt-8 mt-8">
                  <h3 className="font-semibold text-gray-900 mb-4 text-lg">Tags:</h3>
                  <div className="flex flex-wrap gap-3">
                    {currentNews.tags.map((tag: string, index: number) => (
                      <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* Berita Terkait - Glassmorphism Sidebar */}
            <aside className="mt-12 md:mt-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Berita Terkait
                  </h2>
                </div>
                
                {/* Dynamically show related news based on category or tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {mockNewsData
                    .filter(item => 
                      // Filter related news by same category or shared tags, exclude current news
                      item.id !== news.id && 
                      (item.category === news.category || 
                       (news.tags && item.tags && 
                        news.tags.some(tag => item.tags?.includes(tag))))
                    )
                    .slice(0, 3) // Show max 3 related articles
                    .map(relatedNews => (
                      <Link 
                        key={relatedNews.id}
                        href={relatedNews.href}
                        className="bg-white/10 backdrop-blur-lg text-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-white/20"
                      >
                        <div className="w-full h-40 md:h-48 bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center relative">
                          <span className="text-white text-4xl md:text-5xl filter drop-shadow-lg">
                            {relatedNews.emoji}
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        <div className="p-4 md:p-6">
                          <h3 className="font-bold text-lg md:text-xl mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                            {relatedNews.title}
                          </h3>
                          <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                            {relatedNews.excerpt}
                          </p>
                          <div className="flex justify-between items-center text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <FaCalendarAlt className="text-blue-400" />
                              {relatedNews.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaEye className="text-green-400" />
                              {relatedNews.views}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
