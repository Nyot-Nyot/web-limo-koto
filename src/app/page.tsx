'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileSidebar from '@/components/MobileSidebar';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  const [activeSection, setActiveSection] = useState('01');

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
      </div>
      
      {/* Mobile Sidebar */}
      <MobileSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      {/* Main Content */}
      <main className="relative">
        <HeroSection
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </main>
    </div>
  );
}
