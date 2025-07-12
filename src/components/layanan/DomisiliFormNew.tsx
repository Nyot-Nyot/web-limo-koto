"use client";
import { useState } from 'react';

interface DomisiliFormProps {
  onClose: () => void;
}

interface DomisiliFormData {
  nama_orang_2: string;
  tempat_tanggal_lahir: string;
  nik: string;
  jenis_kelamin: string;
  agama: string;
  status: string;
  pekerjaan: string;
  alamat: string;
  nama_jorong: string;
  nama_nagari: string;
  nama_kecamatan: string;
  nama_kabupaten: string;
  tujuan: string;
  kk: File | null;
  ktp: File | null;
  surat_permohonan: File | null;
}

export default function DomisiliFormNew({ onClose }: DomisiliFormProps) {
  const [formData, setFormData] = useState<DomisiliFormData>({
    nama_orang_2: '',
    tempat_tanggal_lahir: '',
    nik: '',
    jenis_kelamin: '',
    agama: '',
    status: '',
    pekerjaan: '',
    alamat: '',
    nama_jorong: '',
    nama_nagari: 'Limo Koto',
    nama_kecamatan: 'Koto VII',
    nama_kabupaten: 'Sijunjung',
    tujuan: '',
    kk: null,
    ktp: null,
    surat_permohonan: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData object
      const submitFormData = new FormData();
      submitFormData.append('serviceType', 'SKDomisili');
      
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
        const filename = `Domisili-${formData.nama_orang_2 || 'Document'}-${timestamp}.docx`;
        link.download = filename;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        window.URL.revokeObjectURL(url);
        
        alert('Dokumen Surat Keterangan Domisili berhasil dibuat dan didownload!');
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

  const handleFileChange = (fieldName: keyof DomisiliFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
          </div>
        </div>

        {/* Data Domisili */}
        <div className="bg-white border border-blue-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-blue-900">Data Domisili</h3>
          </div>
          
          <div className="space-y-4">
            <div>
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
                placeholder="Jalan, Nomor Rumah, RT/RW, Dusun/Kelurahan"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Jorong <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama_jorong"
                  value={formData.nama_jorong}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
                  placeholder="Nama jorong"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Nagari
                </label>
                <input
                  type="text"
                  name="nama_nagari"
                  value={formData.nama_nagari}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-black"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Kecamatan
                </label>
                <input
                  type="text"
                  name="nama_kecamatan"
                  value={formData.nama_kecamatan}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-black"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Kabupaten
                </label>
                <input
                  type="text"
                  name="nama_kabupaten"
                  value={formData.nama_kabupaten}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-black"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tujuan Pembuatan Surat <span className="text-red-500">*</span>
              </label>
              <textarea
                name="tujuan"
                value={formData.tujuan}
                onChange={handleChange}
                required
                rows={2}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black transition-colors"
                placeholder="Contoh: Untuk persyaratan pendaftaran sekolah, administrasi bank, dll."
              />
            </div>
          </div>
        </div>

        {/* Upload Dokumen */}
        <div className="bg-white border border-orange-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-orange-900">Upload Dokumen Persyaratan</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kartu Keluarga (KK) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange('kk')}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              <p className="text-xs text-gray-500 mt-1">Format: PDF, JPG, PNG (Max 5MB)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fotokopi KTP <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange('ktp')}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              <p className="text-xs text-gray-500 mt-1">Format: PDF, JPG, PNG (Max 5MB)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surat Permohonan <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange('surat_permohonan')}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              <p className="text-xs text-gray-500 mt-1">Format: PDF, JPG, PNG (Max 5MB)</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">📋 Catatan Penting:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Pastikan semua dokumen dalam kondisi jelas dan terbaca</li>
              <li>• Ukuran file maksimal 5MB per dokumen</li>
              <li>• Surat permohonan dapat dibuat secara manual atau diketik</li>
              <li>• Dokumen akan diverifikasi oleh petugas sebelum penerbitan surat</li>
            </ul>
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
