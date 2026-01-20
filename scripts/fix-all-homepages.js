#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../messages');

// Estructuras HomePage para cada idioma
const homePageTranslations = {
    pt: {
        title: "Bem-vindo ao Instinto Saludable",
        subtitle: "Seu caminho para o bem-estar holístico",
        nav: {
            home: "Início",
            shop: "Loja",
            oils: "Óleos Essenciais",
            ebooks: "eBooks",
            emusic: "eMusic",
            holistic: "Holístico",
            blog: "Blog",
            contact: "Contato",
            numerology: "Numerologia",
            tarot: "Tarot"
        },
        hero: {
            title: "Desperte Seu Instinto",
            subtitle: "Encontre o equilíbrio perfeito entre corpo, mente e espírito.",
            cta_contact: "Entre em Contato Agora",
            cta_shop: "Ver Loja"
        },
        categories: {
            title: "Explorar por Categoria",
            oils: "Óleos",
            crystals: "Cristais",
            ebooks: "eBooks",
            music: "Música",
            supplements: "Suplementos",
            kids: "Crianças"
        },
        bestsellers: {
            title: "Produtos Mais Vendidos",
            view_product: "Ver Produto"
        },
        features: {
            numerology_title: "Numerologia Sagrada",
            numerology_desc: "Descubra o mapa da sua alma e destino através dos números.",
            radio_title: "Radio Única",
            radio_desc: "Música e conteúdo para elevar sua vibração 24 horas.",
            oils_title: "Óleos Essenciais",
            oils_desc: "Aromaterapia pura para curar e harmonizar seu ambiente."
        }
    },
    it: {
        title: "Benvenuto a Instinto Saludable",
        subtitle: "Il tuo percorso verso il benessere olistico",
        nav: {
            home: "Home",
            shop: "Negozio",
            oils: "Oli Essenziali",
            ebooks: "eBooks",
            emusic: "eMusic",
            holistic: "Olistico",
            blog: "Blog",
            contact: "Contatto",
            numerology: "Numerologia",
            tarot: "Tarocchi"
        },
        hero: {
            title: "Risveglia il Tuo Istinto",
            subtitle: "Trova l'equilibrio perfetto tra corpo, mente e spirito.",
            cta_contact: "Contattaci Ora",
            cta_shop: "Vedi Negozio"
        },
        categories: {
            title: "Esplora per Categoria",
            oils: "Oli",
            crystals: "Cristalli",
            ebooks: "eBooks",
            music: "Musica",
            supplements: "Integratori",
            kids: "Bambini"
        },
        bestsellers: {
            title: "Prodotti Più Venduti",
            view_product: "Vedi Prodotto"
        },
        features: {
            numerology_title: "Numerologia Sacra",
            numerology_desc: "Scopri la mappa della tua anima e destino attraverso i numeri.",
            radio_title: "Radio Única",
            radio_desc: "Musica e contenuti per elevare la tua vibrazione 24 ore su 24.",
            oils_title: "Oli Essenziali",
            oils_desc: "Aromaterapia pura per guarire e armonizzare il tuo ambiente."
        }
    },
    de: {
        title: "Willkommen bei Instinto Saludable",
        subtitle: "Ihr Weg zum ganzheitlichen Wohlbefinden",
        nav: {
            home: "Startseite",
            shop: "Shop",
            oils: "Ätherische Öle",
            ebooks: "eBooks",
            emusic: "eMusic",
            holistic: "Holistisch",
            blog: "Blog",
            contact: "Kontakt",
            numerology: "Numerologie",
            tarot: "Tarot"
        },
        hero: {
            title: "Erwecken Sie Ihren Instinkt",
            subtitle: "Finden Sie das perfekte Gleichgewicht zwischen Körper, Geist und Seele.",
            cta_contact: "Kontaktieren Sie uns jetzt",
            cta_shop: "Shop ansehen"
        },
        categories: {
            title: "Nach Kategorie erkunden",
            oils: "Öle",
            crystals: "Kristalle",
            ebooks: "eBooks",
            music: "Musik",
            supplements: "Nahrungsergänzungsmittel",
            kids: "Kinder"
        },
        bestsellers: {
            title: "Meistverkaufte Produkte",
            view_product: "Produkt ansehen"
        },
        features: {
            numerology_title: "Heilige Numerologie",
            numerology_desc: "Entdecken Sie die Karte Ihrer Seele und Ihres Schicksals durch Zahlen.",
            radio_title: "Radio Única",
            radio_desc: "Musik und Inhalte, um Ihre Schwingung 24 Stunden am Tag zu erhöhen.",
            oils_title: "Ätherische Öle",
            oils_desc: "Reine Aromatherapie zur Heilung und Harmonisierung Ihrer Umgebung."
        }
    },
    ru: {
        title: "Добро пожаловать в Instinto Saludable",
        subtitle: "Ваш путь к целостному благополучию",
        nav: {
            home: "Главная",
            shop: "Магазин",
            oils: "Эфирные масла",
            ebooks: "Электронные книги",
            emusic: "Музыка",
            holistic: "Холистик",
            blog: "Блог",
            contact: "Контакты",
            numerology: "Нумерология",
            tarot: "Таро"
        },
        hero: {
            title: "Пробудите Свой Инстинкт",
            subtitle: "Найдите идеальный баланс между телом, разумом и духом.",
            cta_contact: "Свяжитесь с нами сейчас",
            cta_shop: "Посмотреть магазин"
        },
        categories: {
            title: "Исследовать по категориям",
            oils: "Масла",
            crystals: "Кристаллы",
            ebooks: "Электронные книги",
            music: "Музыка",
            supplements: "Добавки",
            kids: "Дети"
        },
        bestsellers: {
            title: "Самые продаваемые продукты",
            view_product: "Посмотреть продукт"
        },
        features: {
            numerology_title: "Священная нумерология",
            numerology_desc: "Откройте карту своей души и судьбы через числа.",
            radio_title: "Radio Única",
            radio_desc: "Музыка и контент для повышения вашей вибрации 24 часа в сутки.",
            oils_title: "Эфирные масла",
            oils_desc: "Чистая ароматерапия для исцеления и гармонизации вашей среды."
        }
    },
    pl: {
        title: "Witamy w Instinto Saludable",
        subtitle: "Twoja droga do holistycznego dobrostanu",
        nav: {
            home: "Strona główna",
            shop: "Sklep",
            oils: "Olejki eteryczne",
            ebooks: "eBooki",
            emusic: "Muzyka",
            holistic: "Holistyczny",
            blog: "Blog",
            contact: "Kontakt",
            numerology: "Numerologia",
            tarot: "Tarot"
        },
        hero: {
            title: "Obudź Swój Instynkt",
            subtitle: "Znajdź idealną równowagę między ciałem, umysłem i duchem.",
            cta_contact: "Skontaktuj się teraz",
            cta_shop: "Zobacz sklep"
        },
        categories: {
            title: "Przeglądaj według kategorii",
            oils: "Olejki",
            crystals: "Kryształy",
            ebooks: "eBooki",
            music: "Muzyka",
            supplements: "Suplementy",
            kids: "Dzieci"
        },
        bestsellers: {
            title: "Najlepiej sprzedające się produkty",
            view_product: "Zobacz produkt"
        },
        features: {
            numerology_title: "Święta Numerologia",
            numerology_desc: "Odkryj mapę swojej duszy i przeznaczenia przez liczby.",
            radio_title: "Radio Única",
            radio_desc: "Muzyka i treści podnoszące twoją wibrację 24 godziny na dobę.",
            oils_title: "Olejki eteryczne",
            oils_desc: "Czysta aromaterapia do leczenia i harmonizowania twojego otoczenia."
        }
    }
};

// Procesar cada idioma
Object.keys(homePageTranslations).forEach(lang => {
    const filePath = path.join(messagesDir, `${lang}.json`);

    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        content.HomePage = homePageTranslations[lang];
        fs.writeFileSync(filePath, JSON.stringify(content, null, 4), 'utf8');
        console.log(`✅ Updated ${lang}.json HomePage structure`);
    } catch (error) {
        console.error(`❌ Error updating ${lang}.json:`, error.message);
    }
});

console.log('\n🎉 All HomePage structures updated!');
