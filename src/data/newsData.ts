export interface NewsItem {
  id: string;
  href: string;
  title: string;
  excerpt: string;
  date: string;
  views: number;
  category: string;
  categoryColor: string;
  backgroundGradient: string;
  emoji: string;
  imageSrc?: string;
  isFeatured?: boolean;
}

export interface AgendaItem {
  id: string;
  title: string;
  organizer: string;
  location: string;
  date: string;
  time: string;
  emoji: string;
  gradientClass: string;
  borderClass: string;
  dateColorClass: string;
}

export const mockNewsData: NewsItem[] = [
  {
    id: "1",
    href: "/berita/jam-gadang-bukittinggi",
    title: "Jam Gadang Bukittinggi: Ikon Bersejarah yang Memukau Wisatawan",
    excerpt: "Bukittinggi terkenal akan salah satu lokasi wisatanya yaitu jam gadang yang menjadi ikon kota. Bangunan bersejarah ini menjadi daya tarik utama bagi wisatawan yang berkunjung ke kota ini dan menjadi landmark yang tak terlupakan.",
    date: "29 Juni 2025",
    views: 169,
    category: "Trending",
    categoryColor: "bg-gradient-to-r from-red-500 to-pink-600",
    backgroundGradient: "bg-gradient-to-br from-blue-400 to-blue-600",
    emoji: "🏛️",
    imageSrc: "/images/jamgadang.png",
    isFeatured: true
  },
  {
    id: "2",
    href: "/berita/pembangunan-infrastruktur",
    title: "Pembangunan Infrastruktur Jalan",
    excerpt: "Pemerintah nagari mulai melakukan perbaikan infrastruktur jalan menuju daerah wisata untuk mendukung pariwisata lokal dan meningkatkan aksesibilitas.",
    date: "25 Juni 2025",
    views: 95,
    category: "Pembangunan",
    categoryColor: "bg-blue-600",
    backgroundGradient: "bg-gradient-to-br from-blue-400 to-blue-600",
    emoji: "🏗️"
  },
  {
    id: "3",
    href: "/berita/festival-budaya-2025",
    title: "Festival Budaya Nagari 2025",
    excerpt: "Festival budaya tahunan akan diselenggarakan bulan depan dengan menampilkan berbagai kesenian tradisional dan kuliner khas daerah.",
    date: "20 Juni 2025",
    views: 142,
    category: "Budaya",
    categoryColor: "bg-purple-600",
    backgroundGradient: "bg-gradient-to-br from-purple-400 to-pink-600",
    emoji: "🎭"
  },
  {
    id: "4",
    href: "/berita/program-pemberdayaan-umkm",
    title: "Program Pemberdayaan UMKM",
    excerpt: "Pelatihan dan bantuan modal untuk pelaku UMKM lokal guna meningkatkan perekonomian masyarakat nagari.",
    date: "18 Juni 2025",
    views: 87,
    category: "Ekonomi",
    categoryColor: "bg-green-600",
    backgroundGradient: "bg-gradient-to-br from-green-400 to-green-600",
    emoji: "🏪"
  },
  {
    id: "5",
    href: "/berita/gotong-royong-kebersihan",
    title: "Gotong Royong Kebersihan",
    excerpt: "Masyarakat bergotong royong membersihkan lingkungan nagari dalam rangka menyambut hari kemerdekaan.",
    date: "15 Juni 2025",
    views: 73,
    category: "Sosial",
    categoryColor: "bg-orange-600",
    backgroundGradient: "bg-gradient-to-br from-yellow-400 to-orange-600",
    emoji: "🧹"
  },
  {
    id: "6",
    href: "/berita/pelatihan-pertanian-organik",
    title: "Pelatihan Pertanian Organik",
    excerpt: "Dinas Pertanian mengadakan pelatihan teknik pertanian organik untuk petani lokal guna meningkatkan hasil panen.",
    date: "12 Juni 2025",
    views: 64,
    category: "Pertanian",
    categoryColor: "bg-green-600",
    backgroundGradient: "bg-gradient-to-br from-green-500 to-lime-600",
    emoji: "🌱"
  },
  {
    id: "7",
    href: "/berita/renovasi-sekolah-dasar",
    title: "Renovasi Sekolah Dasar",
    excerpt: "Renovasi besar-besaran fasilitas sekolah dasar untuk menciptakan lingkungan belajar yang lebih nyaman dan modern.",
    date: "10 Juni 2025",
    views: 91,
    category: "Pendidikan",
    categoryColor: "bg-indigo-600",
    backgroundGradient: "bg-gradient-to-br from-indigo-400 to-blue-600",
    emoji: "🏫"
  },
  {
    id: "8",
    href: "/berita/puskesmas-pelayanan-24-jam",
    title: "Puskesmas Layanan 24 Jam",
    excerpt: "Puskesmas nagari kini melayani masyarakat 24 jam untuk meningkatkan akses pelayanan kesehatan yang lebih baik.",
    date: "8 Juni 2025",
    views: 156,
    category: "Kesehatan",
    categoryColor: "bg-red-600",
    backgroundGradient: "bg-gradient-to-br from-red-400 to-pink-600",
    emoji: "🏥"
  },
  {
    id: "9",
    href: "/berita/digitalisasi-administrasi",
    title: "Digitalisasi Administrasi",
    excerpt: "Penerapan sistem digital dalam pelayanan administrasi kependudukan untuk mempermudah masyarakat dalam mengurus dokumen.",
    date: "5 Juni 2025",
    views: 134,
    category: "Teknologi",
    categoryColor: "bg-cyan-600",
    backgroundGradient: "bg-gradient-to-br from-cyan-400 to-blue-600",
    emoji: "💻"
  },
  {
    id: "10",
    href: "/berita/program-beasiswa-pelajar",
    title: "Program Beasiswa Pelajar Berprestasi",
    excerpt: "Nagari memberikan beasiswa kepada pelajar berprestasi untuk melanjutkan pendidikan ke jenjang yang lebih tinggi.",
    date: "3 Juni 2025",
    views: 89,
    category: "Pendidikan",
    categoryColor: "bg-purple-600",
    backgroundGradient: "bg-gradient-to-br from-violet-400 to-purple-600",
    emoji: "🎓"
  }
];

export const mockAgendaData: AgendaItem[] = [
  {
    id: "1",
    title: "Presentasi KKN",
    organizer: "KKN UNP 2025",
    location: "Lantai 2 Kantor Wali Nagari",
    date: "25 Juli 2025",
    time: "08:00 - 12:00",
    emoji: "📋",
    gradientClass: "bg-gradient-to-br from-white to-blue-50",
    borderClass: "border border-blue-100",
    dateColorClass: "text-blue-600 bg-blue-100"
  },
  {
    id: "2",
    title: "Rapat Koordinasi BPD",
    organizer: "Badan Permusyawaratan Desa",
    location: "Balai Nagari",
    date: "22 Juli 2025",
    time: "09:00 - 11:30",
    emoji: "🏛️",
    gradientClass: "bg-gradient-to-br from-white to-purple-50",
    borderClass: "border border-purple-100",
    dateColorClass: "text-purple-600 bg-purple-100"
  },
  {
    id: "3",
    title: "Sosialisasi Program Kesehatan",
    organizer: "Puskesmas Nagari",
    location: "Lapangan Nagari",
    date: "20 Juli 2025",
    time: "14:00 - 16:00",
    emoji: "🏥",
    gradientClass: "bg-gradient-to-br from-white to-green-50",
    borderClass: "border border-green-100",
    dateColorClass: "text-green-600 bg-green-100"
  },
  {
    id: "4",
    title: "Pelatihan Digital Marketing",
    organizer: "Dinas Koperasi & UMKM",
    location: "Gedung Serbaguna",
    date: "18 Juli 2025",
    time: "08:30 - 15:00",
    emoji: "💼",
    gradientClass: "bg-gradient-to-br from-white to-orange-50",
    borderClass: "border border-orange-100",
    dateColorClass: "text-orange-600 bg-orange-100"
  },
  {
    id: "5",
    title: "Musyawarah Nagari",
    organizer: "Pemerintah Nagari",
    location: "Kantor Wali Nagari",
    date: "15 Juli 2025",
    time: "19:30 - 21:00",
    emoji: "🗣️",
    gradientClass: "bg-gradient-to-br from-white to-red-50",
    borderClass: "border border-red-100",
    dateColorClass: "text-red-600 bg-red-100"
  },
  {
    id: "6",
    title: "Festival Seni Budaya",
    organizer: "Sanggar Seni Nagari",
    location: "Panggung Terbuka",
    date: "12 Juli 2025",
    time: "16:00 - 22:00",
    emoji: "🎨",
    gradientClass: "bg-gradient-to-br from-white to-pink-50",
    borderClass: "border border-pink-100",
    dateColorClass: "text-pink-600 bg-pink-100"
  }
];
