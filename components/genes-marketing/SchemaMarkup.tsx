export default function SchemaMarkup({ locale }: { locale: string }) {
    const baseUrl = 'https://genesmarketing.com';

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Genes Marketing",
        "url": baseUrl,
        "logo": `${baseUrl}/images/GENES-MARKETING-LOGO.png`,
        "description": locale === 'es'
            ? "Directorio de Negocios Latinos en Pinterest. Promoción profesional con SEO para negocios en Chicago y todo USA."
            : "Latino Business Directory on Pinterest. Professional promotion with SEO for businesses in Chicago and all USA.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Chicago Northwest Suburbs",
            "addressRegion": "IL",
            "addressCountry": "US"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-847-502-9685",
            "contactType": "customer service",
            "email": "ventas@genesmarketing.com",
            "availableLanguage": ["English", "Spanish"]
        },
        "sameAs": [
            "https://www.pinterest.com/genesmarketing/",
            "https://www.pinterest.com/genesmarketing/latino-business-directory-chicago-suburbs/"
        ]
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Genes Marketing",
        "image": `${baseUrl}/images/GENES-MARKETING-LOGO.png`,
        "telephone": "+1-847-502-9685",
        "email": "ventas@genesmarketing.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Chicago Northwest Suburbs",
            "addressRegion": "IL",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "42.0883",
            "longitude": "-87.9806"
        },
        "url": baseUrl,
        "priceRange": "$$",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "80"
        }
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Pinterest Marketing for Latino Businesses",
        "provider": {
            "@type": "Organization",
            "name": "Genes Marketing"
        },
        "areaServed": {
            "@type": "Country",
            "name": "United States"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Pinterest Marketing Packages",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Basic Package",
                        "description": "5 professional Pinterest pins with SEO optimization"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Pro Package",
                        "description": "10 professional Pinterest pins with advanced SEO"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Elite Package",
                        "description": "20 professional Pinterest pins with premium SEO"
                    }
                }
            ]
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${baseUrl}/${locale}/genesmarketing`
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
