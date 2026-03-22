'use client';

export default function LandscapingSchema({ locale }: { locale: string }) {
    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/landscapingservices`;

    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'LocalBusiness',
                '@id': `${baseUrl}/#organization`,
                name: 'Genes Marketing',
                description: locale === 'es'
                    ? 'Agencia de marketing especializada en empresas de paisajismo. EDDM, door hangers, Google Ads, Pinterest y yard signs para negocios de diseño de jardines y hardscaping.'
                    : 'Marketing agency specialized in landscaping marketing. EDDM, door hangers, Google Ads, Pinterest and yard signs for garden design and hardscaping businesses.',
                url: baseUrl,
                telephone: '+1-847-502-9685',
                email: 'ventas@genesmarketing.com',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Algonquin',
                    addressRegion: 'IL',
                    addressCountry: 'US',
                },
                priceRange: '$$',
            },
            {
                '@type': 'Service',
                '@id': `${currentUrl}/#service`,
                serviceType: 'Landscaping Business Marketing',
                provider: {
                    '@id': `${baseUrl}/#organization`,
                },
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Landscaping Marketing Services',
                    itemListElement: [
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'EDDM for Landscaping Contractors',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Google Ads for Landscaping Businesses',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Pinterest Marketing for Garden Design',
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
                        name: locale === 'es' ? 'Marketing para Paisajismo' : 'Landscaping Marketing',
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
