'use client';

import { memo, useMemo, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useImagePreloader } from './performanceHooks';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  onLoad,
  onError
}: OptimizedImageProps) => {
  // Memoize image props to prevent unnecessary re-renders
  const imageProps = useMemo(() => ({
    src,
    alt,
    width,
    height,
    className,
    priority,
    sizes,
    quality,
    placeholder: 'blur' as const,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
    onLoad,
    onError
  }), [src, alt, width, height, className, priority, sizes, quality, onLoad, onError]);

  return (
    <Image
      {...imageProps}
      style={{ objectFit: 'cover' }}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

// Gallery optimized for large image collections
interface VirtualizedGalleryProps {
  images: Array<{
    id: string;
    src: string;
    title: string;
    description: string;
  }>;
  onImageClick?: (id: string) => void;
  itemHeight?: number;
  containerHeight?: number;
}

export const VirtualizedGallery = memo(({
  images,
  onImageClick,
  itemHeight = 300,
  containerHeight = 600
}: VirtualizedGalleryProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate visible range based on scroll position
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 2, // +2 for buffer
    images.length
  );
  
  const visibleImages = images.slice(startIndex, endIndex);

  // Preload visible images plus some buffer
  const imagesToPreload = images
    .slice(Math.max(0, startIndex - 2), Math.min(images.length, endIndex + 2))
    .map(img => img.src);
  useImagePreloader(imagesToPreload);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="overflow-y-auto scrollbar-hide"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: images.length * itemHeight, position: 'relative' }}>
        {visibleImages.map((image, index) => {
          const actualIndex = startIndex + index;
          return (
            <div
              key={image.id}
              className="absolute w-full"
              style={{
                top: actualIndex * itemHeight,
                height: itemHeight
              }}
              onClick={() => onImageClick?.(image.id)}
            >
              <div className="relative h-full rounded-xl overflow-hidden group cursor-pointer">
                <OptimizedImage
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={actualIndex < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold text-lg mb-1">{image.title}</h4>
                  <p className="text-sm opacity-80 line-clamp-2">{image.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

VirtualizedGallery.displayName = 'VirtualizedGallery';
