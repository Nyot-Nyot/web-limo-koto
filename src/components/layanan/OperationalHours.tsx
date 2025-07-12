import React from "react";
import { FaClock } from "react-icons/fa";
import { jamLayanan } from "@/data/layanan";

const OperationalHours = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg text-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group border border-white/20 h-full">
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <FaClock className="text-yellow-400 text-xl" />
          <h3 className="text-xl font-bold group-hover:text-yellow-300 transition-colors">
            Jam Operasional
          </h3>
        </div>

        {/* Schedule */}
        <div className="space-y-3 flex-grow">
          {/* Monday to Friday */}
          <div className="flex justify-between items-center py-2 border-b border-white/10">
            <span className="text-gray-300 font-medium">Senin - Jumat</span>
            <span className="text-green-400 font-semibold">
              {jamLayanan.senin_jumat}
            </span>
          </div>

          {/* Saturday and Sunday combined */}
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-300 font-medium">Sabtu - Minggu</span>
            <span className="text-red-400 font-semibold">Tutup</span>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-gray-400 text-center">
            Pelayanan hanya pada hari kerja
          </p>
        </div>
      </div>
    </div>
  );
};

export default OperationalHours;
