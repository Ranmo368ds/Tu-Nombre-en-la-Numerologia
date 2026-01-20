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

        // Avoid rewrite loop or blocking assets
        if (pathname.startsWith('/radio-unica') || pathname.startsWith('/_next') || pathname.includes('.')) {
            return NextResponse.next();
        }

        // Detect language from path (e.g., /en, /pt)
        let lang = 'es'; // Default
        const locales = ['en', 'es', 'fr', 'pt', 'it', 'de', 'ru', 'pl'];
        const pathSegment = pathname.split('/')[1];

        if (locales.includes(pathSegment)) {
            lang = pathSegment;
        }

        // Rewrite to the radio app with language param
        url.pathname = '/radio-unica';
        url.searchParams.set('lang', lang);
        return NextResponse.rewrite(url);
    }

    return intlMiddleware(request);
}

export const config = {
    // Match only internationalized pathnames + root
    matcher: ['/', '/(en|es|fr|pt|it|de|ru|pl)/:path*']
};

