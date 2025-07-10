import React, { memo } from 'react';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { jamLayanan } from '@/data/layanan';

const PageHeader = memo(() => (
  <div className="text-center mb-8 md:mb-12 mt-8">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
      Layanan Publik
    </h1>
    <p className="text-lg md:text-xl text-gray-200 mb-4">
      Kantor Wali Nagari, Nagari Limo Koto
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-6 py-3 shadow-lg">
        <FaClock className="text-yellow-400" />
        <span className="font-medium">Senin-Jumat: {jamLayanan.senin_jumat}</span>
      </div>
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-6 py-3 shadow-lg">
        <FaMapMarkerAlt className="text-red-400" />
        <span className="font-medium">Nagari Limo Koto</span>
      </div>
    </div>
  </div>
));

PageHeader.displayName = 'PageHeader';

export default PageHeader;
