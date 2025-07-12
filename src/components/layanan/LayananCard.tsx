import React from "react";
import { LayananItem } from "@/types/layanan";
import { FaClock } from "react-icons/fa";
import { aktaList } from "@/data/layanan";

interface LayananCardProps {
  layanan: LayananItem;
  onClick: () => void;
}

const LayananCard = React.memo(({ layanan, onClick }: LayananCardProps) => {
  // Check if this is an administrative document
  const isAdministrativeDoc = aktaList.some((akta) => akta.id === layanan.id);

  return (
    <div className="group relative">
      <div
        className={`bg-gradient-to-br ${layanan.color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer h-full flex flex-col`}
      >
        {/* Icon */}
        <div className="text-4xl mb-4 text-center">{layanan.icon}</div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-300 transition-colors line-clamp-2 text-white">
          {layanan.title}
        </h3>

        {/* Description */}
        <p className="text-gray-200 text-sm mb-4 line-clamp-3 flex-grow">
          {layanan.description}
        </p>

        {/* Time Estimate */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-200">
          <FaClock className="text-yellow-400" />
          <span>Estimasi: {layanan.estimasi}</span>
        </div>

        {/* Action Button */}
        <button
          onClick={onClick}
          className={`w-full bg-gradient-to-r ${layanan.color} hover:shadow-lg hover:shadow-blue-500/25 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] bg-white/20 hover:bg-white/30 backdrop-blur-sm`}
        >
          {isAdministrativeDoc ? "Lihat Persyaratan" : "Ajukan Permohonan"}
        </button>
      </div>
    </div>
  );
});

LayananCard.displayName = "LayananCard";

export default LayananCard;
