# Panduan Penggunaan Anggota Keluarga di SKPindahForm

## Status Implementasi ✅

### 1. Interface dan State Management
- ✅ Interface `AnggotaKeluarga` sudah dibuat dengan field `nama` dan `hubungan`
- ✅ Field `anggota_keluarga: AnggotaKeluarga[]` sudah ditambahkan ke `SKPindahFormData`
- ✅ State management untuk array anggota keluarga sudah lengkap

### 2. UI Components
- ✅ Section "Anggota Keluarga yang Ikut Pindah" sudah dibuat
- ✅ Tombol "Tambah Anggota" sudah berfungsi
- ✅ Form input untuk nama dan hubungan keluarga sudah lengkap
- ✅ Dropdown hubungan keluarga dengan opsi yang sesuai KK
- ✅ Tombol hapus untuk setiap anggota sudah ada
- ✅ Validasi required untuk kedua field

### 3. Functions
- ✅ `addAnggotaKeluarga()` - menambah anggota baru
- ✅ `removeAnggotaKeluarga(index)` - menghapus anggota berdasarkan index  
- ✅ `updateAnggotaKeluarga(index, field, value)` - update data anggota

### 4. Data Handling
- ✅ Data dikirim sebagai JSON string melalui FormData
- ✅ Backend parsing JSON sudah diperbaiki di `docxGenerator.ts`
- ✅ Debug logging ditambahkan untuk troubleshooting

### 5. Template Integration
- ✅ Template syntax yang benar: `{#anggota_keluarga}...{/anggota_keluarga}`
- ✅ Field mapping: `{nama}` dan `{hubungan}` di dalam loop
- ✅ Data array properly passed ke docxtemplater

## Cara Testing

1. **Buka halaman layanan**
2. **Pilih "Surat Keterangan Pindah"**
3. **Isi data utama (nama, NIK, alamat, dll)**
4. **Di section "Anggota Keluarga yang Ikut Pindah":**
   - Klik "Tambah Anggota"
   - Isi nama lengkap
   - Pilih hubungan keluarga
   - Tambah lebih banyak jika diperlukan
5. **Submit form**
6. **Cek console browser untuk debug logs**
7. **Download dan cek dokumen hasil**

## Debug Logs Yang Ditambahkan

```javascript
// Di SKPindahForm.tsx
console.log('Anggota Keluarga Data:', formData.anggota_keluarga);

// Di docxGenerator.ts  
console.log('Parsed anggota_keluarga:', anggotaKeluarga);
console.log('Complete template data for SKPindah:', templateData);
```

## Troubleshooting

### Jika loop tidak muncul di dokumen:
1. Pastikan template syntax benar: `{#anggota_keluarga}` ... `{/anggota_keluarga}`
2. Cek console logs untuk memastikan data terkirim
3. Pastikan array tidak kosong
4. Cek struktur data: `[{nama: "...", hubungan: "..."}]`

### Format Data yang Dikirim:
```json
{
  "anggota_keluarga": [
    {"nama": "John Doe", "hubungan": "Anak"},
    {"nama": "Jane Doe", "hubungan": "Istri"}
  ]
}
```

## Template Docx Expected Format

Di dalam template SKPindah.docx:
```
Anggota keluarga yang ikut pindah:
{#anggota_keluarga}
•	Nama: {nama}, Hubungan: {hubungan}
{/anggota_keluarga}
```

Akan menghasilkan:
```
Anggota keluarga yang ikut pindah:
•	Nama: John Doe, Hubungan: Anak
•	Nama: Jane Doe, Hubungan: Istri
```
