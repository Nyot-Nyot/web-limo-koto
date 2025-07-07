"use client";
import Image from "next/image";
import { FaEye, FaCalendarAlt, FaUser, FaArrowLeft, FaShare, FaFacebook, FaTwitter, FaWhatsapp, FaTags } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function BeritaDetailPage() {
  const router = useRouter();
  const params = useParams();

  // Mock data untuk berita - dalam implementasi nyata, ini akan diambil dari API berdasarkan slug
  const newsData: Record<string, any> = {
    "jam-gadang-bukittinggi": {
      title: "Jam Gadang Bukittinggi: Ikon Bersejarah yang Memukau Wisatawan",
      image: "/images/jamgadang.png",
      author: "Admin Nagari",
      date: "29 Juni 2025",
      views: 169,
      category: "Wisata",
      tags: ["Wisata", "Bukittinggi", "Sejarah", "Budaya", "Minangkabau"],
      content: `
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Jam Gadang adalah menara jam yang menjadi ikon kota Bukittinggi, 
          Sumatera Barat. Bangunan bersejarah ini tidak hanya berfungsi sebagai 
          penunjuk waktu, tetapi juga menjadi saksi bisu perjalanan sejarah 
          kota Bukittinggi yang kaya akan budaya Minangkabau.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Sejarah dan Arsitektur</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Dibangun pada masa pemerintahan Hindia Belanda pada tahun 1926, 
          Jam Gadang memiliki tinggi sekitar 26 meter dan menjadi landmark 
          utama kota Bukittinggi. Arsitektur bangunan ini menggabungkan 
          gaya kolonial Belanda dengan sentuhan budaya Minangkabau yang khas.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Yang unik dari Jam Gadang adalah penggunaan angka Romawi IIII 
          sebagai pengganti IV pada jam 4. Hal ini menjadi ciri khas yang 
          membedakannya dari jam-jam lainnya di dunia. Konon, hal ini 
          dilakukan untuk menjaga keseimbangan visual pada muka jam.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Daya Tarik Wisata</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Selain sebagai penunjuk waktu, Jam Gadang juga menjadi pusat 
          berbagai kegiatan masyarakat dan wisatawan. Area sekitar jam 
          ini sering digunakan untuk acara-acara budaya, festival, dan 
          perayaan hari-hari besar.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Kawasan Jam Gadang juga dikelilingi oleh berbagai toko souvenir, 
          restoran, dan pedagang makanan tradisional Minang. Wisatawan 
          dapat menikmati kuliner khas sambil menikmati pemandangan 
          menara jam yang megah.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Tips Berkunjung</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Waktu terbaik berkunjung adalah sore hari menjelang maghrib untuk menikmati sunset</li>
          <li>Area parkir tersedia di sekitar lokasi, namun bisa ramai pada akhir pekan</li>
          <li>Jangan lupa mencoba makanan khas Minang di warung-warung sekitar</li>
          <li>Bawa kamera untuk mengabadikan momen di landmark bersejarah ini</li>
        </ul>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Jam Gadang bukan sekadar bangunan bersejarah, tetapi juga 
          representasi dari kekayaan budaya dan sejarah Sumatera Barat. 
          Kehadirannya di tengah kota Bukittinggi terus menjadi magnet 
          bagi wisatawan domestik maupun mancanegara yang ingin merasakan 
          nostalgia dan keindahan arsitektur masa lampau.
        </p>
      `
    },
    "pembangunan-infrastruktur": {
      title: "Pembangunan Infrastruktur Jalan Menuju Kawasan Wisata",
      image: null,
      author: "Tim Humas",
      date: "25 Juni 2025", 
      views: 95,
      category: "Pembangunan",
      tags: ["Infrastruktur", "Pembangunan", "Wisata", "Jalan"],
      content: `
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Pemerintah nagari telah memulai proyek pembangunan infrastruktur jalan 
          menuju kawasan wisata utama dalam upaya meningkatkan aksesibilitas dan 
          mendukung pengembangan sektor pariwisata lokal.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Detail Proyek</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Proyek pembangunan ini meliputi perbaikan jalan sepanjang 5 kilometer 
          dengan lebar 6 meter, pemasangan penerangan jalan umum, dan pembangunan 
          drainase yang memadai untuk mencegah genangan air saat musim hujan.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Anggaran yang dialokasikan untuk proyek ini mencapai Rp 2,5 miliar 
          yang berasal dari dana desa dan bantuan pemerintah daerah. Proyek 
          ini diharapkan selesai dalam waktu 6 bulan ke depan.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Manfaat untuk Masyarakat</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Pembangunan infrastruktur ini diharapkan dapat meningkatkan jumlah 
          kunjungan wisatawan, membuka lapangan kerja baru bagi masyarakat lokal, 
          dan meningkatkan pendapatan ekonomi nagari dari sektor pariwisata.
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Selain itu, akses yang lebih baik juga akan memudahkan masyarakat 
          dalam melakukan aktivitas sehari-hari dan transportasi hasil pertanian 
          ke pasar.
        </p>
      `
    }
  };

  // Get current news data based on slug
  const currentNews = newsData[params.slug as string] || newsData["jam-gadang-bukittinggi"];

  return (
    <div className="relative min-h-screen">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ zIndex: -2 }}
      />
      
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70" style={{ zIndex: -1 }} />
      
      <main className="relative z-10 min-h-screen text-white">
        {/* Header dengan tombol kembali */}
        <div className="px-6 py-6 border-b border-white/20 backdrop-blur-sm bg-black/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
            >
              <FaArrowLeft /> Kembali ke Berita
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">Bagikan:</span>
              <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">
                <FaShare className="text-sm" />
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-300 mb-8">
              <a href="/" className="hover:text-white transition-colors">Beranda</a>
              <span className="mx-2">/</span>
              <a href="/berita" className="hover:text-white transition-colors">Berita</a>
              <span className="mx-2">/</span>
              <span className="text-white">{currentNews.title}</span>
            </nav>

            {/* Artikel */}
            <article className="bg-white text-black rounded-2xl overflow-hidden shadow-2xl">
              {/* Header gambar */}
              <div className="relative">
                {currentNews.image ? (
                  <Image
                    src={currentNews.image}
                    alt={currentNews.title}
                    width={1200}
                    height={600}
                    className="w-full h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-96 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-6xl">🏗️</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
                    {currentNews.category}
                  </span>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-600" />
                    <span>{currentNews.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUser className="text-green-600" />
                    <span>{currentNews.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEye className="text-orange-600" />
                    <span>{currentNews.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTags className="text-purple-600" />
                    <span>{currentNews.category}</span>
                  </div>
                </div>

                {/* Judul */}
                <h1 className="font-bold text-4xl lg:text-5xl mb-8 leading-tight text-gray-900">
                  {currentNews.title}
                </h1>

                {/* Konten artikel */}
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: currentNews.content }} />
                </div>

                {/* Share buttons */}
                <div className="border-t border-gray-200 pt-8 mt-12">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <h3 className="font-semibold text-gray-900 text-lg">Bagikan artikel ini:</h3>
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <FaFacebook />
                        Facebook
                      </button>
                      <button className="flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                        <FaTwitter />
                        Twitter
                      </button>
                      <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <FaWhatsapp />
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="border-t border-gray-200 pt-8 mt-8">
                  <h3 className="font-semibold text-gray-900 mb-4 text-lg">Tags:</h3>
                  <div className="flex flex-wrap gap-3">
                    {currentNews.tags.map((tag: string, index: number) => (
                      <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* Berita terkait */}
            <section className="mt-16">
              <h2 className="text-4xl font-bold mb-8 text-center">Berita Terkait</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <a href="/berita/festival-budaya-2025" className="bg-white text-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                    <span className="text-white text-5xl">🎭</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors">Festival Budaya Nagari 2025</h3>
                    <p className="text-sm text-gray-600 mb-4">Festival budaya tahunan akan diselenggarakan bulan depan...</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>20 Juni 2025</span>
                      <span className="flex items-center gap-1"><FaEye /> 142</span>
                    </div>
                  </div>
                </a>

                <a href="/berita/pembangunan-infrastruktur" className="bg-white text-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-5xl">🏗️</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors">Pembangunan Infrastruktur Jalan</h3>
                    <p className="text-sm text-gray-600 mb-4">Pemerintah nagari mulai melakukan perbaikan infrastruktur...</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>25 Juni 2025</span>
                      <span className="flex items-center gap-1"><FaEye /> 95</span>
                    </div>
                  </div>
                </a>

                <a href="/berita/program-pemberdayaan-umkm" className="bg-white text-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                  <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <span className="text-white text-5xl">🏪</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors">Program Pemberdayaan UMKM</h3>
                    <p className="text-sm text-gray-600 mb-4">Pelatihan dan bantuan modal untuk pelaku UMKM lokal...</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>18 Juni 2025</span>
                      <span className="flex items-center gap-1"><FaEye /> 87</span>
                    </div>
                  </div>
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
