'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserCircleIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { mockAgendaData, AgendaItem } from '@/data/newsData';
import NotificationModal from '@/components/admin/NotificationModal';

export default function AdminAgendaPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AgendaItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    organizer: '',
    location: '',
    date: '',
    time: ''
  });
  const [validationError, setValidationError] = useState<string>('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<AgendaItem | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: ''
  });
  const router = useRouter();
  
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: 'success', message: '' }), 3000);
  };

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      
      // Load agenda data from localStorage or set default
      const savedData = localStorage.getItem('agendaData');
      if (savedData) {
        setAgendaItems(JSON.parse(savedData));
      } else {
        setAgendaItems(mockAgendaData);
        localStorage.setItem('agendaData', JSON.stringify(mockAgendaData));
      }
    }
  }, [router]);

  // No emoji or color selection needed anymore

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    
    if (!formData.title.trim() || !formData.organizer.trim() || !formData.location.trim() || !formData.date.trim() || !formData.time.trim()) {
      setValidationError('Semua kolom harus diisi!');
      setShowErrorPopup(true);
      return;
    }

    // Check for duplicate title (excluding current item when editing)
    const isDuplicate = agendaItems.some(item => 
      item.title.toLowerCase().trim() === formData.title.toLowerCase().trim() &&
      (editingItem ? item.id !== editingItem.id : true)
    );

    if (isDuplicate) {
      setValidationError(`Agenda dengan judul "${formData.title}" sudah ada!`);
      setShowErrorPopup(true);
      return;
    }
    
    if (editingItem) {
      // Update existing
      const updatedData = agendaItems.map(item => 
        item.id === editingItem.id 
          ? { ...formData, id: editingItem.id }
          : item
      );
      setAgendaItems(updatedData);
      localStorage.setItem('agendaData', JSON.stringify(updatedData));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'agenda' } }));
      showNotification('success', 'Agenda berhasil diperbarui!');
    } else {
      // Add new
      const newItem: AgendaItem = {
        ...formData,
        id: Date.now().toString(),
      };
      const updatedData = [...agendaItems, newItem];
      setAgendaItems(updatedData);
      localStorage.setItem('agendaData', JSON.stringify(updatedData));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'agenda' } }));
      showNotification('success', 'Agenda berhasil ditambahkan!');
    }
    
    setIsModalOpen(false);
    setEditingItem(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      organizer: '',
      location: '',
      date: '',
      time: ''
    });
  };

  const handleEdit = (item: AgendaItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      organizer: item.organizer,
      location: item.location,
      date: item.date,
      time: item.time
    });
    
    setIsModalOpen(true);
  };

  const handleDelete = (item: AgendaItem) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      const updatedData = agendaItems.filter(item => item.id !== itemToDelete.id);
      setAgendaItems(updatedData);
      localStorage.setItem('agendaData', JSON.stringify(updatedData));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'agenda' } }));
      showNotification('success', 'Agenda berhasil dihapus!');
    }
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  const openAddModal = () => {
    setEditingItem(null);
    resetForm();
    setIsModalOpen(true);
  };

  // Filter items based on search
  const filteredItems = agendaItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin')}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Kembali</span>
              </button>
              <h1 className="text-2xl font-bold text-yellow-400">
                Kelola Agenda Nagari
              </h1>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Tambah Agenda</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Controls */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <input
                type="text"
                placeholder="Cari agenda berdasarkan judul, penyelenggara, atau lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {agendaItems.length}
                </div>
                <div className="text-sm text-gray-300">Total Agenda</div>
              </div>
            </div>
          </div>
        </div>

        {/* Agenda Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-gradient-to-br from-white to-blue-50 rounded-lg overflow-hidden shadow-lg text-black">
              {/* Agenda Content */}
              <div className="p-5 border border-blue-100">
                <div className="flex justify-between mb-3">
                  <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <span className="text-2xl text-blue-600">📅</span> {item.title}
                  </h3>
                </div>
                
                <div className="space-y-3 mb-4">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <UserCircleIcon className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Oleh:</span> {item.organizer}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Di:</span> {item.location}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-blue-600 bg-blue-100 text-sm flex items-center gap-1 px-3 py-1 rounded-full">
                      <CalendarIcon className="w-4 h-4" />
                      {item.date}
                    </p>
                    <p className="text-gray-500 bg-gray-100 text-sm flex items-center gap-1 px-3 py-1 rounded-full">
                      <ClockIcon className="w-4 h-4" />
                      {item.time}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-4 border-t border-gray-200 pt-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors text-white text-xs flex-1"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors text-white text-xs flex-1"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No items message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              {searchTerm
                ? 'Tidak ada agenda yang sesuai dengan pencarian'
                : 'Belum ada agenda'
              }
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingItem ? 'Edit Agenda' : 'Tambah Agenda'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                {/* Judul Agenda */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Judul Agenda *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    placeholder="Masukkan judul agenda"
                    required
                  />
                </div>
                
                {/* Penyelenggara */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Oleh (Penyelenggara) *
                  </label>
                  <input
                    type="text"
                    value={formData.organizer}
                    onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    placeholder="Contoh: KKN UNP 2025"
                    required
                  />
                </div>
                
                {/* Lokasi */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Di (Lokasi) *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    placeholder="Contoh: Balai Nagari"
                    required
                  />
                </div>
                
                {/* Tanggal */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Tanggal *
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    placeholder="Contoh: 25 Juli 2025"
                    required
                  />
                </div>
                
                {/* Waktu */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Waktu *
                  </label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    placeholder="Contoh: 08:00 - 12:00"
                    required
                  />
                </div>
                
                {/* No emoji or color selectors needed anymore */}
                
                {/* Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Preview
                  </label>
                  <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-4 text-black border border-blue-100">
                    <h3 className="font-bold text-base mb-2 text-gray-800 flex items-center gap-2">
                      <span className="text-blue-600">📅</span> {formData.title || 'Judul Agenda'}
                    </h3>
                    <div className="space-y-1 mb-3 text-sm">
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <strong>Oleh:</strong> {formData.organizer || 'Penyelenggara'}
                      </p>
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <strong>Di:</strong> {formData.location || 'Lokasi'}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-blue-600 bg-blue-100 font-semibold px-2 py-1 rounded-full">
                        {formData.date || 'Tanggal'}
                      </span>
                      <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {formData.time || 'Waktu'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  {editingItem ? 'Simpan Perubahan' : 'Tambah Agenda'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full shadow-2xl border border-red-500">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Peringatan!</h3>
                  <p className="text-sm text-gray-300">Data tidak dapat disimpan</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-red-400 text-sm leading-relaxed">
                  {validationError}
                </p>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setShowErrorPopup(false);
                    setValidationError('');
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-medium"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full shadow-2xl border border-yellow-500">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Konfirmasi Hapus</h3>
                  <p className="text-sm text-gray-300">Apakah Anda yakin ingin menghapus agenda ini?</p>
                </div>
              </div>
              
              <div className="mb-6 bg-gray-700 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold truncate">{itemToDelete.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      Penyelenggara: {itemToDelete.organizer}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Tanggal: {itemToDelete.date} | Waktu: {itemToDelete.time}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Lokasi: {itemToDelete.location}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-medium"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Success/Error Notification Modal */}
      <NotificationModal 
        show={notification.show}
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification({ show: false, type: 'success', message: '' })}
      />
    </div>
  );
}
