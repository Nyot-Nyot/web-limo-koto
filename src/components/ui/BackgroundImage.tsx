'use client';

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
          backgroundAttachment: 'fixed',
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