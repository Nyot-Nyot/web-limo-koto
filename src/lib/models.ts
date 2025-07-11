// Model data untuk aplikasi Nagari Lima Koto

// Timestamp interface untuk Firestore timestamps
export interface Timestamp {
  seconds: number;
  nanoseconds: number;
  toDate: () => Date;
  valueOf: () => number;
}

// Model dasar dengan fields umum
export interface BaseModel {
  id?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Model untuk pejabat/struktur
export interface Pejabat extends BaseModel {
  nama: string;
  jabatan: string;
  foto: string;
  deskripsi?: string;
  periode?: string;
  urutan?: number;
}

// Model untuk berita
export interface Berita extends BaseModel {
  judul: string;
  slug: string;
  konten: string;
  gambar: string;
  kategori: string[];
  penulis: string;
  tanggalTerbit: Timestamp;
  isPublished: boolean;
  ringkasan?: string;
  viewCount?: number;
}

// Model untuk galeri
export interface GaleriItem extends BaseModel {
  judul: string;
  gambar: string;
  kategori: string;
  deskripsi?: string;
  tanggal?: Timestamp;
}

// Model untuk FAQ
export interface FAQ extends BaseModel {
  pertanyaan: string;
  jawaban: string;
  kategori?: string;
  urutan?: number;
}

// Model untuk Jorong (dusun/desa bagian)
export interface Jorong extends BaseModel {
  nama: string;
  kepala: string;
  foto?: string;
  deskripsi?: string;
  lokasi?: {
    lat?: number;
    lng?: number;
  };
  penduduk?: number;
  luasWilayah?: string;
}

// Model untuk Agenda
export interface Agenda extends BaseModel {
  judul: string;
  tanggal: Timestamp;
  lokasi: string;
  deskripsi: string;
  gambar?: string;
  isSelesai?: boolean;
  penyelenggara?: string;
}

// Model untuk Layanan
export interface Layanan extends BaseModel {
  nama: string;
  deskripsi: string;
  persyaratan: string[];
  prosedur: string[];
  estimasiWaktu?: string;
  biaya?: string;
  kontakPIC?: string;
}

// Model untuk User (admin)
export interface User extends BaseModel {
  email: string;
  displayName?: string;
  role: 'admin' | 'super-admin' | 'editor';
  photoURL?: string;
  isActive: boolean;
  lastLogin?: Timestamp;
}
