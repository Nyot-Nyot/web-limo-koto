"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Domisili from "@/components/layanan/domisili";
import SKTM from "@/components/layanan/sktm";
import Usaha from "@/components/layanan/usaha";
import PengantarNikah from "@/components/layanan/pengantar_nikah";
import SuratKematian from "@/components/layanan/surat_kematian";
import KartuKeluarga from "@/components/layanan/kartu_keluarga";

const layananList = [
  {
    id: "domisili",
    title: "Surat Keterangan Domisili",
    component: <Domisili />,
  },
  {
    id: "sktm",
    title: "Surat Keterangan Tidak Mampu (SKTM)",
    component: <SKTM />,
  },
  { id: "usaha", title: "Surat Keterangan Usaha", component: <Usaha /> },
  {
    id: "pengantar_nikah",
    title: "Surat Pengantar Nikah",
    component: <PengantarNikah />,
  },
  {
    id: "surat_kematian",
    title: "Surat Keterangan Kematian",
    component: <SuratKematian />,
  },
  {
    id: "kartu_keluarga",
    title: "Kartu Keluarga",
    component: <KartuKeluarga />,
  },
];

export default function LayananPage() {
  const [activeSection, setActiveSection] = useState("");
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const section = sectionRefs.current[activeSection];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeSection]);

  return (
    <div className="relative min-h-screen text-white pb-12 overflow-x-hidden">
      {/* Background overlay sama seperti profil */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('/images/Rectangle.png') center/cover`,
        }}
      />
      <Header />
      <div className="relative z-10 max-w-5xl mx-auto pt-24 px-4 md:px-0">
        <h1
          className="text-4xl font-bold mb-6 text-center"
          style={{ fontFamily: "Source Serif 4, serif" }}
        >
          Layanan Publik
        </h1>
        <p className="text-sm text-gray-300 text-center mb-4">
          Kantor Wali Nagari, Nagari Limo Koto
        </p>
        <div className="flex justify-center mb-10">
          <span className="bg-white/80 text-gray-900 rounded-full px-6 py-2 text-xs font-semibold shadow">
            Senin-Jumat 08:00 - 12:00 & 13:30 - 16:00 WIB
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {layananList.map((layanan) => (
            <button
              key={layanan.id}
              onClick={() => setActiveSection(layanan.id)}
              className={`w-full bg-white/10 backdrop-blur-md hover:bg-yellow-400/80 hover:text-gray-900 text-white rounded-xl p-4 shadow flex flex-col items-start transition-all duration-300 border border-gray-200`}
              style={{ minHeight: 140, textAlign: "left" }}
            >
              <h3 className="text-base font-bold mb-2">{layanan.title}</h3>
              <div className="w-full h-[2px] bg-black mb-3 mt-1 rounded"></div>
              <ul className="text-xs text-white/90 list-disc pl-4 space-y-1">
                {layanan.id === "domisili" && (
                  <>
                    <li>FC KK dan KTP</li>
                    <li>Surat pengantar RT/RW</li>
                  </>
                )}
                {layanan.id === "sktm" && (
                  <>
                    <li>FC KK dan KTP</li>
                    <li>Surat pengantar RT/RW</li>
                  </>
                )}
                {layanan.id === "usaha" && (
                  <>
                    <li>FC KK dan KTP</li>
                    <li>Surat pengantar RT/RW</li>
                    <li>Foto tempat usaha</li>
                  </>
                )}
                {layanan.id === "pengantar_nikah" && (
                  <>
                    <li>FC KK dan KTP</li>
                    <li>Surat pengantar RT/RW</li>
                  </>
                )}
                {layanan.id === "surat_kematian" && (
                  <>
                    <li>FC KK dan KTP</li>
                    <li>Surat pengantar RT/RW</li>
                    <li>Surat keterangan dokter/RS</li>
                  </>
                )}
                {layanan.id === "kartu_keluarga" && (
                  <>
                    <li>FC KK dan KTP</li>
                    <li>Surat pengantar RT/RW</li>
                  </>
                )}
              </ul>
            </button>
          ))}
        </div>
        <div className="bg-white/10 rounded-lg p-6 shadow">
          {layananList.map((layanan) => (
            <div
              key={layanan.id}
              ref={(el) => {
                sectionRefs.current[layanan.id] = el;
              }}
              style={{
                display: activeSection === layanan.id ? "block" : "none",
              }}
            >
              {layanan.component}
            </div>
          ))}
        </div>

        {/* 3 Kartu Kontak & Ulasan */}
        <div className="mt-16 flex flex-col items-center w-full">
          <div className="flex flex-col md:flex-row gap-6 w-full justify-center mb-6">
            {/* Kontak Pelayanan Publik */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow p-6 flex-1 min-w-[270px] max-w-md text-white">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Kontak Pelayanan Publik
              </h3>
              <div className="w-full h-[2px] bg-black mb-3 mt-1 rounded"></div>
              <ul className="text-sm text-gray-800 space-y-2">
                <li className="flex items-center gap-2">
                  {/* Telepon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="#222"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.09 5.18 2 2 0 0 1 5.11 3h3a2 2 0 0 1 2 1.72c.13.97.37 1.91.72 2.81a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.9.35 1.84.59 2.81.72A2 2 0 0 1 22 16.92z"
                    />
                  </svg>
                  08123456789092
                </li>
                <li className="flex items-center gap-2">
                  {/* WhatsApp */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#222"
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.363.71.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z"
                    />
                    <path
                      fill="#222"
                      fillRule="evenodd"
                      d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.463 3.484 1.34 4.997L2.01 21.988l5.104-1.335a9.96 9.96 0 0 0 4.89 1.247h.001c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.178-2.929-7.067-1.89-1.89-4.398-2.93-7.068-2.93zm0 17.995a7.96 7.96 0 0 1-4.063-1.13l-.29-.172-3.027.792.808-2.953-.188-.303A7.96 7.96 0 0 1 4.04 12c0-4.398 3.566-7.964 7.964-7.964 2.127 0 4.127.83 5.632 2.336a7.93 7.93 0 0 1 2.332 5.63c0 4.398-3.566 7.964-7.964 7.964z"
                      clipRule="evenodd"
                    />
                  </svg>
                  08123456789092
                </li>
                <li className="flex items-center gap-2">
                  {/* Gmail */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#222"
                      d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18v-8.99l7.29 6.36a1 1 0 0 0 1.42 0L20 9.01V18H4z"
                    />
                  </svg>
                  limoKoto69@gmail.com
                </li>
                <li className="flex items-center gap-2">
                  {/* Instagram */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      width="18"
                      height="18"
                      x="3"
                      y="3"
                      rx="4"
                      stroke="#222"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      stroke="#222"
                      strokeWidth="2"
                    />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="#222" />
                  </svg>
                  Limo Koto
                </li>
              </ul>
            </div>
            {/* Kontak Emergency */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow p-6 flex-1 min-w-[270px] max-w-md text-white">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Kontak Emergency
              </h3>
              <div className="w-full h-[2px] bg-black mb-3 mt-1 rounded"></div>
              <ul className="text-sm text-gray-800 space-y-2">
                <li className="flex items-center gap-2">
                  <span>🚑</span> 0823456789002
                </li>
                <li className="flex items-center gap-2">
                  <span>🚓</span> 0823456789002
                </li>
              </ul>
            </div>
          </div>
          {/* Ulasan */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow p-6 w-full max-w-2xl text-white">
            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
              Ulasan
            </h3>
            <div className="w-full h-[2px] bg-black mb-3 mt-1 rounded"></div>
            <div className="text-gray-700 text-center text-sm opacity-60">
              Belum ada ulasan.
            </div>
            <p className="text-sm text-gray-700 text-center mb-2">
              Silakan tinggalkan ulasan atau saran Anda untuk pelayanan Nagari
              Limo Koto.
            </p>
            <textarea
              className="w-full rounded border border-gray-300 p-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-white/90 resize-none bg-white/90"
              rows={3}
              placeholder="Tulis ulasan Anda..."
            />
            <button className="bg-white/90 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-1 rounded shadow transition-all text-sm">
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
