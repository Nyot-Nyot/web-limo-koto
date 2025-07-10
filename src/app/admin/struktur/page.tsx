'use client';

  import { useEffect, useState } from 'react';
  import { useRouter } from 'next/navigation';
  import Image from 'next/image';
  import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    ArrowLeftIcon,
    PhotoIcon
  } from '@heroicons/react/24/outline';
  import NotificationModal from '@/components/admin/NotificationModal';

  interface PejabatData {
    id: number;
    name: string;
    title: string;
    jorong?: string;
    image: string;
    description: string;
  }

  const jorongOptions = [
    'Jorong Balai Cacang',
    'Jorong Koto Tuo',
    'Jorong Muaro',
    'Jorong Padang Laweh',
    'Jorong Sungai Tanang',
    'Jorong Tanjung Bonai',
    'Jorong Tanjung Haro',
    'Jorong Bukik Batabuah',
    'Jorong Koto Hilalang',
    'Jorong Guguk Tinggi'
  ];

  export default function StrukturAdmin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pejabatData, setPejabatData] = useState<PejabatData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPejabat, setEditingPejabat] = useState<PejabatData | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [pejabatToDelete, setPejabatToDelete] = useState<number | null>(null);
    const [formData, setFormData] = useState({
      name: '',
      title: '',
      jorong: '',
      image: '',
      description: ''
    });
    const [dragOver, setDragOver] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string>('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);
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

    // Handle file upload
    const handleFileUpload = (file: File) => {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setFormData({...formData, image: result});
          setImagePreview(result);
        };
        reader.readAsDataURL(file);
      }
    };

    // Handle drag events
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const files = e.dataTransfer.files;
      if (files[0]) {
        handleFileUpload(files[0]);
      }
    };

    // Handle file input change
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    };
    
    const showNotification = (type: 'success' | 'error', message: string) => {
      setNotification({ show: true, type, message });
      setTimeout(() => setNotification({ show: false, type: 'success', message: '' }), 3000);
    };

    // Validate unique positions
    const validateUniquePosition = (title: string, jorong: string): string | null => {
      // Check for Wali Nagari uniqueness
      if (title === 'Wali Nagari') {
        const existingWaliNagari = pejabatData.find(p => 
          p.title === 'Wali Nagari' && 
          (!editingPejabat || p.id !== editingPejabat.id)
        );
        if (existingWaliNagari) {
          return 'Wali Nagari sudah ada! Hanya boleh ada 1 Wali Nagari.';
        }
      }

      // Check for Kepala Jorong uniqueness per jorong
      if (title === 'Kepala Jorong' && jorong) {
        const existingKepalaJorong = pejabatData.find(p => 
          p.title === 'Kepala Jorong' && 
          p.jorong === jorong && 
          (!editingPejabat || p.id !== editingPejabat.id)
        );
        if (existingKepalaJorong) {
          return `Kepala Jorong untuk ${jorong} sudah ada! Setiap jorong hanya boleh memiliki 1 Kepala Jorong.`;
        }
      }

      return null;
    };

    useEffect(() => {
      const adminAuth = localStorage.getItem('adminAuth');
      if (adminAuth !== 'true') {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
        // Load existing data from localStorage or set default
        const savedData = localStorage.getItem('pejabatData');
        if (savedData) {
          setPejabatData(JSON.parse(savedData));
        } else {
          // Set default data from the existing pejabat data
          const defaultData = [
            {
              id: 1,
              name: "H. Ahmad Syafrizal",
              title: "Wali Nagari",
              image: "/images/pejabat-1.jpg",
              description: "Memimpin pemerintahan Nagari Lima Koto dengan komitmen untuk kesejahteraan masyarakat."
            },
            {
              id: 2,
              name: "Budi Santoso",
              title: "Kepala Jorong",
              jorong: "Jorong Balai Cacang",
              image: "/images/pejabat-2.jpg",
              description: "Mengelola administrasi dan pelayanan masyarakat di Jorong Balai Cacang."
            }
          ];
          setPejabatData(defaultData);
          localStorage.setItem('pejabatData', JSON.stringify(defaultData));
        }
      }
    }, [router]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setValidationError('');
      
      // Validate unique positions
      const validationResult = validateUniquePosition(formData.title, formData.jorong);
      if (validationResult) {
        setValidationError(validationResult);
        setShowErrorPopup(true);
        return;
      }
      
      if (editingPejabat) {
        // Update existing
        const updatedData = pejabatData.map(p => 
          p.id === editingPejabat.id 
            ? { ...formData, id: editingPejabat.id }
            : p
        );
        setPejabatData(updatedData);
        localStorage.setItem('pejabatData', JSON.stringify(updatedData));
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'pejabat' } }));
        showNotification('success', 'Data pejabat berhasil diperbarui!');
      } else {
        // Add new
        const newPejabat = {
          ...formData,
          id: Date.now() // Simple ID generation
        };
        const updatedData = [...pejabatData, newPejabat];
        setPejabatData(updatedData);
        localStorage.setItem('pejabatData', JSON.stringify(updatedData));
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'pejabat' } }));
        showNotification('success', 'Data pejabat berhasil ditambahkan!');
      }
      
      setIsModalOpen(false);
      setEditingPejabat(null);
      setImagePreview(null);
      setFormData({ name: '', title: '', jorong: '', image: '', description: '' });
    };

    const handleEdit = (pejabat: PejabatData) => {
      setEditingPejabat(pejabat);
      setFormData({
        name: pejabat.name,
        title: pejabat.title,
        jorong: pejabat.jorong || '',
        image: pejabat.image,
        description: pejabat.description
      });
      setImagePreview(pejabat.image);
      setValidationError('');
      setIsModalOpen(true);
    };

    // Removed duplicate handleDelete - we're using openDeleteModal in the UI

    const openAddModal = () => {
      setEditingPejabat(null);
      setFormData({ name: '', title: '', jorong: '', image: '', description: '' });
      setImagePreview(null);
      setValidationError('');
      setIsModalOpen(true);
    };

    const openDeleteModal = (id: number) => {
      setPejabatToDelete(id);
      setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
      if (pejabatToDelete !== null) {
        const updatedData = pejabatData.filter(p => p.id !== pejabatToDelete);
        setPejabatData(updatedData);
        localStorage.setItem('pejabatData', JSON.stringify(updatedData));
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'pejabat' } }));
        showNotification('success', 'Data pejabat berhasil dihapus!');
      }
      setDeleteModalOpen(false);
      setPejabatToDelete(null);
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
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/admin')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  <span>Kembali</span>
                </button>
                <h1 className="text-2xl font-bold text-yellow-400">
                  Kelola Struktur Pemerintahan
                </h1>
              </div>
              <button
                onClick={openAddModal}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Tambah Pejabat</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Pejabat List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pejabatData.map((pejabat) => (
              <div key={pejabat.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-full max-w-sm mx-auto flex flex-col h-[500px]">
                <div className="relative w-full h-[300px] flex-shrink-0">
                  <Image
                    src={pejabat.image}
                    alt={pejabat.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4 flex flex-col h-[200px] overflow-hidden">
                  <div className="flex-1 min-h-0 overflow-hidden">
                    <h3 className="text-lg font-bold text-yellow-400 mb-1 line-clamp-2 overflow-hidden text-ellipsis">
                      {pejabat.name}
                    </h3>
                    <p className="text-base font-semibold text-white mb-1 line-clamp-1 overflow-hidden text-ellipsis">
                      {pejabat.title}
                    </p>
                    {pejabat.jorong && (
                      <p className="text-xs text-yellow-200 mb-2 line-clamp-1 overflow-hidden text-ellipsis">
                        {pejabat.jorong}
                      </p>
                    )}
                    <p className="text-gray-300 text-xs line-clamp-3 overflow-hidden text-ellipsis">
                      {pejabat.description}
                    </p>
                  </div>
                  <div className="flex space-x-2 mt-auto pt-2 border-t border-gray-700 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(pejabat)}
                      className="flex items-center space-x-1 px-2 py-1 bg-green-600 hover:bg-green-700 rounded-md transition-colors text-xs flex-shrink-0"
                    >
                      <PencilIcon className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => openDeleteModal(pejabat.id)}
                      className="flex items-center space-x-1 px-2 py-1 bg-red-600 hover:bg-red-700 rounded-md transition-colors text-xs flex-shrink-0"
                    >
                      <TrashIcon className="w-3 h-3" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {editingPejabat ? 'Edit Pejabat' : 'Tambah Pejabat'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Jabatan
                    </label>
                    <select
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="">Pilih Jabatan</option>
                      <option value="Wali Nagari">Wali Nagari</option>
                      <option value="Sekretaris Nagari">Sekretaris Nagari</option>
                      <option value="Kepala Jorong">Kepala Jorong</option>
                      <option value="Staff Nagari">Staff Nagari</option>
                    </select>
                  </div>

                  {formData.title === 'Kepala Jorong' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nama Jorong
                      </label>
                      <select
                        required
                        value={formData.jorong}
                        onChange={(e) => setFormData({...formData, jorong: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        <option value="">Pilih Jorong</option>
                        {jorongOptions.map((jorong) => (
                          <option key={jorong} value={jorong}>{jorong}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Foto Pejabat
                    </label>
                    
                    {/* Drag & Drop Area */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragOver 
                          ? 'border-yellow-400 bg-yellow-400/10' 
                          : 'border-gray-600 bg-gray-700/50'
                      }`}
                    >
                      {imagePreview ? (
                        <div className="space-y-4">
                          <div className="relative w-32 h-40 mx-auto">
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              fill
                              style={{ objectFit: 'cover' }}
                              className="rounded-md"
                            />
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-green-400">✓ Foto berhasil dipilih</p>
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null);
                                setFormData({...formData, image: ''});
                              }}
                              className="text-xs text-red-400 hover:text-red-300"
                            >
                              Hapus foto
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto" />
                          <div className="space-y-2">
                            <p className="text-sm text-gray-300">
                              Drag & drop foto di sini atau
                            </p>
                            <label className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer transition-colors">
                              <span className="text-sm">Pilih foto</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileInputChange}
                                className="hidden"
                                required={!formData.image}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-400">
                            Format yang didukung: JPG, PNG, GIF (Max 5MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Deskripsi Jabatan
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Deskripsi tugas dan tanggung jawab..."
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                      {editingPejabat ? 'Update' : 'Tambah'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setImagePreview(null);
                        setValidationError('');
                        setFormData({ name: '', title: '', jorong: '', image: '', description: '' });
                      }}
                      className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && pejabatToDelete !== null && (
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
                    <p className="text-sm text-gray-300">Apakah Anda yakin ingin menghapus data pejabat ini?</p>
                  </div>
                </div>
                
                {pejabatData.find(p => p.id === pejabatToDelete) && (
                  <div className="mb-6 bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-24 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0 aspect-[4/3]">
                        <Image
                          src={pejabatData.find(p => p.id === pejabatToDelete)?.image || ''}
                          alt={pejabatData.find(p => p.id === pejabatToDelete)?.name || ''}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold truncate">{pejabatData.find(p => p.id === pejabatToDelete)?.name}</h4>
                        <p className="text-gray-400 text-sm">
                          {pejabatData.find(p => p.id === pejabatToDelete)?.title}
                          {pejabatData.find(p => p.id === pejabatToDelete)?.jorong && ` - ${pejabatData.find(p => p.id === pejabatToDelete)?.jorong}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setDeleteModalOpen(false)}
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
                    Mengerti
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
