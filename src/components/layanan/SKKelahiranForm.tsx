"use client";
import React, { useState } from 'react';
import { savePermohonanToFirestore } from '@/lib/layananUtils';


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

  // File uploads
  surat_medis?: File | null;
  kk_orang_tua?: File | null;
  ktp_ayah?: File | null;
  ktp_ibu?: File | null;
}

export default function SKKelahiranForm({ onClose }: SKKelahiranFormProps) {
  // Upload file directly to Cloudinary
  const uploadToCloudinary = async (file: File | null): Promise<string> => {
    if (!file) return '';
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'limokoto-upload');
    const res = await fetch('https://api.cloudinary.com/v1_1/dehm8moqy/image/upload', { method: 'POST', body: data });
    const json = await res.json();
    return json.secure_url;
  };

  const [formData, setFormData] = useState<SKKelahiranFormData>({
    hari: '',
    tanggal: '',
    jam: '',
    tempat: '',
    nama_orang_2: '',
    jenis_kelamin: '',
    nama_ibu: '',
    nama_ayah: '',
    alamat: '',
    nomorHP: '', // Tambahkan field nomor HP
    nama_nagari: 'Nagari Limo Koto',
    nama_kecamatan: 'Koto IV',
    nama_kabupaten: 'Kabupaten Sijunjung',
    pengantar_rt_rw: null,
    surat_bidan: null,
    kk: null,
    ktp_orangtua: null

  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validasi nomor HP
      if (!formData.nomorHP) {
        alert('Nomor HP wajib diisi');
        setIsSubmitting(false);
        return;
      }

      // Upload attachments to Cloudinary
      const pengantarUrl = await uploadToCloudinary(formData.pengantar_rt_rw || null);
      const suratBidanUrl = await uploadToCloudinary(formData.surat_bidan || null);
      const kkUrl = await uploadToCloudinary(formData.kk || null);
      const ktpOrtuUrl = await uploadToCloudinary(formData.ktp_orangtua || null);

      // Prepare primitive form data
      const cleanedDataToSubmit = Object.fromEntries(
        Object.entries(formData).filter(([, value]) =>
          typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
        )
      ) as Record<string, string | number | boolean>;

      // Build attachments object
      const attachments: Record<string, { url: string; filename: string; type: string }> = {};
      if (pengantarUrl) attachments.pengantar_rt_rw = { url: pengantarUrl, filename: formData.pengantar_rt_rw?.name || 'pengantar_rt_rw', type: formData.pengantar_rt_rw?.type || 'application/octet-stream' };
      if (suratBidanUrl) attachments.surat_bidan = { url: suratBidanUrl, filename: formData.surat_bidan?.name || 'surat_bidan', type: formData.surat_bidan?.type || 'application/octet-stream' };
      if (kkUrl) attachments.kk = { url: kkUrl, filename: formData.kk?.name || 'kk', type: formData.kk?.type || 'application/octet-stream' };
      if (ktpOrtuUrl) attachments.ktp_orangtua = { url: ktpOrtuUrl, filename: formData.ktp_orangtua?.name || 'ktp_orangtua', type: formData.ktp_orangtua?.type || 'application/octet-stream' };

      // Save data to Firestore
      const nomorPermohonan = await savePermohonanToFirestore('SKKelahiran', cleanedDataToSubmit, formData.nomorHP, attachments);

      // Create FormData object untuk generate dokumen
      const submitFormData = new FormData();
      submitFormData.append("serviceType", "SKKelahiran");

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
        const filename = `SKKelahiran-${
          formData.nama_orang_2 || "Bayi"
        }-${timestamp}.docx`;
        link.download = filename;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        window.URL.revokeObjectURL(url);
        alert(`Permohonan berhasil disimpan dengan nomor: ${nomorPermohonan}. Dokumen Surat Keterangan Kelahiran berhasil dibuat dan didownload!`);
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
    (fieldName: keyof SKKelahiranFormData) =>
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
                Fotocopy Kartu Keluarga <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange("kk_orang_tua")}
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
                Fotocopy KTP Ayah <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange("ktp_ayah")}
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
                Fotocopy KTP Ibu <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange("ktp_ibu")}
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
