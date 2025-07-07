'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { kepalaJorongData, sekretarisData, waliNagariData } from '@/data/pejabat';
import { beritaData } from '@/data/berita';
import BeritaCard from '@/components/BeritaCard';

export default function HeroSection() {
  // Combined state for all officials
  const [pejabatIndex, setPejabatIndex] = useState(0);
  const [pejabatAnimate, setPejabatAnimate] = useState<'in' | 'out'>('in');
  const [allPejabatData, setAllPejabatData] = useState([
    waliNagariData,
    ...kepalaJorongData,
    ...sekretarisData
  ]);
  
  const [activePage, setActivePage] = useState(0);
  const [beritaAnimate, setBeritaAnimate] = useState<'in' | 'out'>('in');
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };
  
  // Effect for Perangkat Nagari rotation with slide transition
  useEffect(() => {
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

  // Effect for Berita rotation on mobile
  useEffect(() => {
    const cycle = () => {
      setBeritaAnimate('out');
      setTimeout(() => {
        setActivePage(prev => (prev + 1) % beritaData.length);
        setBeritaAnimate('in');
      }, 300);
    };
    const interval = setInterval(cycle, 8000); // 8 seconds between news changes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gray-900 text-white">
      {/* Static background */}
      <div
        className="fixed inset-0 bg-fixed"
        style={{
          backgroundImage: 'url("/images/Rectangle.png")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col pl-12 md:pl-20 lg:pl-24">
        {/* Section 01 - Main Hero Section */}
        <section
          id="beranda"
          className="min-h-screen flex items-center justify-center px-0 md:px-6"
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
          className="min-h-screen flex items-center justify-center px-0 md:px-6"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Card 1 - Profil Nagari */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-black hover:bg-white transition-all duration-300 group">
                <div className="mb-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Profil Nagari</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Informasi lengkap tentang sejarah, visi, misi, dan profil Nagari
                </p>
              </div>

              {/* Card 2 - Adat Istiadat */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-black hover:bg-white transition-all duration-300 group">
                <div className="mb-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Adat Istiadat</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Tradisi dan budaya dari 10 Jorong yang ada di Nagari
                </p>
              </div>

              {/* Card 3 - Berita dan Agenda */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-black hover:bg-white transition-all duration-300 group">
                <div className="mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Berita dan Agenda</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Berita terkini dan informasi penting seputar Nagari
                </p>
              </div>

              {/* Card 4 - Wali Nagari */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-black hover:bg-white transition-all duration-300 group">
                <div className="mb-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Struktur pemerintahan</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Struktur pemerintahan yang terdapat pada nagari limo koto
                </p>
              </div>

              {/* Card 5 - Galeri */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-black hover:bg-white transition-all duration-300 group">
                <div className="mb-3">
                  <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Galeri</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Dokumentasi kegiatan dan keindahan alam Nagari
                </p>
              </div>

              {/* Card 6 - Statistik */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-black hover:bg-white transition-all duration-300 group">
                <div className="mb-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Statistik</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Data demografis dan statistik penduduk nagari limo koto
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03 - Struktur Pemerintahan */}
        <section
          id="struktur"
          className="min-h-screen flex items-center justify-center px-0 md:px-6 py-6"
        >
          <div className="w-full md:max-w-6xl mx-auto">
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
            <div className="w-full px-4">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:items-stretch">
                {/* Left side - Photo Card with fixed 3:4 aspect ratio */}
                <div className="md:w-1/3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg h-full">
                    <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                      <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                        pejabatAnimate === 'out' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                      }`}>
                        <Image
                          src={allPejabatData[pejabatIndex].image}
                          alt={allPejabatData[pejabatIndex].name}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="rounded-lg"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right side - Details outside the card with improved hierarchy */}
                <div className="md:w-2/3 flex flex-col justify-between text-white" style={{ minHeight: 'var(--photo-height, auto)' }}>
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        {/* Badge for position type */}
                        <div className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-medium rounded-full mb-2">
                          Perangkat Nagari
                        </div>
                        
                        {/* Primary heading - Person name */}
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-yellow-400">
                          {allPejabatData[pejabatIndex].name}
                        </h3>
                        
                        {/* Yellow divider */}
                        <div className="w-full h-px bg-yellow-400 my-3"></div>
                        
                        {/* Position title */}
                        <p className="text-xl md:text-2xl font-bold text-white">
                          {allPejabatData[pejabatIndex].title}
                        </p>
                        
                        {/* Jorong info if available */}
                        {allPejabatData[pejabatIndex].jorong && (
                          <p className="text-sm text-yellow-200 font-medium tracking-wide uppercase">
                            {allPejabatData[pejabatIndex].jorong}
                          </p>
                        )}
                      </div>
                      
                      {/* Navigation dots */}
                      <div className="flex gap-2">
                        {allPejabatData.map((_, idx) => (
                          <button
                            key={`pejabat-dot-${idx}`}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              idx === pejabatIndex 
                                ? 'bg-yellow-500 scale-110' 
                                : 'bg-gray-400/50 hover:bg-gray-300'
                            }`}
                            onClick={() => {
                              if (idx !== pejabatIndex) {
                                setPejabatAnimate('out');
                                setTimeout(() => {
                                  setPejabatIndex(idx);
                                  setPejabatAnimate('in');
                                }, 300);
                              }
                            }}
                            aria-label={`View ${allPejabatData[idx].name}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`flex-grow transition-all duration-500 ease-in-out ${
                    pejabatAnimate === 'out' ? 'opacity-0' : 'opacity-100'
                  }`}>
                    {/* Description with improved readability */}
                    <p className="text-base md:text-lg text-gray-100/90 leading-relaxed max-w-2xl mt-4">
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
          </div>
        </section>

        {/* Section 04 - Highlight Berita */}
        <section
          id="berita"
          className="min-h-screen px-0 md:px-6 py-16"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-white mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                <span className="text-yellow-400">Berita</span>
              </h2>
              <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
              <p className="text-gray-200 text-lg max-w-3xl mx-auto">
                Informasi terbaru seputar kegiatan dan perkembangan di Nagari Lima Koto
              </p>
            </div>
            
            {/* Desktop View - Show all cards in grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {beritaData.map((berita) => (
                <BeritaCard key={berita.id} berita={berita} />
              ))}
            </div>
            
            {/* Mobile View - Show cards with pagination */}
            <div className="md:hidden">
              {/* Current active card */}
              <div className="mb-6">
                <BeritaCard berita={beritaData[activePage]} animated={true} animationState={beritaAnimate} />
              </div>
              
              {/* Navigation arrows + dots */}
              <div className="flex justify-between items-center mt-4 mb-8 px-4">
                <button 
                  onClick={() => {
                    setBeritaAnimate('out');
                    setTimeout(() => {
                      setActivePage(prev => prev === 0 ? beritaData.length - 1 : prev - 1);
                      setBeritaAnimate('in');
                    }, 300);
                  }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                  aria-label="Previous news"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="flex gap-2">
                  {beritaData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (index !== activePage) {
                          setBeritaAnimate('out');
                          setTimeout(() => {
                            setActivePage(index);
                            setBeritaAnimate('in');
                          }, 300);
                        }
                      }}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        activePage === index ? 'bg-blue-500' : 'bg-gray-500 hover:bg-gray-400'
                      }`}
                      aria-label={`View news item ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={() => {
                    setBeritaAnimate('out');
                    setTimeout(() => {
                      setActivePage(prev => (prev + 1) % beritaData.length);
                      setBeritaAnimate('in');
                    }, 300);
                  }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                  aria-label="Next news"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
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

        {/* Section 05 - FAQ */}
        <section
          id="faq"
          className="min-h-screen flex items-center justify-center px-0 md:px-6 w-full"
        >
          <div className="text-center text-white w-full mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              FAQ <span className="text-yellow-400">(Tanya Jawab)</span>
            </h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-12">
              Jawaban untuk pertanyaan yang sering diajukan seputar Nagari Lima Koto
            </p>
            <div className="text-left max-w-5xl md:w-[80%] lg:w-[75%] mx-auto">
              {/* FAQ Item 1 */}
              <div className="mb-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-t-lg">
                  {/* Question header with arrow */}
                  <div className="px-4 pt-4  flex justify-between items-center">
                    <h3 className="font-bold text-lg text-black">Apa saja layanan yang tersedia?</h3>
                    <button 
                      className="p-1 transition-transform duration-200 cursor-pointer hover:bg-gray-100 rounded-full"
                      aria-label="Toggle FAQ"
                      onClick={() => toggleFaq(0)}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 text-black transition-transform duration-200 ${expandedFaqs.includes(0) ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Category bar */}
                  <div className="flex px-4 py-2">
                    <span className="bg-gray-100 py-1 px-3 mb-2 text-xs text-gray-600 rounded-md">
                      Layanan
                    </span>
                  </div>
                  
                  {/* Answer container - only shows when expanded */}
                  {expandedFaqs.includes(0) && (
                    <div className="bg-white p-4 rounded-b-lg mb-4">
                      <p className="text-black">Website ini menyediakan informasi profil nagari, berita terbaru, data statistik, galeri kegiatan, dan informasi layanan publik lainnya.</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* FAQ Item 2 */}
              <div className="mb-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-t-lg">
                  {/* Question header with arrow */}
                  <div className="px-4 pt-4  flex justify-between items-center">
                    <h3 className="font-bold text-lg text-black">Bagaimana cara menghubungi kantor nagari?</h3>
                    <button 
                      className="p-1 transition-transform duration-200 cursor-pointer hover:bg-gray-100 rounded-full"
                      aria-label="Toggle FAQ"
                      onClick={() => toggleFaq(1)}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 text-black transition-transform duration-200 ${expandedFaqs.includes(1) ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Category bar */}
                  <div className="flex px-4 py-2">
                    <span className="bg-gray-100 py-1 px-3 mb-2 text-xs text-gray-600 rounded-md">
                      Kontak
                    </span>
                  </div>
                  
                  {/* Answer container - only shows when expanded */}
                  {expandedFaqs.includes(1) && (
                    <div className="bg-white p-4 rounded-b-lg mb-4">
                      <p className="text-black">Anda dapat menemukan informasi kontak lengkap, termasuk alamat dan nomor telepon, di halaman profil kami.</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* FAQ Item 3 */}
              <div className="mb-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-t-lg">
                  {/* Question header with arrow */}
                  <div className="px-4 pt-4 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-black">Apakah ada data statistik penduduk?</h3>
                    <button 
                      className="p-1 transition-transform duration-200 cursor-pointer hover:bg-gray-100 rounded-full"
                      aria-label="Toggle FAQ"
                      onClick={() => toggleFaq(2)}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 text-black transition-transform duration-200 ${expandedFaqs.includes(2) ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Category bar */}
                  <div className="flex px-4 py-2">
                    <span className="bg-gray-100 py-1 px-3 mb-2 text-xs text-gray-600 rounded-md">
                      Data
                    </span>
                  </div>
                  
                  {/* Answer container - only shows when expanded */}
                  {expandedFaqs.includes(2) && (
                    <div className="bg-white p-4 rounded-b-lg mb-4">
                      <p className="text-black">Ya, kami menyediakan data demografi dan statistik penduduk per jorong yang diperbarui secara berkala.</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* FAQ Item 4 */}
              <div>
                <div className="bg-white/80 backdrop-blur-sm rounded-t-lg">
                  {/* Question header with arrow */}
                  <div className="px-4 pt-4 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-black">Apa saja tradisi budaya yg ada di nagari ini?</h3>
                    <button 
                      className="p-1 transition-transform duration-200 cursor-pointer hover:bg-gray-100 rounded-full"
                      aria-label="Toggle FAQ"
                      onClick={() => toggleFaq(3)}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 text-black transition-transform duration-200 ${expandedFaqs.includes(3) ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Category bar */}
                  <div className="flex px-4 py-2">
                    <span className="bg-gray-100 py-1 px-3 mb-2 text-xs text-gray-600 rounded-md">
                      Adat
                    </span>
                  </div>
                  
                  {/* Answer container - only shows when expanded */}
                  {expandedFaqs.includes(3) && (
                    <div className="bg-white p-4 rounded-b-lg mb-4">
                      <p className="text-black">Nagari ini memiliki berbagai tradisi budaya seperti upacara adat, tarian tradisional, dan festival tahunan.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}