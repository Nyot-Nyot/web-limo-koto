"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";
import React from "react";

function MobileNav() {
  // Section list sama dengan Sidebar
  const sections = [
    { id: 'beranda', label: 'BERANDA' },
    { id: 'fitur', label: 'FITUR' },
    { id: 'struktur', label: 'STRUKTUR' },
    { id: 'berita', label: 'BERITA' },
    { id: 'faq', label: 'FAQ' },
  ];
  return (
    <div className="md:hidden fixed left-2 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex flex-col space-y-1">
        {sections.map((section, index) => {
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={
                'group relative flex items-center text-white/60 hover:text-white/80 transition-all duration-300'
              }
            >
              <div className="w-1 h-6 bg-white/20 group-hover:bg-yellow-400 transition-all duration-300" />
              <div className="ml-2 flex flex-col justify-center min-w-[25px]">
                <span className="text-xs font-bold transition-all duration-300">
                  {`0${index + 1}`}
                </span>
                <span className="text-[10px] uppercase tracking-wider transition-all duration-300">
                  {section.label}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <Header />

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileNav />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
      </main>
    </div>
  );
}
