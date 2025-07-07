// FAQ data for the website
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export const faqData: FAQItem[] = [
  {
    id: 0,
    question: "Apa saja layanan yang tersedia?",
    answer: "Website ini menyediakan informasi profil nagari, berita terbaru, data statistik, galeri kegiatan, dan informasi layanan publik lainnya.",
    category: "Layanan"
  },
  {
    id: 1,
    question: "Bagaimana cara menghubungi kantor nagari?",
    answer: "Anda dapat menemukan informasi kontak lengkap, termasuk alamat dan nomor telepon, di halaman profil kami.",
    category: "Kontak"
  },
  {
    id: 2,
    question: "Bagaimana cara mengakses data statistik?",
    answer: "Data statistik tersedia di menu utama website dan dapat diakses oleh semua pengunjung secara gratis.",
    category: "Data"
  },
  {
    id: 3,
    question: "Apakah website ini resmi?",
    answer: "Ya, website ini adalah portal resmi Nagari Lima Koto yang dikelola oleh pemerintah nagari.",
    category: "Informasi"
  }
];
