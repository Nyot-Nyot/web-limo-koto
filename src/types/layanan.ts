// Types for layanan/services page
export interface LayananItem {
  id: string;
  title: string;
  items: string[];
  description: string;
  estimasi: string;
  biaya: string;
  icon: string;
  color: string;
  hasForm?: boolean;
}

export interface ContactItem {
  icon: React.ComponentType<any>;
  text: string;
  label: string;
  color: string;
}

export interface ContactInfo {
  pelayanan: ContactItem[];
  emergency: ContactItem[];
}

export interface JamLayanan {
  senin_jumat: string;
  sabtu: string;
  minggu: string;
}

export interface FormData {
  nama: string;
  nik: string;
  alamat: string;
  provinsi?: string;
  kabupaten?: string;
  kecamatan?: string;
  kampung?: string;
  dusun?: string;
  rk?: string;
  rt?: string;
  jenisKelamin: string;
  tempatTanggalLahir: string;
  agama: string;
  kewarganegaraan?: string;
  namaKK: string;
  pekerjaan?: string;
  keperluan?: string;
  dtks?: string;
}

export interface ModalState {
  isOpen: boolean;
  type: string;
  title: string;
}

export interface SKUFormData {
  nama: string;
  nik: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  alamat: string;
  rt: string;
  rw: string;
  dusun: string;
  agama: string;
  pekerjaan: string;
  status_perkawinan: string;
  nama_usaha: string;
  jenis_usaha: string;
  alamat_usaha: string;
  modal_usaha: string;
  lama_usaha: string;
  omzet_perbulan: string;
  keperluan: string;
  no_hp: string;
}
