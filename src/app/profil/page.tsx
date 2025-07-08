"use client";

import Header from '@/components/Header';
import ProfilLayout from '@/components/profil/ProfilLayout';
import { ProfilSidebar } from '@/components/profil/ProfilSidebar';
import { ProfilContent } from '@/components/profil/ProfilContent';
import { useSectionNavigation } from '@/components/profil/useSectionNavigation';
import { PROFIL_SECTIONS } from '@/components/profil/constants';

export default function ProfilPage() {
  const { activeSection, sectionsRef, handleSectionChange } = useSectionNavigation({
    sections: PROFIL_SECTIONS.map(s => s.id),
  });

  return (
    <ProfilLayout>
      <Header />
      
      {/* Desktop Sidebar */}
      <ProfilSidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />

      {/* Mobile Sidebar */}
      <ProfilSidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
        isMobile
      />

      {/* Main Content */}
      <ProfilContent 
        sections={PROFIL_SECTIONS}
        sectionsRef={sectionsRef}
      />
    </ProfilLayout>
  );
}
