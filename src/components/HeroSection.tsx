'use client';

import { useHomeData } from '@/hooks/useHomeData';
import HeroMain from '@/components/home/HeroMain';
import PejabatSection from '@/components/home/PejabatSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import FAQSection from '@/components/home/FAQSection';
import NewsSection from '@/components/home/NewsSection';

export default function HeroSection() {
  const { data, loading, error } = useHomeData();

  if (loading) {
    return (
      <div className="relative text-white min-h-screen flex items-center justify-center">
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: 'url("/images/background.png")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: -2
          }}
        />
        <div className="fixed inset-0 bg-black/60" style={{ zIndex: -1 }} />
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative text-white min-h-screen flex items-center justify-center">
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: 'url("/images/background.png")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: -2
          }}
        />
        <div className="fixed inset-0 bg-black/60" style={{ zIndex: -1 }} />
        <div className="text-center relative z-10">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative text-white min-h-screen">
      {/* Background Image */}
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: 'url("/images/background.png")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          zIndex: -2
        }}
      />
      
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60" 
        style={{ zIndex: -1 }} 
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col pl-12 pr-6 md:pl-20 md:pr-0 lg:pl-24">
        {/* Hero Main Section */}
        <HeroMain />

        {/* Features Section */}
        <FeaturesSection features={data.features} />

        {/* Pejabat Section */}
        <PejabatSection pejabatData={data.pejabat} />

        {/* News Section */}
        <NewsSection newsData={data.news} />

        {/* FAQ Section */}
        <FAQSection faqData={data.faq} />
      </div>
    </div>
  );
}