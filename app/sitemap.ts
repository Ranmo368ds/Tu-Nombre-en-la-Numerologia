import { MetadataRoute } from 'next';

const INSTINTO_URL = 'https://instintosaludable.com';
const GENES_URL = 'https://genesmarketing.com';
const instintoLocales = ['en', 'es', 'fr', 'pt', 'it', 'de', 'ru', 'pl'];
const genesLocales = ['es', 'en'];
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

    // Genes Marketing routes
    const genesSitemap = genesLocales.map((locale) => ({
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

    return [...instintoSitemap, ...genesSitemap];
}
