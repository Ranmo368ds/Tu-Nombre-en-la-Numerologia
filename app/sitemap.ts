import { MetadataRoute } from 'next';

const INSTINTO_URL = 'https://instintosaludable.com';
const GENES_URL = 'https://genesmarketing.com';
const instintoLocales = ['en', 'es', 'fr', 'pt', 'it', 'de', 'ru', 'pl'];
const genesLocales = ['es', 'en'];
const genesNichePaths = ['treeservices', 'taxservices', 'sealcoatingservices', 'roofingservices', 'localmarketing', 'paintingservices', 'cleaningservices', 'fenceservices', 'landscapingservices', 'poolservices'];
const instintoRoutes = ['', '/shop', '/blog', '/numerology', '/contact', '/tarot'];

export default function sitemap(): MetadataRoute.Sitemap {
    // Instinto Saludable routes
    const instintoSitemap = instintoRoutes.map((route) => ({
        url: `${INSTINTO_URL}/es${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
        alternates: {
            languages: Object.fromEntries(
                instintoLocales.map((locale) => [locale, `${INSTINTO_URL}/${locale}${route}`])
            ),
        },
    }));

    // Genes Marketing main routes (maps to /genesmarketing)
    const genesMainSitemap = genesLocales.map((locale) => ({
        url: `${GENES_URL}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
        alternates: {
            languages: {
                'es': `${GENES_URL}/es`,
                'en': `${GENES_URL}/en`,
                'x-default': `${GENES_URL}/es`,
            },
        },
    }));

    // Genes Marketing Niche Landing Pages
    const genesNicheSitemap = genesNichePaths.flatMap((path) =>
        genesLocales.map((locale) => ({
            url: `${GENES_URL}/${locale}/${path}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
            alternates: {
                languages: {
                    'es': `${GENES_URL}/es/${path}`,
                    'en': `${GENES_URL}/en/${path}`,
                },
            },
        }))
    );

    return [...instintoSitemap, ...genesMainSitemap, ...genesNicheSitemap];
}
