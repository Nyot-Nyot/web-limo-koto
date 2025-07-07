export interface Pejabat {
  id: string;
  name: string;
  title: string;
  image: string;
  jorong?: string;
  description: string;
}

export const waliNagariData: Pejabat = {
  id: 'wali-nagari-sukirman',
  name: 'Dr. Sukirman, M.Pd',
  title: 'Wali Nagari',
  image: '/images/pejabat-1.jpg',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
};

export const kepalaJorongData: Pejabat[] = [
  { id: 'kepala-jorong-1', jorong: 'Aur Gading', name: 'Tralalelo Tralala, S.Kom', title: 'Kepala Jorong', image: '/images/pejabat-2.jpg', description: 'Deskripsi untuk Kepala Jorong Aur Gading.' },
  { id: 'kepala-jorong-2', jorong: 'Koto Tongga', name: 'Sekretaris Dua, S.Kom', title: 'Kepala Jorong', image: '/images/pejabat-3.jpg', description: 'Deskripsi untuk Kepala Jorong Koto Tongga.' },
  { id: 'kepala-jorong-3', jorong: 'Jorong XYZ', name: 'Sekretaris Tiga, S.E', title: 'Kepala Jorong', image: '/images/pejabat-4.jpg', description: 'Deskripsi untuk Kepala Jorong XYZ.' }
];

export const sekretarisData: Pejabat[] = [
  { id: 'sekretaris-1', title: 'Sekretaris', name: 'Tung tung tung tung sahur, S.Pd', image: '/images/pejabat-5.jpg', description: 'Deskripsi untuk Sekretaris.' },
  { id: 'sekretaris-2', title: 'Bendahara', name: 'Sekretaris Dua, S.Kom', image: '/images/pejabat-6.jpg', description: 'Deskripsi untuk Bendahara.' },
  { id: 'sekretaris-3', title: 'Staff', name: 'Sekretaris Tiga, S.E', image: '/images/pejabat-7.jpg', description: 'Deskripsi untuk Staff.' }
];

export const allPejabat: Pejabat[] = [
  waliNagariData,
  ...kepalaJorongData,
  ...sekretarisData
];
