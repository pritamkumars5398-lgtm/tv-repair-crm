import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/portal', '/technician', '/manager', '/admin'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get('session')?.value;

    if (!token) {
      const redirectUrl = new URL('/', request.url);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*', '/technician/:path*', '/manager/:path*', '/admin/:path*']
};
