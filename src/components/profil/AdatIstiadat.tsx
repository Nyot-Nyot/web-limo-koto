'use client';

export default function AdatIstiadat() {
  const adatCategories = [
    {
      title: 'Sistem Pemerintahan Adat',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
        </svg>
      ),
      items: ['Penghulu', 'Ninik Mamak', 'Alim Ulama', 'Cadiak Pandai', 'Bundo Kanduang']
    },
    {
      title: 'Upacara Adat',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      items: ['Batagak Penghulu', 'Turun Mandi', 'Baralek', 'Basunat Rasul', 'Mambangkik Batang Tarandam']
    },
    {
      title: 'Filosofi Hidup',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      items: ['Adat Basandi Syarak', 'Syarak Basandi Kitabullah', 'Alam Takambang Jadi Guru', 'Buya Alam Minang', 'Hikmah Falasafah']
    }
  ];

  const traditionalValues = [
    {
      title: 'Gotong Royong',
      description: 'Semangat kerja sama dalam kehidupan bermasyarakat',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Musyawarah',
      description: 'Pengambilan keputusan secara bersama-sama',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Kekeluargaan',
      description: 'Ikatan persaudaraan yang kuat antar sesama',
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Sopan Santun',
      description: 'Tata krama dan budi pekerti yang luhur',
      color: 'from-red-500 to-pink-500'
    }
  ];

  return (
    <div className="flex items-center justify-center px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Adat <span className="text-yellow-400">Istiadat</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Warisan budaya yang dijaga dan dilestarikan secara turun-temurun
          </p>
        </div>

        {/* Main Philosophy */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 mb-12 text-center">
          <h3 className="text-3xl font-bold text-black mb-4">
            "Adat Basandi Syarak, Syarak Basandi Kitabullah"
          </h3>
          <p className="text-black/80 text-lg max-w-4xl mx-auto">
            Filosofi dasar masyarakat Minangkabau yang menjadi pedoman hidup, 
            dimana adat berlandaskan syariat Islam, dan syariat Islam berlandaskan Al-Quran
          </p>
        </div>

        {/* Adat Categories */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {adatCategories.map((category, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-black">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Traditional Values */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            Nilai-Nilai <span className="text-yellow-400">Tradisional</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {traditionalValues.map((value, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`bg-gradient-to-br ${value.color} rounded-2xl p-6 shadow-2xl group-hover:scale-105 transition-transform duration-300`}>
                  <h4 className="text-white font-bold text-lg mb-2">{value.title}</h4>
                  <p className="text-white/90 text-sm">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Practices */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">
              Praktik <span className="text-yellow-400">Budaya</span>
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Sistem Matrilineal',
                  description: 'Garis keturunan dihitung dari pihak ibu, dengan warisan pusaka turun dari mamak ke kemenakannya.'
                },
                {
                  title: 'Rumah Gadang',
                  description: 'Rumah adat dengan arsitektur khas yang menjadi simbol kebesaran dan martabat keluarga.'
                },
                {
                  title: 'Surau',
                  description: 'Tempat ibadah dan pusat pendidikan agama serta budaya bagi masyarakat.'
                },
                {
                  title: 'Balai Adat',
                  description: 'Tempat bermusyawarah dan pengambilan keputusan adat yang penting.'
                }
              ].map((practice, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="text-yellow-400 font-semibold text-lg mb-2">{practice.title}</h4>
                  <p className="text-gray-200 leading-relaxed">{practice.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-600 to-red-600 shadow-2xl">
              <img 
                src="https://placehold.co/600x450" 
                alt="Adat Istiadat Nagari Lima Koto"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-red-500/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
