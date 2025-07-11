export interface GalleryItem {
  id: number | string;
  title: string;
  image: string;
  description: string;
  category: 'makanan' | 'budaya' | 'alam' | 'arsitektur';
}

export const galeriData: GalleryItem[] = [
  // Makanan Tradisional
  {
    id: 1,
    title: 'Rendang Dagiang',
    image: '/images/300x400.jpg',
    description: 'Rendang dagiang adalah masakan tradisional khas Minangkabau yang terbuat dari daging sapi yang dimasak dengan santan dan rempah-rempah pilihan. Proses memasaknya membutuhkan waktu yang lama hingga bumbu meresap sempurna dan daging menjadi empuk.',
    category: 'makanan'
  },
  {
    id: 2,
    title: 'Gulai Ikan Bilih',
    image: '/images/300x400.jpg',
    description: 'Gulai ikan bilih merupakan hidangan tradisional yang menggunakan ikan bilih segar dari Danau Singkarak. Dimasak dengan kuah santan yang kaya rempah dan memberikan cita rasa yang autentik khas Sumatera Barat.',
    category: 'makanan'
  },
  {
    id: 3,
    title: 'Dendeng Batokok',
    image: '/images/300x400.jpg',
    description: 'Dendeng batokok adalah daging sapi yang dipukul-pukul hingga tipis kemudian dijemur dan digoreng. Makanan ini memiliki tekstur yang unik dan rasa yang gurih, cocok sebagai lauk atau camilan.',
    category: 'makanan'
  },
  {
    id: 4,
    title: 'Kalio Ayam',
    image: '/images/300x400.jpg',
    description: 'Kalio ayam adalah masakan ayam dengan bumbu rendang namun dengan kuah yang lebih banyak. Cita rasanya yang kaya dan pedas menjadikannya salah satu makanan favorit masyarakat Minang.',
    category: 'makanan'
  },
  {
    id: 5,
    title: 'Sate Padang',
    image: '/images/300x400.jpg',
    description: 'Sate Padang memiliki kuah kental berwarna kuning dengan bumbu yang khas. Daging yang digunakan biasanya daging sapi atau kambing yang dipotong kecil dan ditusuk dengan bambu.',
    category: 'makanan'
  },
  {
    id: 6,
    title: 'Gulai Tunjang',
    image: '/images/300x400.jpg',
    description: 'Gulai tunjang adalah masakan berkuah santan yang menggunakan kikil atau tulang rawan sapi. Teksturnya yang kenyal dan kuah yang gurih membuatnya menjadi favorit.',
    category: 'makanan'
  },
  {
    id: 7,
    title: 'Ayam Pop',
    image: '/images/300x400.jpg',
    description: 'Ayam Pop adalah ayam goreng khas Padang yang dimasak dengan cara direbus terlebih dahulu dengan bumbu rempah, kemudian digoreng hingga kulitnya menjadi putih kekuningan.',
    category: 'makanan'
  },
  {
    id: 8,
    title: 'Gulai Kambing',
    image: '/images/300x400.jpg',
    description: 'Gulai kambing dengan kuah santan yang kental dan bumbu yang meresap sempurna. Daging kambing yang empuk dipadukan dengan rempah-rempah tradisional.',
    category: 'makanan'
  },

  // Budaya & Adat
  {
    id: 9,
    title: 'Tari Piring',
    image: '/images/300x400.jpg',
    description: 'Tari Piring adalah tarian tradisional Minangkabau yang menggunakan piring sebagai properti utama. Tarian ini menggambarkan kegembiraan masyarakat dalam merayakan panen yang melimpah dan kehidupan yang sejahtera.',
    category: 'budaya'
  },
  {
    id: 10,
    title: 'Randai',
    image: '/images/300x400.jpg',
    description: 'Randai adalah seni pertunjukan tradisional Minangkabau yang memadukan unsur teater, musik, tari, dan silat. Pertunjukan ini biasanya menceritakan kisah-kisah heroik atau pesan moral yang disampaikan secara interaktif.',
    category: 'budaya'
  },
  {
    id: 11,
    title: 'Saluang',
    image: '/images/300x400.jpg',
    description: 'Saluang adalah alat musik tiup tradisional yang terbuat dari bambu. Suara saluang yang merdu sering mengiringi lagu-lagu daerah Minang dan menciptakan suasana yang romantis dan menyentuh hati.',
    category: 'budaya'
  },
  {
    id: 12,
    title: 'Batagak Penghulu',
    image: '/images/300x400.jpg',
    description: 'Batagak Penghulu adalah upacara adat pengangkatan penghulu atau pemimpin tradisional dalam masyarakat Minangkabau. Upacara ini penuh dengan ritual dan simbol yang mencerminkan nilai-nilai adat istiadat.',
    category: 'budaya'
  },
  {
    id: 13,
    title: 'Tari Indang',
    image: '/images/300x400.jpg',
    description: 'Tari Indang adalah tarian yang diiringi dengan rebana dan syair-syair Islami. Tarian ini biasanya dipentaskan pada acara-acara keagamaan dan perayaan tradisional.',
    category: 'budaya'
  },
  {
    id: 14,
    title: 'Silek Minang',
    image: '/images/300x400.jpg',
    description: 'Silek Minang adalah seni bela diri tradisional Minangkabau yang meniru gerakan-gerakan binatang. Setiap gerakan memiliki filosofi dan makna yang mendalam.',
    category: 'budaya'
  },

  // Keindahan Alam
  {
    id: 15,
    title: 'Panorama Bukit',
    image: '/images/300x400.jpg',
    description: 'Pemandangan bukit-bukit hijau yang membentang luas menawarkan panorama alam yang memukau. Udara sejuk dan pemandangan yang indah menjadikan tempat ini ideal untuk refreshing dan menikmati keindahan alam.',
    category: 'alam'
  },
  {
    id: 16,
    title: 'Sungai Batang Hari',
    image: '/images/300x400.jpg',
    description: 'Sungai Batang Hari merupakan sumber kehidupan bagi masyarakat sekitar. Airnya yang jernih dan aliran yang tenang menciptakan ekosistem yang seimbang dan mendukung berbagai aktivitas masyarakat.',
    category: 'alam'
  },
  {
    id: 17,
    title: 'Sawah Terasering',
    image: '/images/300x400.jpg',
    description: 'Sawah terasering menunjukkan kearifan lokal dalam pengelolaan lahan pertanian. Struktur bertingkat ini tidak hanya efisien untuk bercocok tanam, tetapi juga menciptakan pemandangan yang sangat indah.',
    category: 'alam'
  },
  {
    id: 18,
    title: 'Air Terjun Lembah',
    image: '/images/300x400.jpg',
    description: 'Air terjun yang tersembunyi di lembah hijau menawarkan kesegaran alami. Suara gemericik air dan udara sejuk menjadikannya tempat yang sempurna untuk melepas penat.',
    category: 'alam'
  },
  {
    id: 19,
    title: 'Hutan Bambu',
    image: '/images/300x400.jpg',
    description: 'Hutan bambu yang rindang memberikan suasana tenang dan damai. Cahaya matahari yang menyaring melalui rumpun bambu menciptakan pemandangan yang eksotis.',
    category: 'alam'
  },
  {
    id: 20,
    title: 'Ladang Teh',
    image: '/images/300x400.jpg',
    description: 'Perkebunan teh yang hijau membentang di lereng bukit. Pemandangan ini menawarkan keindahan alam yang menyejukkan mata dan jiwa.',
    category: 'alam'
  },

  // Arsitektur
  {
    id: 21,
    title: 'Rumah Gadang',
    image: '/images/300x400.jpg',
    description: 'Rumah Gadang adalah rumah adat Minangkabau yang memiliki atap berbentuk tanduk kerbau. Arsitektur unik ini mencerminkan filosofi dan budaya masyarakat Minang yang kaya akan nilai-nilai tradisional.',
    category: 'arsitektur'
  },
  {
    id: 22,
    title: 'Surau Tradisional',
    image: '/images/300x400.jpg',
    description: 'Surau tradisional adalah tempat ibadah dan belajar mengaji bagi masyarakat Minang. Arsitektur yang sederhana namun sarat makna spiritual.',
    category: 'arsitektur'
  },
  {
    id: 23,
    title: 'Rangkiang',
    image: '/images/300x400.jpg',
    description: 'Rangkiang adalah lumbung padi tradisional Minangkabau yang dibangun dengan arsitektur khusus untuk menyimpan padi. Konstruksinya yang unik mampu melindungi padi dari hama dan kelembaban.',
    category: 'arsitektur'
  },
  {
    id: 24,
    title: 'Jembatan Kayu',
    image: '/images/300x400.jpg',
    description: 'Jembatan kayu tradisional yang menghubungkan dua sisi sungai. Konstruksi sederhana namun kuat, menunjukkan kearifan lokal dalam arsitektur.',
    category: 'arsitektur'
  },
  {
    id: 25,
    title: 'Masjid Minang',
    image: '/images/300x400.jpg',
    description: 'Masjid dengan arsitektur Minang yang khas, memadukan elemen Islam dengan budaya lokal. Bangunan ini menjadi pusat kegiatan keagamaan masyarakat.',
    category: 'arsitektur'
  }
];

export const galeriCategories = [
  { id: 'makanan', name: 'Makanan Tradisional' },
  { id: 'budaya', name: 'Budaya & Adat' },
  { id: 'alam', name: 'Keindahan Alam' },
  { id: 'arsitektur', name: 'Arsitektur' }
];
