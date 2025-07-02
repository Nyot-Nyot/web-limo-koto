'use client';
// Sections order constant for scroll navigation
const sectionsOrder = ['01', '02', '03', '04', '05'];

// Add react hooks and wheel scrolling logic
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  activeSection?: string;
  onSectionChange: (section: string) => void;
}

export default function HeroSection({ activeSection = '01', onSectionChange }: HeroSectionProps) {
  const isScrolling = useRef(false);

  // Data for dynamic content
  const kepalaJorongData = [
    { jorong: 'Aur Gading', name: 'Tralalelo Tralala, S.Kom', image: '/images/pejabat-2.jpg' },
    { jorong: 'Koto Tongga', name: 'Sekretaris Dua, S.Kom', image: '/images/pejabat-3.jpg' },
    { jorong: 'Jorong XYZ', name: 'Sekretaris Tiga, S.E', image: '/images/pejabat-4.jpg' }
  ];

  const sekretarisData = [
    { name: 'Tung tung tung tung sahur, S.Pd', image: '/images/pejabat-5.jpg' },
    { name: 'Sekretaris Dua, S.Kom', image: '/images/pejabat-6.jpg' },
    { name: 'Sekretaris Tiga, S.E', image: '/images/pejabat-7.jpg' }
  ];

  const [kepalaIndex, setKepalaIndex] = useState(0);
  const [sekretarisIndex, setSekretarisIndex] = useState(0);

  // Effect for Kepala Jorong rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setKepalaIndex(prev => (prev + 1) % kepalaJorongData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [kepalaJorongData.length]);

  // Effect for Sekretaris rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setSekretarisIndex(prev => (prev + 1) % sekretarisData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sekretarisData.length]);

  // Wheel scrolling effect
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      isScrolling.current = true;
      const idx = sectionsOrder.indexOf(activeSection);
      if (e.deltaY > 0 && idx < sectionsOrder.length - 1) {
        onSectionChange(sectionsOrder[idx + 1]);
      } else if (e.deltaY < 0 && idx > 0) {
        onSectionChange(sectionsOrder[idx - 1]);
      }
      setTimeout(() => { isScrolling.current = false; }, 800);
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection, onSectionChange]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Static background */}
      <div
        className="absolute inset-0 bg-fixed"
        style={{
          backgroundImage: 'url("/images/Rectangle.png")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10">
        {/* Section 01 - Main Hero Section */}
        <div
          className={`absolute inset-0 h-screen flex items-center justify-center pl-16 md:pl-0 transition-all duration-700 ease-in-out ${
            activeSection === '01' ? 'opacity-100 translate-y-0 delay-700 pointer-events-auto' : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
        >
          {/* Content */}
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Selamat Datang di<br />
              <span className="text-yellow-400">Website Nagari Lima Koto</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
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
        </div>

        {/* Section 02 - Features Section */}
        <div
          className={`absolute inset-0 h-screen flex items-center justify-center pl-16 md:pl-0 transition-all duration-700 ease-in-out ${
            activeSection === '02' ? 'opacity-100 translate-y-0 delay-700 pointer-events-auto' : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
        >
          {/* Content */}
          <div className="text-center text-white px-4 max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Fitur-Fitur Website
            </h2>
            
            <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Akses mudah ke berbagai informasi dan layanan digital Nagari yang dirancang khusus untuk kemudahan masyarakat
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                <h3 className="text-lg font-semibold mb-2">Wali Nagari</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Sejarah kepemimpinan Wali Nagari dari masa ke masa
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
                  Data demografis dan statistik penduduk per Jorong
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 03 - Struktur Kepegawaian */}
        <div
          className={`absolute inset-0 h-screen flex items-center justify-center pl-16 md:pl-0 transition-all duration-700 ease-in-out ${
            activeSection === '03' ? 'opacity-100 translate-y-0 delay-700 pointer-events-auto' : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
        >
          <div className="px-4 max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white text-center">
              Struktur Kepegawaian
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 - Wali Nagari (static) */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center text-black h-[400px] flex flex-col">
                <h3 className="text-lg font-semibold">Wali Nagari</h3>
                <div className="h-4" /> {/* Consistent spacing */}
                <div className="relative w-full h-[280px] flex-shrink-0">
                  <Image
                    src="/images/pejabat-1.jpg"
                    alt="Wali Nagari"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                  />
                </div>
                <div className="flex-grow flex items-center justify-center">
                  <p className="text-gray-600 text-sm">Dr. Sukirman, M.Pd</p>
                </div>
              </div>

              {/* Card 2 - Kepala Jorong (dynamic) */}
              {(() => {
                const item = kepalaJorongData[kepalaIndex];
                return (
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center text-black h-[400px] flex flex-col">
                    <h3 className="text-lg font-semibold">Kepala Jorong</h3>
                    <p className="text-sm text-gray-700 mt-1">{item.jorong}</p>
                    <div className="h-1" /> {/* Small adjustment for subtitle */}
                    <div className="relative w-full h-[280px] flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex-grow flex items-center justify-center">
                      <p className="text-gray-600 text-sm">{item.name}</p>
                    </div>
                  </div>
                );
              })()}

              {/* Card 3 - Sekretaris (dynamic) */}
              {(() => {
                const item = sekretarisData[sekretarisIndex];
                return (
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center text-black h-[400px] flex flex-col">
                    <h3 className="text-lg font-semibold">Sekretaris</h3>
                    <div className="h-4" /> {/* Consistent spacing */}
                    <div className="relative w-full h-[280px] flex-shrink-0">
                      <Image
                        src={item.image}
                        alt="Sekretaris"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex-grow flex items-center justify-center">
                      <p className="text-gray-600 text-sm">{item.name}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Section 04 - Placeholder for Future Content */}
        <div
          className={`absolute inset-0 h-screen flex items-center justify-center pl-16 md:pl-0 transition-all duration-700 ease-in-out ${
            activeSection === '04' ? 'opacity-100 translate-y-0 delay-700 pointer-events-auto' : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
        >
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Section 04 Content
            </h2>
            <p className="text-lg md:text-xl mb-8">Coming soon...</p>
          </div>
        </div>

        {/* Section 05 - Placeholder for Future Content */}
        <div
          className={`absolute inset-0 h-screen flex items-center justify-center pl-16 md:pl-0 transition-all duration-700 ease-in-out ${
            activeSection === '05' ? 'opacity-100 translate-y-0 delay-700 pointer-events-auto' : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
        >
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Section 05 Content
            </h2>
            <p className="text-lg md:text-xl mb-8">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}