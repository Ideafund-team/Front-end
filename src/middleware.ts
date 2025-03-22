import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;

  const allowedRoutes = ['/user/masuk', '/user/daftar', '/admin/masuk'];

  if (allowedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/user') || pathname.startsWith('/admin')) {
    if (!token) {
      const redirectUrl = pathname.startsWith('/admin') ? '/admin/masuk' : '/user/masuk';
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*', '/admin/:path*'],
};
