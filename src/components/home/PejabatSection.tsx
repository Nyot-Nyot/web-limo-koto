'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

interface PejabatData {
  id: string;
  name: string;
  title: string;
  image: string;
  jorong?: string;
  description: string;
}

interface PejabatSectionProps {
  pejabatData: PejabatData[];
}

export default function PejabatSection({ pejabatData }: PejabatSectionProps) {
  const [pejabatIndex, setPejabatIndex] = useState(0);
  const [pejabatAnimate, setPejabatAnimate] = useState<'in' | 'out'>('in');

  // Memoize current pejabat untuk performance, handle out-of-bounds pejabatIndex explicitly
  const currentPejabat = useMemo(() => {
    if (
      pejabatIndex < 0 ||
      pejabatIndex >= pejabatData.length ||
      pejabatData.length === 0
    ) {
      return undefined;
    }
    return pejabatData[pejabatIndex];
  }, [pejabatData, pejabatIndex]);

  // Optimized timer management
  useEffect(() => {
    if (pejabatData.length === 0) return;
    
    const cycle = () => {
      setPejabatAnimate('out');
      setTimeout(() => {
        setPejabatIndex(prev => (prev + 1) % pejabatData.length);
        setPejabatAnimate('in');
      }, 600);
    };
    
    const interval = setInterval(cycle, 8000);
    
    // Proper cleanup
    return () => {
      clearInterval(interval);
    };
  }, [pejabatData]);

  if (!currentPejabat) return null;

  return (
    <section id="struktur" className="min-h-screen flex items-center justify-center px-2 md:px-6 py-6 mt-20 sm:mt-16 md:mt-20">
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
        {pejabatData.length > 0 ? (
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
                        src={currentPejabat.image}
                        alt={currentPejabat.name}
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
                      {currentPejabat.name}
                    </h3>
                    
                    {/* Yellow divider */}
                    <div className="w-full h-px bg-yellow-400 my-3"></div>
                    
                    {/* Position title */}
                    <p className="text-xl md:text-2xl font-bold text-white truncate">
                      {currentPejabat.title}
                    </p>
                    
                    {/* Jorong info if available */}
                    {currentPejabat.jorong && (
                      <p className="text-sm text-yellow-200 font-medium tracking-wide uppercase truncate">
                        {currentPejabat.jorong}
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
                    {currentPejabat.description}
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
                          prev === 0 ? pejabatData.length - 1 : prev - 1
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
                    {pejabatIndex + 1} dari {pejabatData.length}
                  </div>
                  <button
                    className="flex items-center gap-2 text-yellow-100/80 hover:text-yellow-400 transition-all duration-300 group"
                    onClick={() => {
                      setPejabatAnimate('out');
                      setTimeout(() => {
                        setPejabatIndex(prev => (prev + 1) % pejabatData.length);
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
  );
} 