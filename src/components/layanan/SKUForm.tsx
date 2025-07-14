"use client";
import { useState } from 'react';
import { SKUFormData } from '@/types/layanan';
import { savePermohonanToFirestore } from '@/lib/layananUtils';
import { uploadToCloudinary } from '@/lib/cloudinaryUpload';
import imageCompression from 'browser-image-compression';

interface SKUFormProps {
  onClose: () => void;
}

// Pastikan tipe SKUFormData untuk file hanya string | null
interface StrictSKUFormData extends Omit<SKUFormData, 'ktp' | 'kk' | 'foto_tempat_usaha'> {
  ktp: string | null;
  kk: string | null;
  foto_tempat_usaha: string | null;
}

export default function SKUForm({ onClose }: SKUFormProps) {
  const [formData, setFormData] = useState<StrictSKUFormData>({
    nama_orang_2: '',
    tempat_tanggal_lahir: '',
    nik: '',
    agama: '',
    pekerjaan: '',
    status: '',
    alamat: '',
    nama_usaha: '',
    tempat_usaha: '',
    nama_nagari: 'Limo Koto',
    nama_kecamatan: 'Koto VII',
    nama_kabupaten: 'Sijunjung',
    nomorHP: '', // Tambahkan field nomor HP
    ktp: null,
    kk: null,
    foto_tempat_usaha: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({
    ktp: false,
    kk: false,
    foto_tempat_usaha: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!formData.nomorHP) {
        alert('Nomor HP wajib diisi');
        setIsSubmitting(false);
        return;
      }
      await savePermohonanToFirestore(
        'SKU_AN',
        Object.fromEntries(
          Object.entries(formData).filter(([, v]) =>
            typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || v === null
          )
        ),
        formData.nomorHP,
        {
          ktp: { url: formData.ktp || '', filename: 'ktp', type: '' },
          kk: { url: formData.kk || '', filename: 'kk', type: '' },
          foto_tempat_usaha: { url: formData.foto_tempat_usaha || '', filename: 'foto_tempat_usaha', type: '' },
        }
      );
      const response = await fetch("/api/documents/generate", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: 'SKU_AN',
          ...formData,
        }),
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const timestamp = Date.now();
        const filename = `SKU-${formData.nama_orang_2 || "SKU"}-${timestamp}.docx`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        alert("Dokumen SKU berhasil dibuat dan didownload!");
        onClose();
      } else {
        const result = await response.json();
        alert(`Error: ${result.error || "Gagal membuat dokumen"}`);
      }
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

  const handleFileChange = (fieldName: keyof SKUFormData) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Hanya file gambar (JPG, JPEG, PNG, WEBP) yang diperbolehkan!');
        return;
      }
      setUploading((prev) => ({ ...prev, [fieldName]: true }));
      try {
        file = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1280,
          useWebWorker: true,
        });
        const url = await uploadToCloudinary(file);
        setFormData((prev) => ({
          ...prev,
          [fieldName]: url as string, // pastikan hanya string URL
        }));
      } catch {
        alert('Gagal upload file. Silakan coba lagi.');
      } finally {
        setUploading((prev) => ({ ...prev, [fieldName]: false }));
      }
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-4">
        <h3 className="text-lg font-bold text-purple-900 mb-2">📄 Surat Keterangan Usaha</h3>
        <p className="text-purple-700 text-sm">
          Silakan isi formulir berikut dengan lengkap dan benar. Dokumen akan otomatis dibuat dan dapat diunduh setelah pengisian selesai.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Data Pribadi */}
        <div className="bg-white border border-blue-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-blue-900">Data Pribadi</h3>
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
                placeholder="Masukkan nama lengkap sesuai KTP"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
                placeholder="16 digit NIK"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
                placeholder="Contoh: Pekanbaru, 19 Mei 2004"
              />
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
              >
                <option value="">Pilih Status</option>
                <option value="Belum Kawin">Belum Kawin</option>
                <option value="Kawin">Kawin</option>
                <option value="Cerai Hidup">Cerai Hidup</option>
                <option value="Cerai Mati">Cerai Mati</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat Tempat Tinggal <span className="text-red-500">*</span>
              </label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                required
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
                placeholder="Alamat lengkap sesuai KTP"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor HP/WA <span className="text-red-500">*</span>
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

        {/* Data Usaha */}
        <div className="bg-white border border-purple-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-purple-900">Data Usaha</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Usaha <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama_usaha"
                value={formData.nama_usaha}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black transition-colors"
                placeholder="Nama usaha yang dijalankan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat/Lokasi Usaha <span className="text-red-500">*</span>
              </label>
              <textarea
                name="tempat_usaha"
                value={formData.tempat_usaha}
                onChange={handleChange}
                required
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black transition-colors"
                placeholder="Alamat tempat usaha berada"
              />
            </div>
          </div>
        </div>

        {/* Data Wilayah */}
        <div className="bg-white border border-green-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-green-900">Data Wilayah</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Nagari <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama_nagari"
                value={formData.nama_nagari}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black transition-colors"
                placeholder="Nama nagari"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Kecamatan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama_kecamatan"
                value={formData.nama_kecamatan}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black transition-colors"
                placeholder="Nama kecamatan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Kabupaten <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama_kabupaten"
                value={formData.nama_kabupaten}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black transition-colors"
                placeholder="Nama kabupaten"
              />
            </div>
          </div>
        </div>

        {/* Berkas Persyaratan */}
        <div className="bg-white border border-red-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-red-900">Berkas Persyaratan</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fotokopi KTP <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleFileChange('ktp')}
                required
                disabled={uploading.ktp}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />
              {uploading.ktp && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.ktp && !uploading.ktp && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">Format: JPG, JPEG, PNG, WEBP (Max: 1MB setelah kompresi)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fotokopi Kartu Keluarga (KK) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleFileChange('kk')}
                required
                disabled={uploading.kk}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />
              {uploading.kk && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.kk && !uploading.kk && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">Format: JPG, JPEG, PNG, WEBP (Max: 1MB setelah kompresi)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto Tempat Usaha <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleFileChange('foto_tempat_usaha')}
                required
                disabled={uploading.foto_tempat_usaha}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />
              {uploading.foto_tempat_usaha && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.foto_tempat_usaha && !uploading.foto_tempat_usaha && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">Format: JPG, JPEG, PNG, WEBP (Max: 1MB setelah kompresi) - Foto harus menunjukkan papan nama atau aktivitas usaha</p>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Informasi Penting
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Pastikan semua data yang diisi sudah benar dan sesuai dengan dokumen resmi</li>
                  <li>Semua berkas persyaratan wajib dilampirkan (KTP, KK, Foto Usaha)</li>
                  <li>Foto tempat usaha harus jelas menunjukkan papan nama atau aktivitas usaha</li>
                  <li>Dokumen akan dibuat otomatis dan siap untuk ditandatangani oleh pejabat berwenang</li>
                  <li>Tanggal surat akan menggunakan tanggal hari ini</li>
                  <li>Nama dan jabatan pejabat akan diisi otomatis oleh sistem</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting || Object.values(uploading).some(Boolean)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Membuat Dokumen...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Buat & Unduh Dokumen
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
