"use client";
import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { savePermohonanToFirestore } from '@/lib/layananUtils';

interface SKTempatTinggalFormProps {
  onClose: () => void;
}

interface SKTempatTinggalFormData {
  // Data pribadi
  nama_orang_2: string;
  tempat_tanggal_lahir: string;
  nik: string;
  jenis_kelamin: string;
  agama: string;
  pekerjaan: string;
  status: string;
  alamat: string;
  jorong: string;
  nomorHP: string; // Tambahkan field nomor HP
  
  // Static data
  nama_nagari: string;
  nama_kecamatan: string;
  nama_kabupaten: string;
  
  // File uploads (persyaratan)
  kk?: string | null;
  ktp?: string | null;
}

export default function SKTempatTinggalForm({ onClose }: SKTempatTinggalFormProps) {
  const [formData, setFormData] = useState<SKTempatTinggalFormData>({
    nama_orang_2: '',
    tempat_tanggal_lahir: '',
    nik: '',
    jenis_kelamin: '',
    agama: '',
    pekerjaan: '',
    status: '',
    alamat: '',
    jorong: '',
    nomorHP: '', // Tambahkan field nomor HP
    nama_nagari: 'Nagari Limo Koto',
    nama_kecamatan: 'Koto IV',
    nama_kabupaten: 'Kabupaten Sijunjung',
    kk: null,
    ktp: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState({
    kk: false,
    ktp: false
  });

  // Upload file directly to Cloudinary
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'limokoto');
    const res = await fetch('https://api.cloudinary.com/v1_1/de7gk1as4/image/upload', {
      method: 'POST', body: data
    });
    const json = await res.json();
    return json.secure_url;
  };

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

      await savePermohonanToFirestore(
        'SKTempatTinggal',
        Object.fromEntries(
          Object.entries(formData).filter(([, v]) =>
            typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || v === null
          )
        ),
        formData.nomorHP,
        {
          kk: { url: formData.kk || '', filename: 'kk', type: '' },
          ktp: { url: formData.ktp || '', filename: 'ktp', type: '' },
        }
      );
      alert('Permohonan berhasil dikirim!');
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
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

  const handleFileChange = (fieldName: keyof SKTempatTinggalFormData) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Hanya file gambar (JPG, JPEG, PNG, WEBP) yang diperbolehkan!');
        return;
      }
      setUploading((prev) => ({ ...prev, [fieldName]: true }));
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1280,
          useWebWorker: true,
        });
        if (compressedFile) {
          const url = await uploadToCloudinary(compressedFile);
          setFormData((prev) => ({
            ...prev,
            [fieldName]: url,
          }));
        }
      } catch {
        alert('Gagal upload file. Silakan coba lagi.');
      } finally {
        setUploading((prev) => ({ ...prev, [fieldName]: false }));
      }
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg mb-4">
        <h3 className="text-lg font-bold text-orange-900 mb-2">🏘️ Surat Keterangan Tidak Memiliki Rumah/Tempat Tinggal</h3>
        <p className="text-orange-700 text-sm">
          Silakan isi formulir dengan lengkap dan benar. Dokumen akan otomatis dibuat dan dapat diunduh setelah pengisian selesai.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Data Pribadi */}
        <div className="bg-white border border-orange-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-orange-900">Data Pribadi</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama_orang_2"
                value={formData.nama_orang_2}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black transition-colors"
                placeholder="Masukkan nama lengkap sesuai KTP"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tempat, Tanggal Lahir <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="tempat_tanggal_lahir"
                value={formData.tempat_tanggal_lahir}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black transition-colors"
                placeholder="Contoh: Sijunjung, 15 Januari 1990"
              />
            </div>

            <div>
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black transition-colors"
                placeholder="16 digit NIK"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor HP <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="nomorHP"
                value={formData.nomorHP}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black transition-colors"
                placeholder="Contoh: 08123456789"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <select
                name="jenis_kelamin"
                value={formData.jenis_kelamin}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black transition-colors"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agama <span className="text-red-500">*</span>
              </label>
              <select
                name="agama"
                value={formData.agama}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black transition-colors"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pekerjaan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pekerjaan"
                value={formData.pekerjaan}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black transition-colors"
                placeholder="Pekerjaan utama"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status Perkawinan <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black transition-colors"
              >
                <option value="">Pilih Status</option>
                <option value="Belum Kawin">Belum Kawin</option>
                <option value="Kawin">Kawin</option>
                <option value="Cerai Hidup">Cerai Hidup</option>
                <option value="Cerai Mati">Cerai Mati</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jorong <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="jorong"
                value={formData.jorong}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black transition-colors"
                placeholder="Nama jorong tempat tinggal sementara"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat Lengkap <span className="text-red-500">*</span>
              </label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                required
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black transition-colors"
                placeholder="Masukkan alamat lengkap tempat tinggal sementara"
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
                Fotocopy Kartu Keluarga (KK) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange('kk')}
                accept=".jpg,.jpeg,.png,.webp"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                disabled={uploading.kk}
              />
              {uploading.kk && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.kk && !uploading.kk && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">Format: JPG, JPEG, PNG, WEBP (Max: 1MB)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fotocopy KTP <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange('ktp')}
                accept=".jpg,.jpeg,.png,.webp"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                disabled={uploading.ktp}
              />
              {uploading.ktp && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.ktp && !uploading.ktp && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">Format: JPG, JPEG, PNG, WEBP (Max: 1MB)</p>
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
            disabled={isSubmitting || uploading.kk || uploading.ktp}
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Memproses...
              </div>
            ) : (
              'Buat Surat Keterangan Tempat Tinggal'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
