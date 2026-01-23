#!/usr/bin/env python3
"""
Script to add SEO translations to es.json and en.json
"""
import json

def add_seo_translations_es(data):
    """Add Spanish SEO translations"""
    mp = data["MarketingPage"]
    
    mp["seo"] = {
        "title": "Genes Marketing | Directorio de Negocios Latinos en Pinterest - Chicago & USA",
        "description": "Promociona tu negocio latino en Pinterest con pines profesionales optimizados. Directorio de +80 negocios en Chicago y USA. Sin mensualidades, resultados duraderos.",
        "keywords": "marketing pinterest, negocios latinos, directorio negocios chicago, pinterest marketing usa, promoción negocios hispanos, seo pinterest, pines profesionales, marketing digital latinos, negocios hispanos chicago, directorio latino estados unidos",
        "og_title": "Genes Marketing - Directorio #1 de Negocios Latinos en Pinterest",
        "og_description": "Creamos pines profesionales optimizados con SEO para tu negocio. +80 negocios ya confían en nosotros. Chicago Northwest Suburbs y todo USA.",
        "og_image_alt": "Genes Marketing - Directorio de Negocios Latinos en Pinterest",
        "twitter_title": "Genes Marketing | Promociona tu Negocio Latino en Pinterest",
        "twitter_description": "Pines profesionales + SEO + Directorio curado = Más clientes para tu negocio. Sin mensualidades."
    }
    
    return data

def add_seo_translations_en(data):
    """Add English SEO translations"""
    mp = data["MarketingPage"]
    
    mp["seo"] = {
        "title": "Genes Marketing | Latino Business Directory on Pinterest - Chicago & USA",
        "description": "Promote your Latino business on Pinterest with professional optimized pins. Directory of +80 businesses in Chicago and USA. No monthly fees, lasting results.",
        "keywords": "pinterest marketing, latino businesses, chicago business directory, pinterest marketing usa, hispanic business promotion, pinterest seo, professional pins, latino digital marketing, hispanic businesses chicago, latino directory united states",
        "og_title": "Genes Marketing - #1 Latino Business Directory on Pinterest",
        "og_description": "We create professional SEO-optimized pins for your business. +80 businesses already trust us. Chicago Northwest Suburbs and all USA.",
        "og_image_alt": "Genes Marketing - Latino Business Directory on Pinterest",
        "twitter_title": "Genes Marketing | Promote Your Latino Business on Pinterest",
        "twitter_description": "Professional pins + SEO + Curated directory = More customers for your business. No monthly fees."
    }
    
    return data

def main():
    # Process es.json
    with open('/Users/dithergenes/Genes Team Dropbox/000 BUSCAMEN/2026/ANTIGRAVITY/messages/es.json', 'r', encoding='utf-8') as f:
        es_data = json.load(f)
    
    es_data = add_seo_translations_es(es_data)
    
    with open('/Users/dithergenes/Genes Team Dropbox/000 BUSCAMEN/2026/ANTIGRAVITY/messages/es.json', 'w', encoding='utf-8') as f:
        json.dump(es_data, f, ensure_ascii=False, indent=4)
    
    print("✓ Updated es.json with SEO translations")
    
    # Process en.json
    with open('/Users/dithergenes/Genes Team Dropbox/000 BUSCAMEN/2026/ANTIGRAVITY/messages/en.json', 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    
    en_data = add_seo_translations_en(en_data)
    
    with open('/Users/dithergenes/Genes Team Dropbox/000 BUSCAMEN/2026/ANTIGRAVITY/messages/en.json', 'w', encoding='utf-8') as f:
        json.dump(en_data, f, ensure_ascii=False, indent=4)
    
    print("✓ Updated en.json with SEO translations")
    print("\nSEO translations added successfully!")

if __name__ == "__main__":
    main()
