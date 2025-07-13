# Dokumentasi Perubahan SKPindahForm

## Perubahan yang Dilakukan

### 1. Penambahan Interface untuk Anggota Keluarga

Ditambahkan interface baru untuk menangani data anggota keluarga:

```typescript
interface AnggotaKeluarga {
  nama: string;
  hubungan: string;
}
```

### 2. Update Interface SKPindahFormData

Ditambahkan field `anggota_keluarga` bertipe array:

```typescript
// Anggota keluarga yang ikut pindah
anggota_keluarga: AnggotaKeluarga[];
```

### 3. Fungsi Pengelolaan Anggota Keluarga

Ditambahkan tiga fungsi untuk mengelola data anggota keluarga:

- `addAnggotaKeluarga()` - Menambah anggota keluarga baru
- `removeAnggotaKeluarga(index)` - Menghapus anggota keluarga berdasarkan index
- `updateAnggotaKeluarga(index, field, value)` - Mengupdate data anggota keluarga

### 4. Update HandleSubmit

Diperbarui untuk menangani array `anggota_keluarga` dengan JSON.stringify() agar dapat dikirim melalui FormData.

### 5. Section UI Anggota Keluarga

Ditambahkan section baru dengan:
- Header dengan tombol "Tambah Anggota"
- Dynamic list untuk setiap anggota keluarga
- Form input untuk nama dan hubungan keluarga
- Dropdown hubungan keluarga dengan opsi lengkap
- Tombol hapus untuk setiap anggota
- State kosong dengan pesan informatif

### 6. Template Integration

Data `anggota_keluarga` akan dikirim sebagai JSON string yang dapat di-parse di backend untuk mengisi template loop `{#anggota_keluarga}` dengan format:
- Nama: {nama}, Hubungan: {hubungan}

## Cara Penggunaan

1. Pengguna mengisi form data pemohon dan data kepindahan
2. Klik "Tambah Anggota" untuk menambahkan anggota keluarga yang ikut pindah
3. Isi nama lengkap dan pilih hubungan keluarga dari dropdown
4. Ulangi untuk setiap anggota keluarga yang ikut pindah
5. Data akan otomatis disertakan dalam dokumen yang dihasilkan

## Validasi

- Semua field nama dan hubungan wajib diisi (required)
- Dropdown hubungan keluarga memiliki opsi standar sesuai KK

## Backend Integration

Data anggota_keluarga dikirim sebagai JSON string yang perlu di-parse di backend:

```javascript
const anggotaKeluarga = JSON.parse(formData.get('anggota_keluarga'));
// anggotaKeluarga akan berupa array object: [{nama: "...", hubungan: "..."}]
```
