#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../messages');

// Traducciones para Shop y Contact en cada idioma
const translations = {
    fr: {
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
        Shop: {
            title: "Boutique Holistique",
            subtitle: "Outils sélectionnés pour votre bien-être physique, mental et spirituel.",
            filters: {
                all: "Tous",
                oils: "Huiles",
                crystals: "Cristaux",
                ebooks: "eBooks",
                music: "Musique",
                holistic: "Holistique",
                merch: "Merch Radio Unica"
            },
            product: {
                add_to_cart: "Ajouter au Panier",
                details: "Voir Détails",
                price: "Prix",
                features: "Caractéristiques",
                description: "Description"
            },
            upsells: "Vous pourriez aussi aimer"
        },
        Contact: {
            title: "Contactez-nous",
            subtitle: "Nous sommes là pour vous écouter et vous guider sur votre chemin.",
            form: {
                name: "Nom",
                email: "Email",
                message: "Message",
                send: "Envoyer le Message",
                success: "Message envoyé avec succès!",
                placeholder_name: "Votre nom complet",
                placeholder_email: "vous@email.com",
                placeholder_message: "Comment pouvons-nous vous aider?"
            }
        }
    },
    pt: {
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
        Shop: {
            title: "Loja Holística",
            subtitle: "Ferramentas selecionadas para seu bem-estar físico, mental e espiritual.",
            filters: {
                all: "Todos",
                oils: "Óleos",
                crystals: "Cristais",
                ebooks: "eBooks",
                music: "Música",
                holistic: "Holístico",
                merch: "Merch Radio Unica"
            },
            product: {
                add_to_cart: "Adicionar ao Carrinho",
                details: "Ver Detalhes",
                price: "Preço",
                features: "Características",
                description: "Descrição"
            },
            upsells: "Você também pode gostar"
        },
        Contact: {
            title: "Entre em Contato",
            subtitle: "Estamos aqui para ouvir e guiá-lo em seu caminho.",
            form: {
                name: "Nome",
                email: "Email",
                message: "Mensagem",
                send: "Enviar Mensagem",
                success: "Mensagem enviada com sucesso!",
                placeholder_name: "Seu nome completo",
                placeholder_email: "voce@email.com",
                placeholder_message: "Como podemos ajudá-lo?"
            }
        }
    },
    it: {
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
        Shop: {
            title: "Negozio Olistico",
            subtitle: "Strumenti selezionati per il tuo benessere fisico, mentale e spirituale.",
            filters: {
                all: "Tutti",
                oils: "Oli",
                crystals: "Cristalli",
                ebooks: "eBooks",
                music: "Musica",
                holistic: "Olistico",
                merch: "Merch Radio Unica"
            },
            product: {
                add_to_cart: "Aggiungi al Carrello",
                details: "Vedi Dettagli",
                price: "Prezzo",
                features: "Caratteristiche",
                description: "Descrizione"
            },
            upsells: "Potrebbe piacerti anche"
        },
        Contact: {
            title: "Contattaci",
            subtitle: "Siamo qui per ascoltarti e guidarti nel tuo percorso.",
            form: {
                name: "Nome",
                email: "Email",
                message: "Messaggio",
                send: "Invia Messaggio",
                success: "Messaggio inviato con successo!",
                placeholder_name: "Il tuo nome completo",
                placeholder_email: "tu@email.com",
                placeholder_message: "Come possiamo aiutarti?"
            }
        }
    },
    de: {
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
        Shop: {
            title: "Holistischer Shop",
            subtitle: "Ausgewählte Werkzeuge für Ihr körperliches, geistiges und spirituelles Wohlbefinden.",
            filters: {
                all: "Alle",
                oils: "Öle",
                crystals: "Kristalle",
                ebooks: "eBooks",
                music: "Musik",
                holistic: "Holistisch",
                merch: "Radio Unica Merch"
            },
            product: {
                add_to_cart: "In den Warenkorb",
                details: "Details ansehen",
                price: "Preis",
                features: "Eigenschaften",
                description: "Beschreibung"
            },
            upsells: "Das könnte Ihnen auch gefallen"
        },
        Contact: {
            title: "Kontaktieren Sie uns",
            subtitle: "Wir sind hier, um Ihnen zuzuhören und Sie auf Ihrem Weg zu führen.",
            form: {
                name: "Name",
                email: "E-Mail",
                message: "Nachricht",
                send: "Nachricht senden",
                success: "Nachricht erfolgreich gesendet!",
                placeholder_name: "Ihr vollständiger Name",
                placeholder_email: "sie@email.com",
                placeholder_message: "Wie können wir Ihnen helfen?"
            }
        }
    },
    ru: {
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
        Shop: {
            title: "Холистический магазин",
            subtitle: "Подобранные инструменты для вашего физического, ментального и духовного благополучия.",
            filters: {
                all: "Все",
                oils: "Масла",
                crystals: "Кристаллы",
                ebooks: "Электронные книги",
                music: "Музыка",
                holistic: "Холистик",
                merch: "Мерч Radio Unica"
            },
            product: {
                add_to_cart: "Добавить в корзину",
                details: "Подробнее",
                price: "Цена",
                features: "Характеристики",
                description: "Описание"
            },
            upsells: "Вам также может понравиться"
        },
        Contact: {
            title: "Свяжитесь с нами",
            subtitle: "Мы здесь, чтобы выслушать вас и направить на вашем пути.",
            form: {
                name: "Имя",
                email: "Электронная почта",
                message: "Сообщение",
                send: "Отправить сообщение",
                success: "Сообщение успешно отправлено!",
                placeholder_name: "Ваше полное имя",
                placeholder_email: "вы@email.com",
                placeholder_message: "Как мы можем вам помочь?"
            }
        }
    },
    pl: {
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
        Shop: {
            title: "Sklep holistyczny",
            subtitle: "Wybrane narzędzia dla twojego fizycznego, mentalnego i duchowego dobrostanu.",
            filters: {
                all: "Wszystkie",
                oils: "Olejki",
                crystals: "Kryształy",
                ebooks: "eBooki",
                music: "Muzyka",
                holistic: "Holistyczny",
                merch: "Gadżety Radio Unica"
            },
            product: {
                add_to_cart: "Dodaj do koszyka",
                details: "Zobacz szczegóły",
                price: "Cena",
                features: "Cechy",
                description: "Opis"
            },
            upsells: "Może ci się również spodobać"
        },
        Contact: {
            title: "Skontaktuj się z nami",
            subtitle: "Jesteśmy tutaj, aby cię wysłuchać i poprowadzić na twojej drodze.",
            form: {
                name: "Imię",
                email: "Email",
                message: "Wiadomość",
                send: "Wyślij wiadomość",
                success: "Wiadomość wysłana pomyślnie!",
                placeholder_name: "Twoje pełne imię",
                placeholder_email: "ty@email.com",
                placeholder_message: "Jak możemy ci pomóc?"
            }
        }
    }
};

// Procesar cada idioma
Object.keys(translations).forEach(lang => {
    const filePath = path.join(messagesDir, `${lang}.json`);

    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Actualizar nav si existe HomePage
        if (content.HomePage && content.HomePage.nav) {
            content.HomePage.nav = translations[lang].nav;
        }

        // Agregar Shop y Contact
        content.Shop = translations[lang].Shop;
        content.Contact = translations[lang].Contact;

        fs.writeFileSync(filePath, JSON.stringify(content, null, 4), 'utf8');
        console.log(`✅ Updated ${lang}.json`);
    } catch (error) {
        console.error(`❌ Error updating ${lang}.json:`, error.message);
    }
});

console.log('\n🎉 All translations updated!');
