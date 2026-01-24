export default function TreeServiceSchema({ locale }: { locale: string }) {
    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/treeservice`;

    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            // LocalBusiness
            {
                '@type': 'LocalBusiness',
                '@id': `${baseUrl}/#organization`,
                name: 'Genes Marketing',
                description: locale === 'es'
                    ? 'Agencia de marketing especializada en servicios de tree service. EDDM, door hangers, Google Ads, Pinterest y yard signs para empresas de tree removal, tree trimming y stump grinding.'
                    : 'Marketing agency specialized in tree service marketing. EDDM, door hangers, Google Ads, Pinterest and yard signs for tree removal, tree trimming and stump grinding companies.',
                url: baseUrl,
                telephone: '+1-224-558-5546',
                email: 'info@genesmarketing.com',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Algonquin',
                    addressRegion: 'IL',
                    addressCountry: 'US',
                },
                areaServed: [
                    'Algonquin, IL',
                    'Huntley, IL',
                    'Elgin, IL',
                    'Crystal Lake, IL',
                    'Barrington, IL',
                    'Woodstock, IL',
                    'McHenry, IL',
                    'Carpentersville, IL',
                    'South Elgin, IL',
                    'St. Charles, IL',
                ],
                priceRange: '$$',
            },
            // Service
            {
                '@type': 'Service',
                '@id': `${currentUrl}/#service`,
                serviceType: 'Tree Service Marketing',
                provider: {
                    '@id': `${baseUrl}/#organization`,
                },
                areaServed: {
                    '@type': 'State',
                    name: 'Illinois',
                },
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Tree Service Marketing Services',
                    itemListElement: [
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'EDDM for Tree Service',
                                description: 'Every Door Direct Mail campaigns for tree removal and tree trimming companies',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Door Hangers for Tree Service',
                                description: 'Targeted door hanger campaigns for neighborhood marketing',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Google Ads for Tree Service',
                                description: 'Pay-per-click advertising for tree removal and stump grinding services',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Pinterest Marketing for Tree Service',
                                description: 'Visual marketing and SEO through Pinterest for tree service companies',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Yard Signs for Tree Service',
                                description: 'Local branding and lead generation through yard signs',
                            },
                        },
                    ],
                },
            },
            // FAQPage
            {
                '@type': 'FAQPage',
                '@id': `${currentUrl}/#faq`,
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: locale === 'es'
                            ? '¿Cuánto tiempo tarda en verse resultados?'
                            : 'How long does it take to see results?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: locale === 'es'
                                ? 'Depende del canal. Google Ads puede generar leads rápidamente. Door hangers y yard signs pueden generar llamadas en días. Pinterest y EDDM construyen visibilidad y confianza con impacto acumulativo.'
                                : 'It depends on the channel. Google Ads can generate leads quickly. Door hangers and yard signs can generate calls within days. Pinterest and EDDM build visibility and trust with cumulative impact.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: locale === 'es'
                            ? '¿Necesito tener un sitio web perfecto?'
                            : 'Do I need to have a perfect website?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: locale === 'es'
                                ? 'No perfecto, pero sí claro. Si no tienes páginas por servicio, te ayudamos a estructurarlas para que cada pin y anuncio apunte a la página correcta.'
                                : 'Not perfect, but clear. If you don\'t have pages for each service, we help you structure them so each pin and ad points to the right page.',
                        },
                    },
                ],
            },
            // BreadcrumbList
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
                        name: locale === 'es' ? 'Marketing para Tree Service' : 'Tree Service Marketing',
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
