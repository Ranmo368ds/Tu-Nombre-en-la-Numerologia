'use client';

export default function CleaningSchema({ locale }: { locale: string }) {
    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/cleaningservices`;

    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'LocalBusiness',
                '@id': `${baseUrl}/#organization`,
                name: 'Genes Marketing',
                description: locale === 'es'
                    ? 'Agencia de marketing especializada en servicios de limpieza. EDDM, door hangers, Google Ads, Pinterest y yard signs para negocios de limpieza residenciales y comerciales.'
                    : 'Marketing agency specialized in cleaning marketing. EDDM, door hangers, Google Ads, Pinterest and yard signs for residential and commercial cleaning businesses.',
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
                serviceType: 'Cleaning Business Marketing',
                provider: {
                    '@id': `${baseUrl}/#organization`,
                },
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Cleaning Marketing Services',
                    itemListElement: [
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'EDDM for Cleaning Companies',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Google Ads for Cleaners',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Pinterest Marketing for Cleaners',
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
                        name: locale === 'es' ? 'Marketing para Limpieza' : 'Cleaning Marketing',
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
