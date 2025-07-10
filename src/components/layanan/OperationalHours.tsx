import React, { memo } from 'react';
import { FaClock } from 'react-icons/fa';
import { jamLayanan } from '@/data/layanan';

const OperationalHours = memo(() => (
  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
    <h3 className="text-xl font-bold mb-6 text-yellow-400">Jam Operasional</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Senin - Jumat</span>
        <span className="text-white font-medium">{jamLayanan.senin_jumat}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Sabtu</span>
        <span className="text-white font-medium">{jamLayanan.sabtu}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Minggu</span>
        <span className="text-red-400 font-medium">{jamLayanan.minggu}</span>
      </div>
    </div>
  </div>
));

OperationalHours.displayName = 'OperationalHours';

export default OperationalHours;
