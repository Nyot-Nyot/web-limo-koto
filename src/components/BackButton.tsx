'use client';

import { useRouter } from 'next/navigation';

interface BackButtonProps {
  href?: string;
}

export default function BackButton({ href }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-28 left-8 z-20 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors duration-300"
      aria-label="Kembali"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}
