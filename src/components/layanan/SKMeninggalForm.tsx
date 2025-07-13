"use client";
import React, { useState } from "react";
import { savePermohonanToFirestore } from '@/lib/layananUtils';
// Upload file directly to Cloudinary
const uploadToCloudinary = async (file: File | null): Promise<string> => {
  if (!file) return '';
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'limokoto-upload');
  const res = await fetch('https://api.cloudinary.com/v1_1/dehm8moqy/image/upload', {
    method: 'POST',
    body: data,
  });
  const json = await res.json();
  return json.secure_url;
};

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
  // File uploads
  ktp_almarhum?: File | null;
  kk_almarhum?: File | null;
  surat_rs?: File | null;
  ktp_pelapor?: File | null;
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

      // Upload attachments to Cloudinary
      const ktpAlmarhumUrl = await uploadToCloudinary(formData.ktp_almarhum || null);
      const kkAlmarhumUrl = await uploadToCloudinary(formData.kk_almarhum || null);
      const suratRsUrl = await uploadToCloudinary(formData.surat_rs || null);
      const ktpPelaporUrl = await uploadToCloudinary(formData.ktp_pelapor || null);

      // Prepare primitive form data
      const cleanedDataToSubmit = Object.fromEntries(
        Object.entries(formData).filter(([, value]) =>
          typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
        )
      ) as Record<string, string | number | boolean>;

      // Build attachments object
      const attachments: Record<string, { url: string; filename: string; type: string }> = {};
      if (ktpAlmarhumUrl) attachments.ktp_almarhum = { url: ktpAlmarhumUrl, filename: formData.ktp_almarhum?.name || 'ktp_almarhum', type: formData.ktp_almarhum?.type || 'application/octet-stream' };
      if (kkAlmarhumUrl) attachments.kk_almarhum = { url: kkAlmarhumUrl, filename: formData.kk_almarhum?.name || 'kk_almarhum', type: formData.kk_almarhum?.type || 'application/octet-stream' };
      if (suratRsUrl) attachments.surat_rs = { url: suratRsUrl, filename: formData.surat_rs?.name || 'surat_rs', type: formData.surat_rs?.type || 'application/octet-stream' };
      if (ktpPelaporUrl) attachments.ktp_pelapor = { url: ktpPelaporUrl, filename: formData.ktp_pelapor?.name || 'ktp_pelapor', type: formData.ktp_pelapor?.type || 'application/octet-stream' };

      // Save data to Firestore
      const nomorPermohonan = await savePermohonanToFirestore(
        'SKMeninggalDunia',
        cleanedDataToSubmit,
        formData.nomorHP,
        attachments
      );

      // Create FormData object
      const submitFormData = new FormData();
      submitFormData.append("serviceType", "SKMeninggalDunia");

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && typeof value === "string") {
          submitFormData.append(key, value);
        } else if (value instanceof File) {
          submitFormData.append(key, value);
        }
      });

      const response = await fetch("/api/documents/generate", {
        method: "POST",
        body: submitFormData,
      });

      if (response.ok) {
        // Get the blob from response
        const blob = await response.blob();

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        // Generate filename
        const timestamp = Date.now();
        const filename = `SKMeninggalDunia-${
          formData.nama_orang_2 || "Almarhum"
        }-${timestamp}.docx`;
        link.download = filename;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        window.URL.revokeObjectURL(url);

        alert(
          "Dokumen Surat Keterangan Meninggal Dunia berhasil dibuat dan didownload!"
        );
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

  const handleFileChange =
    (fieldName: keyof SKMeninggalFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          [fieldName]: file,
        }));
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
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: PDF, JPG, PNG, DOC, DOCX (Max: 5MB)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kartu Keluarga Almarhum <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange("kk_almarhum")}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: PDF, JPG, PNG, DOC, DOCX (Max: 5MB)
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
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Wajib jika meninggal karena kejadian tertentu. Format: PDF, JPG,
                PNG, DOC, DOCX (Max: 5MB)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                KTP Pelapor <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange("ktp_pelapor")}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: PDF, JPG, PNG, DOC, DOCX (Max: 5MB)
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
