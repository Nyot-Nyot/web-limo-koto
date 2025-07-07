'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { kepalaJorongData, sekretarisData } from '@/data/pejabat';
import { beritaData } from '@/data/berita';
import BeritaCard from '@/components/BeritaCard';

export default function HeroSection() {
  const [kepalaIndex, setKepalaIndex] = useState(0);
  const [kepalaAnimate, setKepalaAnimate] = useState<'in' | 'out'>('in');
  const [sekretarisIndex, setSekretarisIndex] = useState(0);
  const [sekretarisAnimate, setSekretarisAnimate] = useState<'in' | 'out'>('in');
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
  
  // Effect for Kepala Jorong rotation with slide transition
  useEffect(() => {
    const cycle = () => {
      setKepalaAnimate('out');
      setTimeout(() => {
        setKepalaIndex(prev => (prev + 1) % kepalaJorongData.length);
        setKepalaAnimate('in');
      }, 600); // Slower transition time
    };
    const interval = setInterval(cycle, 6000); // More time between changes
    return () => clearInterval(interval);
  }, []);

  // Effect for Sekretaris rotation with slide transition
  useEffect(() => {
    const cycle = () => {
      setSekretarisAnimate('out');
      setTimeout(() => {
        setSekretarisIndex(prev => (prev + 1) % sekretarisData.length);
        setSekretarisAnimate('in');
      }, 600); // Slower transition time
    };
    const interval = setInterval(cycle, 6000); // More time between changes
    return () => clearInterval(interval);
  }, []);

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 w-full px-1 md:px-0 mx-auto">
              {/* Card 1 - Wali Nagari (static) */}
              <div 
                className="bg-white/90 backdrop-blur-sm rounded-lg p-2 md:p-4 text-center text-black h-[200px] md:h-[400px] flex flex-col transition-transform duration-300 mx-auto w-[80%] md:w-full"
              >
                <h3 className="text-base md:text-lg font-semibold">Wali Nagari</h3>
                <div className="h-1 md:h-4" /> {/* Reduced spacing on mobile */}
                <div className="relative w-full flex-1 overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src="/images/pejabat-1.jpg"
                      alt="Wali Nagari"
                      fill
                      style={{ objectFit: 'contain' }}
                      className="rounded-md"
                    />
                  </div>
                </div>
                <div className="mt-2 md:mt-4">
                  <p className="text-gray-600 text-xs md:text-sm">Dr. Sukirman, M.Pd</p>
                </div>
              </div>

              {/* Card 2 - Kepala Jorong (dynamic) */}
              {(() => {
                const item = kepalaJorongData[kepalaIndex];
                const nextItem = kepalaJorongData[(kepalaIndex + 1) % kepalaJorongData.length];
                return (
                  <div 
                    className="bg-white/90 backdrop-blur-sm rounded-lg p-2 md:p-4 text-center text-black h-[200px] md:h-[400px] flex flex-col relative transition-transform duration-300 mx-auto w-[80%] md:w-full"
                  >
                    <h3 className="text-base md:text-lg font-semibold -mt-2">Kepala Jorong</h3>
                    <div className="flex-1 relative overflow-hidden">
                      {/* Content container with absolute positioning for proper clipping */}
                      <div className={`absolute inset-0 flex flex-col transition-all duration-800 ease-in-out ${
                        kepalaAnimate === 'out'
                          ? '-translate-x-full blur-sm opacity-0' 
                          : 'translate-x-0 blur-0 opacity-100'
                      }`}>
                        <p className="text-xs md:text-sm text-gray-700">{item.jorong}</p>
                        <div className="h-1" />
                        <div className="relative flex-1 overflow-hidden rounded-md">
                          <div className="absolute inset-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              style={{ objectFit: 'contain' }}
                              className="rounded-md"
                            />
                          </div>
                        </div>
                        <div className="mt-2 md:mt-4">
                          <p className="text-gray-600 text-xs md:text-sm">{item.name}</p>
                        </div>
                      </div>
                      
                      {/* Incoming content from right */}
                      <div className={`absolute inset-0 flex flex-col transition-all duration-800 ease-in-out ${
                        kepalaAnimate === 'out'
                          ? 'translate-x-0 blur-0 opacity-100'
                          : 'translate-x-full blur-sm opacity-0'
                      }`}>
                        <p className="text-xs md:text-sm text-gray-700">{nextItem.jorong}</p>
                        <div className="h-1" />
                        <div className="relative flex-1 overflow-hidden rounded-md">
                          <div className="absolute inset-0">
                            <Image
                              src={nextItem.image}
                              alt={nextItem.name}
                              fill
                              style={{ objectFit: 'contain' }}
                              className="rounded-md"
                            />
                          </div>
                        </div>
                        <div className="mt-2 md:mt-4">
                          <p className="text-gray-600 text-xs md:text-sm">{nextItem.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Card 3 - Staff positions (dynamic) */}
              {(() => {
                const item = sekretarisData[sekretarisIndex];
                const nextItem = sekretarisData[(sekretarisIndex + 1) % sekretarisData.length];
                return (
                  <div 
                    className="bg-white/90 backdrop-blur-sm rounded-lg p-2 md:p-4 text-center text-black h-[200px] md:h-[400px] flex flex-col relative transition-transform duration-300 mx-auto w-[80%] md:w-full"
                  >
                    {/* Title container with relative positioning and overflow hidden */}
                    <div className="h-8 relative overflow-hidden mb-2">
                      {/* Outgoing title */}
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-800 ease-in-out ${
                        sekretarisAnimate === 'out'
                          ? '-translate-x-full blur-sm opacity-0'
                          : 'translate-x-0 blur-0 opacity-100'
                      }`}>
                        <h3 className="text-base md:text-lg font-semibold">{item.title}</h3>
                      </div>
                      {/* Incoming title from right */}
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-800 ease-in-out ${
                        sekretarisAnimate === 'out'
                          ? 'translate-x-0 blur-0 opacity-100'
                          : 'translate-x-full blur-sm opacity-0'
                      }`}>
                        <h3 className="text-base md:text-lg font-semibold">{nextItem.title}</h3>
                      </div>
                    </div>
                    
                    <div className="flex-1 relative overflow-hidden">
                      {/* Outgoing content */}
                      <div className={`absolute inset-0 flex flex-col transition-all duration-800 ease-in-out ${
                        sekretarisAnimate === 'out'
                          ? '-translate-x-full blur-sm opacity-0'
                          : 'translate-x-0 blur-0 opacity-100'
                      }`}>
                        <div className="relative flex-1 overflow-hidden rounded-md">
                          <div className="absolute inset-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              style={{ objectFit: 'contain' }}
                              className="rounded-md"
                            />
                          </div>
                        </div>
                        <div className="mt-2 md:mt-4">
                          <p className="text-gray-600 text-xs md:text-sm">{item.name}</p>
                        </div>
                      </div>
                      
                      {/* Incoming content from right */}
                      <div className={`absolute inset-0 flex flex-col transition-all duration-800 ease-in-out ${
                        sekretarisAnimate === 'out'
                          ? 'translate-x-0 blur-0 opacity-100'
                          : 'translate-x-full blur-sm opacity-0'
                      }`}>
                        <div className="relative flex-1 overflow-hidden rounded-md">
                          <div className="absolute inset-0">
                            <Image
                              src={nextItem.image}
                              alt={nextItem.title}
                              fill
                              style={{ objectFit: 'contain' }}
                              className="rounded-md"
                            />
                          </div>
                        </div>
                        <div className="mt-2 md:mt-4">
                          <p className="text-gray-600 text-xs md:text-sm">{nextItem.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
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