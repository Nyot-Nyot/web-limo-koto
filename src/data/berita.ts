// Sample news data for demonstration
export interface BeritaItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  viewCount: number;
}

export const beritaData: BeritaItem[] = [
  {
    id: '1',
    title: 'Perayaan HUT RI ke-79 di Nagari Lima Koto',
    description: 'Masyarakat Nagari Lima Koto merayakan HUT RI ke-79 dengan berbagai kegiatan termasuk upacara bendera dan lomba tradisional.',
    imageUrl: '/images/pem-1.jpg',
    date: '17 Agustus 2023',
    viewCount: 120
  },
  {
    id: '2',
    title: 'Program Vaksinasi COVID-19 di Nagari Lima Koto',
    description: 'Program vaksinasi COVID-19 tahap kedua telah dilaksanakan dengan target 1000 warga berhasil divaksinasi.',
    imageUrl: '/images/pem-2.jpg',
    date: '25 Juli 2023',
    viewCount: 98
  },
  {
    id: '3',
    title: 'Pembangunan Infrastruktur Jalan Utama',
    description: 'Pembangunan infrastruktur jalan utama Nagari Lima Koto telah selesai dan diresmikan oleh Bupati Sijunjung.',
    imageUrl: '/images/infra-1.jpeg',
    date: '10 Juni 2023',
    viewCount: 156
  },
  {
    id: '4',
    title: 'Festival Budaya Tahunan Nagari Lima Koto',
    description: 'Festival budaya tahunan Nagari Lima Koto menampilkan berbagai kesenian tradisional seperti randai dan tari piring.',
    imageUrl: '/images/bud-1.JPG',
    date: '5 Mei 2023',
    viewCount: 203
  }
];
