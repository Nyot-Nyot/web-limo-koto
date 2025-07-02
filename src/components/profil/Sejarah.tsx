'use client';

export default function Sejarah() {
  const timelineEvents = [
    {
      year: '1800an',
      title: 'Awal Pembentukan',
      description: 'Nagari Lima Koto mulai terbentuk sebagai kesatuan wilayah adat dengan lima korong utama yang dipimpin oleh penghulu-penghulu adat.'
    },
    {
      year: '1920',
      title: 'Era Kolonial',
      description: 'Masa penjajahan Belanda, masyarakat tetap mempertahankan sistem pemerintahan adat sambil beradaptasi dengan sistem colonial.'
    },
    {
      year: '1945',
      title: 'Kemerdekaan',
      description: 'Pasca kemerdekaan Indonesia, Nagari Lima Koto ikut serta dalam perjuangan mempertahankan kemerdekaan dan membangun bangsa.'
    },
    {
      year: '1980',
      title: 'Modernisasi',
      description: 'Dimulainya pembangunan infrastruktur modern seperti jalan, sekolah, dan fasilitas kesehatan untuk kemajuan nagari.'
    },
    {
      year: '2000',
      title: 'Era Digital',
      description: 'Memasuki era digitalisasi dengan penggunaan teknologi untuk pelayanan publik dan pengembangan ekonomi masyarakat.'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-8 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Sejarah <span className="text-yellow-400">Nagari</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Perjalanan panjang Nagari Lima Koto dari masa ke masa
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Historical Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-600 to-orange-700 shadow-2xl">
              <img 
                src="https://via.placeholder.com/600x450/D97706/000000?text=Sejarah+Nagari" 
                alt="Sejarah Nagari Lima Koto"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-500/20 rounded-full blur-xl"></div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index !== timelineEvents.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-yellow-400/30"></div>
                )}
                
                <div className="flex items-start space-x-4">
                  {/* Timeline dot */}
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-black text-sm font-bold">{index + 1}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                        {event.year}
                      </span>
                      <h4 className="text-white font-semibold text-lg">{event.title}</h4>
                    </div>
                    <p className="text-gray-200 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Historical Info */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Warisan Budaya</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
                </svg>
              </div>
              <h4 className="text-white font-semibold mb-2">Arsitektur Tradisional</h4>
              <p className="text-gray-200 text-sm">Rumah gadang dan bangunan adat yang masih terpelihara</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h4 className="text-white font-semibold mb-2">Seni & Budaya</h4>
              <p className="text-gray-200 text-sm">Randai, saluang, dan seni tradisional Minangkabau</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-white font-semibold mb-2">Nilai Filosofi</h4>
              <p className="text-gray-200 text-sm">Adat basandi syarak, syarak basandi kitabullah</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
