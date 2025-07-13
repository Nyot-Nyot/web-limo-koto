'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { kepalaJorongData, sekretarisData, waliNagariData } from '@/data/pejabat';
import { faqData } from '@/data/faq';
import { featuresData } from '@/data/features';
import { mockNewsData, NewsItem } from '@/data/newsData';
import NewsCard from '@/components/berita/NewsCard';
import FAQCard from '@/components/FAQCard';
import FeatureCard from '@/components/FeatureCard';

interface PejabatData {
  id: string | number;
  name: string;
  title: string;
  image: string;
  jorong?: string;
  description: string;
}

interface FAQData {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function HeroSection() {
  // Combined state for all officials
  const [pejabatIndex, setPejabatIndex] = useState(0);
  const [pejabatAnimate, setPejabatAnimate] = useState<'in' | 'out'>('in');
  const [allPejabatData, setAllPejabatData] = useState<PejabatData[]>([]);
  const [currentFaqData, setCurrentFaqData] = useState<FAQData[]>([]);
  const [newsData, setNewsData] = useState<NewsItem[]>(mockNewsData);
  
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  // Load data from localStorage or use default data
  useEffect(() => {
    // Load Pejabat data
    const savedPejabat = localStorage.getItem('pejabatData');
    if (savedPejabat) {
      try {
        const parsedPejabat = JSON.parse(savedPejabat);
        setAllPejabatData(parsedPejabat);
      } catch (error) {
        console.error('Error parsing pejabat data:', error);
        // Fallback to default data
        setAllPejabatData([
          waliNagariData,
          ...kepalaJorongData,
          ...sekretarisData
        ]);
      }
    } else {
      // Use default data
      setAllPejabatData([
        waliNagariData,
        ...kepalaJorongData,
        ...sekretarisData
      ]);
    }

    // Load FAQ data
    const savedFaq = localStorage.getItem('faqData');
    if (savedFaq) {
      try {
        const parsedFaq = JSON.parse(savedFaq);
        setCurrentFaqData(parsedFaq);
      } catch (error) {
        console.error('Error parsing FAQ data:', error);
        // Fallback to default data
        setCurrentFaqData(faqData);
      }
    } else {
      // Use default data
      setCurrentFaqData(faqData);
    }

    // Load News data
    const savedNews = localStorage.getItem('newsData');
    if (savedNews) {
      try {
        const parsedNews = JSON.parse(savedNews);
        setNewsData(parsedNews);
      } catch (error) {
        console.error('Error parsing news data:', error);
        // Fallback to default data
        setNewsData(mockNewsData);
      }
    } else {
      // Use default data
      setNewsData(mockNewsData);
    }

    // Listen for localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pejabatData' && e.newValue) {
        try {
          const parsedPejabat = JSON.parse(e.newValue);
          setAllPejabatData(parsedPejabat);
        } catch (error) {
          console.error('Error parsing updated pejabat data:', error);
        }
      }
      if (e.key === 'faqData' && e.newValue) {
        try {
          const parsedFaq = JSON.parse(e.newValue);
          setCurrentFaqData(parsedFaq);
        } catch (error) {
          console.error('Error parsing updated FAQ data:', error);
        }
      }
      if (e.key === 'newsData' && e.newValue) {
        try {
          const parsedNews = JSON.parse(e.newValue);
          setNewsData(parsedNews);
        } catch (error) {
          console.error('Error parsing updated news data:', error);
        }
      }
    };

    // Listen for custom events (for same-tab updates)
    const handleCustomUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.type === 'pejabat') {
        const savedPejabat = localStorage.getItem('pejabatData');
        if (savedPejabat) {
          try {
            const parsedPejabat = JSON.parse(savedPejabat);
            setAllPejabatData(parsedPejabat);
          } catch (error) {
            console.error('Error parsing updated pejabat data:', error);
          }
        }
      }
      if (customEvent.detail.type === 'faq') {
        const savedFaq = localStorage.getItem('faqData');
        if (savedFaq) {
          try {
            const parsedFaq = JSON.parse(savedFaq);
            setCurrentFaqData(parsedFaq);
          } catch (error) {
            console.error('Error parsing updated FAQ data:', error);
          }
        }
      }
      if (customEvent.detail.type === 'news' || customEvent.detail.type === 'berita') {
        const savedNews = localStorage.getItem('newsData');
        if (savedNews) {
          try {
            const parsedNews = JSON.parse(savedNews);
            setNewsData(parsedNews);
          } catch (error) {
            console.error('Error parsing updated news data:', error);
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('dataUpdated', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('dataUpdated', handleCustomUpdate);
    };
  }, []);

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };
  
  // Effect for Perangkat Nagari rotation with slide transition
  useEffect(() => {
    if (allPejabatData.length === 0) return; // Safety check
    
    const cycle = () => {
      setPejabatAnimate('out');
      setTimeout(() => {
        setPejabatIndex(prev => (prev + 1) % allPejabatData.length);
        setPejabatAnimate('in');
      }, 600); // Slower transition time
    };
    const interval = setInterval(cycle, 8000); // More time between changes
    return () => clearInterval(interval);
  }, [allPejabatData.length]);

  return (
    <div className="relative bg-gray-900 text-white">
      {/* Static background */}
      <div
        className="fixed inset-0 bg-fixed"
        style={{
          backgroundImage: 'url("/images/background.png")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col pl-12 pr-6 md:pl-20 md:pr-0 lg:pl-24">
        {/* Section 01 - Main Hero Section */}
        <section
          id="beranda"
          className="min-h-screen flex items-center justify-center px-2 md:px-6 mt-20 sm:mt-16 md:mt-20 lg:mt-0"
        >
          {/* Content */}
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Selamat Datang di<br />
              <span className="text-yellow-400">Website Nagari Lima Koto</span>
            </h1>
            
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            
            <p className="text-gray-200 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
              Portal Digital Resmi untuk Informasi Lengkap tentang Profil, Budaya, Berita, dan Data Statistik Nagari di Sumatera Barat
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-300 inline-block cursor-pointer">
                Jelajahi Profil Nagari
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 inline-block cursor-pointer">
                Baca Portal Berita
              </button>
            </div>
          </div>
        </section>

        {/* Section 02 - Features Section */}
        <section
          id="fitur"
          className="min-h-screen flex items-center justify-center px-2 md:px-6 mt-20 sm:mt-16 md:mt-20"
        >
          {/* Content */}
          <div className="text-center text-white max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Fitur-Fitur <span className="text-yellow-400">Website</span>
            </h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-10">
              Akses mudah ke berbagai informasi dan layanan digital Nagari yang dirancang khusus untuk memudahkan masyarakat
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-2 md:px-0">
              {featuresData.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  title={feature.title}
                  description={feature.description}
                  iconType={feature.iconType}
                  bgColor={feature.bgColor}
                  onClick={() => {
                    if (feature.link) {
                      if (feature.link.startsWith('#')) {
                        // For internal anchor links
                        const element = document.querySelector(feature.link);
                        element?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        // For external page links
                        window.location.href = feature.link;
                      }
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 03 - Struktur Pemerintahan */}
        <section
          id="struktur"
          className="min-h-screen flex items-center justify-center px-2 md:px-6 py-6 mt-20 sm:mt-16 md:mt-20"
        >
          <div className="w-full md:max-w-6xl mx-auto px-2 md:px-0 overflow-hidden">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                Struktur <span className="text-yellow-400">Pemerintahan</span>
              </h2>
              <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
              <p className="text-gray-200 text-lg max-w-3xl mx-auto">
                Struktur pemerintahan Nagari Lima Koto yang menjalankan pelayanan masyarakat
              </p>
            </div>
            
            {/* Single Struktur Card with Slider */}
            {allPejabatData.length > 0 ? (
            <div className="w-full overflow-hidden">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:items-stretch max-w-full">
                {/* Left side - Photo Card with fixed 3:4 aspect ratio */}
                <div className="md:w-1/3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 shadow-2xl h-full border border-white/10">
                    <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                      <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                        pejabatAnimate === 'out' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                      }`}>
                        <Image
                          src={allPejabatData[pejabatIndex].image}
                          alt={allPejabatData[pejabatIndex].name}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="rounded-2xl"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right side - Details outside the card with improved hierarchy */}
                <div className="md:w-2/3 flex flex-col justify-between text-white overflow-hidden min-w-0" style={{ minHeight: 'var(--photo-height, auto)' }}>
                  <div className="mb-4">
                    <div>
                      {/* Badge for position type */}
                      <div className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-medium rounded-full mb-2">
                        Perangkat Nagari
                      </div>
                      
                      {/* Primary heading - Person name */}
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-yellow-400 truncate">
                        {allPejabatData[pejabatIndex].name}
                      </h3>
                      
                      {/* Yellow divider */}
                      <div className="w-full h-px bg-yellow-400 my-3"></div>
                      
                      {/* Position title */}
                      <p className="text-xl md:text-2xl font-bold text-white truncate">
                        {allPejabatData[pejabatIndex].title}
                      </p>
                      
                      {/* Jorong info if available */}
                      {allPejabatData[pejabatIndex].jorong && (
                        <p className="text-sm text-yellow-200 font-medium tracking-wide uppercase truncate">
                          {allPejabatData[pejabatIndex].jorong}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className={`flex-grow transition-all duration-500 ease-in-out ${
                    pejabatAnimate === 'out' ? 'opacity-0' : 'opacity-100'
                  }`}>
                    {/* Description with word wrap and truncation */}
                    <p className="text-base md:text-lg text-gray-100/90 leading-relaxed max-w-2xl mt-4 break-words overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 6,
                      WebkitBoxOrient: 'vertical',
                      maxHeight: '7.5rem' // Fallback for line-clamp
                    }}>
                      {allPejabatData[pejabatIndex].description}
                    </p>
                  </div>
                  {/* Navigation buttons with improved styling - now aligned to bottom */}
                  <div className="flex justify-between pt-6">
                    <button
                      className="flex items-center gap-2 text-yellow-100/80 hover:text-yellow-400 transition-all duration-300 group"
                      onClick={() => {
                        setPejabatAnimate('out');
                        setTimeout(() => {
                          setPejabatIndex(prev => 
                            prev === 0 ? allPejabatData.length - 1 : prev - 1
                          );
                          setPejabatAnimate('in');
                        }, 300);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="font-medium">Sebelumnya</span>
                    </button>
                    <div className="text-sm text-gray-400">
                      {pejabatIndex + 1} dari {allPejabatData.length}
                    </div>
                    <button
                      className="flex items-center gap-2 text-yellow-100/80 hover:text-yellow-400 transition-all duration-300 group"
                      onClick={() => {
                        setPejabatAnimate('out');
                        setTimeout(() => {
                          setPejabatIndex(prev => (prev + 1) % allPejabatData.length);
                          setPejabatAnimate('in');
                        }, 300);
                      }}
                    >
                      <span className="font-medium">Selanjutnya</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            ) : (
              <div className="text-center text-white">
                <p className="text-gray-300">Data pejabat sedang dimuat...</p>
              </div>
            )}
          </div>
        </section>

        {/* Section 04 - Highlight Berita */}
        <section
          id="berita"
          className="min-h-screen px-2 md:px-6 mt-20 sm:mt-16 md:mt-20"
        >
          <div className="max-w-7xl mx-auto px-2 md:px-0">
            <div className="text-center text-white mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                Berita <span className="text-yellow-400">Terbaru</span>
              </h2>
              <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
              <p className="text-gray-200 text-lg max-w-3xl mx-auto">
                Berita terbaru seputar kegiatan dan perkembangan di Nagari Lima Koto
              </p>
            </div>
            
            {/* Show only 3 latest news for both desktop and mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {newsData && newsData.length > 0 ? (
                newsData
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 3)
                  .map((news) => (
                    <NewsCard 
                      key={news.id} 
                      {...news} 
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
              <Link 
                href="/berita" 
                className="inline-flex items-center px-6 py-3 border-white border-2 text-base font-semibold rounded-md text-white bg-transparent hover:bg-white hover:text-black transition"
              >
                Lihat Semua Berita
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 05 - FAQ */}
        <section
          id="faq"
          className="min-h-screen flex items-center justify-center px-2 md:px-6 w-full mt-20 sm:mt-16 md:mt-20"
        >
          <div className="text-center text-white w-full mx-auto mb-10 px-2 md:px-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              FAQ <span className="text-yellow-400">(Tanya Jawab)</span>
            </h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-12">
              Jawaban untuk pertanyaan yang sering diajukan seputar Nagari Lima Koto
            </p>
            <div className="text-left max-w-5xl md:w-[80%] lg:w-[75%] mx-auto">
              {currentFaqData.map((faq) => (
                <FAQCard
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  category={faq.category}
                  isExpanded={expandedFaqs.includes(faq.id)}
                  onToggle={() => toggleFaq(faq.id)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}