'use client';

import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  deleteDoc
} from 'firebase/firestore';
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
import NotificationModal from '@/components/admin/NotificationModal';

export default function AdminGaleriPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'warning';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: ''
  });
  const router = useRouter();
  
  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: 'success', message: '' }), 3000);
  };

  // Handle file upload with image optimization
  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      // Check file size before processing
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showNotification('error', 'Ukuran gambar terlalu besar. Maksimal 5MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        
        // Image optimization for large images
        if (result.length > 1000000) { // If over ~1MB in base64
          // Create an image element to resize
          const img = document.createElement('img');
          img.onload = () => {
            // Create canvas for resizing
            const canvas = document.createElement('canvas');
            // Calculate new dimensions (maintain aspect ratio)
            const MAX_WIDTH = 1200;
            const MAX_HEIGHT = 1200;
            let width = img.width;
            let height = img.height;
            
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            
            // Set canvas dimensions
            canvas.width = width;
            canvas.height = height;
            
            // Draw resized image to canvas
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              
              // Get optimized image as base64 (JPEG with quality 0.8)
              const optimizedImage = canvas.toDataURL('image/jpeg', 0.8);
              
              // Update form data with optimized image
              setFormData({...formData, image: optimizedImage});
              setImagePreview(optimizedImage);
            } else {
              // Fallback if canvas context isn't available
              setFormData({...formData, image: result});
              setImagePreview(result);
            }
          };
          img.src = result;
        } else {
          // Small image, use as is
          setFormData({...formData, image: result});
          setImagePreview(result);
        }
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

  // Function to fetch gallery data from Firestore
  const fetchGalleryFromFirestore = async () => {
    setIsLoading(true);
    try {
      let retryCount = 0;
      const maxRetries = 3;
      
      // Retry mechanism for network issues
      while (retryCount < maxRetries) {
        try {
          console.log('Fetching gallery data from Firestore, attempt:', retryCount + 1);
          const snapshot = await getDocs(collection(db, 'galeri'));
          
          if (!snapshot.docs || snapshot.docs.length === 0) {
            console.log('No gallery data found in Firestore, using default data');
            // If no data in Firestore, use default data
            setGalleryItems(galeriData);
            localStorage.setItem('galeriData', JSON.stringify(galeriData));
            break;
          }
          
          const data = snapshot.docs.map(doc => {
            const docData = doc.data();
            return {
              id: doc.id,
              title: typeof docData.title === 'string' ? docData.title : '',
              description: typeof docData.description === 'string' ? docData.description : '',
              category: typeof docData.category === 'string' ? docData.category : 'makanan',
              image: typeof docData.image === 'string' ? docData.image : ''
            } as GalleryItem;
          });
          
          // Check if there are any items with extremely large image data
          const isDataTooLarge = data.some(item => {
            // Check if base64 image is too large (over 1MB)
            if (item.image && item.image.length > 1000000) {
              console.warn(`Large image detected in item '${item.title}'. Consider optimizing.`);
              return true;
            }
            return false;
          });
          
          if (isDataTooLarge) {
            console.warn('Some images are very large. This may cause performance issues.');
          }
          
          setGalleryItems(data);
          console.log('Successfully fetched', data.length, 'gallery items from Firestore');
          
          // Update localStorage for offline fallback - but be careful with large data
          try {
            localStorage.setItem('galeriData', JSON.stringify(data));
          } catch (storageError) {
            console.error('Failed to store gallery data in localStorage (likely too large):', storageError);
            // Try to store without images if it fails
            const dataWithoutImages = data.map(item => ({
              ...item,
              image: item.image.substring(0, 100) + '...' // Store just the beginning to keep the format
            }));
            localStorage.setItem('galeriData', JSON.stringify(dataWithoutImages));
          }
          
          break; // Exit the retry loop if successful
        } catch (fetchError) {
          retryCount++;
          if (retryCount >= maxRetries) throw fetchError;
          console.log(`Fetch attempt ${retryCount} failed. Retrying in ${1000 * retryCount}ms...`, fetchError);
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)); // Wait before retry with increasing delay
        }
      }
    } catch (error) {
      console.error('Error fetching gallery data after all retries:', error);
      showNotification('error', 'Gagal mengambil data galeri dari server');
      
      // Fall back to localStorage if Firestore fails
      const savedData = localStorage.getItem('galeriData');
      if (savedData) {
        try {
          console.log('Using data from localStorage instead');
          const parsedData = JSON.parse(savedData);
          setGalleryItems(parsedData);
          showNotification('warning', 'Menggunakan data lokal karena masalah jaringan');
        } catch (e) {
          console.error('Error parsing localStorage data:', e);
          // Use default data as last resort
          console.log('Using default gallery data as last resort');
          setGalleryItems(galeriData);
          showNotification('warning', 'Menggunakan data default');
        }
      } else {
        // Set default data if no localStorage data
        console.log('No data in localStorage, using default gallery data');
        setGalleryItems(galeriData);
        showNotification('warning', 'Menggunakan data default');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      setIsLoading(true);
      
      // First try to load data from Firestore
      const loadData = async () => {
        try {
          await fetchGalleryFromFirestore();
        } catch (error) {
          console.error('Failed to fetch from Firestore:', error);
          // Fall back to localStorage if Firestore fails
          const savedData = localStorage.getItem('galeriData');
          if (savedData) {
            try {
              const parsedData = JSON.parse(savedData);
              setGalleryItems(parsedData);
              showNotification('warning', 'Menggunakan data lokal karena masalah jaringan');
            } catch (e) {
              console.error('Error parsing localStorage data:', e);
              showNotification('error', 'Terjadi kesalahan saat memuat data');
            }
          } else {
            // Set default data if no localStorage data
            setGalleryItems(galeriData);
            localStorage.setItem('galeriData', JSON.stringify(galeriData));
            showNotification('warning', 'Menggunakan data default karena masalah jaringan');
          }
        } finally {
          setIsLoading(false);
        }
      };
      
      loadData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
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

    // Check image size - warn if large but allow submission
    if (formData.image && formData.image.length > 1000000) {
      console.warn(`Large image detected (${Math.round(formData.image.length/1024)}KB). This may cause performance issues.`);
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
    
    try {
      // Show loading indicator before saving to Firestore
      setIsLoading(true);
      
      // Prepare the data to save
      const galleryData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        image: formData.image
      };
      
      if (editingItem && typeof editingItem.id === 'string') {
        // Update existing gallery item in Firestore
        const galleryRef = doc(db, 'galeri', editingItem.id);
        await updateDoc(galleryRef, galleryData);
        showNotification('success', 'Data galeri berhasil diperbarui!');
      } else {
        // Add new gallery item to Firestore
        await addDoc(collection(db, 'galeri'), galleryData);
        showNotification('success', 'Data galeri berhasil ditambahkan!');
      }
      
      // Refresh data from Firestore
      await fetchGalleryFromFirestore();
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'galeri' } }));
      
      // Clean up state
      setIsModalOpen(false);
      setEditingItem(null);
      setImagePreview(null);
      setFormData({ title: '', description: '', category: 'makanan', image: '' });
    } catch (error) {
      console.error('Error saving gallery data:', error);
      showNotification('error', 'Terjadi kesalahan saat menyimpan data galeri');
    } finally {
      setIsLoading(false);
    }
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

  const confirmDelete = async () => {
    if (itemToDelete && typeof itemToDelete.id === 'string') {
      try {
        // Delete from Firestore
        const docRef = doc(db, 'galeri', itemToDelete.id);
        await deleteDoc(docRef);
        
        // Update local state
        const updatedData = galleryItems.filter(item => item.id !== itemToDelete.id);
        setGalleryItems(updatedData);
        
        // Update localStorage for fallback
        localStorage.setItem('galeriData', JSON.stringify(updatedData));
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'galeri' } }));
        
        showNotification('success', 'Data galeri berhasil dihapus!');
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        showNotification('error', 'Gagal menghapus data galeri');
      }
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

  // State for tracking render errors
  const [renderError, setRenderError] = useState<string | null>(null);
  
  // Error boundary effect for large data rendering issues
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Caught runtime error:', event.error);
      setRenderError('Terjadi kesalahan saat menampilkan data. Coba muat ulang halaman.');
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Show error state if render error
  if (renderError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-600 max-w-lg mx-auto p-6 rounded-lg shadow-lg text-center">
          <svg className="w-16 h-16 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.207-.833-2.976 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mt-4">Error Rendering Galeri</h2>
          <p className="text-white mt-2">{renderError}</p>
          <div className="mt-6 flex justify-center space-x-4">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100"
            >
              Muat Ulang Halaman
            </button>
            <button 
              onClick={() => router.push('/admin')} 
              className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  try {
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
        {/* Loading indicator */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-300">Memuat data galeri...</p>
          </div>
        ) : (
        <>
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
                <div className="flex space-x-2 mt-4 pt-2 flex-shrink-0">
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
        </>
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

      {/* Success/Error Notification Modal */}
      <NotificationModal 
        show={notification.show}
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification({ show: false, type: 'success', message: '' })}
      />
    </div>
  );
  } catch (error) {
    console.error("Render error caught:", error);
    // We won't reach this in most cases since React's error boundary would catch it first,
    // but just in case, we'll set the error state which will trigger a re-render
    setRenderError('Terjadi kesalahan saat menampilkan data. Coba muat ulang halaman.');
    
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-600 max-w-lg mx-auto p-6 rounded-lg shadow-lg text-center">
          <svg className="w-16 h-16 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.207-.833-2.976 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mt-4">Error Rendering Galeri</h2>
          <p className="text-white mt-2">Terjadi kesalahan saat menampilkan data. Coba muat ulang halaman.</p>
          <div className="mt-6 flex justify-center space-x-4">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100"
            >
              Muat Ulang Halaman
            </button>
            <button 
              onClick={() => router.push('/admin')} 
              className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }
}
