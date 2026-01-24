import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);
const locales = routing.locales;

export default function middleware(request: NextRequest) {
    const hostname = request.headers.get('x-forwarded-host') || request.headers.get('host');
    const { pathname } = request.nextUrl;

    // 1. Static and Internal Paths - proceed without intl
    if (pathname.startsWith('/_next') || pathname.startsWith('/_static') || pathname.includes('.')) {
        return NextResponse.next();
    }

    // 2. Auto-prefix niche paths if locale is missing
    const nichePaths = ['treeservice', 'taxservices', 'sealcoating', 'roofing', 'localmarketing'];
    const pathSegments = pathname.split('/').filter(Boolean);

    // Check if the path is exactly one of the niche paths (case insensitive)
    if (pathSegments.length === 1 && nichePaths.includes(pathSegments[0].toLowerCase())) {
        const url = new URL(`/es/${pathSegments[0]}`, request.url);
        return NextResponse.rewrite(url);
    }

    // 3. Domain Routing for Radio Unica
    if (hostname && (hostname.includes('radiounica.us') || hostname.includes('radio-unica'))) {
        const isRoot = pathSegments.length === 0;
        const isLocaleRoot = pathSegments.length === 1 && locales.includes(pathSegments[0] as any);

        if (isRoot || isLocaleRoot) {
            let lang = pathSegments[0] || 'es';
            const url = request.nextUrl.clone();
            url.pathname = '/radio-unica';
            url.searchParams.set('lang', lang);
            return NextResponse.rewrite(url);
        }
    }

    // 4. Domain Routing for Genes Marketing
    if (hostname && (hostname.includes('genesmarketing.com') || hostname.includes('genes-marketing') || hostname.includes('localhost:3000'))) {
        // SAFETY: Do not hijack niche marketing paths
        if (nichePaths.some(path => pathname.includes(path))) {
            return intlMiddleware(request);
        }

        const isRoot = pathSegments.length === 0;
        const isLocaleRoot = pathSegments.length === 1 && locales.includes(pathSegments[0] as any);

        if (isRoot || isLocaleRoot) {
            let lang = pathSegments[0] || 'es';
            const url = request.nextUrl.clone();
            url.pathname = `/${lang}/genes-marketing`;
            return NextResponse.rewrite(url);
        }
    }

    // 5. Default Fallback - handle internationalization for all other paths
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
