'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { ADAT_IMAGES, PERFORMANCE_CONFIG } from './constants';
import { useGaleriFirestore } from '@/lib/galeriService';
import type { GalleryItem } from '@/data/galeri';

// Optimized touch handlers
const useTouchHandlers = (onPrevious: () => void, onNext: () => void) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > PERFORMANCE_CONFIG.TOUCH_SWIPE_THRESHOLD;
    const isRightSwipe = distance < -PERFORMANCE_CONFIG.TOUCH_SWIPE_THRESHOLD;

    if (isLeftSwipe) onNext();
    if (isRightSwipe) onPrevious();
  }, [onNext, onPrevious]);

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};

// Optimized mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    checkMobile();
    const handleResize = () => checkMobile();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

// Optimized image slider hook
const useImageSlider = (totalImages: number) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }, PERFORMANCE_CONFIG.AUTO_SLIDE_INTERVAL);
  }, [totalImages]);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) => prev === 0 ? totalImages - 1 : prev - 1);
    resetAutoSlide();
  }, [totalImages, resetAutoSlide]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    resetAutoSlide();
  }, [totalImages, resetAutoSlide]);

  const goToSlide = useCallback((index: number) => {
    setCurrentImageIndex(index);
    resetAutoSlide();
  }, [resetAutoSlide]);

  // Auto-slide effect
  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetAutoSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      else if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  return {
    currentImageIndex,
    goToPrevious,
    goToNext,
    goToSlide
  };
};

const getRandomUniqueItems = <T,>(arr: T[], count: number): T[] => {
  if (arr.length <= count) return arr;
  const result: T[] = [];
  const used = new Set<number>();
  while (result.length < count) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
  }
  return result;
};

// Memoized components
const StatCard = memo(({ title, value }: { title: string; value: string }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
    <h4 className="text-yellow-400 font-semibold text-lg">{title}</h4>
    <p className="text-2xl font-bold">{value}</p>
  </div>
));

StatCard.displayName = 'StatCard';

const ImageCard = memo(({ 
  image, 
  index, 
  currentIndex, 
  totalImages, 
  isMobile,
  onClick 
}: {
  image: { src: string; title: string; description: string };
  index: number;
  currentIndex: number;
  totalImages: number;
  isMobile: boolean;
  onClick: () => void;
}) => {
  const isActive = index === currentIndex;
  const isNext = index === (currentIndex + 1) % totalImages;
  const isNextNext = index === (currentIndex + 2) % totalImages;
  
  let cardStyle = {};
  let cardClasses = "absolute transition-all duration-700 ease-out rounded-xl shadow-2xl cursor-pointer overflow-hidden";
  
  if (isActive) {
    cardStyle = {
      transform: 'translateX(0) translateY(0) scale(1)',
      zIndex: 30
    };
    cardClasses += " w-full h-full hover:scale-105";
  } else if (isNext) {
    cardStyle = {
      transform: isMobile 
        ? 'translateX(70%) translateY(8%) scale(0.85)' 
        : 'translateX(60%) translateY(5%) scale(0.9)',
      zIndex: 20
    };
    cardClasses += " w-full h-full opacity-80 hover:scale-95 hover:opacity-90";
  } else if (isNextNext) {
    cardStyle = {
      transform: isMobile 
        ? 'translateX(85%) translateY(15%) scale(0.7)' 
        : 'translateX(80%) translateY(10%) scale(0.8)',
      zIndex: 10
    };
    cardClasses += " w-full h-full opacity-50 hover:scale-85 hover:opacity-70";
  } else {
    return null;
  }

  return (
    <div 
      className={cardClasses}
      style={cardStyle}
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        <img 
          src={image.src}
          alt={image.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h4 className="font-bold text-lg">{image.title}</h4>
          <p className="text-sm opacity-80">{image.description}</p>
        </div>
      </div>
    </div>
  );
});

ImageCard.displayName = 'ImageCard';

const ProfilSingkat = memo(() => {
  const isMobile = useIsMobile();
  const { data: galeri, loading, error } = useGaleriFirestore();

  // Ambil 5 gambar random dari galeri jika ada, fallback ke ADAT_IMAGES
  let images: { src: string; title: string; description: string }[] = [];
  if (!loading && galeri && galeri.length > 0) {
    images = getRandomUniqueItems(
      galeri.map((item: GalleryItem) => ({
        src: item.image,
        title: item.title,
        description: item.description
      })),
      5
    );
  } else {
    images = getRandomUniqueItems([...ADAT_IMAGES], 5);
  }

  const { currentImageIndex, goToPrevious, goToNext, goToSlide } = useImageSlider(images.length);
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchHandlers(goToPrevious, goToNext);

  if (loading) {
    return (
      <div className="flex items-center justify-center px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Profil <span className="text-yellow-400">Singkat</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-200 text-base md:text-lg">Memuat gambar...</p>
        </div>
      </div>
    );
  }

  if (error) {
    // Tetap tampilkan slider dengan ADAT_IMAGES jika error
    images = getRandomUniqueItems([...ADAT_IMAGES], 5);
  }

  return (
    <div className="flex items-center justify-center px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Content */}
        <div className="text-white space-y-6">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Profil <span className="text-yellow-400">Singkat</span>
            </h2>
            <div className="w-20 h-1 bg-yellow-400 mb-6"></div>
          </div>
          
          <div className="space-y-4 text-gray-200 leading-relaxed">
            <p>
              Nagari Limo Koto adalah salah satu nagari adat di Kecamatan Koto VII, Kabupaten Sijunjung. Nagari ini merupakan himpunan suku dan koto yang bersatu dalam tatanan adat, dengan wilayah dan kekayaan yang diwarisi secara turun-temurun sejak berdirinya nagari.
            </p>
            <p>
              Dengan luas wilayah sekitar 4.572 Ha dan jumlah penduduk lebih dari 10.000 jiwa, Nagari Limo Koto terdiri dari lima korong. Setiap korong memiliki sejarah, adat, dan peranan tersendiri dalam struktur masyarakat. Kepemimpinan adat dijalankan oleh Datuak Nan Balimo, yaitu lima penghulu utama yang mewakili suku dan wilayahnya, dibantu oleh unsur Urang Ampek Jinih sebagai penjaga nilai adat dan sosial.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8">
            <StatCard title="Luas Wilayah" value="4.572 Ha" />
            <StatCard title="Jumlah Penduduk" value="10.000+ jiwa" />
          </div>
        </div>

        {/* Image Slider */}
        <div className="relative h-80 md:h-96 mb-20 md:mb-24">
          <div 
            className="relative w-full h-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >   
            {images.map((image, index) => (
              <ImageCard
                key={index}
                image={image}
                index={index}
                currentIndex={currentImageIndex}
                totalImages={images.length}
                isMobile={isMobile}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>

          {/* Dots indicator */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
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
              onClick={goToPrevious}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 shadow-lg hover:scale-110 active:scale-95"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
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
});

ProfilSingkat.displayName = 'ProfilSingkat';

export default ProfilSingkat;
