'use client';


export default function ProfilSingkat() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-8 py-24">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Image */}
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl">
            <img 
              src="https://via.placeholder.com/500x500/FCD34D/000000?text=Profil+Nagari" 
              alt="Profil Nagari Lima Koto"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
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
      </div>
    </div>
  );
}
