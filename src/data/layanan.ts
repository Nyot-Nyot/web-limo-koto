import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaInstagram, FaAmbulance, FaShieldAlt } from "react-icons/fa";
import { LayananItem, ContactInfo, JamLayanan } from "@/types/layanan";

export const layananList: LayananItem[] = [
  {
    id: "domisili",
    title: "Surat Keterangan Domisili",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW"],
    description: "Surat keterangan tempat tinggal untuk keperluan administrasi",
    estimasi: "1-2 hari kerja",
    biaya: "Gratis",
    icon: "🏠",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "sktm",
    title: "Surat Keterangan Tidak Mampu (SKTM)",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW"],
    description: "Surat keterangan untuk bantuan sosial atau beasiswa",
    estimasi: "1-2 hari kerja",
    biaya: "Gratis",
    icon: "📋",
    color: "from-green-500 to-green-600"
  },
  {
    id: "usaha",
    title: "Surat Keterangan Usaha",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW", "Foto tempat usaha"],
    description: "Surat keterangan untuk legalisasi usaha mikro dan kecil",
    estimasi: "2-3 hari kerja",
    biaya: "Gratis",
    icon: "🏪",
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "pengantar_nikah",
    title: "Surat Pengantar Nikah",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW"],
    description: "Surat pengantar untuk pendaftaran pernikahan di KUA",
    estimasi: "1 hari kerja",
    biaya: "Gratis",
    icon: "💒",
    color: "from-pink-500 to-pink-600"
  },
  {
    id: "surat_kematian",
    title: "Surat Keterangan Kematian",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW", "Surat keterangan dokter/RS"],
    description: "Surat keterangan untuk administrasi kematian",
    estimasi: "1 hari kerja",
    biaya: "Gratis",
    icon: "📃",
    color: "from-gray-500 to-gray-600"
  },
  {
    id: "surat_cerai",
    title: "Surat Cerai",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW"],
    description: "Surat keterangan untuk administrasi perceraian",
    estimasi: "1-2 hari kerja",
    biaya: "Gratis",
    icon: "📄",
    color: "from-orange-500 to-orange-600"
  },
];

export const kontakInfo: ContactInfo = {
  pelayanan: [
    { icon: FaPhoneAlt, text: "08123456789092", label: "Telepon", color: "text-blue-400" },
    { icon: FaWhatsapp, text: "08123456789092", label: "WhatsApp", color: "text-green-400" },
    { icon: FaEnvelope, text: "limoKoto69@gmail.com", label: "Email", color: "text-red-400" },
    { icon: FaInstagram, text: "Limo Koto", label: "Instagram", color: "text-pink-400" },
  ],
  emergency: [
    { icon: FaAmbulance, text: "0823456789002", label: "Ambulance", color: "text-red-500" },
    { icon: FaShieldAlt, text: "0823456789002", label: "Keamanan", color: "text-blue-500" },
  ]
};

export const jamLayanan: JamLayanan = {
  senin_jumat: "08:00 - 12:00 & 13:30 - 16:00",
  sabtu: "08:00 - 11:00",
  minggu: "Tutup"
};
