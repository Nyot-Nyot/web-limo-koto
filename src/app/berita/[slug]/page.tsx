"use client";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function BeritaDetailPage() {
  return (
    <main className="min-h-screen bg-[url('/images/background.png')] bg-cover bg-center text-white">
      <div className="bg-black/60 min-h-screen px-6 py-12">
        <div className="max-w-2xl mx-auto bg-white text-black rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/jamgadang.png"
            alt="Jam Gadang"
            width={800}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="font-bold text-3xl mb-2">Jam Gadang Bukittinggi</h1>
            <div className="flex justify-between items-center text-xs text-gray-600 mb-4">
              <span>29 Februari 2025</span>
              <span className="flex items-center gap-1">
                <FaEye /> 69
              </span>
            </div>
            <p className="text-base mb-4">
              Jam Gadang adalah menara jam yang menjadi ikon kota Bukittinggi,
              Sumatera Barat. Bangunan ini dibangun pada masa pemerintahan
              Hindia Belanda dan menjadi salah satu destinasi wisata utama di
              Sumatera Barat. Selain sebagai penunjuk waktu, Jam Gadang juga
              menjadi pusat berbagai kegiatan masyarakat dan wisatawan.
            </p>
            <button
              onClick={() => window.history.back()}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
