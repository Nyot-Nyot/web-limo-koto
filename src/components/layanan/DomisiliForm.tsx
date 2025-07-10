import React, { memo, useState, useCallback } from 'react';
import { FormData } from '@/types/layanan';
import { FormField, FileUpload, BaseForm } from './FormComponents';

interface DomisiliFormProps {
  onClose: () => void;
}

const DomisiliForm = memo<DomisiliFormProps>(({ onClose }) => {
  const [form, setForm] = useState<FormData>({
    nama: "",
    nik: "",
    alamat: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kampung: "",
    dusun: "",
    rk: "",
    rt: "",
    jenisKelamin: "",
    tempatTanggalLahir: "",
    agama: "",
    kewarganegaraan: "",
    namaKK: "",
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
    <BaseForm onClose={onClose} title="Surat Keterangan Domisili">
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
            label="Kewarganegaraan"
            name="kewarganegaraan"
            value={form.kewarganegaraan || ""}
            onChange={handleChange}
            placeholder="Contoh: WNI"
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

      {/* Data Domisili */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Domisili</h3>
        <div className="space-y-4">
          <FormField
            label="Alamat Lengkap"
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            placeholder="Jalan, Nomor Rumah, RT/RW"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Provinsi"
              name="provinsi"
              value={form.provinsi || ""}
              onChange={handleChange}
              required
            />
            <FormField
              label="Kabupaten"
              name="kabupaten"
              value={form.kabupaten || ""}
              onChange={handleChange}
              required
            />
            <FormField
              label="Kecamatan"
              name="kecamatan"
              value={form.kecamatan || ""}
              onChange={handleChange}
              required
            />
            <FormField
              label="Kelurahan/Nagari"
              name="kampung"
              value={form.kampung || ""}
              onChange={handleChange}
              required
            />
            <FormField
              label="RK"
              name="rk"
              value={form.rk || ""}
              onChange={handleChange}
              required
            />
            <FormField
              label="RT"
              name="rt"
              value={form.rt || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
    </BaseForm>
  );
});

DomisiliForm.displayName = 'DomisiliForm';

export default DomisiliForm;
