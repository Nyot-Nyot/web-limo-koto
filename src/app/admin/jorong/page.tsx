'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  MapPinIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { JorongData, useJorongData } from '@/data/jorong';

export default function KelolJorong() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getJorongData, updateJorongData } = useJorongData();
  const [jorongData, setJorongData] = useState<JorongData[]>(getJorongData());
  const [showModal, setShowModal] = useState(false);
  const [editingJorong, setEditingJorong] = useState<JorongData | null>(null);
  const [formData, setFormData] = useState<Partial<JorongData>>({
    name: '',
    population: '',
    area: '',
    coordinates: { lat: 0, lng: 0 },
    color: '#EC4899',
    description: '',
    facilities: []
  });
  const [facilityInput, setFacilityInput] = useState('');
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: ''
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [jorongToDelete, setJorongToDelete] = useState<JorongData | null>(null);
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Update local state when data changes
  useEffect(() => {
    setJorongData(getJorongData());
  }, [getJorongData]);

  const availableColors = [
    '#EC4899', '#DC2626', '#06B6D4', '#84CC16', '#10B981',
    '#EF4444', '#8B5F99', '#F59E0B', '#3B82F6', '#8B5CF6'
  ];

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: 'success', message: '' }), 3000);
  };

  const handleOpenModal = (jorong?: JorongData) => {
    if (jorong) {
      setEditingJorong(jorong);
      setFormData({
        name: jorong.name,
        population: jorong.population,
        area: jorong.area,
        coordinates: jorong.coordinates,
        color: jorong.color,
        description: jorong.description,
        facilities: [...jorong.facilities]
      });
    } else {
      setEditingJorong(null);
      setFormData({
        name: '',
        population: '',
        area: '',
        coordinates: { lat: 0, lng: 0 },
        color: '#EC4899',
        description: '',
        facilities: []
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingJorong(null);
    setFormData({
      name: '',
      population: '',
      area: '',
      coordinates: { lat: 0, lng: 0 },
      color: '#EC4899',
      description: '',
      facilities: []
    });
    setFacilityInput('');
  };

  const handleAddFacility = () => {
    if (facilityInput.trim() && !formData.facilities?.includes(facilityInput.trim())) {
      setFormData({
        ...formData,
        facilities: [...(formData.facilities || []), facilityInput.trim()]
      });
      setFacilityInput('');
    }
  };

  const handleRemoveFacility = (facility: string) => {
    setFormData({
      ...formData,
      facilities: formData.facilities?.filter(f => f !== facility) || []
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.population || !formData.area || !formData.description) {
      showNotification('error', 'Semua field wajib diisi!');
      return;
    }

    let updatedData: JorongData[];

    if (editingJorong) {
      // Update existing jorong
      updatedData = jorongData.map(j => 
        j.id === editingJorong.id 
          ? { ...j, ...formData, id: editingJorong.id } as JorongData
          : j
      );
      showNotification('success', 'Data jorong berhasil diperbarui!');
    } else {
      // Add new jorong
      const newId = formData.name?.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || '';
      
      // Check if ID already exists
      if (jorongData.find(j => j.id === newId)) {
        showNotification('error', 'Nama jorong sudah ada! Gunakan nama yang berbeda.');
        return;
      }

      const newJorong: JorongData = {
        id: newId,
        name: formData.name || '',
        population: formData.population || '',
        area: formData.area || '',
        coordinates: formData.coordinates || { lat: 0, lng: 0 },
        color: formData.color || '#EC4899',
        description: formData.description || '',
        facilities: formData.facilities || []
      };
      updatedData = [...jorongData, newJorong];
      showNotification('success', 'Data jorong berhasil ditambahkan!');
    }

    // Update data and persist to localStorage
    setJorongData(updatedData);
    updateJorongData(updatedData);

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    const jorong = jorongData.find(j => j.id === id);
    if (jorong) {
      setJorongToDelete(jorong);
      setShowDeleteConfirm(true);
    }
  };
  
  const confirmDelete = () => {
    if (jorongToDelete) {
      const updatedData = jorongData.filter(j => j.id !== jorongToDelete.id);
      setJorongData(updatedData);
      updateJorongData(updatedData);
      showNotification('success', 'Data jorong berhasil dihapus!');
      setShowDeleteConfirm(false);
      setJorongToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setJorongToDelete(null);
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
              <Link
                href="/admin"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors mr-4"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Kembali ke Dashboard</span>
              </Link>
              <div className="flex items-center">
                <MapPinIcon className="w-8 h-8 text-purple-400 mr-3" />
                <h1 className="text-2xl font-bold text-yellow-400">
                  Kelola Data Jorong
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Manajemen Jorong
          </h2>
          <p className="text-gray-400">
            Tambah, edit, atau hapus data jorong di Nagari Lima Koto
          </p>
        </div>

        {/* Add Button */}
        <div className="mb-6">
          <button
            onClick={() => handleOpenModal()}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Tambah Jorong</span>
          </button>
        </div>

        {/* Data List */}
        <div className="grid gap-6">
          {jorongData.map((jorong) => (
            <div key={jorong.id} className="bg-gray-800 rounded-xl p-6 border-l-4" style={{ borderLeftColor: jorong.color }}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: jorong.color }}></div>
                    <h3 className="text-xl font-bold text-white">{jorong.name}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-white text-sm">
                      👥 {jorong.population}
                    </span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-white text-sm">
                      📍 {jorong.area}
                    </span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-white text-sm">
                      🗺️ {jorong.coordinates.lat.toFixed(4)}, {jorong.coordinates.lng.toFixed(4)}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">{jorong.description}</p>

                  <div className="mb-4">
                    <h4 className="text-yellow-400 font-semibold mb-2">Fasilitas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {jorong.facilities.map((facility, index) => (
                        <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-white text-sm">
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleOpenModal(jorong)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(jorong.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingJorong ? 'Edit Jorong' : 'Tambah Jorong'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Nama Jorong *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                    placeholder="Masukkan nama jorong"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Jumlah Penduduk *
                    </label>
                    <input
                      type="text"
                      value={formData.population || ''}
                      onChange={(e) => setFormData({ ...formData, population: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                      placeholder="Contoh: 1,234 jiwa"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Luas Wilayah *
                    </label>
                    <input
                      type="text"
                      value={formData.area || ''}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                      placeholder="Contoh: 12.5 km²"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Koordinat Latitude *
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={formData.coordinates?.lat || ''}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        coordinates: { 
                          lat: parseFloat(e.target.value) || 0,
                          lng: formData.coordinates?.lng || 0 
                        } 
                      })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                      placeholder="Contoh: -0.7245"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Koordinat Longitude *
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={formData.coordinates?.lng || ''}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        coordinates: { 
                          lat: formData.coordinates?.lat || 0,
                          lng: parseFloat(e.target.value) || 0 
                        } 
                      })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                      placeholder="Contoh: 101.0223"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Warna Marker
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        className={`w-10 h-10 rounded-full border-4 ${
                          formData.color === color ? 'border-white' : 'border-gray-600'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Deskripsi *
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                    rows={4}
                    placeholder="Masukkan deskripsi jorong"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Fasilitas
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={facilityInput}
                      onChange={(e) => setFacilityInput(e.target.value)}
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                      placeholder="Masukkan fasilitas"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFacility())}
                    />
                    <button
                      type="button"
                      onClick={handleAddFacility}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                    >
                      Tambah
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.facilities?.map((facility, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                      >
                        <span>{facility}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFacility(facility)}
                          className="text-gray-400 hover:text-gray-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
                  >
                    {editingJorong ? 'Perbarui' : 'Simpan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Notification Modal */}
        {notification.show && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
              <div className="flex items-center space-x-3 mb-4">
                {notification.type === 'success' ? (
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white">
                  {notification.type === 'success' ? 'Berhasil' : 'Gagal'}
                </h3>
              </div>
              <p className="text-gray-300 mb-6">{notification.message}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setNotification({ show: false, type: 'success', message: '' })}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && jorongToDelete && (
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
                    <p className="text-sm text-gray-300">Apakah Anda yakin ingin menghapus jorong ini?</p>
                  </div>
                </div>
                
                <div className="mb-6 bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: jorongToDelete.color || '#EC4899' }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold truncate">{jorongToDelete.name}</h4>
                      <p className="text-gray-400 text-sm">
                        {jorongToDelete.population} Penduduk | {jorongToDelete.area}
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
      </div>
    </div>
  );
}
