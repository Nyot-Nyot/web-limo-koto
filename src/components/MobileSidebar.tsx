'use client';

import { useState, useEffect, useMemo } from 'react';

export default function MobileSidebar() {
  const sections = useMemo(() => [
    { id: 'beranda', label: 'BERANDA' },
    { id: 'fitur', label: 'FITUR-FITUR' },
    { id: 'struktur', label: 'STRUKTUR' },
    { id: 'berita', label: 'BERITA' },
    { id: 'faq', label: 'FAQ' },
  ], []);

  const [activeSection, setActiveSection] = useState('beranda');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px', // Adjust the margin to make detection more accurate
      threshold: 0.3, // Lower the threshold to make detection more sensitive
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the entry with the highest intersection ratio
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by intersection ratio and get the most visible section
        const mostVisibleEntry = visibleEntries.reduce((prev, current) => 
          prev.intersectionRatio > current.intersectionRatio ? prev : current
        );
        setActiveSection(mostVisibleEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      } else {
        console.warn(`Element with id ${section.id} not found`);
      }
    });

    // Add scroll event listener as a fallback for better detection
    const handleScroll = () => {
      if (document.visibilityState === 'visible') {
        sections.forEach(section => {
          const element = document.getElementById(section.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const visiblePercentage = 
              Math.min(windowHeight, rect.bottom) - 
              Math.max(0, rect.top);
            
            if (visiblePercentage > windowHeight * 0.4) {
              setActiveSection(section.id);
            }
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    setTimeout(handleScroll, 200);

    return () => {
      // Cleanup observer on unmount
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  return (
    <div className="md:hidden fixed left-2 top-1/2 transform -translate-y-1/2 z-[100]">
      <div className="flex flex-col space-y-1">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`group relative flex items-center ${isActive ? 'text-white' : 'text-white/60 hover:text-white/80'} transition-all duration-300`}
            >
              {/* Line indicator */}
              <div className={`w-1 h-6 ${isActive ? 'bg-yellow-400' : 'bg-white/20 group-hover:bg-white/40'} transition-all duration-300`} />
              
              {/* Section number */}
              <div className="ml-2 flex flex-col justify-center min-w-[25px]">
                <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white'} transition-all duration-300`}>
                  {`0${index + 1}`}
                </span>
                {/* Section labels are hidden in mobile view */}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}