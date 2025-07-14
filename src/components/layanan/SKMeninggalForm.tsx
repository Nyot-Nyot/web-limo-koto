"use client";
import React, { useState } from "react";
import { savePermohonanToFirestore } from '@/lib/layananUtils';
import { uploadToCloudinary } from '@/lib/cloudinaryUpload';
import imageCompression from 'browser-image-compression';

interface SKMeninggalFormProps {
  onClose: () => void;
}

interface SKMeninggalFormData {
  // Data almarhum
  nama_orang_2: string; // nama almarhum
  tempat_tanggal_lahir: string;
  nik: string;
  agama: string;
  jenis_kelamin: string;
  alamat: string;
  // Data kematian
  hari_tanggal_meninggal: string;
  jam: string;
  meninggal_di: string;
  disebabkan: string;
  dikebumikan_di: string;
  // Data pelapor
  nomorHP: string; // Tambahkan field nomor HP pelapor
  // Static data
  nama_nagari: string;
  nama_kecamatan: string;
  nama_kabupaten: string;
  // File uploads (sekarang URL string, bukan File)
  ktp_almarhum?: string | null;
  kk_almarhum?: string | null;
  surat_rs?: string | null;
  ktp_pelapor?: string | null;
}

export default function SKMeninggalForm({ onClose }: SKMeninggalFormProps) {
  const [formData, setFormData] = useState<SKMeninggalFormData>({
    nama_orang_2: "",
    tempat_tanggal_lahir: "",
    nik: "",
    agama: "",
    jenis_kelamin: "",
    alamat: "",
    hari_tanggal_meninggal: "",
    jam: "",
    meninggal_di: "",
    disebabkan: "",
    dikebumikan_di: "",
    nomorHP: "",
    nama_nagari: "Nagari Limo Koto",
    nama_kecamatan: "Koto IV",
    nama_kabupaten: "Kabupaten Sijunjung",
    ktp_almarhum: null,
    kk_almarhum: null,
    surat_rs: null,
    ktp_pelapor: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({
    ktp_almarhum: false,
    kk_almarhum: false,
    surat_rs: false,
    ktp_pelapor: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!formData.nama_orang_2 || !formData.nik || !formData.nomorHP) {
        alert('Harap isi semua field yang wajib diisi!');
        setIsSubmitting(false);
        return;
      }
      // Simpan ke Firestore
      await savePermohonanToFirestore(
        'SKMeninggalDunia',
        Object.fromEntries(
          Object.entries(formData).filter(([, v]) =>
            typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || v === null
          )
        ),
        formData.nomorHP,
        {
          ktp_almarhum: { url: formData.ktp_almarhum || '', filename: 'ktp_almarhum', type: '' },
          kk_almarhum: { url: formData.kk_almarhum || '', filename: 'kk_almarhum', type: '' },
          surat_rs: { url: formData.surat_rs || '', filename: 'surat_rs', type: '' },
          ktp_pelapor: { url: formData.ktp_pelapor || '', filename: 'ktp_pelapor', type: '' },
        }
      );
      // Kirim ke API generate dokumen (JSON)
      const response = await fetch("/api/documents/generate", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: 'SKMeninggalDunia',
          ...formData,
        }),
      });
      if (response.ok) {
        alert("Permohonan berhasil dikirim! Silakan tunggu proses dari admin.");
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

  const handleFileChange = (fieldName: keyof SKMeninggalFormData) => async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <div className="bg-gradient-to-r from-gray-50 to-slate-100 p-6 rounded-lg mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          🕊️ Surat Keterangan Meninggal Dunia
        </h3>
        <p className="text-gray-600 text-sm">
          Silakan isi formulir dengan lengkap dan benar untuk pembuatan surat
          keterangan meninggal dunia. Pastikan semua dokumen persyaratan telah
          disiapkan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Data Almarhum */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-gray-800">
              Data Almarhum
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap Almarhum <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama_orang_2"
                value={formData.nama_orang_2}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-black transition-colors"
                placeholder="Masukkan nama lengkap almarhum"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-black transition-colors"
                placeholder="Contoh: Sijunjung, 15 Januari 1980"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-black transition-colors"
                placeholder="16 digit NIK"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor HP Pelapor <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="nomorHP"
                value={formData.nomorHP}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-black transition-colors"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-black transition-colors"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-black transition-colors"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-black transition-colors"
                placeholder="Masukkan alamat lengkap almarhum"
              />
            </div>
          </div>
        </div>

        {/* Data Kematian */}
        <div className="bg-white border border-red-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-red-900">
              Data Kematian
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hari, Tanggal Meninggal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="hari_tanggal_meninggal"
                value={formData.hari_tanggal_meninggal}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black transition-colors"
                placeholder="Contoh: Senin, 11 Juli 2025"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jam Meninggal <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="jam"
                value={formData.jam}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meninggal Di <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="meninggal_di"
                value={formData.meninggal_di}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black transition-colors"
                placeholder="Contoh: RS Umum Sijunjung, Rumah, dll"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Disebabkan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="disebabkan"
                value={formData.disebabkan}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black transition-colors"
                placeholder="Contoh: Sakit, Kecelakaan, dll"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dikebumikan Di <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="dikebumikan_di"
                value={formData.dikebumikan_di}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black transition-colors"
                placeholder="Contoh: Makam Umum Nagari Lima Koto"
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
                KTP Almarhum <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange("ktp_almarhum")}
                accept=".jpg,.jpeg,.png,.webp"
                required
                disabled={uploading.ktp_almarhum}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {uploading.ktp_almarhum && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.ktp_almarhum && !uploading.ktp_almarhum && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">
                Format: JPG, JPEG, PNG, WEBP (Max: 1MB setelah kompresi)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kartu Keluarga Almarhum <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange("kk_almarhum")}
                accept=".jpg,.jpeg,.png,.webp"
                required
                disabled={uploading.kk_almarhum}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {uploading.kk_almarhum && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.kk_almarhum && !uploading.kk_almarhum && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">
                Format: JPG, JPEG, PNG, WEBP (Max: 1MB setelah kompresi)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surat dari Rumah Sakit{" "}
                <span className="text-gray-500">(Jika diperlukan)</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange("surat_rs")}
                accept=".jpg,.jpeg,.png,.webp"
                disabled={uploading.surat_rs}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {uploading.surat_rs && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.surat_rs && !uploading.surat_rs && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">
                Wajib jika meninggal karena kejadian tertentu. Format: JPG, JPEG,
                PNG, WEBP (Max: 1MB setelah kompresi)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                KTP Pelapor <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange("ktp_pelapor")}
                accept=".jpg,.jpeg,.png,.webp"
                required
                disabled={uploading.ktp_pelapor}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {uploading.ktp_pelapor && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.ktp_pelapor && !uploading.ktp_pelapor && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
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
            disabled={isSubmitting || Object.values(uploading).some(Boolean)}
            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-slate-700 text-white rounded-lg hover:from-gray-700 hover:to-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Memproses...
              </div>
            ) : (
              "Buat Surat Keterangan Meninggal Dunia"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}