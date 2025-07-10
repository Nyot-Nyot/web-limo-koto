import React from "react";

export default function Domisili() {
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
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">
        Surat Keterangan Domisili
      </h1>
      <div className="space-y-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-center bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl px-6 py-4 border border-white/10"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 font-bold text-2xl text-gray-900 rounded-lg flex items-center justify-center border border-gray-300 mr-4">
              {i + 1}
            </div>
            <div>
              <div className="font-bold text-white text-lg">
                {step.title}
              </div>
              <div className="text-gray-300 text-sm">{step.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

