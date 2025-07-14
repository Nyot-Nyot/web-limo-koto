"use client";

import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("@/components/Sidebar"));
const MobileSidebar = dynamic(() => import("@/components/MobileSidebar"));
const HeroSection = dynamic(() => import("@/components/HeroSection"));
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 bg-[url('/images/background.webp')] bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ zIndex: -2 }}
      />
      
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70" style={{ zIndex: -1 }} />
      
      {/* Header */}
      <Header />

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        activeSection="home" 
        onSectionChange={() => {}} 
      />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
      </main>
    </div>
  );
}
