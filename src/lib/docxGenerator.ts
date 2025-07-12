import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import fs from 'fs';
import path from 'path';

export class DocxGenerator {
  private templateDir = path.join(process.cwd(), 'templates');

  async generateDocument(
    serviceType: string,
    formData: Record<string, any>
  ): Promise<Buffer> {
    try {
      // Load template file
      const templatePath = path.join(this.templateDir, `${serviceType}.docx`);
      
      if (!fs.existsSync(templatePath)) {
        throw new Error(`Template file not found: ${templatePath}`);
      }

      const content = fs.readFileSync(templatePath, 'binary');

      // Create zip instance
      const zip = new PizZip(content);

      // Create docxtemplater instance
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // Prepare data with additional fields
      const templateData = this.prepareTemplateData(serviceType, formData);

      // Render the document
      doc.render(templateData);

      // Generate buffer
      const buffer = doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE',
      });

      return buffer;
    } catch (error) {
      console.error('Error generating document:', error);
      const errorMessage = (error instanceof Error) ? error.message : String(error);
      throw new Error(`Failed to generate document: ${errorMessage}`);
    }
  }

  private prepareTemplateData(serviceType: string, formData: Record<string, any>) {
    // Common data for all documents
    const currentDate = new Date();
    const commonData = {
      tanggal_surat: this.formatDate(currentDate),
      bulan_tahun: this.formatMonthYear(currentDate),
      nomor_surat: this.generateSuratNumber(serviceType),
      nama_nagari: 'Nagari Limo Koto',
      nama_wali: 'Wali Nagari Limo Koto', // This should come from config
      ...formData
    };

    // Service-specific data preparation
    switch (serviceType) {
      case 'SKU_AN':
        return this.prepareUsahaData(commonData);
      case 'SKDomisili':
        return this.prepareDomisiliData(commonData);
      case 'SKKelahiran':
        return this.prepareKelahiranData(commonData);
      case 'SKMeninggalDunia':
        return this.prepareMeninggalData(commonData);
      case 'SKPindah':
        return this.preparePindahData(commonData);
      case 'SKTempatTinggal':
        return this.prepareTempatTinggalData(commonData);
      default:
        return commonData;
    }
  }

  private prepareUsahaData(data: any) {
    const currentDate = new Date();
    
    return {
      // Placeholder yang sesuai dengan template
      nama_orang_1: '[Akan diisi admin]', // Akan diisi admin
      jabatan_orang_1: '[Akan diisi admin]', // Akan diisi admin
      nama_orang_2: data.nama_orang_2 || '',
      tempat_tanggal_lahir: data.tempat_tanggal_lahir || '',
      nik: data.nik || '',
      agama: data.agama || '',
      pekerjaan: data.pekerjaan || '',
      status: data.status || '',
      alamat: data.alamat || '',
      nama_usaha: data.nama_usaha || '',
      tempat_usaha: data.tempat_usaha || '',
      nama_nagari: data.nama_nagari || 'Nagari Limo Koto',
      nama_kecamatan: data.nama_kecamatan || 'Kecamatan Sijunjung',
      nama_kabupaten: data.nama_kabupaten || 'Kabupaten Sijunjung',
      nama_sekretaris: '[Akan diisi admin]',
      tanggal: this.formatDate(currentDate)
    };
  }

  private prepareDomisiliData(data: any) {
    const currentDate = new Date();
    
    return {
      // Placeholder yang sesuai dengan template domisili
      nama_orang_1: '[Akan diisi admin]', // Akan diisi admin
      jabatan_orang_1: '[Akan diisi admin]', // Akan diisi admin
      nama_orang_2: data.nama_orang_2 || '',
      tempat_tanggal_lahir: data.tempat_tanggal_lahir || '',
      nik: data.nik || '',
      jenis_kelamin: data.jenis_kelamin || '',
      agama: data.agama || '',
      status: data.status || '',
      pekerjaan: data.pekerjaan || '',
      alamat: data.alamat || '',
      nama_jorong: data.nama_jorong || '',
      nama_nagari: data.nama_nagari || 'Nagari Limo Koto',
      nama_kecamatan: data.nama_kecamatan || 'Koto IV',
      nama_kabupaten: data.nama_kabupaten || 'Kabupaten Sijunjung',
      tujuan: data.tujuan || '',
      tanggal: this.formatDate(currentDate)
    };
  }

  private prepareKelahiranData(data: any) {
    const currentDate = new Date();
    
    return {
      // Placeholder yang sesuai dengan template kelahiran
      nama_orang_1: '[Akan diisi admin]', // Akan diisi admin
      jabatan_orang_1: '[Akan diisi admin]', // Akan diisi admin
      hari: data.hari || '',
      tanggal: data.tanggal || '',
      jam: data.jam || '',
      tempat: data.tempat || '',
      nama_orang_2: data.nama_orang_2 || '', // nama bayi
      jenis_kelamin: data.jenis_kelamin || '',
      nama_ibu: data.nama_ibu || '',
      nama_ayah: data.nama_ayah || '',
      alamat: data.alamat || '',
      tanggal_saat_ini: this.formatDate(currentDate)
    };
  }

  private prepareMeninggalData(data: any) {
    const currentDate = new Date();
    
    return {
      // Placeholder yang sesuai dengan template meninggal dunia
      nama_orang_1: '[Akan diisi admin]', // Akan diisi admin
      jabatan_orang_1: '[Akan diisi admin]', // Akan diisi admin
      nama_orang_2: data.nama_orang_2 || '', // nama almarhum
      tempat_tanggal_lahir: data.tempat_tanggal_lahir || '',
      nik: data.nik || '',
      agama: data.agama || '',
      jenis_kelamin: data.jenis_kelamin || '',
      alamat: data.alamat || '',
      hari_tanggal_meninggal: data.hari_tanggal_meninggal || '',
      jam: data.jam || '',
      meninggal_di: data.meninggal_di || '',
      disebabkan: data.disebabkan || '',
      dikebumikan_di: data.dikebumikan_di || '',
      tanggal: this.formatDate(currentDate)
    };
  }

  private preparePindahData(data: any) {
    const currentDate = new Date();
    
    return {
      // Placeholder yang sesuai dengan template pindah
      nama_orang_1: '[Akan diisi admin]', // Akan diisi admin
      jabatan_orang_1: '[Akan diisi admin]', // Akan diisi admin
      nomor_kk: data.nomor_kk || '',
      nama_orang_2: data.nama_orang_2 || '', // nama yang pindah
      nik: data.nik || '',
      
      // Data daerah asal
      desa_kelurahan_asal: data.desa_kelurahan_asal || '',
      kecamatan_asal: data.kecamatan_asal || '',
      kabupaten_kota_asal: data.kabupaten_kota_asal || '',
      provinsi_asal: data.provinsi_asal || '',
      
      // Data kepindahan
      alasan_pindah: data.alasan_pindah || '',
      klasifikasi_pindah: data.klasifikasi_pindah || '',
      desa_kelurahan_tujuan: data.desa_kelurahan_tujuan || '',
      kecamatan_tujuan: data.kecamatan_tujuan || '',
      kabupaten_kota_tujuan: data.kabupaten_kota_tujuan || '',
      provinsi_tujuan: data.provinsi_tujuan || '',
      
      tanggal: this.formatDate(currentDate)
    };
  }

  private prepareTempatTinggalData(data: any) {
    const currentDate = new Date();
    
    return {
      // Placeholder yang sesuai dengan template tempat tinggal
      nama_orang_1: '[Akan diisi admin]', // Akan diisi admin
      jabatan_orang_1: '[Akan diisi admin]', // Akan diisi admin
      nama_orang_2: data.nama_orang_2 || '',
      tempat_tanggal_lahir: data.tempat_tanggal_lahir || '',
      nik: data.nik || '',
      jenis_kelamin: data.jenis_kelamin || '',
      agama: data.agama || '',
      pekerjaan: data.pekerjaan || '',
      status: data.status || '',
      alamat: data.alamat || '',
      jorong: data.jorong || '',
      tanggal: this.formatDate(currentDate)
    };
  }

  private formatDate(date: Date): string {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  private formatMonthYear(date: Date): string {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  private generateSuratNumber(serviceType: string): string {
    const prefix = this.getSuratPrefix(serviceType);
    const date = new Date();
    const sequence = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${prefix}/${sequence}/${month}/${year}`;
  }

  private getSuratPrefix(serviceType: string): string {
    const prefixes: Record<string, string> = {
      'SKU_AN': '470/SKU',
      'SKDomisili': '470/SKD',
      'SKKelahiran': '470/SKK',
      'SKMeninggalDunia': '470/SKM',
      'SKPindah': '470/SKP',
      'SKTempatTinggal': '470/SKTT',
    };
    
    return prefixes[serviceType] || '470/SK';
  }
}
