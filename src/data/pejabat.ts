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
  description: 'Wali Nagari adalah pimpinan tertinggi dalam pemerintahan nagari yang bertugas mengatur, mengkoordinasikan, dan memimpin pelaksanaan pembangunan serta pelayanan masyarakat di wilayahnya.'
};

export const kepalaJorongData: Pejabat[] = [
  { id: 'kepala-jorong-1', jorong: 'Aur Gading', name: 'Tralalelo Tralala, S.Kom', title: 'Kepala Jorong', image: '/images/pejabat-2.jpg', description: 'Kepala Jorong adalah pimpinan di tingkat jorong (setingkat dusun/lingkungan) yang bertugas membantu Wali Nagari dalam menyelenggarakan pemerintahan dan pelayanan masyarakat di wilayah jorongnya.' },
  { id: 'kepala-jorong-2', jorong: 'Koto Tongga', name: 'Sekretaris Dua, S.Kom', title: 'Kepala Jorong', image: '/images/pejabat-3.jpg', description: 'Kepala Jorong adalah pimpinan di tingkat jorong (setingkat dusun/lingkungan) yang bertugas membantu Wali Nagari dalam menyelenggarakan pemerintahan dan pelayanan masyarakat di wilayah jorongnya.' },
  { id: 'kepala-jorong-3', jorong: 'Jorong XYZ', name: 'Sekretaris Tiga, S.E', title: 'Kepala Jorong', image: '/images/pejabat-4.jpg', description: 'Kepala Jorong adalah pimpinan di tingkat jorong (setingkat dusun/lingkungan) yang bertugas membantu Wali Nagari dalam menyelenggarakan pemerintahan dan pelayanan masyarakat di wilayah jorongnya.' }
];

export const sekretarisData: Pejabat[] = [
  { id: 'sekretaris-1', title: 'Sekretaris', name: 'Tung tung tung tung sahur, S.Pd', image: '/images/pejabat-5.jpg', description: 'Sekretaris Nagari bertugas membantu Wali Nagari dalam hal administrasi pemerintahan, menyusun laporan, dan mengelola dokumen serta arsip resmi nagari.' },
  { id: 'sekretaris-2', title: 'Bendahara', name: 'Sekretaris Dua, S.Kom', image: '/images/pejabat-6.jpg', description: 'Bendahara nagari bertanggung jawab atas pengelolaan keuangan nagari, termasuk pencatatan, penyusunan anggaran, serta pelaporan keuangan secara transparan dan akuntabel.' },
  { id: 'sekretaris-3', title: 'Staff', name: 'Sekretaris Tiga, S.E', image: '/images/pejabat-7.jpg', description: 'Staf nagari membantu pelaksanaan kegiatan pemerintahan, administrasi, dan pelayanan publik lainnya sesuai bidang tugas yang diberikan oleh Wali Nagari atau Sekretaris. ' }
];

export const allPejabat: Pejabat[] = [
  waliNagariData,
  ...kepalaJorongData,
  ...sekretarisData
];
