import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const hostname = request.headers.get('host');

    // Domain Routing for Radio Unica
    // If the user visits radiounica.us (any subdmain), show them the radio page
    if (hostname && (hostname.includes('radiounica.us') || hostname.includes('radio-unica'))) {
        const url = request.nextUrl.clone();

        // Only rewrite the root path so assets/other links still work
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
