'use client';

export default function FenceSchema({ locale }: { locale: string }) {
    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/fenceservices`;

    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'LocalBusiness',
                '@id': `${baseUrl}/#organization`,
                name: 'Genes Marketing',
                description: locale === 'es'
                    ? 'Agencia de marketing especializada en empresas de cercas. EDDM, door hangers, Google Ads, Pinterest y yard signs para negocios de instalación y reparación de cercas.'
                    : 'Marketing agency specialized in fence marketing. EDDM, door hangers, Google Ads, Pinterest and yard signs for fence installation and repair businesses.',
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
                serviceType: 'Fence Business Marketing',
                provider: {
                    '@id': `${baseUrl}/#organization`,
                },
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Fence Marketing Services',
                    itemListElement: [
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'EDDM for Fence Contractors',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Google Ads for Fence Businesses',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Pinterest Marketing for Fences',
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
                        name: locale === 'es' ? 'Marketing para Cercas' : 'Fence Marketing',
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
