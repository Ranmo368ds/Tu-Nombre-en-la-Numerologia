#!/usr/bin/env python3
"""
Script to add new CRO optimization translations to es.json and en.json
"""
import json
import sys

def add_cro_translations_es(data):
    """Add Spanish CRO translations"""
    mp = data["MarketingPage"]
    
    # Add industries guidance
    if "industries" in mp:
        mp["industries"]["guidance"] = "Estas son algunas industrias que ven resultados. Si tu negocio no está en la lista, también podemos adaptarlo a tu categoría."
    
    # Add pricing guidance
    if "pricing" in mp:
        mp["pricing"]["header_subtitle"] = "Inversión única, beneficios continuos (sin mensualidades ni contratos)"
        mp["pricing"]["guidance"] = {
            "title": "¿Cuál elegir?",
            "basic": "para empezar",
            "pro": "para crecer más rápido",
            "elite": "para competir fuerte en categorías demandadas"
        }
        mp["pricing"]["pro_badge"] = "Más popular"
        mp["pricing"]["pro_cta"] = "Elegir Pro (Recomendado)"
        mp["pricing"]["requirements_title"] = "Qué necesitamos de ti"
        mp["pricing"]["requirements_text"] = "Logo + fotos + ciudad + link/WhatsApp (2 minutos)"
        mp["pricing"]["disclaimer_full"] = "Los resultados varían según industria, ubicación y competencia. Garantizamos implementación profesional, optimización y publicación — no ventas específicas."
    
    # Add How It Works section
    mp["how_it_works"] = {
        "title": "Tan Fácil como 1-2-3",
        "subtitle": "No necesitas ser experto en marketing. Nosotros manejamos la parte técnica.",
        "steps": [
            {
                "number": "1",
                "title": "Elige tu plan",
                "desc": "Selecciona el paquete que mejor se adapte a tus objetivos"
            },
            {
                "number": "2",
                "title": "Envíanos tu info",
                "desc": "Logo, fotos, servicios, ubicación y link preferido"
            },
            {
                "number": "3",
                "title": "Recibe clientes",
                "desc": "Nosotros diseñamos, optimizamos y publicamos"
            }
        ],
        "footer": "Nosotros diseñamos, optimizamos y publicamos. Tú solo respondes mensajes y conviertes.",
        "cta": "Empezar ahora"
    }
    
    # Add Floating WhatsApp
    mp["floating_whatsapp"] = {
        "text": "¿Tienes preguntas?",
        "button": "WhatsApp"
    }
    
    # Enhance FAQ
    if "faq" in mp:
        mp["faq"]["mini_cta"] = "¿Quieres que te recomendemos el plan ideal? → Chat en WhatsApp"
        # Add new FAQ items
        new_faqs = [
            {
                "q": "¿Pinterest es mundial?",
                "a": "Sí, Pinterest es una plataforma global. Nosotros enfocamos tu estrategia a Estados Unidos (o local según tu servicio) para maximizar resultados en tu mercado objetivo."
            },
            {
                "q": "¿Puedo aparecer en varias ciudades/estados?",
                "a": "Sí, con el paquete Elite o una estrategia multi-ciudad podemos optimizar tu presencia para múltiples ubicaciones en Estados Unidos."
            }
        ]
        if "items" in mp["faq"]:
            mp["faq"]["items"].extend(new_faqs)
    
    # Update Final CTA
    if "final_cta" in mp:
        mp["final_cta"]["title_alt"] = "¿Listo para recibir más clientes?"
        mp["final_cta"]["subtitle_alt"] = "No dejes pasar otro día sin que tu negocio sea descubierto por personas que ya están buscando lo que ofreces."
    
    return data

def add_cro_translations_en(data):
    """Add English CRO translations"""
    mp = data["MarketingPage"]
    
    # Add industries guidance
    if "industries" in mp:
        mp["industries"]["guidance"] = "These are some industries that see results. If your business isn't on the list, we can also adapt it to your category."
    
    # Add pricing guidance
    if "pricing" in mp:
        mp["pricing"]["header_subtitle"] = "One-time investment, ongoing benefits (no monthly fees or contracts)"
        mp["pricing"]["guidance"] = {
            "title": "Which one to choose?",
            "basic": "to get started",
            "pro": "to grow faster",
            "elite": "to compete strong in high-demand categories"
        }
        mp["pricing"]["pro_badge"] = "Most Popular"
        mp["pricing"]["pro_cta"] = "Choose Pro (Recommended)"
        mp["pricing"]["requirements_title"] = "What we need from you"
        mp["pricing"]["requirements_text"] = "Logo + photos + city + link/WhatsApp (2 minutes)"
        mp["pricing"]["disclaimer_full"] = "Results vary by industry, location, and competition. We guarantee professional implementation, optimization, and publication — not specific sales results."
    
    # Add How It Works section
    mp["how_it_works"] = {
        "title": "As Easy as 1-2-3",
        "subtitle": "You don't need to be a marketing expert. We handle the technical part.",
        "steps": [
            {
                "number": "1",
                "title": "Choose your plan",
                "desc": "Select the package that best fits your goals"
            },
            {
                "number": "2",
                "title": "Send us your info",
                "desc": "Logo, photos, services, location, and preferred link"
            },
            {
                "number": "3",
                "title": "Get customers",
                "desc": "We design, optimize, and publish"
            }
        ],
        "footer": "We design, optimize, and publish. You just respond to messages and convert.",
        "cta": "Start now"
    }
    
    # Add Floating WhatsApp
    mp["floating_whatsapp"] = {
        "text": "Have questions?",
        "button": "WhatsApp"
    }
    
    # Enhance FAQ
    if "faq" in mp:
        mp["faq"]["mini_cta"] = "Want us to recommend the ideal plan for you? → Chat on WhatsApp"
        # Add new FAQ items
        new_faqs = [
            {
                "q": "Is Pinterest worldwide?",
                "a": "Yes, Pinterest is a global platform. We focus your strategy on the United States (or local based on your service) to maximize results in your target market."
            },
            {
                "q": "Can I appear in multiple cities/states?",
                "a": "Yes, with the Elite package or a multi-city strategy we can optimize your presence for multiple locations across the United States."
            }
        ]
        if "items" in mp["faq"]:
            mp["faq"]["items"].extend(new_faqs)
    
    # Update Final CTA
    if "final_cta" in mp:
        mp["final_cta"]["title_alt"] = "Ready to get more customers?"
        mp["final_cta"]["subtitle_alt"] = "Don't let another day go by without your business being discovered by people who are already looking for what you offer."
    
    return data

def main():
    # Process es.json
    with open('/Users/dithergenes/Genes Team Dropbox/000 BUSCAMEN/2026/ANTIGRAVITY/messages/es.json', 'r', encoding='utf-8') as f:
        es_data = json.load(f)
    
    es_data = add_cro_translations_es(es_data)
    
    with open('/Users/dithergenes/Genes Team Dropbox/000 BUSCAMEN/2026/ANTIGRAVITY/messages/es.json', 'w', encoding='utf-8') as f:
        json.dump(es_data, f, ensure_ascii=False, indent=4)
    
    print("✓ Updated es.json")
    
    # Process en.json
    with open('/Users/dithergenes/Genes Team Dropbox/000 BUSCAMEN/2026/ANTIGRAVITY/messages/en.json', 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    
    en_data = add_cro_translations_en(en_data)
    
    with open('/Users/dithergenes/Genes Team Dropbox/000 BUSCAMEN/2026/ANTIGRAVITY/messages/en.json', 'w', encoding='utf-8') as f:
        json.dump(en_data, f, ensure_ascii=False, indent=4)
    
    print("✓ Updated en.json")
    print("\nAll CRO translations added successfully!")

if __name__ == "__main__":
    main()
