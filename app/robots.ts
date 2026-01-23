import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/', '/_next/'],
        },
        sitemap: [
            'https://instintosaludable.com/sitemap.xml',
            'https://genesmarketing.com/sitemap.xml',
        ],
    };
}
