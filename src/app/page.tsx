'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileSidebar from '@/components/MobileSidebar';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Main Page Content */}
      <>
        {/* Header */}
        <Header />
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        {/* Mobile Sidebar */}
        <MobileSidebar />
        {/* Main Content */}
        <main className="relative md:pl-0 pl-10">
          <HeroSection />
        </main>
      </>
    </div>
  );
}
