import React, { useState } from "react";
import { savePermohonanToFirestore } from '@/lib/layananUtils';
import { uploadToCloudinary } from '@/lib/cloudinaryUpload';
import imageCompression from 'browser-image-compression';

interface DomisiliFormProps {
  onClose: () => void;
}

interface DomisiliFormData {
  nama: string;
  nik: string;
  tempat_tanggal_lahir: string;
  jenis_kelamin: string;
  agama: string;
  status_perkawinan: string;
  pekerjaan: string;
  kewarganegaraan: string;
  nomorHP: string;
  alamat: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kampung: string;
  dusun: string;
  rk: string;
  rt: string;
  ktp: string | null;
  kk: string | null;
  surat_permohonan: string | null;
}

export default function DomisiliForm({ onClose }: DomisiliFormProps) {
  const [formData, setFormData] = useState<DomisiliFormData>({
    nama: "",
    nik: "",
    tempat_tanggal_lahir: "",
    jenis_kelamin: "",
    agama: "",
    status_perkawinan: "",
    pekerjaan: "",
    kewarganegaraan: "",
    nomorHP: "",
    alamat: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kampung: "",
    dusun: "",
    rk: "",
    rt: "",
    ktp: null,
    kk: null,
    surat_permohonan: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({
    ktp: false,
    kk: false,
    surat_permohonan: false,
  });

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

  const handleFileChange = (fieldName: keyof Pick<DomisiliFormData, 'ktp' | 'kk' | 'surat_permohonan'>) => async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!formData.nama || !formData.nik || !formData.nomorHP) {
        alert('Harap isi semua field yang wajib diisi!');
        setIsSubmitting(false);
        return;
      }
      await savePermohonanToFirestore(
        'SKDomisili',
        Object.fromEntries(
          Object.entries(formData).filter(([, v]) =>
            typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || v === null
          )
        ),
        formData.nomorHP,
        {
          ktp: { url: formData.ktp || '', filename: 'ktp', type: '' },
          kk: { url: formData.kk || '', filename: 'kk', type: '' },
          surat_permohonan: { url: formData.surat_permohonan || '', filename: 'surat_permohonan', type: '' },
        }
      );
      const response = await fetch("/api/documents/generate", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: 'SKDomisili',
          ...formData,
          status: formData.status_perkawinan, // mapping agar placeholder template terisi
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

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg mb-4">
        <h3 className="text-lg font-bold text-blue-900 mb-2">🏠 Surat Keterangan Domisili</h3>
        <p className="text-blue-700 text-sm">
          Silakan isi formulir berikut dengan lengkap dan benar. Pastikan semua dokumen persyaratan telah disiapkan.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Data Pribadi */}
        <div className="bg-white border border-blue-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-blue-900">Data Pribadi Pemohon</h3>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
            name="nama"
                value={formData.nama}
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
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <select
                name="jenis_kelamin"
                value={formData.jenis_kelamin}
            onChange={handleChange}
            required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
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
                Status Perkawinan <span className="text-red-500">*</span>
              </label>
              <select
                name="status_perkawinan"
                value={formData.status_perkawinan}
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
                Kewarganegaraan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
            name="kewarganegaraan"
                value={formData.kewarganegaraan}
            onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
            placeholder="Contoh: WNI"
          />
        </div>
      <div>
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
      {/* Data Domisili */}
        <div className="bg-white border border-cyan-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-cyan-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-cyan-900">Data Domisili</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat Lengkap <span className="text-red-500">*</span>
              </label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                required
                rows={2}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-black transition-colors"
                placeholder="Jalan, Nomor Rumah, RT/RW, Dusun/Kelurahan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provinsi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
              name="provinsi"
                value={formData.provinsi}
              onChange={handleChange}
              required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-black transition-colors"
                placeholder="Provinsi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kabupaten <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
              name="kabupaten"
                value={formData.kabupaten}
              onChange={handleChange}
              required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-black transition-colors"
                placeholder="Kabupaten"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kecamatan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
              name="kecamatan"
                value={formData.kecamatan}
              onChange={handleChange}
              required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-black transition-colors"
                placeholder="Kecamatan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kelurahan/Nagari <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
              name="kampung"
                value={formData.kampung}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-black transition-colors"
                placeholder="Kelurahan/Nagari"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dusun <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="dusun"
                value={formData.dusun}
              onChange={handleChange}
              required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-black transition-colors"
                placeholder="Dusun"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                RK <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
              name="rk"
                value={formData.rk}
              onChange={handleChange}
              required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-black transition-colors"
                placeholder="RK"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                RT <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
              name="rt"
                value={formData.rt}
              onChange={handleChange}
              required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-black transition-colors"
                placeholder="RT"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                KTP <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleFileChange('ktp')}
                required
                disabled={uploading.ktp}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {uploading.ktp && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.ktp && !uploading.ktp && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">Format: JPG, JPEG, PNG, WEBP (Max: 1MB setelah kompresi)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                KK <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleFileChange('kk')}
                required
                disabled={uploading.kk}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {uploading.kk && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.kk && !uploading.kk && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">Format: JPG, JPEG, PNG, WEBP (Max: 1MB setelah kompresi)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surat Permohonan <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleFileChange('surat_permohonan')}
                required
                disabled={uploading.surat_permohonan}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {uploading.surat_permohonan && <p className="text-xs text-yellow-600 mt-1">Mengupload...</p>}
              {formData.surat_permohonan && !uploading.surat_permohonan && <p className="text-xs text-green-600 mt-1">File terupload ✔</p>}
              <p className="text-xs text-gray-500 mt-1">Format: JPG, JPEG, PNG, WEBP (Max: 1MB setelah kompresi)</p>
            </div>
          </div>
        </div>
        {/* Catatan Persyaratan */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">📋 Persyaratan Surat Keterangan Domisili:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Fotokopi KTP pemohon</li>
            <li>• Fotokopi Kartu Keluarga (KK)</li>
            <li>• Surat Permohonan (boleh diketik/tulis tangan)</li>
          </ul>
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
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            ) : (
              'Buat Surat Keterangan Domisili'
            )}
          </button>
        </div>
      </form>
      </div>
  );
}
