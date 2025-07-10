import React, { memo } from 'react';
import { LayananItem } from '@/types/layanan';
import { FaFileAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

interface LayananCardProps {
  layanan: LayananItem;
  onClick: () => void;
}

const LayananCard = memo<LayananCardProps>(({ layanan, onClick }) => (
  <div className="bg-white/10 backdrop-blur-lg text-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group border border-white/20">
    <div className="p-6">
      {/* Header with Icon */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl mb-2">{layanan.icon}</div>
        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${layanan.color} text-xs font-semibold`}>
          {layanan.biaya}
        </div>
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
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <FaFileAlt className="text-yellow-400 text-sm" />
          <span className="text-sm font-medium text-gray-300">Persyaratan:</span>
        </div>
        <ul className="space-y-1">
          {layanan.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
              <FaCheckCircle className="text-green-400 text-xs mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Time Estimate */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-300">
        <FaClock className="text-blue-400" />
        <span>Estimasi: {layanan.estimasi}</span>
      </div>
      
      {/* Action Button */}
      <button
        onClick={onClick}
        className={`w-full bg-gradient-to-r ${layanan.color} hover:shadow-lg hover:shadow-blue-500/25 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02]`}
      >
        Ajukan Permohonan
      </button>
    </div>
  </div>
));

LayananCard.displayName = 'LayananCard';

export default LayananCard;
