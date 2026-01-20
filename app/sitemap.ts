import { MetadataRoute } from 'next';

const BASE_URL = 'https://instintosaludable.com';
const locales = ['en', 'es', 'fr', 'pt', 'it', 'de', 'ru', 'pl'];
const routes = ['', '/shop', '/blog', '/numerology', '/contact', '/tarot'];

export default function sitemap(): MetadataRoute.Sitemap {
    return routes.map((route) => ({
        url: `${BASE_URL}/es${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
            languages: Object.fromEntries(
                locales.map((locale) => [locale, `${BASE_URL}/${locale}${route}`])
            ),
        },
    }));
}
