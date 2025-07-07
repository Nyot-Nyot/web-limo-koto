'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BeritaItem } from '@/data/berita';

interface BeritaCardProps {
  berita: BeritaItem;
  animated?: boolean;
  animationState?: 'in' | 'out';
}

export default function BeritaCard({ berita, animated = false, animationState = 'in' }: BeritaCardProps) {
  return (
    <Link 
      href={`/berita/${berita.id}`} 
      className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition duration-300 hover:bg-white/20 flex flex-col min-h-[350px] cursor-pointer border border-white/10">
      <div className="relative h-48 w-full">
        <Image
          src={berita.imageUrl}
          alt={berita.title}
          fill
          className={`object-cover ${animated ? `transition-opacity duration-500 ${animationState === 'in' ? 'opacity-100' : 'opacity-0'}` : ''}`}
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className={`font-bold text-lg text-white mb-2 line-clamp-2 overflow-hidden ${
          animated ? `transition-transform duration-300 ${animationState === 'in' ? 'translate-x-0' : 'translate-x-10 opacity-0'}` : ''
        }`}>
          {berita.title}
        </h3>
        <p className={`text-gray-300 text-xs mb-4 line-clamp-3 overflow-hidden flex-grow ${
          animated ? `transition-transform duration-300 delay-75 ${animationState === 'in' ? 'translate-x-0' : 'translate-x-10 opacity-0'}` : ''
        }`}>
          {berita.description}
        </p>
        <div className={`flex justify-between items-center text-sm text-gray-300 mt-auto pt-2 ${
          animated ? `transition-transform duration-300 delay-150 ${animationState === 'in' ? 'translate-x-0' : 'translate-x-10 opacity-0'}` : ''
        }`}>
          <div className="flex items-center">
            <Image 
              src="/calendar-icon.svg" 
              alt="Date" 
              width={16} 
              height={16} 
              className="mr-1"
            />
            <span>{berita.date}</span>
          </div>
          <div className="flex items-center">
            <Image 
              src="/eye-icon.svg" 
              alt="Views" 
              width={16} 
              height={16} 
              className="mr-1"
            />
            <span>{berita.viewCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
