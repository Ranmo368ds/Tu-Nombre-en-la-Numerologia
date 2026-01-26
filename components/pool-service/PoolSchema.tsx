'use client';

export default function PoolSchema({ locale }: { locale: string }) {
    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/poolservices`;

    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'LocalBusiness',
                '@id': `${baseUrl}/#organization`,
                name: 'Genes Marketing',
                description: locale === 'es'
                    ? 'Agencia de marketing especializada en empresas de mantenimiento y reparación de piscinas. EDDM, Google Ads, Pinterest y yard signs para negocios de pool service.'
                    : 'Marketing agency specialized in pool service maintenance and repair marketing. EDDM, Google Ads, Pinterest and yard signs for pool service businesses.',
                url: baseUrl,
                telephone: '+1-847-502-9685',
                email: 'ventas@genesmarketing.com',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Algonquin',
                    addressRegion: 'IL',
                    addressCountry: 'US',
                    postalCode: '60102'
                },
                priceRange: '$$',
            },
            {
                '@type': 'Service',
                '@id': `${currentUrl}/#service`,
                serviceType: 'Pool Service Business Marketing',
                provider: {
                    '@id': `${baseUrl}/#organization`,
                },
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Pool Service Marketing Services',
                    itemListElement: [
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'EDDM for Pool Maintenance Companies',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Google Ads for Pool Repair Businesses',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Pinterest Marketing for Pool Pros',
                            },
                        },
                    ],
                },
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${currentUrl}/#breadcrumb`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: baseUrl,
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: locale === 'es' ? 'Marketing para Pool Service' : 'Pool Service Marketing',
                        item: currentUrl,
                    },
                ],
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
