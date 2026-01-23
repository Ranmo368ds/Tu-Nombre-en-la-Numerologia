#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../messages');

// Leer el archivo español como referencia
const esContent = JSON.parse(fs.readFileSync(path.join(messagesDir, 'es.json'), 'utf8'));

// Estructura HomePage para francés
const frHomePage = {
    title: "Bienvenue à Instinto Saludable",
    subtitle: "Votre chemin vers le bien-être holistique",
    nav: {
        home: "Accueil",
        shop: "Boutique",
        oils: "Huiles Essentielles",
        ebooks: "eBooks",
        emusic: "eMusic",
        holistic: "Holistique",
        blog: "Blog",
        contact: "Contact",
        numerology: "Numérologie",
        tarot: "Tarot"
    },
    hero: {
        title: "Éveillez Votre Instinct",
        subtitle: "Trouvez l'équilibre parfait entre corps, esprit et âme.",
        cta_contact: "Contactez-nous Maintenant",
        cta_shop: "Voir la Boutique"
    },
    categories: {
        title: "Explorer par Catégorie",
        oils: "Huiles",
        crystals: "Cristaux",
        ebooks: "eBooks",
        music: "Musique",
        supplements: "Suppléments",
        kids: "Enfants"
    },
    bestsellers: {
        title: "Produits les Plus Vendus",
        view_product: "Voir le Produit"
    },
    features: {
        numerology_title: "Numérologie Sacrée",
        numerology_desc: "Découvrez la carte de votre âme et votre destin à travers les nombres.",
        radio_title: "Radio Única",
        radio_desc: "Musique et contenu pour élever votre vibration 24h/24.",
        oils_title: "Huiles Essentielles",
        oils_desc: "Aromathérapie pure pour guérir et harmoniser votre environnement."
    }
};

// Leer archivo francés
const frPath = path.join(messagesDir, 'fr.json');
const frContent = JSON.parse(fs.readFileSync(frPath, 'utf8'));

// Actualizar HomePage en francés
frContent.HomePage = frHomePage;

// Guardar
fs.writeFileSync(frPath, JSON.stringify(frContent, null, 4), 'utf8');
console.log('✅ Updated fr.json HomePage structure');
