'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  UserGroupIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  DocumentTextIcon,
  PhotoIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-yellow-400">
                Admin Panel - Nagari Lima Koto
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
              >
                <HomeIcon className="w-5 h-5" />
                <span>Ke Website</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Dashboard</h2>
          <p className="text-gray-400">
            Kelola konten website Nagari Lima Koto
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <UserGroupIcon className="w-8 h-8 text-blue-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Pejabat</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <QuestionMarkCircleIcon className="w-8 h-8 text-green-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total FAQ</p>
                <p className="text-2xl font-bold text-white">8</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <DocumentTextIcon className="w-8 h-8 text-yellow-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Berita</p>
                <p className="text-2xl font-bold text-white">15</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <MapPinIcon className="w-8 h-8 text-purple-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Jorong</p>
                <p className="text-2xl font-bold text-white">8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Struktur Pemerintahan */}
          <Link href="/admin/struktur">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
              <div className="flex items-center mb-4">
                <UserGroupIcon className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-semibold text-white ml-3">
                  Struktur Pemerintahan
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                Kelola data pejabat, foto, jabatan, dan deskripsi
              </p>
              <div className="flex items-center text-blue-400">
                <span className="text-sm font-medium">Kelola Sekarang</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* FAQ Management */}
          <Link href="/admin/faq">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
              <div className="flex items-center mb-4">
                <QuestionMarkCircleIcon className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-semibold text-white ml-3">
                  FAQ Management
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                Kelola pertanyaan, kategori, dan jawaban FAQ
              </p>
              <div className="flex items-center text-green-400">
                <span className="text-sm font-medium">Kelola Sekarang</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Kelola Jorong */}
          <Link href="/admin/jorong">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
              <div className="flex items-center mb-4">
                <MapPinIcon className="w-8 h-8 text-purple-400" />
                <h3 className="text-xl font-semibold text-white ml-3">
                  Kelola Jorong
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                Kelola data jorong, koordinat, fasilitas, dan informasi wilayah
              </p>
              <div className="flex items-center text-purple-400">
                <span className="text-sm font-medium">Kelola Sekarang</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Coming Soon Cards */}
          <div className="bg-gray-800 rounded-lg p-6 opacity-50">
            <div className="flex items-center mb-4">
              <DocumentTextIcon className="w-8 h-8 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-400 ml-3">
                Berita (Coming Soon)
              </h3>
            </div>
            <p className="text-gray-500 mb-4">
              Kelola berita dan artikel
            </p>
            <div className="flex items-center text-gray-500">
              <span className="text-sm font-medium">Segera Hadir</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 opacity-50">
            <div className="flex items-center mb-4">
              <PhotoIcon className="w-8 h-8 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-400 ml-3">
                Galeri (Coming Soon)
              </h3>
            </div>
            <p className="text-gray-500 mb-4">
              Kelola galeri dan foto
            </p>
            <div className="flex items-center text-gray-500">
              <span className="text-sm font-medium">Segera Hadir</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 opacity-50">
            <div className="flex items-center mb-4">
              <DocumentTextIcon className="w-8 h-8 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-400 ml-3">
                Layanan (Coming Soon)
              </h3>
            </div>
            <p className="text-gray-500 mb-4">
              Kelola layanan masyarakat
            </p>
            <div className="flex items-center text-gray-500">
              <span className="text-sm font-medium">Segera Hadir</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
