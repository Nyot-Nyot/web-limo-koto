import { NextRequest, NextResponse } from 'next/server';
import { DocxGenerator } from '@/lib/docxGenerator';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    
    let serviceType: string;
    let formDataObj: Record<string, any>;
    let files: Record<string, File> = {};
    
    if (contentType.includes('multipart/form-data')) {
      // Handle FormData (with file uploads)
      const formData = await request.formData();
      
      serviceType = formData.get('serviceType') as string;
      formDataObj = {};
      
      // Extract form fields and files
      for (const [key, value] of formData.entries()) {
        if (key !== 'serviceType') {
          if (value instanceof File && value.size > 0) {
            files[key] = value;
            console.log(`Uploaded file ${key}: ${value.name} (${value.size} bytes)`);
          } else if (typeof value === 'string') {
            formDataObj[key] = value;
          }
        }
      }
    } else {
      // Handle JSON (legacy support)
      const body = await request.json();
      serviceType = body.serviceType;
      formDataObj = body.formData;
    }
    
    // Validate required fields
    if (!serviceType || !formDataObj) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: serviceType and formData' 
      }, { status: 400 });
    }

    // Generate document
    const docxGenerator = new DocxGenerator();
    const docxBuffer = await docxGenerator.generateDocument(serviceType, formDataObj);
    
    // Create filename
    const timestamp = Date.now();
    const filename = `${formDataObj.nama_orang_2 || formDataObj.nama || 'document'}-${serviceType}-${timestamp}.docx`;
    
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
