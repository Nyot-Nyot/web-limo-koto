'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import NotificationModal from '@/components/admin/NotificationModal';

interface FAQData {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const categoryOptions = [
  'Administrasi',
  'Pelayanan Publik',
  'Kependudukan',
  'Perizinan',
  'Sosial',
  'Umum'
];

export default function FAQAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [faqData, setFaqData] = useState<FAQData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQData | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: ''
  });
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
      // Load existing data from localStorage or set default
      const savedData = localStorage.getItem('faqData');
      if (savedData) {
        setFaqData(JSON.parse(savedData));
      } else {
        // Set default data from the existing FAQ data
        const defaultData = [
          {
            id: 1,
            question: "Bagaimana cara mengurus surat keterangan domisili?",
            answer: "Untuk mengurus surat keterangan domisili, Anda perlu membawa KTP asli, KK asli, dan surat pengantar dari RT/RW. Datang ke kantor nagari pada jam kerja.",
            category: "Administrasi"
          },
          {
            id: 2,
            question: "Kapan jam pelayanan kantor nagari?",
            answer: "Kantor nagari buka setiap hari Senin-Jumat pukul 08:00-16:00 WIB, dengan istirahat pukul 12:00-13:00 WIB.",
            category: "Pelayanan Publik"
          }
        ];
        setFaqData(defaultData);
        localStorage.setItem('faqData', JSON.stringify(defaultData));
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingFAQ) {
      // Update existing
      const updatedData = faqData.map(f => 
        f.id === editingFAQ.id 
          ? { ...formData, id: editingFAQ.id }
          : f
      );
      setFaqData(updatedData);
      localStorage.setItem('faqData', JSON.stringify(updatedData));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'faq' } }));
      showNotification('success', 'Data FAQ berhasil diperbarui!');
    } else {
      // Add new
      const newFAQ = {
        ...formData,
        id: Date.now() // Simple ID generation
      };
      const updatedData = [...faqData, newFAQ];
      setFaqData(updatedData);
      localStorage.setItem('faqData', JSON.stringify(updatedData));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'faq' } }));
      showNotification('success', 'Data FAQ berhasil ditambahkan!');
    }
    
    setIsModalOpen(false);
    setEditingFAQ(null);
    setFormData({ question: '', answer: '', category: '' });
  };

  const handleEdit = (faq: FAQData) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setFaqToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (faqToDelete !== null) {
      const updatedData = faqData.filter(f => f.id !== faqToDelete);
      setFaqData(updatedData);
      localStorage.setItem('faqData', JSON.stringify(updatedData));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'faq' } }));
      showNotification('success', 'Data FAQ berhasil dihapus!');
    }
    setDeleteModalOpen(false);
    setFaqToDelete(null);
  };

  const openAddModal = () => {
    setEditingFAQ(null);
    setFormData({ question: '', answer: '', category: '' });
    setIsModalOpen(true);
  };

  const toggleExpand = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
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
                Kelola FAQ
              </h1>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Tambah FAQ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* FAQ List */}
        <div className="space-y-4">
          {faqData.map((faq) => (
            <div key={faq.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-medium rounded-full">
                        {faq.category}
                      </span>
                    </div>
                    <h3 
                      className="text-lg font-semibold text-white cursor-pointer hover:text-yellow-400 transition-colors"
                      onClick={() => toggleExpand(faq.id)}
                    >
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => toggleExpand(faq.id)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {expandedFAQ === faq.id ? (
                        <ChevronUpIcon className="w-5 h-5" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(faq)}
                      className="flex items-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors text-sm"
                    >
                      <PencilIcon className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="flex items-center space-x-1 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors text-sm"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
                
                {expandedFAQ === faq.id && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {faqData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Belum ada FAQ yang tersedia.</p>
              <button
                onClick={openAddModal}
                className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-md transition-colors"
              >
                Tambah FAQ Pertama
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingFAQ ? 'Edit FAQ' : 'Tambah FAQ'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Kategori
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">Pilih Kategori</option>
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Pertanyaan
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.question}
                    onChange={(e) => setFormData({...formData, question: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Masukkan pertanyaan yang sering diajukan..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Jawaban
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.answer}
                    onChange={(e) => setFormData({...formData, answer: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Masukkan jawaban yang detail dan informatif..."
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md transition-colors"
                  >
                    {editingFAQ ? 'Update' : 'Tambah'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
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
      {deleteModalOpen && faqToDelete !== null && (
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
                  <p className="text-sm text-gray-300">Apakah Anda yakin ingin menghapus FAQ ini?</p>
                </div>
              </div>
              
              {faqData.find(f => f.id === faqToDelete) && (
                <div className="mb-6 bg-gray-700 rounded-lg p-4">
                  <div className="space-y-2">
                    <div>
                      <span className="inline-block px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-medium rounded-full mb-2">
                        {faqData.find(f => f.id === faqToDelete)?.category}
                      </span>
                    </div>
                    <h4 className="text-white font-semibold">{faqData.find(f => f.id === faqToDelete)?.question}</h4>
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {faqData.find(f => f.id === faqToDelete)?.answer}
                    </p>
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
