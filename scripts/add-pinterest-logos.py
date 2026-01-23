#!/usr/bin/env python3
"""
Script to add Pinterest logo inline in all text mentions
"""
import json

def add_pinterest_logo_tags(data):
    """Wrap Pinterest mentions with <p> tags for rich text rendering"""
    mp = data["MarketingPage"]
    
    # Hero section
    if "hero" in mp:
        mp["hero"]["title"] = mp["hero"]["title"].replace("Pinterest", "<p>Pinterest</p>")
        mp["hero"]["subtitle"] = mp["hero"]["subtitle"].replace("Pinterest", "<p>Pinterest</p>")
    
    # Benefits section
    if "benefits" in mp:
        mp["benefits"]["title"] = mp["benefits"]["title"].replace("Pinterest", "<p>Pinterest</p>")
        mp["benefits"]["intro"] = mp["benefits"]["intro"].replace("Pinterest", "<p>Pinterest</p>")
        mp["benefits"]["description"] = mp["benefits"]["description"].replace("Pinterest", "<p>Pinterest</p>")
        
        # Update benefit items
        if "items" in mp["benefits"]:
            for key in mp["benefits"]["items"]:
                if "desc" in mp["benefits"]["items"][key]:
                    mp["benefits"]["items"][key]["desc"] = mp["benefits"]["items"][key]["desc"].replace("Pinterest", "<p>Pinterest</p>")
    
    # Industries section
    if "industries" in mp and "footer" in mp["industries"]:
        mp["industries"]["footer"] = mp["industries"]["footer"].replace("Pinterest", "<p>Pinterest</p>")
    
    # Pricing section
    if "pricing" in mp:
        if "subtitle" in mp["pricing"]:
            mp["pricing"]["subtitle"] = mp["pricing"]["subtitle"].replace("Pinterest", "<p>Pinterest</p>")
        if "packages_list" in mp["pricing"]:
            for pkg in mp["pricing"]["packages_list"]:
                if "desc" in mp["pricing"]["packages_list"][pkg]:
                    mp["pricing"]["packages_list"][pkg]["desc"] = mp["pricing"]["packages_list"][pkg]["desc"].replace("Pinterest", "<p>Pinterest</p>")
    
    # Final CTA
    if "final_cta" in mp:
        if "title" in mp["final_cta"]:
            mp["final_cta"]["title"] = mp["final_cta"]["title"].replace("Pinterest", "<p>Pinterest</p>")
    
    # Add directory section
    mp["directory"] = {
        "text": "Nuestro Directorio en <p>Pinterest</p> tiene +80 pins organizados por categorías de servicios que ayudan a que clientes encuentren negocios como el tuyo cuando están listos para comprar o contratar. Puedes explorar las secciones, guardar tu favorito y contactarlos directamente.",
        "link": "https://www.pinterest.com/genesmarketing/latino-business-directory-chicago-suburbs/",
        "cta": "Ver Directorio en Pinterest"
    }
    
    return data

def main():
    # Process es.json
    with open('/Users/dithergenes/Genes Team Dropbox/000 BUSCAMEN/2026/ANTIGRAVITY/messages/es.json', 'r', encoding='utf-8') as f:
        es_data = json.load(f)
    
    es_data = add_pinterest_logo_tags(es_data)
    
    with open('/Users/dithergenes/Genes Team Dropbox/000 BUSCAMEN/2026/ANTIGRAVITY/messages/es.json', 'w', encoding='utf-8') as f:
        json.dump(es_data, f, ensure_ascii=False, indent=4)
    
    print("✓ Updated es.json with Pinterest logo tags")
    
    # Process en.json
    with open('/Users/dithergenes/Genes Team Dropbox/000 BUSCAMEN/2026/ANTIGRAVITY/messages/en.json', 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    
    # English version
    en_mp = en_data["MarketingPage"]
    
    # Hero section
    if "hero" in en_mp:
        en_mp["hero"]["title"] = en_mp["hero"]["title"].replace("Pinterest", "<p>Pinterest</p>")
        en_mp["hero"]["subtitle"] = en_mp["hero"]["subtitle"].replace("Pinterest", "<p>Pinterest</p>")
    
    # Benefits section
    if "benefits" in en_mp:
        en_mp["benefits"]["title"] = en_mp["benefits"]["title"].replace("Pinterest", "<p>Pinterest</p>")
        en_mp["benefits"]["intro"] = en_mp["benefits"]["intro"].replace("Pinterest", "<p>Pinterest</p>")
        en_mp["benefits"]["description"] = en_mp["benefits"]["description"].replace("Pinterest", "<p>Pinterest</p>")
        
        if "items" in en_mp["benefits"]:
            for key in en_mp["benefits"]["items"]:
                if "desc" in en_mp["benefits"]["items"][key]:
                    en_mp["benefits"]["items"][key]["desc"] = en_mp["benefits"]["items"][key]["desc"].replace("Pinterest", "<p>Pinterest</p>")
    
    # Industries section
    if "industries" in en_mp and "footer" in en_mp["industries"]:
        en_mp["industries"]["footer"] = en_mp["industries"]["footer"].replace("Pinterest", "<p>Pinterest</p>")
    
    # Pricing section
    if "pricing" in en_mp:
        if "subtitle" in en_mp["pricing"]:
            en_mp["pricing"]["subtitle"] = en_mp["pricing"]["subtitle"].replace("Pinterest", "<p>Pinterest</p>")
        if "packages_list" in en_mp["pricing"]:
            for pkg in en_mp["pricing"]["packages_list"]:
                if "desc" in en_mp["pricing"]["packages_list"][pkg]:
                    en_mp["pricing"]["packages_list"][pkg]["desc"] = en_mp["pricing"]["packages_list"][pkg]["desc"].replace("Pinterest", "<p>Pinterest</p>")
    
    # Final CTA
    if "final_cta" in en_mp:
        if "title" in en_mp["final_cta"]:
            en_mp["final_cta"]["title"] = en_mp["final_cta"]["title"].replace("Pinterest", "<p>Pinterest</p>")
    
    # Add directory section (English)
    en_mp["directory"] = {
        "text": "Our <p>Pinterest</p> Directory has +80 pins organized by service categories that help customers find businesses like yours when they're ready to buy or hire. You can explore the sections, save your favorites, and contact them directly.",
        "link": "https://www.pinterest.com/genesmarketing/latino-business-directory-chicago-suburbs/",
        "cta": "View Pinterest Directory"
    }
    
    with open('/Users/dithergenes/Genes Team Dropbox/000 BUSCAMEN/2026/ANTIGRAVITY/messages/en.json', 'w', encoding='utf-8') as f:
        json.dump(en_data, f, ensure_ascii=False, indent=4)
    
    print("✓ Updated en.json with Pinterest logo tags")
    print("\nAll Pinterest mentions now have logo tags!")

if __name__ == "__main__":
    main()
