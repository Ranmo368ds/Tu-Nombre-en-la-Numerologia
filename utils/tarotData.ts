export interface TarotCardData {
    id: string;
    number: number;
    name: {
        es: string;
        en: string;
    };
    element: {
        es: string;
        en: string;
    };
    keywords: {
        es: string[];
        en: string[];
    };
    meaning: {
        es: string;
        en: string;
    };
    advice: {
        es: string;
        en: string;
    };
    dailyAction: {
        es: string;
        en: string;
    };
    image: string;
}

export const majorArcana: TarotCardData[] = [
    {
        id: "the-fool",
        number: 0,
        name: { es: "El Loco", en: "The Fool" },
        element: { es: "Aire", en: "Air" },
        keywords: {
            es: ["Nuevos comienzos", "Inocencia", "Espontaniedad", "Salto de fe"],
            en: ["New beginnings", "Innocence", "Spontaneity", "Leap of faith"]
        },
        meaning: {
            es: "El Loco representa el inicio de un viaje espiritual. Simboliza la pureza de intención y el valor de adentrarse en lo desconocido sin miedo.",
            en: "The Fool represents the beginning of a spiritual journey. It symbolizes purity of intention and the courage to step into the unknown without fear."
        },
        advice: {
            es: "Confía en el universo y da ese primer paso. No necesitas tener todas las respuestas ahora.",
            en: "Trust the universe and take that first step. You don't need to have all the answers right now."
        },
        dailyAction: {
            es: "Haz algo espontáneo hoy que rompa tu rutina.",
            en: "Do something spontaneous today that breaks your routine."
        },
        image: "https://images.unsplash.com/photo-1621258672051-248554cc87c9?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "the-magician",
        number: 1,
        name: { es: "El Mago", en: "The Magician" },
        element: { es: "Eter", en: "Ether" },
        keywords: {
            es: ["Manifestación", "Poder", "Acción inspirada", "Habilidad"],
            en: ["Manifestation", "Power", "Inspired action", "Skill"]
        },
        meaning: {
            es: "El Mago tiene todas las herramientas a su disposición. Representa la capacidad de convertir tus sueños en realidad a través de la voluntad.",
            en: "The Magician has all the tools at his disposal. It represents the ability to turn your dreams into reality through will."
        },
        advice: {
            es: "Utiliza tus talentos naturales. El momento de actuar es ahora.",
            en: "Use your natural talents. The time to act is now."
        },
        dailyAction: {
            es: "Enfócate en una meta específica y da un paso concreto para manifestarla.",
            en: "Focus on a specific goal and take a concrete step to manifest it."
        },
        image: "https://images.unsplash.com/photo-1632839420063-44f24f9f74a0?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "the-high-priestess",
        number: 2,
        name: { es: "La Sacerdotisa", en: "The High Priestess" },
        element: { es: "Agua", en: "Water" },
        keywords: {
            es: ["Intuición", "Misterio", "Subconsciente", "Sabiduría divina"],
            en: ["Intuition", "Mystery", "Subconscious", "Divine wisdom"]
        },
        meaning: {
            es: "La Sacerdotisa es la guardiana de los secretos. Te invita a mirar hacia adentro y confiar en tu voz interior.",
            en: "The High Priestess is the keeper of secrets. She invites you to look within and trust your inner voice."
        },
        advice: {
            es: "Busca las respuestas en tu silencio. Tus sueños hoy pueden contener mensajes importantes.",
            en: "Seek answers in your silence. Your dreams today may contain important messages."
        },
        dailyAction: {
            es: "Dedica 10 minutos a la meditación silenciosa.",
            en: "Dedicate 10 minutes to silent meditation."
        },
        image: "https://images.unsplash.com/photo-1579710520625-f673327685ba?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "the-empress",
        number: 3,
        name: { es: "La Emperatriz", en: "The Empress" },
        element: { es: "Tierra", en: "Earth" },
        keywords: {
            es: ["Abundancia", "Feminidad", "Fertilidad", "Naturaleza"],
            en: ["Abundance", "Femininity", "Fertility", "Nature"]
        },
        meaning: {
            es: "La Emperatriz representa la madre nutricia y la creatividad ilimitada. Es un recordatorio de la abundancia que te rodea.",
            en: "The Empress represents the nurturing mother and unlimited creativity. It is a reminder of the abundance that surrounds you."
        },
        advice: {
            es: "Conéctate con tus sentidos y con la belleza de la vida. Cuida de ti mismo y de los demás.",
            en: "Connect with your senses and the beauty of life. Take care of yourself and others."
        },
        dailyAction: {
            es: "Pasa tiempo al aire libre o cuida de una planta.",
            en: "Spend time outdoors or take care of a plant."
        },
        image: "https://images.unsplash.com/photo-1541812363177-336c589000a6?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "the-emperor",
        number: 4,
        name: { es: "El Emperador", en: "The Emperor" },
        element: { es: "Fuego", en: "Fire" },
        keywords: {
            es: ["Autoridad", "Estructura", "Padre", "Estabilidad"],
            en: ["Authority", "Structure", "Father", "Stability"]
        },
        meaning: {
            es: "El Emperador simboliza el orden y la disciplina. Representa la capacidad de liderar con sabiduría y crear bases sólidas.",
            en: "The Emperor symbolizes order and discipline. It represents the ability to lead with wisdom and create solid foundations."
        },
        advice: {
            es: "Establece límites claros y organiza tus prioridades.",
            en: "Establish clear boundaries and organize your priorities."
        },
        dailyAction: {
            es: "Organiza un espacio de tu oficina o casa que esté en desorden.",
            en: "Organize a space in your office or home that is in disorder."
        },
        image: "https://images.unsplash.com/photo-1619894982110-39433297f640?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "the-hierophant",
        number: 5,
        name: { es: "El Hierofante", en: "The Hierophant" },
        element: { es: "Tierra", en: "Earth" },
        keywords: {
            es: ["Tradición", "Conformidad", "Espiritualidad", "Educación"],
            en: ["Tradition", "Conformity", "Spirituality", "Education"]
        },
        meaning: {
            es: "El Hierofante representa el conocimiento estructurado y las tradiciones sagradas. Te conecta con la sabiduría de los maestros.",
            en: "The Hierophant represents structured knowledge and sacred traditions. It connects you with the wisdom of teachers."
        },
        advice: {
            es: "Busca consejo en mentores o tradiciones probadas.",
            en: "Seek advice from mentors or proven traditions."
        },
        dailyAction: {
            es: "Lee algo que te inspire profundamente o asiste a una charla educativa.",
            en: "Read something that deeply inspires you or attend an educational talk."
        },
        image: "https://images.unsplash.com/photo-1534008841484-9510398bdc6d?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "the-lovers",
        number: 6,
        name: { es: "Los Enamorados", en: "The Lovers" },
        element: { es: "Aire", en: "Air" },
        keywords: {
            es: ["Amor", "Armonía", "Relaciones", "Elecciones"],
            en: ["Love", "Harmony", "Relationships", "Choices"]
        },
        meaning: {
            es: "Los Enamorados simbolizan la unión y la alineación de valores. También representan una encrucijada importante.",
            en: "The Lovers symbolize union and the alignment of values. They also represent an important crossroads."
        },
        advice: {
            es: "Elige desde el corazón. Busca la armonía en tus vínculos.",
            en: "Choose from the heart. Seek harmony in your bonds."
        },
        dailyAction: {
            es: "Expresa tu aprecio a alguien que ames.",
            en: "Express your appreciation to someone you love."
        },
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "the-chariot",
        number: 7,
        name: { es: "El Carro", en: "The Chariot" },
        element: { es: "Agua", en: "Water" },
        keywords: {
            es: ["Control", "Victoria", "Determinación", "Fuerza de voluntad"],
            en: ["Control", "Victory", "Determination", "Willpower"]
        },
        meaning: {
            es: "El Carro representa el éxito a través del enfoque y el autocontrol. Es la victoria sobre las influencias opuestas.",
            en: "The Chariot represents success through focus and self-control. It is victory over opposing influences."
        },
        advice: {
            es: "Mantén tu dirección a pesar de los obstáculos. Toma las riendas de tu destino.",
            en: "Maintain your direction despite obstacles. Take the reins of your destiny."
        },
        dailyAction: {
            es: "Identifica una distracción y elimínala hoy.",
            en: "Identify a distraction and eliminate it today."
        },
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "strength",
        number: 8,
        name: { es: "La Fuerza", en: "Strength" },
        element: { es: "Fuego", en: "Fire" },
        keywords: {
            es: ["Coraje", "Compasión", "Influencia suave", "Poder interior"],
            en: ["Courage", "Compassion", "Soft influence", "Inner power"]
        },
        meaning: {
            es: "La Fuerza no es músculo, es espíritu. Representa la capacidad de domar tus instintos más bajos con amor y paciencia.",
            en: "Strength is not muscle, it is spirit. It represents the ability to tame your lower instincts with love and patience."
        },
        advice: {
            es: "Sé gentil contigo mismo y con los demás. La paciencia es tu mayor poder.",
            en: "Be gentle with yourself and others. Patience is your greatest power."
        },
        dailyAction: {
            es: "Enfréntate a una situación difícil con calma y sin agresividad.",
            en: "Face a difficult situation calmly and without aggression."
        },
        image: "https://images.unsplash.com/photo-1516026672322-bc5201974917?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "the-hermit",
        number: 9,
        name: { es: "El Ermitaño", en: "The Hermit" },
        element: { es: "Tierra", en: "Earth" },
        keywords: {
            es: ["Soledad", "Busqueda de la verdad", "Sabiduría interior", "Introspección"],
            en: ["Solitude", "Search for truth", "Inner wisdom", "Introspection"]
        },
        meaning: {
            es: "El Ermitaño te llama a retirarte del ruido del mundo para encontrar tu propia luz. Es el camino del buscador solitario.",
            en: "The Hermit calls you to withdraw from the noise of the world to find your own light. It is the path of the lonely seeker."
        },
        advice: {
            es: "Pasa tiempo a solas. La verdad que buscas está dentro de ti.",
            en: "Spend time alone. The truth you seek is within you."
        },
        dailyAction: {
            es: "Apaga tu teléfono por una hora y reflexiona en silencio.",
            en: "Turn off your phone for an hour and reflect in silence."
        },
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "wheel-of-fortune",
        number: 10,
        name: { es: "La Rueda de la Fortuna", en: "Wheel of Fortune" },
        element: { es: "Fuego", en: "Fire" },
        keywords: {
            es: ["Cambio", "Destino", "Punto de inflexión", "Ciclos"],
            en: ["Change", "Destiny", "Turning point", "Cycles"]
        },
        meaning: {
            es: "La Rueda nos recuerda que todo cambia. Representa los ciclos de la vida y la suerte que gira a tu favor.",
            en: "The Wheel reminds us that everything changes. It represents the cycles of life and luck turning in your favor."
        },
        advice: {
            es: "Acepta el cambio. Lo que está sucediendo es parte de un plan mayor.",
            en: "Accept change. What is happening is part of a larger plan."
        },
        dailyAction: {
            es: "Identifica un ciclo repetitivo en tu vida y decide cómo romperlo.",
            en: "Identify a repetitive cycle in your life and decide how to break it."
        },
        image: "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "justice",
        number: 11,
        name: { es: "La Justicia", en: "Justice" },
        element: { es: "Aire", en: "Air" },
        keywords: {
            es: ["Equilibrio", "Verdad", "Causa y efecto", "Claridad"],
            en: ["Balance", "Truth", "Cause and effect", "Clarity"]
        },
        meaning: {
            es: "La Justicia representa la verdad objetiva y la responsabilidad por nuestras acciones. Es el equilibrio kármico.",
            en: "Justice represents objective truth and responsibility for our actions. It is karmic balance."
        },
        advice: {
            es: "Sé honesto contigo mismo. Busca la imparcialidad en tus decisiones.",
            en: "Be honest with yourself. Seek impartiality in your decisions."
        },
        dailyAction: {
            es: "Analiza una situación desde un punto de vista neutral antes de juzgar.",
            en: "Analyze a situation from a neutral point of view before judging."
        },
        image: "https://images.unsplash.com/photo-1589216532372-1c2a05f906b4?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "the-hanged-man",
        number: 12,
        name: { es: "El Colgado", en: "The Hanged Man" },
        element: { es: "Agua", en: "Water" },
        keywords: {
            es: ["Perspectiva", "Sacrificio", "Pausa", "Soltar"],
            en: ["Perspective", "Sacrifice", "Pause", "Letting go"]
        },
        meaning: {
            es: "El Colgado nos enseña el valor de la pausa activa y de ver el mundo desde un ángulo diferente.",
            en: "The Hanged Man teaches us the value of active pausing and of seeing the world from a different angle."
        },
        advice: {
            es: "No fuerces las cosas. A veces, la inacción es la mejor acción.",
            en: "Don't force things. Sometimes, inaction is the best action."
        },
        dailyAction: {
            es: "Mira un problema desde la perspectiva de otra persona.",
            en: "Look at a problem from someone else's perspective."
        },
        image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "death",
        number: 13,
        name: { es: "La Muerte", en: "Death" },
        element: { es: "Agua", en: "Water" },
        keywords: {
            es: ["Finales", "Transformación", "Transición", "Eliminación"],
            en: ["Endings", "Transformation", "Transition", "Elimination"]
        },
        meaning: {
            es: "La Muerte no es el fin físico, sino el fin de una etapa. Es necesaria para que algo nuevo pueda nacer.",
            en: "Death is not the physical end, but the end of a stage. It is necessary for something new to be born."
        },
        advice: {
            es: "Deja ir lo que ya no te sirve. No temas a los finales.",
            en: "Let go of what no longer serves you. Don't fear endings."
        },
        dailyAction: {
            es: "Limpia algo que hayas estado acumulando sin necesidad.",
            en: "Clean up something you have been accumulating unnecessarily."
        },
        image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "temperance",
        number: 14,
        name: { es: "La Templanza", en: "Temperance" },
        element: { es: "Fuego", en: "Fire" },
        keywords: {
            es: ["Moderación", "Paciencia", "Alquimia", "Equilibrio"],
            en: ["Moderation", "Patience", "Alchemy", "Balance"]
        },
        meaning: {
            es: "La Templanza simboliza la mezcla de opuestos para crear armonía. Representa la salud y la sanación.",
            en: "Temperance symbolizes the mixing of opposites to create harmony. It represents health and healing."
        },
        advice: {
            es: "Busca el camino del medio. Evita los extremos hoy.",
            en: "Seek the middle path. Avoid extremes today."
        },
        dailyAction: {
            es: "Bebe mucha agua y busca un momento de calma zen.",
            en: "Drink plenty of water and seek a moment of Zen calm."
        },
        image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "the-devil",
        number: 15,
        name: { es: "El Diablo", en: "The Devil" },
        element: { es: "Tierra", en: "Earth" },
        keywords: {
            es: ["Adicción", "Materialismo", "Atadura", "Sombra"],
            en: ["Addiction", "Materialism", "Bondage", "Shadow"]
        },
        meaning: {
            es: "El Diablo representa nuestras sombras y las cadenas ilusorias que nosotros mismos creamos.",
            en: "The Devil represents our shadows and the illusory chains that we ourselves create."
        },
        advice: {
            es: "Reconoce tus patrones negativos. Tienes el poder de liberarte.",
            en: "Recognize your negative patterns. You have the power to free yourself."
        },
        dailyAction: {
            es: "Identifica un habituo que te controle y da un paso para limitarlo.",
            en: "Identify a habit that controls you and take a step to limit it."
        },
        image: "https://images.unsplash.com/photo-1518709766631-a6a7f4593b3e?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "the-tower",
        number: 16,
        name: { es: "La Torre", en: "The Tower" },
        element: { es: "Fuego", en: "Fire" },
        keywords: {
            es: ["Caída", "Revelación", "Caos", "Libertad repentina"],
            en: ["Fall", "Revelation", "Chaos", "Sudden freedom"]
        },
        meaning: {
            es: "La Torre simboliza la destrucción de estructuras falsas. Aunque es dolorosa, permite construir sobre la verdad.",
            en: "The Tower symbolizes the destruction of false structures. Although painful, it allows for building on truth."
        },
        advice: {
            es: "No intentes aferrarte a lo que se derrumba. Deja que la verdad te libere.",
            en: "Don't try to hold on to what is collapsing. Let the truth set you free."
        },
        dailyAction: {
            es: "Cuestiona una creencia que ya no resuene con quién eres hoy.",
            en: "Question a belief that no longer resonates with who you are today."
        },
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "the-star",
        number: 17,
        name: { es: "La Estrella", en: "The Star" },
        element: { es: "Aire", en: "Air" },
        keywords: {
            es: ["Esperanza", "Fe", "Inspiración", "Renovación"],
            en: ["Hope", "Faith", "Inspiration", "Renewal"]
        },
        meaning: {
            es: "La Estrella es la luz al final del túnel. Representa la conexión espiritual y la paz profunda.",
            en: "The Star is the light at the end of the tunnel. It represents spiritual connection and deep peace."
        },
        advice: {
            es: "Confía en que el universo te guía. El futuro es brillante.",
            en: "Trust that the universe guides you. The future is bright."
        },
        dailyAction: {
            es: "Mira las estrellas o visualiza tu deseo más puro antes de dormir.",
            en: "Look at the stars or visualize your purest desire before sleeping."
        },
        image: "https://images.unsplash.com/photo-1464802686167-b939a67e06a1?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "the-moon",
        number: 18,
        name: { es: "La Luna", en: "The Moon" },
        element: { es: "Agua", en: "Water" },
        keywords: {
            es: ["Miedo", "Ilusión", "Ansiedad", "Inconsciente"],
            en: ["Fear", "Illusion", "Anxiety", "Unconscious"]
        },
        meaning: {
            es: "La Luna representa el terreno pantanoso del miedo y lo desconocido. Te reta a caminar a través de la sombra.",
            en: "The Moon represents the swampy ground of fear and the unknown. It challenges you to walk through the shadow."
        },
        advice: {
            es: "No todo es lo que parece. Confía en tu instinto más que en tus ojos.",
            en: "Not everything is as it seems. Trust your instinct more than your eyes."
        },
        dailyAction: {
            es: "Escribe tus sueños o tus miedos para traerlos a la luz.",
            en: "Write down your dreams or your fears to bring them to light."
        },
        image: "https://images.unsplash.com/photo-1505506005804-24a243df8ce0?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "the-sun",
        number: 19,
        name: { es: "El Sol", en: "The Sun" },
        element: { es: "Fuego", en: "Fire" },
        keywords: {
            es: ["Alegría", "Éxito", "Vitalidad", "Positividad"],
            en: ["Joy", "Success", "Vitality", "Positivity"]
        },
        meaning: {
            es: "El Sol es la carta más positiva. Simboliza la alegría pura, el éxito externo y la claridad absoluta.",
            en: "The Sun is the most positive card. It symbolizes pure joy, external success, and absolute clarity."
        },
        advice: {
            es: "Celebra tus logros. Brilla con toda tu intensidad hoy.",
            en: "Celebrate your achievements. Shine with all your intensity today."
        },
        dailyAction: {
            es: "Pasa al menos 15 minutos bajo el sol o haz algo que te haga reír.",
            en: "Spend at least 15 minutes in the sun or do something that makes you laugh."
        },
        image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "judgement",
        number: 20,
        name: { es: "El Juicio", en: "Judgement" },
        element: { es: "Fuego", en: "Fire" },
        keywords: {
            es: ["Llamado", "Renacimiento", "Absolución", "Despertar"],
            en: ["Calling", "Rebirth", "Absolution", "Awakening"]
        },
        meaning: {
            es: "El Juicio representa el despertar a un propósito superior. Es el momento de dejar atrás el pasado para renacer.",
            en: "Judgement represents awakening to a higher purpose. It is the time to leave the past behind to be reborn."
        },
        advice: {
            es: "Escucha tu llamado interior. Es tiempo de una transformación profunda.",
            en: "Listen to your inner calling. It's time for a profound transformation."
        },
        dailyAction: {
            es: "Perdónate por un error del pasado y sigue adelante.",
            en: "Forgive yourself for a mistake from the past and move on."
        },
        image: "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "the-world",
        number: 21,
        name: { es: "El Mundo", en: "The World" },
        element: { es: "Eter", en: "Ether" },
        keywords: {
            es: ["Finalización", "Integración", "Logro", "Viaje"],
            en: ["Completion", "Integration", "Achievement", "Travel"]
        },
        meaning: {
            es: "El Mundo simboliza el cierre perfecto de un ciclo y la realización total. Todo está en su lugar.",
            en: "The World symbolizes the perfect closing of a cycle and total realization. Everything is in its place."
        },
        advice: {
            es: "Disfruta de tu éxito. Te has convertido en una versión más completa de ti mismo.",
            en: "Enjoy your success. You have become a more complete version of yourself."
        },
        dailyAction: {
            es: "Tómate un descanso para celebrar un ciclo que has terminado recientemente.",
            en: "Take a break to celebrate a cycle you have recently finished."
        },
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
    }
];
