export interface NumberMeaning {
    title: string;
    personality: string;
    strengths: string;
    challenges: string;
    love: string;
    career: string;
}

export const numberMeanings: Record<number, NumberMeaning> = {
    1: {
        title: "El Líder (The Leader)",
        personality: "Independiente, creativo y con mucha iniciativa.",
        strengths: "Originalidad, coraje e innovación.",
        challenges: "Impaciencia, egoísmo o arrogancia.",
        love: "Busca parejas que respeten su independencia.",
        career: "Emprendedor, director o inventor."
    },
    2: {
        title: "El Pacificador (The Peacemaker)",
        personality: "Diplomático, sensible y cooperativo.",
        strengths: "Empatía, paciencia y armonía.",
        challenges: "Hipersensibilidad o indecisión.",
        love: "Valora la conexión emocional profunda y la armonía.",
        career: "Mediador, consejero o asistente social."
    },
    3: {
        title: "El Comunicador (The Communicator)",
        personality: "Expresivo, optimista y sociable.",
        strengths: "Creatividad, elocuencia y alegría.",
        challenges: "Superficialidad o dispersión de energía.",
        love: "Necesita diversión, romance e inspiración.",
        career: "Escritor, artista, ventas o relaciones públicas."
    },
    4: {
        title: "El Constructor (The Builder)",
        personality: "Disciplinado, práctico y trabajador.",
        strengths: "Estabilidad, lealtad y organización.",
        challenges: "Rigidez o falta de visión creativa.",
        love: "Busca seguridad y compromiso a largo plazo.",
        career: "Ingeniero, gestor o administración."
    },
    5: {
        title: "El Aventurero (The Adventurer)",
        personality: "Versátil, libre y curioso.",
        strengths: "Adaptabilidad, carisma y pensamiento progresista.",
        challenges: "Inquietud o falta de enfoque.",
        love: "Necesita libertad, viajes y aventura constante.",
        career: "Turismo, periodismo o marketing."
    },
    6: {
        title: "El Protector (The Nurturer)",
        personality: "Responsable, amoroso y servicial.",
        strengths: "Cuidado, compasión y sentido de comunidad.",
        challenges: "Meterme en lo que no me importa o perfeccionismo.",
        love: "Dedicado, familiar y protector de su hogar.",
        career: "Educación, salud o servicios comunitarios."
    },
    7: {
        title: "El Buscador (The Seeker)",
        personality: "Analítico, espiritual y reservado.",
        strengths: "Sabiduría, intuición e investigación profunda.",
        challenges: "Aislamiento o cinismo.",
        love: "Necesita espacio personal y conexión intelectual.",
        career: "Científico, filósofo o analista de datos."
    },
    8: {
        title: "El Ejecutivo (The Executive)",
        personality: "Ambicioso, eficiente y orientado al éxito.",
        strengths: "Poder, autoridad y gestión financiera.",
        challenges: "Materialismo o dureza emocional.",
        love: "Busca estabilidad material y estatus compartido.",
        career: "Finanzas, derecho corporativo o política."
    },
    9: {
        title: "El Humanitario (The Humanitarian)",
        personality: "Compassivo, tolerante e idealista.",
        strengths: "Generosidad, mente abierta y altruismo.",
        challenges: "Sentimentalismo excesivo o falta de practicidad.",
        love: "Amor universal, romántico y profundamente empático.",
        career: "Organizaciones sin fines de lucro, medicina o arte."
    },
    11: {
        title: "El Maestro Iluminador (The Intuitive)",
        personality: "Altamente intuitivo, visionario e inspirado.",
        strengths: "Conciencia espiritual, magnetismo y luz.",
        challenges: "Ansiedad extrema o soñar despierto sin actuar.",
        love: "Conexión de alma a alma, intensidad espiritual.",
        career: "Líder espiritual, sanador o coach motivacional."
    },
    22: {
        title: "El Maestro Constructor (The Master Builder)",
        personality: "Práctico pero visionario, gran capacidad de realización.",
        strengths: "Habilidad para manifestar grandes sueños en la realidad.",
        challenges: "Miedo al fracaso ante grandes responsabilidades.",
        love: "Construcción de un legado junto a su pareja.",
        career: "Arquitecto a gran escala, filántropo o líder visionario."
    },
    33: {
        title: "El Maestro Guía (The Master Teacher)",
        personality: "Amor incondicional y devoción altruista.",
        strengths: "Gran capacidad de enseñanza y sacrificio personal.",
        challenges: "Cargar con los problemas de todo el mundo.",
        love: "Amor puro, protector y profundamente nutritivo.",
        career: "Guía espiritual, gran educador o líder mundial de paz."
    }
};
