import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const hostname = request.headers.get('host');

    // Domain Routing for Radio Unica
    // If the user visits radiounica.us (any subdmain)
    if (hostname && (hostname.includes('radiounica.us') || hostname.includes('radio-unica'))) {
        const url = request.nextUrl.clone();

        // 1. Trap Locale Paths:
        // If the Numerology app logic tried to redirect to /en, /es, etc, 
        // OR if the user manually goes there, we force them back to '/' 
        // to avoid showing the Numerology interface.
        const locales = ['en', 'es', 'fr', 'pt', 'it', 'de', 'ru', 'pl'];
        const isLocalePath = locales.some(loc =>
            url.pathname === `/${loc}` || url.pathname.startsWith(`/${loc}/`)
        );

        if (isLocalePath) {
            url.pathname = '/';
            return NextResponse.redirect(url);
        }

        // 2. Serve the Radio App:
        // If they are at root, show the Radio Unica page (rewrite)
        if (url.pathname === '/') {
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
