import { NextRequest, NextResponse } from 'next/server';
import { DocxGenerator } from '@/lib/docxGenerator';

export async function POST(request: NextRequest) {
  try {
    const { serviceType, formData } = await request.json();
    
    // Validate required fields
    if (!serviceType || !formData) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: serviceType and formData' 
      }, { status: 400 });
    }

    // Generate document
    const docxGenerator = new DocxGenerator();
    const docxBuffer = await docxGenerator.generateDocument(serviceType, formData);
    
    // Create filename
    const timestamp = Date.now();
    const filename = `${formData.nama || 'document'}-${serviceType}-${timestamp}.docx`;
    
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
