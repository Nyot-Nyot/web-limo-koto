'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BeritaItem } from '@/data/berita';
import { FaCalendarAlt, FaEye } from 'react-icons/fa';

interface BeritaCardProps {
  berita: BeritaItem;
  animated?: boolean;
  animationState?: 'in' | 'out';
}

export default function BeritaCard({ berita, animated = false, animationState = 'in' }: BeritaCardProps) {
  return (
    <Link 
      href={`/berita/${berita.id}`} 
      className="bg-white/10 backdrop-blur-lg text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] group border border-white/20 block">
      <div className="relative overflow-hidden">
        <Image
          src={berita.imageUrl}
          alt={berita.title}
          width={400}
          height={250}
          className={`w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500 ${
            animated ? `transition-opacity duration-500 ${animationState === 'in' ? 'opacity-100' : 'opacity-0'}` : ''
          }`}
        />
        <span className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-lg">
          Berita
        </span>
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
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-blue-400" />
            {berita.date}
          </span>
          <span className="flex items-center gap-1">
            <FaEye className="text-green-400" />
            {berita.viewCount}
          </span>
        </div>
      </div>
    </Link>
  );
}
