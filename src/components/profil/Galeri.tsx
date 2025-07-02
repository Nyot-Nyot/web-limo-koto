'use client';

import { useState } from 'react';

export default function Galeri() {
  const [activeCategory, setActiveCategory] = useState('makanan');

  const categories = [
    { id: 'makanan', name: 'Makanan Tradisional' },
    { id: 'budaya', name: 'Budaya & Adat' },
    { id: 'alam', name: 'Keindahan Alam' },
    { id: 'arsitektur', name: 'Arsitektur' }
  ];

  const galleries = {
    makanan: [
      { id: 1, title: 'Rendang Dagiang', image: 'https://via.placeholder.com/400x300/DC2626/000000?text=Rendang+Dagiang' },
      { id: 2, title: 'Gulai Ikan Bilih', image: 'https://via.placeholder.com/400x300/059669/000000?text=Gulai+Ikan+Bilih' },
      { id: 3, title: 'Dendeng Batokok', image: 'https://via.placeholder.com/400x300/DC9333/000000?text=Dendeng+Batokok' },
      { id: 4, title: 'Kalio Ayam', image: 'https://via.placeholder.com/400x300/7C3AED/000000?text=Kalio+Ayam' },
      { id: 5, title: 'Sambal Lado Ijo', image: 'https://via.placeholder.com/400x300/16A34A/000000?text=Sambal+Lado+Ijo' },
      { id: 6, title: 'Gulai Cubadak', image: 'https://via.placeholder.com/400x300/EA580C/000000?text=Gulai+Cubadak' },
      { id: 7, title: 'Kerupuk Sanjai', image: 'https://via.placeholder.com/400x300/0891B2/000000?text=Kerupuk+Sanjai' },
      { id: 8, title: 'Randang Jantung Pisang', image: 'https://via.placeholder.com/400x300/BE123C/000000?text=Randang+Jantung+Pisang' }
    ],
    budaya: [
      { id: 1, title: 'Tari Piring', image: 'https://via.placeholder.com/400x300/7C3AED/000000?text=Tari+Piring' },
      { id: 2, title: 'Randai', image: 'https://via.placeholder.com/400x300/DC2626/000000?text=Randai' },
      { id: 3, title: 'Saluang', image: 'https://via.placeholder.com/400x300/059669/000000?text=Saluang' },
      { id: 4, title: 'Batagak Penghulu', image: 'https://via.placeholder.com/400x300/DC9333/000000?text=Batagak+Penghulu' },
      { id: 5, title: 'Upacara Adat', image: 'https://via.placeholder.com/400x300/16A34A/000000?text=Upacara+Adat' },
      { id: 6, title: 'Pakaian Adat', image: 'https://via.placeholder.com/400x300/EA580C/000000?text=Pakaian+Adat' }
    ],
    alam: [
      { id: 1, title: 'Panorama Bukit', image: 'https://via.placeholder.com/400x300/16A34A/000000?text=Panorama+Bukit' },
      { id: 2, title: 'Sungai Batang Hari', image: 'https://via.placeholder.com/400x300/0891B2/000000?text=Sungai+Batang+Hari' },
      { id: 3, title: 'Sawah Terasering', image: 'https://via.placeholder.com/400x300/059669/000000?text=Sawah+Terasering' },
      { id: 4, title: 'Kebun Karet', image: 'https://via.placeholder.com/400x300/16A34A/000000?text=Kebun+Karet' },
      { id: 5, title: 'Air Terjun', image: 'https://via.placeholder.com/400x300/0891B2/000000?text=Air+Terjun' }
    ],
    arsitektur: [
      { id: 1, title: 'Rumah Gadang', image: 'https://via.placeholder.com/400x300/DC2626/000000?text=Rumah+Gadang' },
      { id: 2, title: 'Surau Tua', image: 'https://via.placeholder.com/400x300/059669/000000?text=Surau+Tua' },
      { id: 3, title: 'Balai Adat', image: 'https://via.placeholder.com/400x300/DC9333/000000?text=Balai+Adat' },
      { id: 4, title: 'Masjid Nagari', image: 'https://via.placeholder.com/400x300/7C3AED/000000?text=Masjid+Nagari' }
    ]
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-8 py-24">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Galeri <span className="text-yellow-400">Nagari</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Koleksi foto yang menampilkan kekayaan budaya, kuliner, dan keindahan alam Nagari Lima Koto
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 px-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base ${
                activeCategory === category.id
                  ? 'bg-yellow-400 text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid with Horizontal Scroll */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 md:space-x-6 pb-4" style={{ width: 'max-content' }}>
              {galleries[activeCategory as keyof typeof galleries].map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer flex-shrink-0 w-64 md:w-80"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-105">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
                        {item.title}
                      </h3>
                      <div className="w-12 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Scroll Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(galleries[activeCategory as keyof typeof galleries].length / 3) }).map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-white/30"
              ></div>
            ))}
          </div>
        </div>

        {/* Featured Section */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl p-8 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Jelajahi Kekayaan <span className="text-yellow-400">Nagari Lima Koto</span>
            </h3>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              Setiap foto menceritakan kisah yang berbeda tentang warisan budaya, 
              kelezatan kuliner tradisional, dan keindahan alam yang memukau
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">50+</div>
                <div className="text-white text-sm">Foto Kuliner</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">30+</div>
                <div className="text-white text-sm">Dokumentasi Budaya</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">25+</div>
                <div className="text-white text-sm">Pemandangan Alam</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">15+</div>
                <div className="text-white text-sm">Arsitektur Tradisional</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
