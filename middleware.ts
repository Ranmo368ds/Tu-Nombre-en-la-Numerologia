import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);
const locales = routing.locales;

export default function middleware(request: NextRequest) {
    const hostname = request.headers.get('x-forwarded-host') || request.headers.get('host');
    const { pathname } = request.nextUrl;
    const nichePaths = ['hvacservices', 'treeservices', 'taxservices', 'sealcoatingservices', 'roofingservices', 'localmarketing', 'paintingservices', 'cleaningservices', 'fenceservices', 'landscapingservices', 'poolservices', 'radiounica'];

    // 1. Static and Internal Paths - proceed without intl
    if (pathname.startsWith('/_next') || pathname.startsWith('/_static') || pathname.includes('.')) {
        return NextResponse.next();
    }

    // 2. EDDM Routes - bypass intl middleware (no locale prefix needed)
    if (pathname.startsWith('/eddm')) {
        return NextResponse.next();
    }

    const pathSegments = pathname.split('/').filter(Boolean);

    // 2. Domain Routing for Juanson's Lawncare (MOVE EARLY to avoid niche conflicts)
    if (hostname && (hostname.includes('juansonslawncare.com') || hostname.includes('juansonlawncare.com') || (hostname.includes('localhost') && !nichePaths.some(p => pathname.toLowerCase().includes(p.toLowerCase()))))) {
        // If the URL already contains the prefix, redirect to the clean version
        if (pathname.includes('/juansons-landscaping')) {
            const cleanPath = pathname.replace('/juansons-landscaping', '');
            return NextResponse.redirect(new URL(cleanPath || '/', request.url));
        }

        const isStatic = pathname.startsWith('/images') || pathname.startsWith('/favicon');
        if (isStatic) return NextResponse.next();

        // Specific PascalCase Mapping for Juanson's Domain (as per user request)
        const pathMap: Record<string, string> = {
            '/home': '/',
            '/about-us': '/nosotros',
            '/lawn-services': '/landscaping',
            '/brick-paving': '/brick-paving',
            '/fence-services': '/fence',
            '/snow-removal': '/snow',
            '/gallery': '/galeria',
            '/contact-us': '/'
        };

        // Normalize pathname for mapping (remove trailing slash if any)
        const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
        const mappedPath = pathMap[normalizedPath] || normalizedPath;

        // Rewrite all other paths to include the prefix internally
        const lang = pathSegments[0] === 'es' ? 'es' : 'en';

        // Remove locale prefix if present for inner path calculation
        let innerPath = mappedPath;
        if (innerPath.startsWith('/es') || innerPath.startsWith('/en')) {
            innerPath = innerPath.slice(3) || '/';
        }

        const url = request.nextUrl.clone();
        url.pathname = `/${lang}/juansons-landscaping${innerPath ? (innerPath.startsWith('/') ? innerPath : `/${innerPath}`) : ''}`;
        return NextResponse.rewrite(url);
    }

    // 3. Auto-prefix niche paths - Let next-intl handle as-needed prefix


    // 4. Domain Routing for Radio Unica
    if (hostname && (hostname.includes('radiounica.us') || hostname.includes('radio-unica') || hostname.includes('radiounica'))) {
        const isRoot = pathSegments.length === 0;
        const isLocaleRoot = pathSegments.length === 1 && locales.includes(pathSegments[0] as any);

        if (isRoot || isLocaleRoot) {
            let lang = pathSegments[0] || 'es';
            const url = request.nextUrl.clone();
            url.pathname = `/${lang}/radiounica`;
            return NextResponse.rewrite(url);
        }
    }

    // 5. Domain Routing for Genes Marketing
    if (hostname && (hostname.includes('genesmarketing.com') || hostname.includes('genes-marketing'))) {

        // SAFETY: Do not hijack niche marketing paths
        const isNichePath = nichePaths.some(path => pathname.toLowerCase().includes(path));

        if (isNichePath) {
            // Check if the path already has a locale prefix
            const hasLocalePrefix = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
            if (!hasLocalePrefix) {
                // Rewrite directly to default locale to avoid intlMiddleware 404
                const url = request.nextUrl.clone();
                url.pathname = `/en${pathname}`;
                return NextResponse.rewrite(url);
            }
            return intlMiddleware(request);
        }

        const isRoot = pathSegments.length === 0;
        const isLocaleRoot = pathSegments.length === 1 && locales.includes(pathSegments[0] as any);

        if (isRoot || isLocaleRoot) {
            let lang = pathSegments[0] || 'en';
            const url = request.nextUrl.clone();
            url.pathname = `/${lang}/genesmarketing`;
            return NextResponse.rewrite(url);
        }
    }

    // 6. Default Fallback - handle internationalization for all other paths
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
