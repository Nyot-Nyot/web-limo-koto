import { useEffect, useRef, useState, useCallback } from 'react';
import { OBSERVER_OPTIONS, SCROLL_TIMEOUT_DURATION, NAVIGATION_TIMEOUT_DURATION, PERFORMANCE_CONFIG } from './constants';

interface UseSectionNavigationProps {
  sections: string[];
  defaultSection?: string;
}

export function useSectionNavigation({ sections, defaultSection = '01' }: UseSectionNavigationProps) {
  const [activeSection, setActiveSection] = useState(defaultSection);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Memoized observer callback for better performance
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    if (!isUserScrolling) {
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting && entry.intersectionRatio > 0)
        .sort((a, b) => {
          if (b.intersectionRatio !== a.intersectionRatio) {
            return b.intersectionRatio - a.intersectionRatio;
          }
          const aRect = a.boundingClientRect;
          const bRect = b.boundingClientRect;
          const viewportCenter = window.innerHeight / 2;
          const aDistance = Math.abs(aRect.top + aRect.height / 2 - viewportCenter);
          const bDistance = Math.abs(bRect.top + bRect.height / 2 - viewportCenter);
          return aDistance - bDistance;
        });
      
      if (visibleEntries.length > 0) {
        const sectionId = visibleEntries[0].target.getAttribute('data-section');
        if (sectionId && sectionId !== activeSection) {
          setActiveSection(sectionId);
        }
      }
    }
  }, [isUserScrolling, activeSection]);

  // Consistent debounced scroll handler using scrollTimeoutRef
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, SCROLL_TIMEOUT_DURATION);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Handle manual section change with smooth scrolling
  const handleSectionChange = useCallback((sectionId: string) => {
    setIsUserScrolling(true);
    setActiveSection(sectionId);
    
    const section = sectionsRef.current[sectionId];
    if (section) {
      // Check for reduced motion preference
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      section.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, NAVIGATION_TIMEOUT_DURATION);
  }, []);

  // Intersection Observer setup with cleanup
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(observerCallback, OBSERVER_OPTIONS);

    // Observe all sections
    const currentSections = Object.values(sectionsRef.current);
    currentSections.forEach((section) => {
      if (section && observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [observerCallback, sections]);

  // Preload next section for better UX
  const preloadNextSection = useCallback((currentSectionId: string) => {
    const currentIndex = sections.indexOf(currentSectionId);
    const nextIndex = (currentIndex + 1) % sections.length;
    const nextSectionId = sections[nextIndex];
    
    // This could trigger preloading of next section's resources
    if (nextSectionId && sectionsRef.current[nextSectionId]) {
      // Future enhancement: preload next section's images or data
      console.log(`Preloading section: ${nextSectionId}`);
    }
  }, [sections]);

  // Trigger preload when active section changes
  useEffect(() => {
    if (activeSection) {
      preloadNextSection(activeSection);
    }
  }, [activeSection, preloadNextSection]);

  return {
    activeSection,
    sectionsRef,
    handleSectionChange,
    isUserScrolling,
  };
}
