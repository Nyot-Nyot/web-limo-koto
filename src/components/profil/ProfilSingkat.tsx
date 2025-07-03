'use client';

import { useState, useEffect, useRef } from 'react';

export default function ProfilSingkat() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle touch events for swipe gesture
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentImageIndex((prev) => (prev + 1) % adatImages.length);
    }
    if (isRightSwipe) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? adatImages.length - 1 : prev - 1
      );
    }
  };
  
  const adatImages = [
    {
      src: "https://placehold.co/500x400",
      title: "Rumah Gadang",
      description: "Arsitektur tradisional"
    },
    {
      src: "https://placehold.co/500x400",
      title: "Tari Tradisional",
      description: "Seni budaya warisan"
    },
    {
      src: "https://placehold.co/500x400",
      title: "Upacara Adat",
      description: "Ritual tradisional"
    },
    {
      src: "https://placehold.co/500x400",
      title: "Pakaian Adat",
      description: "Busana tradisional"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % adatImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => 
          prev === 0 ? adatImages.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % adatImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-slide images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % adatImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [adatImages.length]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-8 py-24">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Content - Now on the left */}
        <div className="text-white space-y-6">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Profil <span className="text-yellow-400">Singkat</span>
            </h2>
            <div className="w-20 h-1 bg-yellow-400 mb-6"></div>
          </div>
          
          <div className="space-y-4 text-gray-200 leading-relaxed">
            <p>
              Nagari Lima Koto adalah salah satu nagari yang terletak di Kabupaten Sijunjung, 
              Sumatera Barat. Nagari ini memiliki kekayaan budaya dan tradisi yang telah 
              diwariskan secara turun-temurun.
            </p>
            <p>
              Dengan luas wilayah sekitar 45,2 km² dan jumlah penduduk kurang lebih 8.500 jiwa, 
              Nagari Lima Koto terdiri dari 5 korong yang masing-masing memiliki karakteristik 
              dan keunikan tersendiri.
            </p>
            <p>
              Mata pencaharian utama masyarakat adalah pertanian, perkebunan, dan perdagangan. 
              Nagari ini juga dikenal dengan hasil perkebunan karet, kelapa sawit, dan produk 
              pertanian lainnya.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="text-yellow-400 font-semibold text-lg">Luas Wilayah</h4>
              <p className="text-2xl font-bold">45,2 km²</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="text-yellow-400 font-semibold text-lg">Jumlah Penduduk</h4>
              <p className="text-2xl font-bold">8.500 jiwa</p>
            </div>
          </div>
        </div>

        {/* Stacked Image Cards - Now on the right */}
        <div className="relative h-80 md:h-96 mb-20 md:mb-24">
          {/* Stacked Cards Container */}
          <div 
            className="relative w-full h-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {adatImages.map((image, index) => {
              const isActive = index === currentImageIndex;
              const isNext = index === (currentImageIndex + 1) % adatImages.length;
              const isNextNext = index === (currentImageIndex + 2) % adatImages.length;
              
              let cardStyle = {};
              let cardClasses = "absolute transition-all duration-700 ease-out rounded-xl shadow-2xl cursor-pointer overflow-hidden";
              
              if (isActive) {
                // Active card - front and center
                cardStyle = {
                  transform: 'translateX(0) translateY(0) scale(1)',
                  zIndex: 30
                };
                cardClasses += " w-full h-full hover:scale-105";
              } else if (isNext) {
                // Next card - slightly visible on the right
                cardStyle = {
                  transform: isMobile 
                    ? 'translateX(70%) translateY(8%) scale(0.85)' 
                    : 'translateX(60%) translateY(5%) scale(0.9)',
                  zIndex: 20
                };
                cardClasses += " w-full h-full opacity-80 hover:scale-95 hover:opacity-90";
              } else if (isNextNext) {
                // Second next card - barely visible behind
                cardStyle = {
                  transform: isMobile 
                    ? 'translateX(85%) translateY(15%) scale(0.7)' 
                    : 'translateX(80%) translateY(10%) scale(0.8)',
                  zIndex: 10
                };
                cardClasses += " w-full h-full opacity-50 hover:scale-85 hover:opacity-70";
              } else {
                // Hidden cards
                cardStyle = {
                  transform: 'translateX(100%) translateY(20%) scale(0.7)',
                  zIndex: 0
                };
                cardClasses += " w-full h-full opacity-0";
              }

              return (
                <div
                  key={index}
                  className={cardClasses}
                  style={cardStyle}
                  onClick={() => setCurrentImageIndex(index)}
                  role="button"
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`View ${image.title}`}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                      <p className="text-gray-200 text-sm">{image.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots indicator */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {adatImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-125 active:scale-110 ${
                  index === currentImageIndex 
                    ? 'bg-yellow-400 shadow-lg' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button
              onClick={() => setCurrentImageIndex((prev) => 
                prev === 0 ? adatImages.length - 1 : prev - 1
              )}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 shadow-lg hover:scale-110 active:scale-95"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentImageIndex((prev) => 
                (prev + 1) % adatImages.length
              )}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 shadow-lg hover:scale-110 active:scale-95"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
