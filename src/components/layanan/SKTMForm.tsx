import React, { memo, useState, useCallback } from 'react';
import { FormData } from '@/types/layanan';
import { FormField, FileUpload, BaseForm } from './FormComponents';

interface SKTMFormProps {
  onClose: () => void;
}

const SKTMForm = memo<SKTMFormProps>(({ onClose }) => {
  const [form, setForm] = useState<FormData>({
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

  const [files, setFiles] = useState({
    ktp: null as File | null,
    kk: null as File | null,
    pengantar: null as File | null,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleFile = useCallback((fileType: keyof typeof files) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setFiles(prev => ({ ...prev, [fileType]: e.target.files![0] }));
      }
    }, []
  );

  return (
    <BaseForm onClose={onClose} title="Surat Keterangan Tidak Mampu (SKTM)">
      {/* Data Pengaju */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Pengaju</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Nama Lengkap sesuai KTP"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            required
          />
          <FormField
            label="NIK"
            name="nik"
            value={form.nik}
            onChange={handleChange}
            required
          />
          <FormField
            label="Jenis Kelamin"
            name="jenisKelamin"
            type="select"
            value={form.jenisKelamin}
            onChange={handleChange}
            options={["Laki-laki", "Perempuan"]}
            required
          />
          <FormField
            label="Tempat, Tanggal Lahir"
            name="tempatTanggalLahir"
            value={form.tempatTanggalLahir}
            onChange={handleChange}
            placeholder="Contoh: Jakarta, 01 Januari 1990"
            required
          />
          <FormField
            label="Agama"
            name="agama"
            type="select"
            value={form.agama}
            onChange={handleChange}
            options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Khonghucu"]}
            required
          />
          <FormField
            label="Pekerjaan"
            name="pekerjaan"
            value={form.pekerjaan || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Data Tambahan */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Tambahan</h3>
        <div className="space-y-4">
          <FormField
            label="Alamat Lengkap"
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            required
          />
          <FormField
            label="Keperluan SKTM"
            name="keperluan"
            value={form.keperluan || ""}
            onChange={handleChange}
            placeholder="Contoh: Beasiswa pendidikan, bantuan sosial, dll"
            required
          />
          <FormField
            label="No. DTKS (jika ada)"
            name="dtks"
            value={form.dtks || ""}
            onChange={handleChange}
            placeholder="Nomor Data Terpadu Kesejahteraan Sosial"
          />
          <FormField
            label="Nama Kepala Keluarga"
            name="namaKK"
            value={form.namaKK}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Berkas Persyaratan */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Berkas Persyaratan</h3>
        <div className="space-y-4">
          <FileUpload
            label="KTP"
            onChange={handleFile('ktp')}
            required
          />
          <FileUpload
            label="KK"
            onChange={handleFile('kk')}
            required
          />
          <FileUpload
            label="Surat Pengantar RT/RW"
            onChange={handleFile('pengantar')}
            required
          />
        </div>
      </div>
    </BaseForm>
  );
});

SKTMForm.displayName = 'SKTMForm';

export default SKTMForm;
