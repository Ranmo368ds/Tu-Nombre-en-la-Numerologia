export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image: string;
    rating: number;
    features: string[];
    demoUrl?: string;
}

export const PRODUCTS: Product[] = [
    {
        id: "oil-lavender",
        name: "Aceite Esencial Lavanda Pura",
        description: "Nuestro aceite esencial de lavanda es 100% puro y orgánico. Conocido por sus propiedades relajantes, es ideal para aliviar el estrés, mejorar el sueño y calmar la piel irritada.",
        category: "oils",
        price: 28.50,
        image: "/Instinto Saludable/Aceites/3575_Lavender_PDP_0925_1a.jpg",
        rating: 4.9,
        features: ["100% Orgánico", "Grado Terapéutico", "Calmante y Relajante", "15ml"]
    },
    {
        id: "crystal-citrine",
        name: "Cuarzo Citrino Natural",
        description: "El citrino es la piedra de la abundancia y la manifestación. Ayuda a atraer prosperidad, éxito y todas las cosas buenas. También estimula la creatividad y la confianza personal.",
        category: "crystals",
        price: 22.00,
        image: "/Instinto Saludable/Citrine Quartz.jpg",
        rating: 4.8,
        features: ["Piedra de Abundancia", "Energía Solar", "Limpieza no necesaria", "Origen: Brasil"]
    },
    {
        id: "ebook-tarot",
        name: "Guía de Tarot y Numerología",
        description: "Un manual completo para iniciarte en las artes místicas. Aprende a leer el tarot y combínalo con la sabiduría de los números para obtener lecturas profundas y transformadoras.",
        category: "ebooks",
        price: 15.00,
        image: "/Instinto Saludable/Tarot Para Principiantes.png",
        rating: 5.0,
        features: ["Formato PDF", "Para Principiantes", "Simbología Completa", "Descarga Inmediata"]
    },
    {
        id: "oil-thieves",
        name: "Aceite Esencial Thieves",
        description: "La legendaria mezcla Thieves combina clavo, limón, canela, eucalipto y romero. Famosa por sus propiedades de apoyo inmunológico y limpieza purificadora.",
        category: "oils",
        price: 35.00,
        image: "/Instinto Saludable/Aceites/Thieves_15ml_US_Website_2021.png",
        rating: 5.0,
        features: ["Mezcla Protectora", "Apoyo Inmunológico", "Aroma Especiado", "15ml"]
    },
    {
        id: "music-confio",
        name: "Confío en Mí",
        description: "Música pop inspiradora de los 2000's diseñada para fortalecer tu autoestima y confianza personal. Perfecta para comenzar el día con energía positiva.",
        category: "music",
        price: 9.99,
        image: "/Instinto Saludable/Vibra Holística.jpg",
        rating: 4.8,
        demoUrl: "/Instinto Saludable/Music/03 Confio en Mí (Pop 2000's).mp3",
        features: ["Pop 2000's", "Mensaje Positivo", "Alta Calidad", "Energía Motivacional"]
    },
    {
        id: "music-luz",
        name: "Hoy Nace Mi Luz",
        description: "Estilo Mercurio con vibraciones elevadas. Una canción que celebra el renacimiento personal y la luz interior que todos llevamos dentro.",
        category: "music",
        price: 9.99,
        image: "/Instinto Saludable/Vibra Holística.jpg",
        rating: 5.0,
        demoUrl: "/Instinto Saludable/Music/05 \"Hoy Nace Mi Luz\" Lizbeth Yolanda  (Mercurio Style).mp3",
        features: ["Mercurio Style", "Transformación", "Vocal Poderoso", "Inspiracional"]
    },
    {
        id: "music-believe",
        name: "I Believe in Me",
        description: "Pop de los 90's con un mensaje universal de auto-creencia. Melodías pegajosas que te recordarán tu propio poder interior.",
        category: "music",
        price: 9.99,
        image: "/Instinto Saludable/Vibra Holística.jpg",
        rating: 4.7,
        demoUrl: "/Instinto Saludable/Music/08 I Believe in Me (FNBPop 90's).mp3",
        features: ["Pop 90's", "English", "Uplifting", "Retro Vibes"]
    },
    {
        id: "music-nunca-sola",
        name: "Nunca Estoy Sola",
        description: "Pop contemporáneo que te recuerda que nunca estás solo/a. El universo siempre te acompaña en tu camino.",
        category: "music",
        price: 9.99,
        image: "/Instinto Saludable/Vibra Holística.jpg",
        rating: 4.9,
        demoUrl: "/Instinto Saludable/Music/11 Nunca Estoy Sola (CHAK Pop 2000's).mp3",
        features: ["Pop 2000's", "Mensaje Espiritual", "Empoderamiento", "Conexión Universal"]
    },
    {
        id: "music-espresso",
        name: "Espresso Afterglow",
        description: "Bossa Nova Café - La banda sonora perfecta para tu café matutino. Ritmos suaves que crean el ambiente ideal para comenzar el día.",
        category: "music",
        price: 8.88,
        image: "/Instinto Saludable/Vibra Holística.jpg",
        rating: 4.6,
        demoUrl: "/Instinto Saludable/Music/01 Espresso Afterglow (Bossa Nova Café).mp3",
        features: ["Bossa Nova", "Café Music", "Relajante", "Ambiente Sofisticado"]
    },
    {
        id: "music-om-432",
        name: "432Hz Calm OM",
        description: "Mantras sanadores en la frecuencia de 432Hz, conocida como la frecuencia del universo. Ideal para meditación profunda y sanación energética.",
        category: "music",
        price: 12.22,
        image: "/Instinto Saludable/Vibra Holística.jpg",
        rating: 5.0,
        demoUrl: "/Instinto Saludable/Music/432Hz calm OM 1 (Mantras Sanadores).mp3",
        features: ["432Hz", "Mantras", "Sanación", "Meditación Profunda"]
    },
    {
        id: "music-prosperity",
        name: "520 Prosperity Flow",
        description: "Música basada en los códigos Grabovoi 520 para atraer prosperidad y abundancia. Frecuencias diseñadas para manifestación.",
        category: "music",
        price: 13.33,
        image: "/Instinto Saludable/Vibra Holística.jpg",
        rating: 4.9,
        demoUrl: "/Instinto Saludable/Music/520 Prosperity Flow (Grabovoi 520) (1).mp3",
        features: ["Grabovoi 520", "Prosperidad", "Manifestación", "Códigos Numéricos"]
    },
    {
        id: "music-flamenco",
        name: "Flamenco Anda",
        description: "Flamenco intenso que despierta la pasión y el fuego interior. Ritmos vibrantes que conectan con tu esencia más auténtica.",
        category: "music",
        price: 10.00,
        image: "/Instinto Saludable/Vibra Holística.jpg",
        rating: 4.8,
        demoUrl: "/Instinto Saludable/Music/Flamenco Anda (Flamenco Intenso).mp3",
        features: ["Flamenco", "Pasión", "Energía Vital", "Auténtico"]
    },
    {
        id: "music-reiki",
        name: "Reiki Chakra Balance",
        description: "Música de Reiki diseñada para equilibrar y armonizar tus 7 chakras. Perfecta para sesiones de sanación energética.",
        category: "music",
        price: 11.11,
        image: "/Instinto Saludable/Vibra Holística.jpg",
        rating: 5.0,
        demoUrl: "/Instinto Saludable/Music/Reiki chakra balance 2 (Reiki Healing).mp3",
        features: ["Reiki", "Chakras", "Sanación Energética", "Balance"]
    },
    {
        id: "music-shamanic",
        name: "Shamanic Night Ceremony",
        description: "Ceremonia chamánica nocturna. Tambores y sonidos ancestrales que te conectan con la sabiduría antigua y el poder de la tierra.",
        category: "music",
        price: 12.00,
        image: "/Instinto Saludable/Vibra Holística.jpg",
        rating: 4.9,
        demoUrl: "/Instinto Saludable/Music/Shamanic night ceremony 11 (Shamanic).mp3",
        features: ["Chamánico", "Tambores", "Ceremonial", "Conexión Ancestral"]
    },
    {
        id: "music-tibetan",
        name: "Tibetan Healing Bowls",
        description: "Cuencos tibetanos para sanación profunda. Vibraciones que limpian y purifican tu campo energético.",
        category: "music",
        price: 11.11,
        image: "/Instinto Saludable/Vibra Holística.jpg",
        rating: 5.0,
        demoUrl: "/Instinto Saludable/Music/Tibetan.mp3",
        features: ["Cuencos Tibetanos", "Sanación", "Purificación", "Vibraciones Sagradas"]
    },
    {
        id: "music-todo-posible",
        name: "Todo es Posible",
        description: "Códigos Grabovoi para manifestación. Música que activa la creencia de que todo es posible en tu vida.",
        category: "music",
        price: 13.33,
        image: "/Instinto Saludable/Vibra Holística.jpg",
        rating: 4.9,
        demoUrl: "/Instinto Saludable/Music/Todo es Posible 1 (Grabovoi G1G1=K1i G1 π).mp3",
        features: ["Grabovoi", "Manifestación", "Posibilidades Infinitas", "Códigos Sagrados"]
    },
    {
        id: "music-zen",
        name: "Zen Relaxing Vol. 1",
        description: "Colección completa de música Zen para relajación profunda. Más de 1 hora de sonidos que te transportan a un estado de paz absoluta.",
        category: "music",
        price: 15.55,
        image: "/Instinto Saludable/Vibra Holística.jpg",
        rating: 5.0,
        demoUrl: "/Instinto Saludable/Music/Zen Relaxing Vol. 1.MP3",
        features: ["Zen", "Relajación", "Colección Completa", "1+ Hora"]
    },
    {
        id: "music-handpan",
        name: "Gentle Spirit Awakening",
        description: "Handpan etéreo que despierta tu espíritu gentil. Sonidos celestiales que elevan tu consciencia a nuevas dimensiones.",
        category: "music",
        price: 10.00,
        image: "/Instinto Saludable/Vibra Holística.jpg",
        rating: 4.8,
        demoUrl: "/Instinto Saludable/Music/_Gentle Spirit Awakening (Handpan).mp3",
        features: ["Handpan", "Etéreo", "Despertar Espiritual", "Celestial"]
    },
    {
        id: "crystal-quartz",
        name: "Punta de Cuarzo Cristal",
        description: "El 'Maestro Sanador'. El cuarzo cristal amplifica la energía y el pensamiento, así como el efecto de otros cristales. Absorbe, almacena, libera y regula la energía.",
        category: "crystals",
        price: 25.00,
        image: "/Instinto Saludable/Crystal Quartz 2.jpg",
        rating: 4.9,
        features: ["Amplificador de Energía", "Claridad Mental", "Sanación Universal", "Punta Natural"]
    },
    {
        id: "ebook-reset",
        name: "Programa Reset 14 Días",
        description: "Transforma tu salud y hábitos en solo dos semanas. Este programa incluye guías de alimentación, ejercicios de mindfulness y rutinas de desintoxicación.",
        category: "ebooks",
        price: 19.99,
        image: "/Instinto Saludable/eBooks/ESPANOL RESET EN 14 DIAS.png",
        rating: 4.8,
        features: ["Plan de 14 Días", "Recetas Incluidas", "Guía Paso a Paso", "Holístico"]
    },
    {
        id: "ebook-detox",
        name: "Detox Digital: Desintoxicación Mental",
        description: "Aprende a liberarte de la sobrecarga digital y recupera tu paz mental. Técnicas prácticas para desconectar y reconectar con lo esencial.",
        category: "ebooks",
        price: 14.99,
        image: "/Instinto Saludable/eBooks/Detox-Digital-Book-Cover.png",
        rating: 4.7,
        features: ["Formato PDF", "Ejercicios Prácticos", "Guía de 21 Días", "Descarga Inmediata"]
    },
    {
        id: "ebook-constelacion",
        name: "Constelación Familiar: Sanación Ancestral",
        description: "Descubre cómo las dinámicas familiares afectan tu vida actual. Una guía completa para entender y sanar patrones heredados.",
        category: "ebooks",
        price: 17.99,
        image: "/Instinto Saludable/eBooks/SPANISH---CONSTELACION-FAMILIAR-COVER.png",
        rating: 5.0,
        features: ["Teoría y Práctica", "Casos Reales", "Ejercicios de Sanación", "Formato PDF"]
    },
    {
        id: "holistic-blender",
        name: "Blender de Alta Potencia",
        description: "El compañero perfecto para tus smoothies y jugos verdes. Potente motor de 1200W para triturar cualquier ingrediente.",
        category: "holistic",
        price: 89.99,
        image: "/Instinto Saludable/blender.jpg",
        rating: 4.8,
        features: ["1200W de Potencia", "Libre de BPA", "Cuchillas de Acero", "Fácil Limpieza"]
    },
    {
        id: "holistic-salad-bowl",
        name: "Bowl de Ensalada Premium",
        description: "Bowl artesanal de madera de bambú, perfecto para tus ensaladas saludables. Diseño elegante y sostenible.",
        category: "holistic",
        price: 24.99,
        image: "/Instinto Saludable/salad bowl.jpg",
        rating: 4.6,
        features: ["Bambú Sostenible", "Hecho a Mano", "Apto para Lavavajillas", "Tamaño Ideal"]
    },
    {
        id: "holistic-utensils",
        name: "Set de Utensilios de Cocina",
        description: "Set completo de utensilios de cocina en acero inoxidable y madera. Todo lo que necesitas para preparar comidas saludables.",
        category: "holistic",
        price: 45.00,
        image: "/Instinto Saludable/utensils set.jpg",
        rating: 4.9,
        features: ["Acero Inoxidable", "Mangos de Madera", "Set de 6 Piezas", "Resistente"]
    },
    {
        id: "oil-abundance",
        name: "Aceite Abundance",
        description: "Una mezcla aromática creada para mejorar la frecuencia del campo magnético armónico que nos rodea. Fomenta sentimientos de prosperidad y plenitud.",
        category: "oils",
        price: 42.00,
        image: "/Instinto Saludable/Aceites/Abundance_PDP_2.jpg",
        rating: 5.0,
        features: ["Atracción", "Manifestación", "Aroma Rico y Especiado", "15ml"]
    },
    {
        id: "merch-mug",
        name: "Taza Oficial Radio Unica",
        description: "Disfruta tus mañanas con la taza oficial de Radio Unica. Diseño minimalista y elegante, perfecta para café o té mientras escuchas tu programación favorita.",
        category: "merch",
        price: 15.00,
        image: "/product-mug.jpg",
        rating: 4.8,
        features: ["Cerámica de alta calidad", "Apta para lavavajillas", "Diseño exclusivo", "11oz"]
    },
    {
        id: "merch-cap",
        name: "Gorra Oficial Radio Unica",
        description: "Lleva el estilo de Radio Unica contigo. Gorra bordada de alta calidad, ajustable y cómoda para el día a día.",
        category: "merch",
        price: 25.00,
        image: "/product-cap.jpg",
        rating: 4.9,
        features: ["Bordado 3D", "Tamaño ajustable", "Algodón premium", "Unisex"]
    },
    {
        id: "merch-hoodie",
        name: "Sudadera (Hoodie) Oficial",
        description: "Nuestra sudadera más vendida. Suave, cálida y con el logo de Radio Unica. Ideal para relajarte en casa o salir con estilo.",
        category: "merch",
        price: 45.00,
        image: "/product-hoodie.jpg",
        rating: 5.0,
        features: ["Interior suave", "Bolsillo canguro", "Algodón/Poliéster", "Duradera"]
    },
    {
        id: "merch-tshirt",
        name: "T-Shirt Clásica",
        description: "La camiseta esencial para los fans de Radio Unica. Algodón suave y corte moderno.",
        category: "merch",
        price: 20.00,
        image: "/product-tshirt.jpg",
        rating: 4.7,
        features: ["100% Algodón", "Estampado duradero", "Corte cómodo", "Varias tallas"]
    },
    {
        id: "merch-crewneck",
        name: "Crewneck Clásico",
        description: "Estilo retro y comodidad moderna. Este suéter de cuello redondo es un básico versátil para cualquier guardarropa.",
        category: "merch",
        price: 40.00,
        image: "/product-crewneck.jpg",
        rating: 4.8,
        features: ["Tejido premium", "Cuello reforzado", "Ajuste relajado", "Unisex"]
    }
];
