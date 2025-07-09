'use client';

import { memo, useCallback } from 'react';
import { PROFIL_SECTIONS, type Section } from './constants';
import { useKeyboardNavigation, useAriaAnnouncements } from './accessibilityHooks';

interface SidebarButtonProps {
  section: Section;
  isActive: boolean;
  onClick: (id: string) => void;
  isMobile?: boolean;
  isKeyboardActive?: boolean;
}

const SidebarButton = memo(({ 
  section, 
  isActive, 
  onClick, 
  isMobile = false,
  isKeyboardActive = false 
}: SidebarButtonProps) => (
  <button
    onClick={() => onClick(section.id)}
    className={`group relative flex items-center ${
      isActive ? "text-white" : "text-white/60 hover:text-white/80"
    } ${
      isKeyboardActive ? "ring-2 ring-yellow-400 ring-offset-2 ring-offset-transparent" : ""
    } transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400`}
    aria-label={`Navigate to ${section.title}`}
    aria-current={isActive ? 'page' : undefined}
    tabIndex={0}
  >
    {/* Yellow line indicator */}
    <div
      className={`w-1 transition-all duration-300 ${
        isMobile ? 'h-6' : 'h-10'
      } ${
        isActive ? "bg-yellow-400" : "bg-white/20 group-hover:bg-white/40"
      }`}
      aria-hidden="true"
    />

    {/* Section number */}
    <div className={`${isMobile ? 'ml-2' : 'ml-3'} flex flex-col justify-center ${isMobile ? 'min-w-[25px]' : 'min-w-[45px]'}`}>
      <span
        className={`font-bold transition-all duration-300 ${
          isMobile ? 'text-xs' : 'text-xl'
        } ${
          isActive ? "text-white" : "text-white/40"
        }`}
        aria-hidden="true"
      >
        {section.id}
      </span>
      {!isMobile && section.label && (
        <span
          className={`text-[10px] uppercase tracking-wider transition-all duration-300 ${
            isActive ? "text-white" : "text-white/60"
          }`}
          aria-hidden="true"
        >
          {section.label}
        </span>
      )}
    </div>
    
    {/* Screen reader text */}
    <span className="sr-only">
      {isActive ? `Currently viewing: ${section.title}` : `Go to ${section.title} section`}
    </span>
  </button>
));

SidebarButton.displayName = 'SidebarButton';

interface ProfilSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobile?: boolean;
}

export const ProfilSidebar = memo(({ activeSection, onSectionChange, isMobile = false }: ProfilSidebarProps) => {
  const { announce } = useAriaAnnouncements();
  
  const sectionIds = PROFIL_SECTIONS.map(s => s.id);
  
  const handleSectionSelect = useCallback((sectionId: string) => {
    const section = PROFIL_SECTIONS.find(s => s.id === sectionId);
    if (section) {
      onSectionChange(sectionId);
      announce(`Navigating to ${section.title} section`);
    }
  }, [onSectionChange, announce]);

  const { activeIndex } = useKeyboardNavigation(sectionIds, handleSectionSelect);

  const positionClass = isMobile 
    ? "md:hidden fixed left-2 top-1/2 transform -translate-y-1/2 z-[100]"
    : "hidden md:block fixed left-4 top-1/2 transform -translate-y-1/2 z-40";

  return (
    <nav 
      className={positionClass} 
      role="navigation" 
      aria-label={isMobile ? "Mobile profile sections navigation" : "Profile sections navigation"}
    >
      <div className="flex flex-col space-y-1" role="list">
        {PROFIL_SECTIONS.map((section, index) => (
          <div key={section.id} role="listitem">
            <SidebarButton
              section={section}
              isActive={activeSection === section.id}
              onClick={handleSectionSelect}
              isMobile={isMobile}
              isKeyboardActive={activeIndex === index}
            />
          </div>
        ))}
      </div>
    </nav>
  );
});

ProfilSidebar.displayName = 'ProfilSidebar';
