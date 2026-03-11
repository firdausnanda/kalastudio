import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// The secret must match the one used in auth.js
const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback_kalastudio_secret_key_change_me_in_prod'
);

// Define which routes require authentication
const protectedRoutes = [
  '/dashboard',
  '/transaksi',
  '/laporan',
  '/integrasi',
  '/profil',
  '/langganan',
  '/lengkapi-profil'
];

// Define routes that are only for unauthenticated users (like login/register)
const unauthenticatedRoutes = [
  '/login',
  '/register'
];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Bypass API routes immediately
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check if the current route is protected or unauthenticated-only
  const isProtectedRoute = protectedRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  const isUnauthenticatedRoute = unauthenticatedRoutes.some(route => pathname === route);

  // If it's a public route and not explicitly unauthenticated-only, just proceed
  if (!isProtectedRoute && !isUnauthenticatedRoute) {
    return NextResponse.next();
  }

  // Get the session token from cookies
  const sessionToken = request.cookies.get('kalastudio_session')?.value;
  let session = null;

  // Verify the token if it exists
  if (sessionToken) {
    try {
      const { payload } = await jwtVerify(sessionToken, JWT_SECRET);
      session = payload;
    } catch (error) {
      // Token exists but is invalid/expired
      session = null;
    }
  }

  // Logic 1: Unauthenticated user trying to access a protected route
  if (!session && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url);
    // Optionally save the requested URL to redirect back after login
    // loginUrl.searchParams.set('callbackUrl', encodeURIComponent(pathname));
    return NextResponse.redirect(loginUrl);
  }

  // Logic 2: Authenticated user trying to access login or register page
  if (session && isUnauthenticatedRoute) {
    // Redirect them to dashboard since they are already logged in
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // Apply middleware to all routes except api, _next/static, _next/image, favicon.ico, etc.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|img|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
