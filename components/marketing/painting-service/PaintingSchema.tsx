export default function PaintingSchema({ locale }: { locale: string }) {
    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/paintingservices`;

    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'LocalBusiness',
                '@id': `${baseUrl}/#organization`,
                name: 'Genes Marketing',
                description: locale === 'es'
                    ? 'Agencia de marketing especializada en servicios de pintura. EDDM, door hangers, Google Ads, Pinterest y yard signs para pintores residenciales y comerciales.'
                    : 'Marketing agency specialized in painting marketing. EDDM, door hangers, Google Ads, Pinterest and yard signs for residential and commercial painters.',
                url: baseUrl,
                telephone: '+1-224-558-5546',
                email: 'info@genesmarketing.com',
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
                serviceType: 'Painting Business Marketing',
                provider: {
                    '@id': `${baseUrl}/#organization`,
                },
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Painting Marketing Services',
                    itemListElement: [
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'EDDM for Painters',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Google Ads for Painting Contractors',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Pinterest Marketing for Painters',
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
                        name: locale === 'es' ? 'Marketing para Pintores' : 'Painting Marketing',
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
