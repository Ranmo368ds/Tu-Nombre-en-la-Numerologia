const fs = require('fs');
const path = require('path');

const esPath = '/Users/dithergenes/Genes Team Dropbox/000 BUSCAMEN/2026/ANTIGRAVITY/messages/es.json';
const enPath = '/Users/dithergenes/Genes Team Dropbox/000 BUSCAMEN/2026/ANTIGRAVITY/messages/en.json';

const esData = {
    "topBar": {
        "tagline": "Providing Exceptional Landscaping Services in the Chicago northwest Suburbs",
        "phone1": "(815) 403-9271",
        "phone2": "(815) 236-0269",
        "email": "info@juansonlandscaping.com"
    },
    "nav": {
        "home": "Inicio",
        "about": "Nosotros",
        "services": "Servicios",
        "services_dropdown": {
            "lawn": "Servicios de Césped",
            "brick": "Pavimento de Ladrillo",
            "fence": "Servicios de Cercas",
            "snow": "Remoción de Nieve"
        },
        "gallery": "Galería",
        "contact": "Contáctanos"
    },
    "hero": {
        "slides": [
            {
                "subtitle": "PROFESIONALES EN PAISAJISMO",
                "title": "Diseñamos el Jardín de tus Sueños",
                "cta1": "Nuestros Servicios",
                "cta2": "Solicitar Presupuesto"
            }
        ]
    },
    "services": {
        "title": "Nuestros Servicios Premium",
        "subtitle": "Excelencia en cada detalle para tu espacio exterior.",
        "items": {
            "lawn": {
                "title": "Servicios de Césped",
                "desc": "Mantenimiento profesional, fertilización y cuidado experto para un verde impecable."
            },
            "brick": {
                "title": "Pavimento de Ladrillo",
                "desc": "Diseño e instalación de patios, caminos y entradas con acabados de alta calidad."
            },
            "fence": {
                "title": "Servicios de Cercas",
                "desc": "Instalación y reparación de cercas residenciales para privacidad y seguridad."
            },
            "snow": {
                "title": "Remoción de Nieve",
                "desc": "Servicio rápido y confiable durante el invierno para mantener tus accesos libres."
            }
        }
    },
    "about": {
        "title": "Sobre Juanson's Landscaping",
        "subtitle": "Más de 10 años transformando espacios exteriores en los suburbios de Chicago.",
        "text": "Nos dedicamos a proporcionar servicios de paisajismo excepcionales con un enfoque en la calidad, la integridad y la satisfacción del cliente. Nuestro equipo de expertos trabaja incansablemente para asegurar que cada proyecto refleje la visión de nuestros clientes.",
        "stats": {
            "years": "Años de Experiencia",
            "projects": "Proyectos Completados",
            "clients": "Clientes Satisfechos"
        }
    },
    "contact": {
        "title": "Solicitar Presupuesto Gratis",
        "subtitle": "Estamos listos para transformar tu espacio. Contáctanos hoy mismo.",
        "form": {
            "name": "Nombre",
            "email": "Email",
            "phone": "Teléfono",
            "message": "Mensaje",
            "submit": "Enviar Solicitud"
        },
        "info": {
            "title": "Información de Contacto",
            "schedule": "Lunes – Sábado: 7:00 AM – 6:00 PM"
        }
    },
    "footer": {
        "tagline": "Proporcionando servicios de paisajismo excepcionales en los suburbios del noroeste de Chicago.",
        "rights": "Todos los derechos reservados."
    },
    "seo": {
        "title": "Juanson's Landscaping | Servicios de Paisajismo en Chicago Northwest Suburbs",
        "description": "Expertos en servicios de césped, pavimento de ladrillo, cercas y remoción de nieve en Chicago. Presupuestos gratis.",
        "keywords": "landscaping, chicago, lawn services, brick paving, fence, snow removal",
        "og_title": "Juanson's Landscaping - Calidad y Excelencia",
        "og_description": "Transformamos tu jardín con servicios profesionales de paisajismo.",
        "og_image_alt": "Juanson's Landscaping Home"
    }
};

const enData = {
    "topBar": {
        "tagline": "Providing Exceptional Landscaping Services in the Chicago northwest Suburbs",
        "phone1": "(815) 403-9271",
        "phone2": "(815) 236-0269",
        "email": "info@juansonlandscaping.com"
    },
    "nav": {
        "home": "Home",
        "about": "About Us",
        "services": "Services",
        "services_dropdown": {
            "lawn": "Lawn Services",
            "brick": "Brick Paving",
            "fence": "Fence Services",
            "snow": "Snow Removal"
        },
        "gallery": "Gallery",
        "contact": "Contact Us"
    },
    "hero": {
        "slides": [
            {
                "subtitle": "LANDSCAPING PROFESSIONALS",
                "title": "We Design the Garden of Your Dreams",
                "cta1": "Our Services",
                "cta2": "Request a Quote"
            }
        ]
    },
    "services": {
        "title": "Our Premium Services",
        "subtitle": "Excellence in every detail for your outdoor space.",
        "items": {
            "lawn": {
                "title": "Lawn Services",
                "desc": "Professional maintenance, fertilization, and expert care for an impeccable green."
            },
            "brick": {
                "title": "Brick Paving",
                "desc": "Design and installation of patios, walkways, and driveways with high-quality finishes."
            },
            "fence": {
                "title": "Fence Services",
                "desc": "Residential fence installation and repair for privacy and security."
            },
            "snow": {
                "title": "Snow Removal",
                "desc": "Fast and reliable service during winter to keep your access points clear."
            }
        }
    },
    "about": {
        "title": "About Juanson's Landscaping",
        "subtitle": "Over 10 years transforming outdoor spaces in the Chicago suburbs.",
        "text": "We are dedicated to providing exceptional landscaping services with a focus on quality, integrity, and customer satisfaction. Our team of experts works tirelessly to ensure that every project reflects our clients' vision.",
        "stats": {
            "years": "Years of Experience",
            "projects": "Projects Completed",
            "clients": "Happy Clients"
        }
    },
    "contact": {
        "title": "Request a Free Quote",
        "subtitle": "We are ready to transform your space. Contact us today.",
        "form": {
            "name": "Name",
            "email": "Email",
            "phone": "Phone",
            "message": "Message",
            "submit": "Send Request"
        },
        "info": {
            "title": "Contact Information",
            "schedule": "Monday – Saturday: 7:00 AM – 6:00 PM"
        }
    },
    "footer": {
        "tagline": "Providing exceptional landscaping services in the Chicago northwest suburbs.",
        "rights": "All rights reserved."
    },
    "seo": {
        "title": "Juanson's Landscaping | Landscaping Services in Chicago Northwest Suburbs",
        "description": "Experts in lawn services, brick paving, fence, and snow removal in Chicago. Free quotes.",
        "keywords": "landscaping, chicago, lawn services, brick paving, fence, snow removal",
        "og_title": "Juanson's Landscaping - Quality and Excellence",
        "og_description": "We transform your garden with professional landscaping services.",
        "og_image_alt": "Juanson's Landscaping Home"
    }
};

function updateFile(filePath, content) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.JuansonsLandscaping = content;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Updated ${filePath}`);
}

updateFile(esPath, esData);
updateFile(enPath, enData);
