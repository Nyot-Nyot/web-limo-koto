'use client';

import { useState, useEffect } from 'react';

export default function Jorong() {
  const [selectedJorong, setSelectedJorong] = useState('tanjung-ampalu');
  const [mapKey, setMapKey] = useState(0);

  // Update map when jorong changes
  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [selectedJorong]);

  const jorongData = [
    {
      id: 'tanjung-ampalu',
      name: 'Jorong Tanjung Ampalu',
      population: '1,678 jiwa',
      area: '16.3 km²',
      coordinates: { lat: -0.7245, lng: 101.0223 },
      color: '#EC4899',
      description: 'Jorong Tanjung Ampalu adalah jorong dengan populasi terbesar di Nagari Lima Koto. Terletak di dataran yang strategis, jorong ini menjadi pusat aktivitas ekonomi dengan berbagai usaha perdagangan dan jasa. Memiliki akses transportasi yang baik ke berbagai daerah.',
      facilities: [
        'Sekolah Dasar',
        'Sekolah Menengah Pertama',
        'Puskesmas',
        'Bank',
        'Kantor Pos',
        'Pasar Induk'
      ]
    },
    {
      id: 'solok-badak',
      name: 'Jorong Solok Badak',
      population: '1,092 jiwa',
      area: '15.6 km²',
      coordinates: { lat: -0.7545, lng: 101.0523 },
      color: '#DC2626',
      description: 'Jorong Solok Badak terletak di lembah (solok) yang subur dengan sejarah keberadaan badak di masa lalu. Saat ini jorong ini berkembang menjadi sentra peternakan sapi dan kerbau. Memiliki padang gembalaan yang luas dan sumber air yang melimpah.',
      facilities: [
        'Sekolah Dasar',
        'Pos Kesehatan',
        'Masjid',
        'Kandang Ternak',
        'Padang Gembalaan',
        'Kolam Ikan'
      ]
    },
    {
      id: 'pasar-tanjung-ampalu',
      name: 'Jorong Pasar Tanjung Ampalu',
      population: '987 jiwa',
      area: '8.9 km²',
      coordinates: { lat: -0.6745, lng: 101.0423 },
      color: '#06B6D4',
      description: 'Jorong Pasar Tanjung Ampalu merupakan pusat perdagangan utama di kawasan ini. Pasar tradisional yang ada sudah beroperasi sejak puluhan tahun dan menjadi tempat berkumpulnya pedagang dari berbagai jorong. Jorong ini sangat aktif dalam kegiatan ekonomi.',
      facilities: [
        'Pasar Tradisional',
        'Sekolah Dasar',
        'Pos Kesehatan',
        'Masjid',
        'Area Parkir',
        'Warung Makan'
      ]
    },
    {
      id: 'mangkudu-kodok',
      name: 'Jorong Mangkudu Kodok',
      population: '743 jiwa',
      area: '9.5 km²',
      coordinates: { lat: -0.7345, lng: 101.0323 },
      color: '#84CC16',
      description: 'Jorong Mangkudu Kodok memiliki nama yang unik dan terletak di daerah yang dikelilingi pohon mangkudu. Jorong ini dikenal dengan hasil pertanian organik dan memiliki sumber air yang melimpah. Masyarakatnya sangat menjaga kelestarian lingkungan.',
      facilities: [
        'Sekolah Dasar',
        'Pos Kesehatan',
        'Masjid',
        'Kebun Organik',
        'Sumber Air Bersih'
      ]
    },
    {
      id: 'koto-panjang',
      name: 'Jorong Koto Panjang',
      population: '1,567 jiwa',
      area: '18.5 km²',
      coordinates: { lat: -0.6845, lng: 101.0323 },
      color: '#10B981',
      description: 'Jorong Koto Panjang adalah jorong terluas di Nagari Lima Koto dengan bentangan wilayah yang memanjang. Masyarakatnya mayoritas bekerja sebagai petani dengan komoditas utama padi dan palawija. Jorong ini juga menjadi jalur transportasi utama menuju jorong-jorong lainnya.',
      facilities: [
        'Sekolah Dasar',
        'Sekolah Menengah Pertama',
        'Puskesmas Pembantu',
        'Pasar Tradisional',
        'Terminal Kecil'
      ]
    },
    {
      id: 'batu-gandang',
      name: 'Jorong Batu Gandang',
      population: '1,345 jiwa',
      area: '14.2 km²',
      coordinates: { lat: -0.6945, lng: 101.0223 },
      color: '#EF4444',
      description: 'Jorong Batu Gandang merupakan salah satu jorong di Nagari Lima Koto yang terkenal dengan formasi bebatuan unik yang menyerupai gandang (gendang). Jorong ini menjadi pusat kebudayaan tradisional dengan berbagai acara adat yang masih rutin dilaksanakan.',
      facilities: [
        'Sekolah Dasar',
        'Pos Kesehatan Desa',
        'Masjid dan Surau',
        'Balai Adat',
        'Lapangan Olahraga'
      ]
    },
    {
      id: 'batu-balang',
      name: 'Jorong Batu Balang',
      population: '823 jiwa',
      area: '12.4 km²',
      coordinates: { lat: -0.7445, lng: 101.0423 },
      color: '#8B5F99',
      description: 'Jorong Batu Balang terletak di daerah berbatu dengan topografi yang bergelombang. Meskipun medannya cukup menantang, jorong ini memiliki potensi wisata alam yang menarik. Masyarakatnya sebagian besar bekerja sebagai petani dan peternak kambing.',
      facilities: [
        'Sekolah Dasar',
        'Pos Kesehatan',
        'Masjid',
        'Kandang Ternak',
        'Jalur Trekking'
      ]
    },
    {
      id: 'aur-gading',
      name: 'Jorong Aur Gading',
      population: '1,234 jiwa',
      area: '13.7 km²',
      coordinates: { lat: -0.7145, lng: 101.0023 },
      color: '#F59E0B',
      description: 'Jorong Aur Gading dikenal dengan kerajinan bambu (aur) yang berkualitas tinggi. Masyarakatnya telah turun temurun mengolah bambu menjadi berbagai produk kerajinan. Jorong ini juga memiliki tradisi budaya yang kuat dengan seni randai dan saluang.',
      facilities: [
        'Sekolah Dasar',
        'Pos Kesehatan',
        'Masjid dan Surau',
        'Sentra Kerajinan Bambu',
        'Sanggar Seni'
      ]
    }
  ];

  const selectedJorongData = jorongData.find(j => j.id === selectedJorong) || jorongData[0];

  return (
    <div className="flex items-center justify-center px-4 md:px-8 py-8 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="text-yellow-400">Jorong</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-200 text-base md:text-lg max-w-3xl mx-auto">
            Mengenal lebih dekat delapan jorong yang membentuk Nagari Lima Koto
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Side - Google Maps */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-white mb-3 text-center">Peta Nagari Lima Koto</h3>
              <p className="text-gray-300 text-sm text-center mb-4">
                Kabupaten Sijunjung, Sumatera Barat
              </p>
              
              {/* Google Maps Container */}
              <div className="relative w-full h-[350px] md:h-[400px] bg-white/5 rounded-lg overflow-hidden border-2 border-white/20 mb-4">{/* Reduced height from 500px to 350px/400px */}
                <iframe
                  key={mapKey}
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63560.0!2d${selectedJorongData.coordinates.lng}!3d${selectedJorongData.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sid!2sid!4v${Date.now()}!5m2!1sid!2sid&q=Nagari+Lima+Koto+Sijunjung+Sumatera+Barat`}
                  width="100%"
                  height="100%"
                  style={{ 
                    border: 0,
                    pointerEvents: 'none'
                  }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg grayscale-0"
                ></iframe>
                
                {/* Location Marker Overlay */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <div 
                    className="w-6 h-6 rounded-full border-4 border-white shadow-lg animate-pulse"
                    style={{ backgroundColor: selectedJorongData.color }}
                  ></div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-white text-xs font-semibold">
                        {selectedJorongData.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Jorong Selector */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold text-center text-sm md:text-base">Pilih Jorong untuk Melihat Lokasi:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {jorongData.map((jorong) => (
                    <button
                      key={jorong.id}
                      onClick={() => setSelectedJorong(jorong.id)}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 text-left ${
                        selectedJorong === jorong.id
                          ? 'bg-white/20 shadow-lg transform scale-105'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: jorong.color }}
                      ></div>
                      <div className="flex-1">
                        <h5 className="text-white font-medium text-sm">
                          {jorong.name}
                        </h5>
                        <p className="text-gray-300 text-xs">
                          {jorong.population} • {jorong.area}
                        </p>
                      </div>
                      {selectedJorong === jorong.id && (
                        <div className="text-yellow-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Map Info */}
                <div className="bg-yellow-400/10 rounded-lg p-3 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-yellow-200 text-xs">
                        Koordinat: {selectedJorongData.coordinates.lat.toFixed(4)}, {selectedJorongData.coordinates.lng.toFixed(4)}
                      </p>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${selectedJorongData.coordinates.lat},${selectedJorongData.coordinates.lng}&query_place_id=${selectedJorongData.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 bg-yellow-400/20 hover:bg-yellow-400/30 px-3 py-1 rounded-lg transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="text-yellow-200 text-xs font-medium">Buka di Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Jorong Profile */}
          <div className="space-y-4 md:space-y-6">
            {/* Main Info Card */}
            <div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border-l-4 transition-all duration-300"
              style={{ borderLeftColor: selectedJorongData.color }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedJorongData.name}</h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-white">
                      👥 {selectedJorongData.population}
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-white">
                      📍 {selectedJorongData.area}
                    </span>
                  </div>
                </div>
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: selectedJorongData.color }}
                >
                  <span className="text-white font-bold">
                    {selectedJorongData.name.charAt(0)}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-200 leading-relaxed">{selectedJorongData.description}</p>
            </div>

            {/* Facilities */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6">
              <h4 className="text-base md:text-lg font-bold text-yellow-400 mb-3 md:mb-4 flex items-center">
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
                </svg>
                Fasilitas
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">{/* Reduced gap */}
                {selectedJorongData.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white/5 rounded-lg p-3">
                    <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-200 text-sm">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6">
              <h4 className="text-base md:text-lg font-bold text-yellow-400 mb-3 md:mb-4">Statistik Singkat</h4>
              <div className="grid grid-cols-3 gap-3 md:gap-4">{/* Reduced gap */}
                <div className="text-center">
                  <div 
                    className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                    style={{ backgroundColor: `${selectedJorongData.color}20` }}
                  >
                    <span className="text-xl">👥</span>
                  </div>
                  <div className="text-white font-bold text-lg">{selectedJorongData.population.split(' ')[0]}</div>
                  <div className="text-gray-400 text-xs">Penduduk</div>
                </div>
                <div className="text-center">
                  <div 
                    className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                    style={{ backgroundColor: `${selectedJorongData.color}20` }}
                  >
                    <span className="text-xl">📍</span>
                  </div>
                  <div className="text-white font-bold text-lg">{selectedJorongData.area.split(' ')[0]}</div>
                  <div className="text-gray-400 text-xs">Luas (km²)</div>
                </div>
                <div className="text-center">
                  <div 
                    className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                    style={{ backgroundColor: `${selectedJorongData.color}20` }}
                  >
                    <span className="text-xl">🏘️</span>
                  </div>
                  <div className="text-white font-bold text-lg">{selectedJorongData.facilities.length}</div>
                  <div className="text-gray-400 text-xs">Fasilitas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
