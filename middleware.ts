
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    try {
        const { pathname } = request.nextUrl;

        // Skip middleware for static files and API routes
        if (
            pathname.startsWith('/_next') ||
            pathname.startsWith('/api') ||
            pathname.includes('.') ||
            pathname === '/favicon.ico'
        ) {
            return NextResponse.next();
        }

        const token = request.cookies.get('auth_token')?.value;

        const isAuthPage = pathname === '/login' || pathname === '/register';

        // If logged in and trying to access auth pages, redirect to dashboard
        if (token && isAuthPage) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        // If not logged in and trying to access protected pages, redirect to login
        if (!token && !isAuthPage) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (public folder)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
