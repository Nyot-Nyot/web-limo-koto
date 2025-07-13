'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCommentDots, FaTrash, FaEye, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import NotificationModal from '@/components/admin/NotificationModal';
import ConfirmationModal from '@/components/admin/ConfirmationModal';

interface FeedbackData {
  id: string;
  message: string;
  timestamp: Timestamp;
  userIdentifier: string;
  userAgent?: string;
  ipAddress?: string;
}

interface Stats {
  total: number;
  today: number;
  week: number;
}

export default function AdminFeedbackPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);
  const [filteredData, setFilteredData] = useState<FeedbackData[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    today: 0,
    week: 0
  });
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  
  // Modal states
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackData | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    show: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ show: false, title: '', message: '', onConfirm: () => {} });
  const [notifModal, setNotifModal] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'warning';
    message: string;
  }>({ show: false, type: 'success', message: '' });

  const router = useRouter();

  // Authentication check
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth !== 'true') {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

  // Fetch feedback data
  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(
      collection(db, 'feedback'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const feedback: FeedbackData[] = [];
      querySnapshot.forEach((doc) => {
        feedback.push({
          id: doc.id,
          ...doc.data()
        } as FeedbackData);
      });
      
      setFeedbackData(feedback);
      calculateStats(feedback);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching feedback:', error);
      setNotifModal({
        show: true,
        type: 'error',
        message: 'Gagal memuat data feedback'
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  // Calculate statistics
  const calculateStats = (data: FeedbackData[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const total = data.length;
    
    const todayCount = data.filter(item => 
      item.timestamp.toDate() >= today
    ).length;
    
    const weekCount = data.filter(item => 
      item.timestamp.toDate() >= weekAgo
    ).length;

    setStats({
      total,
      today: todayCount,
      week: weekCount
    });
  };

  // Filter data
  useEffect(() => {
    let filtered = [...feedbackData];

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(item =>
        item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.userIdentifier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      let startDate: Date;

      switch (dateFilter) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        default:
          startDate = new Date(0);
      }

      filtered = filtered.filter(item => item.timestamp.toDate() >= startDate);
    }

    setFilteredData(filtered);
  }, [feedbackData, searchTerm, dateFilter]);

  // Handle delete feedback
  const handleDelete = async (feedback: FeedbackData) => {
    setConfirmModal({
      show: true,
      title: 'Hapus Feedback',
      message: `Apakah Anda yakin ingin menghapus feedback ini?`,
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'feedback', feedback.id));
          setNotifModal({
            show: true,
            type: 'success',
            message: 'Feedback berhasil dihapus'
          });
        } catch (error) {
          console.error('Error deleting feedback:', error);
          setNotifModal({
            show: true,
            type: 'error',
            message: 'Gagal menghapus feedback'
          });
        } finally {
          setConfirmModal({ show: false, title: '', message: '', onConfirm: () => {} });
        }
      }
    });
  };

  // Handle view details
  const handleViewDetails = (feedback: FeedbackData) => {
    setSelectedFeedback(feedback);
    setShowDetailModal(true);
  };

  // Format date
  const formatDate = (timestamp: Timestamp) => {
    return timestamp.toDate().toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
        <div className="text-white">Memuat data feedback...</div>
      </div>
    );
  }

  return (
    <>
      <NotificationModal
        show={notifModal.show}
        type={notifModal.type}
        message={notifModal.message}
        onClose={() => setNotifModal(prev => ({ ...prev, show: false }))}
      />

      <ConfirmationModal
        show={confirmModal.show}
        type="delete"
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ show: false, title: '', message: '', onConfirm: () => {} })}
      />

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="bg-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <FaCommentDots className="w-8 h-8 text-purple-400" />
                <div>
                  <h1 className="text-xl font-bold">Kelola Feedback</h1>
                  <p className="text-sm text-gray-400">Masukan dan saran dari pengguna</p>
                </div>
              </div>
              <button
                onClick={() => router.push('/admin')}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Feedback</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
                <FaCommentDots className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Hari Ini</p>
                  <p className="text-2xl font-bold text-white">{stats.today}</p>
                </div>
                <FaCalendarAlt className="w-8 h-8 text-green-400" />
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Minggu Ini</p>
                  <p className="text-2xl font-bold text-white">{stats.week}</p>
                </div>
                <FaCalendarAlt className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Date Filter */}
              <div>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value as 'all' | 'today' | 'week' | 'month')}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">Semua Waktu</option>
                  <option value="today">Hari Ini</option>
                  <option value="week">Minggu Ini</option>
                  <option value="month">Bulan Ini</option>
                </select>
              </div>
            </div>
          </div>

          {/* Feedback List */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold">
                Daftar Feedback ({filteredData.length})
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Pesan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-gray-400">
                        <FaCommentDots className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                        <p>Tidak ada feedback ditemukan</p>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((feedback) => (
                      <tr key={feedback.id} className="hover:bg-gray-700/50">
                        <td className="px-6 py-4">
                          <div className="max-w-xs">
                            <p className="text-white text-sm line-clamp-2">
                              {feedback.message}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {formatDate(feedback.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewDetails(feedback)}
                              className="p-2 text-blue-400 hover:bg-gray-600 rounded-lg transition-colors"
                              title="Lihat Detail"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => handleDelete(feedback)}
                              className="p-2 text-red-400 hover:bg-gray-600 rounded-lg transition-colors"
                              title="Hapus"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
          <div className="bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Detail Feedback</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Pesan</label>
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-white whitespace-pre-wrap">{selectedFeedback.message}</p>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Tanggal & Waktu</label>
                  <p className="text-white">{formatDate(selectedFeedback.timestamp)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">User ID</label>
                  <p className="text-white font-mono text-sm">{selectedFeedback.userIdentifier}</p>
                </div>
              </div>

              {/* User Agent */}
              {selectedFeedback.userAgent && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Browser Info</label>
                  <p className="text-gray-300 text-sm font-mono bg-gray-700 rounded p-2 break-all">
                    {selectedFeedback.userAgent}
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => handleDelete(selectedFeedback)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Hapus Feedback
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
