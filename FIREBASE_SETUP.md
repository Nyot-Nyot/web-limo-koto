# Firebase Setup untuk Website Nagari Lima Koto

## Konfigurasi Environment Variables

Untuk menggunakan Firebase di website ini, Anda perlu membuat file `.env.local` di root directory dengan konfigurasi berikut:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Cara Mendapatkan Konfigurasi Firebase

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project Anda atau buat project baru
3. Klik ikon gear (⚙️) di sidebar kiri
4. Pilih "Project settings"
5. Scroll ke bawah ke bagian "Your apps"
6. Klik "Add app" dan pilih "Web"
7. Copy konfigurasi yang diberikan

## Struktur Database Firestore

Website ini menggunakan koleksi berikut di Firestore:

### 1. Koleksi `berita`
```javascript
{
  title: string,
  excerpt: string,
  tags: array,
  categoryColor: string,
  imageSrc: string,
  isFeatured: boolean,
  blocks: array,
  href: string,
  date: string,
  views: number,
  category: string,
  backgroundGradient: string,
  emoji: string
}
```

### 2. Koleksi `pejabat`
```javascript
{
  name: string,
  title: string,
  jorong: string (optional),
  image: string,
  description: string
}
```

### 3. Koleksi `faq`
```javascript
{
  question: string,
  answer: string,
  category: string
}
```

### 4. Koleksi `jorong`
```javascript
{
  name: string,
  population: string,
  area: string,
  coordinates: { lat: number, lng: number },
  color: string,
  description: string,
  facilities: array
}
```

### 5. Koleksi `galeri`
```javascript
{
  title: string,
  description: string,
  category: string,
  image: string
}
```

### 6. Koleksi `agenda`
```javascript
{
  title: string,
  organizer: string,
  location: string,
  date: string,
  time: string
}
```

## Masalah yang Ditemukan

Saat ini halaman beranda hanya menampilkan data lokal karena:

1. **Tidak ada konfigurasi Firebase**: Environment variables belum diset
2. **Tidak ada data di Firestore**: Koleksi-koleksi di atas belum dibuat atau kosong
3. **API endpoint baru dibuat**: `/api/home` sekarang mengambil data dari Firebase

## Solusi

1. **Setup Firebase**: Ikuti langkah-langkah di atas untuk mengkonfigurasi Firebase
2. **Tambahkan data ke Firestore**: Buat koleksi dan tambahkan data sesuai struktur di atas
3. **Test API**: Setelah setup, test endpoint `/api/home` untuk memastikan data terambil dengan benar

## Testing

Setelah setup selesai, Anda bisa test dengan:

```bash
# Test API endpoint
curl http://localhost:3000/api/home

# Atau buka di browser
http://localhost:3000/api/home
```

Jika berhasil, Anda akan melihat data dari Firebase. Jika gagal, akan menggunakan data lokal sebagai fallback. 