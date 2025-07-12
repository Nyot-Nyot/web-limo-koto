"use client";
import React, { useState } from 'react';
import { savePermohonanToFirestore, processUploadedFiles } from '@/lib/layananUtils';

interface SKPindahFormProps {
  onClose: () => void;
}

interface SKPindahFormData {
  // Data utama
  nomor_kk: string;
  nama_orang_2: string; // nama yang pindah
  nik: string;
  nomorHP: string; // Tambahkan field nomor HP
  
  // Data daerah asal
  desa_kelurahan_asal: string;
  kecamatan_asal: string;
  kabupaten_kota_asal: string;
  provinsi_asal: string;
  
  // Data kepindahan
  alasan_pindah: string;
  klasifikasi_pindah: string;
  desa_kelurahan_tujuan: string;
  kecamatan_tujuan: string;
  kabupaten_kota_tujuan: string;
  provinsi_tujuan: string;
  
  // Static data
  nama_nagari: string;
  nama_kecamatan: string;
  nama_kabupaten: string;
  
  // File uploads
  kk?: File | null;
  ktp?: File | null;
  pas_photo?: File | null;
}

export default function SKPindahForm({ onClose }: SKPindahFormProps) {
  const [formData, setFormData] = useState<SKPindahFormData>({
    nomor_kk: '',
    nama_orang_2: '',
    nik: '',
    nomorHP: '', // Tambahkan field nomor HP
    desa_kelurahan_asal: '',
    kecamatan_asal: '',
    kabupaten_kota_asal: '',
    provinsi_asal: '',
    alasan_pindah: '',
    klasifikasi_pindah: '',
    desa_kelurahan_tujuan: '',
    kecamatan_tujuan: '',
    kabupaten_kota_tujuan: '',
    provinsi_tujuan: '',
    nama_nagari: 'Nagari Limo Koto',
    nama_kecamatan: 'Koto IV',
    nama_kabupaten: 'Kabupaten Sijunjung',
    kk: null,
    ktp: null,
    pas_photo: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validasi input
      if (!formData.nama_orang_2 || !formData.nik || !formData.nomorHP) {
        alert('Harap isi semua field yang wajib diisi!');
        setIsSubmitting(false);
        return;
      }

      // Proses file upload menjadi base64
      const processedFiles = await processUploadedFiles({
        kk: formData.kk || null,
        ktp: formData.ktp || null,
        pas_photo: formData.pas_photo || null
      });

      // Buat data yang akan disimpan
      const dataToSave = {
        ...formData,
        ...processedFiles
      };

      // Simpan data ke Firestore
      const nomorPermohonan = await savePermohonanToFirestore(
        'SKPindah',
        dataToSave,
        formData.nomorHP
      );

      // Create FormData object
      const submitFormData = new FormData();
      submitFormData.append('serviceType', 'SKPindah');
      
      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && typeof value === 'string') {
          submitFormData.append(key, value);
        } else if (value instanceof File) {
          submitFormData.append(key, value);
        }
      });

      const response = await fetch('/api/documents/generate', {
        method: 'POST',
        body: submitFormData,
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
        const filename = `SKPindah-${formData.nama_orang_2 || 'Pemohon'}-${timestamp}.docx`;
        link.download = filename;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        window.URL.revokeObjectURL(url);
        
        alert(`Dokumen Surat Keterangan Pindah berhasil dibuat dan didownload!\nNomor Permohonan: ${nomorPermohonan}`);
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

  const handleFileChange = (fieldName: keyof SKPindahFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }));
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-4">
        <h3 className="text-lg font-bold text-blue-900 mb-2">🚚 Surat Keterangan Pindah</h3>
        <p className="text-blue-700 text-sm">
          Silakan isi formulir perpindahan dengan lengkap dan benar. Dokumen akan otomatis dibuat dan dapat diunduh setelah pengisian selesai.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Data Utama */}
        <div className="bg-white border border-blue-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-blue-900">Data Pemohon</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Kartu Keluarga <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nomor_kk"
                value={formData.nomor_kk}
                onChange={handleChange}
                required
                maxLength={16}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
                placeholder="Masukkan nomor KK"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama_orang_2"
                value={formData.nama_orang_2}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
                placeholder="Nama lengkap yang akan pindah"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NIK <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nik"
                value={formData.nik}
                onChange={handleChange}
                required
                maxLength={16}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
                placeholder="Masukkan NIK"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor HP <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="nomorHP"
                value={formData.nomorHP}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
                placeholder="Contoh: 08123456789"
              />
            </div>
          </div>
        </div>

        {/* Data Daerah Asal */}
        <div className="bg-white border border-green-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-green-900">Daerah Asal</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desa/Kelurahan Asal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="desa_kelurahan_asal"
                value={formData.desa_kelurahan_asal}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black transition-colors"
                placeholder="Nama desa/kelurahan asal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kecamatan Asal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="kecamatan_asal"
                value={formData.kecamatan_asal}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black transition-colors"
                placeholder="Nama kecamatan asal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kabupaten/Kota Asal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="kabupaten_kota_asal"
                value={formData.kabupaten_kota_asal}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black transition-colors"
                placeholder="Nama kabupaten/kota asal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provinsi Asal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="provinsi_asal"
                value={formData.provinsi_asal}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black transition-colors"
                placeholder="Nama provinsi asal"
              />
            </div>
          </div>
        </div>

        {/* Data Kepindahan */}
        <div className="bg-white border border-purple-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-purple-900">Data Kepindahan</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alasan Pindah <span className="text-red-500">*</span>
              </label>
              <select
                name="alasan_pindah"
                value={formData.alasan_pindah}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black transition-colors"
              >
                <option value="">Pilih Alasan Pindah</option>
                <option value="Pekerjaan">Pekerjaan</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Keamanan">Keamanan</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Perumahan">Perumahan</option>
                <option value="Keluarga">Keluarga</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Klasifikasi Pindah <span className="text-red-500">*</span>
              </label>
              <select
                name="klasifikasi_pindah"
                value={formData.klasifikasi_pindah}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black transition-colors"
              >
                <option value="">Pilih Klasifikasi</option>
                <option value="Dalam Provinsi">Dalam Provinsi</option>
                <option value="Antar Provinsi">Antar Provinsi</option>
                <option value="Antar Negara">Antar Negara</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desa/Kelurahan Tujuan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="desa_kelurahan_tujuan"
                value={formData.desa_kelurahan_tujuan}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black transition-colors"
                placeholder="Nama desa/kelurahan tujuan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kecamatan Tujuan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="kecamatan_tujuan"
                value={formData.kecamatan_tujuan}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black transition-colors"
                placeholder="Nama kecamatan tujuan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kabupaten/Kota Tujuan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="kabupaten_kota_tujuan"
                value={formData.kabupaten_kota_tujuan}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black transition-colors"
                placeholder="Nama kabupaten/kota tujuan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provinsi Tujuan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="provinsi_tujuan"
                value={formData.provinsi_tujuan}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black transition-colors"
                placeholder="Nama provinsi tujuan"
              />
            </div>
          </div>
        </div>

        {/* Berkas Persyaratan */}
        <div className="bg-white border border-yellow-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-yellow-900">Berkas Persyaratan</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kartu Keluarga (KK) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange('kk')}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              <p className="text-xs text-gray-500 mt-1">Format: PDF, JPG, PNG, DOC, DOCX (Max: 5MB)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                KTP <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange('ktp')}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              <p className="text-xs text-gray-500 mt-1">Format: PDF, JPG, PNG, DOC, DOCX (Max: 5MB)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pas Photo <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange('pas_photo')}
                accept=".jpg,.jpeg,.png"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              <p className="text-xs text-gray-500 mt-1">Format: JPG, PNG (Max: 2MB)</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Memproses...
              </div>
            ) : (
              'Buat Surat Keterangan Pindah'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
