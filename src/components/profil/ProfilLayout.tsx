'use client';

import { ReactNode } from 'react';

interface ProfilLayoutProps {
  children: ReactNode;
}

export default function ProfilLayout({ children }: ProfilLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ scrollBehavior: 'smooth' }}>
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ zIndex: -2 }}
      />
      
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70" style={{ zIndex: -1 }} />

      {children}
    </div>
  );
}
