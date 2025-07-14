'use client';

import { memo, lazy, Suspense, useEffect } from 'react';
import { type Section } from './constants';
import { ProfilErrorBoundary } from './ErrorBoundary';
import { usePerformanceMonitor } from './performanceHooks';

// Lazy load components for better performance
const ProfilSingkat = lazy(() => 
  import('./ProfilSingkatOptimized').then(module => ({
    default: module.default
  }))
);
const VisiMisi = lazy(() => 
  import('./VisiMisi').then(module => ({
    default: module.default
  }))
);
const InformasiJorong = lazy(() => 
  import('./Jorong').then(module => ({
    default: module.default
  }))
);
const Galeri = lazy(() => 
  import('./Galeri').then(module => ({
    default: module.default
  }))
);

// Enhanced loading component with skeleton
const SectionLoading = memo(() => (
  <div className="flex items-center justify-center py-24">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded w-48 mx-auto animate-pulse"></div>
        <div className="h-3 bg-white/10 rounded w-32 mx-auto animate-pulse"></div>
      </div>
    </div>
  </div>
));

SectionLoading.displayName = 'SectionLoading';

// Enhanced section wrapper with performance monitoring
interface SectionWrapperProps {
  id: string;
  sectionsRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  children: React.ReactNode;
  title: string;
}

const SectionWrapper = memo(({ id, sectionsRef, children, title }: SectionWrapperProps) => {
  const { startRender, endRender } = usePerformanceMonitor(`Section-${title}`);

  useEffect(() => {
    startRender();
    return () => endRender();
  }, [startRender, endRender]);

  return (
    <section
      ref={(el) => {
        sectionsRef.current[id] = el as HTMLDivElement;
      }}
      data-section={id}
      className="min-h-screen flex items-center justify-center w-full"
      aria-label={`Bagian ${title}`}
      role="region"
    >
      <div className="w-full max-w-7xl mx-auto">
        <ProfilErrorBoundary>
          {children}
        </ProfilErrorBoundary>
      </div>
    </section>
  );
});

SectionWrapper.displayName = 'SectionWrapper';

// Component map for better organization
const COMPONENT_MAP = {
  '01': ProfilSingkat,
  '02': VisiMisi,
  '03': InformasiJorong,
  '04': Galeri,
} as const;

interface ProfilContentProps {
  sections: Section[];
  sectionsRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}

export const ProfilContent = memo(({ sections, sectionsRef }: ProfilContentProps) => {
  return (
    <main className="relative z-10" role="main">
      <div className="pl-14 pr-4 md:pl-8 md:pr-8 lg:px-12 xl:px-16">
        {sections.map((section) => {
          const Component = COMPONENT_MAP[section.id as keyof typeof COMPONENT_MAP];
          
          if (!Component) {
            console.warn(`No component found for section ${section.id}`);
            return null;
          }

          return (
            <SectionWrapper
              key={section.id}
              id={section.id}
              sectionsRef={sectionsRef}
              title={section.title}
            >
              <Suspense fallback={<SectionLoading />}>
                <Component />
              </Suspense>
            </SectionWrapper>
          );
        })}
      </div>
    </main>
  );
});

ProfilContent.displayName = 'ProfilContent';
