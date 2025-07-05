"use client";

import Image from "next/image";
import { FaEye } from "react-icons/fa";
import Header from "@/components/Header";

export default function BeritaPage() {
  return (
    <div className="relative min-h-screen bg-[url('/images/background.png')] bg-cover bg-center text-white">
      <Header />
      <div className="bg-black/60 min-h-screen px-6 py-20">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 h-[calc(100vh-5rem)]">
          {/* KIRI - Berita */}
          <section className="w-full lg:w-2/3 flex flex-col h-full">
            <h1 className="text-4xl font-bold mb-6">Berita</h1>
            <div className="flex-1 h-full">
              <div className="grid grid-rows-2 gap-6 h-full overflow-x-auto pb-2 scrollbar-thin [--sb-thumb:rgba(255,255,255,0.05)] [--sb-track:rgba(255,255,255,0.01)] scrollbar-thumb-[var(--sb-thumb)] scrollbar-track-[var(--sb-track)]">
                <div className="flex gap-6 h-full">
                  {/* Baris 1 */}
                  <a
                    href="/berita/jam-gadang-bukittinggi"
                    className="min-w-[320px] max-w-xs h-full bg-white text-black rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition-transform flex-shrink-0 flex flex-col"
                  >
                    <Image
                      src="/images/jamgadang.png"
                      alt="Jam Gadang"
                      width={600}
                      height={400}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-1">
                      <h2 className="font-bold text-lg">
                        Jam Gadang Bukittinggi
                      </h2>
                      <p className="text-sm mt-1 flex-1">
                        Bukittinggi terkenal akan salah satu lokasi wisatanya
                        yaitu jam gadang...
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-600 mt-4">
                        <span>29 Februari 2025</span>
                        <span className="flex items-center gap-1">
                          <FaEye /> 69
                        </span>
                      </div>
                    </div>
                  </a>
                  {/* Placeholder baris 1 */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="min-w-[320px] max-w-xs h-full bg-gray-200 rounded-xl opacity-50 flex-shrink-0"
                    ></div>
                  ))}
                </div>
                <div className="flex gap-6 h-full">
                  {/* Baris 2 */}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="min-w-[320px] max-w-xs h-full bg-gray-200 rounded-xl opacity-50 flex-shrink-0"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* KANAN - Agenda */}
          <aside className="w-full lg:w-1/3 flex flex-col h-full">
            <h2 className="text-4xl font-bold mb-6 text-center">Agenda</h2>
            <div className="flex-1 h-full overflow-y-auto pr-2 scrollbar-thin [--sb-thumb:rgba(255,255,255,0.05)] [--sb-track:rgba(255,255,255,0.01)] scrollbar-thumb-[var(--sb-thumb)] scrollbar-track-[var(--sb-track)]">
              <div className="bg-white text-black rounded-xl p-4 mb-4 shadow-md">
                <h3 className="font-bold text-lg mb-2">Presentasi KKN</h3>
                <p>
                  <strong>Oleh:</strong> KKN UNP 2025
                </p>
                <p>
                  <strong>Di:</strong> Lantai 2 Kantor Wali Nagari
                </p>
                <div className="flex justify-between text-sm mt-2 text-gray-700">
                  <span>25 Juni 2025</span>
                  <span>08:00 - 12:00</span>
                </div>
              </div>
              {/* Placeholder tambahan agenda */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-xl h-24 mb-4 opacity-50"
                ></div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
