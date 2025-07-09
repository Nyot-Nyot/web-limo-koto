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

// Helper function untuk mengkonversi judul menjadi slug URL yang valid
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Hapus karakter selain huruf, angka, dan spasi
    .replace(/\s+/g, '-')     // Ganti spasi dengan tanda hubung
    .replace(/-+/g, '-')      // Hindari tanda hubung berulang
    .trim();                  // Hapus spasi di awal dan akhir
}

// Memastikan href konsisten dengan format URL yang sesuai
export function generateNewsUrl(title: string): string {
  return `/berita/${createSlug(title)}`;
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
    href: generateNewsUrl("Jam Gadang Bukittinggi: Ikon Bersejarah yang Memukau Wisatawan"),
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
    tags: ["trending", "pariwisata", "sejarah", "budaya"],
    blocks: [
      {
        type: 'text',
        content: 'Jam Gadang merupakan landmark ikonik kota Bukittinggi yang telah menjadi simbol kebanggaan warga dan daya tarik utama pariwisata. Menara jam setinggi 26 meter ini dibangun pada tahun 1926 saat masa kolonial Belanda sebagai hadiah dari Ratu Belanda kepada sekretaris Bukittinggi kala itu.'
      },
      {
        type: 'image',
        url: '/images/jamgadang.png',
        caption: 'Jam Gadang, ikon bersejarah kota Bukittinggi'
      },
      {
        type: 'subheading',
        content: 'Sejarah Jam Gadang'
      },
      {
        type: 'text',
        content: 'Jam Gadang telah mengalami beberapa kali perubahan bentuk atap. Pada masa kolonial Belanda, atapnya berbentuk kubah bulat dengan patung ayam jago di puncaknya. Kemudian pada masa pendudukan Jepang, bentuk atap diubah menyerupai pagoda. Setelah kemerdekaan, atapnya diubah menjadi bentuk gonjong rumah gadang yang merupakan rumah adat Minangkabau sebagai bentuk identitas lokal.'
      },
      {
        type: 'quote',
        content: '"Jam Gadang bukan sekadar penunjuk waktu, tetapi saksi sejarah perjalanan bangsa yang terus menjaga marwahnya di tengah perkembangan zaman" - Budayawan Minangkabau'
      },
      {
        type: 'subheading',
        content: 'Daya Tarik Wisata'
      },
      {
        type: 'text',
        content: 'Saat ini, Jam Gadang menjadi magnet wisata utama di Bukittinggi. Terletak di tengah kota dengan Taman Jam Gadang yang asri di sekitarnya, monumen ini selalu ramai dikunjungi wisatawan domestik maupun mancanegara. Dari puncak Jam Gadang, pengunjung bisa menikmati panorama kota Bukittinggi yang dikelilingi pemandangan Gunung Singgalang dan Gunung Marapi.'
      },
      {
        type: 'list',
        items: [
          'Taman Jam Gadang yang asri di sekeliling menara',
          'Pertunjukan seni tradisional di sekitar area pada akhir pekan',
          'Pusat kuliner tradisional Minangkabau di kawasan sekitar',
          'Festival lampu hias saat malam tahun baru dan hari besar',
          'Pasar souvenir yang menjual berbagai kerajinan lokal'
        ]
      },
      {
        type: 'subheading',
        content: 'Pelestarian dan Pengembangan'
      },
      {
        type: 'text',
        content: 'Pemerintah kota Bukittinggi terus berupaya melestarikan dan mengembangkan kawasan Jam Gadang sebagai destinasi wisata unggulan. Renovasi dan penataan kawasan dilakukan secara berkala dengan tetap mempertahankan nilai sejarah dan budaya yang melekat pada bangunan ikonik ini.'
      },
      {
        type: 'text',
        content: 'Berbagai event budaya dan festival juga sering digelar di kawasan ini untuk menarik lebih banyak pengunjung. Upaya digitalisasi juga dilakukan dengan membuat konten virtual tour dan informasi digital yang bisa diakses wisatawan melalui aplikasi pariwisata resmi kota Bukittinggi.'
      }
    ]
  },
  {
    id: "2",
    href: generateNewsUrl("Pembangunan Infrastruktur Jalan"),
    title: "Pembangunan Infrastruktur Jalan",
    excerpt: "Pemerintah nagari mulai melakukan perbaikan infrastruktur jalan menuju daerah wisata untuk mendukung pariwisata lokal dan meningkatkan aksesibilitas.",
    date: "25 Juni 2025",
    views: 95,
    category: "Pembangunan",
    categoryColor: "bg-blue-600",
    backgroundGradient: "bg-gradient-to-br from-blue-400 to-blue-600",
    emoji: "🏗️",
    tags: ["pembangunan", "infrastruktur", "pariwisata"],
    imageSrc: "/images/infra-1.jpeg",
    blocks: [
      {
        type: 'text',
        content: 'Pemerintah Nagari Lima Koto memulai proyek ambisius untuk memperbaiki infrastruktur jalan menuju kawasan wisata utama. Proyek ini merupakan bagian dari program pengembangan pariwisata daerah yang diharapkan dapat meningkatkan arus kunjungan wisatawan dan membuka peluang ekonomi baru bagi masyarakat.'
      },
      {
        type: 'image',
        url: '/images/infra-1.jpeg',
        caption: 'Proses perbaikan jalan menuju kawasan wisata nagari'
      },
      {
        type: 'subheading',
        content: 'Latar Belakang Proyek'
      },
      {
        type: 'text',
        content: 'Selama ini, akses menuju beberapa destinasi wisata potensial di Nagari Lima Koto terkendala karena kondisi jalan yang kurang memadai. Hal ini menyebabkan penurunan minat kunjungan wisatawan dan menghambat potensi ekonomi dari sektor pariwisata yang sebenarnya cukup menjanjikan.'
      },
      {
        type: 'text',
        content: 'Berdasarkan hasil survei dan kajian yang dilakukan oleh tim teknis, terdapat beberapa titik jalan sepanjang 5 kilometer yang memerlukan perbaikan mendesak, mulai dari penambalan aspal hingga pelebaran dan pengerasan jalan.'
      },
      {
        type: 'subheading',
        content: 'Tahapan Pelaksanaan'
      },
      {
        type: 'text',
        content: 'Proyek perbaikan jalan ini dilaksanakan dalam beberapa tahap. Tahap pertama adalah perbaikan jalan utama sepanjang 2 kilometer yang menghubungkan jalan kabupaten dengan pintu masuk kawasan wisata. Tahap kedua adalah perbaikan jalan penghubung antar objek wisata dengan total panjang 3 kilometer.'
      },
      {
        type: 'image',
        url: '/images/infra-2.jpg',
        caption: 'Alat berat yang digunakan dalam proyek perbaikan jalan'
      },
      {
        type: 'list',
        items: [
          'Survei dan perencanaan teknis: 1-10 Juni 2025',
          'Perbaikan jalan utama: 11-20 Juni 2025',
          'Perbaikan jalan penghubung: 21-30 Juni 2025',
          'Finishing dan pemasangan rambu: 1-5 Juli 2025'
        ]
      },
      {
        type: 'quote',
        content: '"Infrastruktur jalan adalah urat nadi ekonomi masyarakat. Dengan jalan yang baik, arus ekonomi akan lancar dan kesejahteraan masyarakat akan meningkat." - Wali Nagari Lima Koto'
      },
      {
        type: 'subheading',
        content: 'Dampak Ekonomi dan Sosial'
      },
      {
        type: 'text',
        content: 'Perbaikan infrastruktur jalan ini diprediksi akan meningkatkan kunjungan wisatawan hingga 30% dalam enam bulan ke depan. Hal ini akan berdampak langsung pada peningkatan pendapatan masyarakat yang mengelola objek wisata, pelaku UMKM kuliner, kerajinan, dan jasa transportasi lokal.'
      },
      {
        type: 'text',
        content: 'Selain itu, aksesibilitas yang lebih baik juga akan memudahkan mobilitas warga untuk aktivitas sehari-hari, termasuk distribusi hasil pertanian dan akses ke fasilitas pendidikan serta kesehatan.'
      }
    ]
  },
  {
    id: "3",
    href: generateNewsUrl("Festival Budaya Nagari 2025"),
    title: "Festival Budaya Nagari 2025",
    excerpt: "Festival budaya tahunan akan diselenggarakan bulan depan dengan menampilkan berbagai kesenian tradisional dan kuliner khas daerah.",
    date: "20 Juni 2025",
    views: 142,
    category: "Budaya",
    categoryColor: "bg-purple-600",
    backgroundGradient: "bg-gradient-to-br from-purple-400 to-pink-600",
    emoji: "🎭",
    tags: ["budaya", "festival", "seni", "kuliner"],
    imageSrc: "/images/randai.png",
    blocks: [
      {
        type: 'text',
        content: 'Nagari Lima Koto akan kembali menggelar Festival Budaya Nagari tahunan pada bulan depan. Festival yang akan berlangsung selama tiga hari ini akan menampilkan berbagai kesenian tradisional, kuliner khas, dan kerajinan tangan Minangkabau.'
      },
      {
        type: 'image',
        url: '/images/randai.png',
        caption: 'Pertunjukan Randai dalam Festival Budaya tahun lalu'
      },
      {
        type: 'subheading',
        content: 'Rangkaian Acara'
      },
      {
        type: 'text',
        content: 'Festival akan dimulai dengan upacara pembukaan yang dihadiri oleh pejabat daerah dan tokoh masyarakat. Rangkaian acara akan berlanjut dengan pertunjukan seni tradisional seperti Randai, Tari Piring, Silek (silat), dan Saluang. Pengunjung juga dapat menikmati berbagai makanan khas Minangkabau seperti Rendang, Sate Padang, dan Gulai Kapau di stan-stan kuliner.'
      },
      {
        type: 'quote',
        content: '"Festival Budaya Nagari bukan hanya sekadar hiburan, tetapi juga sebagai upaya pelestarian dan pengenalan budaya Minangkabau kepada generasi muda." - Ketua Panitia Festival'
      },
      {
        type: 'subheading',
        content: 'Keterlibatan Komunitas'
      },
      {
        type: 'text',
        content: 'Yang menarik dari festival tahun ini adalah keterlibatan aktif dari generasi muda nagari dalam persiapan dan pelaksanaan acara. Mereka tergabung dalam kelompok-kelompok seni yang telah berlatih selama berbulan-bulan untuk menampilkan kesenian tradisional dengan sentuhan kontemporer yang fresh tanpa meninggalkan nilai-nilai aslinya.'
      },
      {
        type: 'list',
        items: [
          'Perlombaan tarian tradisional antar jorong',
          'Workshop pembuatan kerajinan tangan khas Minangkabau',
          'Kontes masakan tradisional dengan bahan lokal',
          'Pertunjukan teater rakyat dengan tema kearifan lokal',
          'Pameran foto sejarah dan budaya nagari'
        ]
      },
      {
        type: 'subheading',
        content: 'Dampak Ekonomi dan Pariwisata'
      },
      {
        type: 'text',
        content: 'Festival ini diharapkan dapat menarik wisatawan dari berbagai daerah dan memberikan dampak positif bagi perekonomian warga. Tahun lalu, festival serupa berhasil mendatangkan sekitar 5.000 pengunjung dan meningkatkan pendapatan pelaku UMKM lokal hingga 40% selama acara berlangsung.'
      },
      {
        type: 'text',
        content: 'Panitia telah bekerja sama dengan dinas pariwisata kabupaten untuk mempromosikan acara ini secara luas melalui media sosial dan platform digital lainnya. Selain itu, akomodasi dan transportasi juga telah dipersiapkan untuk menyambut wisatawan dari luar daerah.'
      }
    ]
  },
  {
    id: "4",
    href: generateNewsUrl("Program Pemberdayaan UMKM"),
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
    href: generateNewsUrl("Gotong Royong Kebersihan"),
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
    href: generateNewsUrl("Pelatihan Pertanian Organik"),
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
    href: generateNewsUrl("Renovasi Sekolah Dasar"),
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
    href: generateNewsUrl("Puskesmas Layanan 24 Jam"),
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
    href: generateNewsUrl("Digitalisasi Administrasi"),
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
    href: generateNewsUrl("Program Beasiswa Pelajar Berprestasi"),
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
    href: generateNewsUrl("Nagari Lima Koto Juara Lomba Desa Digital"),
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
    href: generateNewsUrl("Pemilihan RT/RW Serentak 2025"),
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
    href: generateNewsUrl("Pembentukan Koperasi Simpan Pinjam"),
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
    href: generateNewsUrl("Program Penanaman Seribu Pohon"),
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
    href: generateNewsUrl("Festival Randai Tradisional"),
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
    href: generateNewsUrl("Revitalisasi Pasar Mingguan Nagari"),
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
    href: generateNewsUrl("Kelas Literasi Digital untuk Lansia"),
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
    href: generateNewsUrl("Program Posyandu Balita Sehat"),
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
    href: generateNewsUrl("Pembangunan Sekolah Alam Terpadu"),
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
    href: generateNewsUrl("Wisata Agro Kebun Kopi Nagari"),
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
    href: generateNewsUrl("Bank Sampah Mandiri Nagari"),
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
    href: generateNewsUrl("Pembangunan Jaringan Internet Fiber"),
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
    href: generateNewsUrl("Rumah Baca Komunitas"),
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
    href: generateNewsUrl("Sentra Kerajinan Anyaman Bambu"),
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
    href: generateNewsUrl("Klinik Hewan Nagari"),
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
    href: generateNewsUrl("Launching Aplikasi Mobile Nagari"),
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
    href: generateNewsUrl("Festival Kuliner Tradisional"),
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
    href: generateNewsUrl("Instalasi Solar Panel Komunal"),
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
    href: generateNewsUrl("Workshop Fotografi Alam"),
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
    href: generateNewsUrl("Program Hidroponik Komunitas"),
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
