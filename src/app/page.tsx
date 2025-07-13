"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <Header />

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
      </main>
    </div>
  );
}
