import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('authToken');

  const protectedRoutes = [ '/home','/profile', '/dashboard'];
  
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));  // Redirect to login if no token
    }
  }

  return NextResponse.next();
}
