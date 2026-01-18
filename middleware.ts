import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    // Check both standard host and x-forwarded-host (for proxies/Vercel)
    const hostname = request.headers.get('x-forwarded-host') || request.headers.get('host');

    // Domain Routing for Radio Unica
    // If the user visits radiounica.us (any subdmain)
    if (hostname && (hostname.includes('radiounica.us') || hostname.includes('radio-unica'))) {
        const url = request.nextUrl.clone();
        const { pathname } = url;

        // Avoid rewrite loop if we are already at /radio-unica or requesting assets
        if (pathname.startsWith('/radio-unica') || pathname.startsWith('/_next') || pathname.includes('.')) {
            return NextResponse.next();
        }

        // 1. Trap Locale Paths & Root:
        // If the user is at root '/' OR any locale path '/en', '/es', etc.
        // We rewrite them all to the radio app.
        const locales = ['en', 'es', 'fr', 'pt', 'it', 'de', 'ru', 'pl'];
        const isLocalePath = locales.some(loc =>
            url.pathname === `/${loc}` || url.pathname.startsWith(`/${loc}/`)
        );

        if (isLocalePath || url.pathname === '/') {
            url.pathname = '/radio-unica';
            return NextResponse.rewrite(url);
        }
    }

    return intlMiddleware(request);
}

export const config = {
    // Match only internationalized pathnames + root
    matcher: ['/', '/(en|es|fr|pt|it|de|ru|pl)/:path*']
};
