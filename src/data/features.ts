export interface Feature {
  id: number;
  title: string;
  description: string;
  bgColor: string;
  iconType: 'building' | 'book' | 'calendar' | 'user' | 'image' | 'chart';
  link?: string;
}

export const featuresData: Feature[] = [
  {
    id: 1,
    title: "Profil Nagari",
    description: "Informasi lengkap tentang sejarah, visi, misi, dan profil Nagari",
    bgColor: "bg-green-600",
    iconType: 'building',
    link: "/profil"
  },
  {
    id: 2,
    title: "FAQ",
    description: "Pertanyaan yang sering diajukan seputar layanan dan nagari.",
    bgColor: "bg-yellow-500",
    iconType: 'book',
    link: "#faq"
  },
  {
    id: 3,
    title: "Berita dan Agenda",
    description: "Berita terkini dan informasi penting seputar Nagari",
    bgColor: "bg-blue-600",
    iconType: 'calendar',
    link: "/berita"
  },
  {
    id: 4,
    title: "Struktur pemerintahan",
    description: "Struktur pemerintahan yang terdapat pada nagari limo koto",
    bgColor: "bg-purple-600",
    iconType: 'user',
    link: "#struktur"
  },
  {
    id: 5,
    title: "Galeri",
    description: "Dokumentasi kegiatan dan keindahan alam Nagari",
    bgColor: "bg-pink-600",
    iconType: 'image',
    link: "/profil"
  },
  {
    id: 6,
    title: "Statistik",
    description: "Data demografis dan statistik penduduk nagari limo koto",
    bgColor: "bg-orange-600",
    iconType: 'chart',
    link: "/profil"
  },
];
