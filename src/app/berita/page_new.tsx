"use client";

import Image from "next/image";
import { FaEye, FaSearch, FaFilter, FaCalendarAlt, FaTags } from "react-icons/fa";
import Header from "@/components/Header";

export default function BeritaPage() {
  return (
    <div className="relative min-h-screen bg-[url('/images/background.png')] bg-cover bg-center text-white">
      <Header />
      <div className="bg-black/60 min-h-screen">
        <div className="container mx-auto px-6 py-20">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Berita Terkini
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Ikuti perkembangan terbaru dan informasi penting dari nagari kami
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari berita..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white/40"
                />
              </div>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition-colors">
                <FaFilter />
                Filter
              </button>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Semua</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 cursor-pointer">Pemerintahan</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 cursor-pointer">Ekonomi</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 cursor-pointer">Sosial</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content - Berita */}
            <section className="lg:col-span-3">
              {/* Featured News */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FaTags className="text-yellow-400" />
                  Berita Utama
                </h2>
                <a
                  href="/berita/jam-gadang-bukittinggi"
                  className="block bg-white text-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative">
                      <Image
                        src="/images/jamgadang.png"
                        alt="Jam Gadang"
                        width={600}
                        height={400}
                        className="w-full h-64 md:h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full">
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-2xl mb-3 group-hover:text-blue-600 transition-colors">
                          Jam Gadang Bukittinggi: Ikon Bersejarah yang Memukau Wisatawan
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          Bukittinggi terkenal akan salah satu lokasi wisatanya yaitu jam gadang yang menjadi ikon kota. 
                          Bangunan bersejarah ini menjadi daya tarik utama bagi wisatawan yang berkunjung...
                        </p>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt />
                            29 Juni 2025
                          </span>
                          <span className="flex items-center gap-1">
                            <FaEye />
                            169 views
                          </span>
                        </div>
                        <span className="text-blue-600 font-medium">Baca Selengkapnya →</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* News Grid */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Berita Lainnya</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* Berita 2 */}
                  <a
                    href="/berita/pembangunan-infrastruktur"
                    className="bg-white text-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-4xl">🏗️</span>
                      </div>
                      <span className="absolute top-3 right-3 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                        Pembangunan
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        Pembangunan Infrastruktur Jalan
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        Pemerintah nagari mulai melakukan perbaikan infrastruktur jalan menuju daerah wisata untuk mendukung pariwisata lokal.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>25 Juni 2025</span>
                        <span className="flex items-center gap-1">
                          <FaEye /> 95
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Berita 3 */}
                  <a
                    href="/berita/festival-budaya-2025"
                    className="bg-white text-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                        <span className="text-white text-4xl">🎭</span>
                      </div>
                      <span className="absolute top-3 right-3 px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                        Budaya
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        Festival Budaya Nagari 2025
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        Festival budaya tahunan akan diselenggarakan bulan depan dengan menampilkan berbagai kesenian tradisional.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>20 Juni 2025</span>
                        <span className="flex items-center gap-1">
                          <FaEye /> 142
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Berita 4 */}
                  <a
                    href="/berita/program-pemberdayaan-umkm"
                    className="bg-white text-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <span className="text-white text-4xl">🏪</span>
                      </div>
                      <span className="absolute top-3 right-3 px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                        Ekonomi
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        Program Pemberdayaan UMKM
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        Pelatihan dan bantuan modal untuk pelaku UMKM lokal guna meningkatkan perekonomian masyarakat nagari.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>18 Juni 2025</span>
                        <span className="flex items-center gap-1">
                          <FaEye /> 87
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Berita 5 */}
                  <a
                    href="/berita/gotong-royong-kebersihan"
                    className="bg-white text-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center">
                        <span className="text-white text-4xl">🧹</span>
                      </div>
                      <span className="absolute top-3 right-3 px-2 py-1 bg-orange-600 text-white text-xs rounded-full">
                        Sosial
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        Gotong Royong Kebersihan
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        Masyarakat bergotong royong membersihkan lingkungan nagari dalam rangka menyambut hari kemerdekaan.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>15 Juni 2025</span>
                        <span className="flex items-center gap-1">
                          <FaEye /> 73
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Berita 6 */}
                  <a
                    href="/berita/pelatihan-pertanian-organik"
                    className="bg-white text-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-green-500 to-lime-600 flex items-center justify-center">
                        <span className="text-white text-4xl">🌱</span>
                      </div>
                      <span className="absolute top-3 right-3 px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                        Pertanian
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        Pelatihan Pertanian Organik
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        Dinas Pertanian mengadakan pelatihan teknik pertanian organik untuk petani lokal guna meningkatkan hasil panen.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>12 Juni 2025</span>
                        <span className="flex items-center gap-1">
                          <FaEye /> 64
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Berita 7 */}
                  <a
                    href="/berita/renovasi-sekolah-dasar"
                    className="bg-white text-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-indigo-400 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-4xl">🏫</span>
                      </div>
                      <span className="absolute top-3 right-3 px-2 py-1 bg-indigo-600 text-white text-xs rounded-full">
                        Pendidikan
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        Renovasi Sekolah Dasar
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        Renovasi besar-besaran fasilitas sekolah dasar untuk menciptakan lingkungan belajar yang lebih nyaman.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>10 Juni 2025</span>
                        <span className="flex items-center gap-1">
                          <FaEye /> 91
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Berita 8 */}
                  <a
                    href="/berita/puskesmas-pelayanan-24-jam"
                    className="bg-white text-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-red-400 to-pink-600 flex items-center justify-center">
                        <span className="text-white text-4xl">🏥</span>
                      </div>
                      <span className="absolute top-3 right-3 px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                        Kesehatan
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        Puskesmas Layanan 24 Jam
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        Puskesmas nagari kini melayani masyarakat 24 jam untuk meningkatkan akses pelayanan kesehatan.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>8 Juni 2025</span>
                        <span className="flex items-center gap-1">
                          <FaEye /> 156
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Berita 9 */}
                  <a
                    href="/berita/digitalisasi-administrasi"
                    className="bg-white text-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-4xl">💻</span>
                      </div>
                      <span className="absolute top-3 right-3 px-2 py-1 bg-cyan-600 text-white text-xs rounded-full">
                        Teknologi
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        Digitalisasi Administrasi
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        Penerapan sistem digital dalam pelayanan administrasi kependudukan untuk mempermudah masyarakat.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>5 Juni 2025</span>
                        <span className="flex items-center gap-1">
                          <FaEye /> 134
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Berita 10 - tambahan */}
                  <a
                    href="/berita/program-beasiswa-pelajar"
                    className="bg-white text-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-4xl">🎓</span>
                      </div>
                      <span className="absolute top-3 right-3 px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                        Pendidikan
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        Program Beasiswa Pelajar Berprestasi
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        Nagari memberikan beasiswa kepada pelajar berprestasi untuk melanjutkan pendidikan ke jenjang yang lebih tinggi.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>3 Juni 2025</span>
                        <span className="flex items-center gap-1">
                          <FaEye /> 89
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Berita 11 - tambahan */}
                  <a
                    href="/berita/peningkatan-infrastruktur-air-bersih"
                    className="bg-white text-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-blue-300 to-cyan-500 flex items-center justify-center">
                        <span className="text-white text-4xl">💧</span>
                      </div>
                      <span className="absolute top-3 right-3 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                        Infrastruktur
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        Peningkatan Akses Air Bersih
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        Pembangunan sistem penyediaan air bersih untuk memenuhi kebutuhan warga di daerah terpencil.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>1 Juni 2025</span>
                        <span className="flex items-center gap-1">
                          <FaEye /> 76
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Berita 12 - tambahan */}
                  <a
                    href="/berita/workshop-kreativitas-pemuda"
                    className="bg-white text-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                        <span className="text-white text-4xl">🎨</span>
                      </div>
                      <span className="absolute top-3 right-3 px-2 py-1 bg-orange-600 text-white text-xs rounded-full">
                        Kepemudaan
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        Workshop Kreativitas Pemuda
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        Karang taruna mengadakan workshop kreativitas untuk mengembangkan bakat dan keterampilan pemuda.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>30 Mei 2025</span>
                        <span className="flex items-center gap-1">
                          <FaEye /> 102
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-center space-x-2">
                <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  ← Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  1
                </button>
                <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  3
                </button>
                <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  Next →
                </button>
              </div>
            </section>

            {/* Sidebar - Agenda */}
            <aside className="lg:col-span-1">
              <div className="sticky top-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <FaCalendarAlt className="text-yellow-400" />
                    Agenda Terkini
                  </h2>
                  <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin [--sb-thumb:rgba(255,255,255,0.1)] [--sb-track:rgba(255,255,255,0.05)] scrollbar-thumb-[var(--sb-thumb)] scrollbar-track-[var(--sb-track)]">
                    <div className="bg-white text-black rounded-lg p-4 shadow-md">
                      <h3 className="font-bold text-base mb-2">Presentasi KKN</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Oleh:</strong> KKN UNP 2025
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Di:</strong> Lantai 2 Kantor Wali Nagari
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>25 Juli 2025</span>
                        <span>08:00 - 12:00</span>
                      </div>
                    </div>

                    <div className="bg-white text-black rounded-lg p-4 shadow-md">
                      <h3 className="font-bold text-base mb-2">Rapat Koordinasi BPD</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Oleh:</strong> Badan Permusyawaratan Desa
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Di:</strong> Balai Nagari
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>22 Juli 2025</span>
                        <span>09:00 - 11:30</span>
                      </div>
                    </div>

                    <div className="bg-white text-black rounded-lg p-4 shadow-md">
                      <h3 className="font-bold text-base mb-2">Sosialisasi Program Kesehatan</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Oleh:</strong> Puskesmas Nagari
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Di:</strong> Lapangan Nagari
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>20 Juli 2025</span>
                        <span>14:00 - 16:00</span>
                      </div>
                    </div>

                    <div className="bg-white text-black rounded-lg p-4 shadow-md">
                      <h3 className="font-bold text-base mb-2">Pelatihan Digital Marketing</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Oleh:</strong> Dinas Koperasi & UMKM
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Di:</strong> Gedung Serbaguna
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>18 Juli 2025</span>
                        <span>08:30 - 15:00</span>
                      </div>
                    </div>

                    <div className="bg-white text-black rounded-lg p-4 shadow-md">
                      <h3 className="font-bold text-base mb-2">Musyawarah Nagari</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Oleh:</strong> Pemerintah Nagari
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Di:</strong> Kantor Wali Nagari
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>15 Juli 2025</span>
                        <span>19:30 - 21:00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Statistik Berita</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Berita</span>
                      <span className="font-bold">248</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bulan Ini</span>
                      <span className="font-bold">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Views</span>
                      <span className="font-bold">15.2K</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
