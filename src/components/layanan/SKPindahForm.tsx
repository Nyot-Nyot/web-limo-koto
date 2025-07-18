"use client";
import React, { useState } from 'react';
import { savePermohonanToFirestore } from '@/lib/layananUtils';
import { uploadToCloudinary } from '@/lib/cloudinaryUpload';
import imageCompression from 'browser-image-compression';

interface SKPindahFormProps {
  onClose: () => void;
}

interface AnggotaKeluarga {
  nama: string;
  hubungan: string;
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
  
  // Anggota keluarga yang ikut pindah
  anggota_keluarga: AnggotaKeluarga[];
  
  // File uploads
  kk?: string | null;
  ktp?: string | null;
  pas_photo?: string | null;
}

export default function SKPindahForm({ onClose }: SKPindahFormProps) {
  const [formData, setFormData] = useState<SKPindahFormData>({
    nomor_kk: '',
    nama_orang_2: '',
    nik: '',
    nomorHP: '',
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
    anggota_keluarga: [],
    kk: null,
    ktp: null,
    pas_photo: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({
    kk: false,
    ktp: false,
    pas_photo: false,
  });

  // Functions for managing anggota keluarga
  const addAnggotaKeluarga = () => {
    setFormData(prev => ({
      ...prev,
      anggota_keluarga: [...prev.anggota_keluarga, { nama: '', hubungan: '' }]
    }));
  };

  const removeAnggotaKeluarga = (index: number) => {
    setFormData(prev => ({
      ...prev,
      anggota_keluarga: prev.anggota_keluarga.filter((_, i) => i !== index)
    }));
  };

  const updateAnggotaKeluarga = (index: number, field: keyof AnggotaKeluarga, value: string) => {
    setFormData(prev => ({
      ...prev,
      anggota_keluarga: prev.anggota_keluarga.map((anggota, i) => 
        i === index ? { ...anggota, [field]: value } : anggota
      )
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!formData.nama_orang_2 || !formData.nik || !formData.nomorHP) {
        alert('Harap isi semua field yang wajib diisi!');
        setIsSubmitting(false);
        return;
      }
      await savePermohonanToFirestore(
        'SKPindah',
        Object.fromEntries(
          Object.entries(formData).filter(([, v]) =>
            typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || v === null
          )
        ),
        formData.nomorHP,
        {
          kk: { url: formData.kk || '', filename: 'kk', type: '' },
          ktp: { url: formData.ktp || '', filename: 'ktp', type: '' },
          pas_photo: { url: formData.pas_photo || '', filename: 'pas_photo', type: '' },
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

  const handleFileChange = (fieldName: keyof SKPindahFormData) => async (e: React.ChangeEvent<HTMLInputElement>) => {
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
          [fieldName]: url,
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

        {/* Anggota Keluarga yang Ikut Pindah */}
        <div className="bg-white border border-orange-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
              <h3 className="text-lg font-semibold text-orange-900">Anggota Keluarga yang Ikut Pindah</h3>
            </div>
            <button
              type="button"
              onClick={addAnggotaKeluarga}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
            >
              + Tambah Anggota
            </button>
          </div>
          
          {formData.anggota_keluarga.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Belum ada anggota keluarga yang ditambahkan.</p>
              <p className="text-sm">Klik "Tambah Anggota" untuk menambahkan data anggota keluarga yang ikut pindah.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.anggota_keluarga.map((anggota, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-800">Anggota Keluarga #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeAnggotaKeluarga(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={anggota.nama}
                        onChange={(e) => updateAnggotaKeluarga(index, 'nama', e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black transition-colors"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hubungan Keluarga <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={anggota.hubungan}
                        onChange={(e) => updateAnggotaKeluarga(index, 'hubungan', e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black transition-colors"
                      >
                        <option value="">Pilih Hubungan</option>
                        <option value="Kepala Keluarga">Kepala Keluarga</option>
                        <option value="Istri">Istri</option>
                        <option value="Suami">Suami</option>
                        <option value="Anak">Anak</option>
                        <option value="Menantu">Menantu</option>
                        <option value="Cucu">Cucu</option>
                        <option value="Orang Tua">Orang Tua</option>
                        <option value="Mertua">Mertua</option>
                        <option value="Saudara">Saudara</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              <strong>Catatan:</strong> Tambahkan semua anggota keluarga yang akan ikut pindah beserta hubungan keluarga mereka.
            </p>
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
                accept=".jpg,.jpeg,.png,.webp"
                required
                disabled={uploading.kk}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {uploading.kk && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.kk && !uploading.kk && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">Format: JPG, JPEG, PNG, WEBP (Max: 1MB setelah kompresi)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                KTP <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange('ktp')}
                accept=".jpg,.jpeg,.png,.webp"
                required
                disabled={uploading.ktp}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {uploading.ktp && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.ktp && !uploading.ktp && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">Format: JPG, JPEG, PNG, WEBP (Max: 1MB setelah kompresi)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pas Photo <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange('pas_photo')}
                accept=".jpg,.jpeg,.png,.webp"
                required
                disabled={uploading.pas_photo}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {uploading.pas_photo && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.pas_photo && !uploading.pas_photo && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">Format: JPG, PNG, WEBP (Max: 1MB setelah kompresi)</p>
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
            disabled={isSubmitting || Object.values(uploading).some(Boolean)}
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