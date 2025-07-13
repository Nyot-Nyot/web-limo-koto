import { useState, useEffect, useCallback } from 'react';
import { kepalaJorongData, sekretarisData, waliNagariData } from '@/data/pejabat';
import { faqData as defaultFaqData } from '@/data/faq';
import { featuresData } from '@/data/features';
import { mockNewsData } from '@/data/newsData';

interface PejabatData {
  id: string;
  name: string;
  title: string;
  image: string;
  jorong?: string;
  description: string;
}

interface FAQData {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface HomeData {
  pejabat: PejabatData[];
  faq: FAQData[];
  features: any[];
  news: any[];
}

export const useHomeData = () => {
  const [data, setData] = useState<HomeData>({
    pejabat: [],
    faq: [],
    features: featuresData,
    news: mockNewsData
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoized data loading function
  const loadData = useCallback(() => {
    try {
      setLoading(true);
      setError(null);

      // Load Pejabat data with fallback
      const savedPejabat = localStorage.getItem('pejabatData');
      const pejabatData = savedPejabat ? 
        JSON.parse(savedPejabat) : 
        [waliNagariData, ...kepalaJorongData, ...sekretarisData];

      // Load FAQ data with fallback
      const savedFaq = localStorage.getItem('faqData');
      const faqData = savedFaq ? 
        JSON.parse(savedFaq) : 
        defaultFaqData;

      setData({
        pejabat: pejabatData,
        faq: faqData,
        features: featuresData,
        news: mockNewsData
      });
    } catch (err) {
      console.error('Error loading home data:', err);
      setError('Terjadi kesalahan saat memuat data');
      // Fallback to default data
      setData({
        pejabat: [waliNagariData, ...kepalaJorongData, ...sekretarisData],
        faq: defaultFaqData,
        features: featuresData,
        news: mockNewsData
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Listen for data updates
  useEffect(() => {
    loadData();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pejabatData' || e.key === 'faqData') {
        loadData();
      }
    };

    const handleCustomUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.type === 'pejabat' || customEvent.detail?.type === 'faq') {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('dataUpdated', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('dataUpdated', handleCustomUpdate);
    };
  }, [loadData]);

  return {
    data,
    loading,
    error,
    reloadData: loadData
  };
}; 