"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useEffect } from "react";

const Sidebar = dynamic(() => import("@/components/Sidebar"));
const MobileSidebar = dynamic(() => import("@/components/MobileSidebar"));
const HeroSection = dynamic(() => import("@/components/HeroSection"));
import Header from "@/components/Header";

export default function Home() {
  const [activeSection, setActiveSection] = useState("beranda");
  const sectionIds = ["beranda", "fitur", "struktur", "berita", "faq"];

  // Observer logic
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Ambil section yang paling terlihat
          const mostVisible = visible.reduce((prev, curr) =>
            prev.intersectionRatio > curr.intersectionRatio ? prev : curr
          );
          const id = mostVisible.target.getAttribute("id");
          if (id && id !== activeSection) setActiveSection(id);
        }
      },
      { root: null, rootMargin: "-20% 0px", threshold: 0.3 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [activeSection]);

  const handleSectionChange = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

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
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
      </main>
    </div>
  );
}
