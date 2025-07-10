export interface JorongData {
  id: string;
  name: string;
  population: string;
  area: string;
  coordinates: { lat: number; lng: number };
  color: string;
  description: string;
  facilities: string[];
}

// Default jorong data yang bisa digunakan di komponen manapun
export const defaultJorongData: JorongData[] = [
  {
    id: 'tanjung-ampalu',
    name: 'Jorong Tanjung Ampalu',
    population: '1,678 jiwa',
    area: '16.3 km²',
    coordinates: { lat: -0.7245, lng: 101.0223 },
    color: '#EC4899',
    description: 'Jorong Tanjung Ampalu adalah jorong dengan populasi terbesar di Nagari Lima Koto. Terletak di dataran yang strategis, jorong ini menjadi pusat aktivitas ekonomi dengan berbagai usaha perdagangan dan jasa. Memiliki akses transportasi yang baik ke berbagai daerah.',
    facilities: ['Sekolah Dasar', 'Sekolah Menengah Pertama', 'Puskesmas', 'Bank', 'Kantor Pos', 'Pasar Induk']
  },
  {
    id: 'solok-badak',
    name: 'Jorong Solok Badak',
    population: '1,092 jiwa',
    area: '15.6 km²',
    coordinates: { lat: -0.7545, lng: 101.0523 },
    color: '#DC2626',
    description: 'Jorong Solok Badak terletak di lembah (solok) yang subur dengan sejarah keberadaan badak di masa lalu. Saat ini jorong ini berkembang menjadi sentra peternakan sapi dan kerbau. Memiliki padang gembalaan yang luas dan sumber air yang melimpah.',
    facilities: ['Sekolah Dasar', 'Pos Kesehatan', 'Masjid', 'Kandang Ternak', 'Padang Gembalaan', 'Kolam Ikan']
  },
  {
    id: 'pasar-tanjung-ampalu',
    name: 'Jorong Pasar Tanjung Ampalu',
    population: '987 jiwa',
    area: '8.9 km²',
    coordinates: { lat: -0.6745, lng: 101.0423 },
    color: '#06B6D4',
    description: 'Jorong Pasar Tanjung Ampalu merupakan pusat perdagangan utama di kawasan ini. Pasar tradisional yang ada sudah beroperasi sejak puluhan tahun dan menjadi tempat berkumpulnya pedagang dari berbagai jorong. Jorong ini sangat aktif dalam kegiatan ekonomi.',
    facilities: ['Pasar Tradisional', 'Sekolah Dasar', 'Pos Kesehatan', 'Masjid', 'Area Parkir', 'Warung Makan']
  },
  {
    id: 'mangkudu-kodok',
    name: 'Jorong Mangkudu Kodok',
    population: '743 jiwa',
    area: '9.5 km²',
    coordinates: { lat: -0.7345, lng: 101.0323 },
    color: '#84CC16',
    description: 'Jorong Mangkudu Kodok memiliki nama yang unik dan terletak di daerah yang dikelilingi pohon mangkudu. Jorong ini dikenal dengan hasil pertanian organik dan memiliki sumber air yang melimpah. Masyarakatnya sangat menjaga kelestarian lingkungan.',
    facilities: ['Sekolah Dasar', 'Pos Kesehatan', 'Masjid', 'Kebun Organik', 'Sumber Air Bersih']
  },
  {
    id: 'koto-panjang',
    name: 'Jorong Koto Panjang',
    population: '1,567 jiwa',
    area: '18.5 km²',
    coordinates: { lat: -0.6845, lng: 101.0323 },
    color: '#10B981',
    description: 'Jorong Koto Panjang adalah jorong terluas di Nagari Lima Koto dengan bentangan wilayah yang memanjang. Masyarakatnya mayoritas bekerja sebagai petani dengan komoditas utama padi dan palawija. Jorong ini juga menjadi jalur transportasi utama menuju jorong-jorong lainnya.',
    facilities: ['Sekolah Dasar', 'Sekolah Menengah Pertama', 'Puskesmas Pembantu', 'Pasar Tradisional', 'Terminal Kecil']
  },
  {
    id: 'batu-gandang',
    name: 'Jorong Batu Gandang',
    population: '1,345 jiwa',
    area: '14.2 km²',
    coordinates: { lat: -0.6945, lng: 101.0223 },
    color: '#EF4444',
    description: 'Jorong Batu Gandang merupakan salah satu jorong di Nagari Lima Koto yang terkenal dengan formasi bebatuan unik yang menyerupai gandang (gendang). Jorong ini menjadi pusat kebudayaan tradisional dengan berbagai acara adat yang masih rutin dilaksanakan.',
    facilities: ['Sekolah Dasar', 'Pos Kesehatan Desa', 'Masjid dan Surau', 'Balai Adat', 'Lapangan Olahraga']
  },
  {
    id: 'batu-balang',
    name: 'Jorong Batu Balang',
    population: '823 jiwa',
    area: '12.4 km²',
    coordinates: { lat: -0.7445, lng: 101.0423 },
    color: '#8B5F99',
    description: 'Jorong Batu Balang terletak di daerah berbatu dengan topografi yang bergelombang. Meskipun medannya cukup menantang, jorong ini memiliki potensi wisata alam yang menarik. Masyarakatnya sebagian besar bekerja sebagai petani dan peternak kambing.',
    facilities: ['Sekolah Dasar', 'Pos Kesehatan', 'Masjid', 'Kandang Ternak', 'Jalur Trekking']
  },
  {
    id: 'aur-gading',
    name: 'Jorong Aur Gading',
    population: '1,234 jiwa',
    area: '13.7 km²',
    coordinates: { lat: -0.7145, lng: 101.0023 },
    color: '#F59E0B',
    description: 'Jorong Aur Gading dikenal dengan kerajinan bambu (aur) yang berkualitas tinggi. Masyarakatnya telah turun temurun mengolah bambu menjadi berbagai produk kerajinan. Jorong ini juga memiliki tradisi budaya yang kuat dengan seni randai dan saluang.',
    facilities: ['Sekolah Dasar', 'Pos Kesehatan', 'Masjid dan Surau', 'Sentra Kerajinan Bambu', 'Sanggar Seni']
  }
];

// Hook untuk mengelola data jorong dengan localStorage
export const useJorongData = () => {
  if (typeof window === 'undefined') {
    return {
      jorongData: defaultJorongData,
      updateJorongData: () => {},
      getJorongData: () => defaultJorongData
    };
  }

  const getJorongData = (): JorongData[] => {
    try {
      const saved = localStorage.getItem('jorongData');
      return saved ? JSON.parse(saved) : defaultJorongData;
    } catch {
      return defaultJorongData;
    }
  };

  const updateJorongData = (data: JorongData[]) => {
    try {
      localStorage.setItem('jorongData', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save jorong data:', error);
    }
  };

  return {
    jorongData: getJorongData(),
    updateJorongData,
    getJorongData
  };
};
