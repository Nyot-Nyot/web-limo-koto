"use client";
import React, { useState } from "react";
import { uploadToCloudinary } from '@/lib/cloudinaryUpload';
import { savePermohonanToFirestore } from '@/lib/layananUtils';
import imageCompression from 'browser-image-compression';

interface SKKelahiranFormProps {
  onClose: () => void;
}

interface SKKelahiranFormData {
  // Data kelahiran
  hari: string;
  tanggal: string;
  jam: string;
  tempat: string;
  nama_orang_2: string; // nama bayi
  jenis_kelamin: string;
  nama_ibu: string;
  nama_ayah: string;
  alamat: string;
  nomorHP: string; // Tambahkan field nomor HP
  // Static data
  nama_nagari: string;
  nama_kecamatan: string;
  nama_kabupaten: string;
  
  // File uploads (sekarang URL string, bukan File)
  surat_medis?: string | null;
  kk_orang_tua?: string | null;
  ktp_ayah?: string | null;
  ktp_ibu?: string | null;
}

export default function SKKelahiranForm({ onClose }: SKKelahiranFormProps) {
  const [formData, setFormData] = useState<SKKelahiranFormData>({
    hari: "",
    tanggal: "",
    jam: "",
    tempat: "",
    nama_orang_2: "",
    jenis_kelamin: "",
    nama_ibu: "",
    nama_ayah: "",
    alamat: "",
    nomorHP: "",
    nama_nagari: "Nagari Limo Koto",
    nama_kecamatan: "Koto IV",
    nama_kabupaten: "Kabupaten Sijunjung",
    surat_medis: null,
    kk_orang_tua: null,
    ktp_ayah: null,
    ktp_ibu: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});

  // Handler baru: upload file ke Cloudinary saat dipilih, simpan URL di state
  const handleFileChange = (fieldName: keyof SKKelahiranFormData) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (file) {
      // Validasi hanya gambar
      if (!file.type.startsWith('image/')) {
        alert('Hanya file gambar (JPG, JPEG, PNG, WEBP) yang diperbolehkan!');
        return;
      }
      setUploading((prev) => ({ ...prev, [fieldName]: true }));
      try {
        // Kompres gambar sebelum upload
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

  // Handler submit: kirim data JSON (bukan FormData)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!formData.nomorHP) {
        alert('Nomor HP wajib diisi');
        setIsSubmitting(false);
        return;
      }
      // Simpan ke Firestore (jika perlu, bisa tetap pakai savePermohonanToFirestore)
      await savePermohonanToFirestore(
        'SKKelahiran',
        Object.fromEntries(
          Object.entries(formData).filter(([, v]) =>
            typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || v === null
          )
        ),
        formData.nomorHP,
        {
          surat_medis: { url: formData.surat_medis || '', filename: 'surat_medis', type: '' },
          kk_orang_tua: { url: formData.kk_orang_tua || '', filename: 'kk_orang_tua', type: '' },
          ktp_ayah: { url: formData.ktp_ayah || '', filename: 'ktp_ayah', type: '' },
          ktp_ibu: { url: formData.ktp_ibu || '', filename: 'ktp_ibu', type: '' },
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg mb-4">
        <h3 className="text-lg font-bold text-pink-900 mb-2">
          👶 Surat Keterangan Kelahiran
        </h3>
        <p className="text-pink-700 text-sm">
          Silakan isi formulir kelahiran dengan lengkap dan benar. Dokumen akan
          otomatis dibuat dan dapat diunduh setelah pengisian selesai.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Data Kelahiran */}
        <div className="bg-white border border-pink-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-pink-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-pink-900">
              Data Kelahiran
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Bayi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama_orang_2"
                value={formData.nama_orang_2}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-black transition-colors"
                placeholder="Masukkan nama lengkap bayi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hari Kelahiran <span className="text-red-500">*</span>
              </label>
              <select
                name="hari"
                value={formData.hari}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-black transition-colors"
              >
                <option value="">Pilih Hari</option>
                <option value="Senin">Senin</option>
                <option value="Selasa">Selasa</option>
                <option value="Rabu">Rabu</option>
                <option value="Kamis">Kamis</option>
                <option value="Jumat">Jumat</option>
                <option value="Sabtu">Sabtu</option>
                <option value="Minggu">Minggu</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Kelahiran <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jam Kelahiran <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="jam"
                value={formData.jam}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tempat Kelahiran <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="tempat"
                value={formData.tempat}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-black transition-colors"
                placeholder="Contoh: RS Umum Sijunjung, Rumah Bersalin, dll"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-black transition-colors"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Orang Tua */}
        <div className="bg-white border border-blue-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-blue-900">
              Data Orang Tua
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Ibu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama_ibu"
                value={formData.nama_ibu}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
                placeholder="Nama lengkap ibu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Ayah <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama_ayah"
                value={formData.nama_ayah}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
                placeholder="Nama lengkap ayah"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
                placeholder="Masukkan alamat lengkap orang tua"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
                placeholder="Contoh: 08123456789"
              />
            </div>
          </div>
        </div>

        {/* Berkas Persyaratan */}
        <div className="bg-white border border-yellow-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-yellow-900">
              Berkas Persyaratan
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fotocopy Surat dari Bidan/Rumah Sakit{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange("surat_medis")}
                accept=".jpg,.jpeg,.png,.webp"
                required={!formData.surat_medis}
                disabled={uploading.surat_medis}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {uploading.surat_medis && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.surat_medis && !uploading.surat_medis && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">
                Format: JPG, JPEG, PNG, WEBP (Max: 1MB setelah kompresi)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fotocopy Kartu Keluarga <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange("kk_orang_tua")}
                accept=".jpg,.jpeg,.png,.webp"
                required={!formData.kk_orang_tua}
                disabled={uploading.kk_orang_tua}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {uploading.kk_orang_tua && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.kk_orang_tua && !uploading.kk_orang_tua && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">
                Format: JPG, JPEG, PNG, WEBP (Max: 1MB setelah kompresi)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fotocopy KTP Ayah <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange("ktp_ayah")}
                accept=".jpg,.jpeg,.png,.webp"
                required={!formData.ktp_ayah}
                disabled={uploading.ktp_ayah}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {uploading.ktp_ayah && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.ktp_ayah && !uploading.ktp_ayah && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">
                Format: JPG, JPEG, PNG, WEBP (Max: 1MB setelah kompresi)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fotocopy KTP Ibu <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange("ktp_ibu")}
                accept=".jpg,.jpeg,.png,.webp"
                required={!formData.ktp_ibu}
                disabled={uploading.ktp_ibu}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {uploading.ktp_ibu && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.ktp_ibu && !uploading.ktp_ibu && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">
                Format: JPG, JPEG, PNG, WEBP (Max: 1MB setelah kompresi)
              </p>
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
            className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Memproses...
              </div>
            ) : (
              "Buat Surat Keterangan Kelahiran"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}