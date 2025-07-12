// Types for layanan/services page
import { ComponentType } from 'react';

export interface LayananItem {
  id: string;
  title: string;
  items: string[];
  description: string;
  estimasi: string;
  biaya: string;
  icon: string;
  color: string;
}

export interface ContactItem {
  icon: ComponentType<{ className?: string }>;
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
