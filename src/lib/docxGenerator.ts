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
      default:
        return commonData;
    }
  }

  private prepareUsahaData(data: any) {
    // Format tanggal lahir dari format YYYY-MM-DD ke format DD-MM-YYYY
    const formatTanggalLahir = (tanggal: string, tempat: string) => {
      if (!tanggal) return '';
      const date = new Date(tanggal);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${tempat}, ${day}-${month}-${year}`;
    };

    return {
      // Placeholder yang ada di template
      nama_orang_1: '', // Akan diisi admin
      jabatan_orang_1: '', // Akan diisi admin
      nama_orang_2: data.nama || '',
      tempat_tanggal_lahir: formatTanggalLahir(data.tanggal_lahir, data.tempat_lahir),
      nik: data.nik || '',
      islam: data.agama || 'Islam',
      pekerjaan: data.pekerjaan || 'Wiraswasta',
      status: data.status_perkawinan || 'Belum Kawin',
      alamat: `${data.alamat}, RT ${data.rt}/RW ${data.rw}${data.dusun ? ', ' + data.dusun : ''}`,
      nama_usaha: data.nama_usaha || '',
      tempat_usaha: data.alamat_usaha || data.alamat,
      nama_nagari: 'Limo Koto',
      nama_kecamatan: 'Sijunjung',
      nama_kabupaten: 'Sijunjung',
      nama_sekretaris: '', // Akan diisi admin
      
      // Data tambahan untuk keperluan internal
      ...data
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
    };
    
    return prefixes[serviceType] || '470/SK';
  }
}
