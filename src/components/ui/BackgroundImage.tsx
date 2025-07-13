'use client';

import { useState, useEffect } from 'react';

interface BackgroundImageProps {
  src?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  className?: string;
}

export default function BackgroundImage({ 
  src = "/images/background.png",
  overlay = true,
  overlayOpacity = 0.6,
  className = ""
}: BackgroundImageProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Utility to detect mobile devices
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const mobileRegex = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        setIsMobile(mobileRegex.test(window.navigator.userAgent));
      }
    };

    checkMobile();
    
    // Listen for resize events to update mobile detection
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <>
      {/* Background Image */}
      <div
        className={`fixed inset-0 ${className}`}
        style={{
          backgroundImage: `url("${src}")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
          zIndex: -2
        }}
      />
      
      {/* Overlay */}
      {overlay && (
        <div 
          className="fixed inset-0" 
          style={{ 
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
            zIndex: -1 
          }} 
        />
      )}
    </>
  );
} 