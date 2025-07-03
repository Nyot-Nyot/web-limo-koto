'use client';

import { useState, useEffect } from 'react';

export default function ProfilSingkat() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const adatImages = [
    {
      src: "https://placehold.co/500x400",
      title: "Rumah Gadang",
      description: "Arsitektur tradisional"
    },
    {
      src: "https://placehold.co/500x400",
      title: "Tari Tradisional",
      description: "Seni budaya warisan"
    },
    {
      src: "https://placehold.co/500x400",
      title: "Upacara Adat",
      description: "Ritual tradisional"
    },
    {
      src: "https://placehold.co/500x400",
      title: "Pakaian Adat",
      description: "Busana tradisional"
    }
  ];

  // Auto-slide images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % adatImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [adatImages.length]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-8 py-24">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Content - Now on the left */}
        <div className="text-white space-y-6">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Profil <span className="text-yellow-400">Singkat</span>
            </h2>
            <div className="w-20 h-1 bg-yellow-400 mb-6"></div>
          </div>
          
          <div className="space-y-4 text-gray-200 leading-relaxed">
            <p>
              Nagari Lima Koto adalah salah satu nagari yang terletak di Kabupaten Sijunjung, 
              Sumatera Barat. Nagari ini memiliki kekayaan budaya dan tradisi yang telah 
              diwariskan secara turun-temurun.
            </p>
            <p>
              Dengan luas wilayah sekitar 45,2 km² dan jumlah penduduk kurang lebih 8.500 jiwa, 
              Nagari Lima Koto terdiri dari 5 korong yang masing-masing memiliki karakteristik 
              dan keunikan tersendiri.
            </p>
            <p>
              Mata pencaharian utama masyarakat adalah pertanian, perkebunan, dan perdagangan. 
              Nagari ini juga dikenal dengan hasil perkebunan karet, kelapa sawit, dan produk 
              pertanian lainnya.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="text-yellow-400 font-semibold text-lg">Luas Wilayah</h4>
              <p className="text-2xl font-bold">45,2 km²</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="text-yellow-400 font-semibold text-lg">Jumlah Penduduk</h4>
              <p className="text-2xl font-bold">8.500 jiwa</p>
            </div>
          </div>
        </div>

        {/* Image Cards - Now on the right */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {adatImages.map((image, index) => (
                <div 
                  key={index}
                  className="w-full flex-shrink-0 relative"
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-gray-200 text-sm">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-4">
            {adatImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentImageIndex 
                    ? 'bg-yellow-400' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Manual navigation arrows */}
          <button
            onClick={() => setCurrentImageIndex((prev) => 
              prev === 0 ? adatImages.length - 1 : prev - 1
            )}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentImageIndex((prev) => 
              (prev + 1) % adatImages.length
            )}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
