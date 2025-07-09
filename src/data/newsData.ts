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
  tags?: string[];
  blocks?: {
    type: 'subheading' | 'text' | 'image' | 'video' | 'quote' | 'list';
    content?: string;
    url?: string;
    caption?: string;
    items?: string[];
  }[];
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
    isFeatured: true,
    tags: ["trending", "pariwisata", "sejarah", "budaya"]
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
    emoji: "🏗️",
    tags: ["pembangunan", "infrastruktur", "pariwisata"]
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
    emoji: "🎭",
    tags: ["budaya", "festival", "seni", "kuliner"]
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
    emoji: "🏪",
    tags: ["ekonomi", "umkm", "pemberdayaan", "pelatihan"]
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
    emoji: "🧹",
    tags: ["sosial", "gotong-royong", "kebersihan", "kemerdekaan"]
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
    emoji: "🌱",
    tags: ["pertanian", "organik", "pelatihan", "petani"]
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
    emoji: "🏫",
    tags: ["pendidikan", "renovasi", "sekolah", "infrastruktur"]
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
    emoji: "🏥",
    tags: ["kesehatan", "puskesmas", "pelayanan", "masyarakat"]
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
    emoji: "💻",
    tags: ["teknologi", "digital", "administrasi", "pelayanan"]
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
    emoji: "🎓",
    tags: ["pendidikan", "beasiswa", "prestasi", "pelajar"]
  },
  {
    id: "11",
    href: "/berita/lomba-desa-digital",
    title: "Nagari Lima Koto Juara Lomba Desa Digital",
    excerpt: "Prestasi membanggakan! Nagari Lima Koto berhasil meraih juara pertama dalam Lomba Desa Digital tingkat provinsi berkat inovasi website dan layanan digital yang telah dikembangkan.",
    date: "8 Juli 2025",
    views: 245,
    category: "Prestasi",
    categoryColor: "bg-yellow-600",
    backgroundGradient: "bg-gradient-to-br from-yellow-400 to-amber-600",
    emoji: "🏆",
    tags: ["prestasi", "digital", "lomba", "teknologi", "inovasi"]
  },
  {
    id: "12",
    href: "/berita/pemilihan-rt-rw-2025",
    title: "Pemilihan RT/RW Serentak 2025",
    excerpt: "Proses pemilihan Ketua RT dan RW se-Nagari Lima Koto akan dilaksanakan secara serentak dengan menggunakan sistem digital untuk meningkatkan transparansi.",
    date: "7 Juli 2025",
    views: 156,
    category: "Politik",
    categoryColor: "bg-slate-600",
    backgroundGradient: "bg-gradient-to-br from-slate-400 to-gray-600",
    emoji: "🗳️",
    tags: ["politik", "pemilihan", "digital", "transparansi"]
  },
  {
    id: "13",
    href: "/berita/koperasi-simpan-pinjam-baru",
    title: "Pembentukan Koperasi Simpan Pinjam",
    excerpt: "Masyarakat nagari sepakat membentuk koperasi simpan pinjam untuk mendukung ekonomi lokal dan memberikan akses permodalan yang mudah bagi warga.",
    date: "6 Juli 2025",
    views: 178,
    category: "Ekonomi",
    categoryColor: "bg-emerald-600",
    backgroundGradient: "bg-gradient-to-br from-emerald-400 to-green-600",
    emoji: "🏪",
    tags: ["ekonomi", "koperasi", "permodalan", "masyarakat"]
  },
  {
    id: "14",
    href: "/berita/penanaman-pohon-seribu",
    title: "Program Penanaman Seribu Pohon",
    excerpt: "Gerakan penanaman seribu pohon dimulai sebagai upaya pelestarian lingkungan dan pencegahan bencana longsor di kawasan perbukitan nagari.",
    date: "5 Juli 2025",
    views: 134,
    category: "Lingkungan",
    categoryColor: "bg-green-600",
    backgroundGradient: "bg-gradient-to-br from-green-500 to-emerald-600",
    emoji: "🌳",
    tags: ["lingkungan", "pohon", "pelestarian", "longsor"]
  },
  {
    id: "15",
    href: "/berita/festival-randai-tradisional",
    title: "Festival Randai Tradisional",
    excerpt: "Menghidupkan kembali seni tradisional Minangkabau melalui festival randai yang melibatkan seluruh generasi dari anak-anak hingga orang tua.",
    date: "4 Juli 2025",
    views: 201,
    category: "Budaya",
    categoryColor: "bg-purple-600",
    backgroundGradient: "bg-gradient-to-br from-purple-400 to-violet-600",
    emoji: "🎭",
    tags: ["budaya", "randai", "tradisional", "minangkabau", "seni"]
  },
  {
    id: "16",
    href: "/berita/pasar-mingguan-nagari",
    title: "Revitalisasi Pasar Mingguan Nagari",
    excerpt: "Pasar mingguan tradisional direnovasi dengan fasilitas yang lebih modern namun tetap mempertahankan nuansa tradisional untuk mendukung ekonomi rakyat.",
    date: "3 Juli 2025",
    views: 167,
    category: "Ekonomi",
    categoryColor: "bg-orange-600",
    backgroundGradient: "bg-gradient-to-br from-orange-400 to-red-500",
    emoji: "🛒",
    tags: ["ekonomi", "pasar", "tradisional", "revitalisasi"]
  },
  {
    id: "17",
    href: "/berita/kelas-literasi-digital",
    title: "Kelas Literasi Digital untuk Lansia",
    excerpt: "Program khusus mengajarkan teknologi digital kepada warga lanjut usia agar dapat mengikuti perkembangan zaman dan menggunakan layanan digital nagari.",
    date: "2 Juli 2025",
    views: 143,
    category: "Teknologi",
    categoryColor: "bg-cyan-600",
    backgroundGradient: "bg-gradient-to-br from-cyan-400 to-blue-600",
    emoji: "💻",
    tags: ["teknologi", "literasi", "digital", "lansia"]
  },
  {
    id: "18",
    href: "/berita/posyandu-balita-sehat",
    title: "Program Posyandu Balita Sehat",
    excerpt: "Inovasi pelayanan posyandu dengan sistem monitoring digital untuk memantau tumbuh kembang balita dan memberikan edukasi gizi kepada orang tua.",
    date: "1 Juli 2025",
    views: 189,
    category: "Kesehatan",
    categoryColor: "bg-pink-600",
    backgroundGradient: "bg-gradient-to-br from-pink-400 to-rose-600",
    emoji: "👶",
    tags: ["kesehatan", "posyandu", "balita", "digital", "gizi"]
  },
  {
    id: "19",
    href: "/berita/sekolah-alam-terpadu",
    title: "Pembangunan Sekolah Alam Terpadu",
    excerpt: "Groundbreaking pembangunan sekolah alam terpadu yang menggabungkan kurikulum formal dengan pembelajaran berbasis alam dan kearifan lokal.",
    date: "30 Juni 2025",
    views: 213,
    category: "Pendidikan",
    categoryColor: "bg-teal-600",
    backgroundGradient: "bg-gradient-to-br from-teal-400 to-green-600",
    emoji: "🌿",
    tags: ["pendidikan", "sekolah", "alam", "kurikulum", "lokal"]
  },
  {
    id: "20",
    href: "/berita/wisata-agro-kebun-kopi",
    title: "Wisata Agro Kebun Kopi Nagari",
    excerpt: "Pengembangan wisata agro kebun kopi sebagai destinasi baru yang menawarkan edukasi perkebunan dan pengalaman langsung memetik kopi.",
    date: "28 Juni 2025",
    views: 176,
    category: "Wisata",
    categoryColor: "bg-amber-600",
    backgroundGradient: "bg-gradient-to-br from-amber-400 to-orange-600",
    emoji: "☕",
    tags: ["wisata", "agro", "kopi", "perkebunan", "edukasi"]
  },
  {
    id: "21",
    href: "/berita/bank-sampah-mandiri",
    title: "Bank Sampah Mandiri Nagari",
    excerpt: "Inisiatif pengelolaan sampah melalui bank sampah yang memberikan nilai ekonomis bagi warga sambil menjaga kebersihan dan kelestarian lingkungan.",
    date: "27 Juni 2025",
    views: 154,
    category: "Lingkungan",
    categoryColor: "bg-lime-600",
    backgroundGradient: "bg-gradient-to-br from-lime-400 to-green-600",
    emoji: "♻️",
    tags: ["lingkungan", "sampah", "ekonomi", "kebersihan"]
  },
  {
    id: "22",
    href: "/berita/jaringan-internet-fiber",
    title: "Pembangunan Jaringan Internet Fiber",
    excerpt: "Proyek ambisius pembangunan jaringan internet fiber optik untuk meningkatkan konektivitas digital dan mendukung transformasi digital nagari.",
    date: "26 Juni 2025",
    views: 198,
    category: "Teknologi",
    categoryColor: "bg-violet-600",
    backgroundGradient: "bg-gradient-to-br from-violet-400 to-purple-600",
    emoji: "📡"
  },
  {
    id: "23",
    href: "/berita/rumah-baca-komunitas",
    title: "Rumah Baca Komunitas",
    excerpt: "Pendirian rumah baca komunitas untuk meningkatkan minat baca warga, khususnya anak-anak, dengan koleksi buku yang beragam dan program literasi.",
    date: "25 Juni 2025",
    views: 167,
    category: "Pendidikan",
    categoryColor: "bg-indigo-600",
    backgroundGradient: "bg-gradient-to-br from-indigo-400 to-blue-600",
    emoji: "📚"
  },
  {
    id: "24",
    href: "/berita/sentra-kerajinan-anyaman",
    title: "Sentra Kerajinan Anyaman Bambu",
    excerpt: "Pembentukan sentra kerajinan anyaman bambu sebagai upaya pelestarian budaya lokal sekaligus pengembangan ekonomi kreatif masyarakat.",
    date: "24 Juni 2025",
    views: 142,
    category: "Budaya",
    categoryColor: "bg-yellow-600",
    backgroundGradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
    emoji: "🧺"
  },
  {
    id: "25",
    href: "/berita/klinik-hewan-nagari",
    title: "Klinik Hewan Nagari",
    excerpt: "Pembukaan klinik hewan pertama di nagari untuk memberikan pelayanan kesehatan hewan ternak dan hewan peliharaan warga.",
    date: "23 Juni 2025",
    views: 129,
    category: "Kesehatan",
    categoryColor: "bg-green-600",
    backgroundGradient: "bg-gradient-to-br from-green-400 to-emerald-600",
    emoji: "🐄"
  },
  {
    id: "26",
    href: "/berita/aplikasi-mobile-nagari",
    title: "Launching Aplikasi Mobile Nagari",
    excerpt: "Peluncuran aplikasi mobile resmi nagari yang memudahkan warga mengakses informasi dan layanan administratif langsung dari smartphone.",
    date: "22 Juni 2025",
    views: 267,
    category: "Teknologi",
    categoryColor: "bg-blue-600",
    backgroundGradient: "bg-gradient-to-br from-blue-400 to-indigo-600",
    emoji: "📱"
  },
  {
    id: "27",
    href: "/berita/festival-kuliner-tradisional",
    title: "Festival Kuliner Tradisional",
    excerpt: "Gelaran festival kuliner yang menampilkan berbagai makanan tradisional Minangkabau untuk melestarikan warisan kuliner dan mendukung UMKM lokal.",
    date: "21 Juni 2025",
    views: 234,
    category: "Budaya",
    categoryColor: "bg-red-600",
    backgroundGradient: "bg-gradient-to-br from-red-400 to-pink-600",
    emoji: "🍛"
  },
  {
    id: "28",
    href: "/berita/solar-panel-komunal",
    title: "Instalasi Solar Panel Komunal",
    excerpt: "Pemasangan panel surya komunal untuk mendukung energi terbarukan dan mengurangi biaya listrik fasilitas umum nagari.",
    date: "20 Juni 2025",
    views: 145,
    category: "Lingkungan",
    categoryColor: "bg-yellow-600",
    backgroundGradient: "bg-gradient-to-br from-yellow-400 to-amber-600",
    emoji: "☀️"
  },
  {
    id: "29",
    href: "/berita/workshop-fotografi-alam",
    title: "Workshop Fotografi Alam",
    excerpt: "Pelatihan fotografi alam untuk mengembangkan potensi wisata dan dokumentasi keindahan alam nagari melalui lensa kamera.",
    date: "19 Juni 2025",
    views: 118,
    category: "Seni",
    categoryColor: "bg-purple-600",
    backgroundGradient: "bg-gradient-to-br from-purple-400 to-violet-600",
    emoji: "📸"
  },
  {
    id: "30",
    href: "/berita/hidroponik-komunitas",
    title: "Program Hidroponik Komunitas",
    excerpt: "Edukasi dan implementasi sistem hidroponik untuk mengoptimalkan lahan terbatas dan meningkatkan ketahanan pangan keluarga.",
    date: "18 Juni 2025",
    views: 163,
    category: "Pertanian",
    categoryColor: "bg-green-600",
    backgroundGradient: "bg-gradient-to-br from-green-400 to-lime-600",
    emoji: "🥬"
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
