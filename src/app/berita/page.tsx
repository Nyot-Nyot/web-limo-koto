"use client";

import Image from "next/image";
import { FaEye, FaSearch, FaFilter, FaCalendarAlt, FaTags } from "react-icons/fa";
import Header from "@/components/Header";

export default function BeritaPage() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ zIndex: -2 }}
      />
      
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70" style={{ zIndex: -1 }} />
      
      <Header />
      <div className="bg-black/60 min-h-screen">
        <div className="container mx-auto px-6 py-20 text-white">
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
          <div className="mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="flex flex-col lg:flex-row gap-6 items-center">
                  {/* Search Input */}
                  <div className="relative flex-1 w-full lg:max-w-lg">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaSearch className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="text"
                      placeholder="Cari berita, topik, atau kata kunci..."
                      className="block w-full pl-12 pr-4 py-4 text-base bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 shadow-lg hover:bg-white/25"
                    />
                  </div>
                  
                  {/* Sort and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <div className="relative">
                      <select className="appearance-none bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-6 py-4 pr-12 text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer min-w-[160px] shadow-lg hover:bg-white/25 transition-all duration-300">
                        <option value="latest" className="bg-gray-800 text-white">🕒 Terbaru</option>
                        <option value="popular" className="bg-gray-800 text-white">🔥 Terpopuler</option>
                        <option value="oldest" className="bg-gray-800 text-white">📅 Terlama</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <FaFilter className="h-4 w-4 text-blue-300" />
                      </div>
                    </div>
                    
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[120px]">
                      🔍 Cari
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
            {/* Main Content - Berita */}
            <section className="xl:col-span-3">
              {/* Featured News */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Berita Utama
                  </h2>
                </div>
                <a
                  href="/berita/jam-gadang-bukittinggi"
                  className="block bg-white text-black rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] group border border-gray-100"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                    <div className="relative overflow-hidden">
                      <Image
                        src="/images/jamgadang.png"
                        alt="Jam Gadang"
                        width={600}
                        height={400}
                        className="w-full h-72 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-semibold rounded-full shadow-lg">
                          🔥 Trending
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-2xl lg:text-3xl mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                          Jam Gadang Bukittinggi: Ikon Bersejarah yang Memukau Wisatawan
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed text-lg line-clamp-4">
                          Bukittinggi terkenal akan salah satu lokasi wisatanya yaitu jam gadang yang menjadi ikon kota. 
                          Bangunan bersejarah ini menjadi daya tarik utama bagi wisatawan yang berkunjung ke kota ini dan menjadi landmark yang tak terlupakan.
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6 text-gray-500">
                          <span className="flex items-center gap-2 text-sm">
                            <FaCalendarAlt className="text-blue-500" />
                            29 Juni 2025
                          </span>
                          <span className="flex items-center gap-2 text-sm">
                            <FaEye className="text-green-500" />
                            169 views
                          </span>
                        </div>
                        <span className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                          Baca Selengkapnya →
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* News Grid */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Berita Lainnya
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {/* Berita 2 */}
                  <a
                    href="/berita/pembangunan-infrastruktur"
                    className="bg-white text-black rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] group border border-gray-100"
                  >
                    <div className="relative overflow-hidden">
                      <div className="w-full h-52 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative">
                        <span className="text-white text-5xl filter drop-shadow-lg">🏗️</span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      </div>
                      <span className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-lg">
                        Pembangunan
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        Pembangunan Infrastruktur Jalan
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        Pemerintah nagari mulai melakukan perbaikan infrastruktur jalan menuju daerah wisata untuk mendukung pariwisata lokal dan meningkatkan aksesibilitas.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt className="text-blue-400" />
                          25 Juni 2025
                        </span>
                        <span className="flex items-center gap-1">
                          <FaEye className="text-green-400" />
                          95
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Berita 3 */}
                  <a
                    href="/berita/festival-budaya-2025"
                    className="bg-white text-black rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] group border border-gray-100"
                  >
                    <div className="relative overflow-hidden">
                      <div className="w-full h-52 bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center relative">
                        <span className="text-white text-5xl filter drop-shadow-lg">🎭</span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      </div>
                      <span className="absolute top-4 right-4 px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full shadow-lg">
                        Budaya
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        Festival Budaya Nagari 2025
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        Festival budaya tahunan akan diselenggarakan bulan depan dengan menampilkan berbagai kesenian tradisional dan kuliner khas daerah.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt className="text-blue-400" />
                          20 Juni 2025
                        </span>
                        <span className="flex items-center gap-1">
                          <FaEye className="text-green-400" />
                          142
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

                  {/* Additional News Articles */}
                  
                  {/* Berita 13 */}
                  <a
                    href="/berita/pembangunan-jembatan-baru"
                    className="bg-white text-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                        <span className="text-white text-4xl">🌉</span>
                      </div>
                      <span className="absolute top-3 right-3 px-2 py-1 bg-gray-600 text-white text-xs rounded-full">
                        Infrastruktur
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        Pembangunan Jembatan Penghubung
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        Konstruksi jembatan baru untuk menghubungkan dua sisi nagari dan memperlancar akses transportasi.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>28 Mei 2025</span>
                        <span className="flex items-center gap-1">
                          <FaEye /> 67
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Berita 14 */}
                  <a
                    href="/berita/launching-website-nagari"
                    className="bg-white text-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-4xl">🌐</span>
                      </div>
                      <span className="absolute top-3 right-3 px-2 py-1 bg-indigo-600 text-white text-xs rounded-full">
                        Teknologi
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        Launching Website Resmi Nagari
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        Peluncuran website resmi nagari untuk meningkatkan transparansi dan akses informasi publik.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>26 Mei 2025</span>
                        <span className="flex items-center gap-1">
                          <FaEye /> 198
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Berita 15 */}
                  <a
                    href="/berita/penanaman-pohon-massal"
                    className="bg-white text-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                        <span className="text-white text-4xl">🌳</span>
                      </div>
                      <span className="absolute top-3 right-3 px-2 py-1 bg-green-700 text-white text-xs rounded-full">
                        Lingkungan
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        Penanaman 1000 Pohon
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        Gerakan penanaman pohon massal untuk menjaga kelestarian lingkungan dan mencegah erosi.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>24 Mei 2025</span>
                        <span className="flex items-center gap-1">
                          <FaEye /> 123
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center space-x-3 mt-12">
                <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-white font-medium shadow-lg hover:shadow-xl">
                  ← Previous
                </button>
                <button className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg">
                  1
                </button>
                <button className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-white">
                  2
                </button>
                <button className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-white">
                  3
                </button>
                <span className="px-2 text-white/60">...</span>
                <button className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-white">
                  10
                </button>
                <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-white font-medium shadow-lg hover:shadow-xl">
                  Next →
                </button>
              </div>
            </section>

            {/* Sidebar - Agenda */}
            <aside className="xl:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-blue-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                      Agenda Terkini
                    </h2>
                  </div>
                  <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                    <div className="bg-gradient-to-br from-white to-blue-50 text-black rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-blue-100">
                      <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                        📋 Presentasi KKN
                      </h3>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          <strong>Oleh:</strong> KKN UNP 2025
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          <strong>Di:</strong> Lantai 2 Kantor Wali Nagari
                        </p>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full">25 Juli 2025</span>
                        <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full">08:00 - 12:00</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-white to-purple-50 text-black rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-purple-100">
                      <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                        🏛️ Rapat Koordinasi BPD
                      </h3>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                          <strong>Oleh:</strong> Badan Permusyawaratan Desa
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          <strong>Di:</strong> Balai Nagari
                        </p>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full">22 Juli 2025</span>
                        <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full">09:00 - 11:30</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-white to-green-50 text-black rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-green-100">
                      <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                        🏥 Sosialisasi Program Kesehatan
                      </h3>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          <strong>Oleh:</strong> Puskesmas Nagari
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          <strong>Di:</strong> Lapangan Nagari
                        </p>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full">20 Juli 2025</span>
                        <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full">14:00 - 16:00</span>
                      </div>
                    </div>

                    <div className="bg-white text-black rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="font-bold text-base mb-2 text-gray-900">Pelatihan Digital Marketing</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Oleh:</strong> Dinas Koperasi & UMKM
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Di:</strong> Gedung Serbaguna
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>18 Juli 2025</span>
                        <span>08:30 - 15:00</span>
                      </div>
                    </div>

                    <div className="bg-white text-black rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="font-bold text-base mb-2 text-gray-900">Musyawarah Nagari</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Oleh:</strong> Pemerintah Nagari
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Di:</strong> Kantor Wali Nagari
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>15 Juli 2025</span>
                        <span>19:30 - 21:00</span>
                      </div>
                    </div>

                    <div className="bg-white text-black rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="font-bold text-base mb-2 text-gray-900">Festival Seni Budaya</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Oleh:</strong> Sanggar Seni Nagari
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Di:</strong> Panggung Terbuka
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>12 Juli 2025</span>
                        <span>16:00 - 22:00</span>
                      </div>
                    </div>

                    <div className="bg-white text-black rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="font-bold text-base mb-2 text-gray-900">Vaksinasi Massal</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Oleh:</strong> Dinkes & Puskesmas
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Di:</strong> Balai Desa
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>10 Juli 2025</span>
                        <span>08:00 - 14:00</span>
                      </div>
                    </div>

                    <div className="bg-white text-black rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="font-bold text-base mb-2 text-gray-900">Pengumpulan Zakat Fitrah</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Oleh:</strong> Panitia Ramadhan
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Di:</strong> Masjid Jami' Nagari
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>8 Juli 2025</span>
                        <span>07:00 - 11:00</span>
                      </div>
                    </div>

                    <div className="bg-white text-black rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="font-bold text-base mb-2 text-gray-900">Lomba 17 Agustus</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Oleh:</strong> Karang Taruna
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Di:</strong> Lapangan Utama
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>6 Juli 2025</span>
                        <span>08:00 - 17:00</span>
                      </div>
                    </div>

                    <div className="bg-white text-black rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="font-bold text-base mb-2 text-gray-900">Gotong Royong Masjid</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Oleh:</strong> Takmir Masjid
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Di:</strong> Masjid Al-Hidayah
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>4 Juli 2025</span>
                        <span>06:30 - 10:00</span>
                      </div>
                    </div>

                    <div className="bg-white text-black rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="font-bold text-base mb-2 text-gray-900">Pembagian Bantuan Sembako</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Oleh:</strong> Tim Sosial Nagari
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Di:</strong> Kantor Kepala Desa
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>2 Juli 2025</span>
                        <span>09:00 - 15:00</span>
                      </div>
                    </div>

                    <div className="bg-white text-black rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="font-bold text-base mb-2 text-gray-900">Senam Sehat Lansia</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Oleh:</strong> Posyandu Lansia
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Di:</strong> Taman Nagari
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Setiap Jumat</span>
                        <span>06:30 - 08:00</span>
                      </div>
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
