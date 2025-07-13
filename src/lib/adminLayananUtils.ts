import { FormData } from '@/types/layanan';

export const generateDocument = async (
  jenisLayanan: string,
  formData: FormData,
  nomorPermohonan: string
) => {
  try {
    console.log('Generating document for:', jenisLayanan);
    
    // This would typically generate a PDF or DOCX file
    // For demo purposes, we'll create a simple text document
    const documentContent = createDocumentContent(jenisLayanan, formData, nomorPermohonan);
    
    // Create a blob and download
    const blob = new Blob([documentContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${nomorPermohonan}-${jenisLayanan}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error generating document:', error);
    return false;
  }
};

const createDocumentContent = (
  jenisLayanan: string,
  formData: FormData,
  nomorPermohonan: string
) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let content = `
PEMERINTAHAN NAGARI LIMA KOTO
KANTOR WALI NAGARI
Jalan Nagari Lima Koto, Kecamatan Harau, Kabupaten Lima Puluh Kota
Sumatera Barat

SURAT KETERANGAN ${jenisLayanan.toUpperCase()}
Nomor: ${nomorPermohonan}

Yang bertanda tangan di bawah ini, Wali Nagari Lima Koto, Kecamatan Harau, 
Kabupaten Lima Puluh Kota, Provinsi Sumatera Barat, menerangkan dengan 
sebenarnya bahwa:

Nama                 : ${formData.nama}
NIK                  : ${formData.nik}
Tempat/Tanggal Lahir : ${formData.tempatTanggalLahir}
Jenis Kelamin        : ${formData.jenisKelamin}
Agama                : ${formData.agama}
Pekerjaan            : ${formData.pekerjaan || '-'}
Alamat               : ${formData.alamat}
`;

  // Add specific content based on document type
  switch (jenisLayanan) {
    case 'domisili':
      content += `
Adalah benar-benar berdomisili di wilayah Nagari Lima Koto sejak tahun ________
dan masih aktif berdomisili hingga saat ini.

Surat keterangan ini dibuat untuk keperluan: ${formData.keperluan || 'administrasi'}
`;
      break;
    case 'usaha':
      content += `
Adalah benar-benar menjalankan usaha di wilayah Nagari Lima Koto dengan 
keterangan sebagai berikut:
- Nama Usaha: ${(formData as any).nama_usaha || '-'}
- Alamat Usaha: ${(formData as any).tempat_usaha || '-'}
- Jenis Usaha: ${(formData as any).jenis_usaha || '-'}
`;
      break;
    case 'kelahiran':
      content += `
Adalah benar-benar telah lahir di wilayah Nagari Lima Koto dan terdaftar 
sebagai penduduk Nagari Lima Koto.
`;
      break;
    default:
      content += `
Adalah benar-benar warga Nagari Lima Koto yang berdomisili di alamat tersebut di atas.
`;
  }

  content += `
Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan 
sebagaimana mestinya.

Dikeluarkan di : Lima Koto
Pada tanggal   : ${currentDate}

Wali Nagari Lima Koto



H. Ahmad Syafrizal
`;

  return content;
};

export const sendSMSNotification = async (
  nomorHP: string,
  jenisLayanan: string,
  nomorPermohonan: string,
  status: string,
  alasanTolak?: string
) => {
  try {
    let message = '';

    switch (status) {
      case 'pending':
        message = `Halo! Permohonan ${jenisLayanan} Anda dengan nomor ${nomorPermohonan} telah diterima dan sedang dalam proses review. Terima kasih. - Nagari Lima Koto`;
        break;
      case 'approved':
        message = `Halo! Permohonan ${jenisLayanan} Anda dengan nomor ${nomorPermohonan} telah disetujui dan sedang dalam proses tanda tangan. Mohon menunggu notifikasi selanjutnya. - Nagari Lima Koto`;
        break;
      case 'selesai':
        message = `Halo! Permohonan ${jenisLayanan} Anda dengan nomor ${nomorPermohonan} telah selesai diproses. Silakan datang ke kantor Wali Nagari untuk mengambil surat keterangan Anda pada jam kerja. - Nagari Lima Koto`;
        break;
      case 'ditolak':
        message = `Halo! Permohonan ${jenisLayanan} Anda dengan nomor ${nomorPermohonan} tidak dapat diproses. Alasan: ${alasanTolak || 'Tidak disebutkan'}. Silakan hubungi kantor Wali Nagari untuk informasi lebih lanjut. - Nagari Lima Koto`;
        break;
      default:
        message = `Halo! Status permohonan ${jenisLayanan} Anda dengan nomor ${nomorPermohonan} telah diupdate. Silakan cek status terbaru. - Nagari Lima Koto`;
    }

    const formattedNumber = nomorHP.replace(/\D/g, '').replace(/^0/, '62');

    console.log(`SMS akan dikirim ke: ${formattedNumber}`);
    console.log(`Isi pesan: ${message}`);

    const smsData = {
      to: formattedNumber,
      message: message,
      from: 'NagariLimaKoto'
    };

    await new Promise(resolve => setTimeout(resolve, 1000));

    alert(`SMS berhasil disiapkan untuk dikirim!\n\nNomor: ${formattedNumber}\nPesan: ${message}\n\nNote: Dalam implementasi produksi, SMS akan dikirim melalui SMS gateway.`);

    return true;
  } catch (error) {
    console.error('Error sending SMS notification:', error);
    return false;
  }
};

export const sendWhatsAppNotification = async (
  nomorHP: string,
  jenisLayanan: string,
  nomorPermohonan: string,
  status: string
) => {
  try {
    let message = '';
    
    switch (status) {
      case 'approved':
        message = `Halo! Permohonan ${jenisLayanan} Anda dengan nomor ${nomorPermohonan} telah disetujui dan sedang dalam proses tanda tangan. Mohon menunggu notifikasi selanjutnya.`;
        break;
      case 'selesai':
        message = `Halo! Permohonan ${jenisLayanan} Anda dengan nomor ${nomorPermohonan} telah selesai diproses. Silakan datang ke kantor Wali Nagari untuk mengambil surat keterangan Anda pada jam kerja.`;
        break;
      case 'ditolak':
        message = `Halo! Permohonan ${jenisLayanan} Anda dengan nomor ${nomorPermohonan} tidak dapat diproses. Silakan hubungi kantor Wali Nagari untuk informasi lebih lanjut.`;
        break;
      default:
        message = `Halo! Status permohonan ${jenisLayanan} Anda dengan nomor ${nomorPermohonan} telah diupdate. Silakan cek status terbaru.`;
    }
    
    // Format nomor HP untuk WhatsApp
    const formattedNumber = nomorHP.replace(/^0/, '62');
    const whatsappURL = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    return true;
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    return false;
  }
};

export const exportToExcel = (data: any[], filename: string = 'permohonan-layanan.xlsx') => {
  try {
    // This would typically use a library like xlsx or exceljs
    // For demo purposes, we'll create a CSV file
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.replace('.xlsx', '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    return false;
  }
};

const convertToCSV = (data: any[]) => {
  const headers = [
    'Nomor Permohonan',
    'Nama Pemohon',
    'NIK',
    'Jenis Layanan',
    'Tanggal Pengajuan',
    'Status',
    'Nomor HP'
  ];
  
  const csvRows = [headers.join(',')];
  
  data.forEach(item => {
    const values = [
      item.nomorPermohonan,
      item.namaPemohon,
      item.nik,
      item.jenisLayanan,
      item.tanggalPengajuan.toLocaleDateString('id-ID'),
      item.status,
      item.nomorHP
    ];
    csvRows.push(values.join(','));
  });
  
  return csvRows.join('\n');
};
