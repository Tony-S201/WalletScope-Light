import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { jwtVerify } from "jose";

interface JWTPayload {
  address: string;
  exp: number;
  iat: number;
}

console.log('🚀 Middleware file loaded');

export const config = {
  matcher: {
    source: '/((?!api/auth|_next|static|login|faq|favicon.ico).*)',
    missing: [
      { type: 'header', key: 'next-router-prefetch' },
      { type: 'header', key: 'purpose', value: 'prefetch' }
    ]
  }
}

export async function middleware(request: NextRequest) {

  console.log('\n=====================================');
  console.log('⚡️ MIDDLEWARE EXECUTED');
  console.log('📍 URL:', request.url);
  console.log('📍 Method:', request.method);
  console.log('=====================================\n')

  const { pathname } = request.nextUrl;
  console.log(`🛡️ Middleware - START [${pathname}]`);

  const token = request.cookies.get('token')?.value;
  console.log('🔍 Middleware - Token exists:', !!token);

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
    const { payload } = await jwtVerify(token, secret) as { payload: JWTPayload };
    console.log('Token payload:', payload);

    // Vérification de l'expiration
    if (payload.exp * 1000 < Date.now()) {
      console.log('Token expired');
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }

    // Ajout de l'adresse aux headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-wallet-address', payload.address);

    console.log(`🛡️ Middleware - END [${pathname}] - User: ${payload.address}`);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error) {
    console.log('Token verification failed:', error);
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}