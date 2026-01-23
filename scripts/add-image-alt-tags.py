#!/usr/bin/env python3
"""
Script to add comprehensive alt tags to all images in components
"""
import os
import re

def add_alt_tags_to_component(file_path, component_name):
    """Add or update alt tags in a component file"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Define alt tag patterns for different image types
    alt_patterns = {
        'GENES-MARKETING-LOGO.png': 'Genes Marketing - Directorio de Negocios Latinos en Pinterest',
        'pinterest-seeklogo.png': 'Pinterest Logo',
        'Sealcoating Services.webp': 'Sealcoating Services - Pinterest Marketing by Genes Marketing',
        'Catering & Food.png': 'Catering and Food Services - Pinterest Marketing by Genes Marketing',
        'Remodeling Services.jpg': 'Remodeling Services - Pinterest Marketing by Genes Marketing',
        'Landscaping.jpg': 'Landscaping Services - Pinterest Marketing by Genes Marketing',
        'Professional Cleaning.jpg': 'Professional Cleaning Services - Pinterest Marketing by Genes Marketing',
        'Beauty Salons.jpg': 'Beauty Salon Services - Pinterest Marketing by Genes Marketing',
        'tax Legal Services.webp': 'Tax and Legal Services - Pinterest Marketing by Genes Marketing',
    }
    
    # Find all img tags without alt or with empty alt
    img_pattern = r'<img\s+([^>]*?)(?:alt="[^"]*")?\s*([^>]*?)/?>'
    
    def replace_img(match):
        before_alt = match.group(1)
        after_alt = match.group(2)
        
        # Extract src to determine appropriate alt text
        src_match = re.search(r'src="([^"]+)"', before_alt + after_alt)
        if src_match:
            src = src_match.group(1)
            
            # Find matching alt text
            alt_text = None
            for image_name, alt in alt_patterns.items():
                if image_name in src:
                    alt_text = alt
                    break
            
            if not alt_text:
                # Generic alt based on component
                alt_text = f"Genes Marketing - {component_name}"
            
            # Reconstruct img tag with alt
            return f'<img {before_alt} alt="{alt_text}" {after_alt} />'
        
        return match.group(0)
    
    # Replace img tags
    updated_content = re.sub(img_pattern, replace_img, content)
    
    # Add loading="lazy" to non-critical images
    if component_name not in ['HeroSection', 'MarketingHeader']:
        updated_content = re.sub(
            r'<img\s+(?!.*loading=)([^>]+)>',
            r'<img loading="lazy" \1>',
            updated_content
        )
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print(f"✓ Updated {component_name}")

def main():
    base_path = '/Users/dithergenes/Genes Team Dropbox/000 BUSCAMEN/2026/ANTIGRAVITY/components/genes-marketing'
    
    components = [
        'IndustriesSection.tsx',
        'BenefitsSection.tsx',
        'PricingSection.tsx',
        'TestimonialsSection.tsx',
        'ContactSection.tsx',
        'FooterSection.tsx',
        'PinterestDirectorySection.tsx',
    ]
    
    for component in components:
        file_path = os.path.join(base_path, component)
        if os.path.exists(file_path):
            component_name = component.replace('.tsx', '')
            add_alt_tags_to_component(file_path, component_name)
    
    print("\n✅ All components updated with alt tags and lazy loading!")

if __name__ == "__main__":
    main()
