import React, { memo } from "react";
import { LayananItem } from "@/types/layanan";
import { FaFileAlt, FaCheckCircle } from "react-icons/fa";
import { aktaList } from "@/data/layanan";

interface LayananCardProps {
  layanan: LayananItem;
  onClick: () => void;
}

const LayananCard = memo<LayananCardProps>(({ layanan, onClick }) => {
  // Check if this is an administrative document
  const isAdministrativeDoc = aktaList.some((akta) => akta.id === layanan.id);

  return (
    <div className="bg-white/10 backdrop-blur-lg text-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group border border-white/20 h-full">
      <div className="p-6 h-full flex flex-col">
        {/* Header with Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl mb-2">{layanan.icon}</div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-300 transition-colors line-clamp-2">
          {layanan.title}
        </h3>

        {/* Description */}
        <p className="text-gray-200 text-sm mb-4 line-clamp-3">
          {layanan.description}
        </p>

        {/* Requirements */}
        <div className={`${isAdministrativeDoc ? "mb-4" : "mb-6"} flex-grow`}>
          <div className="flex items-center gap-2 mb-2">
            <FaFileAlt className="text-yellow-400 text-sm" />
            <span className="text-sm font-medium text-gray-300">
              Persyaratan:
            </span>
          </div>
          <ul className="space-y-1">
            {layanan.items.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-gray-300"
              >
                <FaCheckCircle className="text-green-400 text-xs mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button - Only show for regular services, not administrative documents */}
        {!isAdministrativeDoc && (
          <button
            onClick={onClick}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-500/25 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] mt-auto"
          >
            Ajukan Permohonan
          </button>
        )}
      </div>
    </div>
  );
});

LayananCard.displayName = "LayananCard";

export default LayananCard;
