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
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    jorong: '',
    image: '',
    description: ''
  });
  const router = useRouter();

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
    }
    
    setIsModalOpen(false);
    setEditingPejabat(null);
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
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const updatedData = pejabatData.filter(p => p.id !== id);
      setPejabatData(updatedData);
      localStorage.setItem('pejabatData', JSON.stringify(updatedData));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'pejabat' } }));
    }
  };

  const openAddModal = () => {
    setEditingPejabat(null);
    setFormData({ name: '', title: '', jorong: '', image: '', description: '' });
    setIsModalOpen(true);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pejabatData.map((pejabat) => (
            <div key={pejabat.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image
                  src={pejabat.image}
                  alt={pejabat.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  {pejabat.name}
                </h3>
                <p className="text-lg font-semibold text-white mb-1">
                  {pejabat.title}
                </p>
                {pejabat.jorong && (
                  <p className="text-sm text-yellow-200 mb-3">
                    {pejabat.jorong}
                  </p>
                )}
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {pejabat.description}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(pejabat)}
                    className="flex items-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors text-sm"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(pejabat.id)}
                    className="flex items-center space-x-1 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors text-sm"
                  >
                    <TrashIcon className="w-4 h-4" />
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
                    URL Foto
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="https://example.com/foto.jpg"
                    />
                    <button
                      type="button"
                      className="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded-md transition-colors"
                    >
                      <PhotoIcon className="w-5 h-5" />
                    </button>
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
    </div>
  );
}
