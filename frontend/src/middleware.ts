import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { jwtVerify } from "jose";

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}

// Routes accessibles sans authentification
const publicRoutes = ['/faq', '/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('Middleware called for path:', pathname);

  if (publicRoutes.includes(pathname) || pathname === '/') {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;
  console.log('Token found:', !!token); // Log si le token existe

  if (!token) {
    console.log('No token, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not configured');
    }

    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, secret);

    // Log le payload pour debug
    console.log('Token payload:', payload);

    if ((payload.exp as number) * 1000 < Date.now()) {
      console.log('Token expired');
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-wallet-address', payload.address as string);

    // Cloner la requête avec les nouveaux headers
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;

  } catch (error) {
    console.log('Token verification failed:', error);
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}