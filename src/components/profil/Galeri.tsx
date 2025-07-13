'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { galeriCategories, GalleryItem } from '@/data/galeri';
import { useGalleryData } from '@/context/DataContext';

export default function Galeri() {
  const [activeCategory, setActiveCategory] = useState('makanan');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loadingImages, setLoadingImages] = useState<Set<string | number>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [imageTransition, setImageTransition] = useState(false);
  
  // Use centralized data from context
  const { data: galleryItems } = useGalleryData();

  // Group items by category - cast the data to the expected type
  const galleries = galleryItems.reduce((acc, item) => {
    const galleryItem = item as GalleryItem; // Cast to handle type compatibility
    if (!acc[galleryItem.category]) {
      acc[galleryItem.category] = [];
    }
    acc[galleryItem.category].push(galleryItem);
    return acc;
  }, {} as Record<string, GalleryItem[]>);

  // Reset selected image when category changes
  useEffect(() => {
    setSelectedImage(null);
    // Reset scroll position
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [activeCategory]);

  // Get current gallery
  const currentGallery = galleries[activeCategory as keyof typeof galleries] || [];
  const selectedItem = selectedImage !== null ? currentGallery[selectedImage] : null;

  // Handle image click with animation
  const handleImageClick = (index: number) => {
    if (selectedImage === index) return;
    
    setImageTransition(true);
    setTimeout(() => {
      setSelectedImage(index);
      setTimeout(() => {
        setImageTransition(false);
      }, 50);
    }, 200);
  };

  // Handle scroll navigation with smooth transition - one column at a time
  const scrollToPrev = () => {
    if (scrollContainerRef.current) {
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const itemWidth = 320; // One column width including gap
      
      scrollContainerRef.current.scrollTo({
        left: currentScroll - itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const itemWidth = 320; // One column width including gap
      
      scrollContainerRef.current.scrollTo({
        left: currentScroll + itemWidth,
        behavior: 'smooth'
      });
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleImageClick(index);
    }
  };

  // Handle image loading
  const handleImageLoad = (imageId: string | number) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageId);
      return newSet;
    });
  };

  const handleImageLoadStart = (imageId: string | number) => {
    setLoadingImages(prev => new Set(prev).add(imageId));
  };

  // Touch/Mouse drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Galeri <span className="text-yellow-400">Nagari</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Koleksi foto yang menampilkan kekayaan budaya, kuliner, dan keindahan alam Nagari Lima Koto
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-4 mb-12 px-2">
          {galeriCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full font-medium md:font-semibold transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-yellow-400 text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Main Gallery Layout */}
        <div className={`grid gap-8 lg:gap-16 transition-all duration-500 ${
          selectedImage !== null 
            ? 'grid-cols-1 lg:grid-cols-12' 
            : 'grid-cols-1'
        }`}>
          {/* Left Sidebar - Description - Only show when image is selected */}
          {selectedImage !== null && (
            <div className="lg:col-span-5 order-2 lg:order-1 relative z-5">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 sticky top-8">
                <div className={`image-transition ${imageTransition ? 'transitioning' : ''} ${selectedImage !== null ? 'content-enter' : ''}`}>
                  {/* Image Preview */}
                  <div className="mb-6">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10 relative shadow-lg">
                      <Image
                        src={selectedItem?.image || 'https://placehold.co/400x300'}
                        alt={selectedItem?.title || ''}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="mb-4">
                    <span className="text-xl lg:text-2xl font-bold text-yellow-400">
                      {String(selectedImage + 1).padStart(2, '0')}
                    </span>
                    <span className="text-gray-400 ml-2 text-sm">
                      {galeriCategories.find(cat => cat.id === activeCategory)?.name}
                    </span>
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 leading-tight">
                    {selectedItem?.title}
                  </h3>
                  
                  <div className="w-16 h-0.5 bg-yellow-400 mb-4"></div>
                  
                  <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                    {selectedItem?.description}
                  </p>
                  
                  {/* Navigation Info */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="font-medium">{selectedImage + 1} dari {currentGallery.length}</span>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                          disabled={selectedImage === 0}
                          className="p-3 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setSelectedImage(Math.min(currentGallery.length - 1, selectedImage + 1))}
                          disabled={selectedImage === currentGallery.length - 1}
                          className="p-3 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Image Gallery */}
          <div className={`order-1 lg:order-2 relative z-10 ${
            selectedImage !== null ? 'lg:col-span-7' : 'col-span-1'
          }`}>
            {/* Album Section Title */}
            <div className="mb-8 px-4">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Album Kegiatan {galeriCategories.find(cat => cat.id === activeCategory)?.name}
              </h3>
              <div className="w-20 h-1 bg-yellow-400 mb-4"></div>
            </div>

            {/* Gallery Horizontal Scroll Layout - 2 rows */}
            <div className="relative overflow-visible">
              {/* Scrollable Gallery Container */}
              <div 
                ref={scrollContainerRef}
                className="gallery-container"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {currentGallery.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => handleImageClick(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View ${item.title}`}
                    className={`gallery-item cursor-pointer transition-all duration-300 group ${
                      selectedImage === index 
                        ? 'active' 
                        : 'hover:scale-[1.03] opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 relative shadow-lg hover:shadow-xl transition-shadow duration-300 z-10">
                      {/* Loading skeleton */}
                      {loadingImages.has(item.id) && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                          <div className="w-8 h-8 border-2 border-gray-300 border-t-yellow-400 rounded-full animate-spin"></div>
                        </div>
                      )}
                      
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        onLoadStart={() => handleImageLoadStart(item.id)}
                        onLoad={() => handleImageLoad(item.id)}
                        onError={() => handleImageLoad(item.id)}
                      />
                      
                      {/* Overlay with title */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-3 w-full">
                          <h4 className="text-white text-sm font-medium">
                            {item.title}
                          </h4>
                        </div>
                      </div>

                      {/* Active indicator */}
                      {selectedImage === index && (
                        <div className="absolute top-3 right-3 w-3 h-3 bg-yellow-400 rounded-full active-indicator"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Controls - Below the grid */}
              <div className="flex items-center justify-center gap-6 mt-8">
                <button
                  onClick={scrollToPrev}
                  className="nav-btn w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                  aria-label="Previous images"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={scrollToNext}
                  className="nav-btn w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                  aria-label="Next images"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation hint */}
            <div className="text-center mt-8">
              <p className="text-gray-400 text-base">
                {selectedImage !== null 
                  ? `Gambar ${selectedImage + 1} dari ${currentGallery.length} dipilih` 
                  : 'Klik gambar untuk melihat detail dan deskripsi lengkap'
                } • Total {currentGallery.length} gambar
              </p>
              <p className="text-gray-500 text-sm mt-2">
                🎯 Gunakan tombol navigasi atau drag untuk melihat gambar lainnya
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Album Kegiatan <span className="text-yellow-400">Nagari Lima Koto</span>
            </h3>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              Dokumentasi lengkap berbagai kegiatan dan kekayaan yang dimiliki oleh Nagari Lima Koto
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-3xl font-bold text-yellow-400 leading-tight">Pemerintahan</div>
                <div className="text-white text-xs sm:text-sm mt-1">Album Kegiatan</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-3xl font-bold text-yellow-400 leading-tight">Sosial & Budaya</div>
                <div className="text-white text-xs sm:text-sm mt-1">Album Kegiatan</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-3xl font-bold text-yellow-400 leading-tight">Pembangunan</div>
                <div className="text-white text-xs sm:text-sm mt-1">Infrastruktur</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-3xl font-bold text-yellow-400 leading-tight">Wisata</div>
                <div className="text-white text-xs sm:text-sm mt-1">& Kuliner</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Gallery grid flow styling with smooth scrolling */
        .gallery-container {
          display: grid;
          grid-template-rows: repeat(2, 1fr);
          grid-auto-flow: column;
          grid-auto-columns: 18rem; /* Fixed width for consistent spacing */
          gap: 2rem; /* Increased gap for more breathing room */
          overflow-x: auto;
          overflow-y: visible; /* Allow vertical overflow for scaled images */
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 2rem 2rem 2rem 3rem; /* Extra padding for scaled images, especially left */
          margin: -1rem -1rem -1rem -2rem; /* Negative margin to compensate */
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
        }
        
        .gallery-container::-webkit-scrollbar {
          display: none;
        }
        
        /* Ensure proper spacing and prevent overlap */
        .gallery-item {
          width: 18rem; /* Match grid-auto-columns */
          flex-shrink: 0;
          scroll-snap-align: start;
          position: relative;
          z-index: 8;
        }
        
        /* Enhanced navigation button styling */
        .nav-btn {
          backdrop-filter: blur(8px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-btn:hover {
          background-color: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        .nav-btn:active {
          transform: scale(0.95);
        }
        
        /* Enhanced slide transition animations */
        @keyframes slideInFromRight {
          0% {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes slideOutToLeft {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(-30px) scale(0.95);
          }
        }
        
        /* Smooth content transition */
        .content-enter {
          animation: slideInFromRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .content-exit {
          animation: slideOutToLeft 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        /* Image transition effects */
        .image-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .image-transition.transitioning {
          opacity: 0;
          transform: translateX(20px) scale(0.98);
        }
        
        /* Gallery item active state enhancement */
        .gallery-item.active {
          position: relative;
          z-index: 15;
        }
        
        .gallery-item.active > div {
          border: 3px solid rgba(251, 191, 36, 0.9);
          box-shadow: 
            0 0 0 1px rgba(251, 191, 36, 0.3),
            0 8px 32px rgba(251, 191, 36, 0.25),
            0 4px 16px rgba(0, 0, 0, 0.3);
          border-radius: 0.75rem;
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(251, 191, 36, 0.02));
          transform: scale(1.05);
          transform-origin: center;
        }
        
        .gallery-item.active img {
          border-radius: 0.5rem; /* Slightly smaller radius for image inside border */
        }
        
        /* Pulse animation for active indicator */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        
        .active-indicator {
          position: relative;
          z-index: 20;
          animation: pulse 2s infinite;
          box-shadow: 0 0 8px rgba(251, 191, 36, 0.6);
        }
      `}</style>
    </div>
  );
}
