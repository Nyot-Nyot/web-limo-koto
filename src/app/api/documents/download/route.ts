import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');
    
    if (!filePath) {
      return NextResponse.json({ 
        success: false, 
        error: 'File path is required' 
      }, { status: 400 });
    }

    // Sanitize file path to prevent directory traversal
    const sanitizedPath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
    const fullPath = path.join(process.cwd(), 'public', sanitizedPath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ 
        success: false, 
        error: 'File not found' 
      }, { status: 404 });
    }

    // Read file
    const fileBuffer = fs.readFileSync(fullPath);
    const fileName = path.basename(fullPath);
    
    // Determine content type based on file extension
    const ext = path.extname(fileName).toLowerCase();
    let contentType = 'application/octet-stream';
    
    switch (ext) {
      case '.pdf':
        contentType = 'application/pdf';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.doc':
        contentType = 'application/msword';
        break;
      case '.docx':
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      default:
        contentType = 'application/octet-stream';
    }

    // Return file as response
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('File download error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to download file' 
    }, { status: 500 });
  }
}
