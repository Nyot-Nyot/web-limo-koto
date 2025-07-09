"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SKTMPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    pekerjaan: "",
    alamat: "",
    keperluan: "",
    jenisKelamin: "",
    tempatTanggalLahir: "",
    agama: "",
    namaKK: "",
    dtks: "",
  });
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [kkFile, setKkFile] = useState<File | null>(null);
  const [pengantarFile, setPengantarFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (setter: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setter(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Kirim data ke backend
    alert("Pengajuan SKTM berhasil dikirim!");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black/70 to-black/80 pb-12 overflow-x-hidden flex items-center justify-center">
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('/images/Rectangle.png') center/cover`,
        }}
      />
      <button
        onClick={() => router.push("/layanan")}
        className="absolute top-6 left-6 bg-white/80 backdrop-blur-md text-gray-900 px-4 py-2 rounded-lg shadow hover:bg-yellow-400/80 font-semibold flex items-center gap-2 z-10"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path
            d="M15 19l-7-7 7-7"
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Kembali ke Layanan
      </button>
      <div className="relative z-10 bg-white/90 rounded-xl shadow-xl max-w-lg w-full mx-auto p-6 md:p-10">
        <h2 className="text-xl font-bold mb-6 text-gray-900 text-center">Pengajuan Surat Keterangan Tidak Mampu</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Preview Profil Pengaju */}
          <div>
            <div className="flex flex-col md:flex-row gap-4 mb-2">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                  Nama Lengkap sesuai KTP
                </label>
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 bg-gray-100"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                  NIK
                </label>
                <input
                  type="text"
                  name="nik"
                  value={form.nik}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 bg-gray-100"
                  required
                />
              </div>
            </div>
          </div>
          <hr />
          {/* Berkas Persyaratan */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              KTP <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFile(setKtpFile)}
              className="block w-full text-gray-900"
              required
            />
          </div>
          <hr />
          {/* Pekerjaan */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Pekerjaan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="pekerjaan"
              value={form.pekerjaan}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          <hr />
          {/* Alamat */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Alamat <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          <hr />
          {/* Keperluan */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Keperluan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="keperluan"
              value={form.keperluan}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* KK */}
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              KK <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFile(setKkFile)}
              className="block w-full text-gray-900"
              required
            />
          </div>
          <hr />
          {/* Jenis Kelamin */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Jenis Kelamin <span className="text-red-500">*</span>
            </label>
            <select
              name="jenisKelamin"
              value={form.jenisKelamin}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <hr />
          {/* NIK */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              NIK <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nik"
              value={form.nik}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Tempat dan Tanggal Lahir */}
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Tempat dan Tanggal Lahir <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="tempatTanggalLahir"
              value={form.tempatTanggalLahir}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          <hr />
          {/* Agama */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Agama <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="agama"
              value={form.agama}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Nama */}
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Nama <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="namaKK"
              value={form.namaKK}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Surat Pengantar RT */}
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Surat Pengantar RT
            </label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFile(setPengantarFile)}
              className="block w-full text-gray-900"
            />
          </div>
          <hr />
          {/* DTKS */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Apakah sudah masuk Data Terpadu Keluarga Sejahtera, silahkan isi (sudah/belum) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="dtks"
              value={form.dtks}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Tombol */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={() => router.push("/layanan")}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold"
            >
              Kirim Pengajuan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
