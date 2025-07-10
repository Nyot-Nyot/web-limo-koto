"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

const layananList = [
  {
    id: "domisili",
    title: "Surat Keterangan Domisili",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW"],
  },
  {
    id: "sktm",
    title: "Surat Keterangan Tidak Mampu (SKTM)",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW"],
  },
  {
    id: "usaha",
    title: "Surat Keterangan Usaha",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW", "Foto tempat usaha"],
  },
  {
    id: "pengantar_nikah",
    title: "Surat Pengantar Nikah",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW"],
  },
  {
    id: "surat_kematian",
    title: "Surat Keterangan Kematian",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW", "Surat keterangan dokter/RS"],
  },
  {
    id: "surat_cerai",
    title: "Surat Cerai",
    items: ["FC KK dan KTP", "Surat pengantar RT/RW"],
  },
];

const kontakPelayanan = [
  { icon: "📞", text: "08123456789092" },
  { icon: "💬", text: "08123456789092" },
  { icon: "✉️", text: "limoKoto69@gmail.com" },
  { icon: "📸", text: "Limo Koto" },
];

const kontakEmergency = [
  { icon: "🚑", text: "0823456789002" },
  { icon: "👮", text: "0823456789002" },
];


const InfoCard: React.FC<{ title: string; items: { icon: string; text: string }[] }> = ({ title, items }) => (
  <div className="bg-white/80 backdrop-blur-md rounded-xl shadow p-6 flex-1 min-w-[270px] max-w-md text-gray-900">
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <div className="w-full h-[2px] bg-black mb-3 mt-1 rounded"></div>
    <ul className="text-sm text-gray-900 space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center gap-2">{item.icon} {item.text}</li>
      ))}
    </ul>
  </div>
);

const LayananCard: React.FC<{ layanan: typeof layananList[0]; onClick: () => void }> = React.memo(({ layanan, onClick }) => (
  <button
    onClick={onClick}
    className="group w-full bg-white/80 backdrop-blur-md hover:bg-yellow-400/80 hover:text-gray-900 text-gray-900 rounded-xl p-4 shadow flex flex-col items-start transition-all duration-300 border border-gray-200"
    style={{ minHeight: 140, textAlign: "left" }}
  >
    <h3 className="text-base font-bold mb-2 group-hover:text-black transition-colors duration-300">
      {layanan.title}
    </h3>
    <div className="w-full h-[2px] bg-black group-hover:bg-black mb-3 mt-1 rounded transition-colors duration-300"></div>
    <ul className="text-xs list-disc pl-4 space-y-1 transition-colors duration-300 group-hover:text-black">
      {layanan.items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </button>
));
export default function LayananPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen text-white pb-12 overflow-x-hidden">
      {/* Background overlay sama seperti profil */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('/images/background.png') center/cover",
        }}
      />
      <Header />
      <div className="relative z-10 max-w-5xl mx-auto pt-24 px-4 md:px-0">
        <h1
          className="text-4xl font-bold mb-6 text-center"
          style={{ fontFamily: "'Poppins', serif", fontSize: "3.75rem" }}
        >
          Layanan Publik
        </h1>
        <p
          className="text-sm text-gray-300 text-center mb-4"
          style={{ fontFamily: "'Poppins', serif" }}
        >
          Kantor Wali Nagari, Nagari Limo Koto
        </p>
        <div className="flex justify-center mb-10">
          <span
            className="bg-white/80 text-gray-900 rounded-full px-6 py-2 text-xs font-semibold shadow"
            style={{ fontFamily: "'Poppins', serif" }}
          >
            Senin-Jumat 08:00 - 12:00 & 13:30 - 16:00 WIB
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {layananList.map((layanan) => (
            <LayananCard key={layanan.id} layanan={layanan} onClick={() => router.push(`/layanan/${layanan.id}`)} />
          ))}
        </div>

        {/* Kartu Kontak & Ulasan */}
        <div className="mt-16 flex flex-col items-center w-full">
          <div className="flex flex-col md:flex-row gap-6 w-full justify-center mb-6">
            <InfoCard title="Kontak Pelayanan Publik" items={kontakPelayanan} />
            <InfoCard title="Kontak Emergency" items={kontakEmergency} />
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow p-6 w-full max-w-2xl text-gray-900">
            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Ulasan</h3>
            <div className="w-full h-[2px] bg-black mb-3 mt-1 rounded"></div>
            <div className="text-gray-700 text-center text-sm opacity-60">Belum ada ulasan.</div>
            <p className="text-sm text-gray-900 text-center mb-2">Silakan tinggalkan ulasan atau saran Anda untuk pelayanan Nagari Limo Koto.</p>
            <textarea
              className="w-full rounded border border-gray-500 p-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none text-gray-900"
              rows={3}
              placeholder="Tulis ulasan Anda..."
            />
            <button className="bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-semibold px-4 py-1 rounded shadow transition-all text-sm">
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
// ...existing code...
}
