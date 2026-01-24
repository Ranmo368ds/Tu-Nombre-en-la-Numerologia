import { getTranslations } from 'next-intl/server';

interface SealcoatingServiceSchemaProps {
    locale: string;
}

export default async function SealcoatingServiceSchema({ locale }: SealcoatingServiceSchemaProps) {
    const t = await getTranslations({ locale, namespace: 'SealcoatingPage.seo' });
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
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-847-502-9685',
            contactType: 'customer service',
            email: 'GetOnBoard@genesmarketing.com',
            areaServed: ['US'],
            availableLanguage: ['en', 'es']
        }
    };

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Sealcoating Marketing',
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
        description: t('description'),
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'USD'
            }
        }
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: baseUrl
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Sealcoating Marketing',
                item: `${baseUrl}/${locale}/sealcoating`
            }
        ]
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
        </>
    );
}
