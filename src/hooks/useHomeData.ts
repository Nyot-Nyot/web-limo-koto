import useSWR from 'swr';
import { featuresData } from '@/data/features';
import { allPejabat } from '@/data/pejabat';
import { mockNewsData } from '@/data/newsData';
import { faqData } from '@/data/faq';

// Fetcher function untuk SWR
const fetcher = async (url: string) => {
  try {
    console.log('Fetching data from:', url);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Successfully fetched data from API:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    
    // Fallback ke localStorage jika ada
    if (typeof window !== 'undefined') {
      const cachedData = localStorage.getItem('homeData');
      if (cachedData) {
        try {
          console.log('Using cached data from localStorage');
          return JSON.parse(cachedData);
        } catch (parseError) {
          console.warn('Error parsing cached data:', parseError);
        }
      }
    }
    
    // Return default data sebagai fallback terakhir
    console.log('Using default local data as fallback');
    return {
      features: featuresData,
      pejabat: allPejabat,
      news: mockNewsData,
      faq: faqData
    };
  }
};

export function useHomeData() {
  const { data, error, isLoading, mutate } = useSWR('/api/home', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // 1 menit
    errorRetryCount: 3,
    errorRetryInterval: 1000,
    onSuccess: (data) => {
      // Cache data ke localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('homeData', JSON.stringify(data));
          console.log('Cached data to localStorage');
        } catch (error) {
          console.warn('Error caching data:', error);
        }
      }
    },
    onError: (error) => {
      console.error('Error fetching home data:', error);
    }
  });

  // Fallback ke default data jika error
  const fallbackData = {
    features: featuresData,
    pejabat: allPejabat,
    news: mockNewsData,
    faq: faqData
  };

  return {
    data: data || fallbackData,
    loading: isLoading,
    error: error ? 'Gagal memuat data. Menggunakan data lokal.' : null,
    mutate // Untuk manual refresh
  };
} 