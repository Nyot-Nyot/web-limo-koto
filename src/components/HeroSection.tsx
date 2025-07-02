'use client';

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center pl-16 md:pl-0">
      {/* Background with gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            url("/images/Rectangle.png") center/cover
          `
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Selamat Datang di<br />
          <span className="text-yellow-400">Website Nagari Lima Koto</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Portal Digital Resmi untuk Informasi Lengkap tentang Profil, Budaya, Berita, dan Data Statistik Nagari di Sumatera Barat
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="/profil" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-300 inline-block">
            Jelajahi Profil Nagari
          </a>
          <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 inline-block">
            Baca Portal Berita
          </button>
        </div>
      </div>
      {/* Traditional House Silhouette - More Detailed */}

    </div>
  );
}