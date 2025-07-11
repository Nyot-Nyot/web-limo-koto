'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  deleteDoc
} from 'firebase/firestore';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
  PhotoIcon,
  EyeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { mockNewsData, NewsItem } from '@/data/newsData';
import NotificationModal from '@/components/admin/NotificationModal';



export default function AdminBeritaPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '', // Keep for backward compatibility and as summary
    tags: [] as string[],
    categoryColor: 'bg-gradient-to-r from-red-500 to-pink-600',
    imageSrc: '', // Thumbnail image only
    isFeatured: false,
    blocks: [] as {
      type: 'subheading' | 'text' | 'image' | 'video' | 'quote' | 'list';
      content?: string;
      url?: string;
      caption?: string;
      items?: string[];
    }[]
  });
  const [dragOver, setDragOver] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<NewsItem | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [currentBlockType, setCurrentBlockType] = useState<'subheading' | 'text' | 'image' | 'video' | 'quote' | 'list'>('text');
  const [currentBlockContent, setCurrentBlockContent] = useState('');
  const [currentBlockUrl, setCurrentBlockUrl] = useState('');
  const [currentBlockCaption, setCurrentBlockCaption] = useState('');
  const [currentListItems, setCurrentListItems] = useState<string[]>(['']);
  const [currentListItemInput, setCurrentListItemInput] = useState('');
  const [currentBlockImageFile, setCurrentBlockImageFile] = useState<File | null>(null);
  const [currentBlockImagePreview, setCurrentBlockImagePreview] = useState<string | null>(null);
  const [currentBlockVideoFile, setCurrentBlockVideoFile] = useState<File | null>(null);
  const [useVideoFile, setUseVideoFile] = useState(false);
  const [blockImageDragOver, setBlockImageDragOver] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: ''
  });
  
  // Show notification with improved visibility
  const showNotification = (type: 'success' | 'error', message: string) => {
    // First ensure any existing notification is hidden
    setNotification({ show: false, type: 'success', message: '' });
    
    // Use setTimeout to ensure state update happens in next tick
    setTimeout(() => {
      setNotification({ show: true, type, message });
    }, 100);
  };
  
  const [blockDragIndex, setBlockDragIndex] = useState<number | null>(null);
  const router = useRouter();

  // Client-side only code flag
  const [isClient, setIsClient] = useState(false);
  
  // Make sure FileReader operations only happen client-side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Handle file upload
  const handleFileUpload = (file: File) => {
    if (!isClient || !file || !file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setFormData({...formData, imageSrc: result});
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
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

  // Handle tag management
  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && 
        !formData.tags.includes(tag) && 
        formData.tags.length < 5 && 
        tag.length >= 2 && 
        tag.length <= 25) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
      setTagInput('');
    }
  };
  
  // Handle content image file upload
  const handleContentImageFileUpload = (file: File) => {
    if (!isClient || !file || !file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCurrentBlockUrl(result);
      setCurrentBlockImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  // Handle block image drag and drop
  const handleBlockImageDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setBlockImageDragOver(true);
  };

  const handleBlockImageDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setBlockImageDragOver(false);
  };

  const handleBlockImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setBlockImageDragOver(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      setCurrentBlockImageFile(files[0]);
      handleContentImageFileUpload(files[0]);
    }
  };

  // Handle block image input change
  const handleBlockImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Update the currentBlockImageFile state and handle upload
      setCurrentBlockImageFile(file);
      handleContentImageFileUpload(file);
    }
  };

  // Handle content video file upload
  const handleContentVideoFileUpload = (file: File) => {
    if (!isClient || !file || !file.type.startsWith('video/')) {
      console.warn('Invalid video file:', file);
      return;
    }
    
    // Check file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      showNotification('error', 'Ukuran video terlalu besar. Maksimal 100MB.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result && result.startsWith('data:video/')) {
        setCurrentBlockUrl(result);
        console.log('Video file successfully converted to base64');
      } else {
        console.error('Failed to convert video file to base64');
        showNotification('error', 'Gagal memproses file video. Silakan coba lagi.');
      }
    };
    reader.onerror = () => {
      console.error('Error reading video file');
      showNotification('error', 'Gagal membaca file video. Silakan coba lagi.');
    };
    reader.readAsDataURL(file);
  };

  // Handle block video input change
  const handleBlockVideoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Video file selected:', file.name, file.type, file.size);
      setCurrentBlockVideoFile(file);
      handleContentVideoFileUpload(file);
      
      // Reset the file input to allow selecting the same file again if needed
      e.target.value = '';
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({ 
      ...formData, 
      tags: formData.tags.filter(tag => tag !== tagToRemove) 
    });
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value.toLowerCase());
  };

  // Handle adding a new block
  const handleAddBlock = async () => {
    const newBlock: {
      type: 'subheading' | 'text' | 'image' | 'video' | 'quote' | 'list';
      content?: string;
      url?: string;
      caption?: string;
      items?: string[];
    } = {
      type: currentBlockType
    };
    
    switch (currentBlockType) {
      case 'subheading':
      case 'text':
      case 'quote':
        if (!currentBlockContent.trim()) return;
        newBlock.content = currentBlockContent;
        break;
      
      case 'image':
        // Check for either URL or uploaded image
        if (!currentBlockUrl.trim() && !currentBlockImagePreview) return;
        newBlock.url = currentBlockImagePreview || currentBlockUrl; // Prefer uploaded image
        newBlock.caption = currentBlockCaption;
        break;
        
      case 'video':
        // Check for either URL or uploaded video
        if (!currentBlockUrl.trim()) return;
        
        // For YouTube links, ensure they're in the right format
        if (!useVideoFile && (currentBlockUrl.includes('youtube.com') || currentBlockUrl.includes('youtu.be'))) {
          // Normalize YouTube URLs to standard format
          let videoId = '';
          
          if (currentBlockUrl.includes('v=')) {
            // Handle youtube.com/watch?v=ID format
            videoId = currentBlockUrl.split('v=')[1]?.split('&')[0] || '';
          } else if (currentBlockUrl.includes('youtu.be/')) {
            // Handle youtu.be/ID format
            videoId = currentBlockUrl.split('youtu.be/')[1]?.split('?')[0] || '';
          }
          
          if (videoId) {
            // Use the standard YouTube URL format
            newBlock.url = `https://www.youtube.com/watch?v=${videoId}`;
          } else {
            newBlock.url = currentBlockUrl;
          }
        } else {
          // For uploaded videos or other video platforms, ensure we use the processed URL
          // Make sure we don't have any File objects here
          if (currentBlockUrl.startsWith('data:video/')) {
            // This is already a base64 string, use as is
            newBlock.url = currentBlockUrl;
          } else {
            // This is a regular URL
            newBlock.url = currentBlockUrl;
          }
        }
        
        newBlock.caption = currentBlockCaption;
        break;
      
      case 'list':
        if (currentListItems.length === 0) return;
        newBlock.items = [...currentListItems];
        break;
    }
    
    setFormData({
      ...formData,
      blocks: [...formData.blocks, newBlock]
    });
    
    // Reset block form
    setCurrentBlockContent('');
    setCurrentBlockUrl('');
    setCurrentBlockCaption('');
    setCurrentListItems(['']);
    setCurrentListItemInput('');
    setCurrentBlockImageFile(null);
    setCurrentBlockImagePreview(null);
    setCurrentBlockVideoFile(null);
    setUseVideoFile(false);
  };
  
  // Handle removing a block
  const handleRemoveBlock = (index: number) => {
    const updatedBlocks = [...formData.blocks];
    updatedBlocks.splice(index, 1);
    setFormData({
      ...formData,
      blocks: updatedBlocks
    });
  };
  
  // Handle adding list item
  const handleAddListItem = () => {
    if (currentListItemInput.trim()) {
      setCurrentListItems([...currentListItems, currentListItemInput.trim()]);
      setCurrentListItemInput('');
    }
  };
  
  // Handle removing list item
  const handleRemoveListItem = (index: number) => {
    const updatedListItems = [...currentListItems];
    updatedListItems.splice(index, 1);
    setCurrentListItems(updatedListItems);
  };
  
  // Handle drag and drop for block reordering
  const handleDragStart = (index: number) => {
    setBlockDragIndex(index);
  };
  
  const handleDragOverBlock = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDropBlock = (targetIndex: number) => {
    if (blockDragIndex === null) return;
    
    const updatedBlocks = [...formData.blocks];
    const [movedBlock] = updatedBlocks.splice(blockDragIndex, 1);
    updatedBlocks.splice(targetIndex, 0, movedBlock);
    
    setFormData({
      ...formData,
      blocks: updatedBlocks
    });
    
    setBlockDragIndex(null);
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
          await fetchNewsFromFirestore();
        } catch (error) {
          console.error('Failed to fetch from Firestore:', error);
          // Fall back to localStorage if Firestore fails
          const savedData = localStorage.getItem('newsData');
          if (savedData) {
            try {
              const parsedData = JSON.parse(savedData);
              setNewsItems(parsedData);
              showNotification('error', 'Menggunakan data lokal karena masalah jaringan');
            } catch (e) {
              console.error('Error parsing localStorage data:', e);
              showNotification('error', 'Terjadi kesalahan saat memuat data');
            }
          } else {
            // Set default data if no localStorage data
            setNewsItems(mockNewsData);
            localStorage.setItem('newsData', JSON.stringify(mockNewsData));
            showNotification('error', 'Menggunakan data default karena masalah jaringan');
          }
        } finally {
          setIsLoading(false);
        }
      };
      
      loadData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // Function to fetch news data from Firestore
  const fetchNewsFromFirestore = async () => {
    setIsLoading(true);
    try {
      let retryCount = 0;
      const maxRetries = 3;
      
      // Retry mechanism for network issues
      while (retryCount < maxRetries) {
        try {
          console.log('Fetching news data from Firestore, attempt:', retryCount + 1);
          const snapshot = await getDocs(collection(db, 'berita'));
          
          if (!snapshot.docs || snapshot.docs.length === 0) {
            console.log('No news data found in Firestore, using default data');
            // If no data in Firestore, use default data
            setNewsItems(mockNewsData);
            localStorage.setItem('newsData', JSON.stringify(mockNewsData));
            break;
          }
          
          const data = snapshot.docs.map(doc => {
            const docData = doc.data();
            return {
              id: doc.id,
              title: typeof docData.title === 'string' ? docData.title : '',
              excerpt: typeof docData.excerpt === 'string' ? docData.excerpt : '',
              tags: Array.isArray(docData.tags) ? docData.tags : [],
              categoryColor: typeof docData.categoryColor === 'string' ? docData.categoryColor : 'bg-gradient-to-r from-red-500 to-pink-600',
              imageSrc: typeof docData.imageSrc === 'string' ? docData.imageSrc : '',
              isFeatured: typeof docData.isFeatured === 'boolean' ? docData.isFeatured : false,
              blocks: Array.isArray(docData.blocks) ? docData.blocks : [],
              href: typeof docData.href === 'string' ? docData.href : `/berita/${doc.id}`,
              date: typeof docData.date === 'string' ? docData.date : new Date().toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              }),
              views: typeof docData.views === 'number' ? docData.views : 0,
              category: typeof docData.category === 'string' ? docData.category : 'trending',
              backgroundGradient: typeof docData.backgroundGradient === 'string' ? docData.backgroundGradient : 'bg-gradient-to-br from-blue-400 to-blue-600',
              emoji: typeof docData.emoji === 'string' ? docData.emoji : '📰'
            } as NewsItem;
          });
          
          // Check if there are any items with extremely large image data
          const isDataTooLarge = data.some(item => {
            // Check if base64 image is too large (over 1MB)
            if (item.imageSrc && item.imageSrc.length > 1000000) {
              console.warn(`Large image detected in item '${item.title}'. Consider optimizing.`);
              return true;
            }
            return false;
          });
          
          if (isDataTooLarge) {
            console.warn('Some images are very large. This may cause performance issues.');
          }
          
          setNewsItems(data);
          console.log('Successfully fetched', data.length, 'news items from Firestore');
          
          // Update localStorage for offline fallback - but be careful with large data
          try {
            localStorage.setItem('newsData', JSON.stringify(data));
          } catch (storageError) {
            console.error('Failed to store news data in localStorage (likely too large):', storageError);
            // Try to store without images if it fails
            const dataWithoutImages = data.map(item => ({
              ...item,
              imageSrc: item.imageSrc ? item.imageSrc.substring(0, 100) + '...' : '' // Store just the beginning to keep the format
            }));
            localStorage.setItem('newsData', JSON.stringify(dataWithoutImages));
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
      console.error('Error fetching news data after all retries:', error);
      showNotification('error', 'Gagal mengambil data berita dari server');
      
      // Fall back to localStorage if Firestore fails
      const savedData = localStorage.getItem('newsData');
      if (savedData) {
        try {
          console.log('Using data from localStorage instead');
          const parsedData = JSON.parse(savedData);
          setNewsItems(parsedData);
          showNotification('error', 'Menggunakan data lokal karena masalah jaringan');
        } catch (e) {
          console.error('Error parsing localStorage data:', e);
          // Use default data as last resort
          console.log('Using default news data as last resort');
          setNewsItems(mockNewsData);
          showNotification('error', 'Menggunakan data default');
        }
      } else {
        // Set default data if no localStorage data
        console.log('No data in localStorage, using default news data');
        setNewsItems(mockNewsData);
        showNotification('error', 'Menggunakan data default');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.excerpt.trim()) {
      showNotification('error', 'Judul dan excerpt harus diisi!');
      return;
    }

    if (formData.tags.length === 0) {
      showNotification('error', 'Minimal harus ada 1 tag!');
      return;
    }

    // Check for duplicate title (excluding current item when editing)
    const isDuplicate = newsItems.some(item => 
      item.title.toLowerCase().trim() === formData.title.toLowerCase().trim() &&
      (editingItem ? item.id !== editingItem.id : true)
    );

    if (isDuplicate) {
      showNotification('error', `Berita dengan judul "${formData.title}" sudah ada!`);
      return;
    }
    
    // Check if there's already a featured article when trying to set a new one
    if (formData.isFeatured) {
      const existingFeatured = newsItems.find(item => 
        item.isFeatured && (!editingItem || item.id !== editingItem.id)
      );
      
      if (existingFeatured) {
        showNotification('error', `Hanya dapat memiliki 1 berita utama! Artikel "${existingFeatured.title}" saat ini ditetapkan sebagai berita utama.`);
        return;
      }
    }
    
    // First close the modal to avoid UI conflicts
    setIsModalOpen(false);
    
    try {
      // Show loading indicator before saving to Firestore
      setIsLoading(true);
      
      // Process blocks to ensure all data is properly formatted and no File objects remain
      console.log('Processing blocks before saving to Firestore:', formData.blocks);
      
      const processedBlocks = await Promise.all(
        formData.blocks.map(async (block) => {
          const processedBlock = { ...block };
          
          // Remove any File objects and ensure proper data format
          if (block.type === 'video' && block.url) {
            console.log('Processing video block:', block.url.substring(0, 50) + '...');
            // For video blocks, ensure we only save the URL string, not File objects
            if (block.url.startsWith('data:video/')) {
              // This is a base64 video, keep as is
              processedBlock.url = block.url;
            } else {
              // This is a URL, keep as is
              processedBlock.url = block.url;
            }
          }
          
          if (block.type === 'image' && block.url) {
            console.log('Processing image block:', block.url.substring(0, 50) + '...');
            // For image blocks, ensure we only save the URL string, not File objects
            if (block.url.startsWith('data:image/')) {
              // This is a base64 image, keep as is
              processedBlock.url = block.url;
            } else {
              // This is a URL, keep as is
              processedBlock.url = block.url;
            }
          }
          
          // Ensure no File objects or other complex objects remain
          Object.keys(processedBlock).forEach(key => {
            const value = processedBlock[key as keyof typeof processedBlock];
            if (value && typeof value === 'object' && value.constructor === File) {
              console.warn(`File object detected in block ${key}, removing...`);
              delete processedBlock[key as keyof typeof processedBlock];
            }
          });
          
          return processedBlock;
        })
      );
      
      console.log('Processed blocks:', processedBlocks);
      
      // Additional validation: check for any remaining File objects in the entire structure
      const validateNoFileObjects = (obj: unknown, path = ''): boolean => {
        if (obj && typeof obj === 'object') {
          if (obj.constructor === File) {
            console.error(`File object found at path: ${path}`);
            return false;
          }
          if (Array.isArray(obj)) {
            return obj.every((item, index) => validateNoFileObjects(item, `${path}[${index}]`));
          }
          return Object.keys(obj).every(key => validateNoFileObjects((obj as Record<string, unknown>)[key], `${path}.${key}`));
        }
        return true;
      };
      
      if (!validateNoFileObjects(processedBlocks, 'blocks')) {
        throw new Error('File objects detected in blocks array. Please try again.');
      }
      
      // Log the final data structure before saving
      console.log('Final news data structure:', {
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        tags: formData.tags.map(tag => tag.trim()),
        blocks: processedBlocks,
        blocksCount: processedBlocks.length
      });
      
      // Prepare the data to save including href property
      const newsData: Omit<NewsItem, 'id'> = {
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        tags: formData.tags.map(tag => tag.trim()),
        categoryColor: formData.categoryColor || 'bg-gradient-to-r from-red-500 to-pink-600',
        imageSrc: formData.imageSrc || '',
        isFeatured: Boolean(formData.isFeatured),
        blocks: processedBlocks,
        category: formData.tags[0]?.trim() || 'trending',
        backgroundGradient: 'bg-gradient-to-br from-blue-400 to-blue-600',
        emoji: '📰',
        date: editingItem?.date || new Date().toLocaleDateString('id-ID', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        }),
        views: editingItem?.views || 0,
        href: ''  // Will be set later based on document ID
      };

      let docRef;
      
      if (editingItem && typeof editingItem.id === 'string') {
        // Update existing news item in Firestore
        docRef = doc(db, 'berita', editingItem.id);
        newsData.href = `/berita/${editingItem.id}`;
        await updateDoc(docRef, newsData);
        showNotification('success', 'Data berita berhasil diperbarui!');
      } else {
        // Add new news item to Firestore
        const collectionRef = collection(db, 'berita');
        docRef = await addDoc(collectionRef, {
          ...newsData,
          href: '' // Temporary value, will be updated after getting document ID
        });
        
        // Update with the new href after getting document ID
        const newHref = `/berita/${docRef.id}`;
        await updateDoc(docRef, { href: newHref });
        showNotification('success', 'Data berita berhasil ditambahkan!');
      }
      
      // Refresh data from Firestore with retry mechanism
      let retries = 3;
      while (retries > 0) {
        try {
          await fetchNewsFromFirestore();
          break;
        } catch (error) {
          retries--;
          if (retries === 0) {
            throw error;
          }
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'berita' } }));
      
      // Clean up state with extra care for file references
      setTimeout(() => {
        setEditingItem(null);
        setImagePreview(null);
        setFormData({
          title: '',
          excerpt: '',
          tags: [],
          categoryColor: 'bg-gradient-to-r from-red-500 to-pink-600',
          imageSrc: '',
          isFeatured: false,
          blocks: []
        });
        setTagInput('');
        setCurrentBlockContent('');
        setCurrentBlockUrl('');
        setCurrentBlockCaption('');
        setCurrentListItems(['']);
        setCurrentListItemInput('');
        setCurrentBlockImageFile(null);
        setCurrentBlockImagePreview(null);
        setCurrentBlockVideoFile(null);
        setUseVideoFile(false);
        
        // Additional cleanup for any remaining file references
        console.log('Form state cleaned up after successful save');
      }, 500);
    } catch (error) {
      console.error('Error saving news data:', error);
      
      // Provide more specific error messages based on the error type
      let errorMessage = 'Terjadi kesalahan saat menyimpan data berita. Silakan coba lagi.';
      
      if (error instanceof Error) {
        if (error.message.includes('File objects detected')) {
          errorMessage = 'Terjadi kesalahan dengan file yang diunggah. Silakan coba unggah ulang file dan simpan kembali.';
        } else if (error.message.includes('invalid nested entity')) {
          errorMessage = 'Terjadi kesalahan dengan format data. Silakan periksa kembali file gambar/video yang diunggah.';
        } else if (error.message.includes('document to update')) {
          errorMessage = 'Dokumen yang akan diperbarui tidak ditemukan. Silakan refresh halaman dan coba lagi.';
        }
      }
      
      showNotification('error', errorMessage);
      
      // Reopen modal if there was an error
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    
    // Create default blocks from excerpt if no blocks exist
    const initialBlocks = item.blocks || [];
    
    // If there are no blocks but there is an excerpt, create a text block from it
    // Note: We're keeping excerpt as a separate field for backward compatibility
    // and summary purposes, not adding it as a block
    
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      tags: item.tags || [item.category], // Use existing tags or convert category to tag
      categoryColor: item.categoryColor,
      imageSrc: item.imageSrc || '',
      isFeatured: item.isFeatured || false,
      blocks: initialBlocks
    });
    
    setImagePreview(item.imageSrc || null);
    setCurrentBlockType('text');
    setCurrentBlockContent('');
    setCurrentBlockUrl('');
    setCurrentBlockCaption('');
    setCurrentListItems(['']);
    setCurrentListItemInput('');
    setIsModalOpen(true);
  };

  const handleDelete = (item: NewsItem) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  // Improved delete confirmation with proper notification
  const confirmDelete = async () => {
    if (itemToDelete && typeof itemToDelete.id === 'string') {
      try {
        // First hide the confirmation dialog
        setShowDeleteConfirm(false);
        
        // Delete from Firestore
        const docRef = doc(db, 'berita', itemToDelete.id);
        await deleteDoc(docRef);
        
        // Update local state
        const updatedData = newsItems.filter(item => item.id !== itemToDelete.id);
        setNewsItems(updatedData);
        
        // Update localStorage for fallback
        localStorage.setItem('newsData', JSON.stringify(updatedData));
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'berita' } }));
        
        showNotification('success', `Berita "${itemToDelete.title}" berhasil dihapus!`);
      } catch (error) {
        console.error('Error deleting news item:', error);
        showNotification('error', 'Gagal menghapus data berita');
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
    setFormData({
      title: '',
      excerpt: '',
      tags: [],
      categoryColor: 'bg-gradient-to-r from-red-500 to-pink-600',
      imageSrc: '',
      isFeatured: false,
      blocks: []
    });
    setImagePreview(null);
    setTagInput('');
    setCurrentBlockType('text');
    setCurrentBlockContent('');
    setCurrentBlockUrl('');
    setCurrentBlockCaption('');
    setCurrentListItems(['']);
    setCurrentListItemInput('');
    setCurrentBlockImageFile(null);
    setCurrentBlockImagePreview(null);
    setCurrentBlockVideoFile(null);
    setUseVideoFile(false);
    setIsModalOpen(true);
  };

  // Filter items based on tags and search
  const filteredItems = newsItems.filter(item => {
    const matchesTag = selectedCategory === 'all' || 
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()))) ||
      item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  if (!isAuthenticated || isLoading) {
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
                Kelola Berita Nagari
              </h1>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Tambah Berita</span>
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
            <p className="mt-4 text-lg text-white font-medium">Memuat data berita...</p>
          </div>
        ) : (
          <>
        {/* Filter & Search Controls */}
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Filter Tag
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="all">Semua Tag</option>
                {Array.from(new Set(newsItems.flatMap(item => item.tags || [item.category]))).map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
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
                placeholder="Cari berdasarkan judul atau excerpt..."
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
                {newsItems.length}
              </div>
              <div className="text-sm text-gray-300">Total Berita</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-400">
                {newsItems.filter(item => item.isFeatured).length}
              </div>
              <div className="text-sm text-gray-300">Featured</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-400">
                {newsItems.reduce((total, item) => total + item.views, 0)}
              </div>
              <div className="text-sm text-gray-300">Total Views</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-400">
                {newsItems.filter(item => item.imageSrc).length}
              </div>
              <div className="text-sm text-gray-300">Dengan Gambar</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-400">
                {newsItems.filter(item => !item.imageSrc).length}
              </div>
              <div className="text-sm text-gray-300">Tanpa Gambar</div>
            </div>
          </div>
        </div>

        {/* News Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col">
              {/* News Preview */}
              <div className="relative aspect-[4/3] flex-shrink-0">
                {item.imageSrc ? (
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="w-full h-full"
                  />
                ) : (
                  <div className={`w-full h-full ${item.backgroundGradient} flex items-center justify-center`}>
                    <span className="text-white text-4xl">{item.emoji}</span>
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 ${item.categoryColor} text-white text-xs font-semibold rounded-full`}>
                    {item.category}
                  </span>
                </div>
                {item.isFeatured && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col h-full">
                {/* Title and excerpt */}
                <div>
                  <h3 className="text-lg font-bold text-yellow-400 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
                
                {/* Spacer to push content to the bottom */}
                <div className="flex-grow"></div>
                
                {/* Tags - positioned in the middle */}
                <div className="flex flex-wrap gap-1 mb-5">
                  {(item.tags || [item.category]).slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-700 text-white text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                  {(item.tags || [item.category]).length > 3 && (
                    <span className="px-3 py-1 bg-gray-600 text-white text-xs rounded-full">
                      +{(item.tags || [item.category]).length - 3}
                    </span>
                  )}
                </div>
                
                {/* Stats - closer to the action buttons */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <EyeIcon className="w-4 h-4" />
                    <span>{item.views} views</span>
                  </div>
                </div>

                {/* Action Buttons - always at the bottom */}
                <div className="flex space-x-2 mt-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors text-xs flex-1"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="flex items-center space-x-1 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors text-xs flex-1"
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
              {searchTerm || selectedCategory !== 'all' 
                ? 'Tidak ada berita yang sesuai dengan filter'
                : 'Belum ada berita'
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
            <div className="bg-gray-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingItem ? 'Edit Berita' : 'Tambah Berita'}
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
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Judul Berita *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                      placeholder="Masukkan judul berita"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Tags * (Maksimal 5 tag)
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={handleTagInputChange}
                      onKeyPress={handleTagKeyPress}
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                      placeholder="Masukkan tag (misal: ekonomi, sosial, budaya)"
                      disabled={formData.tags.length >= 5}
                      maxLength={20}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      disabled={!tagInput.trim() || formData.tags.length >= 5 || formData.tags.includes(tagInput.trim().toLowerCase()) || tagInput.length < 2}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Tambah
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-gray-400 hover:text-white"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">
                    {formData.tags.length}/5 tag • Gunakan kata kunci (2-25 karakter) • Tekan Enter atau koma untuk menambah
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Excerpt/Ringkasan *
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    rows={4}
                    placeholder="Masukkan ringkasan berita"
                    required
                  />
                </div>



                <div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium text-gray-300">
                      Jadikan Berita Utama (Featured)
                    </label>
                  </div>
                  <p className="text-xs text-yellow-500 mt-1 ml-6">
                    {editingItem && editingItem.isFeatured ? 
                      'Artikel ini saat ini ditampilkan sebagai berita utama di halaman berita.' :
                      `Hanya bisa memiliki 1 berita utama. ${
                        newsItems.some(item => item.isFeatured) ? 
                        'Saat ini sudah ada berita utama yang ditetapkan.' : 
                        'Saat ini belum ada berita utama.'
                      }`
                    }
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Gambar Thumbnail <span className="text-yellow-400">(Hanya satu gambar utama)</span>
                  </label>
                  
                  {imagePreview ? (
                    /* Image Preview with Remove Option */
                    <div className="mb-4">
                      <div className="relative aspect-[4/3] bg-gray-700 rounded-lg overflow-hidden">
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
                            setFormData({ ...formData, imageSrc: '' });
                          }}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm text-gray-400 mt-2 text-center">
                        Klik tombol × untuk menghapus gambar thumbnail
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
                          Klik untuk memilih gambar thumbnail atau drag & drop
                        </p>
                        <p className="text-sm text-gray-500">
                          Format: JPG, PNG, GIF (Max: 5MB)
                        </p>
                      </label>
                    </div>
                  )}
                </div>

                {/* Blocks Section */}
                <div className="border-t border-gray-700 pt-6 mt-6">
                  <label className="block text-lg font-medium text-yellow-400 mb-1">
                    Konten Berita (Block Editor)
                  </label>
                  <p className="text-sm text-gray-400 mb-3">
                    Tambahkan berbagai jenis konten berita dalam blok-blok yang dapat diatur ulang
                  </p>
                  
                  {/* Block Type Selector */}
                  <div className="bg-gray-800 p-4 rounded-lg mb-4 border border-gray-700">
                    <h4 className="font-medium text-yellow-400 mb-3">Pilih Jenis Blok Konten</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                      <button
                        type="button"
                        onClick={() => setCurrentBlockType('text')}
                        className={`p-3 rounded border ${currentBlockType === 'text' ? 'border-blue-500 bg-blue-900/30' : 'border-gray-600'} flex flex-col items-center hover:bg-gray-700 transition-colors`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mb-1" viewBox="0 0 16 16">
                          <path d="M2 10.5a.5.5 0 0 1 .5-.5h3.793L3.146 6.854a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L7.293 11H2.5a.5.5 0 0 1-.5-.5zm4.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-3zm5 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-3z"/>
                        </svg>
                        <span className="text-sm">Paragraf Teks</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentBlockType('subheading')}
                        className={`p-3 rounded border ${currentBlockType === 'subheading' ? 'border-blue-500 bg-blue-900/30' : 'border-gray-600'} flex flex-col items-center hover:bg-gray-700 transition-colors`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mb-1" viewBox="0 0 16 16">
                          <path d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73h-.946v1.867h1.248V13H9.66V4.007h3.752v1.04h-2.15v3.68z"/>
                        </svg>
                        <span className="text-sm">Subjudul</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentBlockType('quote')}
                        className={`p-3 rounded border ${currentBlockType === 'quote' ? 'border-blue-500 bg-blue-900/30' : 'border-gray-600'} flex flex-col items-center hover:bg-gray-700 transition-colors`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mb-1" viewBox="0 0 16 16">
                          <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
                        </svg>
                        <span className="text-sm">Kutipan</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentBlockType('image')}
                        className={`p-3 rounded border ${currentBlockType === 'image' ? 'border-blue-500 bg-blue-900/30' : 'border-gray-600'} flex flex-col items-center hover:bg-gray-700 transition-colors`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mb-1" viewBox="0 0 16 16">
                          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                          <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                        </svg>
                        <span className="text-sm">Gambar Konten</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentBlockType('video')}
                        className={`p-3 rounded border ${currentBlockType === 'video' ? 'border-blue-500 bg-blue-900/30' : 'border-gray-600'} flex flex-col items-center hover:bg-gray-700 transition-colors`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mb-1" viewBox="0 0 16 16">
                          <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                        </svg>
                        <span className="text-sm">Video</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentBlockType('list')}
                        className={`p-3 rounded border ${currentBlockType === 'list' ? 'border-blue-500 bg-blue-900/30' : 'border-gray-600'} flex flex-col items-center hover:bg-gray-700 transition-colors`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mb-1" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                        </svg>
                        <span className="text-sm">Daftar Item</span>
                      </button>
                    </div>
                    <div className="flex justify-between items-center bg-gray-700 p-3 rounded-md">
                      <div className="text-sm text-gray-300">
                        Jenis yang dipilih: <span className="text-white font-semibold">
                        {currentBlockType === 'subheading' ? 'Subjudul' : 
                         currentBlockType === 'text' ? 'Paragraf Teks' :
                         currentBlockType === 'quote' ? 'Kutipan' :
                         currentBlockType === 'image' ? 'Gambar Konten' :
                         currentBlockType === 'video' ? 'Video' :
                         'Daftar Item'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddBlock}
                        className="flex items-center space-x-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <PlusIcon className="h-4 w-4" />
                        <span>Tambah Blok</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Render current block form based on type */}
                  <div className="mb-4">
                    {currentBlockType === 'text' && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                              <path d="M2 10.5a.5.5 0 0 1 .5-.5h3.793L3.146 6.854a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L7.293 11H2.5a.5.5 0 0 1-.5-.5zm4.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-3zm5 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-3z"/>
                        </svg>
                          </div>
                          <p className="text-sm text-white">Paragraf Teks</p>
                        </div>
                        <textarea
                          value={currentBlockContent}
                          onChange={(e) => setCurrentBlockContent(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                          rows={4}
                          placeholder="Tulis paragraf teks berita di sini..."
                        />
                      </div>
                    )}
                    
                    {currentBlockType === 'subheading' && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                              <path d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73h-.946v1.867h1.248V13H9.66V4.007h3.752v1.04h-2.15v3.68z"/>
                            </svg>
                          </div>
                          <p className="text-sm text-white">Subjudul</p>
                        </div>
                        <input
                          type="text"
                          value={currentBlockContent}
                          onChange={(e) => setCurrentBlockContent(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                          placeholder="Tulis subjudul berita di sini..."
                        />
                      </div>
                    )}
                    
                    {currentBlockType === 'quote' && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                              <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
                            </svg>
                          </div>
                          <p className="text-sm text-white">Kutipan</p>
                        </div>
                        <textarea
                          value={currentBlockContent}
                          onChange={(e) => setCurrentBlockContent(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 border-l-4 border-l-purple-500 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white italic"
                          rows={3}
                          placeholder="Masukkan kutipan di sini..."
                        />
                      </div>
                    )}
                    
                    {currentBlockType === 'image' && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                              <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                        </svg>
                          </div>
                          <p className="text-sm text-white">Tambahkan Gambar Konten</p>
                        </div>
                        {/* Drag & Drop Area for Content Images */}
                        <div
                          onDragOver={handleBlockImageDragOver}
                          onDragLeave={handleBlockImageDragLeave}
                          onDrop={handleBlockImageDrop}
                          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                            blockImageDragOver 
                              ? 'border-blue-400 bg-blue-400/10' 
                              : 'border-gray-600 bg-gray-700/50'
                          }`}
                        >
                          {currentBlockImagePreview ? (
                            <div className="space-y-4">
                              <div className="relative w-48 h-48 mx-auto">
                                <Image
                                  src={currentBlockImagePreview}
                                  alt="Preview"
                                  fill
                                  style={{ objectFit: 'contain' }}
                                  className="rounded-md"
                                />
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm text-green-400">✓ Gambar berhasil dipilih</p>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setCurrentBlockImageFile(null);
                                    setCurrentBlockImagePreview(null);
                                    setCurrentBlockUrl('');
                                  }}
                                  className="text-xs text-red-400 hover:text-red-300"
                                >
                                  Hapus gambar
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto" />
                              <div className="space-y-2">
                                <p className="text-sm text-gray-300">
                                  Drag & drop gambar di sini atau
                                </p>
                                <label className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer transition-colors">
                                  <span className="text-sm">Pilih gambar</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBlockImageInputChange}
                                    className="hidden"
                                  />
                                </label>
                              </div>
                              <p className="text-xs text-gray-400">
                                Format yang didukung: JPG, PNG, GIF (Max 5MB)
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <input
                          type="text"
                          value={currentBlockCaption}
                          onChange={(e) => setCurrentBlockCaption(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                          placeholder="Masukkan keterangan (opsional)"
                        />
                        <p className="text-xs text-gray-400 mt-2">
                          Untuk gambar dalam konten berita. Thumbnail utama ditentukan di bagian atas.
                        </p>
                      </div>
                    )}
                    
                    {currentBlockType === 'video' && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                        </svg>
                          </div>
                          <p className="text-sm text-white">Tambahkan Video</p>
                        </div>
                       
                        <div className="flex items-center justify-center space-x-4 mb-4">
                          <button
                            type="button"
                            onClick={() => setUseVideoFile(false)}
                            className={`px-4 py-2 rounded-md ${!useVideoFile ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                          >
                            URL Video
                          </button>
                          <button
                            type="button"
                            onClick={() => setUseVideoFile(true)}
                            className={`px-4 py-2 rounded-md ${useVideoFile ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                          >
                            Upload Video
                          </button>
                        </div>
                        
                        {!useVideoFile ? (
                          <div className="mb-4">
                            <input
                              type="text"
                              value={currentBlockUrl}
                              onChange={(e) => setCurrentBlockUrl(e.target.value)}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white mb-2"
                              placeholder="Contoh: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            />
                            <p className="text-xs text-gray-400 mt-1 mb-4">
                              Masukkan URL video dari YouTube, Vimeo, atau platform lainnya.
                            </p>
                          </div>
                        ) : (
                          <div className="mb-4">
                            {currentBlockVideoFile ? (
                              <div className="p-4 bg-gray-700 rounded-md mb-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm text-green-400">✓ Video berhasil dipilih</p>
                                    <p className="text-xs text-gray-300">{currentBlockVideoFile.name}</p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCurrentBlockVideoFile(null);
                                      setCurrentBlockUrl('');
                                    }}
                                    className="text-xs text-red-400 hover:text-red-300"
                                  >
                                    Hapus video
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center p-6 bg-gray-700 rounded-md mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <label className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md cursor-pointer transition-colors">
                                  <span className="text-sm">Pilih video</span>
                                  <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleBlockVideoInputChange}
                                    className="hidden"
                                  />
                                </label>
                                <p className="text-xs text-gray-400 mt-2">
                                  Format yang didukung: MP4, WebM, OGG (Max 100MB)
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <input
                          type="text"
                          value={currentBlockCaption}
                          onChange={(e) => setCurrentBlockCaption(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white"
                          placeholder="Masukkan keterangan video (opsional)"
                        />
                      </div>
                    )}
                    
                    {currentBlockType === 'list' && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                        </svg>
                          </div>
                          <p className="text-sm text-white">Daftar Item</p>
                        </div>
                        <div className="space-y-4">
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={currentListItemInput}
                              onChange={(e) => setCurrentListItemInput(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && currentListItemInput.trim()) {
                                  e.preventDefault();
                                  handleAddListItem();
                                }
                              }}
                              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                              placeholder="Masukkan item daftar"
                            />
                            <button
                              type="button"
                              onClick={handleAddListItem}
                              disabled={!currentListItemInput.trim()}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                            >
                              Tambah Item
                            </button>
                          </div>
                          <div className="bg-gray-700 p-3 rounded-lg">
                            <h5 className="text-sm text-gray-300 mb-2">Item dalam daftar ({currentListItems.length})</h5>
                            {currentListItems.length > 0 ? (
                              <ul className="space-y-2">
                                {currentListItems.map((item, index) => (
                                  <li
                                    key={index}
                                    className="bg-gray-800 text-white px-3 py-2 rounded-md flex items-center justify-between"
                                  >
                                    <div className="flex items-center">
                                      <span className="w-6 h-6 bg-orange-600 text-white rounded-full mr-2 flex items-center justify-center text-xs">
                                        {index + 1}
                                      </span>
                                      <span>{item}</span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveListItem(index)}
                                      className="text-gray-400 hover:text-white p-1 hover:bg-red-500 hover:bg-opacity-20 rounded-full"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-400 text-center py-2">Belum ada item dalam daftar</p>
                            )
                          }
                          </div>
                        </div>
                      </div>
                    )}
                  </div>                    {/* Block list heading */}
                  {formData.blocks.length > 0 && (
                    <div className="flex justify-between items-center bg-gray-800 p-3 rounded-t-lg">
                      <h4 className="font-medium text-white">
                        Blok Konten ({formData.blocks.length})
                      </h4>
                      <div className="text-xs text-gray-400">
                        <span className="text-yellow-400">Tip:</span> Seret dan lepas blok untuk mengatur ulang
                      </div>
                    </div>
                  )}
                  
                  {/* Render added blocks */}
                  <div className={`space-y-3 ${formData.blocks.length > 0 ? 'bg-gray-800 p-3 rounded-b-lg mb-5' : ''}`}>
                    {formData.blocks.length === 0 ? (
                      <div className="bg-gray-800 p-5 rounded-lg text-center">
                        <p className="text-gray-400">Belum ada blok konten. Tambahkan blok untuk membuat konten berita.</p>
                      </div>
                    ) : (
                      formData.blocks.map((block, index) => (
                        <div 
                          key={index} 
                          className={`bg-gray-700 p-4 rounded-lg border-l-4 relative shadow-md
                            ${block.type === 'text' ? 'border-green-500' : 
                             block.type === 'subheading' ? 'border-yellow-500' : 
                             block.type === 'quote' ? 'border-purple-500' :
                             block.type === 'image' ? 'border-blue-500' :
                             block.type === 'video' ? 'border-red-500' :
                             'border-orange-500'}`}
                          draggable={true}
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={handleDragOverBlock}
                          onDrop={() => handleDropBlock(index)}
                        >
                          <div className="absolute top-2 right-2 bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded-md flex items-center gap-1">
                            <span className={`inline-block w-3 h-3 rounded-full
                              ${block.type === 'text' ? 'bg-green-500' : 
                               block.type === 'subheading' ? 'bg-yellow-500' : 
                               block.type === 'quote' ? 'bg-purple-500' :
                               block.type === 'image' ? 'bg-blue-500' :
                               block.type === 'video' ? 'bg-red-500' :
                               'bg-orange-500'}`}></span>
                            {block.type === 'subheading' ? 'Subjudul' : 
                             block.type === 'text' ? 'Teks' :
                             block.type === 'quote' ? 'Kutipan' :
                             block.type === 'image' ? 'Gambar' :
                             block.type === 'video' ? 'Video' :
                             'Daftar'}
                          </div>
                          
                          {/* Block content based on type */}
                          <div className="pt-6">
                            {block.type === 'text' && (
                              <p className="text-white">{block.content}</p>
                            )}
                            
                            {block.type === 'subheading' && (
                              <h4 className="text-lg font-semibold text-yellow-400">{block.content}</h4>
                            )}
                            
                            {block.type === 'quote' && (
                              <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-300">
                                &ldquo;{block.content}&rdquo;
                              </blockquote>
                            )}
                            
                            {block.type === 'image' && block.url && (
                              <div className="relative aspect-[4/3] bg-gray-600 rounded-lg overflow-hidden">
                                <Image
                                  src={block.url}
                                  alt={block.caption || 'Image'}
                                  fill
                                  style={{ objectFit: 'cover' }}
                                  className="w-full h-full"
                                />
                                {block.caption && (
                                  <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2 text-center rounded-b-lg">
                                    {block.caption}
                                  </p>
                                )}
                              </div>
                            )}
                            
                            {block.type === 'video' && block.url && (
                              <div className="relative aspect-video bg-gray-600 rounded-lg overflow-hidden">
                                {/* Handle YouTube or uploaded video */}
                                {block.url.includes('youtube.com') || block.url.includes('youtu.be') ? (
                                  <>
                                    <Image
                                      src={`https://img.youtube.com/vi/${
                                        block.url.includes('v=') 
                                          ? block.url.split('v=')[1]?.split('&')[0] 
                                          : block.url.split('youtu.be/')[1]?.split('?')[0] || 'dQw4w9WgXcQ'
                                      }/hqdefault.jpg`}
                                      alt="Video thumbnail"
                                      fill
                                      style={{ objectFit: 'cover' }}
                                      className="w-full h-full"
                                    />
                                    <a
                                      href={block.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-40 text-white font-semibold rounded-lg"
                                    >
                                      <div className="flex flex-col items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="mb-2" viewBox="0 0 16 16">
                                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                          <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
                                        </svg>
                                        <span>Tonton di YouTube</span>
                                      </div>
                                    </a>
                                  </>
                                ) : block.url.includes('vimeo.com') ? (
                                  <>
                                    <div className="bg-blue-900 w-full h-full flex items-center justify-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="white" viewBox="0 0 16 16">
                                        <path d="M15.992 4.204c-.071 1.556-1.158 3.687-3.262 6.393-2.175 2.829-4.016 4.243-5.522 4.243-.933 0-1.722-.861-2.367-2.583L3.55 7.523C3.07 5.8 2.556 4.94 2.007 4.94c-.118 0-.537.253-1.254.754L0 4.724a209.56 209.56 0 0 0 2.334-2.081c1.054-.91 1.845-1.388 2.373-1.437 1.243-.123 2.01.728 2.298 2.553.31 1.968.526 3.19.646 3.666.36 1.631.756 2.446 1.186 2.445.334 0 .836-.53 1.508-1.587.671-1.058 1.03-1.863 1.077-2.415.096-.913-.263-1.37-1.077-1.37a3.022 3.022 0 0 0-1.185.261c.789-2.573 2.291-3.825 4.508-3.756 1.644.05 2.419 1.117 2.324 3.2z"/>
                                      </svg>
                                    </div>
                                    <a
                                      href={block.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-40 text-white font-semibold rounded-lg"
                                    >
                                      <div className="flex flex-col items-center">
                                        <span>Tonton di Vimeo</span>
                                      </div>
                                    </a>
                                  </>
                                ) : block.url.startsWith('data:video/') ? (
                                  <video controls className="w-full h-full">
                                    <source src={block.url} type="video/mp4" />
                                    Browser Anda tidak mendukung tag video.
                                  </video>
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="white" viewBox="0 0 16 16">
                                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                      <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
                                    </svg>
                                    <a
                                      href={block.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="absolute inset-0 flex items-center justify-center"
                                    >
                                      <span className="sr-only">Tonton Video</span>
                                    </a>
                                  </div>
                                )}
                                {block.caption && (
                                  <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-sm p-2 text-center">
                                    {block.caption}
                                  </p>
                                )}
                              </div>
                            )}
                            
                            {block.type === 'list' && block.items && (
                              <ul className="list-disc list-inside space-y-1 ml-2">
                                {block.items.map((item, idx) => (
                                  <li key={idx} className="text-gray-300">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          
                          {/* Block actions */}
                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-600">
                            <div className="flex items-center space-x-2 text-gray-400 cursor-grab bg-gray-800 px-3 py-1 rounded-md">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grip-vertical" viewBox="0 0 16 16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7 2a1 1 0 1 1-2  0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                              </svg>
                              <span className="text-xs">Seret</span>
                            </div>
                            
                            <div className="flex space-x-2">
                              <div className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-md">
                                Blok #{index + 1}
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveBlock(index)}
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors text-xs flex items-center space-x-1"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                                <span>Hapus</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
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

      {/* Error handling is now done through the notification system */}

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
                  <p className="text-sm text-gray-300">Apakah Anda yakin ingin menghapus berita ini?</p>
                </div>
              </div>
              
              <div className="mb-6 bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="relative w-16 h-16 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                    {itemToDelete.imageSrc ? (
                      <Image
                        src={itemToDelete.imageSrc}
                        alt={itemToDelete.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="w-full h-full"
                      />
                    ) : (
                      <div className={`w-full h-full ${itemToDelete.backgroundGradient} flex items-center justify-center`}>
                        <span className="text-white text-xl">{itemToDelete.emoji}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold truncate">{itemToDelete.title}</h4>
                    <p className="text-gray-400 text-sm">
                      {itemToDelete.category} • {itemToDelete.views} views
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
      
      {/* Success/Error Notification Modal - Positioned at root level with highest z-index */}
      <div className="relative" style={{ zIndex: 9999 }}>
        <NotificationModal 
          show={notification.show}
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification({ show: false, type: 'success', message: '' })}
        />
      </div>
    </div>
  );
}
// End of AdminBeritaPage component
