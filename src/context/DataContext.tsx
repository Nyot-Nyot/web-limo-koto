'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Import default data
import { allPejabat } from '@/data/pejabat';
import { faqData as defaultFaqData } from '@/data/faq';
import { mockNewsData, mockAgendaData } from '@/data/newsData';
import { defaultJorongData } from '@/data/jorong';
import { galeriData } from '@/data/galeri';

// Type definitions
interface PejabatData {
  id: string | number;
  name: string;
  title: string;
  image: string;
  jorong?: string;
  description: string;
}

interface FAQData {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface NewsData {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
  author?: string;
  category?: string;
}

interface JorongData {
  id: string;
  name: string;
  population: string;
  area: string;
  coordinates: { lat: number; lng: number };
  color: string;
  description: string;
  facilities: string[];
}

interface GalleryData {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
}

interface DataContextType {
  // Data states
  newsData: NewsData[];
  pejabatData: PejabatData[];
  faqData: FAQData[];
  jorongData: JorongData[];
  galleryData: GalleryData[];
  agendaData: NewsData[];
  
  // Loading states
  isLoading: boolean;
  
  // Methods
  refreshData: () => Promise<void>;
  refreshSpecificData: (dataType: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  // State untuk semua data
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [pejabatData, setPejabatData] = useState<PejabatData[]>([]);
  const [faqData, setFaqData] = useState<FAQData[]>([]);
  const [jorongData, setJorongData] = useState<JorongData[]>([]);
  const [galleryData, setGalleryData] = useState<GalleryData[]>([]);
  const [agendaData, setAgendaData] = useState<NewsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Individual fetch functions
  const fetchNewsData = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'berita'));
      if (snapshot.docs.length > 0) {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as NewsData[];
        setNewsData(data);
        localStorage.setItem('newsData', JSON.stringify(data));
      } else {
        // Use default data if Firestore is empty
        const savedData = localStorage.getItem('newsData');
        const defaultData = savedData ? JSON.parse(savedData) : mockNewsData;
        setNewsData(defaultData);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      // Fallback to localStorage or default data
      const savedData = localStorage.getItem('newsData');
      const fallbackData = savedData ? JSON.parse(savedData) : mockNewsData;
      setNewsData(fallbackData);
    }
  }, []);

  const fetchPejabatData = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'pejabat'));
      if (snapshot.docs.length > 0) {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as PejabatData[];
        setPejabatData(data);
        localStorage.setItem('pejabatData', JSON.stringify(data));
      } else {
        // Use default data if Firestore is empty
        const savedData = localStorage.getItem('pejabatData');
        const defaultData = savedData ? JSON.parse(savedData) : allPejabat;
        setPejabatData(defaultData);
      }
    } catch (error) {
      console.error('Error fetching pejabat:', error);
      // Fallback to localStorage or default data
      const savedData = localStorage.getItem('pejabatData');
      const fallbackData = savedData ? JSON.parse(savedData) : allPejabat;
      setPejabatData(fallbackData);
    }
  }, []);

  const fetchFaqData = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'faq'));
      if (snapshot.docs.length > 0) {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as FAQData[];
        setFaqData(data);
        localStorage.setItem('faqData', JSON.stringify(data));
      } else {
        // Use default data if Firestore is empty
        const savedData = localStorage.getItem('faqData');
        const defaultData = savedData ? JSON.parse(savedData) : defaultFaqData;
        setFaqData(defaultData);
      }
    } catch (error) {
      console.error('Error fetching FAQ:', error);
      // Fallback to localStorage or default data
      const savedData = localStorage.getItem('faqData');
      const fallbackData = savedData ? JSON.parse(savedData) : defaultFaqData;
      setFaqData(fallbackData);
    }
  }, []);

  const fetchJorongData = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'jorong'));
      if (snapshot.docs.length > 0) {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as JorongData[];
        setJorongData(data);
        localStorage.setItem('jorongData', JSON.stringify(data));
      } else {
        // Use default data if Firestore is empty
        const savedData = localStorage.getItem('jorongData');
        const defaultData = savedData ? JSON.parse(savedData) : defaultJorongData;
        setJorongData(defaultData);
      }
    } catch (error) {
      console.error('Error fetching jorong:', error);
      // Fallback to localStorage or default data
      const savedData = localStorage.getItem('jorongData');
      const fallbackData = savedData ? JSON.parse(savedData) : defaultJorongData;
      setJorongData(fallbackData);
    }
  }, []);

  const fetchGalleryData = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'galeri'));
      if (snapshot.docs.length > 0) {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as GalleryData[];
        setGalleryData(data);
        localStorage.setItem('galeriData', JSON.stringify(data));
      } else {
        // Use default data if Firestore is empty
        const savedData = localStorage.getItem('galeriData');
        const defaultData = savedData ? JSON.parse(savedData) : galeriData;
        setGalleryData(defaultData);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
      // Fallback to localStorage or default data
      const savedData = localStorage.getItem('galeriData');
      const fallbackData = savedData ? JSON.parse(savedData) : galeriData;
      setGalleryData(fallbackData);
    }
  }, []);

  const fetchAgendaData = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'agenda'));
      if (snapshot.docs.length > 0) {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as NewsData[];
        setAgendaData(data);
        localStorage.setItem('agendaData', JSON.stringify(data));
      } else {
        // Use default data if Firestore is empty
        const savedData = localStorage.getItem('agendaData');
        const defaultData = savedData ? JSON.parse(savedData) : mockAgendaData;
        setAgendaData(defaultData);
      }
    } catch (error) {
      console.error('Error fetching agenda:', error);
      // Fallback to localStorage or default data
      const savedData = localStorage.getItem('agendaData');
      const fallbackData = savedData ? JSON.parse(savedData) : mockAgendaData;
      setAgendaData(fallbackData);
    }
  }, []);

  // Fetch all data function
  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchNewsData(),
        fetchPejabatData(),
        fetchFaqData(),
        fetchJorongData(),
        fetchGalleryData(),
        fetchAgendaData()
      ]);
    } catch (error) {
      console.error('Error fetching all data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchNewsData, fetchPejabatData, fetchFaqData, fetchJorongData, fetchGalleryData, fetchAgendaData]);

  // Fetch specific data type
  const refreshSpecificData = useCallback(async (dataType: string) => {
    try {
      switch (dataType) {
        case 'news':
        case 'berita':
          await fetchNewsData();
          break;
        case 'pejabat':
          await fetchPejabatData();
          break;
        case 'faq':
          await fetchFaqData();
          break;
        case 'jorong':
          await fetchJorongData();
          break;
        case 'galeri':
          await fetchGalleryData();
          break;
        case 'agenda':
          await fetchAgendaData();
          break;
      }
    } catch (error) {
      console.error(`Error refreshing ${dataType} data:`, error);
    }
  }, [fetchNewsData, fetchPejabatData, fetchFaqData, fetchJorongData, fetchGalleryData, fetchAgendaData]);

  // Initial data load
  useEffect(() => {
    // Load data immediately
    fetchAllData();
    
    // Set interval untuk refresh otomatis (setiap 10 menit)
    const interval = setInterval(fetchAllData, 10 * 60 * 1000);
    
    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.newValue) {
        try {
          const parsedData = JSON.parse(e.newValue);
          switch (e.key) {
            case 'newsData':
              setNewsData(parsedData);
              break;
            case 'pejabatData':
              setPejabatData(parsedData);
              break;
            case 'faqData':
              setFaqData(parsedData);
              break;
            case 'jorongData':
              setJorongData(parsedData);
              break;
            case 'galeriData':
              setGalleryData(parsedData);
              break;
            case 'agendaData':
              setAgendaData(parsedData);
              break;
          }
        } catch (error) {
          console.error(`Error parsing ${e.key} from localStorage:`, error);
        }
      }
    };

    // Listen for custom events from admin pages
    const handleCustomUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.type) {
        refreshSpecificData(customEvent.detail.type);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('dataUpdated', handleCustomUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('dataUpdated', handleCustomUpdate);
    };
  }, [fetchAllData, refreshSpecificData]);

  const contextValue: DataContextType = {
    // Data
    newsData,
    pejabatData,
    faqData,
    jorongData,
    galleryData,
    agendaData,
    
    // Loading state
    isLoading,
    
    // Methods
    refreshData: fetchAllData,
    refreshSpecificData
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}

// Custom hook untuk menggunakan data context
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

// Export individual hooks untuk penggunaan spesifik
export function useNewsData() {
  const { newsData, isLoading, refreshSpecificData } = useData();
  return { 
    data: newsData, 
    isLoading, 
    refresh: () => refreshSpecificData('news') 
  };
}

export function usePejabatData() {
  const { pejabatData, isLoading, refreshSpecificData } = useData();
  return { 
    data: pejabatData, 
    isLoading, 
    refresh: () => refreshSpecificData('pejabat') 
  };
}

export function useFaqData() {
  const { faqData, isLoading, refreshSpecificData } = useData();
  return { 
    data: faqData, 
    isLoading, 
    refresh: () => refreshSpecificData('faq') 
  };
}

export function useJorongData() {
  const { jorongData, isLoading, refreshSpecificData } = useData();
  return { 
    data: jorongData, 
    isLoading, 
    refresh: () => refreshSpecificData('jorong') 
  };
}

export function useGalleryData() {
  const { galleryData, isLoading, refreshSpecificData } = useData();
  return { 
    data: galleryData, 
    isLoading, 
    refresh: () => refreshSpecificData('galeri') 
  };
}

export function useAgendaData() {
  const { agendaData, isLoading, refreshSpecificData } = useData();
  return { 
    data: agendaData, 
    isLoading, 
    refresh: () => refreshSpecificData('agenda') 
  };
}