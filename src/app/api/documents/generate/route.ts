import { NextRequest, NextResponse } from 'next/server';
import { DocxGenerator, getWaliNagariNameFromFirestore } from '@/lib/docxGenerator';

export async function POST(request: NextRequest) {
  try {
    // Hanya terima JSON dari admin
    const body = await request.json();
    const mainServiceType = body.serviceType || body.jenisLayanan;
    const formDataObj = body.formData || body.data;
    const nomorPermohonan = body.nomorPermohonan;

    // Validate required fields
    if (!mainServiceType || !formDataObj) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: serviceType and formData' 
      }, { status: 400 });
    }

    // Inject nama wali nagari dari Firestore ke formDataObj
    const waliNagariName = await getWaliNagariNameFromFirestore();
    formDataObj.nama_orang_1 = waliNagariName || '[Tidak ditemukan]';

    // Generate document
    const docxGenerator = new DocxGenerator();
    const docxBuffer = await docxGenerator.generateDocument(mainServiceType, formDataObj);
    
    // Create filename
    const timestamp = Date.now();
    const filename = nomorPermohonan 
      ? `${nomorPermohonan}-${mainServiceType}.docx`
      : `${formDataObj.nama_orang_2 || formDataObj.nama || 'document'}-${mainServiceType}-${timestamp}.docx`;
    
    // Return the file as download
    const uint8Array = new Uint8Array(docxBuffer);
    
    return new Response(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': docxBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Document generation error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Gagal membuat dokumen. Silakan coba lagi.' 
    }, { status: 500 });
  }
}
