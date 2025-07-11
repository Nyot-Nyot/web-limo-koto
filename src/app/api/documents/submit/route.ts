import { NextRequest, NextResponse } from 'next/server';
import { DocxGenerator } from '@/lib/docxGenerator';
import fs from 'fs';
import path from 'path';

// Utility function to generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Simple file storage for demo (in production use cloud storage)
async function saveToStorage(buffer: Buffer, filename: string): Promise<string> {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  
  // Create uploads directory if it doesn't exist
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  
  const filePath = path.join(uploadsDir, filename);
  fs.writeFileSync(filePath, buffer);
  
  return `/uploads/${filename}`;
}

// Simple database simulation (in production use real database)
function saveDocumentRequest(request: any): Promise<void> {
  return new Promise((resolve) => {
    const dbPath = path.join(process.cwd(), 'data', 'requests.json');
    const dbDir = path.dirname(dbPath);
    
    // Create data directory if it doesn't exist
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    
    let requests = [];
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8');
      requests = JSON.parse(data);
    }
    
    requests.push(request);
    fs.writeFileSync(dbPath, JSON.stringify(requests, null, 2));
    resolve();
  });
}

export async function POST(request: NextRequest) {
  try {
    const { serviceType, formData, userId } = await request.json();
    
    // Validate required fields
    if (!serviceType || !formData || !userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Generate document
    const docxGenerator = new DocxGenerator();
    const docxBuffer = await docxGenerator.generateDocument(serviceType, formData);
    
    // Save document to storage
    const filename = `${userId}-${serviceType}-${Date.now()}.docx`;
    const documentUrl = await saveToStorage(docxBuffer, filename);
    
    // Create document request
    const documentRequest = {
      id: generateId(),
      userId,
      serviceType,
      formData,
      status: 'pending' as const,
      submittedAt: new Date().toISOString(),
      generatedDocumentUrl: documentUrl,
      filename
    };
    
    // Save to database
    await saveDocumentRequest(documentRequest);
    
    return NextResponse.json({ 
      success: true, 
      requestId: documentRequest.id,
      message: 'Dokumen berhasil diajukan dan akan diproses oleh admin',
      documentUrl
    });
  } catch (error) {
    console.error('Document submission error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Gagal memproses dokumen. Silakan coba lagi.'
    }, { status: 500 });
  }
}
