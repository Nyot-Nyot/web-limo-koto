"use client";
import { useState } from 'react';
import { SKUFormData } from '@/types/layanan';

interface SKUFormProps {
  onClose: () => void;
}

export default function SKUForm({ onClose }: SKUFormProps) {
  const [formData, setFormData] = useState<SKUFormData>({
    nama: '',
    nik: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    alamat: '',
    rt: '',
    rw: '',
    dusun: '',
    agama: '',
    pekerjaan: '',
    status_perkawinan: '',
    nama_usaha: '',
    jenis_usaha: '',
    alamat_usaha: '',
    modal_usaha: '',
    lama_usaha: '',
    omzet_perbulan: '',
    keperluan: '',
    no_hp: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceType: 'SKU_AN',
          formData,
        }),
      });

      if (response.ok) {
        // Get the blob from response
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Generate filename
        const timestamp = Date.now();
        const filename = `${formData.nama || 'SKU'}-${timestamp}.docx`;
        link.download = filename;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        window.URL.revokeObjectURL(url);
        
        alert('Dokumen SKU berhasil dibuat dan didownload!');
        onClose();
      } else {
        const result = await response.json();
        alert(`Error: ${result.error || 'Gagal membuat dokumen'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-h-96 overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Data Pribadi */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-3">Data Pribadi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Lengkap *</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">NIK *</label>
              <input
                type="text"
                name="nik"
                value={formData.nik}
                onChange={handleChange}
                required
                maxLength={16}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tempat Lahir *</label>
              <input
                type="text"
                name="tempat_lahir"
                value={formData.tempat_lahir}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tanggal Lahir *</label>
              <input
                type="date"
                name="tanggal_lahir"
                value={formData.tanggal_lahir}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Jenis Kelamin *</label>
              <select
                name="jenis_kelamin"
                value={formData.jenis_kelamin}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Agama *</label>
              <select
                name="agama"
                value={formData.agama}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="">Pilih Agama</option>
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status Perkawinan *</label>
              <select
                name="status_perkawinan"
                value={formData.status_perkawinan}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="">Pilih Status Perkawinan</option>
                <option value="Belum Kawin">Belum Kawin</option>
                <option value="Kawin">Kawin</option>
                <option value="Cerai Hidup">Cerai Hidup</option>
                <option value="Cerai Mati">Cerai Mati</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Pekerjaan</label>
              <input
                type="text"
                name="pekerjaan"
                value={formData.pekerjaan}
                onChange={handleChange}
                placeholder="Contoh: Wiraswasta, Petani, dll."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>
        </div>

        {/* Alamat */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-3">Alamat</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Alamat Lengkap *</label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">RT *</label>
              <input
                type="text"
                name="rt"
                value={formData.rt}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">RW *</label>
              <input
                type="text"
                name="rw"
                value={formData.rw}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Dusun</label>
              <input
                type="text"
                name="dusun"
                value={formData.dusun}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>
        </div>

        {/* Data Usaha */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-900 mb-3">Data Usaha</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Usaha *</label>
              <input
                type="text"
                name="nama_usaha"
                value={formData.nama_usaha}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Jenis Usaha *</label>
              <select
                name="jenis_usaha"
                value={formData.jenis_usaha}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="">Pilih Jenis Usaha</option>
                <option value="Warung/Toko Kelontong">Warung/Toko Kelontong</option>
                <option value="Usaha Makanan/Minuman">Usaha Makanan/Minuman</option>
                <option value="Pertanian">Pertanian</option>
                <option value="Peternakan">Peternakan</option>
                <option value="Kerajinan">Kerajinan</option>
                <option value="Jasa">Jasa</option>
                <option value="Perdagangan">Perdagangan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Modal Usaha *</label>
              <select
                name="modal_usaha"
                value={formData.modal_usaha}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="">Pilih Modal Usaha</option>
                <option value="Kurang dari Rp 1.000.000">{'< Rp 1.000.000'}</option>
                <option value="Rp 1.000.000 - 5.000.000">Rp 1.000.000 - 5.000.000</option>
                <option value="Rp 5.000.000 - 10.000.000">Rp 5.000.000 - 10.000.000</option>
                <option value="Lebih dari Rp 10.000.000">{'> Rp 10.000.000'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Lama Usaha *</label>
              <input
                type="text"
                name="lama_usaha"
                value={formData.lama_usaha}
                onChange={handleChange}
                required
                placeholder="Contoh: 2 tahun"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Alamat Usaha *</label>
            <textarea
              name="alamat_usaha"
              value={formData.alamat_usaha}
              onChange={handleChange}
              required
              rows={2}
              placeholder="Jika sama dengan alamat tinggal, tuliskan 'Sama dengan alamat tinggal'"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
        </div>

        {/* Keperluan */}
        <div>
          <label className="block text-sm font-medium mb-1">Keperluan *</label>
          <textarea
            name="keperluan"
            value={formData.keperluan}
            onChange={handleChange}
            required
            rows={2}
            placeholder="Contoh: Untuk mengurus izin usaha, syarat kredit bank, dll."
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">No. HP/WhatsApp</label>
          <input
            type="tel"
            name="no_hp"
            value={formData.no_hp}
            onChange={handleChange}
            placeholder="08123456789"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Memproses...' : 'Ajukan SKU'}
          </button>
        </div>
      </form>
    </div>
  );
}
