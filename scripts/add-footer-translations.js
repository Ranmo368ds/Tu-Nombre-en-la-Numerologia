#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../messages');

const footerTranslations = {
    fr: {
        explore: "Explorer",
        legal: "Légal",
        shop: "Boutique",
        numerology: "Numérologie",
        blog: "Blog",
        about: "À propos",
        privacy: "Confidentialité",
        terms: "Conditions",
        rights: "Tous droits réservés",
        tagline: "Votre refuge numérique pour la guérison, la connaissance de soi et le bien-être holistique. Découvrez le pouvoir de votre propre énergie."
    },
    pt: {
        explore: "Explorar",
        legal: "Legal",
        shop: "Loja",
        numerology: "Numerologia",
        blog: "Blog",
        about: "Sobre",
        privacy: "Privacidade",
        terms: "Termos",
        rights: "Todos os direitos reservados",
        tagline: "Seu refúgio digital para cura, autoconhecimento e bem-estar holístico. Descubra o poder da sua própria energia."
    },
    it: {
        explore: "Esplora",
        legal: "Legale",
        shop: "Negozio",
        numerology: "Numerologia",
        blog: "Blog",
        about: "Chi siamo",
        privacy: "Privacy",
        terms: "Termini",
        rights: "Tutti i diritti riservati",
        tagline: "Il tuo rifugio digitale per la guarigione, la conoscenza di sé e il benessere olistico. Scopri il potere della tua energia."
    },
    de: {
        explore: "Erkunden",
        legal: "Rechtliches",
        shop: "Shop",
        numerology: "Numerologie",
        blog: "Blog",
        about: "Über uns",
        privacy: "Datenschutz",
        terms: "Bedingungen",
        rights: "Alle Rechte vorbehalten",
        tagline: "Ihr digitaler Zufluchtsort für Heilung, Selbsterkenntnis und ganzheitliches Wohlbefinden. Entdecken Sie die Kraft Ihrer eigenen Energie."
    },
    ru: {
        explore: "Исследовать",
        legal: "Юридическая информация",
        shop: "Магазин",
        numerology: "Нумерология",
        blog: "Блог",
        about: "О нас",
        privacy: "Конфиденциальность",
        terms: "Условия",
        rights: "Все права защищены",
        tagline: "Ваше цифровое убежище для исцеления, самопознания и целостного благополучия. Откройте силу своей собственной энергии."
    },
    pl: {
        explore: "Eksploruj",
        legal: "Prawne",
        shop: "Sklep",
        numerology: "Numerologia",
        blog: "Blog",
        about: "O nas",
        privacy: "Prywatność",
        terms: "Warunki",
        rights: "Wszelkie prawa zastrzeżone",
        tagline: "Twoje cyfrowe schronienie dla uzdrowienia, samopoznania i holistycznego dobrostanu. Odkryj moc własnej energii."
    }
};

Object.keys(footerTranslations).forEach(lang => {
    const filePath = path.join(messagesDir, `${lang}.json`);

    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (content.HomePage) {
            content.HomePage.footer = footerTranslations[lang];
        }

        fs.writeFileSync(filePath, JSON.stringify(content, null, 4), 'utf8');
        console.log(`✅ Added footer translations to ${lang}.json`);
    } catch (error) {
        console.error(`❌ Error updating ${lang}.json:`, error.message);
    }
});

console.log('\n🎉 All footer translations added!');
