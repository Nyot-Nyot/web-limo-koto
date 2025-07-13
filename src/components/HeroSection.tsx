'use client';

import React, { Suspense } from 'react';
import { useHomeData } from '@/hooks/useHomeData';
import HeroMain from '@/components/home/HeroMain';
const FeaturesSection = React.lazy(() => import('@/components/home/FeaturesSection'));
const PejabatSection = React.lazy(() => import('@/components/home/PejabatSection'));
const NewsSection = React.lazy(() => import('@/components/home/NewsSection'));
const FAQSection = React.lazy(() => import('@/components/home/FAQSection'));
import BackgroundImage from '@/components/ui/BackgroundImage';

function SectionFallback({ label }: { label: string }) {
  return (
    <div className="text-center py-12 text-gray-300">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400 mx-auto mb-2"></div>
      Memuat {label}...
    </div>
  );
}

export default function HeroSection() {
  const { data, loading, error } = useHomeData();

  return (
    <div className="relative text-white min-h-screen">
      <BackgroundImage src="/images/background.png" overlay={true} overlayOpacity={0.6} />
      <div className="relative z-10 flex flex-col pl-12 pr-6 md:pl-20 md:pr-0 lg:pl-24">
        <HeroMain />
        {/* Features Section */}
        <Suspense fallback={<SectionFallback label="fitur" />}>
          {loading ? <SectionFallback label="fitur" /> : error ? <div className="text-red-400">Gagal memuat fitur</div> : <FeaturesSection features={data.features} />}
        </Suspense>
        {/* Pejabat Section */}
        <Suspense fallback={<SectionFallback label="struktur pemerintahan" />}>
          {loading ? <SectionFallback label="struktur pemerintahan" /> : error ? <div className="text-red-400">Gagal memuat struktur pemerintahan</div> : <PejabatSection pejabatData={data.pejabat} />}
        </Suspense>
        {/* News Section */}
        <Suspense fallback={<SectionFallback label="berita" />}>
          {loading ? <SectionFallback label="berita" /> : error ? <div className="text-red-400">Gagal memuat berita</div> : <NewsSection newsData={data.news} />}
        </Suspense>
        {/* FAQ Section */}
        <Suspense fallback={<SectionFallback label="FAQ" />}>
          {loading ? <SectionFallback label="FAQ" /> : error ? <div className="text-red-400">Gagal memuat FAQ</div> : <FAQSection faqData={data.faq} />}
        </Suspense>
      </div>
    </div>
  );
}