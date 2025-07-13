'use client';

import { useRouter } from 'next/navigation';
import FeatureCard from '@/components/FeatureCard';

interface Feature {
  id: number;
  title: string;
  description: string;
  bgColor: string;
  iconType: 'building' | 'book' | 'calendar' | 'user' | 'image' | 'chart';
  link?: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  const router = useRouter();

  const handleFeatureClick = (link?: string) => {
    if (link) {
      if (link.startsWith('#')) {
        // Smooth scroll to section
        const element = document.getElementById(link.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to page using Next.js router
        router.push(link);
      }
    }
  };

  return (
    <section id="fitur" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Fitur-Fitur <span className="text-yellow-400">Website</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Akses mudah ke berbagai informasi dan layanan digital Nagari yang dirancang khusus untuk memudahkan masyarakat
          </p>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              iconType={feature.iconType}
              bgColor={feature.bgColor}
              onClick={() => handleFeatureClick(feature.link)}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 