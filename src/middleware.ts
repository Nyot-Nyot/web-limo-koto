import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Fungsi untuk memeriksa apakah path saat ini termasuk dalam paths yang dilindungi
function isProtectedPath(path: string): boolean {
  // Daftar paths yang dilindungi
  const protectedPaths = [
    '/admin',
    '/admin/berita',
    '/admin/jorong',
    '/admin/struktur',
    '/admin/galeri',
    '/admin/faq',
    '/admin/layanan',
    '/admin/agenda',
  ];
  
  // Periksa apakah path saat ini ada di daftar yang dilindungi
  // dan bukan halaman login admin
  return protectedPaths.some(pp => 
    path.startsWith(pp) && !path.startsWith('/admin/login')
  );
}

// Middleware untuk memeriksa autentikasi
export function middleware(request: NextRequest) {
  // Ambil path saat ini
  const path = request.nextUrl.pathname;
  
  // Jika path adalah rute yang dilindungi
  if (isProtectedPath(path)) {
    // Periksa apakah ada token auth di cookies
    const authToken = request.cookies.get('adminAuth');
    
    // Jika tidak ada token auth, redirect ke halaman login
    if (!authToken || authToken.value !== 'true') {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('redirect', path);
      return NextResponse.redirect(url);
    }
  }
  
  // Lanjutkan ke request berikutnya jika autentikasi valid
  return NextResponse.next();
}

// Konfigurasi untuk menentukan path mana yang akan diproses oleh middleware
export const config = {
  matcher: ['/admin/:path*'],
};