import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    // Check both standard host and x-forwarded-host (for proxies/Vercel)
    const hostname = request.headers.get('x-forwarded-host') || request.headers.get('host');

    // Domain Routing for Radio Unica
    if (hostname && (hostname.includes('radiounica.us') || hostname.includes('radio-unica'))) {
        const url = request.nextUrl.clone();
        const { pathname } = url;

        if (pathname.startsWith('/radio-unica') || pathname.startsWith('/_next') || pathname.includes('.')) {
            return NextResponse.next();
        }

        let lang = 'es';
        const locales = ['en', 'es', 'fr', 'pt', 'it', 'de', 'ru', 'pl'];
        const pathSegment = pathname.split('/')[1];

        if (locales.includes(pathSegment)) {
            lang = pathSegment;
        }

        url.pathname = '/radio-unica';
        url.searchParams.set('lang', lang);
        return NextResponse.rewrite(url);
    }

    // Domain Routing for Genes Marketing
    if (hostname && (hostname.includes('genesmarketing.com') || hostname.includes('genes-marketing'))) {
        const url = request.nextUrl.clone();
        const { pathname } = url;

        // Allow static files, _next, and avoid loops
        if (pathname.startsWith('/genes-marketing') || pathname.startsWith('/_next') || pathname.includes('.')) {
            return NextResponse.next();
        }

        // Detect locale
        let lang = 'es';
        const locales = ['en', 'es', 'fr', 'pt', 'it', 'de', 'ru', 'pl'];
        const pathSegments = pathname.split('/').filter(Boolean);
        const firstSegment = pathSegments[0];

        if (locales.includes(firstSegment)) {
            lang = firstSegment;
            // Remove the locale from the pathname for the rewrite if we want to map everything
            // But usually we just want to point the root or localized root to the landing page.
        }

        // Rewrite to /[lang]/genes-marketing
        url.pathname = `/${lang}/genes-marketing`;
        return NextResponse.rewrite(url);
    }

    return intlMiddleware(request);
}

export const config = {
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_static (inside /public)
    // - all root files inside /public (e.g. /favicon.ico)
    matcher: ['/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)']
};

