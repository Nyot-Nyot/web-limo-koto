'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';

export default function Sidebar() {
  const sections = useMemo(() => [
    { id: 'beranda', label: 'BERANDA' },
    { id: 'fitur', label: 'FITUR' },
    { id: 'struktur', label: 'STRUKTUR' },
    { id: 'berita', label: 'BERITA' },
    { id: 'faq', label: 'FAQ' },
  ], []);

  const [activeSection, setActiveSection] = useState('beranda');

  // Memoized observer callback untuk performance
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const visibleEntries = entries.filter(entry => entry.isIntersecting);
    if (visibleEntries.length > 0) {
      const mostVisibleEntry = visibleEntries.reduce((prev, current) => 
        prev.intersectionRatio > current.intersectionRatio ? prev : current
      );
      setActiveSection(mostVisibleEntry.target.id);
    }
  }, []);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    if (document.visibilityState === 'visible') {
      let maxVisiblePercentage = 0;
      let mostVisibleSection = 'beranda';

      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const visiblePercentage = 
            Math.min(windowHeight, rect.bottom) - 
            Math.max(0, rect.top);
          
          if (visiblePercentage > maxVisiblePercentage) {
            maxVisiblePercentage = visiblePercentage;
            mostVisibleSection = section.id;
          }
        }
      });

      if (maxVisiblePercentage > window.innerHeight * 0.4) {
        setActiveSection(mostVisibleSection);
      }
    }
  }, [sections]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px',
      threshold: 0.3,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Add scroll listener with passive option
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    setTimeout(handleScroll, 200);

    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections, observerCallback, handleScroll]);

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex flex-col space-y-1">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`group relative flex items-center ${
                isActive 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white/80'
              } transition-all duration-300`}
            >
              {/* Yellow line indicator */}
              <div className={`w-1 h-10 transition-all duration-300 ${
                isActive 
                  ? 'bg-yellow-400' 
                  : 'bg-white/20 group-hover:bg-white/40'
              }`} />
              
              {/* Section number and label */}
              <div className="ml-3 flex flex-col justify-center min-w-[45px]">
                <span className={`text-xl font-bold transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-white/40'
                }`}>
                  {`0${index + 1}`}
                </span>
                {section.label && (
                  <span className={`text-[10px] uppercase tracking-wider transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-white/60'
                  }`}>
                    {section.label}
                  </span>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
