import { getTranslations } from 'next-intl/server';

interface LocalMarketingSchemaProps {
    locale: string;
}

export default async function LocalMarketingSchema({ locale }: LocalMarketingSchemaProps) {
    const t = await getTranslations({ locale, namespace: 'LocalMarketingPage.seo' });
    const baseUrl = 'https://genesmarketing.com';

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Genes Marketing',
        url: baseUrl,
        logo: `${baseUrl}/images/GENES-MARKETING-LOGO.png`,
        description: t('description'),
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Chicago Northwest Suburbs',
            addressRegion: 'IL',
            addressCountry: 'US'
        }
    };

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Publicidad Local Inteligente',
        provider: {
            '@type': 'Organization',
            name: 'Genes Marketing'
        },
        areaServed: {
            '@type': 'GeoCircle',
            geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: '42.1553',
                longitude: '-88.3063'
            },
            geoRadius: '50000'
        },
        description: t('description')
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
        </>
    );
}
