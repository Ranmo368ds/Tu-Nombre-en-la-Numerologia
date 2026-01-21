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
        id: "oil-angelica",
        name: "Aceite Esencial Angélica",
        description: "El aceite esencial de Angélica tiene un aroma terroso y herbáceo que ayuda a crear una atmósfera tranquila.",
        category: "oils",
        price: 54.00,
        image: "https://images.ctfassets.net/x0wnv07j8mtt/skuPrimaryImage3078/35a9b7c87a242e43d3c1d1c3466f8be9/3078.png?q=75&fm=jpg&w=1080&h=1080",
        rating: 4.8,
        features: ["15 ml", "Aroma terroso", "Atmósfera tranquila"]
    },
    {
        id: "oil-dorado-azul",
        name: "Aceite Esencial Dorado Azul",
        description: "Exclusivo de Young Living, el Dorado Azul tiene un aroma fresco y herbáceo que apoya los sistemas respiratorios.",
        category: "oils",
        price: 41.50,
        image: "https://images.ctfassets.net/x0wnv07j8mtt/skuPrimaryImage3598/b4a604d70ed315227d1c2fbda60b9d5b/DoradoAzul_5ml_US_Website_2021.png?q=75&fm=jpg&w=1080&h=1080",
        rating: 4.9,
        features: ["5 ml", "Exclusivo YL", "Apoyo respiratorio"]
    },
    {
        id: "oil-elemi",
        name: "Aceite Esencial Elemí (Elemi)",
        description: "De la misma familia que el incienso, se utiliza para mejorar la apariencia de la piel.",
        category: "oils",
        price: 24.75,
        image: "https://images.ctfassets.net/x0wnv07j8mtt/skuPrimaryImage3540/18da15f10b05c58095c332087e61770a/Elemi_15ml_US_Website_2021.png?q=75&fm=jpg&w=1080&h=1080",
        rating: 4.7,
        features: ["15 ml", "Cuidado de la piel", "Familia del Incienso"]
    },
    {
        id: "oil-eucalyptus-globulus",
        name: "Aceite Esencial Eucalipto Globulus",
        description: "Contiene eucaliptol para una experiencia respiratoria refrescante y sensación vigorizante.",
        category: "oils",
        price: 17.00,
        image: "https://images.ctfassets.net/x0wnv07j8mtt/skuPrimaryImage3539/18b569b7bf07af4f2c4cdca3d2ac4473/EucalyptusGlobulus_15ml_US_Website_2021.png?q=75&fm=jpg&w=1080&h=1080",
        rating: 4.9,
        features: ["15 ml", "Refrescante", "Vigorizante"]
    },
    {
        id: "oil-hong-kuai",
        name: "Aceite Esencial Hong Kuai",
        description: "Inspira claridad y conciencia espiritual con su aroma equilibrado a hojas perennes.",
        category: "oils",
        price: 64.75,
        image: "https://images.ctfassets.net/x0wnv07j8mtt/skuPrimaryImage4657/54ada8139d813840f34102f2315dcf4a/HongKuai_5ml_US_Website_2021.png?q=75&fm=jpg&w=1080&h=1080",
        rating: 5.0,
        features: ["5 ml", "Claridad mental", "Aroma amaderado"]
    },
    {
        id: "oil-manuka",
        name: "Aceite Esencial Manuka",
        description: "Aroma dulce y suave que invita a la calma y apoya la apariencia de la piel.",
        category: "oils",
        price: 42.25,
        image: "https://images.ctfassets.net/x0wnv07j8mtt/skuPrimaryImage5322/c94410aac6ed78ba53736632f9035634/Manuka_5ml_US_Website_2021.png?q=75&fm=jpg&w=1080&h=1080",
        rating: 4.8,
        features: ["5 ml", "Calma", "Apoyo cutáneo"]
    },
    {
        id: "oil-blue-spruce-idaho",
        name: "Aceite Esencial Pícea Azul de Idaho",
        description: "Aroma refrescante que ayuda a relajar los músculos tensos y calma el espíritu.",
        category: "oils",
        price: 34.00,
        image: "https://images.ctfassets.net/x0wnv07j8mtt/skuPrimaryImage3093/61f651c13db0fe04728f1053086d97b0/3093.png?q=75&fm=jpg&w=1080&h=1080",
        rating: 4.9,
        features: ["5 ml", "Relajante", "Aroma a bosque"]
    },
    {
        id: "oil-black-spruce-nl",
        name: "Aceite Esencial Pícea Negra (Northern Lights)",
        description: "Proveniente de nuestra granja en Canadá, ofrece un aroma terroso y envolvente.",
        category: "oils",
        price: 28.00,
        image: "https://images.ctfassets.net/x0wnv07j8mtt/skuPrimaryImage5313/3cc16ea436c488954dc20428a6833aa4/5313.png?q=75&fm=jpg&w=1080&h=1080",
        rating: 4.9,
        features: ["15 ml", "Equilibrante", "Directo de granja"]
    },
    {
        id: "oil-sandalwood-hawaiian",
        name: "Aceite Esencial Royal Hawaiian Sandalwood",
        description: "Aroma rico y amaderado que proporciona una sensación de paz y bienestar profundo.",
        category: "oils",
        price: 112.00,
        image: "https://images.ctfassets.net/x0wnv07j8mtt/skuPrimaryImage4746/03c2ffa01896f813c38f4e0f33180543/RoyalHawaiianSandalwood_5ml_US_Website_2021.png?q=75&fm=jpg&w=1080&h=1080",
        rating: 5.0,
        features: ["5 ml", "Premium", "Paz interior"]
    },
    {
        id: "oil-frankincense-sacred",
        name: "Aceite Esencial Sacred Frankincense",
        description: "Ideal para la meditación y conexión espiritual, con un aroma cálido y balsámico.",
        category: "oils",
        price: 49.75,
        image: "https://images.ctfassets.net/x0wnv07j8mtt/skuPrimaryImage3550/d91806c22a6ef9d762cb06302fa6b594/SacredFrankincense_5ml_US_Website_2021.png?q=75&fm=jpg&w=1080&h=1080",
        rating: 5.0,
        features: ["5 ml", "Espiritual", "Meditación"]
    },
    {
        id: "oil-sandalwood-sacred",
        name: "Aceite Esencial Sacred Sandalwood",
        description: "Un aroma clásico y terroso que ayuda a conectar con el ser interior.",
        category: "oils",
        price: 114.00,
        image: "https://images.ctfassets.net/x0wnv07j8mtt/skuPrimaryImage19651/8e04771a5c00fc6dec795f96a221171e/SacredSandalwood_5ml_US_Website_2021.png?q=75&fm=jpg&w=1080&h=1080",
        rating: 4.9,
        features: ["5 ml", "Aroma Clásico", "Conexión"]
    },
    {
        id: "oil-ledum",
        name: "Aceite Esencial Té de Labrador (Ledum)",
        description: "Aroma herbáceo distintivo, utilizado tradicionalmente por sus propiedades purificantes.",
        category: "oils",
        price: 73.75,
        image: "https://images.ctfassets.net/x0wnv07j8mtt/u1Uli7ZzIxSYx5EfoBGrg/6b8223433cada7230ea1383025e5fafb/Ledum_5ml_US_Website_2021.png?q=75&fm=jpg&w=1080&h=1080",
        rating: 4.8,
        features: ["5 ml", "Purificante", "Rareza"]
    },
    {
        id: "oil-wintergreen",
        name: "Aceite Esencial Wintergreen",
        description: "Aroma refrescante y mentolado, ideal para masajes después del ejercicio.",
        category: "oils",
        price: 21.00,
        image: "https://images.ctfassets.net/x0wnv07j8mtt/skuPrimaryImage3658/d4f3b760c0677b202887ef1d39a9e5c5/Wintergreen_15ml_US_Website_2021.png?q=75&fm=jpg&w=1080&h=1080",
        rating: 4.7,
        features: ["15 ml", "Mentolado", "Post-entrenamiento"]
    },
    {
        id: "oil-basil",
        name: "Aceite Esencial de Albahaca (Basil)",
        description: "Aroma fresco y estimulante que ayuda a la concentración y vitalidad.",
        category: "oils",
        price: 29.25,
        image: "https://images.ctfassets.net/x0wnv07j8mtt/skuPrimaryImage3500/7446f1a72eebf73fcb778f5dfe92ba95/Basil_15ml_US_Website_2021.png?q=75&fm=jpg&w=1080&h=1080",
        rating: 4.8,
        features: ["15 ml", "Concentración", "Vitalidad"]
    },
    {
        id: "oil-bergamot",
        name: "Aceite Esencial de Bergamota",
        description: "Cítrico y floral, la bergamota ayuda a elevar el ánimo y relajar la mente.",
        category: "oils",
        price: 31.75,
        image: "https://images.ctfassets.net/x0wnv07j8mtt/skuPrimaryImage3503/dabf6bc6a40f6f1327fbc04732b2dc95/Bergamot_15ml_US_Website_2021.png?q=75&fm=jpg&w=1080&h=1080",
        rating: 4.9,
        features: ["15 ml", "Cítrico", "Equilibrio emocional"]
    }
];
