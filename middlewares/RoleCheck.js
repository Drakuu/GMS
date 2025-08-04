import { NextResponse } from 'next/server';
import { ROLES } from '../lib/constants';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('accessToken')?.value;
  const role = request.cookies.get('role')?.value;

  // Redirect unauthenticated users
  if (!token && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Role-based access control
  if (token) {
    if (pathname.startsWith('/super-admin') && role !== ROLES.SUPER_ADMIN) {
      return NextResponse.redirect(new URL('/not-found', request.url));
    }
    
    if (pathname.startsWith('/admin') && role !== ROLES.ADMIN) {
      return NextResponse.redirect(new URL('/not-found', request.url));
    }
    
    if (pathname.startsWith('/user') && role !== ROLES.USER) {
      return NextResponse.redirect(new URL('/not-found', request.url));
    }
  }

  return NextResponse.next();
}