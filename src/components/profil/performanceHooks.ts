import { useEffect, useRef, useCallback, useState } from 'react';

// Image preloader hook for better performance
export const useImagePreloader = (imageSources: string[]) => {
  const preloadedImages = useRef<Set<string>>(new Set());

  useEffect(() => {
    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (preloadedImages.current.has(src)) {
          resolve();
          return;
        }

        const img = new Image();
        img.onload = () => {
          preloadedImages.current.add(src);
          resolve();
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    // Preload images with priority (first few images immediately, rest with delay)
    const preloadWithPriority = async () => {
      const priorityImages = imageSources.slice(0, 3);
      const remainingImages = imageSources.slice(3);

      // Preload priority images immediately
      await Promise.allSettled(priorityImages.map(preloadImage));

      // Preload remaining images with delay
      if (remainingImages.length > 0) {
        setTimeout(() => {
          Promise.allSettled(remainingImages.map(preloadImage));
        }, 1000);
      }
    };

    preloadWithPriority();
  }, [imageSources]);

  return preloadedImages.current;
};

// Intersection observer hook for lazy loading
export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    observerRef.current = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    observerRef.current.observe(elementRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options]);

  return elementRef;
};

// Performance monitoring hook
export const usePerformanceMonitor = (componentName: string) => {
  const renderStartTime = useRef<number | undefined>(undefined);
  const mountTime = useRef<number | undefined>(undefined);

  useEffect(() => {
    mountTime.current = performance.now();
    console.log(`${componentName} mounted at:`, mountTime.current);

    return () => {
      const unmountTime = performance.now();
      const totalMountTime = mountTime.current ? unmountTime - mountTime.current : 0;
      console.log(`${componentName} unmounted. Total mount time:`, totalMountTime, 'ms');
    };
  }, [componentName]);

  const startRender = useCallback(() => {
    renderStartTime.current = performance.now();
  }, []);

  const endRender = useCallback(() => {
    if (renderStartTime.current) {
      const renderTime = performance.now() - renderStartTime.current;
      if (renderTime > 16) { // Log if render takes longer than 1 frame (16ms)
        console.warn(`${componentName} slow render:`, renderTime, 'ms');
      }
    }
  }, [componentName]);

  return { startRender, endRender };
};

// Debounced scroll hook
export const useDebouncedScroll = (callback: () => void, delay: number = 100) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(callback, delay);
  }, [callback, delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

// Media query hook for responsive design
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};
