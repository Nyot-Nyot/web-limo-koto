"use client";

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import ProfilSingkat from '@/components/profil/ProfilSingkat';
import VisiMisi from '@/components/profil/VisiMisi';
import InformasiJorong from '@/components/profil/Jorong';
import AdatIstiadat from '@/components/profil/AdatIstiadat';
import Galeri from '@/components/profil/Galeri';

interface ProfilSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

function ProfilSidebar({ activeSection, onSectionChange }: ProfilSidebarProps) {
  const sections = [
    { id: '01', title: 'Profil Singkat', label: 'Profil' },
    { id: '02', title: 'Visi & Misi', label: 'Visi Misi' },
    { id: '03', title: 'Jorong', label: 'Jorong' },
    { id: '04', title: 'Adat Istiadat', label: 'Adat' },
    { id: '05', title: 'Galeri', label: 'Galeri' },
  ];

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex flex-col space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`group relative flex items-center ${
              activeSection === section.id
                ? "text-white"
                : "text-white/60 hover:text-white/80"
            } transition-all duration-300`}
          >
            {/* Yellow line indicator */}
            <div
              className={`w-1 h-10 transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-yellow-400"
                  : "bg-white/20 group-hover:bg-white/40"
              }`}
            />

            {/* Section number */}
            <div className="ml-3 flex flex-col justify-center min-w-[45px]">
              <span
                className={`text-xl font-bold transition-all duration-300 ${
                  activeSection === section.id ? "text-white" : "text-white/40"
                }`}
              >
                {section.id}
              </span>
              {section.label && (
                <span
                  className={`text-[10px] uppercase tracking-wider transition-all duration-300 ${
                    activeSection === section.id
                      ? "text-white"
                      : "text-white/60"
                  }`}
                >
                  {section.label}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MobileProfilSidebar({
  activeSection,
  onSectionChange,
}: ProfilSidebarProps) {
  const sections = [
    { id: '01', title: 'Profil Singkat', label: 'Profil' },
    { id: '02', title: 'Visi & Misi', label: 'Visi Misi' },
    { id: '03', title: 'Jorong', label: 'Jorong' },
    { id: '04', title: 'Adat Istiadat', label: 'Adat' },
    { id: '05', title: 'Galeri', label: 'Galeri' },
  ];

  return (
    <div className="md:hidden fixed left-2 top-1/2 transform -translate-y-1/2 z-[100]">
      <div className="flex flex-col space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`group relative flex items-center ${
              activeSection === section.id
                ? "text-white"
                : "text-white/60 hover:text-white/80"
            } transition-all duration-300`}
          >
            {/* Yellow line indicator */}
            <div
              className={`w-1 h-6 transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-yellow-400"
                  : "bg-white/20 group-hover:bg-white/40"
              }`}
            />

            {/* Section number */}
            <div className="ml-2 flex flex-col justify-center min-w-[25px]">
              <span
                className={`text-xs font-bold transition-all duration-300 ${
                  activeSection === section.id ? "text-white" : "text-white/40"
                }`}
              >
                {section.id}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProfilPage() {
  const [activeSection, setActiveSection] = useState('01');
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTime = useRef(0);

  const sections = [
    { id: '01', component: <ProfilSingkat /> },
    { id: '02', component: <VisiMisi /> },
    { id: '03', component: <InformasiJorong /> },
    { id: '04', component: <AdatIstiadat /> },
    { id: '05', component: <Galeri /> },
  ];

  // Debounced scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set a shorter timeout for more responsive updates
      scrollTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Handle manual section change from sidebar
  const handleSectionChange = (sectionId: string) => {
    setIsUserScrolling(true);
    setActiveSection(sectionId);
    
    const section = sectionsRef.current[sectionId];
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Reset user scrolling flag after scroll completes
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 800); // Reduced from 1500ms to 800ms
  };

  // Intersection Observer to update active section based on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Better detection margins
      threshold: [0, 0.1, 0.5, 1] // Multiple thresholds for better detection
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Only update active section if user is not manually scrolling
      if (!isUserScrolling) {
        // Find the entry with the highest intersection ratio
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting && entry.intersectionRatio > 0)
          .sort((a, b) => {
            // Prioritize entries that are more visible
            if (b.intersectionRatio !== a.intersectionRatio) {
              return b.intersectionRatio - a.intersectionRatio;
            }
            // If intersection ratios are equal, prioritize the one that's more centered
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
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    Object.values(sectionsRef.current).forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isUserScrolling, activeSection]);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ scrollBehavior: 'smooth' }}>
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ zIndex: -2 }}
      />
      
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70" style={{ zIndex: -1 }} />

      {/* Header */}
      <Header />

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <ProfilSidebar 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange} 
        />
      </div>

      {/* Mobile Sidebar */}
      <MobileProfilSidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Content Sections */}
        <div className="pl-12 md:pl-20 lg:pl-24">
          {sections.map((section) => (
            <div
              key={section.id}
              ref={(el) => {
                sectionsRef.current[section.id] = el;
              }}
              data-section={section.id}
            >
              {section.component}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
