// Dzaki Lobang Amblas
"use client";
import Image from "next/image";
import { FaEye } from "react-icons/fa";

export default function BeritaPage() {
  return (
    <main className="min-h-screen bg-[url('/background.png')] bg-cover bg-center text-white">
      <div className="bg-black/60 min-h-screen px-6 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          {/* KIRI - Berita */}
          <section className="w-full lg:w-2/3">
            <h1 className="text-4xl font-bold mb-6">Berita</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Kartu Berita */}
              <div className="bg-white text-black rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/images/jamgadang.png"
                  alt="Jam Gadang"
                  width={600}
                  height={400}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-bold text-lg">Jam Gadang Bukittinggi</h2>
                  <p className="text-sm mt-1">
                    Bukittinggi terkenal akan salah satu lokasi wisatanya yaitu
                    jam gadang...
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-600 mt-4">
                    <span>29 Februari 2025</span>
                    <span className="flex items-center gap-1">
                      <FaEye /> 69
                    </span>
                  </div>
                </div>
              </div>

              {/* Tambahan kotak placeholder */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-xl h-52 opacity-50"
                ></div>
              ))}
            </div>
          </section>

          {/* KANAN - Agenda */}
          <aside className="w-full lg:w-1/3">
            <h2 className="text-4xl font-bold mb-6 text-center">Agenda</h2>
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

            {/* Placeholder tambahan */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-xl h-24 mb-4 opacity-50"
              ></div>
            ))}
          </aside>
        </div>
      </div>
    </main>
  );
}
