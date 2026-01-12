/**
 * Pythagorean Numerology Utilities
 */

export const MASTER_NUMBERS = [11, 22, 33];

/**
 * Reduces a number to a single digit (1-9) or a Master Number (11, 22, 33).
 */
export function reduce(num: number, keepMaster: boolean = true): number {
  if (keepMaster && MASTER_NUMBERS.includes(num)) {
    return num;
  }

  let current = num;
  while (current > 9) {
    const sum = current
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);

    if (keepMaster && MASTER_NUMBERS.includes(sum)) {
      return sum;
    }
    current = sum;
  }
  return current;
}

const letterMap: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};

export function getLetterValue(char: string): number {
  const normalized = char.toLowerCase();
  return letterMap[normalized] || 0;
}

export function calculateNameNumber(name: string, filter?: (char: string) => boolean): number {
  const sum = name
    .toLowerCase()
    .split('')
    .filter(char => /^[a-z]$/.test(char))
    .filter(char => (filter ? filter(char) : true))
    .reduce((acc, char) => acc + getLetterValue(char), 0);

  return reduce(sum);
}

export const isVowel = (char: string) => 'aeiou'.includes(char.toLowerCase());
export const isConsonant = (char: string) => /^[a-z]$/.test(char.toLowerCase()) && !isVowel(char);

export interface DetailedResult {
  value: number;
  breakdown: string;
}

export function getReductionBreakdown(num: number): string {
  if (num <= 9 || MASTER_NUMBERS.includes(num)) return num.toString();

  let current = num;
  let steps: string[] = [num.toString()];

  while (current > 9 && !MASTER_NUMBERS.includes(current)) {
    const digits = current.toString().split('').map(Number);
    const sum = digits.reduce((a, b) => a + b, 0);
    current = sum;
    steps.push(`${digits.join('+')}=${current}`);
  }

  return steps.join(' → ');
}

export function calculateLifePath(dateString: string): DetailedResult {
  const [year, month, day] = dateString.split('-').map(Number);

  const m = reduce(month);
  const d = reduce(day);
  const y = reduce(year);

  const total = m + d + y;
  const final = reduce(total);

  // Breakdown format: "Mes (8) + Día (26->8) + Año (1968->24->6) = 22"
  const mBreak = month > 9 ? `${month}→${m}` : `${m}`;
  const dBreak = day > 9 && !MASTER_NUMBERS.includes(day) ? `${day}→${d}` : `${day}`;
  const yBreak = `${year}→${getReductionBreakdown(year)}`;

  let breakdown = `(${mBreak}) + (${dBreak}) + (${yBreak}) = ${total}`;
  if (total !== final) {
    breakdown += ` → ${getReductionBreakdown(total)}`;
  }

  return { value: final, breakdown };
}

export function calculateNameDetailed(name: string, filter?: (char: string) => boolean): DetailedResult {
  const chars = name
    .toLowerCase()
    .split('')
    .filter(char => /^[a-z]$/.test(char))
    .filter(char => (filter ? filter(char) : true));

  const values = chars.map(getLetterValue);
  const sum = values.reduce((acc, val) => acc + val, 0);
  const final = reduce(sum);

  let breakdown = `${values.join('+')} = ${sum}`;
  if (sum !== final) {
    breakdown += ` → ${getReductionBreakdown(sum)}`;
  }

  return { value: final, breakdown };
}

export function calculateDestinyDetailed(name: string): DetailedResult {
  return calculateNameDetailed(name);
}

export function calculateSoulUrgeDetailed(name: string): DetailedResult {
  return calculateNameDetailed(name, isVowel);
}

export function calculatePersonalityDetailed(name: string): DetailedResult {
  return calculateNameDetailed(name, isConsonant);
}

export type CompatibilityType = "Pareja" | "Socio de negocio" | "Hijo" | "Mascota";

export interface CompatibilityResult {
  score: number;
  synergy: number;
  breakdown: string;
  interpretation: string;
}

export function calculateCompatibility(
  myLifePath: number,
  otherLifePath: number,
  type: CompatibilityType
): CompatibilityResult {
  const synergy = reduce(myLifePath + otherLifePath);

  // Basic score calculation (just for demonstration, could be more complex)
  const score = Math.floor(70 + (synergy % 3) * 10 + (myLifePath === otherLifePath ? 5 : 0));

  const interpretations: Record<CompatibilityType, Record<number, string>> = {
    "Pareja": {
      1: "Vibración de liderazgo compartido. Construyen un futuro visionario juntos.",
      2: "Armonía perfecta. Sensibilidad y apoyo mutuo profundo.",
      3: "Relación llena de alegría, comunicación y expresión creativa.",
      4: "Estabilidad y lealtad. Construyen una base sólida para el hogar.",
      5: "Aventura y libertad. Una relación dinámica que nunca se detiene.",
      6: "Amor nutritivo y protector. El hogar es su santuario.",
      7: "Conexión espiritual e intelectual. Buscan juntos la verdad profunda.",
      8: "Poder y abundancia material. Un equipo imparable.",
      9: "Amor universal y compasivo. Se inspiran mutuamente a ser mejores.",
      11: "Relación maestra. Evolución espiritual intensamente conectada.",
      22: "Grandes constructores de un legado conjunto.",
      33: "Sanación y guía mutua. Amor en su máxima expresión de servicio."
    },
    "Socio de negocio": {
      1: "Enfoque total en metas y resultados innovadores.",
      4: "Organización y trabajo duro. Éxito asegurado por la estructura.",
      8: "Gran potencial financiero y proyección de autoridad.",
    },
    "Hijo": {
      1: "Motiva su independencia pero guiando su creatividad.",
      2: "Se requiere una guía suave y mucha paciencia emocional.",
      6: "Un vínculo de protección y enseñanza basada en el amor familiar.",
    },
    "Mascota": {
      3: "Mascota alegre que trae mucha comunicación y risas al hogar.",
      5: "Mascota juguetona y llena de energía. Necesita mucho espacio.",
      9: "Conexión telepática o muy intuitiva. Un compañero de alma.",
    }
  };

  const defaultInterpretation = `Vibración ${synergy}: Existe una energía de ${synergy % 2 === 0 ? "equilibrio y cooperación" : "creatividad y expansión"
    } entre ambos.`;

  return {
    score: score > 100 ? 100 : score,
    synergy,
    breakdown: `${myLifePath} + ${otherLifePath} = ${myLifePath + otherLifePath} → ${synergy}`,
    interpretation: interpretations[type]?.[synergy] || defaultInterpretation
  };
}
export interface HouseNumerologyResult {
  houseNumber: number;
  houseVibration: number;
  synesthesia: {
    color: string;
    sensation: string;
    advice: string;
    crystals: string;
  };
  breakdown: string;
}

export function calculateHouseNumerology(
  addressNum: string,
  streetName: string,
  moveDate?: string
): HouseNumerologyResult {
  // Sum digits of the address number
  const numSum = addressNum
    .split('')
    .filter(char => /^[0-9]$/.test(char))
    .reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  const houseNumber = reduce(numSum);

  // Synesthesia mapping
  const synesthesiaMap: Record<number, any> = {
    1: { color: "bg-red-600", sensation: "Energía y Acción", advice: "Ideal para nuevos comienzos e independencia.", crystals: "Granate, Cornalina" },
    2: { color: "bg-blue-400", sensation: "Paz y Diplomacia", advice: "Fomenta la armonía familiar y la meditación.", crystals: "Cuarzo Rosa, Selenita" },
    3: { color: "bg-yellow-400", sensation: "Alegría y Creatividad", advice: "Espacio de mucha vida social y expresión artística.", crystals: "Citrino, Pirita" },
    4: { color: "bg-emerald-600", sensation: "Estabilidad y Orden", advice: "Excelente para trabajar y construir bases sólidas.", crystals: "Jade, Turmalina Negra" },
    5: { color: "bg-amber-500", sensation: "Cambio y Aventura", advice: "Un hogar dinámico con mucho movimiento constante.", crystals: "Ojo de Tigre, Aventurina" },
    6: { color: "bg-pink-500", sensation: "Amor y Nutrición", advice: "Punto de encuentro para la familia y el cuidado mutuo.", crystals: "Rodocrosita, Esmeralda" },
    7: { color: "bg-purple-600", sensation: "Mysticismo y Sabiduría", advice: "Refugio para el estudio profundo y la introspección.", crystals: "Amatista, Lapis Lázuli" },
    8: { color: "bg-slate-700", sensation: "Poder y Abundancia", advice: "Atrae el éxito material y la gestión eficiente.", crystals: "Obsidiana, Hematita" },
    9: { color: "bg-indigo-900", sensation: "Humanitarismo y Cierre", advice: "Espacio para la sanación y el amor incondicional.", crystals: "Piedra de Luna, Labradorita" },
  };

  const vib = synesthesiaMap[houseNumber] || synesthesiaMap[1];

  return {
    houseNumber,
    houseVibration: houseNumber,
    synesthesia: vib,
    breakdown: `Dígitos: ${addressNum.split('').join('+')} = ${numSum} → ${houseNumber}`
  };
}
