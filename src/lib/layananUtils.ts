import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

// Interface untuk data permohonan yang akan disimpan ke Firestore
export interface PermohonanLayanan {
  nomorPermohonan: string;
  namaPemohon: string;
  nik: string;
  jenisLayanan: string;
  tanggalPengajuan: Timestamp | ReturnType<typeof serverTimestamp>;
  status: 'pending' | 'approved' | 'selesai' | 'ditolak';
  nomorHP: string;
  data: Record<string, string | number | boolean | File | null>;
  timeline: {
    diajukan: Timestamp | ReturnType<typeof serverTimestamp>;
    direview?: Timestamp | ReturnType<typeof serverTimestamp>;
    disetujui?: Timestamp | ReturnType<typeof serverTimestamp>;
    selesai?: Timestamp | ReturnType<typeof serverTimestamp>;
  };
  notifikasi: {
    terkirim: boolean;
    tanggal?: Timestamp | ReturnType<typeof serverTimestamp>;
    error?: string;
  };
  catatan?: string;
  alasanTolak?: string;
  attachments?: Record<string, { url: string; filename: string; type: string }>;
}

// Fungsi untuk generate nomor permohonan
export const generateNomorPermohonan = (jenisLayanan: string): string => {
  const prefixMap: Record<string, string> = {
    'SKDomisili': 'DOM',
    'SKKelahiran': 'KEL',
    'SKMeninggalDunia': 'MEN',
    'SKPindah': 'PIN',
    'SKTempatTinggal': 'TMP',
    'SKU_AN': 'USH'
  };
  
  const prefix = prefixMap[jenisLayanan] || 'SKT';
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `${prefix}-${year}${month}-${random}`;
};

// Fungsi untuk menyimpan data permohonan ke Firestore
export const savePermohonanToFirestore = async (
  jenisLayanan: string,
  formData: Record<string, string | number | boolean | File | null>,
  nomorHP: string,
  attachments?: Record<string, { url: string; filename: string; type: string }>
): Promise<string> => {
  try {
    const nomorPermohonan = generateNomorPermohonan(jenisLayanan);
    
    // Ambil nama pemohon dari berbagai kemungkinan field
    const namaPemohon = String(formData.nama_orang_2 || formData.nama || formData.namaPemohon || 'Nama tidak tersedia');
    
    // Ambil NIK dari berbagai kemungkinan field
    const nik = String(formData.nik || formData.NIK || 'NIK tidak tersedia');
    
    // Clean formData to remove undefined/null and non-primitive values
    const cleanedData: Record<string, string | number | boolean> = Object.fromEntries(
      Object.entries(formData)
        .filter(([, value]) => value != null && ['string', 'number', 'boolean'].includes(typeof value))
    );
    // Build the Firestore document data
    const permohonanData: any = {
      nomorPermohonan,
      namaPemohon,
      nik,
      jenisLayanan,
      tanggalPengajuan: serverTimestamp(),
      status: 'pending',
      nomorHP,
      data: cleanedData,
      timeline: { diajukan: serverTimestamp() },
      notifikasi: { terkirim: false },
      // Attach URLs for uploaded files
      ...(attachments ? { attachments } : {})
    } as PermohonanLayanan;
    
    const docRef = await addDoc(collection(db, 'permohonan_layanan'), permohonanData);
    console.log('Permohonan berhasil disimpan dengan ID:', docRef.id);
    
    return nomorPermohonan;
  } catch (error) {
    console.error('Error menyimpan permohonan:', error);
    throw new Error('Gagal menyimpan data permohonan');
  }
};

// Fungsi untuk upload file ke Firebase Storage (opsional - bisa digunakan nanti)
export const uploadFileToStorage = async (
  file: File,
  path: string
): Promise<string> => {
  // Implementasi upload file ke Firebase Storage
  // Saat ini return dummy URL
  return `https://firebasestorage.googleapis.com/dummy/${path}`;
};

// Fungsi untuk convert file ke base64 (untuk menyimpan dalam Firestore)
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Fungsi untuk menyimpan file-file yang diupload
export const processUploadedFiles = async (
  files: Record<string, File | null>
): Promise<Record<string, string>> => {
  const processedFiles: Record<string, string> = {};
  
  for (const [key, file] of Object.entries(files)) {
    if (file) {
      try {
        // Convert file to base64 for storage in Firestore
        const base64 = await fileToBase64(file);
        processedFiles[key] = base64;
      } catch (error) {
        console.error(`Error processing file ${key}:`, error);
        processedFiles[key] = 'Error processing file';
      }
    }
  }
  
  return processedFiles;
};
