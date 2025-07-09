"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SuratKematianPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    namaAyah: "",
    nikAyah: "",
    namaIbu: "",
    nikIbu: "",
    nikJenazah: "",
    namaJenazah: "",
    alamatJenazah: "",
    jenazahAnakKe: "",
    tanggalKematian: "",
    sebabKematian: "",
    tempatKematianJenazah: "",
    nikPelapor: "",
    namaPelapor: "",
    hubunganPelapor: "",
    nikSaksi1: "",
    namaSaksi1: "",
    alamatSaksi1: "",
    nikSaksi2: "",
    namaSaksi2: "",
    alamatSaksi2: "",
  });
  const [pengantarFile, setPengantarFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setPengantarFile(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Kirim data ke backend
    alert("Pengajuan Surat Keterangan Kematian berhasil dikirim!");
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
        <h2 className="text-xl font-bold mb-6 text-gray-900 text-center">
          Pengajuan : Surat Keterangan Kematian
        </h2>
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
          {/* Nama Ayah */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Nama Ayah <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="namaAyah"
              value={form.namaAyah}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* NIK Ayah */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              NIK Ayah <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nikAyah"
              value={form.nikAyah}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Nama Ibu */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Nama Ibu <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="namaIbu"
              value={form.namaIbu}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* NIK Ibu */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              NIK Ibu <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nikIbu"
              value={form.nikIbu}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* NIK Jenazah */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              NIK Jenazah <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nikJenazah"
              value={form.nikJenazah}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Nama Lengkap Jenazah */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Nama Lengkap Jenazah <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="namaJenazah"
              value={form.namaJenazah}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Alamat Jenazah */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Alamat Jenazah <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="alamatJenazah"
              value={form.alamatJenazah}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Jenazah Anak Ke */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Jenazah Anak Ke <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="jenazahAnakKe"
              value={form.jenazahAnakKe}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Tanggal Kematian */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Tanggal Kematian <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggalKematian"
              value={form.tanggalKematian}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Sebab Kematian */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Sebab Kematian <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="sebabKematian"
              value={form.sebabKematian}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Tempat Kematian Jenazah */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Tempat Kematian Jenazah <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="tempatKematianJenazah"
              value={form.tempatKematianJenazah}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* NIK Pelapor */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              NIK Pelapor <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nikPelapor"
              value={form.nikPelapor}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Nama Lengkap Pelapor */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Nama Lengkap Pelapor <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="namaPelapor"
              value={form.namaPelapor}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Hubungan Pelapor Dengan Keluarga Meninggal */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Hubungan Pelapor Dengan Keluarga Meninggal{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="hubunganPelapor"
              value={form.hubunganPelapor}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* NIK Saksi I */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              NIK Saksi I <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nikSaksi1"
              value={form.nikSaksi1}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Nama Lengkap Saksi I */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Nama Lengkap Saksi I <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="namaSaksi1"
              value={form.namaSaksi1}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Alamat Saksi I */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Alamat Saksi I <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="alamatSaksi1"
              value={form.alamatSaksi1}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* NIK Saksi II */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              NIK Saksi II <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nikSaksi2"
              value={form.nikSaksi2}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Nama Lengkap Saksi II */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Nama Lengkap Saksi II <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="namaSaksi2"
              value={form.namaSaksi2}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Alamat Saksi II */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Alamat Saksi II <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="alamatSaksi2"
              value={form.alamatSaksi2}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          {/* Surat Pengantar RT */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Surat Pengantar RT <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFile}
              className="block w-full text-gray-900"
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
            >
              Ajukan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
