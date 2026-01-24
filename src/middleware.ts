import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const hostname = request.headers.get('x-forwarded-host') || request.headers.get('host');
    const { pathname } = request.nextUrl;

    // 1. Static and Internal Paths - proceed without intl
    if (pathname.startsWith('/_next') || pathname.startsWith('/_static') || pathname.includes('.')) {
        return NextResponse.next();
    }

    // Common locales list
    const locales = ['en', 'es', 'fr', 'pt', 'it', 'de', 'ru', 'pl'];

    // 2. Domain Routing for Radio Unica
    if (hostname && (hostname.includes('radiounica.us') || hostname.includes('radio-unica'))) {
        // Allow niche pages, official radio paths, and locales to be handled by intlMiddleware
        if (pathname.startsWith('/radio-unica') ||
            pathname.includes('marketing-para-') ||
            pathname.includes('marketing-local-')) {
            return intlMiddleware(request);
        }

        // Detect locale for rewrite
        let lang = 'es';
        const pathSegment = pathname.split('/')[1];
        if (locales.includes(pathSegment)) {
            lang = pathSegment;
        }

        // Rewrite everything else to root /radio-unica landing
        const url = request.nextUrl.clone();
        url.pathname = '/radio-unica';
        url.searchParams.set('lang', lang);
        return NextResponse.rewrite(url);
    }

    // 3. Domain Routing for Genes Marketing
    if (hostname && (hostname.includes('genesmarketing.com') || hostname.includes('genes-marketing'))) {
        // Allow niche pages, official marketing paths, and locales to be handled by intlMiddleware
        if (pathname.startsWith('/genes-marketing') ||
            pathname.includes('marketing-para-') ||
            pathname.includes('marketing-local-')) {
            return intlMiddleware(request);
        }

        // Detect locale for rewrite
        let lang = 'es';
        const pathSegments = pathname.split('/').filter(Boolean);
        const firstSegment = pathSegments[0];
        if (locales.includes(firstSegment)) {
            lang = firstSegment;
        }

        // Rewrite everything else to the main genes-marketing landing
        const url = request.nextUrl.clone();
        url.pathname = `/${lang}/genes-marketing`;
        return NextResponse.rewrite(url);
    }

    // 4. Fallback for all other domains (board, local, etc)
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

