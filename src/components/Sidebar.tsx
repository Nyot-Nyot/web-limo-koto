'use client';

import { useState, useEffect, useMemo } from 'react';

export default function Sidebar() {
  const sections = useMemo(() => [
    { id: 'beranda', label: 'BERANDA' },
    { id: 'fitur', label: 'FITUR' },
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
    <div className="fixed left-0 top-0 h-full flex items-center z-40 pl-1 sm:pl-2 md:pl-4 w-[80px] sm:w-[100px] md:w-[120px]">
      <div className="flex flex-col space-y-8 py-16 h-full justify-center">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`group relative flex items-center ${isActive ? 'text-white' : 'text-white/60 hover:text-white'} transition-all duration-300`}
            >
              <div className={`w-1 h-10 ${isActive ? 'bg-red-500' : 'bg-white/20 group-hover:bg-red-500'} transition-all duration-300`} />
              <div className="ml-3 flex flex-col justify-center">
                <span className={`text-2xl md:text-3xl font-bold ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white'} transition-all duration-300`}>
                  {`0${index + 1}`}
                </span>
                {section.label && (
                  <span className={`text-[10px] md:text-xs uppercase tracking-wider ${isActive ? 'text-white' : 'text-white/60'}`}>
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
