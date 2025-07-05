"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import ProfilSingkat from "@/components/profil/ProfilSingkat";
import VisiMisi from "@/components/profil/VisiMisi";
import Sejarah from "@/components/profil/Sejarah";
import AdatIstiadat from "@/components/profil/AdatIstiadat";
import Galeri from "@/components/profil/Galeri";

interface ProfilSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

function ProfilSidebar({ activeSection, onSectionChange }: ProfilSidebarProps) {
  const sections = [
    { id: "01", title: "Profil Singkat", label: "Profil" },
    { id: "02", title: "Visi & Misi", label: "Visi Misi" },
    { id: "03", title: "Sejarah", label: "Sejarah" },
    { id: "04", title: "Adat Istiadat", label: "Adat" },
    { id: "05", title: "Galeri", label: "Galeri" },
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
    { id: "01", title: "Profil Singkat", label: "Profil" },
    { id: "02", title: "Visi & Misi", label: "Visi Misi" },
    { id: "03", title: "Sejarah", label: "Sejarah" },
    { id: "04", title: "Adat Istiadat", label: "Adat" },
    { id: "05", title: "Galeri", label: "Galeri" },
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
  const [activeSection, setActiveSection] = useState("01");
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const sections = [
    { id: "01", component: <ProfilSingkat /> },
    { id: "02", component: <VisiMisi /> },
    { id: "03", component: <Sejarah /> },
    { id: "04", component: <AdatIstiadat /> },
    { id: "05", component: <Galeri /> },
  ];

  // Scroll to section when activeSection changes
  useEffect(() => {
    const section = sectionsRef.current[activeSection];
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeSection]);

  // Intersection Observer to update active section based on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("data-section");
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      });
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
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <ProfilSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      {/* Mobile Sidebar */}
      <MobileProfilSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Page Title Overlay
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md rounded-full px-4 py-1 shadow-lg border border-white/10">
          <h1 className="text-white text-sm font-medium">
            Profil Nagari Lima Koto
          </h1>
        </div>
      </div> */}

      {/* Main Content */}
      <main className="relative">
        {/* Background */}
        <div
          className="fixed inset-0 z-0"
          style={{
            background: `
              linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)),
              url("/images/Rectangle.png") center/cover
            `,
          }}
        />

        {/* Content Sections */}
        <div className="relative z-10 pl-12 md:pl-20 lg:pl-24">
          {sections.map((section) => (
            <div
              key={section.id}
              ref={(el) => {
                sectionsRef.current[section.id] = el;
              }}
              data-section={section.id}
              className="min-h-screen"
            >
              {section.component}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
