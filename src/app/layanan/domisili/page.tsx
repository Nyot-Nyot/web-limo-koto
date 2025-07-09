"use client";
import { useRouter } from "next/navigation";

export default function DomisiliPage() {
  const router = useRouter();
  const steps = [
    {
      title: "Datang ke Kantor",
      desc: "Dengan membawa dokumen persyaratan",
    },
    {
      title: "Isi Formulir",
      desc: "Yang disediakan oleh petugas",
    },
    {
      title: "Verifikasi",
      desc: "Oleh petugas nagari",
    },
    {
      title: "Selesai",
      desc: "Dokumen diterbitkan maksimal dalam 1 hari kerja",
    },
  ];

  return (
    <div className="relative min-h-screen pb-12 overflow-x-hidden">
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('/images/Rectangle.png') center/cover`,
        }}
      />
      <button
        onClick={() => router.push("/layanan")}
        className="absolute top-6 left-6 bg-white/80 backdrop-blur-md text-gray-900 px-4 py-2 rounded-lg shadow hover:bg-yellow-400/80 font-semibold flex items-center gap-2 z-10"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path
            d="M15 19l-7-7 7-7"
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Kembali
      </button>
      <div className="relative z-10 max-w-3xl mx-auto pt-24 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">
          Surat Keterangan Domisili
        </h1>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-md rounded-xl shadow px-6 py-4 flex items-center"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-white font-bold text-2xl text-gray-900 rounded-lg flex items-center justify-center border border-gray-300 mr-4">
                {i + 1}
              </div>
              <div>
                <div className="font-bold text-gray-900 text-lg">
                  {step.title}
                </div>
                <div className="text-gray-700 text-sm">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
