'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc, query, orderBy, deleteDoc } from 'firebase/firestore';
import { sendSMSNotification, exportToExcel } from '@/lib/adminLayananUtils';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { 
  FaFileAlt, 
  FaDownload, 
  FaEye, 
  FaCheck, 
  FaTimes, 
  FaWhatsapp, 
  FaFilter, 
  FaSearch,
  FaRedo,
  FaFileExport,
  FaCog,
  FaCheckSquare,
  FaSpinner,
  FaTrash
} from 'react-icons/fa';
import { 
  MdPending, 
  MdApproval, 
  MdDone, 
  MdError,
  MdNotifications,
  MdNotificationsActive
} from 'react-icons/md';

// Types
interface PermohonanData {
  id: string;
  nomorPermohonan: string;
  namaPemohon: string;
  nik: string;
  jenisLayanan: string;
  tanggalPengajuan: Date;
  status: 'pending' | 'approved' | 'selesai' | 'ditolak';
  nomorHP: string;
  data: {
    alamat?: string;
    agama?: string;
    pekerjaan?: string;
    [key: string]: unknown;
  };
  catatan?: string;
  alasanTolak?: string;
  timeline: {
    diajukan: Date;
    direview?: Date;
    disetujui?: Date;
    selesai?: Date;
  };
  notifikasi: {
    terkirim: boolean;
    tanggal?: Date;
    error?: string;
  };
}

interface QuickStats {
  totalHariIni: number;
  pending: number;
  approved: number;
  selesaiHariIni: number;
  notifikasiGagal: number;
}

export default function AdminLayananPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [permohonanData, setPermohonanData] = useState<PermohonanData[]>([]);
  const [filteredData, setFilteredData] = useState<PermohonanData[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [quickStats, setQuickStats] = useState<QuickStats>({
    totalHariIni: 0,
    pending: 0,
    approved: 0,
    selesaiHariIni: 0,
    notifikasiGagal: 0
  });

  // Filter states
  const [activeTab, setActiveTab] = useState<'semua' | 'pending' | 'approved' | 'selesai' | 'ditolak'>('semua');
  const [jenisLayananFilter, setJenisLayananFilter] = useState<string>('semua');
  const [tanggalFilter, setTanggalFilter] = useState<string>('semua');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Modal states
  const [selectedPermohonan, setSelectedPermohonan] = useState<PermohonanData | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  
  // Loading states
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  
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

  // Fetch data on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchPermohonanData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh || !isAuthenticated) return;

    const interval = setInterval(() => {
      fetchPermohonanData();
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefresh, refreshInterval, isAuthenticated]);

  // Fetch data from Firestore
  const fetchPermohonanData = useCallback(async () => {
    try {
      setLoading(true);
      const permohonanCollection = collection(db, 'permohonan_layanan');
      const q = query(permohonanCollection, orderBy('tanggalPengajuan', 'desc'));
      const snapshot = await getDocs(q);
      
      const data: PermohonanData[] = snapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          id: doc.id,
          nomorPermohonan: docData.nomorPermohonan || generateNomorPermohonan(docData.jenisLayanan),
          namaPemohon: docData.namaPemohon || '',
          nik: docData.nik || '',
          jenisLayanan: docData.jenisLayanan || '',
          tanggalPengajuan: docData.tanggalPengajuan?.toDate() || new Date(),
          status: docData.status || 'pending',
          nomorHP: docData.nomorHP || '',
          data: docData.data || docData,
          catatan: docData.catatan || '',
          alasanTolak: docData.alasanTolak || '',
          timeline: {
            diajukan: docData.timeline?.diajukan?.toDate() || new Date(),
            direview: docData.timeline?.direview?.toDate(),
            disetujui: docData.timeline?.disetujui?.toDate(),
            selesai: docData.timeline?.selesai?.toDate()
          },
          notifikasi: {
            terkirim: docData.notifikasi?.terkirim || false,
            tanggal: docData.notifikasi?.tanggal?.toDate(),
            error: docData.notifikasi?.error || ''
          }
        };
      });

      setPermohonanData(data);
      calculateQuickStats(data);
    } catch (error) {
      console.error('Error fetching permohonan data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Generate nomor permohonan
  const generateNomorPermohonan = (jenisLayanan: string) => {
    const prefix = jenisLayanan.substring(0, 3).toUpperCase();
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${year}-${random}`;
  };

  // Calculate quick stats
  const calculateQuickStats = (data: PermohonanData[]) => {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const stats: QuickStats = {
      totalHariIni: data.filter(item => item.tanggalPengajuan >= todayStart).length,
      pending: data.filter(item => item.status === 'pending').length,
      approved: data.filter(item => item.status === 'approved').length,
      selesaiHariIni: data.filter(item => 
        item.status === 'selesai' && 
        item.timeline.selesai && 
        item.timeline.selesai >= todayStart
      ).length,
      notifikasiGagal: data.filter(item => 
        item.notifikasi.error && !item.notifikasi.terkirim
      ).length
    };
    
    setQuickStats(stats);
  };

  // Filter data based on active filters
  useEffect(() => {
    let filtered = [...permohonanData];

    // Filter by tab
    if (activeTab !== 'semua') {
      filtered = filtered.filter(item => item.status === activeTab);
    }

    // Filter by jenis layanan
    if (jenisLayananFilter !== 'semua') {
      filtered = filtered.filter(item => item.jenisLayanan === jenisLayananFilter);
    }

    // Filter by tanggal
    if (tanggalFilter !== 'semua') {
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      switch (tanggalFilter) {
        case 'hari_ini':
          filtered = filtered.filter(item => item.tanggalPengajuan >= todayStart);
          break;
        case 'minggu_ini':
          const weekStart = new Date(todayStart);
          weekStart.setDate(weekStart.getDate() - weekStart.getDay());
          filtered = filtered.filter(item => item.tanggalPengajuan >= weekStart);
          break;
        case 'bulan_ini':
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
          filtered = filtered.filter(item => item.tanggalPengajuan >= monthStart);
          break;
      }
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.namaPemohon.toLowerCase().includes(term) ||
        item.nik.includes(term) ||
        item.nomorHP.includes(term) ||
        item.nomorPermohonan.toLowerCase().includes(term)
      );
    }

    setFilteredData(filtered);
  }, [permohonanData, activeTab, jenisLayananFilter, tanggalFilter, searchTerm]);

  // Handle status update
  const handleStatusUpdate = async (id: string, newStatus: string, additionalData?: Record<string, unknown>) => {
    try {
      setActionLoading(id);
      const docRef = doc(db, 'permohonan_layanan', id);
      const updateData = { 
        status: newStatus,
        [`timeline.${newStatus}`]: new Date()
      };
      
      if (additionalData) {
        Object.assign(updateData, additionalData);
      }
      
      await updateDoc(docRef, updateData);
      
      // Update local state
      setPermohonanData(prev => prev.map(item => 
        item.id === id 
          ? { 
              ...item, 
              status: newStatus as 'pending' | 'approved' | 'selesai' | 'ditolak',
              timeline: {
                ...item.timeline,
                [newStatus]: new Date()
              },
              ...additionalData
            }
          : item
      ));
      
      await fetchPermohonanData(); // Refresh data
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setActionLoading(null);
    }
  };

  // Handle bulk download
  const handleBulkDownload = async () => {
    try {
      const selectedData = permohonanData.filter(item => selectedItems.includes(item.id));
      
      // Create a zip file with all documents
      for (const permohonan of selectedData) {
        await handleDownload(permohonan);
      }
      
      alert(`${selectedData.length} dokumen berhasil diunduh`);
    } catch (error) {
      console.error('Error in bulk download:', error);
      alert('Gagal mengunduh beberapa dokumen');
    }
  };

  // Handle bulk notification
  const handleBulkNotification = async () => {
    try {
      const selectedData = permohonanData.filter(item => selectedItems.includes(item.id));
      let successCount = 0;
      
      for (const permohonan of selectedData) {
        try {
          await handleSendNotification(permohonan);
          successCount++;
        } catch (error) {
          console.error(`Failed to send notification for ${permohonan.nomorPermohonan}:`, error);
        }
      }
      
      alert(`${successCount}/${selectedData.length} notifikasi berhasil dikirim`);
    } catch (error) {
      console.error('Error in bulk notification:', error);
      alert('Gagal mengirim notifikasi');
    }
  };

  // Handle export data
  const handleExportData = async () => {
    try {
      const selectedData = permohonanData.filter(item => selectedItems.includes(item.id));
      const success = exportToExcel(selectedData, `permohonan-layanan-${new Date().toISOString().split('T')[0]}.xlsx`);
      
      if (success) {
        alert('Data berhasil diekspor ke Excel');
      } else {
        throw new Error('Export failed');
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Gagal mengekspor data');
    }
  };

  // Handle delete completed data
  const handleDeleteCompleted = async (id: string) => {
    try {
      const permohonan = permohonanData.find(item => item.id === id);
      
      if (!permohonan) {
        alert('Data tidak ditemukan');
        return;
      }

      if (permohonan.status !== 'selesai') {
        alert('Hanya data yang sudah selesai yang dapat dihapus');
        return;
      }

      const confirmDelete = confirm(
        `Apakah Anda yakin ingin menghapus data permohonan ${permohonan.nomorPermohonan}?\n\n` +
        `Nama: ${permohonan.namaPemohon}\n` +
        `Jenis Layanan: ${permohonan.jenisLayanan}\n\n` +
        `Data yang dihapus tidak dapat dikembalikan!`
      );

      if (!confirmDelete) return;

      setActionLoading(id);
      
      // Delete from Firestore
      const docRef = doc(db, 'permohonan_layanan', id);
      await deleteDoc(docRef);
      
      // Update local state
      setPermohonanData(prev => prev.filter(item => item.id !== id));
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
      
      alert(`Data permohonan ${permohonan.nomorPermohonan} berhasil dihapus`);
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Gagal menghapus data');
    } finally {
      setActionLoading(null);
    }
  };

  // Handle bulk delete completed data
  const handleBulkDeleteCompleted = async () => {
    try {
      const selectedData = permohonanData.filter(item => selectedItems.includes(item.id));
      const completedData = selectedData.filter(item => item.status === 'selesai');
      
      if (completedData.length === 0) {
        alert('Tidak ada data yang sudah selesai untuk dihapus');
        return;
      }

      if (completedData.length < selectedData.length) {
        alert(`Hanya ${completedData.length} dari ${selectedData.length} data yang dapat dihapus (hanya yang sudah selesai)`);
      }

      const confirmDelete = confirm(
        `Apakah Anda yakin ingin menghapus ${completedData.length} data yang sudah selesai?\n\n` +
        `Data yang dihapus tidak dapat dikembalikan!`
      );

      if (!confirmDelete) return;

      let successCount = 0;
      for (const item of completedData) {
        try {
          setActionLoading(item.id);
          const docRef = doc(db, 'permohonan_layanan', item.id);
          await deleteDoc(docRef);
          successCount++;
        } catch (error) {
          console.error(`Failed to delete ${item.nomorPermohonan}:`, error);
        }
      }

      // Update local state
      const deletedIds = completedData.slice(0, successCount).map(item => item.id);
      setPermohonanData(prev => prev.filter(item => !deletedIds.includes(item.id)));
      setSelectedItems(prev => prev.filter(itemId => !deletedIds.includes(itemId)));
      
      alert(`${successCount}/${completedData.length} data berhasil dihapus`);
    } catch (error) {
      console.error('Error in bulk delete:', error);
      alert('Gagal menghapus data');
    } finally {
      setActionLoading(null);
    }
  };

  // Handle bulk actions
  const handleBulkAction = async (action: string) => {
    if (selectedItems.length === 0) return;
    
    try {
      setActionLoading('bulk');
      
      switch (action) {
        case 'approve':
          await Promise.all(
            selectedItems.map(id => handleStatusUpdate(id, 'approved'))
          );
          break;
        case 'download':
          // Handle bulk download
          await handleBulkDownload();
          break;
        case 'notify':
          // Handle bulk notification
          await handleBulkNotification();
          break;
        case 'export':
          // Handle export to Excel
          await handleExportData();
          break;
        case 'delete':
          // Handle bulk delete completed data
          await handleBulkDeleteCompleted();
          break;
      }
      
      setSelectedItems([]);
      setShowBulkActions(false);
    } catch (error) {
      console.error('Error in bulk action:', error);
    } finally {
      setActionLoading(null);
    }
  };

  // Status color and icon mapping
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'text-yellow-300 bg-yellow-900/30', icon: MdPending, text: 'Pending' };
      case 'approved':
        return { color: 'text-blue-300 bg-blue-900/30', icon: MdApproval, text: 'Approved' };
      case 'selesai':
        return { color: 'text-green-300 bg-green-900/30', icon: MdDone, text: 'Selesai' };
      case 'ditolak':
        return { color: 'text-red-300 bg-red-900/30', icon: MdError, text: 'Ditolak' };
      default:
        return { color: 'text-gray-300 bg-gray-900/30', icon: MdPending, text: 'Unknown' };
    }
  };

  // Get action buttons based on status
  const getActionButtons = (permohonan: PermohonanData) => {
    const buttons = [];
    
    // Common actions
    buttons.push(
      <button
        key="download"
        onClick={() => handleDownload(permohonan)}
        className="p-2 text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
        title="Download Surat"
      >
        <FaDownload />
      </button>
    );
    
    buttons.push(
      <button
        key="detail"
        onClick={() => {
          setSelectedPermohonan(permohonan);
          setShowDetailModal(true);
        }}
        className="p-2 text-purple-400 hover:bg-gray-700 rounded-lg transition-colors"
        title="Lihat Detail"
      >
        <FaEye />
      </button>
    );

    // Status-specific actions
    if (permohonan.status === 'pending') {
      buttons.push(
        <button
          key="approve"
          onClick={() => handleStatusUpdate(permohonan.id, 'approved')}
          disabled={actionLoading === permohonan.id}
          className="p-2 text-green-400 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
          title="Approve"
        >
          {actionLoading === permohonan.id ? <FaSpinner className="animate-spin" /> : <FaCheck />}
        </button>
      );
      
      buttons.push(
        <button
          key="reject"
          onClick={() => handleStatusUpdate(permohonan.id, 'ditolak')}
          disabled={actionLoading === permohonan.id}
          className="p-2 text-red-400 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
          title="Tolak"
        >
          <FaTimes />
        </button>
      );
    }
    
    if (permohonan.status === 'approved') {
      buttons.push(
        <button
          key="selesai"
          onClick={() => handleStatusUpdate(permohonan.id, 'selesai')}
          disabled={actionLoading === permohonan.id}
          className="p-2 text-green-400 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
          title="Tandai Selesai"
        >
          <FaCheck />
        </button>
      );
    }
    
    // Notification button
    buttons.push(
      <button
        key="notify"
        onClick={() => handleSendNotification(permohonan)}
        className="p-2 text-green-400 hover:bg-gray-700 rounded-lg transition-colors"
        title="Kirim SMS Notifikasi"
      >
        <FaWhatsapp />
      </button>
    );

    // Delete button for completed data only
    if (permohonan.status === 'selesai') {
      buttons.push(
        <button
          key="delete"
          onClick={() => handleDeleteCompleted(permohonan.id)}
          disabled={actionLoading === permohonan.id}
          className="p-2 text-red-400 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
          title="Hapus Data (Hanya data selesai)"
        >
          {actionLoading === permohonan.id ? <FaSpinner className="animate-spin" /> : <FaTrash />}
        </button>
      );
    }

    return buttons;
  };

  // Handle download
  const handleDownload = async (permohonan: PermohonanData) => {
    try {
      setActionLoading(permohonan.id);
      
      // Call API to generate document
      const response = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceType: permohonan.jenisLayanan,
          formData: permohonan.data,
          nomorPermohonan: permohonan.nomorPermohonan
        })
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${permohonan.nomorPermohonan}-${permohonan.jenisLayanan}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        throw new Error('Failed to generate document');
      }
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Gagal mengunduh dokumen. Silakan coba lagi.');
    } finally {
      setActionLoading(null);
    }
  };

  // Handle send notification
  const handleSendNotification = async (permohonan: PermohonanData) => {
    try {
      setActionLoading(permohonan.id);
      
      // Send SMS notification instead of WhatsApp
      const success = await sendSMSNotification(
        permohonan.nomorHP,
        permohonan.jenisLayanan,
        permohonan.nomorPermohonan,
        permohonan.status
      );
      
      if (success) {
        // Update notification status in Firebase
        const docRef = doc(db, 'permohonan_layanan', permohonan.id);
        await updateDoc(docRef, {
          'notifikasi.terkirim': true,
          'notifikasi.tanggal': new Date(),
          'notifikasi.error': ''
        });
        
        await fetchPermohonanData();
        alert('SMS notifikasi berhasil dikirim!');
      } else {
        throw new Error('Failed to send SMS notification');
      }
    } catch (error) {
      console.error('Error sending SMS notification:', error);
      
      // Update notification error in Firebase
      const docRef = doc(db, 'permohonan_layanan', permohonan.id);
      await updateDoc(docRef, {
        'notifikasi.terkirim': false,
        'notifikasi.error': error instanceof Error ? error.message : 'Unknown error'
      });
      
      alert('Gagal mengirim SMS notifikasi. Silakan coba lagi.');
    } finally {
      setActionLoading(null);
    }
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
      {/* Header Section */}
      <div className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin')}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Kembali</span>
              </button>
              <h1 className="text-2xl font-bold text-yellow-400">Management Surat Keterangan</h1>
              <p className="text-gray-400 hidden md:block">
                Kelola permohonan surat keterangan dari masyarakat
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotificationPanel(!showNotificationPanel)}
                className="relative p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {quickStats.notifikasiGagal > 0 ? (
                  <MdNotificationsActive className="h-6 w-6 text-red-400" />
                ) : (
                  <MdNotifications className="h-6 w-6" />
                )}
                {quickStats.notifikasiGagal > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                    {quickStats.notifikasiGagal}
                  </span>
                )}
              </button>
              <button
                onClick={fetchPermohonanData}
                disabled={loading}
                className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
              >
                <FaRedo className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaFileAlt className="h-8 w-8 text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Hari Ini</p>
                <p className="text-2xl font-bold text-white">{quickStats.totalHariIni}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MdPending className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Menunggu Review</p>
                <p className="text-2xl font-bold text-white">{quickStats.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MdApproval className="h-8 w-8 text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Menunggu TTE</p>
                <p className="text-2xl font-bold text-white">{quickStats.approved}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MdDone className="h-8 w-8 text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Selesai Hari Ini</p>
                <p className="text-2xl font-bold text-white">{quickStats.selesaiHariIni}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MdError className="h-8 w-8 text-red-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Notifikasi Gagal</p>
                <p className="text-2xl font-bold text-white">{quickStats.notifikasiGagal}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['semua', 'pending', 'approved', 'selesai', 'ditolak'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'semua' | 'pending' | 'approved' | 'selesai' | 'ditolak')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={jenisLayananFilter}
                onChange={(e) => setJenisLayananFilter(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="semua">Semua Jenis Surat</option>
                <option value="domisili">Surat Domisili</option>
                <option value="kelahiran">Surat Kelahiran</option>
                <option value="usaha">Surat Usaha</option>
                <option value="pindah">Surat Pindah</option>
                <option value="surat_kematian">Surat Kematian</option>
                <option value="tempat_tinggal">Surat Tempat Tinggal</option>
              </select>
            </div>
            
            <div>
              <select
                value={tanggalFilter}
                onChange={(e) => setTanggalFilter(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="semua">Semua Tanggal</option>
                <option value="hari_ini">Hari Ini</option>
                <option value="minggu_ini">Minggu Ini</option>
                <option value="bulan_ini">Bulan Ini</option>
              </select>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama, NIK, atau nomor HP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="bg-gray-800 border border-yellow-500 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-yellow-400">
                  {selectedItems.length} item terpilih
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBulkAction('approve')}
                    disabled={actionLoading === 'bulk'}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
                  >
                    <FaCheck className="inline mr-2" />
                    Approve Semua
                  </button>
                  <button
                    onClick={() => handleBulkAction('download')}
                    disabled={actionLoading === 'bulk'}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm"
                  >
                    <FaDownload className="inline mr-2" />
                    Download Semua
                  </button>
                  <button
                    onClick={() => handleBulkAction('notify')}
                    disabled={actionLoading === 'bulk'}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
                  >
                    <FaWhatsapp className="inline mr-2" />
                    Kirim SMS
                  </button>
                  <button
                    onClick={() => handleBulkAction('export')}
                    disabled={actionLoading === 'bulk'}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 text-sm"
                  >
                    <FaFileExport className="inline mr-2" />
                    Export Excel
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    disabled={actionLoading === 'bulk'}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 text-sm"
                    title="Hapus data yang sudah selesai"
                  >
                    <FaTrash className="inline mr-2" />
                    Hapus Selesai
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSelectedItems([])}
                className="text-yellow-400 hover:text-yellow-300 text-sm"
              >
                Batalkan
              </button>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredData.length && filteredData.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(filteredData.map(item => item.id));
                        } else {
                          setSelectedItems([]);
                        }
                      }}
                      className="rounded border-gray-500 text-yellow-500 focus:ring-yellow-500 bg-gray-600"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    No. Permohonan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Nama Pemohon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Jenis Surat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Tanggal Pengajuan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Nomor HP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <FaSpinner className="animate-spin mx-auto h-8 w-8 text-yellow-400" />
                      <p className="mt-2 text-gray-400">Memuat data...</p>
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                      Tidak ada data permohonan
                    </td>
                  </tr>
                ) : (
                  filteredData.map((permohonan) => {
                    const statusDisplay = getStatusDisplay(permohonan.status);
                    const StatusIcon = statusDisplay.icon;
                    
                    return (
                      <tr key={permohonan.id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(permohonan.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedItems([...selectedItems, permohonan.id]);
                              } else {
                                setSelectedItems(selectedItems.filter(id => id !== permohonan.id));
                              }
                            }}
                            className="rounded border-gray-500 text-yellow-500 focus:ring-yellow-500 bg-gray-600"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {permohonan.nomorPermohonan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{permohonan.namaPemohon}</div>
                          <div className="text-sm text-gray-400">{permohonan.nik}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {permohonan.jenisLayanan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {permohonan.tanggalPengajuan.toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusDisplay.color}`}>
                            <StatusIcon className="mr-1.5 h-4 w-4" />
                            {statusDisplay.text}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {permohonan.nomorHP}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getActionButtons(permohonan)}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedPermohonan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Detail Permohonan - {selectedPermohonan.nomorPermohonan}
                </h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>

              {/* Detail content */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Data Pemohon</h4>
                    <div className="space-y-2">
                      <p><span className="font-medium text-gray-300">Nama:</span> <span className="text-white">{selectedPermohonan.namaPemohon}</span></p>
                      <p><span className="font-medium text-gray-300">NIK:</span> <span className="text-white">{selectedPermohonan.nik}</span></p>
                      <p><span className="font-medium text-gray-300">Nomor HP:</span> <span className="text-white">{selectedPermohonan.nomorHP}</span></p>
                      <p><span className="font-medium text-gray-300">Jenis Layanan:</span> <span className="text-white">{selectedPermohonan.jenisLayanan}</span></p>
                      <p><span className="font-medium text-gray-300">Alamat:</span> <span className="text-white">{selectedPermohonan.data.alamat || '-'}</span></p>
                      <p><span className="font-medium text-gray-300">Agama:</span> <span className="text-white">{selectedPermohonan.data.agama || '-'}</span></p>
                      <p><span className="font-medium text-gray-300">Pekerjaan:</span> <span className="text-white">{selectedPermohonan.data.pekerjaan || '-'}</span></p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Timeline Status</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-sm text-white">Diajukan</p>
                          <p className="text-xs text-gray-400">{selectedPermohonan.timeline.diajukan.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                      {selectedPermohonan.timeline.direview && (
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div>
                            <p className="font-medium text-sm text-white">Direview</p>
                            <p className="text-xs text-gray-400">{selectedPermohonan.timeline.direview.toLocaleString('id-ID')}</p>
                          </div>
                        </div>
                      )}
                      {selectedPermohonan.timeline.disetujui && (
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="font-medium text-sm text-white">Disetujui</p>
                            <p className="text-xs text-gray-400">{selectedPermohonan.timeline.disetujui.toLocaleString('id-ID')}</p>
                          </div>
                        </div>
                      )}
                      {selectedPermohonan.timeline.selesai && (
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <div>
                            <p className="font-medium text-sm text-white">Selesai</p>
                            <p className="text-xs text-gray-400">{selectedPermohonan.timeline.selesai.toLocaleString('id-ID')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notification Status */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Status Notifikasi</h4>
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                      selectedPermohonan.notifikasi.terkirim 
                        ? 'bg-green-800 text-green-300' 
                        : 'bg-red-800 text-red-300'
                    }`}>
                      {selectedPermohonan.notifikasi.terkirim ? (
                        <>
                          <FaCheck className="h-4 w-4" />
                          <span>Terkirim</span>
                        </>
                      ) : (
                        <>
                          <FaTimes className="h-4 w-4" />
                          <span>Belum Terkirim</span>
                        </>
                      )}
                    </div>
                    {selectedPermohonan.notifikasi.tanggal && (
                      <span className="text-sm text-gray-400">
                        {selectedPermohonan.notifikasi.tanggal.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>
                  {selectedPermohonan.notifikasi.error && (
                    <p className="mt-2 text-sm text-red-400 bg-red-900 bg-opacity-50 p-2 rounded">
                      Error: {selectedPermohonan.notifikasi.error}
                    </p>
                  )}
                </div>

                {/* Admin Notes */}
                <div>
                  <h4 className="font-semibold text-white mb-3">Catatan Admin</h4>
                  <textarea
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
                    rows={4}
                    placeholder="Tambahkan catatan internal..."
                    defaultValue={selectedPermohonan.catatan || ''}
                    onChange={(e) => {
                      // Update catatan in real-time
                      setSelectedPermohonan(prev => prev ? {...prev, catatan: e.target.value} : null);
                    }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-600">
                  <button
                    onClick={() => handleDownload(selectedPermohonan)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaDownload className="inline mr-2" />
                    Download Surat
                  </button>
                  <button
                    onClick={() => handleSendNotification(selectedPermohonan)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FaWhatsapp className="inline mr-2" />
                    Kirim Notifikasi
                  </button>
                  {selectedPermohonan.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          handleStatusUpdate(selectedPermohonan.id, 'approved');
                          setShowDetailModal(false);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <FaCheck className="inline mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          const alasan = prompt('Alasan penolakan:');
                          if (alasan) {
                            handleStatusUpdate(selectedPermohonan.id, 'ditolak', { alasanTolak: alasan });
                            setShowDetailModal(false);
                          }
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <FaTimes className="inline mr-2" />
                        Tolak
                      </button>
                    </>
                  )}
                  {selectedPermohonan.status === 'approved' && (
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedPermohonan.id, 'selesai');
                        setShowDetailModal(false);
                      }}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <FaCheck className="inline mr-2" />
                      Tandai Selesai
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Panel */}
      {showNotificationPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Panel Notifikasi
                </h3>
                <button
                  onClick={() => setShowNotificationPanel(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Failed Notifications */}
                <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
                  <h4 className="font-semibold text-red-300 mb-3">
                    Notifikasi Gagal ({quickStats.notifikasiGagal})
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {permohonanData
                      .filter(item => item.notifikasi.error && !item.notifikasi.terkirim)
                      .map(item => (
                        <div key={item.id} className="flex items-center justify-between bg-gray-700 p-3 rounded border border-gray-600">
                          <div>
                            <p className="font-medium text-white">{item.namaPemohon}</p>
                            <p className="text-sm text-gray-300">{item.nomorPermohonan}</p>
                            <p className="text-sm text-red-400">{item.notifikasi.error}</p>
                          </div>
                          <button
                            onClick={() => handleSendNotification(item)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                          >
                            Coba Lagi
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Successful Notifications */}
                <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
                  <h4 className="font-semibold text-green-300 mb-3">
                    Notifikasi Berhasil Terkirim (24 Jam Terakhir)
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {permohonanData
                      .filter(item => {
                        const yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        return item.notifikasi.terkirim && 
                               item.notifikasi.tanggal && 
                               item.notifikasi.tanggal >= yesterday;
                      })
                      .map(item => (
                        <div key={item.id} className="flex items-center justify-between bg-gray-700 p-3 rounded border border-gray-600">
                          <div>
                            <p className="font-medium text-white">{item.namaPemohon}</p>
                            <p className="text-sm text-gray-300">{item.nomorPermohonan}</p>
                            <p className="text-sm text-green-400">
                              Terkirim: {item.notifikasi.tanggal?.toLocaleString('id-ID')}
                            </p>
                          </div>
                          <div className="text-green-400">
                            <FaCheck />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={async () => {
                    const failedItems = permohonanData.filter(item => item.notifikasi.error && !item.notifikasi.terkirim);
                    for (const item of failedItems) {
                      try {
                        await handleSendNotification(item);
                      } catch (error) {
                        console.error(`Failed to retry notification for ${item.nomorPermohonan}:`, error);
                      }
                    }
                    setShowNotificationPanel(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Coba Ulang Semua
                </button>
                <button
                  onClick={() => setShowNotificationPanel(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettingsPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Pengaturan
                </h3>
                <button
                  onClick={() => setShowSettingsPanel(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Auto Refresh
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={autoRefresh}
                      onChange={(e) => setAutoRefresh(e.target.checked)}
                      className="rounded border-gray-600 text-yellow-500 focus:ring-yellow-500 bg-gray-700"
                    />
                    <span className="text-sm text-gray-300">
                      {autoRefresh ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Interval Refresh (detik)
                  </label>
                  <input
                    type="number"
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(parseInt(e.target.value) || 30)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    min="10"
                    max="300"
                    disabled={!autoRefresh}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Template Notifikasi
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    <option value="default">Template Default</option>
                    <option value="formal">Template Formal</option>
                    <option value="casual">Template Casual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Backup Otomatis
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    <option value="daily">Harian</option>
                    <option value="weekly">Mingguan</option>
                    <option value="monthly">Bulanan</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowSettingsPanel(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    // Handle save settings
                    setShowSettingsPanel(false);
                  }}
                  className="px-4 py-2 bg-yellow-600 text-gray-900 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Actions */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4">
        <button
          onClick={() => setShowBulkActions(!showBulkActions)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
        >
          <FaCheckSquare className="h-6 w-6" />
        </button>
        
        <button
          onClick={() => handleExportData()}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-colors"
        >
          <FaFileExport className="h-6 w-6" />
        </button>
        
        <button
          onClick={() => setShowSettingsPanel(!showSettingsPanel)}
          className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors"
        >
          <FaCog className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
