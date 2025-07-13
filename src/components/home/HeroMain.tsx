'use client';

import { useRouter } from 'next/navigation';

export default function HeroMain() {
  const router = useRouter();
  return (
    <section
      id="beranda"
      className="min-h-screen flex items-center justify-center px-2 md:px-6 mt-20 sm:mt-16 md:mt-20 lg:mt-0"
    >
      {/* Content */}
      <div className="text-center text-white max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Selamat Datang di<br />
          <span className="text-yellow-400">Website Nagari Lima Koto</span>
        </h1>
        
        <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
        
        <p className="text-gray-200 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
          Portal Digital Resmi untuk Informasi Lengkap tentang Profil, Budaya, Berita, dan Data Statistik Nagari di Sumatera Barat
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-300 inline-block cursor-pointer"
            onClick={() => router.push('/profil')}
          >
            Jelajahi Profil Nagari
          </button>
          <button
            className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 inline-block cursor-pointer"
            onClick={() => router.push('/berita')}
          >
            Baca Portal Berita
          </button>
        </div>
      </div>
    </section>
  );
} 