'use client';

import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  UserGroupIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  DocumentTextIcon,
  PhotoIcon,
  MapPinIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

// Import default data for each module
import { allPejabat } from '@/data/pejabat';
import { faqData } from '@/data/faq';
import { mockNewsData, mockAgendaData } from '@/data/newsData';
import { defaultJorongData } from '@/data/jorong';
import { galeriData } from '@/data/galeri';

interface Counts {
  pejabat: number;
  faq: number;
  berita: number;
  jorong: number;
  galeri: number;
  agenda: number;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  // State for data counts
  const [counts, setCounts] = useState<Counts>({
    pejabat: 0,
    faq: 0,
    berita: 0,
    jorong: 0,
    galeri: 0,
    agenda: 0
  });

  // Memoized data fetching function
  const fetchDataCounts = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      
      // Initialize with default counts
      const countsData: Counts = {
        pejabat: 0,
        faq: 0,
        berita: 0,
        jorong: 0,
        galeri: 0,
        agenda: 0
      };
      
      // Try to get data from Firestore with proper error handling
      try {
        // Fetch FAQ data
        const faqSnapshot = await getDocs(collection(db, 'faq'));
        countsData.faq = faqSnapshot.docs.length;
      } catch (error) {
        console.warn('Error fetching FAQ data:', error);
        // Fall back to localStorage
        const faqItems = localStorage.getItem('faqData') ? 
          JSON.parse(localStorage.getItem('faqData')!) : 
          faqData;
        countsData.faq = faqItems.length;
      }
      
      // Fetch jorong data
      try {
        const jorongSnapshot = await getDocs(collection(db, 'jorong'));
        countsData.jorong = jorongSnapshot.docs.length;
      } catch (error) {
        console.warn('Error fetching jorong data:', error);
        // Fall back to localStorage
        const jorongItems = localStorage.getItem('jorongData') ? 
          JSON.parse(localStorage.getItem('jorongData')!) : 
          defaultJorongData;
        countsData.jorong = jorongItems.length;
      }
      
      // Fetch galeri data
      try {
        const galeriSnapshot = await getDocs(collection(db, 'galeri'));
        countsData.galeri = galeriSnapshot.docs.length;
      } catch (error) {
        console.warn('Error fetching galeri data:', error);
        // Fall back to localStorage
        const galeriItems = localStorage.getItem('galeriData') ? 
          JSON.parse(localStorage.getItem('galeriData')!) : 
          galeriData;
        countsData.galeri = galeriItems.length;
      }
      
      // Fetch agenda data
      try {
        const agendaSnapshot = await getDocs(collection(db, 'agenda'));
        countsData.agenda = agendaSnapshot.docs.length;
      } catch (error) {
        console.warn('Error fetching agenda data:', error);
        // Fall back to localStorage
        const agendaItems = localStorage.getItem('agendaData') ? 
          JSON.parse(localStorage.getItem('agendaData')!) : 
          mockAgendaData;
        countsData.agenda = agendaItems.length;
      }
      
      // For modules not yet migrated to Firestore, use localStorage
      // Pejabat data
      const pejabatData = localStorage.getItem('pejabatData') ? 
        JSON.parse(localStorage.getItem('pejabatData')!) : 
        allPejabat;
      countsData.pejabat = pejabatData.length;
      
      // News data
      const newsItems = localStorage.getItem('newsData') ? 
        JSON.parse(localStorage.getItem('newsData')!) : 
        mockNewsData;
      countsData.berita = newsItems.length;
      
      setCounts(countsData);
      setLoading(false);
    } catch (error) {
      console.error('Error in fetchDataCounts:', error);
      setError('Terjadi kesalahan saat memuat data. Menggunakan data lokal sebagai fallback.');
      
      // Fall back to default counts from localStorage
      const pejabatData = localStorage.getItem('pejabatData') ? JSON.parse(localStorage.getItem('pejabatData')!) : allPejabat;
      const faqItems = localStorage.getItem('faqData') ? JSON.parse(localStorage.getItem('faqData')!) : faqData;
      const newsItems = localStorage.getItem('newsData') ? JSON.parse(localStorage.getItem('newsData')!) : mockNewsData;
      const jorongItems = localStorage.getItem('jorongData') ? JSON.parse(localStorage.getItem('jorongData')!) : defaultJorongData;
      const galeriItems = localStorage.getItem('galeriData') ? JSON.parse(localStorage.getItem('galeriData')!) : galeriData;
      const agendaItems = localStorage.getItem('agendaData') ? JSON.parse(localStorage.getItem('agendaData')!) : mockAgendaData;
      
      // Update counts
      setCounts({
        pejabat: pejabatData.length,
        faq: faqItems.length,
        berita: newsItems.length,
        jorong: jorongItems.length,
        galeri: galeriItems.length,
        agenda: agendaItems.length
      });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth !== 'true') {
      router.push('/admin/login');
      return;
    }
    
    setIsAuthenticated(true);
    
    // Create a flag to prevent state updates after component unmounts
    let isMounted = true;
    
    fetchDataCounts();
    
    // Listen for dataUpdated events from other admin pages
    const handleDataUpdated = (event: CustomEvent) => {
      if (event.detail && event.detail.type) {
        console.log(`Data updated for: ${event.detail.type}`);
        // Re-fetch counts when data is updated elsewhere
        if (isMounted) {
          fetchDataCounts();
        }
      }
    };
    
    // Add event listener for data updates
    window.addEventListener('dataUpdated', handleDataUpdated as EventListener);
    
    // Cleanup function to prevent state updates after unmounting
    return () => {
      isMounted = false;
      window.removeEventListener('dataUpdated', handleDataUpdated as EventListener);
    };
  }, [router, fetchDataCounts]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p>Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <HomeIcon className="w-5 h-5" />
                <span>Kembali ke Website</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-md mx-4 mt-4">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pejabat Card */}
          <Link
            href="/admin/struktur"
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Pejabat</h3>
                <p className="text-gray-400 text-sm">Struktur pemerintahan</p>
              </div>
              <UserGroupIcon className="w-8 h-8 text-blue-400" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-white">{counts.pejabat}</span>
              <span className="text-gray-400 text-sm ml-2">data</span>
            </div>
          </Link>

          {/* FAQ Card */}
          <Link
            href="/admin/faq"
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">FAQ</h3>
                <p className="text-gray-400 text-sm">Pertanyaan umum</p>
              </div>
              <QuestionMarkCircleIcon className="w-8 h-8 text-green-400" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-white">{counts.faq}</span>
              <span className="text-gray-400 text-sm ml-2">data</span>
            </div>
          </Link>

          {/* Berita Card */}
          <Link
            href="/admin/berita"
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Berita</h3>
                <p className="text-gray-400 text-sm">Artikel dan informasi</p>
              </div>
              <DocumentTextIcon className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-white">{counts.berita}</span>
              <span className="text-gray-400 text-sm ml-2">data</span>
            </div>
          </Link>

          {/* Jorong Card */}
          <Link
            href="/admin/jorong"
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Jorong</h3>
                <p className="text-gray-400 text-sm">Data wilayah</p>
              </div>
              <MapPinIcon className="w-8 h-8 text-purple-400" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-white">{counts.jorong}</span>
              <span className="text-gray-400 text-sm ml-2">data</span>
            </div>
          </Link>

          {/* Galeri Card */}
          <Link
            href="/admin/galeri"
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Galeri</h3>
                <p className="text-gray-400 text-sm">Foto dan dokumentasi</p>
              </div>
              <PhotoIcon className="w-8 h-8 text-pink-400" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-white">{counts.galeri}</span>
              <span className="text-gray-400 text-sm ml-2">data</span>
            </div>
          </Link>

          {/* Agenda Card */}
          <Link
            href="/admin/agenda"
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Agenda</h3>
                <p className="text-gray-400 text-sm">Jadwal kegiatan</p>
              </div>
              <CalendarIcon className="w-8 h-8 text-orange-400" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-white">{counts.agenda}</span>
              <span className="text-gray-400 text-sm ml-2">data</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
