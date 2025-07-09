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
import { galeriData, galeriCategories, GalleryItem } from '@/data/galeri';
import ModalForm from '@/components/admin/ModalForm';

export default function AdminGaleriPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'makanan' as 'makanan' | 'budaya' | 'alam' | 'arsitektur',
    image: ''
  });
  const [dragOver, setDragOver] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string>('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);
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

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      
      // Load gallery data from localStorage or set default
      const savedData = localStorage.getItem('galeriData');
      if (savedData) {
        setGalleryItems(JSON.parse(savedData));
      } else {
        setGalleryItems(galeriData);
        localStorage.setItem('galeriData', JSON.stringify(galeriData));
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    
    if (!formData.title.trim() || !formData.description.trim()) {
      setValidationError('Nama dan deskripsi harus diisi!');
      setShowErrorPopup(true);
      return;
    }

    if (!formData.image) {
      setValidationError('Gambar harus diupload!');
      setShowErrorPopup(true);
      return;
    }

    // Check for duplicate title and category (excluding current item when editing)
    const isDuplicate = galleryItems.some(item => 
      item.title.toLowerCase().trim() === formData.title.toLowerCase().trim() && 
      item.category === formData.category &&
      (editingItem ? item.id !== editingItem.id : true)
    );

    if (isDuplicate) {
      setValidationError(`Item galeri dengan nama "${formData.title}" pada kategori "${galeriCategories.find(cat => cat.id === formData.category)?.name}" sudah ada!`);
      setShowErrorPopup(true);
      return;
    }
    
    if (editingItem) {
      // Update existing
      const updatedData = galleryItems.map(item => 
        item.id === editingItem.id 
          ? { ...formData, id: editingItem.id }
          : item
      );
      setGalleryItems(updatedData);
      localStorage.setItem('galeriData', JSON.stringify(updatedData));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'galeri' } }));
    } else {
      // Add new
      const newItem = {
        ...formData,
        id: Date.now() // Simple ID generation
      };
      const updatedData = [...galleryItems, newItem];
      setGalleryItems(updatedData);
      localStorage.setItem('galeriData', JSON.stringify(updatedData));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'galeri' } }));
    }
    
    setIsModalOpen(false);
    setEditingItem(null);
    setImagePreview(null);
    setFormData({ title: '', description: '', category: 'makanan', image: '' });
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image
    });
    setImagePreview(item.image);
    setValidationError('');
    setIsModalOpen(true);
  };

  const handleDelete = (item: GalleryItem) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      const updatedData = galleryItems.filter(item => item.id !== itemToDelete.id);
      setGalleryItems(updatedData);
      localStorage.setItem('galeriData', JSON.stringify(updatedData));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'galeri' } }));
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
    setFormData({ title: '', description: '', category: 'makanan', image: '' });
    setImagePreview(null);
    setValidationError('');
    setIsModalOpen(true);
  };

  // Filter items based on category and search
  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                Kelola Galeri Nagari
              </h1>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Tambah Item Galeri</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter & Search Controls */}
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Filter Kategori
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="all">Semua Kategori</option>
                {galeriCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Pencarian
              </label>
              <input
                type="text"
                placeholder="Cari berdasarkan nama atau deskripsi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-400">
                {galleryItems.length}
              </div>
              <div className="text-sm text-gray-300">Total Item</div>
            </div>
            {galeriCategories.map((category) => (
              <div key={category.id} className="bg-gray-800 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {galleryItems.filter(item => item.category === category.id).length}
                </div>
                <div className="text-sm text-gray-300">{category.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-full flex flex-col">
              <div className="relative w-full aspect-[4/3] flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-lg font-bold text-yellow-400 line-clamp-2 overflow-hidden text-ellipsis">
                    {item.title}
                  </h3>
                  <p className="text-base font-semibold text-white mb-2 line-clamp-1 overflow-hidden text-ellipsis">
                    {galeriCategories.find(cat => cat.id === item.category)?.name}
                  </p>
                  <p className="text-gray-300 text-xs line-clamp-3 overflow-hidden text-ellipsis">
                    {item.description}
                  </p>
                </div>
                <div className="flex space-x-2 mt-auto pt-2 border-t border-gray-700 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center space-x-1 px-2 py-1 bg-green-600 hover:bg-green-700 rounded-md transition-colors text-xs flex-shrink-0"
                  >
                    <PencilIcon className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
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

        {/* No items message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Tidak ada item yang sesuai dengan filter'
                : 'Belum ada item galeri'
              }
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingItem ? 'Edit Item Galeri' : 'Tambah Item Galeri'}
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
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Judul Item Galeri *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    placeholder="Masukkan judul item galeri"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Kategori *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as 'makanan' | 'budaya' | 'alam' | 'arsitektur' })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    required
                  >
                    {galeriCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Deskripsi *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    rows={4}
                    placeholder="Masukkan deskripsi item galeri"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Gambar *
                  </label>
                  
                  {imagePreview ? (
                    /* Image Preview with Remove Option */
                    <div className="mb-4">
                      <div className="relative w-full aspect-[4/3] bg-gray-700 rounded-lg overflow-hidden">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          style={{ objectFit: 'cover' }}
                          className="w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData({ ...formData, image: '' });
                          }}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm text-gray-400 mt-2 text-center">
                        Klik tombol × untuk menghapus gambar dan memilih gambar baru
                      </p>
                    </div>
                  ) : (
                    /* File Upload Area - Only shown when no image */
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                        dragOver
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-300 mb-1">
                          Klik untuk memilih gambar atau drag & drop
                        </p>
                        <p className="text-sm text-gray-500">
                          Format: JPG, PNG, GIF (Max: 5MB)
                        </p>
                      </label>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                  >
                    {editingItem ? 'Perbarui' : 'Simpan'}
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
                  Mengerti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
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
                  <p className="text-sm text-gray-300">Apakah Anda yakin ingin menghapus item ini?</p>
                </div>
              </div>
              
              <div className="mb-6 bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="relative w-24 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0 aspect-[4/3]">
                    <Image
                      src={itemToDelete.image}
                      alt={itemToDelete.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold truncate">{itemToDelete.title}</h4>
                    <p className="text-gray-400 text-sm">
                      {galeriCategories.find(cat => cat.id === itemToDelete.category)?.name}
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
  );
}
